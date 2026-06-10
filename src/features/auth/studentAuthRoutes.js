import { getCurrentProfile, getCurrentSession, getCurrentUser, profileStatusLabel, requireAdmin, requireApprovedStudent } from "./authGuard.js";
import { getSupabaseConfigError, hasSupabaseConfig } from "../../lib/supabase/client.js";
import { establishSessionFromAuthUrl, resetPasswordForEmail, signInStudent, signOut, signUpStudent, updatePassword } from "./authService.js";
import { getLessons } from "../lessons/lessonRepository.js";
import { migrateLocalProgressToSupabase, remoteProgressToLocalShape } from "../progress/progressRepository.js";
import {
  approveStudentForClass,
  createClass,
  listClasses,
  listClassMemberships,
  listPendingClassRequests,
  listStudentProgress,
  listStudents,
  rejectStudent,
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
import { COURSE_TOTAL_LESSONS } from "../curriculum/curriculumMap.js";

const AUTH_ROUTES = new Set([
  "/register",
  "/login",
  "/student-register",
  "/student-login",
  "/forgot-password",
  "/auth/callback",
  "/reset-password",
  "/pending-approval",
  "/rejected",
  "/student",
  "/admin",
  "/admin/approvals",
  "/admin/students",
  "/admin/classes",
  "/admin/requests",
  "/admin/progress",
]);
const STUDENT_STATUS_FILTERS = [
  ["pending", "Chờ duyệt"],
  ["approved", "Đã duyệt"],
  ["rejected", "Từ chối"],
  ["all", "Tất cả"],
];
const ADMIN_TABS = [
  ["overview", "Tổng quan"],
  ["approvals", "Duyệt học viên"],
  ["students", "Học viên"],
  ["classes", "Lớp học"],
  ["requests", "Duyệt vào lớp"],
  ["progress", "Tiến độ / Báo cáo"],
];
const ADMIN_TAB_PATHS = {
  overview: "/admin",
  approvals: "/admin/approvals",
  students: "/admin/students",
  classes: "/admin/classes",
  requests: "/admin/requests",
  progress: "/admin/progress",
};

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
  if(!AUTH_ROUTES.has(path)){
    document.body.classList.remove("admin-active");
    return false;
  }
  document.body.classList.toggle("admin-active", path.startsWith("/admin"));

  clearRealtime(adminChannels);
  clearRealtime(studentChannels);

  const view = ensureAuthView();
  view.classList.toggle("admin-route", path.startsWith("/admin"));
  document.getElementById("authCheckView")?.classList.remove("active");
  document.getElementById("homeView")?.classList.remove("active");
  document.getElementById("lessonView")?.classList.remove("active");
  view.classList.add("active");
  view.innerHTML = renderShell("Đang kiểm tra tài khoản...", `<div class="auth-loading"><span class="auth-spinner" aria-hidden="true"></span>Đang kiểm tra tài khoản...</div>`);

  try{
    if(path === "/register" || path === "/student-register") renderStudentRegister(view);
    if(path === "/login" || path === "/student-login") renderStudentLogin(view);
    if(path === "/forgot-password") renderForgotPassword(view);
    if(path === "/auth/callback") await renderAuthCallback(view);
    if(path === "/reset-password") await renderResetPassword(view);
    if(path === "/pending-approval") await renderAccountStatusPage(view);
    if(path === "/rejected") await renderAccountStatusPage(view);
    if(path === "/student") await renderStudentDashboard(view);
    if(path.startsWith("/admin")){
      currentAdminTab = getAdminTabFromPath(path);
      await renderAdmin(view);
    }
  }catch(error){
    console.error("[FClass auth] Route check failed", error);
    document.body.classList.remove("admin-active");
    view.classList.remove("admin-route");
    view.innerHTML = renderShell(
      "Không thể kiểm tra tài khoản",
      renderStatusCard("Không thể kiểm tra tài khoản. Vui lòng tải lại trang hoặc đăng nhập lại.", { showReload: true }),
    );
    attachAuthRecoveryHandlers();
  }

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

function getAdminTabFromPath(path){
  return Object.entries(ADMIN_TAB_PATHS).find(([, route]) => route === path)?.[0] || "overview";
}

function renderShell(title, body, subtitle = ""){
  return `
    <section class="auth-shell">
      <div class="auth-header">
        <span class="eyebrow auth-eyebrow">Tuwi A1 · ${COURSE_TOTAL_LESSONS} buổi</span>
        <h1>${escapeHtml(title)}</h1>
        ${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ""}
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
      <label>Họ và tên<input name="fullName" autocomplete="name" required></label>
      <label>Email<input name="email" type="email" autocomplete="email" required></label>
      <label>Mật khẩu<input name="password" type="password" autocomplete="new-password" required minlength="6"></label>
      <label>Xác nhận mật khẩu<input name="confirmPassword" type="password" autocomplete="new-password" required minlength="6"></label>
      <button class="btn-primary auth-submit" type="submit">Đăng ký</button>
      <p class="auth-switch">Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
      <div class="auth-message" id="studentRegisterMessage" role="status"></div>
    </form>
  `, "Tạo tài khoản để chờ admin duyệt vào lớp TuWi A1.");

  document.getElementById("studentRegisterForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("studentRegisterMessage");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if(!fullName || !email || !password || !confirmPassword){
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

    const submit = formElement.querySelector("button[type='submit']");
    if(submit){
      submit.disabled = true;
      submit.textContent = "Đang tạo tài khoản...";
    }
    setMessage(message, "Đang tạo tài khoản...", "");

    try{
      const { data, error } = await signUpStudent({ fullName, phone: "", email, password });

      if(error){
        setMessage(message, friendlyAuthError(error.message), "error");
        return;
      }

      if(formElement){
        formElement.reset();
      }

      if(data && !data.session && data.user){
        // Email confirmation is required, render a friendly notification card
        if(formElement){
          formElement.outerHTML = `
            <div class="auth-card status-card" style="display: grid; gap: 16px; justify-items: center; text-align: center; max-width: 520px; margin: 0 auto;">
              <div style="font-size: 48px; margin-bottom: 8px;">✉️</div>
              <p style="font-size: 18px; color: var(--navy); font-weight: 700; margin: 0;">Đăng ký thành công!</p>
              <span class="status-badge status-pending">Đang chờ xác thực email</span>
              <p style="color: var(--ink-mute); font-size: 14px; margin: 0; max-width: 420px; line-height: 1.6;">
                Tài khoản đã được tạo. Vui lòng kiểm tra email để xác nhận, sau đó chờ admin duyệt vào lớp.
              </p>
              <div class="student-actions" style="margin-top: 8px; justify-content: center; width: 100%;">
                <a class="btn-primary" href="/login" style="text-decoration: none; display: inline-flex; justify-content: center; width: 100%;">Đi tới Đăng nhập</a>
              </div>
            </div>
          `;
        }
      }else if(data?.session || data?.user){
        setMessage(message, "Đăng ký thành công. Vui lòng chờ admin duyệt tài khoản.", "success");
        window.history.pushState({}, "", "/pending-approval");
        await renderAuthRoute();
      }
    }catch(err){
      console.error("[FClass auth] Registration error", err);
      setMessage(message, friendlyAuthError(err?.message || err), "error");
    }finally{
      if(submit){
        submit.disabled = false;
        submit.textContent = "Đăng ký";
      }
    }
  });
}

