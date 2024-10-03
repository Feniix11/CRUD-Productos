import React, { useState, useEffect } from "react";
import { fetchProducts } from "../../service/products";
import { formatDate } from "../../utilities/formatDate";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log("Cargando productos..."); // Log para indicar que se está intentando cargar
        const response = await fetchProducts();
        console.log("Productos cargados:", response); // Log para verificar la respuesta
        setProducts(response);
      } catch (err) {
        console.error("Error al cargar productos:", err.message); // Log del error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lista de productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>Nombre:</strong> {product.name} <br />
            <strong>SKU:</strong> {product.SKU} <br />
            <strong>Cantidad:</strong> {product.quantity} <br />
            <strong>Creado el:</strong> {formatDate(product.createdAt)} <br />
            <strong>Actualizado el:</strong> {formatDate(product.updatedAt)}{" "}
            <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
