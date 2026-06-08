const rawEnv = import.meta.env || {};

export const env = {
  supabaseUrl: rawEnv.VITE_SUPABASE_URL || rawEnv.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: rawEnv.VITE_SUPABASE_ANON_KEY || rawEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
};

export function hasRequiredEnv(){
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}

export function getEnvError(){
  if(hasRequiredEnv()) return "";
  return "Thiếu cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY. Tạo .env từ .env.example rồi chạy lại app.";
}

export function validateEnv(){
  if(!hasRequiredEnv()) throw new Error(getEnvError());
  return env;
}
