import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

console.log(`🔌 API base URL: ${BASE_URL}`); // чтобы видеть, куда стучусь

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
// PR for review
