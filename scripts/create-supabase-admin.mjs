/**
 * Create (or confirm) a Supabase Auth admin user for the admin panel.
 *
 * Requires the service role key from:
 *   Supabase Dashboard → Project Settings → API → service_role (secret)
 *
 * Usage:
 *   SUPABASE_SERVICE_ROLE_KEY="eyJ..." node scripts/create-supabase-admin.mjs
 *
 * Optional env:
 *   ADMIN_EMAIL=ceo@boostmysites.com
 *   ADMIN_PASSWORD=BoostAdmin2026
 */

const PROJECT_URL = "https://upxsbhsamorhvnfebvor.supabase.co";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = (process.env.ADMIN_EMAIL ?? "ceo@boostmysites.com").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD ?? "BoostAdmin2026";

if (!serviceRoleKey) {
  console.error(
    "Missing SUPABASE_SERVICE_ROLE_KEY.\n" +
      "Get it from Supabase Dashboard → Settings → API → service_role, then run:\n" +
      '  SUPABASE_SERVICE_ROLE_KEY="your-key" node scripts/create-supabase-admin.mjs',
  );
  process.exit(1);
}

const headers = {
  apikey: serviceRoleKey,
  Authorization: `Bearer ${serviceRoleKey}`,
  "Content-Type": "application/json",
};

async function listUsers() {
  const res = await fetch(`${PROJECT_URL}/auth/v1/admin/users?page=1&per_page=200`, { headers });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.msg ?? body.message ?? `List users failed (${res.status})`);
  }
  return body.users ?? body;
}

async function createUser() {
  const res = await fetch(`${PROJECT_URL}/auth/v1/admin/users`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password,
      email_confirm: true,
    }),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.msg ?? body.message ?? `Create user failed (${res.status})`);
  }
  return body;
}

async function updateUserPassword(userId) {
  const res = await fetch(`${PROJECT_URL}/auth/v1/admin/users/${userId}`, {
    method: "PUT",
    headers,
    body: JSON.stringify({
      password,
      email_confirm: true,
    }),
  });
  const body = await res.json();
  if (!res.ok) {
    throw new Error(body.msg ?? body.message ?? `Update user failed (${res.status})`);
  }
  return body;
}

try {
  const users = await listUsers();
  const existing = users.find((u) => u.email?.toLowerCase() === email);

  if (existing) {
    await updateUserPassword(existing.id);
    console.log(`Updated password for existing user: ${email}`);
  } else {
    await createUser();
    console.log(`Created new admin user: ${email}`);
  }

  console.log(`Password: ${password}`);
  console.log("Log in at /admin/login — Reshab leads will load with a real Supabase session.");
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
