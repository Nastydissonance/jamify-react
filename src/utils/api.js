import axios from "axios";

// Переключаемся между localhost и продакшеном
const BASE_URL =
  import.meta.env.DEV && false
    ? "http://localhost:3001" // локальный json-server
    : "https://jamify-backend-necrosamurai.onrender.com";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
