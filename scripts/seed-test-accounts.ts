#!/usr/bin/env node
import { createClient } from "@supabase/supabase-js";
import { getSupabaseScriptEnv, loadLocalEnv } from "./env-utils.mjs";

loadLocalEnv();

const TEST_CLASS = {
  name: "TuWi A1",
  description: "Default class for approved fclass-f1 students.",
  level: "A1",
  status: "active",
};

const TEST_ACCOUNTS = [
  {
    key: "admin",
    email: "admin.test@fclass.local",
    password: "AdminTest@123456",
    full_name: "Admin Test",
    role: "admin",
    status: "approved",
  },
  {
    key: "studentApproved",
    email: "student.approved@fclass.local",
    password: "StudentTest@123456",
    full_name: "Student Approved",
    role: "student",
    status: "approved",
  },
  {
    key: "studentPending",
    email: "student.pending@fclass.local",
    password: "StudentTest@123456",
    full_name: "Student Pending",
    role: "student",
    status: "pending",
  },
  {
    key: "studentRejected",
    email: "student.rejected@fclass.local",
    password: "StudentTest@123456",
    full_name: "Student Rejected",
    role: "student",
    status: "rejected",
  },
];

const { supabaseUrl, serviceRoleKey } = getSupabaseScriptEnv();

if(process.env.VITE_SUPABASE_SERVICE_ROLE_KEY){
  fail("Không dùng VITE_SUPABASE_SERVICE_ROLE_KEY. Service role key không được expose qua frontend env.");
}

if(!supabaseUrl){
  fail("Thiếu VITE_SUPABASE_URL hoặc SUPABASE_URL.");
}

if(!serviceRoleKey){
  fail("Thiếu SUPABASE_SERVICE_ROLE_KEY. Script này cần service role key để tạo Supabase Auth users thật.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const tables = {
  profiles: false,
  classes: false,
  class_memberships: false,
  class_members: false,
  approval_logs: false,
};

console.log("== Audit schema ==");
for(const table of Object.keys(tables)){
  tables[table] = await tableExists(table);
  console.log(`${tables[table] ? "OK" : "SKIP"} public.${table}${tables[table] ? "" : " không tồn tại hoặc không đọc được"}`);
}

if(!tables.profiles || !tables.classes || !tables.class_memberships){
  fail("Thiếu bảng bắt buộc: profiles, classes hoặc class_memberships.");
}

await auditRpc("approve_student", { p_student_id: null, p_class_id: null });

console.log("\n== Seed class ==");
const tuwiClass = await ensureClass();
console.log(`OK class ${TEST_CLASS.name}: ${tuwiClass.id}`);

console.log("\n== Seed auth users + profiles ==");
const usersByKey = {};
for(const account of TEST_ACCOUNTS){
  const user = await ensureAuthUser(account);
  usersByKey[account.key] = user;
  await upsertProfile(user.id, account);
  console.log(`OK ${account.email}: ${account.role}/${account.status}`);
}

console.log("\n== Seed memberships ==");
await ensureApprovedMembership(tuwiClass.id, usersByKey.studentApproved.id, usersByKey.admin.id);
await ensureNoActiveMembership(usersByKey.studentPending.id, "student pending");
await ensureNoActiveMembership(usersByKey.studentRejected.id, "student rejected");

console.log("\n== Seed approval logs ==");
if(tables.approval_logs){
  await insertApprovalLogOnce({
    studentId: usersByKey.studentApproved.id,
    adminId: usersByKey.admin.id,
    action: "approved",
    oldStatus: "pending",
    newStatus: "approved",
    classId: tuwiClass.id,
  });
  await insertApprovalLogOnce({
    studentId: usersByKey.studentRejected.id,
    adminId: usersByKey.admin.id,
    action: "rejected",
    oldStatus: "pending",
    newStatus: "rejected",
    classId: null,
    reason: "Seed rejected test account",
  });
  console.log("OK approval_logs seeded idempotently.");
}else{
  console.log("SKIP approval_logs chưa có trong schema.");
}

console.log("\n== Verify ==");
await verifySeed(tuwiClass.id, usersByKey);
console.log("\nDONE Test accounts are ready.");

async function tableExists(table){
  const { error } = await supabase.from(table).select("*").limit(1);
  return !error;
}

async function auditRpc(name, params){
  const { error } = await supabase.rpc(name, params);
  if(!error){
    console.log(`OK RPC ${name} tồn tại.`);
    return;
  }
  if(error.code === "PGRST202" || /Could not find the function/i.test(error.message)){
    console.log(`SKIP RPC ${name} chưa có trong PostgREST schema cache.`);
    return;
  }
  console.log(`OK RPC ${name} tồn tại (${error.message}).`);
}

async function ensureClass(){
  const { data: existing, error: selectError } = await supabase
    .from("classes")
    .select("id, name, description, level, status")
    .ilike("name", TEST_CLASS.name)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if(selectError) throw new Error(`Không kiểm tra được class ${TEST_CLASS.name}: ${selectError.message}`);
  if(existing){
    if(existing.status !== "active"){
      const { data, error } = await supabase
        .from("classes")
        .update({ status: "active", updated_at: new Date().toISOString() })
        .eq("id", existing.id)
        .select("id, name, description, level, status")
        .single();
      if(error) throw new Error(`Không active được class ${TEST_CLASS.name}: ${error.message}`);
      return data;
    }
    return existing;
  }

  const { data, error } = await supabase
    .from("classes")
    .insert(TEST_CLASS)
    .select("id, name, description, level, status")
    .single();

  if(error) throw new Error(`Không tạo được class ${TEST_CLASS.name}: ${error.message}`);
  return data;
}

async function ensureAuthUser(account){
  const existing = await findAuthUserByEmail(account.email);
  if(existing){
    const { data, error } = await supabase.auth.admin.updateUserById(existing.id, {
      password: account.password,
      email_confirm: true,
      user_metadata: { full_name: account.full_name },
      app_metadata: { role: account.role, status: account.status, seed: "fclass-test-account" },
    });

    if(error){
      throw new Error(`User đã tồn tại nhưng không update được password cho ${account.email}: ${error.message}`);
    }

    return data.user;
  }

  const { data, error } = await supabase.auth.admin.createUser({
    email: account.email,
    password: account.password,
    email_confirm: true,
    user_metadata: { full_name: account.full_name },
    app_metadata: { role: account.role, status: account.status, seed: "fclass-test-account" },
  });

  if(error) throw new Error(`Không tạo được auth user ${account.email}: ${error.message}`);
  return data.user;
}

async function findAuthUserByEmail(email){
  const normalized = email.toLowerCase();
  let page = 1;
  const perPage = 1000;

  while(true){
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if(error) throw new Error(`Không list được auth users: ${error.message}`);

    const user = data.users.find((item) => item.email?.toLowerCase() === normalized);
    if(user) return user;
    if(data.users.length < perPage) return null;
    page += 1;
  }
}

async function upsertProfile(userId, account){
  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: userId,
      email: account.email,
      full_name: account.full_name,
      role: account.role,
      status: account.status,
      updated_at: new Date().toISOString(),
    }, { onConflict: "id" });

  if(error) throw new Error(`Không upsert được profile ${account.email}: ${error.message}`);
}

