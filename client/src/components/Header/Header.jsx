import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const load = () => {
      const u = sessionStorage.getItem("usuarioActual");
      setUser(u ? JSON.parse(u) : null);
      setHasToken(!!sessionStorage.getItem("token"));
    };
    load();
    const onAuth = () => load();
    const onStorage = () => load();
    window.addEventListener("authchange", onAuth);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("authchange", onAuth);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const logout = () => {
    // 🔥 limpiar todo rastro de sesión/caches
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuarioActual");
    sessionStorage.removeItem("productos_cache");
    sessionStorage.removeItem("carrito");
    // agrega aquí cualquier otro cache que uses

    setUser(null);
    setHasToken(false);
    window.dispatchEvent(new Event("authchange"));

    // refresco duro para evitar menús “pegados”
    window.location.href = "/Login";
  };

  const isAdmin = user?.rol === "ADMIN"; // 👈 clave

  return (
    <header>
      <div className="izquierda">
        <NavLink to="/"><h1><i className="fas fa-store"></i> InkaTec</h1></NavLink>
        <nav>
          <NavLink to="/QuienesSomos">¿Quienes Somos?</NavLink>
          <NavLink to="/Carrito">Carrito</NavLink>

          {/* Menús de admin SOLO si el usuario es ADMIN */}
          {isAdmin && (
            <>
              <NavLink to="/admin/productos">Productos</NavLink>
              <NavLink to="/admin/usuarios">Usuarios</NavLink>
            </>
          )}
        </nav>
      </div>

      <div className="acciones">
        {!hasToken ? (
          <>
            <NavLink to="/Login"><button><i className="fas fa-sign-in-alt"></i> Iniciar Sesión</button></NavLink>
            <NavLink to="/Registro"><button><i className="fas fa-user-plus"></i> Registrarse</button></NavLink>
          </>
        ) : (
          <>
            <span style={{ marginRight: 8 }}>
              Hola, <strong>{user?.nombre || user?.email || "usuario"}</strong>
            </span>
            <button onClick={logout}><i className="fas fa-sign-out-alt"></i> Salir</button>
          </>
        )}
      </div>
    </header>
  );
}
