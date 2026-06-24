import axios from "axios";
import { Musician } from "../types";

// ============================================================
// CLIENT
// ============================================================

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

console.log(`🔌 API base URL: ${BASE_URL}`);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ============================================================
// TYPIFIED METHODS
// ============================================================

// ---- Musicians ----

export const getMusicians = (): Promise<Musician[]> =>
  api.get<Musician[]>("/musicians").then((res) => res.data);

export const getMusicianById = (id: number): Promise<Musician> =>
  api.get<Musician>(`/musicians/${id}`).then((res) => res.data);

export const createMusician = (data: Omit<Musician, "id">): Promise<Musician> =>
  api.post<Musician>("/musicians", data).then((res) => res.data);

export const updateMusician = (
  id: number,
  data: Partial<Musician>,
): Promise<Musician> =>
  api.put<Musician>(`/musicians/${id}`, data).then((res) => res.data);

export const deleteMusician = (id: number): Promise<void> =>
  api.delete(`/musicians/${id}`).then(() => undefined);

// ============================================================
// CLIENT EXPORT
// ============================================================

export default api;
