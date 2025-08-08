import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const iniciarSesion = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/login", { email, password: pass });
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("usuarioActual", JSON.stringify(data.user));
      alert("Inicio de sesión exitoso");
      navigate("/");
      window.location.href = "/";
    } catch (err) {
      alert(err?.response?.data?.error || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="login">
      <h2><i className="fas fa-sign-in-alt"></i> Iniciar Sesión</h2>
      <form onSubmit={(e) => { e.preventDefault(); iniciarSesion(); }}>
        <input type="email" placeholder="Correo electrónico"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña"
          value={pass} onChange={(e) => setPass(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </button>
      </form>
    </section>
  );
}
