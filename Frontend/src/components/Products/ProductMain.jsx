import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../Header/HeaderComponent";
import FooterComponent from "../Footer/FooterComponent";

import ProductsMenuComponents from "./ProductsMenuComponents";

const ProductMain = () => {
  const [cart, setCart] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    !token ? navigate("/") : null;
  }, []);

  const handleUpdateCart = (updatedCart) => {
    setCart(updatedCart);
  };

  return (
    <>
      <HeaderComponent />
      <div className="main-content">
        <ProductsMenuComponents onUpdateCart={handleUpdateCart} />
      </div>
      <FooterComponent cart={cart} />
    </>
  );
};

export default ProductMain;
