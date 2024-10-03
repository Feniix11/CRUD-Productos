export const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3001/productos", {
      headers: {
        "Cache-Control": "no-cache", // Fuerza a no utilizar caché
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching products");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};
