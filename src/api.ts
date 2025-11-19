// src/services/api.ts
import axios from "axios";

const IP = import.meta.env.VITE_IP;
const PORT = import.meta.env.VITE_PORT;
const URL = `http://${IP}:${PORT}`;

export const api = axios.create({
  baseURL: URL,
  withCredentials: true, // 🔥 importante para las cookies HTTP-only
});
