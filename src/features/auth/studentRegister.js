import { signOut, signUpStudent } from "./authService.js";

export async function registerStudent({ fullName, phone, email, password }){
  const { error } = await signUpStudent({ fullName, phone, email, password });
  if(error) return { ok: false, error };
  await signOut();
  return {
    ok: true,
    message: "Đăng ký thành công. Vui lòng chờ admin duyệt tài khoản.",
  };
}
