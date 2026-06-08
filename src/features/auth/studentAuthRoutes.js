import { LESSONS } from "../lessons/lessonRegistry.js";
import { getCurrentProfile, profileStatusLabel, requireAdmin, requireApprovedStudent, STATUS_MESSAGES } from "./authGuard.js";
import { getSupabaseConfigError, hasSupabaseConfig } from "../../lib/supabase/client.js";
import { signInStudent, signOut, signUpStudent } from "./authService.js";
import { listStudents, updateStudentStatus } from "../admin/adminStudentsService.js";

const AUTH_ROUTES = new Set(["/student-register", "/student-login", "/student", "/admin/students"]);
const STUDENT_STATUS_FILTERS = [
  ["pending", "Chờ duyệt"],
  ["approved", "Đã duyệt"],
  ["rejected", "Từ chối"],
  ["blocked", "Bị khóa"],
  ["all", "Tất cả"],
];

let currentAdminFilter = "pending";

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

  const view = ensureAuthView();
  document.getElementById("homeView")?.classList.remove("active");
  document.getElementById("lessonView")?.classList.remove("active");
  view.classList.add("active");
  view.innerHTML = renderShell("Đang tải...", `<div class="auth-loading">Đang tải...</div>`);

  if(path === "/student-register") renderStudentRegister(view);
  if(path === "/student-login") renderStudentLogin(view);
  if(path === "/student") await renderStudentDashboard(view);
  if(path === "/admin/students") await renderAdminStudents(view);

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
  view.innerHTML = renderShell("Đăng nhập học viên", `
    ${renderConfigWarning()}
    <form class="auth-card auth-form" id="studentLoginForm">
      <label>Email<input name="email" type="email" autocomplete="email" required></label>
      <label>Mật khẩu<input name="password" type="password" autocomplete="current-password" required></label>
      <button class="btn-primary auth-submit" type="submit">Đăng nhập</button>
      <div class="auth-row">
        <a href="/student-register">Đăng ký học viên</a>
        <a href="/admin/students">Khu vực admin</a>
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
      setMessage(message, "Không tải được hồ sơ tài khoản. Vui lòng liên hệ giáo viên.", "error");
      return;
    }
    if(profile.status === "approved"){
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
    return;
  }

  const lessonCards = [...LESSONS]
    .sort((a, b) => a.id - b.id)
    .map((lesson) => `
      <button class="student-lesson" data-lesson-id="${lesson.id}">
        <span>Buổi ${lesson.id}</span>
        <strong>${escapeHtml(lesson.title)}</strong>
        <small>${escapeHtml(lesson.subtitle || lesson.unit || "")}</small>
      </button>
    `).join("");

  view.innerHTML = renderShell("Khu vực học viên", `
    <section class="auth-card student-dashboard">
      <div class="student-welcome">
        <div>
          <p>Xin chào,</p>
          <h2>${escapeHtml(guard.profile.full_name || guard.user.email || "Học viên")}</h2>
        </div>
        <span class="status-badge status-approved">Trạng thái tài khoản: Đã duyệt</span>
      </div>
      <div class="student-actions">
        <button class="btn-primary" id="studentContinueBtn">Vào buổi học tiếp theo</button>
        <button class="btn-ghost" id="studentLogoutBtn">Đăng xuất</button>
      </div>
    </section>
    <section class="student-lessons">
      <h2>Danh sách buổi học hiện tại</h2>
      <div class="student-lesson-grid">${lessonCards}</div>
    </section>
  `);

  document.getElementById("studentContinueBtn").addEventListener("click", () => openLessonFromAuth(window.getNextLessonId?.() || 1));
  attachLogoutHandler();
  view.querySelectorAll("[data-lesson-id]").forEach((button) => {
    button.addEventListener("click", () => openLessonFromAuth(Number(button.dataset.lessonId)));
  });
}

async function renderAdminStudents(view){
  const guard = await requireAdmin();
  if(guard.reason === "unauthenticated"){
    window.history.replaceState({}, "", "/student-login");
    renderStudentLogin(view);
    return;
  }
  if(!guard.ok){
    view.innerHTML = renderShell("Quản lý học viên", renderStatusCard(guard.message));
    attachLogoutHandler();
    return;
  }

  view.innerHTML = renderShell("Quản lý học viên", `
    <section class="auth-card admin-panel">
      <div class="admin-toolbar">
        <div class="filter-tabs">
          ${STUDENT_STATUS_FILTERS.map(([value, label]) => `
            <button class="${value === currentAdminFilter ? "active" : ""}" data-filter="${value}">${label}</button>
          `).join("")}
        </div>
        <button class="btn-ghost" id="studentLogoutBtn">Đăng xuất</button>
      </div>
      <div class="auth-message" id="adminStudentsMessage" role="status"></div>
      <div id="adminStudentsList" class="admin-list">Đang tải danh sách học viên...</div>
    </section>
  `);

  attachLogoutHandler();
  view.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", async () => {
      currentAdminFilter = button.dataset.filter;
      await renderAdminStudents(view);
    });
  });
  await loadAdminStudents();
}

async function loadAdminStudents(){
  const list = document.getElementById("adminStudentsList");
  const message = document.getElementById("adminStudentsMessage");
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
    <div class="admin-table" role="table">
      <div class="admin-table-head" role="row">
        <span>Họ tên</span><span>Số điện thoại</span><span>Email</span><span>Ngày đăng ký</span><span>Trạng thái</span><span>Ghi chú</span><span>Hành động</span>
      </div>
      ${data.map(renderStudentRow).join("")}
    </div>
  `;

  list.querySelectorAll("[data-action-status]").forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.dataset.studentId;
      const status = button.dataset.actionStatus;
      button.disabled = true;
      setMessage(message, "Đang cập nhật...", "");
      const { error: updateError } = await updateStudentStatus(id, status);

      if(updateError){
        button.disabled = false;
        setMessage(message, `Cập nhật thất bại: ${updateError.message}`, "error");
        return;
      }

      setMessage(message, "Cập nhật trạng thái thành công.", "success");
      await loadAdminStudents();
    });
  });
}

