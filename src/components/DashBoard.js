// src/components/DashBoard.js
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/DashBoard.css";
import AuthContext from "./AuthContext";

const DashBoard = () => {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchUtente, setSearchUtente] = useState("");

  const handleSearch = () => {
    if (searchUtente) {
      navigate(`/relatorio/${searchUtente}`);
    }
  };

  return (
    <div className="dashboard">
      <h1>Bem-vindo ao Sistema de Gestão de Consultas</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar por Número de Utente"
          value={searchUtente}
          onChange={(e) => setSearchUtente(e.target.value)}
        />
        <button className="dashboard-link" onClick={handleSearch}>
          Pesquisar
        </button>
      </div>

      <div className="dashboard-links">
        <Link to="/consultas" className="dashboard-link">
          Ver Consultas
        </Link>
        {authenticated ? (
          <Link to="/consultas/new" className="dashboard-link">
            Nova Consulta
          </Link>
        ) : null}
        <Link to="/pacientes" className="dashboard-link">
          Ver Pacientes
        </Link>
        {authenticated ? (
          <Link to="/pacientes/new" className="dashboard-link">
            Novo Paciente
          </Link>
        ) : null}
         <Link to="/especialidades" className="dashboard-link">
          Ver Especialidades
        </Link>
        {authenticated ? (
          <Link to="/especialidades/new" className="dashboard-link">
            Nova Especialidade
          </Link>
        ) : null}
         <Link to="/especialistas" className="dashboard-link">
          Ver Especialistas
        </Link>
        {authenticated ? (
          <Link to="/especialistas/new" className="dashboard-link">
            Novo Especialista
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default DashBoard;
