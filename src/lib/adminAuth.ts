import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ensureAdmin } from "@/lib/admin.functions";

const ADMIN_EMAIL = "admin@solcut.app";

export async function login(username: string, password: string): Promise<boolean> {
  if (username.trim().toLowerCase() !== "admin") return false;
  try {
    await ensureAdmin();
  } catch (e) {
    console.error("ensureAdmin failed", e);
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: ADMIN_EMAIL,
    password,
  });
  return !error;
}

export async function logout() {
  await supabase.auth.signOut();
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!mounted) return;
        setAuthed(!!session && session.user.email === ADMIN_EMAIL);
      },
    );
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setAuthed(!!data.session && data.session.user.email === ADMIN_EMAIL);
      setReady(true);
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { authed, ready };
}
