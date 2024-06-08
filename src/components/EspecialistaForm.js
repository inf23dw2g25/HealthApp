import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import AuthContext from "./AuthContext";
import "../style/ConsultaForm.css";

const EspecialistaForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authToken } = useContext(AuthContext); // Assuming you have a context to provide the auth token

  const [especialista, setEspecialista] = useState({
    nome:"",
    id_especialidade: "",
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const result = await api.get(`/especialistas/${id}`);
          const formattedData = {
            ...result.data,
          };
          setEspecialista(formattedData);
        } catch (error) {
          console.error("Error fetching especialista:", error);
        }
      };
      fetchData();
    }
  }, [id, authToken]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEspecialista((prevEspecialista) => ({
      ...prevEspecialista,
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
        await api.put(`/especialistas/${id}`, especialista, { headers });
        toast.success("Especialista editada com sucesso!");
      } else {
        await api.post("/especialistas", especialista, { headers });
        toast.success("Especialista criada com sucesso!");
      }
      navigate("/especialistas");
    } catch (error) {
      console.error("Error saving especialista:", error);
      const errorMessage = error.response
        ? `Erro ao salvar especialista: ${error.response.status} - ${error.response.data.message}`
        : "Erro ao salvar especialista.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? "Editar" : "Nova"} Especialista</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome do Especialista</label>
          <input
            type="text"
            name="nome"
            value={especialista.nome}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>ID da Especialidade</label>
          <input
            type="text"
            name="id_especialidade"
            value={especialista.id_especialidade}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EspecialistaForm;
