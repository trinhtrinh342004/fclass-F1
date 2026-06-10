import fs from "node:fs";
import path from "node:path";

export function loadLocalEnv(cwd = process.cwd()){
  const files = [".env", ".env.local"];
  for(const file of files){
    const fullPath = path.join(cwd, file);
    if(!fs.existsSync(fullPath)) continue;
    const lines = fs.readFileSync(fullPath, "utf8").split(/\r?\n/);
    for(const line of lines){
      if(!line || /^\s*#/.test(line)) continue;
      const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
      if(!match) continue;
      const [, key, rawValue] = match;
      if(process.env[key]) continue;
      process.env[key] = rawValue.replace(/^['"]|['"]$/g, "");
    }
  }
}

export function getSupabaseScriptEnv(){
  const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return { supabaseUrl, supabaseAnonKey, serviceRoleKey };
}

export function assertSupabaseClientEnv(){
  const env = getSupabaseScriptEnv();
  if(!env.supabaseUrl || !env.supabaseAnonKey){
    throw new Error("Thiếu cấu hình VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY. Tạo .env từ .env.example rồi chạy lại app.");
  }
  return env;
}
