// src/services/auth.service.js
import { api } from "./api";

// POST /api/auth/register
export async function registerOfficer(payload) {
  const res = await api.post("/api/auth/register", payload);
  return res.data;
}

// POST /api/auth/login
// { serviceNumber, password }
export async function login(payload) {
  const res = await api.post("/api/auth/login", payload);
  return res.data;
}

export function extractToken(loginResponse) {
  return (
    loginResponse?.token ||
    loginResponse?.accessToken ||
    loginResponse?.jwt ||
    loginResponse?.data?.token ||
    loginResponse?.data?.accessToken ||
    loginResponse?.data?.jwt ||
    loginResponse?.payload?.token ||
    ""
  );
}

export function extractUser(loginResponse) {
  return (
    loginResponse?.user ||
    loginResponse?.data?.user ||
    loginResponse?.payload?.user ||
    loginResponse?.admin ||
    loginResponse?.data?.admin ||
    null
  );
}

export function normalizeRole(role) {
  const r = String(role || "").trim().toLowerCase();

  if (r.includes("system") && r.includes("admin")) return "system_admin";
  if (r === "admin" || r === "superadmin" || r.includes("super")) return "system_admin";
  if (r.includes("headquarter") || r.includes("headquarters") || r === "hq") return "headquarters";

  // ✅ zonal coordinator
  if (r.includes("zonal") && r.includes("coordinator")) return "zonal_coordinator";

  // zonal admin (if it exists separately)
  if (r.includes("zonal") && r.includes("admin")) return "zonal_admin";

  if (r.includes("officer")) return "officer";

  return r || "unknown";
}

export function persistAuthToken(token, role) {
  if (!token) return;

  const clean = String(token).replace(/^bearer\s+/i, "").trim();
  const r = normalizeRole(role);

  // legacy fallback (helps older pages)
  localStorage.setItem("ncrms_token", clean);

  if (r === "system_admin") {
    localStorage.setItem("ncrms_token_admin", clean);
    return;
  }

  if (r === "headquarters") {
    localStorage.setItem("ncrms_token_hq", clean);
    return;
  }

  // ✅ zonal coordinator token
  if (r === "zonal_coordinator") {
    localStorage.setItem("ncrms_token_zonal", clean);
    return;
  }

  // fallback
  localStorage.setItem("ncrms_token", clean);
}

export function persistAuthUser(user, role) {
  if (!user || typeof user !== "object") return;

  const r = normalizeRole(role || user?.role);

  localStorage.setItem("ncrms_user", JSON.stringify(user));

  if (r === "system_admin") {
    localStorage.setItem("ncrms_user_admin", JSON.stringify(user));
    return;
  }

  if (r === "headquarters") {
    localStorage.setItem("ncrms_user_hq", JSON.stringify(user));
    return;
  }

  // ✅ zonal coordinator user snapshot
  if (r === "zonal_coordinator") {
    localStorage.setItem("ncrms_user_zonal", JSON.stringify(user));
    return;
  }

  localStorage.setItem("ncrms_user", JSON.stringify(user));
}

export function persistLoginSession(loginResponse, explicitRole) {
  const token = extractToken(loginResponse);
  const user = extractUser(loginResponse);

  const roleFromUser = user?.role;
  const role = explicitRole || roleFromUser || "";

  persistAuthToken(token, role);
  if (user) persistAuthUser(user, role);

  return { token, user, role: normalizeRole(role) };
}

export function logout(role) {
  const r = normalizeRole(role);

  localStorage.removeItem("ncrms_token");
  localStorage.removeItem("ncrms_user");
  localStorage.removeItem("ncrms_active_role");

  if (r === "system_admin") {
    localStorage.removeItem("ncrms_token_admin");
    localStorage.removeItem("ncrms_user_admin");
  }

  if (r === "headquarters") {
    localStorage.removeItem("ncrms_token_hq");
    localStorage.removeItem("ncrms_user_hq");
  }

  if (r === "zonal_coordinator") {
    localStorage.removeItem("ncrms_token_zonal");
    localStorage.removeItem("ncrms_user_zonal");
  }
}