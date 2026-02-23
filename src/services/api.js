import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://ncrms-be.onrender.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// ✅ Token handling (fixed + consistent)
// - Uses ONE primary key: "ncrms_token"
// - Still supports legacy keys, but normalizes into "ncrms_token"
// - Attaches Authorization on every request
api.interceptors.request.use((config) => {
  const readToken = () => {
    // 1) Preferred key
    let t = localStorage.getItem("ncrms_token") || "";

    // 2) Legacy keys (string token)
    if (!t) {
      t =
        localStorage.getItem("token") ||
        localStorage.getItem("accessToken") ||
        localStorage.getItem("authToken") ||
        localStorage.getItem("jwt") ||
        "";
    }

    // 3) Legacy JSON objects (auth/session/user)
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

    // 4) Clean accidental "Bearer " prefix
    if (typeof t === "string" && /^bearer\s+/i.test(t)) {
      t = t.replace(/^bearer\s+/i, "").trim();
    }

    return t;
  };

  const token = readToken();

  // ✅ Normalize: once we find a token anywhere, store it in the primary key
  if (token && localStorage.getItem("ncrms_token") !== token) {
    localStorage.setItem("ncrms_token", token);
  }

  // ✅ Attach header
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getApiErrorMessage(err) {
    const status = err?.response?.status;
    const data = err?.response?.data || {};
    const msg = data?.message || data?.error || err?.message;
  
    // ✅ DB timeout / backend unavailable
    const raw = `${data?.message || ""} ${data?.error || ""} ${err?.message || ""}`.toLowerCase();
    if (raw.includes("buffering timed out") || raw.includes("findone()") || raw.includes("mongoose")) {
      return "Backend database is not responding right now (DB timeout). Please try again in a few minutes or notify the backend team.";
    }
  
    if (typeof msg === "string" && msg.trim()) return msg;
  
    if (status === 400) return "Invalid request. Please check your inputs.";
    if (status === 401) return "Unauthorized. Please log in again.";
    if (status === 403) return "Forbidden. You don’t have permission to perform this action.";
    if (status === 500) return "Server error. Please try again.";
  
    return "Something went wrong. Please try again.";
}