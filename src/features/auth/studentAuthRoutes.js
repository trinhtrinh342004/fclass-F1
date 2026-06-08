import { getCurrentProfile, profileStatusLabel, requireAdmin, requireApprovedStudent, STATUS_MESSAGES } from "./authGuard.js";
import { getSupabaseConfigError, hasSupabaseConfig } from "../../lib/supabase/client.js";
import { signInStudent, signOut, signUpStudent } from "./authService.js";
import { getLessons } from "../lessons/lessonRepository.js";
import { migrateLocalProgressToSupabase, remoteProgressToLocalShape } from "../progress/progressRepository.js";
import {
  createClass,
  listClasses,
  listClassMemberships,
  listPendingClassRequests,
  listStudentProgress,
  listStudents,
  updateClass,
  updateClassMembershipStatus,
  updateStudentStatus,
} from "../admin/adminRepository.js";
import {
  getMyClassMemberships,
  getMyProgress,
  listActiveClasses,
  requestJoinClass,
} from "../student/studentRepository.js";
import {
  subscribeToClassMemberships,
  subscribeToMyMemberships,
  subscribeToProfiles,
  subscribeToStudentProgress,
  subscribeToTable,
  unsubscribe as unsubscribeRealtime,
} from "../../lib/supabase/realtime.js";

const AUTH_ROUTES = new Set(["/student-register", "/student-login", "/student", "/admin", "/admin/students"]);
const STUDENT_STATUS_FILTERS = [
  ["pending", "Chờ duyệt"],
  ["approved", "Đã duyệt"],
  ["rejected", "Từ chối"],
  ["all", "Tất cả"],
];
const ADMIN_TABS = [
  ["overview", "Tổng quan"],
  ["students", "Học viên"],
  ["classes", "Lớp học"],
  ["requests", "Duyệt vào lớp"],
  ["progress", "Tiến độ"],
];

let currentAdminFilter = "pending";
let currentAdminTab = "overview";
let adminChannels = [];
let studentChannels = [];

export function isAuthRoute(pathname = window.location.pathname){
  return AUTH_ROUTES.has(normalizePath(pathname));
}

export function hideAuthView(){
  const view = document.getElementById("studentAuthView");
  if(view) view.classList.remove("active");
}

export async function renderAuthRoute(){
  const path = normalizePath(window.location.pathname);
  if(!AUTH_ROUTES.has(path)) return false;

  clearRealtime(adminChannels);
  clearRealtime(studentChannels);

  const view = ensureAuthView();
  document.getElementById("homeView")?.classList.remove("active");
  document.getElementById("lessonView")?.classList.remove("active");
  view.classList.add("active");
  view.innerHTML = renderShell("Đang tải...", `<div class="auth-loading">Đang tải...</div>`);

  if(path === "/student-register") renderStudentRegister(view);
  if(path === "/student-login") renderStudentLogin(view);
  if(path === "/student") await renderStudentDashboard(view);
  if(path === "/admin" || path === "/admin/students") await renderAdmin(view);

  window.scrollTo({ top: 0, behavior: "smooth" });
  return true;
}

function normalizePath(pathname){
  return pathname.replace(/\/+$/, "") || "/";
}

function ensureAuthView(){
  let view = document.getElementById("studentAuthView");
  if(view) return view;
  view = document.createElement("main");
  view.id = "studentAuthView";
  view.className = "view auth-view";
  document.body.insertBefore(view, document.getElementById("toast"));
  return view;
}

function renderShell(title, body){
  return `
    <section class="auth-shell">
      <div class="auth-header">
        <span class="eyebrow auth-eyebrow">Tuwi Nguyễn · FClass</span>
        <h1>${escapeHtml(title)}</h1>
      </div>
      ${body}
    </section>
  `;
}

function renderConfigWarning(){
  if(hasSupabaseConfig) return "";
  return `<div class="auth-alert error">${escapeHtml(getSupabaseConfigError())}</div>`;
}

