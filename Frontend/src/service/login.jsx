const API_URL = "http://localhost:3001";

async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Ajusta los campos según tu API
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const token = await response.json();

    localStorage.setItem("token", token);

    return token; // Retorna el token o los datos que envíe la API
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    throw error; // Lanza el error para que sea manejado en el componente
  }
}

export default login;
