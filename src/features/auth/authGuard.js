import { getCurrentProfile, getCurrentSession, getCurrentUser } from "../../lib/supabase/auth.js";
import { getSupabaseConfigError, hasSupabaseConfig } from "../../lib/supabase/client.js";

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
  if(userError || !user){
    return { ok: false, reason: "unauthenticated", message: "Vui lòng đăng nhập để tiếp tục." };
  }

  const { profile, error: profileError } = await getCurrentProfile(user.id);
  if(profileError){
    return { ok: false, reason: "profile-error", user, message: "Không tải được hồ sơ học viên." };
  }
  if(!profile){
    return { ok: false, reason: "missing-profile", user, message: STATUS_MESSAGES.missing };
  }
  if(profile.role !== "student" || profile.status !== "approved"){
    return {
      ok: false,
      reason: profile.role !== "student" ? "forbidden" : profile.status,
      user,
      profile,
      message: profile.role !== "student" ? "Không có quyền truy cập khu vực học viên." : STATUS_MESSAGES[profile.status] || "Tài khoản chưa sẵn sàng.",
    };
  }

  return { ok: true, user, profile };
}

export async function requireAdmin(){
  if(!hasSupabaseConfig){
    return { ok: false, reason: "config", message: getSupabaseConfigError() };
  }

  const { user, error: userError } = await getCurrentUser();
  if(userError || !user){
    return { ok: false, reason: "unauthenticated", message: "Vui lòng đăng nhập để tiếp tục." };
  }

  const { profile, error: profileError } = await getCurrentProfile(user.id);
  if(profileError){
    return { ok: false, reason: "profile-error", user, message: "Không tải được hồ sơ quản trị." };
  }
  if(!profile || profile.role !== "admin" || profile.status !== "approved"){
    return { ok: false, reason: "forbidden", user, profile, message: "Không có quyền truy cập." };
  }

  return { ok: true, user, profile };
}
