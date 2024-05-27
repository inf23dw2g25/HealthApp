import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import AuthContext from "./AuthContext";
import "../style/consulta.css";

const PacienteList = () => {
  const { authenticated } = useContext(AuthContext);
  const [pacientes, setPacientes] = useState([]);
  const [filteredPacientes, setFilteredPacientes] = useState([]);

  const [searchNumero, setSearchNumero] = useState("");
  const [searchNome, setSearchNome] = useState("");
  const [searchContacto, setSearchContacto] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pacientesResult = await api.get("/pacientes");
        const pacientesData = pacientesResult.data;

        setPacientes(pacientesData);
        setFilteredPacientes(pacientesData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterPacientes = () => {
      let filtered = [...pacientes];

      if (searchNumero) {
        filtered = filtered.filter((paciente) =>
          paciente.numero_de_utente.toString().startsWith(searchNumero)
        );
      }

      if (searchNome) {
        filtered = filtered.filter((paciente) =>
          paciente.nome
            .toLowerCase()
            .includes(searchNome.toLowerCase())
        );
      }

      if (searchContacto) {
        filtered = filtered.filter((paciente) =>
          paciente.contacto
            .toLowerCase()
            .includes(searchContacto.toLowerCase())
        );
      }

      setFilteredPacientes(filtered);
    };

    filterPacientes();
  }, [searchNumero, searchNome, searchContacto, pacientes]);

  const deletePaciente = async (id) => {
    try {
      await api.delete(`/pacientes/${id}`);
      setPacientes(pacientes.filter((paciente) => paciente.id !== id));
      setFilteredPacientes(filteredPacientes.filter((paciente) => paciente.id !== id));
    } catch (error) {
      console.error("Error deleting paciente:", error);
    }
  };

  return (
    <div className="consulta-list">
      <h1>Pacientes</h1>
      <div className="filters">
        <label>
          Numero de Utente:
          <input
            type="text"
            value={searchNumero}
            onChange={(e) => setSearchNumero(e.target.value)}
          />
        </label>
        <label>
          Nome do Paciente:
          <input
            type="text"
            value={searchNome}
            onChange={(e) => setSearchNome(e.target.value)}
          />
        </label>
        <label>
          Contacto do Paciente:
          <input
            type="text"
            value={searchContacto}
            onChange={(e) => setSearchContacto(e.target.value)}
          />
        </label>
        {authenticated ? (
          <Link to="/pacientes/new" className="new-consulta">
            Novo Paciente
          </Link>
        ) : (
          <p>Autenticação necessária</p>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Numero de utente</th>
            <th>Nome do paciente</th>
            <th>Contacto do paciente</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredPacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.numero_de_utente}</td>
              <td>{paciente.nome}</td>
              <td>{paciente.contacto}</td>
              <td>
                {authenticated ? (
                  <>
                    <Link to={`/pacientes/edit/${paciente.id}`} className="edit-btn">
                      Editar
                    </Link>
                    <button onClick={() => deletePaciente(paciente.id)} className="delete-btn">
                      Apagar
                    </button>
                  </>
                ) : (
                  <p>Autenticação necessária</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PacienteList;
