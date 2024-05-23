import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import ConsultaList from "./components/ConsultaList";
import ConsultaForm from "./components/ConsultaForm";
import TopBar from "./components/TopBar";
import { AuthProvider } from "./components/AuthContext";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import "./index.css"; // Adicionar estilos globais se necessário

const clientId =
  "860907029773-f1k556igmjvjdm8lpg0cja24olm2mhnf.apps.googleusercontent.com";

const App = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};
export default App;
