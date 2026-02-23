import { api } from "./api";

// POST /api/admin/coordinator
// Body: { fullName, email, zone: number, status: "inactive" | "active" }
export async function createZonalCoordinator(payload) {
  const res = await api.post("/api/admin/coordinator", payload);
  return res.data;
}

// GET /api/admin/coordinators
export async function listZonalCoordinators() {
    const res = await api.get("/api/admin/coordinators");
    return res.data;
  }