function renderStudentLogin(view){
  const resetSucceeded = new URLSearchParams(window.location.search).get("reset") === "success";
  if(resetSucceeded) window.history.replaceState({}, "", "/login");
  view.innerHTML = renderShell("Đăng nhập học viên", `
    ${renderConfigWarning()}
    <form class="auth-card auth-form" id="studentLoginForm">
      ${resetSucceeded ? `<div class="auth-alert success">Đặt lại mật khẩu thành công. Vui lòng đăng nhập lại.</div>` : ""}
      <label>Email<input name="email" type="email" autocomplete="email" required></label>
      <label>Mật khẩu<input name="password" type="password" autocomplete="current-password" required></label>
      <button class="btn-primary auth-submit" type="submit">Đăng nhập</button>
      <div class="auth-row">
        <span>Chưa có tài khoản? <a href="/register">Đăng ký</a></span>
        <a href="/forgot-password">Quên mật khẩu?</a>
      </div>
      <div class="auth-message" id="studentLoginMessage" role="status"></div>
    </form>
  `, `Vào lớp TuWi A1 để tiếp tục học ${COURSE_TOTAL_LESSONS} buổi.`);

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
    submit.textContent = "Đang đăng nhập...";
    setMessage(message, "Đang đăng nhập...", "");
    const { data, error } = await signInStudent(email, password);
    submit.disabled = false;
    submit.textContent = "Đăng nhập";

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
      window.history.pushState({}, "", "/admin/approvals");
      await renderAuthRoute();
      return;
    }
    if(profile.role === "student" && profile.status === "approved"){
      window.location.assign("/");
      return;
    }

    window.history.pushState({}, "", profile.status === "rejected" || profile.status === "blocked" ? "/rejected" : "/pending-approval");
    await renderAuthRoute();
  });
}

function renderForgotPassword(view){
  view.innerHTML = renderShell("Quên mật khẩu", `
    ${renderConfigWarning()}
    <form class="auth-card auth-form" id="forgotPasswordForm">
      <p class="auth-form-note">Nhập email đã đăng ký. Hệ thống sẽ gửi link đặt lại mật khẩu về hộp thư của bạn.</p>
      <label>Email<input name="email" type="email" autocomplete="email" required></label>
      <button class="btn-primary auth-submit" type="submit">Gửi link đặt lại mật khẩu</button>
      <p class="auth-switch"><a href="/login">Quay lại đăng nhập</a></p>
      <div class="auth-message" id="forgotPasswordMessage" role="status"></div>
    </form>
  `, "Lấy lại quyền vào lớp TuWi A1 bằng email của bạn.");

  document.getElementById("forgotPasswordForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("forgotPasswordMessage");
    const email = String(new FormData(event.currentTarget).get("email") || "").trim();
    if(!email){
      setMessage(message, "Vui lòng nhập email.", "error");
      return;
    }
    const submit = event.currentTarget.querySelector("button[type='submit']");
    submit.disabled = true;
    submit.textContent = "Đang gửi...";
    setMessage(message, "Đang gửi email...", "");
    try{
      const { error } = await resetPasswordForEmail(email);
      if(error){
        setMessage(message, friendlyAuthError(error.message), "error");
        return;
      }
      setMessage(message, "Nếu email tồn tại, hệ thống đã gửi link đặt lại mật khẩu. Vui lòng kiểm tra hộp thư.", "success");
    }catch(error){
      setMessage(message, friendlyAuthError(error?.message || error), "error");
    }finally{
      submit.disabled = false;
      submit.textContent = "Gửi link đặt lại mật khẩu";
    }
  });
}

