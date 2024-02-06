import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.sass"; // Certifique-se de que este caminho está correto
import logo from "../images/logo.png";
const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="brand">
          <img src={logo} alt="Code Burguer Logo" />
          <h1>Code Burguer</h1>
        </div>
        <nav>
          <Link to="/">Início</Link>
          <Link to="/products" className="menu-link">
            Cardápio
          </Link>
          <Link to="/login" className="admin-link">
            Administração
          </Link>

          {/* Adicione mais links conforme necessário */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
