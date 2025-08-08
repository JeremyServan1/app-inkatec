import api from "./axios";

export async function getProductos() {
  const { data } = await api.get("/producto");
  return data;
}

export async function getProductoById(id) {
  const { data } = await api.get(`/producto/${id}`);
  return data;
}

const KEY = "productos_cache";

export async function getAllProductosCached() {
  // 1) intenta desde sessionStorage
  const cached = sessionStorage.getItem(KEY);
  if (cached) return JSON.parse(cached);

  // 2) si no hay cache, pide al backend
  const { data } = await api.get("/producto"); // sin tocar backend
  // normaliza por si el backend usa id_producto
  const norm = data.map(p => ({
    id: p.id ?? p.id_producto,
    nombre: p.nombre,
    descripcion: p.descripcion,
    precio: Number(p.precio),
    stock: Number(p.stock),
    imagen: p.imagen || `https://placehold.co/600x400?text=${encodeURIComponent(p.nombre)}`
  }));

  sessionStorage.setItem(KEY, JSON.stringify(norm));
  return norm;
}


export async function createProducto(payload) {
  try {
    console.log(payload);
    const { data } = await api.post("/producto", payload);
    sessionStorage.removeItem("productos_cache");
    return data;
  } catch (err) {
    console.error("createProducto error:", err?.response?.data || err.message);
    throw err;
  }
}

export async function updateProducto(id, payload) {
  const { data } = await api.put(`/producto/${id}`, payload);
  sessionStorage.removeItem(KEY);
  return data;
}

export async function deleteProducto(id) {
  const { data } = await api.delete(`/producto/${id}`);
  sessionStorage.removeItem(KEY);
  return data;
}
