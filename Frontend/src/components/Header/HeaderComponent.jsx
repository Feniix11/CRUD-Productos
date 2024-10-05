import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useContext/User"; // Importar el hook del contexto
import "./Header.css"; // Importar el CSS

const HeaderComponent = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Utiliza el contexto para obtener el usuario

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="header">
      <h1 className="header-title">Mi Aplicación</h1>
      {user && <h2 className="header-username">Usuario: {user.user}</h2>}
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default HeaderComponent;
