import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [rol, setRol] = useState("USER");
  const [loading, setLoading] = useState(false);

  const registrarUsuario = async () => {
    if (pass !== pass2) return alert("Las contraseñas no coinciden");

    setLoading(true);
    try {
      const body = {
        nombre,
        email,
        password: pass,
        rol
      };

      await api.post("/usuario", body);
      alert("¡Usuario registrado! Ahora inicia sesión.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.error || "Error registrando usuario";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="registro">
      <h2><i className="fas fa-user-plus"></i> Registro</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          registrarUsuario();
        }}
      >
        <input
          type="text"
          placeholder="Nombre completo"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={pass2}
          onChange={(e) => setPass2(e.target.value)}
          required
        />

        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="USER">Usuario</option>
          <option value="ADMIN">Administrador</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </section>
  );
}