function renderStudentRegister(view){
  view.innerHTML = renderShell("Đăng ký học viên", `
    ${renderConfigWarning()}
    <form class="auth-card auth-form" id="studentRegisterForm">
      <label>Họ tên<input name="fullName" autocomplete="name" required></label>
      <label>Số điện thoại<input name="phone" autocomplete="tel" required></label>
      <label>Email<input name="email" type="email" autocomplete="email" required></label>
      <label>Mật khẩu<input name="password" type="password" autocomplete="new-password" required minlength="6"></label>
      <label>Xác nhận mật khẩu<input name="confirmPassword" type="password" autocomplete="new-password" required minlength="6"></label>
      <button class="btn-primary auth-submit" type="submit">Đăng ký</button>
      <p class="auth-switch">Đã có tài khoản? <a href="/student-login">Đăng nhập</a></p>
      <div class="auth-message" id="studentRegisterMessage" role="status"></div>
    </form>
  `);

  document.getElementById("studentRegisterForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("studentRegisterMessage");
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if(!fullName || !phone || !email || !password || !confirmPassword){
      setMessage(message, "Vui lòng nhập đầy đủ thông tin.", "error");
      return;
    }
    if(password !== confirmPassword){
      setMessage(message, "Mật khẩu xác nhận chưa khớp.", "error");
      return;
    }
    if(!hasSupabaseConfig){
      setMessage(message, getSupabaseConfigError(), "error");
      return;
    }

    const submit = event.currentTarget.querySelector("button[type='submit']");
    submit.disabled = true;
    setMessage(message, "Đang tạo tài khoản...", "");
    const { error } = await signUpStudent({ fullName, phone, email, password });
    submit.disabled = false;

    if(error){
      setMessage(message, friendlyAuthError(error.message), "error");
      return;
    }

    await signOut();
    event.currentTarget.reset();
    setMessage(message, "Đăng ký thành công. Vui lòng chờ admin duyệt tài khoản.", "success");
  });
}

function renderStudentLogin(view){
  view.innerHTML = renderShell("Đăng nhập", `
    ${renderConfigWarning()}
    <form class="auth-card auth-form" id="studentLoginForm">
      <label>Email<input name="email" type="email" autocomplete="email" required></label>
      <label>Mật khẩu<input name="password" type="password" autocomplete="current-password" required></label>
      <button class="btn-primary auth-submit" type="submit">Đăng nhập</button>
      <div class="auth-row">
        <a href="/student-register">Đăng ký học viên</a>
        <a href="/admin">Khu vực admin</a>
      </div>
      <div class="auth-message" id="studentLoginMessage" role="status"></div>
    </form>
  `);

  document.getElementById("studentLoginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("studentLoginMessage");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if(!email || !password){
      setMessage(message, "Vui lòng nhập email và mật khẩu.", "error");
      return;
    }
    if(!hasSupabaseConfig){
      setMessage(message, getSupabaseConfigError(), "error");
      return;
    }

    const submit = event.currentTarget.querySelector("button[type='submit']");
    submit.disabled = true;
    setMessage(message, "Đang đăng nhập...", "");
    const { data, error } = await signInStudent(email, password);
    submit.disabled = false;

    if(error || !data?.user){
      setMessage(message, "Thông tin đăng nhập chưa đúng.", "error");
      return;
    }

    const { profile, error: profileError } = await getCurrentProfile(data.user.id);
    if(profileError || !profile){
      setMessage(message, "Không tìm thấy hồ sơ tài khoản. Vui lòng liên hệ admin.", "error");
      return;
    }
    if(profile.role === "admin" && profile.status === "approved"){
      window.history.pushState({}, "", "/admin");
      await renderAuthRoute();
      return;
    }
    if(profile.role === "student" && profile.status === "approved"){
      window.history.pushState({}, "", "/student");
      await renderAuthRoute();
      return;
    }

    setMessage(message, STATUS_MESSAGES[profile.status] || "Tài khoản chưa sẵn sàng.", "warning");
  });
}