async function renderAuthCallback(view){
  view.innerHTML = renderShell("Đang xác thực", `<div class="auth-loading">Đang xử lý liên kết Supabase...</div>`);
  if(!hasSupabaseConfig){
    view.innerHTML = renderShell("Lỗi cấu hình", `<div class="auth-alert error">${escapeHtml(getSupabaseConfigError())}</div>`);
    return;
  }

  const recoveryRequested = isRecoveryAuthUrl();
  const { session, type, error } = await establishSessionFromAuthUrl();
  if(error){
    if(recoveryRequested || isExpiredRecoveryError(error)){
      renderRecoveryLinkError(view);
      return;
    }
    view.innerHTML = renderShell("Không thể xác thực", renderStatusCard(friendlyAuthError(error.message), { showLogin: true }));
    attachLogoutHandler();
    return;
  }

  if(recoveryRequested || type === "recovery"){
    if(!session){
      renderRecoveryLinkError(view);
      return;
    }
    window.history.replaceState({}, "", "/reset-password");
    await renderResetPassword(view, { sessionReady: true });
    return;
  }
  await redirectAfterAuthCallback(view);
}

async function renderResetPassword(view, { sessionReady = false } = {}){
  if(!hasSupabaseConfig){
    view.innerHTML = renderShell("Lỗi cấu hình", `<div class="auth-alert error">${escapeHtml(getSupabaseConfigError())}</div>`);
    return;
  }

  if(!sessionReady){
    view.innerHTML = renderShell("Đang xác thực", `<div class="auth-loading">Đang xử lý link đặt lại mật khẩu...</div>`);
    const { session, error } = await establishSessionFromAuthUrl();
    if(error || !session){
      renderRecoveryLinkError(view);
      return;
    }
    window.history.replaceState({}, "", "/reset-password");
  }

  view.innerHTML = renderShell("Đặt lại mật khẩu", `
    ${renderConfigWarning()}
    <form class="auth-card auth-form" id="resetPasswordForm">
      <p class="auth-form-note">Tạo mật khẩu mới để tiếp tục học ${COURSE_TOTAL_LESSONS} buổi TuWi A1.</p>
      <label>Mật khẩu mới<input name="password" type="password" autocomplete="new-password" required minlength="8"></label>
      <label>Xác nhận mật khẩu<input name="confirmPassword" type="password" autocomplete="new-password" required minlength="8"></label>
      <button class="btn-primary auth-submit" type="submit">Cập nhật mật khẩu</button>
      <div class="auth-message" id="resetPasswordMessage" role="status"></div>
    </form>
  `, "Hoàn tất đổi mật khẩu trong một bước.");

  document.getElementById("resetPasswordForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const message = document.getElementById("resetPasswordMessage");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");
    if(password.length < 8){
      setMessage(message, "Mật khẩu mới phải có ít nhất 8 ký tự.", "error");
      return;
    }
    if(password !== confirmPassword){
      setMessage(message, "Mật khẩu xác nhận chưa khớp.", "error");
      return;
    }
    const submit = event.currentTarget.querySelector("button[type='submit']");
    submit.disabled = true;
    submit.textContent = "Đang cập nhật...";
    setMessage(message, "Đang cập nhật mật khẩu...", "");
    try{
      const { session, error: sessionError } = await getCurrentSession();
      if(sessionError || !session){
        renderRecoveryLinkError(view);
        return;
      }
      const { error } = await updatePassword(password);
      if(error){
        setMessage(message, friendlyAuthError(error.message), "error");
        return;
      }
      await signOut();
      window.history.replaceState({}, "", "/login?reset=success");
      renderStudentLogin(view);
      await window.refreshAuthNavbar?.();
    }catch(error){
      setMessage(message, friendlyAuthError(error?.message || error), "error");
    }finally{
      submit.disabled = false;
      submit.textContent = "Cập nhật mật khẩu";
    }
  });
}

function isRecoveryAuthUrl(){
  const query = new URLSearchParams(window.location.search);
  const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  return query.get("type") === "recovery" || hash.get("type") === "recovery";
}

function isExpiredRecoveryError(error){
  return /otp_expired|expired|invalid/i.test(`${error?.code || ""} ${error?.message || ""}`);
}

