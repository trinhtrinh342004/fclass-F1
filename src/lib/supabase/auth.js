import { debugSupabaseAuth, getSupabaseConfigError, hasSupabaseConfig, supabase, withSupabaseTimeout } from "./client.js";

export async function getCurrentUser(){
  if(!hasSupabaseConfig) return { user: null, error: new Error(getSupabaseConfigError()) };
  debugSupabaseAuth("getUser start");
  try{
    const { data, error } = await withSupabaseTimeout(supabase.auth.getUser(), "supabase.auth.getUser");
    const normalizedError = isMissingSessionError(error) ? null : error;
    debugSupabaseAuth("getUser end", {
      userId: data?.user?.id || null,
      error: normalizedError?.message || null,
    });
    return { user: data?.user || null, error: normalizedError };
  }catch(error){
    debugSupabaseAuth("getUser failed", { error: error.message });
    return { user: null, error };
  }
}

export async function getCurrentSession(){
  if(!hasSupabaseConfig) return { session: null, error: new Error(getSupabaseConfigError()) };
  debugSupabaseAuth("getSession start");
  try{
    const { data, error } = await withSupabaseTimeout(supabase.auth.getSession(), "supabase.auth.getSession");
    const normalizedError = isMissingSessionError(error) ? null : error;
    debugSupabaseAuth("getSession end", {
      userId: data?.session?.user?.id || null,
      error: normalizedError?.message || null,
    });
    return { session: data?.session || null, error: normalizedError };
  }catch(error){
    debugSupabaseAuth("getSession failed", { error: error.message });
    return { session: null, error };
  }
}

export async function exchangeCodeForSession(code){
  if(!hasSupabaseConfig) return { data: null, error: new Error(getSupabaseConfigError()) };
  if(!code) return { data: null, error: new Error("Thiếu mã xác thực Supabase.") };
  return supabase.auth.exchangeCodeForSession(code);
}

export async function establishSessionFromAuthUrl(url = window.location.href){
  if(!hasSupabaseConfig) return { session: null, type: null, error: new Error(getSupabaseConfigError()) };

  const authUrl = new URL(url, window.location.origin);
  const query = authUrl.searchParams;
  const hash = new URLSearchParams(authUrl.hash.replace(/^#/, ""));
  const getParam = (name) => query.get(name) || hash.get(name);
  const type = getParam("type");
  const errorCode = getParam("error_code") || getParam("error");
  const errorDescription = getParam("error_description");

  if(errorCode || errorDescription){
    const error = new Error(errorDescription || "Liên kết xác thực không hợp lệ.");
    error.code = errorCode || "auth_link_error";
    return { session: null, type, error };
  }

  const code = getParam("code");
  if(code){
    const { data, error } = await exchangeCodeForSession(code);
    if(error){
      const current = await getCurrentSession();
      if(current.session) return { session: current.session, type, error: null };
    }
    return { session: data?.session || null, type, error };
  }

  const accessToken = getParam("access_token");
  const refreshToken = getParam("refresh_token");
  if(accessToken && refreshToken){
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    if(error){
      const current = await getCurrentSession();
      if(current.session) return { session: current.session, type, error: null };
    }
    return { session: data?.session || null, type, error };
  }

  const { session, error } = await getCurrentSession();
  return { session, type, error };
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
  const redirectTo = new URL("/auth/callback?type=recovery", window.location.origin).toString();
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

  debugSupabaseAuth("profile query start", { userId: id });
  try{
    const { data, error } = await withSupabaseTimeout(
      supabase
        .from("profiles")
        .select("id, full_name, phone, email, role, status, note, created_at, updated_at")
        .eq("id", id)
        .maybeSingle(),
      "profiles.select.current",
    );

    debugSupabaseAuth("profile query end", {
      userId: id,
      role: data?.role || null,
      status: data?.status || null,
      error: error?.message || null,
    });
    return { profile: data || null, error };
  }catch(error){
    debugSupabaseAuth("profile query failed", { userId: id, error: error.message });
    return { profile: null, error };
  }
}

function isMissingSessionError(error){
  if(!error) return false;
  return error.name === "AuthSessionMissingError" || /auth session missing/i.test(error.message || "");
}
