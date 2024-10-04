import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../service/products"; // Asegúrate de que esta función esté bien implementada

import "./ProductsMenuComponents.css"; // Importa el CSS

const ProductsMenuComponents = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Para manejar errores
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  useEffect(() => {
    // Función para obtener productos
    const GetProducts = async () => {
      try {
        const response = await fetchProducts(); // Llama a la API
        const productsWithQuantity = response.map((product) => ({
          ...product,
          quantity: product.quantity || 0, // Si no tiene cantidad, inicializa en 0
        }));
        setProducts(productsWithQuantity);
        setLoading(false);
      } catch (error) {
        setError(error.message); // Manejar error
        setLoading(false);
      }
    };

    GetProducts(); // Llamar a la función para obtener productos
  }, []);

  // Funciones para manejar la cantidad
  const handleIncrease = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const handleDecrease = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Manejo de estados de carga y error
  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar productos: {error}</div>;

  return (
    <div className="products-container">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>
              <strong>SKU:</strong> {product.SKU}
            </p>
            <p>
              <strong>Cantidad:</strong> {product.quantity}
            </p>
            <p>
              <strong>Fecha de creación:</strong>{" "}
              {new Date(product.createdAt).toLocaleDateString()}
            </p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrease(product.id)}>-</button>
              <span>{product.quantity}</span>
              <button onClick={() => handleIncrease(product.id)}>+</button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default ProductsMenuComponents;
