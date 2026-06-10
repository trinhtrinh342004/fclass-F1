import { getCurrentProfile, getCurrentSession, getCurrentUser } from "../../lib/supabase/auth.js";
import { debugSupabaseAuth, getSupabaseConfigError, hasSupabaseConfig, isSupabaseTimeoutError } from "../../lib/supabase/client.js";

export { getCurrentProfile, getCurrentSession, getCurrentUser };

export const STATUS_MESSAGES = {
  pending: "Tài khoản của bạn đang chờ admin duyệt.",
  rejected: "Tài khoản chưa được chấp nhận. Vui lòng liên hệ giáo viên.",
  blocked: "Tài khoản đã bị khóa. Vui lòng liên hệ giáo viên.",
  approved: "Tài khoản đã được duyệt.",
  missing: "Không tìm thấy hồ sơ tài khoản. Vui lòng liên hệ admin.",
};

export function profileStatusLabel(status){
  const labels = {
    pending: "Chờ duyệt",
    approved: "Đã duyệt",
    rejected: "Từ chối",
    blocked: "Bị khóa",
  };
  return labels[status] || status || "Không rõ";
}

export async function requireApprovedStudent(){
  if(!hasSupabaseConfig){
    return { ok: false, reason: "config", message: getSupabaseConfigError() };
  }

  const { user, error: userError } = await getCurrentUser();
  if(userError){
    const reason = isSupabaseTimeoutError(userError) ? "auth-timeout" : "auth-error";
    debugSupabaseAuth("student guard decision", { ok: false, reason, error: userError.message });
    return { ok: false, reason, message: "Không thể kiểm tra tài khoản. Vui lòng tải lại trang hoặc đăng nhập lại." };
  }
  if(!user){
    debugSupabaseAuth("student guard decision", { ok: false, reason: "unauthenticated" });
    return { ok: false, reason: "unauthenticated", message: "Vui lòng đăng nhập để tiếp tục." };
  }

  const { profile, error: profileError } = await getCurrentProfile(user.id);
  if(profileError){
    const reason = isSupabaseTimeoutError(profileError) ? "profile-timeout" : "profile-error";
    debugSupabaseAuth("student guard decision", { ok: false, reason, userId: user.id, error: profileError.message });
    return { ok: false, reason, user, message: "Không thể kiểm tra tài khoản. Vui lòng tải lại trang hoặc đăng nhập lại." };
  }
  if(!profile){
    debugSupabaseAuth("student guard decision", { ok: false, reason: "missing-profile", userId: user.id });
    return { ok: false, reason: "missing-profile", user, message: STATUS_MESSAGES.missing };
  }
  if(profile.role !== "student" || profile.status !== "approved"){
    const reason = profile.role !== "student" ? "forbidden" : profile.status;
    debugSupabaseAuth("student guard decision", {
      ok: false,
      reason,
      userId: user.id,
      role: profile.role,
      status: profile.status,
    });
    return {
      ok: false,
      reason,
      user,
      profile,
      message: profile.role !== "student" ? "Không có quyền truy cập khu vực học viên." : STATUS_MESSAGES[profile.status] || "Tài khoản chưa sẵn sàng.",
    };
  }

  debugSupabaseAuth("student guard decision", { ok: true, userId: user.id, role: profile.role, status: profile.status });
  return { ok: true, user, profile };
}

export async function requireAdmin(){
  if(!hasSupabaseConfig){
    return { ok: false, reason: "config", message: getSupabaseConfigError() };
  }

  const { user, error: userError } = await getCurrentUser();
  if(userError){
    const reason = isSupabaseTimeoutError(userError) ? "auth-timeout" : "auth-error";
    debugSupabaseAuth("admin guard decision", { ok: false, reason, error: userError.message });
    return { ok: false, reason, message: "Không thể kiểm tra tài khoản. Vui lòng tải lại trang hoặc đăng nhập lại." };
  }
  if(!user){
    debugSupabaseAuth("admin guard decision", { ok: false, reason: "unauthenticated" });
    return { ok: false, reason: "unauthenticated", message: "Vui lòng đăng nhập để tiếp tục." };
  }

  const { profile, error: profileError } = await getCurrentProfile(user.id);
  if(profileError){
    const reason = isSupabaseTimeoutError(profileError) ? "profile-timeout" : "profile-error";
    debugSupabaseAuth("admin guard decision", { ok: false, reason, userId: user.id, error: profileError.message });
    return { ok: false, reason, user, message: "Không thể kiểm tra tài khoản. Vui lòng tải lại trang hoặc đăng nhập lại." };
  }
  if(!profile || profile.role !== "admin" || profile.status !== "approved"){
    debugSupabaseAuth("admin guard decision", {
      ok: false,
      reason: "forbidden",
      userId: user.id,
      role: profile?.role || null,
      status: profile?.status || null,
    });
    return { ok: false, reason: "forbidden", user, profile, message: "Không có quyền truy cập." };
  }

  debugSupabaseAuth("admin guard decision", { ok: true, userId: user.id, role: profile.role, status: profile.status });
  return { ok: true, user, profile };
}
