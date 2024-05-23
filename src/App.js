import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import ConsultaList from "./components/ConsultaList";
import ConsultaForm from "./components/ConsultaForm";
import TopBar from "./components/TopBar";
import GoogleCallback from "./components/GoogleCallback";
import { AuthProvider } from "./components/AuthContext";
import "./index.css"; // Adicionar estilos globais se necessário

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <TopBar />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/consultas" element={<ConsultaList />} />
            <Route path="/consultas/new" element={<ConsultaForm />} />
            <Route path="/consultas/edit/:id" element={<ConsultaForm />} />
            <Route path="/google/callback" element={<GoogleCallback />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};
export default App;
