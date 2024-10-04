import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css"; // Importar el CSS

const HeaderComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="header">
      <h1 className="header-title">Mi Aplicación</h1>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default HeaderComponent;
