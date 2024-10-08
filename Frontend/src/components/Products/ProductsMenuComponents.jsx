import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../service/productsFetch";
import "./ProductsMenuComponents.css";

const ProductsMenuComponents = ({ onUpdateCart, resetProducts }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState({}); // Guardar cantidades por producto
  const [selectedProducts, setSelectedProducts] = useState([]); // Guardar productos seleccionados

  useEffect(() => {
    GetProducts();
  }, []);

  useEffect(() => {
    if (resetProducts) {
      // Reiniciar cantidades a 0 si resetProducts es true
      const resetQuantities = {};
      products.forEach((product) => {
        resetQuantities[product.id] = 0;
      });
      setQuantities(resetQuantities);
      onUpdateCart([]); // Vaciar el carrito
      GetProducts();
    }
  }, [resetProducts]);

  useEffect(() => {
    onUpdateCart(selectedProducts);
  }, [selectedProducts, onUpdateCart]);

  const GetProducts = async () => {
    try {
      const allProducts = await fetchProducts();
      setProducts(allProducts);

      // Inicializar las cantidades de cada producto en 0
      const initialQuantities = {};
      allProducts.forEach((product) => {
        initialQuantities[product.id] = 0;
      });
      setQuantities(initialQuantities);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Función para manejar el incremento de cantidad para un producto específico
  const increment = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: prevQuantities[productId] + 1,
      };
      updateSelectedProducts(productId, newQuantities[productId]);
      return newQuantities;
    });
  };

  // Función para manejar el decremento de cantidad para un producto específico
  const decrement = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: Math.max(prevQuantities[productId] - 1, 0), // Asegurarse de que no sea menor que 0
      };
      updateSelectedProducts(productId, newQuantities[productId]);
      return newQuantities;
    });
  };

  // Función para resetear la cantidad para un producto específico
  const reset = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: 0,
      };
      updateSelectedProducts(productId, 0);
      return newQuantities;
    });
  };

  // Función para actualizar el estado de productos seleccionados
  const updateSelectedProducts = (productId, quantity) => {
    setSelectedProducts((prevSelected) => {
      const product = products.find((p) => p.id === productId);

      if (quantity > 0) {
        // Si la cantidad es mayor que 0, actualizamos o añadimos el producto
        const updatedSelected = prevSelected.filter((p) => p.id !== productId);
        const buyCar = [...updatedSelected, { ...product, quantity }];

        return buyCar;
      } else {
        // Si la cantidad es 0, eliminamos el producto del arreglo
        return prevSelected.filter((p) => p.id !== productId);
      }
    });
  };

  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error al cargar productos: {error}</div>;

  return (
    <div className="products-container">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <h3>{product.name}</h3>
          <img
            src={product.imageURL}
            alt={product.name}
            className="product-image"
          />
          <p>
            <strong>SKU:</strong> {product.SKU}
          </p>
          <p>
            <strong>Cantidad en inventario:</strong> {product.quantity}
          </p>
          <p>
            <strong>Fecha de creación:</strong>
            {new Date(product.createdAt).toLocaleDateString()}
          </p>
          <div className="quantity-controls">
            <span>{quantities[product.id]}</span>
            <button onClick={() => decrement(product.id)}>-</button>
            <button onClick={() => reset(product.id)}>Reset</button>
            <button onClick={() => increment(product.id)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsMenuComponents;