function renderRecoveryLinkError(view){
  view.innerHTML = renderShell("Link đặt lại mật khẩu không hợp lệ", `
    <section class="auth-card recovery-error-card">
      <div class="recovery-error-mark" aria-hidden="true">!</div>
      <p>Link đặt lại mật khẩu đã hết hạn hoặc không hợp lệ. Vui lòng gửi lại yêu cầu đặt lại mật khẩu.</p>
      <div class="student-actions">
        <a class="btn-primary" href="/forgot-password">Gửi lại link đặt mật khẩu</a>
        <a class="btn-ghost" href="/login">Quay lại đăng nhập</a>
      </div>
    </section>
  `, "Liên kết bảo mật chỉ có hiệu lực trong thời gian ngắn.");
}

async function redirectAfterAuthCallback(view){
  const { user } = await getCurrentUser();
  if(!user){
    window.history.replaceState({}, "", "/login");
    renderStudentLogin(view);
    return;
  }

  const { profile, error } = await getCurrentProfile(user.id);
  if(error || !profile){
    window.history.replaceState({}, "", "/student");
    await renderStudentDashboard(view);
    return;
  }

  if(profile.role === "admin" && profile.status === "approved"){
    window.history.replaceState({}, "", "/admin/approvals");
    await renderAdmin(view);
    return;
  }
  if(profile.status === "approved"){
    window.location.assign("/");
    return;
  }

  window.history.replaceState({}, "", profile.status === "rejected" || profile.status === "blocked" ? "/rejected" : "/pending-approval");
  await renderAccountStatusPage(view);
}

async function renderAccountStatusPage(view){
  const { user } = await getCurrentUser();
  if(!user){
    window.history.replaceState({}, "", "/login");
    renderStudentLogin(view);
    return;
  }

  const { profile, error } = await getCurrentProfile(user.id);
  if(error || !profile){
    view.innerHTML = renderShell("Trạng thái tài khoản", renderStatusCard("Không tải được hồ sơ tài khoản. Vui lòng liên hệ admin."));
    attachLogoutHandler();
    return;
  }
  if(profile.role === "admin" && profile.status === "approved"){
    window.history.replaceState({}, "", "/admin");
    await renderAdmin(view);
    return;
  }
  if(profile.status === "approved"){
    window.history.replaceState({}, "", "/student");
    await renderStudentDashboard(view);
    return;
  }

  const isRejected = profile.status === "rejected" || profile.status === "blocked";
  const title = isRejected ? "Tài khoản chưa được chấp nhận" : "Tài khoản đang chờ duyệt";
  const message = isRejected
    ? "Tài khoản của bạn chưa được mở vào lớp TuWi A1. Vui lòng liên hệ giáo viên hoặc admin nếu cần hỗ trợ."
    : "Admin sẽ duyệt tài khoản của bạn trước khi bạn vào lớp.";
  view.innerHTML = renderShell(title, renderStatusCard(message, {
    status: isRejected ? "rejected" : "pending",
    label: isRejected ? "Chưa được chấp nhận" : "Chờ duyệt",
  }), isRejected ? "Thông tin tài khoản đã được ghi nhận." : "Đăng ký thành công. Vui lòng chờ admin duyệt tài khoản.");
  attachLogoutHandler();
  attachStudentRealtime(view, user.id);
}

async function renderStudentDashboard(view){
  const guard = await requireApprovedStudent();
  if(guard.reason === "unauthenticated"){
    window.history.replaceState({}, "", "/login");
    renderStudentLogin(view);
    return;
  }
  if(!guard.ok){
    view.innerHTML = renderShell("Trạng thái tài khoản", renderStatusCard(guard.message, { showReload: isRecoverableAuthGuardFailure(guard.reason) }));
    attachLogoutHandler();
    attachReloadHandler();
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
      <h2>Danh sách ${COURSE_TOTAL_LESSONS} buổi</h2>
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
    return `<section class="empty-state">Bạn đã được duyệt tài khoản. Vui lòng chờ admin thêm bạn vào lớp trước khi mở ${COURSE_TOTAL_LESSONS} buổi học.</section>`;
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
    document.body.classList.remove("admin-active");
    view.classList.remove("admin-route");
    window.history.replaceState({}, "", "/login");
    renderStudentLogin(view);
    return;
  }
  if(!guard.ok){
    document.body.classList.remove("admin-active");
    view.classList.remove("admin-route");
    view.innerHTML = renderShell("Admin TuWi A1", renderStatusCard(guard.message, {
      showLogin: true,
      showReload: isRecoverableAuthGuardFailure(guard.reason),
    }));
    attachLogoutHandler();
    attachReloadHandler();
    return;
  }

  const { title, subtitle } = getAdminShellCopy();
  const pendingResult = await listStudents("pending");
  const pendingApprovals = pendingResult.error ? 0 : pendingResult.data?.length || 0;
  view.innerHTML = renderAdminLayout({
    title,
    subtitle,
    user: guard.user,
    profile: guard.profile,
    pendingApprovals,
  });

  attachLogoutHandler();
  attachAdminLayoutHandlers(view);
  await renderAdminTab(view, guard.user.id);
  attachAdminRealtime(view, guard.user.id);
}

