// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com", // Aponta para a FakeStoreAPI
});

// Exemplo de interceptor (opcional)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // Se a URL não for /products, você pode anexar o token
    if (token && config.headers && config.url && !config.url.includes("/products")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
