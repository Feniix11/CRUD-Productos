import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../service/productsFetch";

import "./ProductsMenuComponents.css";

const ProductsMenuComponents = ({ onUpdateCart }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState([]);

  useEffect(() => {
    GetProducts();
  }, []);

  const GetProducts = async () => {
    try {
      const allProducts = await fetchProducts();
      console.log("Todos los productos: ", allProducts);
      setProducts(allProducts);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const updateQuantity = (productId, increment) => {
    // Esta función solo debería ejecutarse cuando el usuario interactúe, no durante el renderizado
    setBuying((prevBuying) => {
      const existingProductIndex = prevBuying.findIndex(
        (p) => p.id === productId
      );
      const updatedProducts = [...prevBuying];

      if (existingProductIndex > -1) {
        // Si el producto ya está en el carrito, actualizamos su cantidad
        const newQuantity =
          updatedProducts[existingProductIndex].quantity + increment;
        if (newQuantity <= 0) {
          // Si la cantidad llega a 0 o menor, lo eliminamos del carrito
          updatedProducts.splice(existingProductIndex, 1);
        } else {
          // Si no, actualizamos la cantidad
          updatedProducts[existingProductIndex].quantity = newQuantity;
        }
      } else if (increment > 0) {
        // Si el producto no está en el carrito y el incremento es mayor que 0, lo agregamos
        const productToAdd = products.find((p) => p.id === productId);
        updatedProducts.push({ ...productToAdd, quantity: increment });
      }

      // Esta actualización debería ejecutarse solo en respuesta a un evento, no durante el render
      onUpdateCart(updatedProducts);
      return updatedProducts;
    });
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar productos: {error}</div>;

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <p>
            <strong>SKU:</strong> {product.SKU}
          </p>
          <p>
            <strong>Cantidad en inventario:</strong> {product.quantity}
          </p>
          <p>
            <strong>Fecha de creación:</strong>{" "}
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
          <div className="quantity-controls">
            <button onClick={() => updateQuantity(product.id, -1)}>-</button>
            <span>
              {buying.find((p) => p.id === product.id)?.quantity || 0}
            </span>
            <button onClick={() => updateQuantity(product.id, 1)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsMenuComponents;
