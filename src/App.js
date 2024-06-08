import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import ConsultaList from "./components/ConsultaList";
import ConsultaForm from "./components/ConsultaForm";
import PacienteList from "./components/PacienteList";
import PacienteForm from "./components/PacienteForm";
import EspecialistaList from "./components/EspecialistaList";
import EspecialistaForm from "./components/EspecialistaForm";
import EspecialidadeList from "./components/EspecialidadeList";
import EspecialidadeForm from "./components/EspecialidadeForm";
import RelatorioPaciente from "./components/RelatorioPaciente";
import TopBar from "./components/TopBar";
import Profile from "./components/Profile";
import { AuthProvider } from "./components/AuthContext";
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
  }, []);

  return (
    <AuthProvider>
      <Router>
        <div>
          <TopBar />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/consultas" element={<ConsultaList />} />
            <Route path="/consultas/new/*" element={<ConsultaForm />} />
            <Route path="/consultas/edit/:id/*" element={<ConsultaForm />} />
            <Route path="/pacientes" element={<PacienteList />} />
            <Route path="/pacientes/new/*" element={<PacienteForm />} />
            <Route path="/pacientes/edit/:id/*" element={<PacienteForm />} />
            <Route path="/especialistas" element={<EspecialistaList />} />
            <Route path="/especialistas/new/*" element={<EspecialistaForm />} />
            <Route path="/especialistas/edit/:id/*" element={<EspecialistaForm />} />
            <Route path="/especialidades" element={<EspecialidadeList />} />
            <Route path="/especialidades/new/*" element={<EspecialidadeForm />} />
            <Route path="/especialidades/edit/:id/*" element={<EspecialidadeForm />} />
            <Route path="/perfil" element={<Profile />} />
            <Route
              path="/relatorio/:numero_de_utente"
              element={<RelatorioPaciente />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
