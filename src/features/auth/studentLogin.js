import { getCurrentProfile, signInStudent } from "./authService.js";
import { STATUS_MESSAGES } from "./authGuard.js";

export async function loginStudent({ email, password }){
  const { data, error } = await signInStudent(email, password);
  if(error || !data?.user){
    return { ok: false, message: "Thông tin đăng nhập chưa đúng.", error };
  }

  const { profile, error: profileError } = await getCurrentProfile(data.user.id);
  if(profileError || !profile){
    return {
      ok: false,
      user: data.user,
      message: "Không tải được hồ sơ tài khoản. Vui lòng liên hệ giáo viên.",
      error: profileError,
    };
  }

  if(profile.status !== "approved"){
    return {
      ok: false,
      user: data.user,
      profile,
      message: STATUS_MESSAGES[profile.status] || "Tài khoản chưa sẵn sàng.",
    };
  }

  return { ok: true, user: data.user, profile };
}