async function renderStudentDashboard(view){
  const guard = await requireApprovedStudent();
  if(guard.reason === "unauthenticated"){
    window.history.replaceState({}, "", "/student-login");
    renderStudentLogin(view);
    return;
  }
  if(!guard.ok){
    view.innerHTML = renderShell("Trạng thái tài khoản", renderStatusCard(guard.message));
    attachLogoutHandler();
    attachStudentRealtime(view, guard.user?.id);
    return;
  }

  await migrateLocalProgressToSupabase();
  const [membershipsResult, classesResult, lessonsResult, progressResult] = await Promise.all([
    getMyClassMemberships(),
    listActiveClasses(),
    getLessons(),
    getMyProgress(),
  ]);

  if(membershipsResult.error || classesResult.error || progressResult.error){
    view.innerHTML = renderShell("Khu vực học viên", `
      <section class="auth-card status-card">
        <p>Không tải được dữ liệu lớp học realtime. Vui lòng thử lại.</p>
        <div class="auth-message error">${escapeHtml(membershipsResult.error?.message || classesResult.error?.message || progressResult.error?.message || "")}</div>
      </section>
    `);
    attachLogoutHandler();
    attachStudentRealtime(view, guard.user?.id);
    return;
  }

  const memberships = membershipsResult.data || [];
  const approvedMemberships = memberships.filter((item) => item.status === "approved" && item.classes?.status === "active");
  const pendingMemberships = memberships.filter((item) => item.status === "pending");
  const inactiveMemberships = memberships.filter((item) => ["rejected", "removed"].includes(item.status));

  const dashboard = `
    <section class="auth-card student-dashboard">
      <div class="student-welcome">
        <div>
          <p>Xin chào,</p>
          <h2>${escapeHtml(guard.profile.full_name || guard.user.email || "Học viên")}</h2>
        </div>
        <span class="status-badge status-approved">Tài khoản: Đã duyệt</span>
      </div>
      <div class="student-actions">
        <button class="btn-ghost" id="studentLogoutBtn">Đăng xuất</button>
      </div>
    </section>
  `;

  if(!approvedMemberships.length){
    view.innerHTML = renderShell("Khu vực học viên", `
      ${dashboard}
      ${pendingMemberships.length ? renderMembershipNotice("Bạn đang chờ admin duyệt vào lớp.", pendingMemberships) : ""}
      ${inactiveMemberships.length ? renderMembershipNotice("Một số yêu cầu lớp chưa được chấp nhận.", inactiveMemberships) : ""}
      ${renderClassRequestList(classesResult.data || [], memberships)}
    `);
    attachLogoutHandler();
    attachClassRequestHandlers(view);
    attachStudentRealtime(view, guard.user?.id);
    return;
  }

  const activeMembership = approvedMemberships[0];
  const remoteProgress = remoteProgressToLocalShape(progressResult.data || []);
  const lessonCards = [...lessonsResult.lessons]
    .sort((a, b) => a.id - b.id)
    .map((lesson) => `
      <button class="student-lesson ${remoteProgress.done.includes(lesson.id) ? "done" : ""}" data-lesson-id="${lesson.id}">
        <span>Buổi ${lesson.id}</span>
        <strong>${escapeHtml(lesson.title)}</strong>
        <small>${escapeHtml(lesson.subtitle || lesson.unit || "")}</small>
      </button>
    `).join("");

  view.innerHTML = renderShell("Khu vực học viên", `
    ${dashboard}
    <section class="auth-card class-approved-card">
      <div class="student-welcome">
        <div>
          <p>Lớp đã duyệt</p>
          <h2>${escapeHtml(activeMembership.classes?.name || "Lớp học")}</h2>
        </div>
        <span class="status-badge status-approved">Được vào lớp</span>
      </div>
      <div class="student-actions">
        <button class="btn-primary" id="studentContinueBtn">Vào buổi học tiếp theo</button>
      </div>
    </section>
    ${lessonsResult.warning ? `<div class="empty-state">${escapeHtml(lessonsResult.warning)}</div>` : ""}
    <section class="student-lessons">
      <h2>Danh sách 27 buổi</h2>
      <div class="student-lesson-grid">${lessonCards}</div>
    </section>
  `);

  document.getElementById("studentContinueBtn").addEventListener("click", () => openLessonFromAuth(window.getNextLessonId?.() || 1));
  view.querySelectorAll("[data-lesson-id]").forEach((button) => {
    button.addEventListener("click", () => openLessonFromAuth(Number(button.dataset.lessonId)));
  });
  attachLogoutHandler();
  attachStudentRealtime(view, guard.user?.id);
}

