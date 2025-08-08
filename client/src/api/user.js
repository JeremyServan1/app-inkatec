import api from "./axios";

const KEY = "usuarios_cache";

// ---- Lectura ----
export async function getUsuarios() {
  const { data } = await api.get("/usuario");
  return data;
}

export async function getUsuario(id) {
  const { data } = await api.get(`/usuario/${id}`);
  return data;
}

// (opcional) cache en sessionStorage, igual que productos_cache
export async function getUsuariosCached() {
  const cached = sessionStorage.getItem(KEY);
  if (cached) return JSON.parse(cached);
  const data = await getUsuarios();
  sessionStorage.setItem(KEY, JSON.stringify(data));
  return data;
}

// ---- Escritura (CRUD) ----
export async function createUsuario(payload) {
  try {
    const { data } = await api.post("/usuario", payload);
    sessionStorage.removeItem(KEY); // invalidar cache
    return data;
  } catch (err) {
    console.error("createUsuario error:", err?.response?.data || err.message);
    throw err;
  }
}

export async function updateUsuario(id, payload) {
  try {
    const { data } = await api.put(`/usuario/${id}`, payload);
    sessionStorage.removeItem(KEY);
    return data;
  } catch (err) {
    console.error("updateUsuario error:", err?.response?.data || err.message);
    throw err;
  }
}

export async function deleteUsuario(id) {
  try {
    const { data } = await api.delete(`/usuario/${id}`);
    sessionStorage.removeItem(KEY);
    return data;
  } catch (err) {
    console.error("deleteUsuario error:", err?.response?.data || err.message);
    throw err;
  }
}


