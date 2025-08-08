import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const datosCarrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    setCarrito(datosCarrito);
    calcularTotal(datosCarrito);
  }, []);

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((p) => p.id !== id);
    setCarrito(nuevoCarrito);
    sessionStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    calcularTotal(nuevoCarrito);
  };

  const calcularTotal = (carrito) => {
    const suma = carrito.reduce((total, p) => total + p.precio * p.cantidad, 0);
    setTotal(suma);
  };

  return (
    <section id="carrito">
      <h2>
        <i className="fas fa-shopping-cart"></i> Carrito de Compras
      </h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((p) => (
            <div className="carrito" key={p.id}>
              <img src={`../public/${p.imagen}`} alt={p.nombre} />

              <div className="detalles">
                <h3>{p.nombre}</h3>
                <p>Cantidad: {p.cantidad}</p>
                <p>Precio: ${p.precio}</p>
                <button onClick={() => eliminarProducto(p.id)}>
                  <i className="fas fa-trash"></i> Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="resumen carrito-resumen section">
            <p id="precioFinal">El Precio Total: ${total}</p>
            <Link to="/checkout">
              <button>
                <i className="fa fa-credit-card"></i> Pagar
              </button>
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
