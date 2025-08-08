import axios from "axios";

const api = axios.create({
  baseURL: "http://3.23.119.71:4001/api", // cambia por tu backend real
  withCredentials: true // para enviar/recibir cookies
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    if (status === 401 || status === 403) {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("usuarioActual");
    }
    return Promise.reject(err);
  }
);

export default api;
