import { useEffect, useState } from "react";

const KEY = "solcut:admin-auth";
const EVT = "solcut:admin-auth-change";

// NOTE: Client-side only. Anyone reading the bundle can see these.
// For real protection, move auth to a server with Lovable Cloud.
const ADMIN_USER = "admin";
const ADMIN_PASS = "solcut";

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    sessionStorage.setItem(KEY, "1");
    window.dispatchEvent(new Event(EVT));
    return true;
  }
  return false;
}

export function logout() {
  sessionStorage.removeItem(KEY);
  window.dispatchEvent(new Event(EVT));
}

export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(KEY) === "1";
}

export function useAdminAuth() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setAuthed(isLoggedIn());
    setReady(true);
    const onChange = () => setAuthed(isLoggedIn());
    window.addEventListener(EVT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);
  return { authed, ready };
}
