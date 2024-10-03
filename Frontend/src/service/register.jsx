// src/service/authService.js

const API_URL = "http://localhost:3001";

async function register(user, email, password) {
  try {
    const response = await fetch(`${API_URL}/usuarios/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, email, password }), // Ajusta los campos según tu API
    });

    if (!response.ok) {
      throw new Error("Error al crear la cuenta");
    }

    const data = await response.json();
    return data; // Retorna los datos recibidos, puedes agregar más manejo aquí
  } catch (error) {
    console.error("Error en el registro:", error);
    throw error; // Lanza el error para que sea manejado en el componente
  }
}
// Función para iniciar sesión

export default register;
