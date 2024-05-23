// src/index.js
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import ConsultaList from "./components/ConsultaList";
import ConsultaForm from "./components/ConsultaForm";
import TopBar from "./components/TopBar";
import "./index.css"; // Adicionar estilos globais se necessário

ReactDOM.render(
  <Router>
    <div>
      <TopBar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/consultas" element={<ConsultaList />} />
        <Route path="/consultas/new" element={<ConsultaForm />} />
        <Route path="/consultas/edit/:id" element={<ConsultaForm />} />
      </Routes>
    </div>
  </Router>,
  document.getElementById("root")
);
