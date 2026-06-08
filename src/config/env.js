const rawEnv = import.meta.env || {};

export const env = {
  supabaseUrl: rawEnv.VITE_SUPABASE_URL || "",
  supabaseAnonKey: rawEnv.VITE_SUPABASE_ANON_KEY || "",
};

export function hasRequiredEnv(){
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}

export function getEnvError(){
  if(hasRequiredEnv()) return "";
  const missing = [];
  if(!env.supabaseUrl) missing.push("VITE_SUPABASE_URL");
  if(!env.supabaseAnonKey) missing.push("VITE_SUPABASE_ANON_KEY");
  return `Thiếu cấu hình ${missing.join(" và ")}. Tạo .env.local từ .env.example rồi chạy lại app.`;
}

export function validateEnv(){
  if(!hasRequiredEnv()) throw new Error(getEnvError());
  return env;
}
