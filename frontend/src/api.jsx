// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333", // your backend
  withCredentials: true,
});

export default api;
