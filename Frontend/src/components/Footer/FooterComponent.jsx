import React from "react";
import "./Footer.css"; // Importar el CSS
import fetchPurchase from "../../service/purchaseFetch";

const FooterComponent = ({ cart }) => {
  async function handleBuy() {
    try {
      // Ejecutar fetchPurchase para cada producto en el carrito
      const results = await Promise.all(
        cart.map((product) => fetchPurchase(product))
      );

      console.log("Resultados de la compra:", results);
      alert("Todas las compras han sido procesadas con éxito!");
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
