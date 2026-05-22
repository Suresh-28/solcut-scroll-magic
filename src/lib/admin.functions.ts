import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const ADMIN_EMAIL = "admin@solcut.app";
const ADMIN_PASSWORD = "solcut";

// Idempotently ensures the single admin auth user exists.
// Called once on first login attempt — safe to call repeatedly.
export const ensureAdmin = createServerFn({ method: "POST" }).handler(
  async () => {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) throw new Error(error.message);

    const exists = data.users.some((u) => u.email === ADMIN_EMAIL);
    if (exists) return { ok: true, created: false };

    const { error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });
    if (createError) throw new Error(createError.message);

    return { ok: true, created: true };
  },
);