function renderMembershipNotice(title, memberships){
  return `
    <section class="auth-card status-card">
      <p>${escapeHtml(title)}</p>
      <div class="class-list">
        ${memberships.map((membership) => `
          <div class="class-row">
            <strong>${escapeHtml(membership.classes?.name || "Lớp học")}</strong>
            <span class="status-badge status-${escapeHtml(membership.status)}">${membershipStatusLabel(membership.status)}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderClassRequestList(classes, memberships){
  const membershipByClass = new Map(memberships.map((item) => [item.class_id, item]));
  if(!classes.length){
    return `<section class="empty-state">Hiện chưa có lớp active để xin tham gia.</section>`;
  }

  return `
    <section class="student-lessons">
      <h2>Xin vào lớp</h2>
      <div class="student-lesson-grid">
        ${classes.map((klass) => {
          const membership = membershipByClass.get(klass.id);
          const disabled = Boolean(membership);
          return `
            <article class="student-lesson class-card">
              <span>${escapeHtml(klass.level || "A1")}</span>
              <strong>${escapeHtml(klass.name)}</strong>
              <small>${escapeHtml(klass.description || "Lớp học active")}</small>
              <button class="btn-primary class-request-btn" data-class-id="${klass.id}" ${disabled ? "disabled" : ""}>
                ${membership ? membershipStatusLabel(membership.status) : "Xin vào lớp"}
              </button>
            </article>
          `;
        }).join("")}
      </div>
      <div class="auth-message" id="studentClassMessage" role="status"></div>
    </section>
  `;
}

function attachClassRequestHandlers(view){
  const message = document.getElementById("studentClassMessage");
  view.querySelectorAll("[data-class-id]").forEach((button) => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      setMessage(message, "Đang gửi yêu cầu tham gia lớp...", "");
      const { error } = await requestJoinClass(button.dataset.classId);
      if(error){
        button.disabled = false;
        setMessage(message, `Không gửi được yêu cầu: ${error.message}`, "error");
        return;
      }
      setMessage(message, "Yêu cầu tham gia lớp đã được gửi. Vui lòng chờ admin duyệt.", "success");
      await renderStudentDashboard(view);
    });
  });
}

async function renderAdmin(view){
  const guard = await requireAdmin();
  if(guard.reason === "unauthenticated"){
    window.history.replaceState({}, "", "/student-login");
    renderStudentLogin(view);
    return;
  }
  if(!guard.ok){
    view.innerHTML = renderShell("Admin", renderStatusCard(guard.message));
    attachLogoutHandler();
    return;
  }

  view.innerHTML = renderShell("Admin", `
    <section class="auth-card admin-panel">
      <div class="admin-toolbar">
        <div class="filter-tabs">
          ${ADMIN_TABS.map(([value, label]) => `
            <button class="${value === currentAdminTab ? "active" : ""}" data-admin-tab="${value}">${label}</button>
          `).join("")}
        </div>
        <button class="btn-ghost" id="studentLogoutBtn">Đăng xuất</button>
      </div>
      <div class="auth-message" id="adminMessage" role="status"></div>
      <div id="adminContent" class="admin-list">Đang tải dữ liệu...</div>
    </section>
  `);

  attachLogoutHandler();
  view.querySelectorAll("[data-admin-tab]").forEach((button) => {
    button.addEventListener("click", async () => {
      currentAdminTab = button.dataset.adminTab;
      await renderAdmin(view);
    });
  });
  await renderAdminTab(view, guard.user.id);
  attachAdminRealtime(view, guard.user.id);
}

async function renderAdminTab(view, adminId){
  if(currentAdminTab === "overview") return renderAdminOverview();
  if(currentAdminTab === "students") return renderAdminStudents();
  if(currentAdminTab === "classes") return renderAdminClasses(view);
  if(currentAdminTab === "requests") return renderAdminClassRequests(adminId);
  if(currentAdminTab === "progress") return renderAdminProgress();
}

