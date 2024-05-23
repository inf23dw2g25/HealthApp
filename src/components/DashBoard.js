// src/components/DashBoard.js
import React from "react";
import { Link } from "react-router-dom";
import "../style/DashBoard.css";

const DashBoard = () => {
  return (
    <div className="dashboard">
      <h1>Bem-vindo ao Sistema de Gestão de Consultas</h1>
      <div className="dashboard-links">
        <Link to="/consultas" className="dashboard-link">
          Ver Consultas
        </Link>
        <Link to="/consultas/new" className="dashboard-link">
          Nova Consulta
        </Link>
      </div>
    </div>
  );
};

export default DashBoard;