function renderStudentRow(student){
  const createdAt = student.created_at ? new Date(student.created_at).toLocaleDateString("vi-VN") : "";
  return `
    <div class="admin-table-row" role="row">
      <span data-label="Họ tên">${escapeHtml(student.full_name || "")}</span>
      <span data-label="Số điện thoại">${escapeHtml(student.phone || "")}</span>
      <span data-label="Email">${escapeHtml(student.email || "")}</span>
      <span data-label="Ngày đăng ký">${escapeHtml(createdAt)}</span>
      <span data-label="Trạng thái"><b class="status-badge status-${escapeHtml(student.status)}">${profileStatusLabel(student.status)}</b></span>
      <span data-label="Ghi chú">${escapeHtml(student.note || "")}</span>
      <span class="admin-actions" data-label="Hành động">
        <button data-student-id="${student.id}" data-action-status="approved">Duyệt</button>
        <button data-student-id="${student.id}" data-action-status="rejected">Từ chối</button>
        <button data-student-id="${student.id}" data-action-status="blocked">Khóa</button>
        <button data-student-id="${student.id}" data-action-status="approved">Mở lại</button>
      </span>
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
    if(hasSupabaseConfig) await signOut();
    window.history.pushState({}, "", "/student-login");
    await renderAuthRoute();
  });
}

function openLessonFromAuth(lessonId){
  hideAuthView();
  window.history.pushState({}, "", "/");
  window.openLesson?.(lessonId);
}

function setMessage(element, text, kind){
  element.textContent = text;
  element.className = `auth-message ${kind || ""}`.trim();
}

function friendlyAuthError(message){
  if(/already registered|already exists/i.test(message)) return "Email này đã được đăng ký.";
  if(/password/i.test(message)) return "Mật khẩu chưa hợp lệ.";
  return message || "Không thể xử lý yêu cầu.";
}

function escapeHtml(value){
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