function renderAdminLayout({ title, subtitle, user, profile, pendingApprovals }){
  return `
    <section class="admin-shell">
      ${renderAdminSidebar(pendingApprovals)}
      <div class="admin-sidebar-backdrop" data-admin-close></div>
      <div class="admin-main">
        ${renderAdminTopbar({ title, subtitle, user, profile })}
        <div class="auth-message admin-message" id="adminMessage" role="status"></div>
        <main class="admin-content" id="adminContent">Đang tải dữ liệu...</main>
      </div>
    </section>
  `;
}

function renderAdminSidebar(pendingApprovals){
  return `
    <aside class="admin-sidebar" id="adminSidebar" aria-label="Admin menu">
      <div class="admin-brand">
        <span class="admin-brand-mark">T</span>
        <span>
          <strong>TuWi A1 Admin</strong>
          <small>FClass A1</small>
        </span>
      </div>
      <nav class="admin-nav">
        ${ADMIN_TABS.map(([value, label]) => `
          <button class="admin-nav-item ${value === currentAdminTab ? "active" : ""}" data-admin-tab="${value}">
            <span>${escapeHtml(label)}</span>
            ${value === "approvals" && pendingApprovals ? `<b>${pendingApprovals}</b>` : ""}
          </button>
        `).join("")}
      </nav>
      <div class="admin-sidebar-actions">
        <button class="admin-nav-item secondary" data-admin-home>Trang chủ</button>
        <button class="admin-nav-item danger" id="studentLogoutBtn">Đăng xuất</button>
      </div>
    </aside>
  `;
}

function renderAdminTopbar({ title, subtitle, user, profile }){
  const identity = profile?.full_name || user?.email || "Admin";
  const email = user?.email || profile?.email || "";
  return `
    <header class="admin-topbar">
      <button class="admin-menu-toggle" data-admin-menu aria-label="Mở menu admin">☰</button>
      <div class="admin-page-title">
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(subtitle)}</p>
      </div>
      <div class="admin-topbar-actions">
        <button class="admin-icon-btn" data-admin-home aria-label="Trang chủ">⌂</button>
        <div class="admin-user-chip" title="${escapeHtml(email)}">
          <strong>${escapeHtml(identity)}</strong>
          <span>${escapeHtml(email)}</span>
        </div>
      </div>
    </header>
  `;
}

function attachAdminLayoutHandlers(view){
  const shell = view.querySelector(".admin-shell");
  view.querySelector("[data-admin-menu]")?.addEventListener("click", () => {
    view.classList.add("admin-menu-open");
  });
  view.querySelectorAll("[data-admin-close]").forEach((element) => {
    element.addEventListener("click", () => view.classList.remove("admin-menu-open"));
  });
  view.querySelectorAll("[data-admin-home]").forEach((button) => {
    button.addEventListener("click", () => {
      window.location.assign("/");
    });
  });
  shell?.addEventListener("click", async (event) => {
    const tabButton = event.target.closest("[data-admin-tab]");
    if(!tabButton) return;
    currentAdminTab = tabButton.dataset.adminTab;
    const nextPath = ADMIN_TAB_PATHS[currentAdminTab] || ADMIN_TAB_PATHS.overview;
    if(window.location.pathname !== nextPath) window.history.pushState({}, "", nextPath);
    await renderAdmin(view);
  });
}

async function renderAdminTab(view, adminId){
  if(currentAdminTab === "overview") return renderAdminOverview();
  if(currentAdminTab === "approvals") return renderAdminApprovals(adminId);
  if(currentAdminTab === "students") return renderAdminStudents(adminId);
  if(currentAdminTab === "classes") return renderAdminClasses(view);
  if(currentAdminTab === "requests") return renderAdminClassRequests(adminId);
  if(currentAdminTab === "progress") return renderAdminProgress();
}

function getAdminShellCopy(){
  const copy = {
    overview: ["Admin TuWi A1", "Tổng quan học viên, lớp học và tiến độ."],
    approvals: ["Duyệt học viên", "Quản lý học viên đăng ký vào lớp TuWi A1"],
    students: ["Danh sách học viên", "Theo dõi trạng thái học viên của lớp TuWi A1."],
    classes: ["Lớp học", "Quản lý lớp TuWi A1 và các lớp đang mở."],
    requests: ["Duyệt vào lớp", "Xử lý yêu cầu tham gia lớp của học viên đã được duyệt."],
    progress: ["Tiến độ học viên", "Theo dõi số buổi đã mở, hoàn thành và hoạt động gần nhất."],
  };
  const [title, subtitle] = copy[currentAdminTab] || copy.overview;
  return { title, subtitle };
}

