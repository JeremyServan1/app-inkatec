import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUsuario, getUsuario, updateUsuario } from "../../api/user";

export default function UsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre:"", email:"", password:"", rol:"USER" });
  const [loading, setLoading] = useState(!!id);

  useEffect(() => {
    (async () => {
      if (!id) return;
      try {
        const u = await getUsuario(id);
        setForm({ nombre: u.nombre || "", email: u.email || "", password:"", rol: u.rol || "USER" });
      } catch { alert("No se pudo cargar el usuario"); }
      finally { setLoading(false); }
    })();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await updateUsuario(id, form);
      else await createUsuario(form);
      navigate("/admin/usuarios");
    } catch { alert("No se pudo guardar"); }
  };

  if (loading) return <p>Cargando…</p>;

  return (
    <section>
      <h2>{id ? "Editar usuario" : "Nuevo usuario"}</h2>
      <form onSubmit={onSubmit} className="form">
        <input value={form.nombre} onChange={e=>setForm({...form, nombre:e.target.value})} placeholder="Nombre" required />
        <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" required />
        <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="Password" required={!id} />
        <select value={form.rol} onChange={e=>setForm({...form, rol:e.target.value})}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <div className="row">
          <button className="btn" type="submit">Guardar</button>
          <button className="btn ghost" type="button" onClick={()=>navigate("/admin/usuarios")}>Cancelar</button>
        </div>
      </form>
    </section>
  );
}
