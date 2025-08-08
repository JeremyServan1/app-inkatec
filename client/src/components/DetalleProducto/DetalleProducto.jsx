import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllProductosCached } from "../../api/product";

const PEN = new Intl.NumberFormat("es-PE", { style: "currency", currency: "PEN" });

export default function ProductoDetalle() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        // 1) trae lista (de cache o API) sin tocar backend
        const lista = await getAllProductosCached();
        // 2) encuentra el producto por id
        const prod = lista.find(x => String(x.id) === String(id));
        if (!prod) throw new Error("Producto no encontrado");
        setP(prod);
        setQty(prod.stock > 0 ? 1 : 0);
      } catch (e) {
        setErr(e.message || "No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p>Cargando producto…</p>;
  if (err) return <p>{err}</p>;

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(sessionStorage.getItem("carrito")) || [];
    const idx = carrito.findIndex(x => String(x.id) === String(p.id));
    const item = { id: p.id, nombre: p.nombre, precio: p.precio, imagen: p.imagen };

    if (idx >= 0) carrito[idx].cantidad = Math.min((carrito[idx].cantidad || 1) + qty, p.stock);
    else carrito.push({ ...item, cantidad: qty });

    sessionStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
  };

  const disponible = p.stock > 0;

  return (
    <main className="main_detalleProducto">
      <nav style={{ marginBottom: 16 }}>
        <Link to="/">Inicio</Link> &nbsp;/&nbsp; <span>{p.nombre}</span>
      </nav>

      <div className="detalleProducto">
        <div className="detalleProducto_img_container">
          <img className="detalleProducto_img" src={p.imagen} alt={p.nombre} />
        </div>

        <div className="descripcion_detalleProducto">
          <h1 style={{ marginTop: 0 }}>{p.nombre}</h1>
          <p style={{ color: "#555" }}>{p.descripcion || "Sin descripción."}</p>

          <div style={{ margin: "12px 0" }}>
            <span
              style={{
                padding: "4px 8px",
                borderRadius: 8,
                background: disponible ? "#e6ffed" : "#ffe6e6",
                color: disponible ? "#0a7d32" : "#b30000",
                fontWeight: 600
              }}
            >
              {disponible ? `En stock: ${p.stock}` : "Sin stock"}
            </span>
          </div>

          <h2 style={{ margin: "10px 0 20px" }}>{PEN.format(p.precio)}</h2>

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <label>
              Cantidad:&nbsp;
              <input
                type="number"
                min={disponible ? 1 : 0}
                max={p.stock}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(0, Math.min(p.stock, Number(e.target.value))))
                }
                style={{ width: 80 }}
                disabled={!disponible}
              />
            </label>

            <button
              className="link_detalleProducto"
              onClick={agregarAlCarrito}
              disabled={!disponible || qty === 0}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
