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
        const response = await fetchProducts(); // Asegúrate de que esta función esté configurada correctamente
        setProducts(response); // Asegúrate de que el formato de respuesta sea correcto
      } catch (err) {
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