async function renderAdminOverview(){
  const content = document.getElementById("adminContent");
  const [allStudents, pendingStudents, approvedStudents, pendingRequests, classesResult] = await Promise.all([
    listStudents("all"),
    listStudents("pending"),
    listStudents("approved"),
    listPendingClassRequests(),
    listClasses(),
  ]);
  const errors = [allStudents.error, pendingStudents.error, approvedStudents.error, pendingRequests.error, classesResult.error].filter(Boolean);
  if(errors.length){
    content.innerHTML = `<div class="empty-state">Không tải được tổng quan. ${escapeHtml(errors[0].message)}</div>`;
    return;
  }
  const activeClasses = (classesResult.data || []).filter((klass) => klass.status === "active");
  const approvedStudentsCount = approvedStudents.data?.length || 0;
  content.innerHTML = `
    <div class="admin-stat-grid">
      ${renderAdminStat("Tổng học viên", allStudents.data?.length || 0)}
      ${renderAdminStat("Học viên chờ duyệt", pendingStudents.data?.length || 0)}
      ${renderAdminStat("Học viên đã duyệt", approvedStudentsCount)}
      ${renderAdminStat("Lớp học", activeClasses.length)}
    </div>
    <section class="admin-quick-actions">
      <div class="admin-section-head compact">
        <h2>Thao tác nhanh</h2>
        <p>Mở nhanh các khu vực quản trị đang dùng dữ liệu thật từ Supabase.</p>
      </div>
      <div class="admin-action-grid">
        <button data-admin-tab="approvals">
          <strong>Duyệt học viên</strong>
          <span>${pendingStudents.data?.length || 0} tài khoản đang chờ</span>
        </button>
        <button data-admin-tab="students">
          <strong>Xem danh sách học viên</strong>
          <span>${approvedStudentsCount} học viên đã duyệt</span>
        </button>
        <button data-admin-tab="classes">
          <strong>Xem lớp học</strong>
          <span>${activeClasses.length} lớp đang active</span>
        </button>
        <button data-admin-tab="requests">
          <strong>Duyệt vào lớp</strong>
          <span>${pendingRequests.data?.length || 0} yêu cầu vào lớp</span>
        </button>
      </div>
    </section>
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

async function renderAdminApprovals(adminId){
  const content = document.getElementById("adminContent");
  const [studentsResult, classesResult] = await Promise.all([
    listStudents("pending"),
    listClasses(),
  ]);
  if(studentsResult.error || classesResult.error){
    content.innerHTML = `<div class="empty-state">Không tải được danh sách duyệt. ${escapeHtml(studentsResult.error?.message || classesResult.error?.message || "")}</div>`;
    return;
  }

  const classes = (classesResult.data || []).filter((klass) => klass.status === "active");
  if(!classes.length){
    content.innerHTML = `<div class="empty-state">Cần tạo ít nhất một lớp active trước khi duyệt học viên.</div>`;
    return;
  }
  if(!studentsResult.data?.length){
    content.innerHTML = `<div class="empty-state">Không có học viên chờ duyệt.</div>`;
    return;
  }

  content.innerHTML = `
    <div class="admin-section-head">
      <h2>Duyệt học viên</h2>
      <p>Duyệt tài khoản học viên vào lớp TuWi A1.</p>
    </div>
    <div class="admin-table admin-table-approvals" role="table">
      <div class="admin-table-head" role="row">
        <span>Họ tên</span><span>Email</span><span>Ngày đăng ký</span><span>Trạng thái</span><span>Lớp</span><span>Hành động</span>
      </div>
      ${studentsResult.data.map((student) => renderApprovalRow(student, classes)).join("")}
    </div>
  `;

  content.querySelectorAll("[data-approve-student]").forEach((button) => {
    button.addEventListener("click", async () => {
      const message = document.getElementById("adminMessage");
      const row = button.closest("[data-student-row]");
      const classId = row?.querySelector("[data-approval-class]")?.value;
      if(!classId){
        setMessage(message, "Vui lòng chọn lớp trước khi duyệt.", "error");
        return;
      }
      button.disabled = true;
      button.textContent = "Đang duyệt...";
      setMessage(message, "Đang duyệt học viên và thêm vào lớp...", "");
      const { error } = await approveStudentForClass(button.dataset.approveStudent, classId, adminId);
      if(error){
        button.disabled = false;
        button.textContent = "Duyệt";
        setMessage(message, `Duyệt thất bại: ${error.message}`, "error");
        return;
      }
      setMessage(message, "Đã duyệt học viên và thêm vào lớp.", "success");
      await renderAdminApprovals(adminId);
    });
  });

  content.querySelectorAll("[data-reject-student]").forEach((button) => {
    button.addEventListener("click", async () => {
      if(!window.confirm("Từ chối học viên này?")) return;
      const message = document.getElementById("adminMessage");
      const row = button.closest("[data-student-row]");
      const classId = row?.querySelector("[data-approval-class]")?.value || null;
      button.disabled = true;
      button.textContent = "Đang từ chối...";
      setMessage(message, "Đang từ chối học viên...", "");
      const { error } = await rejectStudent(button.dataset.rejectStudent, adminId, classId);
      if(error){
        button.disabled = false;
        button.textContent = "Từ chối";
        setMessage(message, `Từ chối thất bại: ${error.message}`, "error");
        return;
      }
      setMessage(message, "Đã từ chối học viên.", "success");
      await renderAdminApprovals(adminId);
    });
  });
}

async function renderAdminStudents(adminId){
  const content = document.getElementById("adminContent");
  content.innerHTML = `
    <div class="admin-toolbar">
      <div class="admin-section-head compact">
        <h2>Danh sách học viên</h2>
        <p>Xem học viên pending, approved và rejected của lớp TuWi A1.</p>
      </div>
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
      await renderAdminStudents(adminId);
    });
  });
  await loadAdminStudents(adminId);
}

