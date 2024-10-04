import React from "react";
import "./Footer.css"; // Importar el CSS

const FooterComponent = () => {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Mi Aplicación. Todos los derechos
        reservados.
      </p>
    </footer>
  );
};

export default FooterComponent;