async function renderAdminOverview(){
  const content = document.getElementById("adminContent");
  const [pendingStudents, approvedStudents, pendingRequests, classesResult] = await Promise.all([
    listStudents("pending"),
    listStudents("approved"),
    listPendingClassRequests(),
    listClasses(),
  ]);
  const errors = [pendingStudents.error, approvedStudents.error, pendingRequests.error, classesResult.error].filter(Boolean);
  if(errors.length){
    content.innerHTML = `<div class="empty-state">Không tải được tổng quan. ${escapeHtml(errors[0].message)}</div>`;
    return;
  }
  const activeClasses = (classesResult.data || []).filter((klass) => klass.status === "active");
  content.innerHTML = `
    <div class="admin-stat-grid">
      ${renderAdminStat("Học viên chờ duyệt", pendingStudents.data?.length || 0)}
      ${renderAdminStat("Học viên đã duyệt", approvedStudents.data?.length || 0)}
      ${renderAdminStat("Yêu cầu vào lớp", pendingRequests.data?.length || 0)}
      ${renderAdminStat("Lớp active", activeClasses.length)}
    </div>
  `;
}

function renderAdminStat(label, value){
  return `
    <article class="admin-stat-card">
      <strong>${value}</strong>
      <span>${escapeHtml(label)}</span>
    </article>
  `;
}

async function renderAdminStudents(){
  const content = document.getElementById("adminContent");
  content.innerHTML = `
    <div class="admin-toolbar">
      <div class="filter-tabs">
        ${STUDENT_STATUS_FILTERS.map(([value, label]) => `
          <button class="${value === currentAdminFilter ? "active" : ""}" data-filter="${value}">${label}</button>
        `).join("")}
      </div>
    </div>
    <div id="adminStudentsList">Đang tải danh sách học viên...</div>
  `;
  content.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", async () => {
      currentAdminFilter = button.dataset.filter;
      await renderAdminStudents();
    });
  });
  await loadAdminStudents();
}

async function loadAdminStudents(){
  const list = document.getElementById("adminStudentsList");
  const message = document.getElementById("adminMessage");
  if(!list || !message) return;

  const { data, error } = await listStudents(currentAdminFilter);
  if(error){
    list.innerHTML = `<div class="empty-state">Không tải được danh sách học viên. ${escapeHtml(error.message)}</div>`;
    return;
  }
  if(!data?.length){
    list.innerHTML = `<div class="empty-state">Chưa có học viên trong bộ lọc này.</div>`;
    return;
  }

  list.innerHTML = `
    <div class="admin-table admin-table-students" role="table">
      <div class="admin-table-head" role="row">
        <span>Họ tên</span><span>Số điện thoại</span><span>Email</span><span>Ngày đăng ký</span><span>Trạng thái</span><span>Role</span><span>Hành động</span>
      </div>
      ${data.map(renderStudentRow).join("")}
    </div>
  `;

  list.querySelectorAll("[data-action-status]").forEach((button) => {
    button.addEventListener("click", async () => {
      button.disabled = true;
      setMessage(message, "Đang cập nhật học viên...", "");
      const { error: updateError } = await updateStudentStatus(button.dataset.studentId, button.dataset.actionStatus);

      if(updateError){
        button.disabled = false;
        setMessage(message, `Cập nhật thất bại: ${updateError.message}`, "error");
        return;
      }

      setMessage(message, "Cập nhật trạng thái học viên thành công.", "success");
      await loadAdminStudents();
    });
  });
}

