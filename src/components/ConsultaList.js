import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import AuthContext from "./AuthContext";
import "../style/consulta.css";

const ConsultaList = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [consultas, setConsultas] = useState([]);
  const [pacientes, setPacientes] = useState({});
  const [especialistas, setEspecialistas] = useState({});
  const [filteredConsultas, setFilteredConsultas] = useState([]);

  const [searchDate, setSearchDate] = useState("");
  const [searchPaciente, setSearchPaciente] = useState("");
  const [searchEspecialista, setSearchEspecialista] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const consultasResult = await api.get("/consultas");
        const consultas = consultasResult.data;

        const pacientesResult = await api.get("/pacientes");
        const especialistasResult = await api.get("/especialistas");

        const pacientesMap = {};
        const especialistasMap = {};

        pacientesResult.data.forEach((paciente) => {
          pacientesMap[paciente.id] = paciente.nome;
        });

        especialistasResult.data.forEach((especialista) => {
          especialistasMap[especialista.id] = especialista.nome;
        });

        setConsultas(consultas);
        setFilteredConsultas(consultas);
        setPacientes(pacientesMap);
        setEspecialistas(especialistasMap);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterConsultas = () => {
      let filtered = consultas;

      if (searchDate) {
        filtered = filtered.filter((consulta) =>
          consulta.data_e_hora.startsWith(searchDate)
        );
      }

      if (searchPaciente) {
        filtered = filtered.filter((consulta) =>
          pacientes[consulta.paciente_id]
            .toLowerCase()
            .includes(searchPaciente.toLowerCase())
        );
      }

      if (searchEspecialista) {
        filtered = filtered.filter((consulta) =>
          especialistas[consulta.especialista_id]
            .toLowerCase()
            .includes(searchEspecialista.toLowerCase())
        );
      }

      setFilteredConsultas(filtered);
    };

    filterConsultas();
  }, [
    searchDate,
    searchPaciente,
    searchEspecialista,
    consultas,
    pacientes,
    especialistas,
  ]);

  const deleteConsulta = async (id) => {
    try {
      await api.delete(`/consultas/${id}`);
      setConsultas(consultas.filter((consulta) => consulta.id !== id));
    } catch (error) {
      console.error("Error deleting consulta:", error);
    }
  };

  return (
    <div className="consulta-list">
      <h1>Consultas</h1>
      <div className="filters">
        <label>
          Data:
          <input
            type="date"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </label>
        <label>
          Nome do Paciente:
          <input
            type="text"
            value={searchPaciente}
            onChange={(e) => setSearchPaciente(e.target.value)}
          />
        </label>
        <label>
          Nome do Especialista:
          <input
            type="text"
            value={searchEspecialista}
            onChange={(e) => setSearchEspecialista(e.target.value)}
          />
        </label>
        {authenticated ? (
          <>
            <Link to="/consultas/new" className="new-consulta">
              Nova Consulta
            </Link>
          </>
        ) : (
          <>
            <p>Autenticação necessária</p>
          </>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Data e Hora</th>
            <th>Nome do Paciente</th>
            <th>Nome do Especialista</th>
            <th>Observações</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredConsultas.map((consulta) => (
            <tr key={consulta.id}>
              <td>
                {consulta.data_e_hora
                  .replace("T", " ")
                  .split(":")
                  .slice(0, 2)
                  .join(":")}
              </td>
              <td>{pacientes[consulta.paciente_id]}</td>
              <td>{especialistas[consulta.especialista_id]}</td>
              <td>{consulta.observacoes}</td>
              <td>
                {authenticated ? (
                  <>
                    <Link
                      to={`/consultas/edit/${consulta.id}`}
                      className="edit-btn"
                    >
                      Editar
                    </Link>
                    <Link
                      onClick={() => deleteConsulta(consulta.id)}
                      className="delete-btn"
                    >
                      Apagar
                    </Link>
                  </>
                ) : (
                  <>
                    <p>Autenticação necessária</p>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultaList;
