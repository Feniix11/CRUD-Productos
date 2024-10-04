// src/components/NavBar.jsx
import React from "react";
import "./NavBar.css"; // Asegúrate de crear este archivo CSS

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Mi App</h1>
      </div>
      <div className="navbar-links">
        <a href="/logout" className="navbar-link">
          Logout
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