async function ensureApprovedMembership(classId, studentId, adminId){
  const now = new Date().toISOString();

  const { data: existing, error: selectError } = await supabase
    .from("class_memberships")
    .select("id")
    .eq("class_id", classId)
    .eq("student_id", studentId);

  if(selectError) throw new Error(`Không kiểm tra được class_memberships: ${selectError.message}`);

  if(existing.length > 0){
    const { error } = await supabase
      .from("class_memberships")
      .update({ status: "approved", approved_by: adminId, approved_at: now, rejected_at: null, updated_at: now })
      .eq("class_id", classId)
      .eq("student_id", studentId);
    if(error) throw new Error(`Không update được class_memberships approved: ${error.message}`);
  }else{
    const { error } = await supabase
      .from("class_memberships")
      .insert({ class_id: classId, student_id: studentId, status: "approved", approved_by: adminId, approved_at: now });
    if(error) throw new Error(`Không insert được class_memberships approved: ${error.message}`);
  }

  if(tables.class_members){
    await ensureCompatibilityClassMember(classId, studentId, adminId);
  }

  console.log("OK student.approved có approved membership trong TuWi A1.");
}

async function ensureCompatibilityClassMember(classId, userId, adminId){
  const now = new Date().toISOString();
  const { data: existing, error: selectError } = await supabase
    .from("class_members")
    .select("id")
    .eq("class_id", classId)
    .eq("user_id", userId);

  if(selectError) throw new Error(`Không kiểm tra được class_members: ${selectError.message}`);

  if(existing.length > 0){
    const { error } = await supabase
      .from("class_members")
      .update({ status: "approved", approved_by: adminId, approved_at: now, updated_at: now })
      .eq("class_id", classId)
      .eq("user_id", userId);
    if(error) throw new Error(`Không update được class_members approved: ${error.message}`);
  }else{
    const { error } = await supabase
      .from("class_members")
      .insert({ class_id: classId, user_id: userId, status: "approved", approved_by: adminId, approved_at: now });
    if(error) throw new Error(`Không insert được class_members approved: ${error.message}`);
  }
}

