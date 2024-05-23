import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import "../style/ConsultaForm.css";

const ConsultaForm = () => {
  const [consulta, setConsulta] = useState({
    data_e_hora: "",
    paciente_id: "",
    especialista_id: "",
    observacoes: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const result = await api.get(`/consultas/${id}`);
          setConsulta(result.data);
        } catch (error) {
          console.error("Error fetching consulta:", error);
        }
      };
      fetchData();
    }
  }, [id]);

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
        await api.put(`/consultas/${id}`, consulta);
        toast.success("Consulta editada com sucesso!");
      } else {
        await api.post("/consultas", consulta);
        toast.success("Consulta criada com sucesso!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving consulta:", error);
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