async function loadAdminStudents(adminId){
  const list = document.getElementById("adminStudentsList");
  const message = document.getElementById("adminMessage");
  if(!list || !message) return;

  const [studentsResult, membershipsResult] = await Promise.all([
    listStudents(currentAdminFilter),
    listClassMemberships(),
  ]);
  if(studentsResult.error){
    list.innerHTML = `<div class="empty-state">Không tải được danh sách học viên. ${escapeHtml(studentsResult.error.message)}</div>`;
    return;
  }
  const data = studentsResult.data || [];
  if(!data?.length){
    list.innerHTML = `<div class="empty-state">Chưa có học viên trong bộ lọc này.</div>`;
    return;
  }
  if(membershipsResult.error){
    setMessage(message, `Không tải được lớp học viên: ${membershipsResult.error.message}`, "warning");
  }
  const classByStudent = buildStudentClassMap(membershipsResult.data || []);

  list.innerHTML = `
    <div class="admin-table admin-table-students" role="table">
      <div class="admin-table-head" role="row">
        <span>Họ tên</span><span>Email</span><span>Role</span><span>Trạng thái</span><span>Lớp</span><span>Ngày tạo</span><span>Hành động</span>
      </div>
      ${data.map((student) => renderStudentRow(student, classByStudent.get(student.id))).join("")}
    </div>
  `;

  list.querySelectorAll("[data-action-status]").forEach((button) => {
    button.addEventListener("click", async () => {
      if(button.dataset.actionStatus === "rejected" && !window.confirm("Từ chối học viên này?")) return;
      button.disabled = true;
      setMessage(message, "Đang cập nhật học viên...", "");
      let result;
      if(button.dataset.actionStatus === "rejected"){
        result = await rejectStudent(button.dataset.studentId, adminId);
      }else{
        result = await updateStudentStatus(button.dataset.studentId, button.dataset.actionStatus);
      }
      const updateError = result.error;

      if(updateError){
        button.disabled = false;
        setMessage(message, `Cập nhật thất bại: ${updateError.message}`, "error");
        return;
      }

      setMessage(message, "Cập nhật trạng thái học viên thành công.", "success");
      await loadAdminStudents(adminId);
    });
  });
}

