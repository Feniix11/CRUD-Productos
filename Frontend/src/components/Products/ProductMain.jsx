import React, { useState } from "react";
import HeaderComponent from "../Header/HeaderComponent";
import FooterComponent from "../Footer/FooterComponent";

import ProductsMenuComponents from "./ProductsMenuComponents";

const ProductMain = () => {
  const [cart, setCart] = useState({});

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
