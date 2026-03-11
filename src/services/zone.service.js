// src/services/zone.service.js
import { api } from "./api";

/**
 * POST /api/admin/zone
 * Body: { zoneName, description, status }
 */
export async function createZone(payload) {
  const res = await api.post("/api/admin/zone", payload);
  return res.data;
}

/**
 * GET /api/admin/zones
 */
export async function listZones() {
  const res = await api.get("/api/admin/zones");
  return res.data;
}

/**
 * GET /api/admin/zone/{id}
 */
export async function getZoneById(id) {
  const safeId = encodeURIComponent(String(id || ""));
  const res = await api.get(`/api/admin/zone/${safeId}`);
  return res.data;
}

/**
 * PUT /api/admin/zone/{id}
 */
export async function updateZone(id, payload) {
  const safeId = encodeURIComponent(String(id || ""));
  const res = await api.put(`/api/admin/zone/${safeId}`, payload);
  return res.data;
}

/**
 * DELETE /api/admin/zone/{id}
 */
export async function deleteZone(id) {
  const safeId = encodeURIComponent(String(id || ""));
  const res = await api.delete(`/api/admin/zone/${safeId}`);
  return res.data;
}