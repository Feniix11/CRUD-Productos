import React from "react";
import "./Footer.css";
import fetchPurchase from "../../service/purchaseFetch";

const FooterComponent = ({ cart, onResetProducts }) => {
  async function handleBuy() {
    if (cart.length === 0) {
      alert("El carrito está vacío, no puedes realizar una compra.");
      return; // Salir de la función si el carrito está vacío
    }

    try {
      // Ejecutar fetchPurchase para cada producto en el carrito
      const results = await Promise.all(
        cart.map((product) => fetchPurchase(product))
      );

      alert("Todas las compras han sido procesadas con éxito!");

      // Llamar la función de reseteo
      onResetProducts();
    } catch (error) {
      console.error("Error en las compras:", error);
      alert("Hubo un problema al procesar las compras.");
    }
  }

  return (
    <footer className="footer">
      <p className="copyright">
        &copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos
        reservados.
      </p>
      <button className="buy-button" onClick={handleBuy}>
        Comprar
      </button>
    </footer>
  );
};

export default FooterComponent;