async function renderAdminClasses(view){
  const content = document.getElementById("adminContent");
  const { data, error } = await listClasses();
  if(error){
    content.innerHTML = `<div class="empty-state">Không tải được lớp học. ${escapeHtml(error.message)}</div>`;
    return;
  }

  content.innerHTML = `
    <form class="auth-form admin-class-form" id="adminClassForm">
      <label>Tên lớp<input name="name" required placeholder="Ví dụ: Tuwi A1 tối thứ 3"></label>
      <label>Mô tả<input name="description" placeholder="Ghi chú ngắn cho lớp"></label>
      <label>Level<input name="level" value="A1" required></label>
      <button class="btn-primary auth-submit" type="submit">Tạo lớp</button>
    </form>
    <div class="admin-table admin-table-classes" role="table">
      <div class="admin-table-head" role="row">
        <span>Tên lớp</span><span>Level</span><span>Trạng thái</span><span>Mô tả</span><span>Ngày tạo</span><span>Hành động</span>
      </div>
      ${(data || []).map(renderClassRow).join("") || `<div class="empty-state">Chưa có lớp học.</div>`}
    </div>
  `;

  document.getElementById("adminClassForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("adminMessage");
    const form = new FormData(event.currentTarget);
    setMessage(message, "Đang tạo lớp...", "");
    const { error: createError } = await createClass({
      name: String(form.get("name") || "").trim(),
      description: String(form.get("description") || "").trim(),
      level: String(form.get("level") || "A1").trim(),
    });
    if(createError){
      setMessage(message, `Tạo lớp thất bại: ${createError.message}`, "error");
      return;
    }
    setMessage(message, "Tạo lớp thành công.", "success");
    await renderAdminClasses(view);
  });

  content.querySelectorAll("[data-class-action]").forEach((button) => {
    button.addEventListener("click", async () => {
      const message = document.getElementById("adminMessage");
      const action = button.dataset.classAction;
      const id = button.dataset.classId;
      let payload = {};
      if(action === "archive") payload = { status: "archived" };
      if(action === "reactivate") payload = { status: "active" };
      if(action === "rename"){
        const name = window.prompt("Tên lớp mới", button.dataset.className || "");
        if(!name) return;
        const description = window.prompt("Mô tả lớp", button.dataset.classDescription || "") || "";
        payload = { name: name.trim(), description };
      }
      setMessage(message, "Đang cập nhật lớp...", "");
      const { error: updateError } = await updateClass(id, payload);
      if(updateError){
        setMessage(message, `Cập nhật lớp thất bại: ${updateError.message}`, "error");
        return;
      }
      setMessage(message, "Cập nhật lớp thành công.", "success");
      await renderAdminClasses(view);
    });
  });
}

async function renderAdminClassRequests(adminId){
  const content = document.getElementById("adminContent");
  const [requestsResult, studentsResult] = await Promise.all([
    listClassMemberships(),
    listStudents("all"),
  ]);
  if(requestsResult.error || studentsResult.error){
    content.innerHTML = `<div class="empty-state">Không tải được yêu cầu lớp. ${escapeHtml(requestsResult.error?.message || studentsResult.error?.message || "")}</div>`;
    return;
  }
  const studentById = new Map((studentsResult.data || []).map((student) => [student.id, student]));
  const requests = requestsResult.data || [];
  if(!requests.length){
    content.innerHTML = `<div class="empty-state">Chưa có yêu cầu tham gia lớp.</div>`;
    return;
  }

  content.innerHTML = `
    <div class="admin-table admin-table-requests" role="table">
      <div class="admin-table-head" role="row">
        <span>Học viên</span><span>Email</span><span>Lớp</span><span>Trạng thái</span><span>Ngày gửi</span><span>Hành động</span>
      </div>
      ${requests.map((request) => renderMembershipRow(request, studentById.get(request.student_id))).join("")}
    </div>
  `;

  content.querySelectorAll("[data-membership-status]").forEach((button) => {
    button.addEventListener("click", async () => {
      const message = document.getElementById("adminMessage");
      button.disabled = true;
      setMessage(message, "Đang cập nhật yêu cầu vào lớp...", "");
      const { error } = await updateClassMembershipStatus(button.dataset.membershipId, button.dataset.membershipStatus, adminId);
      if(error){
        button.disabled = false;
        setMessage(message, `Cập nhật thất bại: ${error.message}`, "error");
        return;
      }
      setMessage(message, "Cập nhật yêu cầu vào lớp thành công.", "success");
      await renderAdminClassRequests(adminId);
    });
  });
}