async function ensureNoActiveMembership(studentId, label){
  const now = new Date().toISOString();
  const { error } = await supabase
    .from("class_memberships")
    .update({ status: "removed", approved_by: null, approved_at: null, rejected_at: now, updated_at: now })
    .eq("student_id", studentId)
    .eq("status", "approved");

  if(error) throw new Error(`Không deactivate được approved class_memberships cho ${label}: ${error.message}`);

  if(tables.class_members){
    const { error: compatError } = await supabase
      .from("class_members")
      .update({ status: "removed", approved_by: null, approved_at: null, updated_at: now })
      .eq("user_id", studentId)
      .eq("status", "approved");
    if(compatError) throw new Error(`Không deactivate được class_members cho ${label}: ${compatError.message}`);
  }

  console.log(`OK ${label} không có approved membership active.`);
}

async function insertApprovalLogOnce({ studentId, adminId, action, oldStatus, newStatus, classId, reason = null }){
  let query = supabase
    .from("approval_logs")
    .select("id")
    .or(`student_id.eq.${studentId},user_id.eq.${studentId}`)
    .eq("action", action)
    .eq("new_status", newStatus)
    .limit(1);

  query = classId ? query.eq("class_id", classId) : query.is("class_id", null);

  const { data: existing, error: selectError } = await query;
  if(selectError) throw new Error(`Không kiểm tra được approval_logs: ${selectError.message}`);
  if(existing.length > 0) return;

  const { error } = await supabase.from("approval_logs").insert({
    student_id: studentId,
    user_id: studentId,
    admin_id: adminId,
    action,
    reason,
    old_status: oldStatus,
    new_status: newStatus,
    class_id: classId,
  });

  if(error) throw new Error(`Không insert được approval_logs ${action}: ${error.message}`);
}

async function verifySeed(classId, usersByKey){
  const emails = TEST_ACCOUNTS.map((account) => account.email);
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("id, email, full_name, role, status")
    .in("email", emails)
    .order("email", { ascending: true });

  if(profilesError) throw new Error(`Verify profiles thất bại: ${profilesError.message}`);
  console.log(`OK profiles: ${profiles.length}/4`);
  if(profiles.length !== 4) throw new Error("Verify profiles thiếu tài khoản test.");

  const { data: classRows, error: classError } = await supabase
    .from("classes")
    .select("id, name, status")
    .eq("id", classId)
    .single();

  if(classError) throw new Error(`Verify class thất bại: ${classError.message}`);
  console.log(`OK class: ${classRows.name}/${classRows.status}`);

  const { data: approvedMemberships, error: approvedError } = await supabase
    .from("class_memberships")
    .select("id, status")
    .eq("class_id", classId)
    .eq("student_id", usersByKey.studentApproved.id)
    .eq("status", "approved");

  if(approvedError) throw new Error(`Verify approved membership thất bại: ${approvedError.message}`);
  console.log(`OK student.approved approved memberships in TuWi A1: ${approvedMemberships.length}`);
  if(approvedMemberships.length < 1) throw new Error("student.approved chưa có class_memberships approved.");

  if(tables.class_members){
    const { data: approvedCompat, error: approvedCompatError } = await supabase
      .from("class_members")
      .select("id, status")
      .eq("class_id", classId)
      .eq("user_id", usersByKey.studentApproved.id)
      .eq("status", "approved");

    if(approvedCompatError) throw new Error(`Verify class_members approved thất bại: ${approvedCompatError.message}`);
    console.log(`OK student.approved approved class_members rows in TuWi A1: ${approvedCompat.length}`);
    if(approvedCompat.length < 1) throw new Error("student.approved chưa có class_members approved.");
  }

  for(const key of ["studentPending", "studentRejected"]){
    const { count, error } = await supabase
      .from("class_memberships")
      .select("id", { count: "exact", head: true })
      .eq("student_id", usersByKey[key].id)
      .eq("status", "approved");

    if(error) throw new Error(`Verify no active membership thất bại cho ${key}: ${error.message}`);
    console.log(`OK ${key} approved memberships: ${count || 0}`);
    if(count && count > 0) throw new Error(`${key} vẫn có approved class_memberships.`);

    if(tables.class_members){
      const { count: compatCount, error: compatError } = await supabase
        .from("class_members")
        .select("id", { count: "exact", head: true })
        .eq("user_id", usersByKey[key].id)
        .eq("status", "approved");

      if(compatError) throw new Error(`Verify no active class_members thất bại cho ${key}: ${compatError.message}`);
      console.log(`OK ${key} approved class_members rows: ${compatCount || 0}`);
      if(compatCount && compatCount > 0) throw new Error(`${key} vẫn có approved class_members.`);
    }
  }
}

function fail(message){
  console.error(`FAIL ${message}`);
  process.exit(1);
}
