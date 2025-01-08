import axios from "axios";

// Define a URL base da API
const BASE_URL = "http://127.0.0.1:8000/api";

// Cria uma instância do axios com a URL base configurada
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
