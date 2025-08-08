import { useEffect, useState } from "react";

export default function Checkout() {
  const [carrito, setCarrito] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const datos = JSON.parse(sessionStorage.getItem("carrito")) || [];
    setCarrito(datos);
    const suma = datos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    setTotal(suma);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Pedido confirmado!");
    sessionStorage.removeItem("carrito");
    window.location.href = "/";
  };

  return (
    <section>
      <h2>
        <i className="fas fa-credit-card"></i> Finalizar Pedido
      </h2>

      <div
        id="resumen-checkout"
        style={{
          border: "1px solid #ccc",
          padding: "1rem",
          marginBottom: "1rem",
        }}
      >
        <h3>Resumen del Pedido</h3>
        <div>
          {carrito.map((p) => (
            <p key={p.id}>
              {p.nombre} x{p.cantidad} - ${p.precio * p.cantidad}
            </p>
          ))}
        </div>
        <p style={{ fontWeight: "bold" }}>Total a pagar: ${total}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Nombre completo:</label>
        <input type="text" required />

        <label>Dirección de envío:</label>
        <input type="text" required />

        <label>Correo electrónico:</label>
        <input type="email" required />

        <label>Tipo de documento:</label>
        <select required>
          <option value="">Seleccione</option>
          <option value="dni">DNI</option>
          <option value="ruc">RUC</option>
          <option value="carnet">Carnet de Extranjería</option>
        </select>

        <label>Número de documento:</label>
        <input
          type="text"
          name="numero-documento"
          required
          pattern="[0-9]{8,12}"
          title="Debe contener entre 8 y 12 dígitos numéricos"
        />

        <label>Método de pago:</label>
        <div>
          <input type="radio" name="metodo" value="tarjeta" required /> Tarjeta
          de Crédito
          <br />
          <input type="radio" name="metodo" value="paypal" /> PayPal
          <br />
          <input type="radio" name="metodo" value="efectivo" /> Pago Contra
          Entrega
        </div>

        <fieldset>
          <legend>Datos de la Tarjeta</legend>

          <label>Nombre del titular:</label>
          <input
            type="text"
            maxLength="40"
            pattern="[A-Za-zÁÉÍÓÚÑáéíóúñ ]{3,40}"
            title="Solo letras, mínimo 3 caracteres"
            placeholder="Juan Pérez"
          />

          <label>Número de tarjeta:</label>
          <input
            type="text"
            maxLength="16"
            pattern="[0-9]{16}"
            title="Debe contener 16 dígitos"
            placeholder="1234123412341234"
          />

          <label>Fecha de vencimiento:</label>
          <input
            type="text"
            maxLength="5"
            pattern="(0[1-9]|1[0-2])\\/([0-9]{2})"
            title="Formato MM/AA"
            placeholder="12/26"
          />

          <label>Código CVV:</label>
          <input
            type="text"
            maxLength="3"
            pattern="[0-9]{3}"
            title="Debe contener 3 dígitos numéricos"
            placeholder="123"
          />
        </fieldset>

        <br />
        <button type="submit">
          <i className="fas fa-check-circle"></i> Confirmar Pedido
        </button>
      </form>
    </section>
  );
}
