import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../Header/HeaderComponent";
import FooterComponent from "../Footer/FooterComponent";
import ProductsMenuComponents from "./ProductsMenuComponents";

const ProductMain = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]); // Carrito de compras en el estado del padre
  const [resetProducts, setResetProducts] = useState(false); // Estado de control para reiniciar

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);

  // Función para actualizar el carrito desde el componente hijo
  const handleUpdateCart = (buyCar) => {
    setCart(buyCar);
  };

  // Función para reiniciar productos
  const handleResetProducts = () => {
    setResetProducts(true); // Cambiar el estado a true para reiniciar
    setTimeout(() => setResetProducts(false), 0); // Regresar el estado a false para que se vuelva a renderizar correctamente
  };

  return (
    <>
      <HeaderComponent />
      <div className="main-content">
        <ProductsMenuComponents
          onUpdateCart={handleUpdateCart}
          resetProducts={resetProducts} // Pasar el estado de reinicio como prop
        />
      </div>
      <FooterComponent cart={cart} onResetProducts={handleResetProducts} />
      {/* Pasar la función de reset al Footer */}
    </>
  );
};

export default ProductMain;
