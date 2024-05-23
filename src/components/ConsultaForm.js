import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import "../style/ConsultaForm.css";

// Função utilitária para formatar data e hora
const formatDateTimeForInput = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const ConsultaForm = () => {
  const [consulta, setConsulta] = useState({
    data_e_hora: "",
    paciente_id: "",
    especialista_id: "",
    observacoes: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken"); // Certifique-se de que o token está armazenado corretamente

  useEffect(() => {
    if (!token) {
      toast.error("Token não encontrado. Por favor, faça login novamente.");
      navigate("https://accounts.google.com/o/oauth2/auth");
      return;
    }

    if (id) {
      const fetchData = async () => {
        try {
          const result = await api.get(`/consultas/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          });
          const formattedData = {
            ...result.data,
            data_e_hora: formatDateTimeForInput(result.data.data_e_hora),
          };
          setConsulta(formattedData);
        } catch (error) {
          console.error("Error fetching consulta:", error);
          toast.error("Erro ao buscar consulta.");
        }
      };
      fetchData();
    }
  }, [id, token, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setConsulta((prevConsulta) => ({
      ...prevConsulta,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (id) {
        await api.put(`/consultas/${id}`, consulta, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        toast.success("Consulta editada com sucesso!");
      } else {
        await api.post("/consultas", consulta, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });
        toast.success("Consulta criada com sucesso!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving consulta:", error);
      const errorMessage = error.response
        ? `Erro ao salvar consulta: ${error.response.status} - ${error.response.data.message}`
        : "Erro ao salvar consulta.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="form-container">
      <h1>{id ? "Editar" : "Nova"} Consulta</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Data e Hora</label>
          <input
            type="datetime-local"
            name="data_e_hora"
            value={consulta.data_e_hora}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>ID do Paciente</label>
          <input
            type="text"
            name="paciente_id"
            value={consulta.paciente_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>ID do Especialista</label>
          <input
            type="text"
            name="especialista_id"
            value={consulta.especialista_id}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Observações</label>
          <textarea
            name="observacoes"
            value={consulta.observacoes}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Salvar</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ConsultaForm;