async function renderAdminProgress(){
  const content = document.getElementById("adminContent");
  const [progressResult, studentsResult] = await Promise.all([
    listStudentProgress(),
    listStudents("all"),
  ]);
  if(progressResult.error || studentsResult.error){
    content.innerHTML = `<div class="empty-state">Không tải được tiến độ. ${escapeHtml(progressResult.error?.message || studentsResult.error?.message || "")}</div>`;
    return;
  }
  const studentById = new Map((studentsResult.data || []).map((student) => [student.id, student]));
  const rows = progressResult.data || [];
  if(!rows.length){
    content.innerHTML = `<div class="empty-state">Chưa có tiến độ học viên.</div>`;
    return;
  }
  const summary = summarizeProgress(rows, studentById);
  content.innerHTML = `
    <div class="admin-table admin-table-progress" role="table">
      <div class="admin-table-head" role="row">
        <span>Học viên</span><span>Lớp</span><span>Buổi đã mở</span><span>Hoàn thành</span><span>% tiến độ</span><span>Lần hoạt động cuối</span>
      </div>
      ${summary.map(renderProgressRow).join("")}
    </div>
  `;
}

function summarizeProgress(rows, studentById){
  const grouped = new Map();
  for(const row of rows){
    const key = `${row.student_id}:${row.class_id || ""}`;
    const current = grouped.get(key) || {
      student: studentById.get(row.student_id),
      className: row.classes?.name || "Chưa rõ lớp",
      opened: 0,
      completed: 0,
      lastActive: "",
    };
    current.opened += 1;
    if(row.status === "completed") current.completed += 1;
    const last = row.last_opened_at || row.updated_at || row.completed_at || "";
    if(last && (!current.lastActive || new Date(last) > new Date(current.lastActive))) current.lastActive = last;
    grouped.set(key, current);
  }
  return [...grouped.values()].map((item) => ({
    ...item,
    percent: Math.round((item.completed / 27) * 100),
  }));
}

function attachAdminRealtime(view, adminId){
  clearRealtime(adminChannels);
  adminChannels = [
    subscribeToProfiles(() => renderAdmin(view)),
    subscribeToClassMemberships(() => renderAdmin(view)),
    subscribeToTable({ table: "classes", callback: () => renderAdmin(view) }),
    subscribeToTable({ table: "student_lesson_progress", callback: () => renderAdmin(view) }),
  ].filter(Boolean);
}

function attachStudentRealtime(view, userId){
  clearRealtime(studentChannels);
  studentChannels = [
    subscribeToProfiles(() => renderStudentDashboard(view)),
    subscribeToMyMemberships(userId, () => renderStudentDashboard(view)),
    subscribeToStudentProgress(userId, () => renderStudentDashboard(view)),
  ].filter(Boolean);
}

function renderStudentRow(student){
  const createdAt = student.created_at ? new Date(student.created_at).toLocaleDateString("vi-VN") : "";
  let actionButtons = "";
  if(student.status === "pending"){
    actionButtons = `
      <button data-student-id="${student.id}" data-action-status="approved">Duyệt</button>
      <button data-student-id="${student.id}" data-action-status="rejected">Từ chối</button>
    `;
  }else if(student.status === "approved"){
    actionButtons = `
      <button data-student-id="${student.id}" data-action-status="rejected">Từ chối</button>
    `;
  }else if(student.status === "rejected"){
    actionButtons = `
      <button data-student-id="${student.id}" data-action-status="approved">Mở lại</button>
    `;
  }

  return `
    <div class="admin-table-row" role="row">
      <span data-label="Họ tên">${escapeHtml(student.full_name || "")}</span>
      <span data-label="Số điện thoại">${escapeHtml(student.phone || "")}</span>
      <span data-label="Email">${escapeHtml(student.email || "")}</span>
      <span data-label="Ngày đăng ký">${escapeHtml(createdAt)}</span>
      <span data-label="Trạng thái"><b class="status-badge status-${escapeHtml(student.status)}">${profileStatusLabel(student.status)}</b></span>
      <span data-label="Role">${escapeHtml(student.role || "")}</span>
      <span class="admin-actions" data-label="Hành động">
        ${actionButtons}
      </span>
    </div>
  `;
}

