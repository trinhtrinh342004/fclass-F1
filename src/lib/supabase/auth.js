import { getSupabaseConfigError, hasSupabaseConfig, supabase } from "./client.js";

export async function getCurrentUser(){
  if(!hasSupabaseConfig) return { user: null, error: new Error(getSupabaseConfigError()) };
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user || null, error };
}

export async function getCurrentSession(){
  if(!hasSupabaseConfig) return { session: null, error: new Error(getSupabaseConfigError()) };
  const { data, error } = await supabase.auth.getSession();
  return { session: data?.session || null, error };
}

export async function exchangeCodeForSession(code){
  if(!hasSupabaseConfig) return { data: null, error: new Error(getSupabaseConfigError()) };
  if(!code) return { data: null, error: new Error("Thiếu mã xác thực Supabase.") };
  return supabase.auth.exchangeCodeForSession(code);
}

export async function signInStudent(email, password){
  if(!hasSupabaseConfig) return { data: null, error: new Error(getSupabaseConfigError()) };
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signIn(email, password){
  return signInStudent(email, password);
}

export async function signUpStudent({ fullName, phone, email, password }){
  if(!hasSupabaseConfig) return { data: null, error: new Error(getSupabaseConfigError()) };
  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      data: {
        full_name: fullName,
        phone,
        role: "student",
      },
    },
  });
}

export async function signOut(){
  if(!hasSupabaseConfig) return { error: null };
  return supabase.auth.signOut();
}

export async function resetPasswordForEmail(email){
  if(!hasSupabaseConfig) return { data: null, error: new Error(getSupabaseConfigError()) };
  const redirectTo = `${window.location.origin}/reset-password`;
  return supabase.auth.resetPasswordForEmail(email, { redirectTo });
}

export async function updatePassword(password){
  if(!hasSupabaseConfig) return { data: null, error: new Error(getSupabaseConfigError()) };
  const { session, error } = await getCurrentSession();
  if(error || !session) return { data: null, error: error || new Error("Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.") };
  return supabase.auth.updateUser({ password });
}

export async function getCurrentProfile(userId){
  if(!hasSupabaseConfig) return { profile: null, error: new Error(getSupabaseConfigError()) };
  const id = userId || (await getCurrentUser()).user?.id;
  if(!id) return { profile: null, error: null };

  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, phone, email, role, status, note, created_at, updated_at")
    .eq("id", id)
    .maybeSingle();

  return { profile: data || null, error };
}
