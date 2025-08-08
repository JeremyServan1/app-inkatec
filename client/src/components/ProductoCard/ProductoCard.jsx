import { Link } from "react-router-dom";

const formatMoney = (n) =>
  new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" }).format(n || 0);

export default function ProductoCard({ id, nombre, precio, imagen }) {
  const agregarProducto = () => {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    const idx = carrito.findIndex((p) => p.id === id);

    if (idx >= 0) carrito[idx].cantidad += 1;
    else carrito.push({ id, nombre, precio, imagen, cantidad: 1 });

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
  };

  return (
    <div className="producto">
      <img src={imagen || "/placeholder.png"} alt={nombre} />
      <h3>{nombre}</h3>
      <p className="precio">{formatMoney(precio)}</p>
      <div className="acciones-producto">
        <Link to={`/producto/${id}`}>
          <button className="btn-detalle">
            <i className="fas fa-eye"></i> Detalle del producto
          </button>
        </Link>
      </div>
    </div>
  );
}
