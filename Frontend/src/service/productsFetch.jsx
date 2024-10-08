const API_URL = "http://localhost:3001";

export const fetchProducts = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Agregar el token en los encabezados
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    const products = await response.json();

    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
