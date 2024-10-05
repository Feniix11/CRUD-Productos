// login.js
import parseToken from "../utilities/DecodedToken";

const API_URL = "http://localhost:3001";

async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Error al iniciar sesión");
    }

    const tokenResponse = await response.json();
    const token = tokenResponse.token;
    const payload = parseToken(token);

    console.log("TOKEN: ", token);
    console.log("Payload: ", payload);

    // Guarda el token en localStorage
    localStorage.setItem("token", token);

    return [tokenResponse, payload];
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    throw error;
  }
}

export default login;
