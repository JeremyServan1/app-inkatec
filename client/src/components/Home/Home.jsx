import { useEffect, useState } from "react";
import { getProductos } from "../../api/product";
import ProductoCard from "../ProductoCard/ProductoCard";

function Home() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const items = await getProductos();
        setProductos(items);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  if (cargando) return <p>Cargando catálogo...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section id="productos">
      <h2>
        <i className="fas fa-laptop"></i> Catálogo de Productos
      </h2>

      <div className="grid-productos">
        {productos.map((p) => (
          <ProductoCard
            key={p.id || p.id_producto}
            id={p.id || p.id_producto}
            nombre={p.nombre}
            precio={Number(p.precio)}
            imagen={p.imagen}
          />
        ))}
      </div>
    </section>
  );
}

export default Home;
