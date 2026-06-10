import { createClient } from "@supabase/supabase-js";

export type ProfileRole = "admin" | "student";
export type ProfileStatus = "pending" | "approved" | "rejected";
export type ClassMemberStatus = "approved" | "removed";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: ProfileRole;
  status: ProfileStatus;
  created_at: string;
  updated_at: string;
};

export type FclassClass = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
};

export type ClassMember = {
  id: string;
  class_id: string;
  user_id: string;
  status: ClassMemberStatus;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
};

type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & Pick<Profile, "id">;
        Update: Partial<Profile>;
        Relationships: [];
      };
      classes: {
        Row: FclassClass;
        Insert: Partial<FclassClass> & Pick<FclassClass, "name">;
        Update: Partial<FclassClass>;
        Relationships: [];
      };
      class_members: {
        Row: ClassMember;
        Insert: Partial<ClassMember> & Pick<ClassMember, "class_id" | "user_id">;
        Update: Partial<ClassMember>;
        Relationships: [];
      };
      approval_logs: {
        Row: {
          id: string;
          user_id: string;
          admin_id: string | null;
          action: "approved" | "rejected";
          old_status: ProfileStatus | null;
          new_status: ProfileStatus;
          class_id: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          admin_id: string;
          action: "approved" | "rejected";
          old_status?: ProfileStatus | null;
          new_status: ProfileStatus;
          class_id?: string | null;
        };
        Update: never;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
) as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.");
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