function renderClassRow(klass){
  const createdAt = klass.created_at ? new Date(klass.created_at).toLocaleDateString("vi-VN") : "";
  return `
    <div class="admin-table-row" role="row">
      <span data-label="Tên lớp">${escapeHtml(klass.name)}</span>
      <span data-label="Level">${escapeHtml(klass.level || "A1")}</span>
      <span data-label="Trạng thái"><b class="status-badge status-${escapeHtml(klass.status)}">${classStatusLabel(klass.status)}</b></span>
      <span data-label="Mô tả">${escapeHtml(klass.description || "")}</span>
      <span data-label="Ngày tạo">${escapeHtml(createdAt)}</span>
      <span class="admin-actions" data-label="Hành động">
        <button data-class-id="${klass.id}" data-class-name="${escapeHtml(klass.name)}" data-class-description="${escapeHtml(klass.description || "")}" data-class-action="rename">Sửa</button>
        ${klass.status === "active"
          ? `<button data-class-id="${klass.id}" data-class-action="archive">Archive</button>`
          : `<button data-class-id="${klass.id}" data-class-action="reactivate">Mở lại</button>`}
      </span>
    </div>
  `;
}

function renderMembershipRow(request, student){
  const createdAt = request.created_at ? new Date(request.created_at).toLocaleDateString("vi-VN") : "";
  return `
    <div class="admin-table-row" role="row">
      <span data-label="Học viên">${escapeHtml(student?.full_name || request.student_id)}</span>
      <span data-label="Email">${escapeHtml(student?.email || "")}</span>
      <span data-label="Lớp">${escapeHtml(request.classes?.name || request.class_id)}</span>
      <span data-label="Trạng thái"><b class="status-badge status-${escapeHtml(request.status)}">${membershipStatusLabel(request.status)}</b></span>
      <span data-label="Ngày gửi">${escapeHtml(createdAt)}</span>
      <span class="admin-actions" data-label="Hành động">
        <button data-membership-id="${request.id}" data-membership-status="approved">Duyệt vào lớp</button>
        <button data-membership-id="${request.id}" data-membership-status="rejected">Từ chối</button>
        <button data-membership-id="${request.id}" data-membership-status="removed">Xóa khỏi lớp</button>
      </span>
    </div>
  `;
}

function renderProgressRow(row){
  const last = row.lastActive ? new Date(row.lastActive).toLocaleString("vi-VN") : "";
  return `
    <div class="admin-table-row" role="row">
      <span data-label="Học viên">${escapeHtml(row.student?.full_name || row.student?.email || "Học viên")}</span>
      <span data-label="Lớp">${escapeHtml(row.className)}</span>
      <span data-label="Buổi đã mở">${row.opened}</span>
      <span data-label="Hoàn thành">${row.completed}</span>
      <span data-label="% tiến độ">${row.percent}%</span>
      <span data-label="Lần hoạt động cuối">${escapeHtml(last)}</span>
    </div>
  `;
}

function renderStatusCard(message){
  return `
    <section class="auth-card status-card">
      <p>${escapeHtml(message)}</p>
      <div class="student-actions">
        <a class="btn-primary" href="/student-login">Đăng nhập</a>
        <button class="btn-ghost" id="studentLogoutBtn">Đăng xuất</button>
      </div>
    </section>
  `;
}

function attachLogoutHandler(){
  document.getElementById("studentLogoutBtn")?.addEventListener("click", async () => {
    clearRealtime(adminChannels);
    clearRealtime(studentChannels);
    if(hasSupabaseConfig) await signOut();
    window.history.pushState({}, "", "/student-login");
    await renderAuthRoute();
  });
}

function openLessonFromAuth(lessonId){
  hideAuthView();
  window.history.pushState({}, "", `/lesson/${lessonId}`);
  window.openLesson?.(lessonId);
}

function clearRealtime(channels){
  channels.splice(0).forEach((channel) => unsubscribeRealtime(channel));
}

function setMessage(element, text, kind){
  if(!element) return;
  element.textContent = text;
  element.className = `auth-message ${kind || ""}`.trim();
}

function friendlyAuthError(message){
  if(/already registered|already exists/i.test(message)) return "Email này đã được đăng ký.";
  if(/password/i.test(message)) return "Mật khẩu chưa hợp lệ.";
  return message || "Không thể xử lý yêu cầu.";
}

function membershipStatusLabel(status){
  const labels = {
    pending: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
    removed: "Đã xóa",
  };
  return labels[status] || status || "Không rõ";
}

function classStatusLabel(status){
  const labels = {
    active: "Active",
    archived: "Archived",
  };
  return labels[status] || status || "Không rõ";
}

function escapeHtml(value){
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
