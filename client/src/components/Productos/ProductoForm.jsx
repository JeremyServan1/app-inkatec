import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createProducto, getProductoById, updateProducto } from "../../api/product";

export default function ProductoForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre:"", descripcion:"", precio:"", stock:"" });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const p = await getProductoById(id);
        setForm({
          nombre: p.nombre || "",
          descripcion: p.descripcion || "",
          precio: p.precio ?? "",
          stock: p.stock ?? ""
        });
      } catch { alert("No se pudo cargar el producto"); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      stock: Number(form.stock)
    };
    try {
      if (id) await updateProducto(id, payload);
      else await createProducto(payload);
      navigate("/admin/productos");
    } catch { alert("No se pudo guardar"); }
  };

  if (loading) return <p>Cargando…</p>;

    return (
    <section className="admin-card">
        <h2>{id ? "Editar producto" : "Nuevo producto"}</h2>
        <form className="form" onSubmit={onSubmit}>
        <input value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} placeholder="Nombre" required />
        <textarea rows={3} value={form.descripcion} onChange={e=>setForm({...form, descripcion:e.target.value})} placeholder="Descripción" />
        <input type="number" step="0.01" value={form.precio} onChange={e=>setForm({...form, precio:e.target.value})} placeholder="Precio" required />
        <input type="number" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} placeholder="Stock" required />
        <div className="row">
            <button className="btn primary" type="submit">Guardar</button>
            <button className="btn" type="button" onClick={()=>navigate("/admin/productos")}>Cancelar</button>
        </div>
        </form>
    </section>
    );

}
