// src/services/coordinator.service.js
import { api } from "./api";

/**
 * POST /api/admin/coordinator
 * Body: { fullName, email, zone, status }
 */
export async function createZonalCoordinator(payload) {
  const res = await api.post("/api/admin/coordinator", payload);
  return res.data;
}

/**
 * GET /api/admin/coordinators
 * List all zonal coordinators (HQ access)
 */
export async function listZonalCoordinators() {
  const res = await api.get("/api/admin/coordinators");
  return res.data;
}

/**
 * GET /api/admin/coordinator/{id}
 * Get single coordinator by ID (Swagger)
 * (Fallback kept just in case backend also exposes /coordinators/{id})
 */
export async function getZonalCoordinatorById(id) {
  const safeId = encodeURIComponent(String(id || "").trim());
  if (!safeId) throw new Error("Coordinator ID is required.");

  const candidates = [
    `/api/admin/coordinator/${safeId}`,  // ✅ Swagger
    `/api/admin/coordinators/${safeId}`, // fallback
  ];

  let lastErr = null;
  for (const url of candidates) {
    try {
      const res = await api.get(url);
      return res.data;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

/**
 * PUT /api/admin/coordinator/{id}
 * Update coordinator (Swagger)
 * Body: { fullName, email, zone, status }
 * (Fallback kept: /coordinators/{id})
 */
export async function updateZonalCoordinator(id, payload) {
  const safeId = encodeURIComponent(String(id || "").trim());
  if (!safeId) throw new Error("Coordinator ID is required.");

  const cleanPayload = {
    fullName: payload?.fullName,
    email: payload?.email,
    zone: payload?.zone,
    status: payload?.status,
  };

  const candidates = [
    { method: "put", url: `/api/admin/coordinator/${safeId}` },   // ✅ Swagger
    { method: "put", url: `/api/admin/coordinators/${safeId}` },  // fallback
  ];

  let lastErr = null;
  for (const c of candidates) {
    try {
      const res = await api[c.method](c.url, cleanPayload);
      return res.data;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

/**
 * DELETE /api/admin/coordinator/{id}
 * Delete coordinator (Swagger)
 * (Fallback kept: /coordinators/{id})
 */
export async function deleteZonalCoordinator(id) {
  const safeId = encodeURIComponent(String(id || "").trim());
  if (!safeId) throw new Error("Coordinator ID is required.");

  const candidates = [
    `/api/admin/coordinator/${safeId}`,   // ✅ Swagger
    `/api/admin/coordinators/${safeId}`,  // fallback
  ];

  let lastErr = null;
  for (const url of candidates) {
    try {
      const res = await api.delete(url);
      return res.data;
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}