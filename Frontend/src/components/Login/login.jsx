// src/components/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import login from "../../service/loginFetch";
import "./Login.css"; // Importar el CSS
import { useUser } from "../../hooks/useContext/User";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { setUser } = useUser();

  const navigate = useNavigate(); // Inicializar useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const [tokenResponse, payload] = await login(email, password);

      console.log("Token de inicio de sesión:", tokenResponse);

      setEmail("");
      setPassword("");

      setUser(payload);

      navigate("/main");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Iniciar Sesión</button>
          <Link to="register" className="register-link">
            Registrate
          </Link>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
