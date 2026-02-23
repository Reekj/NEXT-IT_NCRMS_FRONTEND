// src/services/auth.service.js
import { api } from "./api";

// POST /api/auth/register
// { serviceNumber, password, firstName, lastName, email, role, zone }
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