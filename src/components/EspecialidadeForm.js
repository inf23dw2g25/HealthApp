import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import AuthContext from "./AuthContext";
import "../style/ConsultaForm.css";


const EspecialidadeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authToken } = useContext(AuthContext); // Assuming you have a context to provide the auth token

  const [especialidade, setEspecialidade] = useState({
    nome: "",
  });

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const result = await api.get(`/especialidades/${id}`);
          const formattedData = {
            ...result.data,
          };
          setEspecialidade(formattedData);
        } catch (error) {
          console.error("Error fetching especialidade:", error);
        }
      };
      fetchData();
    }
  }, [id, authToken]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEspecialidade((prevEspecialidade) => ({
      ...prevEspecialidade,
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
        await api.put(`/especialidades/${id}`, especialidade, { headers });
        toast.success("Especialidade editada com sucesso!");
      } else {
        await api.post("/especialidades", especialidade, { headers });
        toast.success("Especialidade criada com sucesso!");
      }
      navigate("/especialidades");
    } catch (error) {
      console.error("Error saving especialidade:", error);
      const errorMessage = error.response
        ? `Erro ao salvar especialidade: ${error.response.status} - ${error.response.data.message}`
        : "Erro ao salvar especialidade.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? "Editar" : "Nova"} Especialidade</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome da Especialidade</label>
          <input
            type="text"
            name="nome"
            value={especialidade.nome}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EspecialidadeForm;