async function renderAdminClasses(view){
  const content = document.getElementById("adminContent");
  const [classesResult, membershipsResult] = await Promise.all([
    listClasses(),
    listClassMemberships(),
  ]);
  if(classesResult.error){
    content.innerHTML = `<div class="empty-state">Không tải được lớp học. ${escapeHtml(classesResult.error.message)}</div>`;
    return;
  }
  const memberCounts = buildClassMemberCounts(membershipsResult.data || []);
  const classes = classesResult.data || [];

  content.innerHTML = `
    <form class="auth-form admin-class-form" id="adminClassForm">
      <label>Tên lớp<input name="name" required placeholder="Ví dụ: Tuwi A1 tối thứ 3"></label>
      <label>Mô tả<input name="description" placeholder="Ghi chú ngắn cho lớp"></label>
      <label>Level<input name="level" value="A1" required></label>
      <button class="btn-primary auth-submit" type="submit">Tạo lớp</button>
    </form>
    <div class="admin-table admin-table-classes" role="table">
      <div class="admin-table-head" role="row">
        <span>Tên lớp</span><span>Level</span><span>Trạng thái</span><span>Học viên</span><span>Mô tả</span><span>Ngày tạo</span><span>Hành động</span>
      </div>
      ${classes.map((klass) => renderClassRow(klass, memberCounts.get(klass.id) || 0)).join("") || `<div class="empty-state">Chưa có lớp học.</div>`}
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
    percent: Math.round((item.completed / COURSE_TOTAL_LESSONS) * 100),
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

function buildStudentClassMap(memberships){
  const classByStudent = new Map();
  for(const membership of memberships){
    const current = classByStudent.get(membership.student_id) || [];
    const className = membership.classes?.name || "Chưa rõ lớp";
    current.push(`${className} (${membershipStatusLabel(membership.status)})`);
    classByStudent.set(membership.student_id, current);
  }
  return new Map([...classByStudent.entries()].map(([studentId, classes]) => [studentId, classes.join(", ")]));
}

function buildClassMemberCounts(memberships){
  const counts = new Map();
  for(const membership of memberships){
    if(membership.status !== "approved") continue;
    counts.set(membership.class_id, (counts.get(membership.class_id) || 0) + 1);
  }
  return counts;
}

function renderStudentRow(student, classLabel = "Chưa có lớp"){
  const createdAt = student.created_at ? new Date(student.created_at).toLocaleDateString("vi-VN") : "";
  let actionButtons = "";
  if(student.status === "pending"){
    actionButtons = `
      <button data-student-id="${student.id}" data-action-status="rejected">Từ chối</button>
    `;
  }else if(student.status === "approved"){
    actionButtons = `
      <button data-student-id="${student.id}" data-action-status="rejected">Từ chối</button>
    `;
  }else if(student.status === "rejected"){
    actionButtons = `
      <button data-student-id="${student.id}" data-action-status="pending">Chuyển chờ duyệt</button>
    `;
  }

  return `
    <div class="admin-table-row" role="row">
      <span data-label="Họ tên">${escapeHtml(student.full_name || "")}</span>
      <span data-label="Email">${escapeHtml(student.email || "")}</span>
      <span data-label="Role">${escapeHtml(student.role || "")}</span>
      <span data-label="Trạng thái"><b class="status-badge status-${escapeHtml(student.status)}">${profileStatusLabel(student.status)}</b></span>
      <span data-label="Lớp">${escapeHtml(classLabel)}</span>
      <span data-label="Ngày tạo">${escapeHtml(createdAt)}</span>
      <span class="admin-actions" data-label="Hành động">
        ${actionButtons}
      </span>
    </div>
  `;
}

function renderApprovalRow(student, classes){
  const createdAt = student.created_at ? new Date(student.created_at).toLocaleDateString("vi-VN") : "";
  return `
    <div class="admin-table-row" role="row" data-student-row>
      <span data-label="Họ tên">${escapeHtml(student.full_name || "")}</span>
      <span data-label="Email">${escapeHtml(student.email || "")}</span>
      <span data-label="Ngày đăng ký">${escapeHtml(createdAt)}</span>
      <span data-label="Trạng thái"><b class="status-badge status-${escapeHtml(student.status)}">${profileStatusLabel(student.status)}</b></span>
      <span data-label="Lớp">
        <select class="admin-select" data-approval-class>
          ${classes.map((klass) => `<option value="${escapeHtml(klass.id)}">${escapeHtml(klass.name)}</option>`).join("")}
        </select>
      </span>
      <span class="admin-actions" data-label="Hành động">
        <button class="admin-action-primary" data-approve-student="${student.id}">Duyệt</button>
        <button class="admin-action-danger" data-reject-student="${student.id}">Từ chối</button>
      </span>
    </div>
  `;
}

function renderClassRow(klass, memberCount = 0){
  const createdAt = klass.created_at ? new Date(klass.created_at).toLocaleDateString("vi-VN") : "";
  return `
    <div class="admin-table-row" role="row">
      <span data-label="Tên lớp">${escapeHtml(klass.name)}</span>
      <span data-label="Level">${escapeHtml(klass.level || "A1")}</span>
      <span data-label="Trạng thái"><b class="status-badge status-${escapeHtml(klass.status)}">${classStatusLabel(klass.status)}</b></span>
      <span data-label="Học viên">${memberCount}</span>
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

function renderStatusCard(message, options = {}){
  const label = options.label || (options.status ? profileStatusLabel(options.status) : "");
  const statusMarkup = options.status
    ? `<span class="status-badge status-${escapeHtml(options.status)}">${escapeHtml(label)}</span>`
    : "";
  return `
    <section class="auth-card status-card">
      ${statusMarkup}
      <p>${escapeHtml(message)}</p>
      <div class="student-actions">
        ${options.showLogin ? `<a class="btn-primary" href="/login">Đăng nhập</a>` : ""}
        ${options.showReload ? `<button class="btn-primary" id="authReloadBtn">Tải lại</button>` : ""}
        <button class="btn-ghost" id="studentLogoutBtn">Đăng xuất</button>
      </div>
    </section>
  `;
}

function isRecoverableAuthGuardFailure(reason){
  return ["auth-error", "auth-timeout", "profile-error", "profile-timeout"].includes(reason);
}

function attachReloadHandler(){
  document.getElementById("authReloadBtn")?.addEventListener("click", () => {
    window.location.reload();
  });
}

function attachLogoutHandler(){
  document.getElementById("studentLogoutBtn")?.addEventListener("click", async () => {
    clearRealtime(adminChannels);
    clearRealtime(studentChannels);
    if(hasSupabaseConfig) await signOut();
    window.history.pushState({}, "", "/login");
    await renderAuthRoute();
    await window.refreshAuthNavbar?.();
  });
}

function attachAuthRecoveryHandlers(){
  attachReloadHandler();
  attachLogoutHandler();
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
  const msg = String(message || "");
  if(/already registered|already exists|email_exists/i.test(msg)) return "Email này đã được đăng ký sử dụng.";
  if(/password/i.test(msg)) return "Mật khẩu quá yếu (yêu cầu tối thiểu 8 ký tự).";
  if(/email confirmation|confirm email|token|otp_expired|invalid or has expired/i.test(msg)) return "Đường liên kết đã hết hạn hoặc không hợp lệ. Vui lòng yêu cầu gửi lại liên kết mới.";
  if(/network|fetch|connect/i.test(msg)) return "Không kết nối được với Supabase. Vui lòng kiểm tra kết nối mạng.";
  if(/violates row level security/i.test(msg)) return "Không có quyền lưu thông tin tài khoản. Vui lòng liên hệ admin.";
  return "Không thể xử lý yêu cầu. Vui lòng thử lại.";
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
