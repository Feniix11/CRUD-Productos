const API_URL = "http://localhost:3001/";

const fetchPurchase = async (product) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}productos/purchase`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Agregar el token en los encabezados
      },
      body: JSON.stringify({
        SKU: product.SKU,
        name: product.name,
        quantity: product.quantity,
      }), // Serializar a JSON
    });

    if (!response.ok) {
      throw new Error("Error al realizar la compra");
    }

    const result = await response.json();
    return result; // Retorna el resultado en lugar de usar alert aquí
  } catch (error) {
    console.error("Error en la compra:", error);
    throw error; // Lanza el error para que sea capturado por quien llame a la función
  }
};

export default fetchPurchase;
