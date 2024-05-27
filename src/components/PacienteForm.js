import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import AuthContext from "./AuthContext";
import "../style/ConsultaForm.css";


const PacienteForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authToken } = useContext(AuthContext); // Assuming you have a context to provide the auth token

  const [paciente, setPaciente] = useState({
    numero_de_utente: "",
    nome: "",
    contacto: "",
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const result = await api.get(`/pacientes/${id}`);
          setPaciente(result.data);
        } catch (error) {
          console.error("Error fetching paciente:", error);
        }
      };
      fetchData();
    }
  }, [id, authToken]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPaciente((prevPaciente) => ({
      ...prevPaciente,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`, // Include the auth token in the headers
      };
      if (id) {
        await api.put(`/pacientes/${id}`, paciente, { headers });
        toast.success("Paciente editado com sucesso!");
      } else {
        await api.post("/pacientes", paciente, { headers });
        toast.success("Paciente criado com sucesso!");
      }
      navigate("/pacientes");
    } catch (error) {
      console.error("Error saving paciente:", error);
      const errorMessage = error.response
        ? `Erro ao salvar paciente: ${error.response.status} - ${error.response.data.message}`
        : "Erro ao salvar paciente.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? "Editar" : "Novo"} Paciente</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Numero de Utente</label>
          <input
            type="number"
            name="numero_de_utente"
            value={paciente.numero_de_utente}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nome do Paciente</label>
          <input
            type="text"
            name="nome"
            value={paciente.nome}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Contacto do Paciente</label>
          <input
            type="text"
            name="contacto"
            value={paciente.contacto}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PacienteForm;
