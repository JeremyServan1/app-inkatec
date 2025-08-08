import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUsuarios, deleteUsuario } from "../../api/user";

export default function UsuariosList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try { setData(await getUsuarios()); }
    catch { alert("No se pudieron cargar los usuarios"); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!window.confirm("¿Eliminar usuario?")) return;
    try { await deleteUsuario(id); await load(); }
    catch { alert("No se pudo eliminar"); }
  };

  if (loading) return <p>Cargando usuarios…</p>;

  return (
    <section>
      <h2>Usuarios</h2>
      <Link className="btn" to="/admin/usuarios/nuevo">+ Nuevo</Link>
      <table className="tabla">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th></th></tr>
        </thead>
        <tbody>
          {data.map(u => {
            const id = u.id || u.id_usuario;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td>{u.rol}</td>
                <td style={{whiteSpace:"nowrap"}}>
                  <Link className="btn" to={`/admin/usuarios/${id}`}>Editar</Link>
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
