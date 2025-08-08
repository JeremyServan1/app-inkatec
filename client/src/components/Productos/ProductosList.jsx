import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductos, deleteProducto } from "../../api/product";

export default function ProductosList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setData(await getProductos()); }
    catch { alert("No se pudieron cargar productos"); }
    finally { setLoading(false); }
  }
  useEffect(()=>{ load(); }, []);

  const onDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try { await deleteProducto(id); await load(); }
    catch { alert("No se pudo eliminar"); }
  };

  if (loading) return <p>Cargando productos…</p>;

return (
  <section className="admin-card">
    <h2>Productos</h2>

    <div className="admin-actions">
      <Link className="btn primary" to="/admin/productos/nuevo">+ Nuevo</Link>
    </div>

    <table className="tabla">
      <thead>
        <tr><th>ID</th><th>Nombre</th><th>Precio</th><th>Stock</th><th></th></tr>
      </thead>
      <tbody>
        {data.map(p => {
          const id = p.id || p.id_producto;
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{p.nombre}</td>
              <td>S/ {Number(p.precio).toFixed(2)}</td>
              <td>{p.stock}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <Link className="btn link" to={`/admin/productos/${id}`}>Editar</Link>
                <button className="btn danger" onClick={() => onDelete(id)}>Eliminar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </section>
);

}
