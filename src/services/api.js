// src/services/api.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://ncrms-be.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 60000,
});

function stripBearer(t) {
  if (!t) return "";
  return String(t).replace(/^bearer\s+/i, "").trim();
}

function readTokenFromLegacy() {
  let t = localStorage.getItem("ncrms_token") || "";

  if (!t) {
    t =
      localStorage.getItem("token") ||
      localStorage.getItem("accessToken") ||
      localStorage.getItem("authToken") ||
      localStorage.getItem("jwt") ||
      "";
  }

  if (!t) {
    const candidates = ["auth", "ncrms_auth", "user", "session"];
    for (const key of candidates) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      try {
        const parsed = JSON.parse(raw);
        t =
          parsed?.token ||
          parsed?.accessToken ||
          parsed?.jwt ||
          parsed?.data?.token ||
          parsed?.data?.accessToken ||
          "";
        if (t) break;
      } catch {
        // ignore
      }
    }
  }

  return stripBearer(t);
}

function readAdminToken() {
  return stripBearer(localStorage.getItem("ncrms_token_admin")) || stripBearer(localStorage.getItem("admin_token")) || "";
}

function readHqToken() {
  return (
    stripBearer(localStorage.getItem("ncrms_token_hq")) ||
    stripBearer(localStorage.getItem("hq_token")) ||
    ""
  );
}

// ✅ NEW: zonal coordinator token reader
function readZonalToken() {
  return (
    stripBearer(localStorage.getItem("ncrms_token_zonal")) ||
    stripBearer(localStorage.getItem("zonal_token")) ||
    ""
  );
}

function pickTokenForRequest(url = "") {
  const path = String(url);

  // /api/admin/* -> prefer admin, else HQ (as you already did)
  if (path.startsWith("/api/admin")) {
    return (
      readAdminToken() ||
      readHqToken() ||
      stripBearer(localStorage.getItem("ncrms_token")) ||
      readTokenFromLegacy() ||
      ""
    );
  }

  // ✅ Non-admin endpoints:
  // prefer zonal coordinator token first (so ZC pages work),
  // then HQ (shared), then legacy.
  return readZonalToken() || readHqToken() || stripBearer(localStorage.getItem("ncrms_token")) || readTokenFromLegacy() || "";
}

api.interceptors.request.use((config) => {
  const url = config?.url || "";
  const token = pickTokenForRequest(url);

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    if (config.headers?.Authorization) delete config.headers.Authorization;
  }

  return config;
});

export function getApiErrorMessage(err) {
  if (err?.code === "ECONNABORTED" || String(err?.message || "").toLowerCase().includes("timeout")) {
    return "Request timed out. The server is taking too long to respond. Please try again shortly.";
  }

  const status = err?.response?.status;
  const data = err?.response?.data || {};
  const msg = data?.message || data?.error || err?.message;

  const raw = `${data?.message || ""} ${data?.error || ""} ${err?.message || ""}`.toLowerCase();
  if (raw.includes("buffering timed out") || raw.includes("mongoose")) {
    return "Backend database is not responding right now (DB timeout). Please try again shortly.";
  }

  if (typeof msg === "string" && msg.trim()) return msg;

  if (status === 400) return "Invalid request. Please check your inputs.";
  if (status === 401) return "Unauthorized. Please log in again.";
  if (status === 403) return "Forbidden. You don’t have permission to perform this action.";
  if (status === 500) return "Server error. Please try again.";

  return "Something went wrong. Please try again.";
}