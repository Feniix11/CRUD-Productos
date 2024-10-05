// utilities/DecodedToken.js
function parseToken(token) {
  // Divide el token en las tres partes (header, payload, signature)
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  // Decodifica el base64 y retorna el objeto JSON
  try {
    return JSON.parse(window.atob(base64));
  } catch (error) {
    console.error("Token inválido", error);
    return null; // O lanza un error según lo que prefieras
  }
}

export default parseToken;
