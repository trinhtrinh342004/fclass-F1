import {
  createContext,
  createElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase, type Profile } from "../lib/supabaseClient";

type AuthProfileState = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  profileError: string | null;
  isAdmin: boolean;
  isApprovedStudent: boolean;
  refreshProfile: () => Promise<Profile | null>;
  signOut: () => Promise<void>;
};

const AuthProfileContext = createContext<AuthProfileState | null>(null);

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,role,status,created_at,updated_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) throw error;
  return data ?? null;
}

async function ensureStudentProfile(user: User): Promise<Profile> {
  const existingProfile = await fetchProfile(user.id);
  if (existingProfile) return existingProfile;

  const fullName =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : typeof user.user_metadata?.name === "string"
        ? user.user_metadata.name
        : user.email ?? "Student";

  const { data, error } = await supabase
    .from("profiles")
    .insert({
      id: user.id,
      email: user.email ?? null,
      full_name: fullName,
      role: "student",
      status: "pending",
    })
    .select("id,email,full_name,role,status,created_at,updated_at")
    .single();

  if (error) throw error;
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);

  const refreshProfile = useCallback(async () => {
    if (!user?.id) {
      setProfile(null);
      return null;
    }

    try {
      setProfileError(null);
      const nextProfile = await ensureStudentProfile(user);
      setProfile(nextProfile);
      return nextProfile;
    } catch (error) {
      const message = error instanceof Error ? error.message : "Cannot load profile.";
      setProfileError(message);
      setProfile(null);
      return null;
    }
  }, [user?.id]);

  useEffect(() => {
    let cancelled = false;

    async function loadInitialSession() {
      setLoading(true);
      const { data, error } = await supabase.auth.getSession();

      if (cancelled) return;
      if (error || !data.session) {
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
        return;
      }

      setSession(data.session);
      setUser(data.session.user);

      try {
        const nextProfile = await ensureStudentProfile(data.session.user);
        if (!cancelled) setProfile(nextProfile);
      } catch (profileLoadError) {
        if (!cancelled) {
          setProfileError(
            profileLoadError instanceof Error
              ? profileLoadError.message
              : "Cannot load profile.",
          );
          setProfile(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadInitialSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (!nextSession?.user) {
        setProfile(null);
        setProfileError(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const nextProfile = await ensureStudentProfile(nextSession.user);
        setProfile(nextProfile);
        setProfileError(null);
      } catch (error) {
        setProfile(null);
        setProfileError(error instanceof Error ? error.message : "Cannot load profile.");
      } finally {
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase
      .channel(`profile-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${user.id}`,
        },
        () => {
          void refreshProfile();
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [refreshProfile, user?.id]);

  const isAdmin = profile?.role === "admin" && profile.status === "approved";
  const isApprovedStudent = profile?.role === "student" && profile.status === "approved";

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      profileError,
      isAdmin,
      isApprovedStudent,
      refreshProfile,
      signOut: async () => {
        await supabase.auth.signOut();
        setSession(null);
        setUser(null);
        setProfile(null);
      },
    }),
    [isAdmin, isApprovedStudent, loading, profile, profileError, refreshProfile, session, user],
  );

  return createElement(AuthProfileContext.Provider, { value }, children);
}

export function useAuthProfile(): AuthProfileState {
  const context = useContext(AuthProfileContext);
  if (!context) {
    throw new Error("useAuthProfile must be used inside AuthProvider.");
  }
  return context;
}
