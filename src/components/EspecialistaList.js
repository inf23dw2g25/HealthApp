import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import AuthContext from "./AuthContext";
import "../style/consulta.css";

const EspecialistaList = () => {
  const { authenticated } = useContext(AuthContext);
  const [especialistas, setEspecialistas] = useState([]);
  const [filteredEspecialistas, setFilteredEspecialistas] = useState([]);
  const [filteredEspecialidades, setFilteredEspecialidades] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [searchNome, setSearchNome] = useState("");
  const [searchEspecialidade, setSearchEspecialidade] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const especialistasResult = await api.get("/especialistas");
        const especialistasData = especialistasResult.data;

        const especialidadesResult = await api.get("/especialidades");
        const especialidadesData = especialidadesResult.data;

        setEspecialistas(especialistasData);
        setFilteredEspecialistas(especialistasData);
        
        setEspecialidades(especialidadesData);
        setFilteredEspecialidades(especialidadesData);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterEspecialistas = () => {
      let filtered = [...especialistas];

      if (searchNome) {
        filtered = filtered.filter((especialista) =>
          especialista.nome
            .toLowerCase()
            .includes(searchNome.toLowerCase())
        );
      }

      if(searchEspecialidade){
        filtered = filtered.filter((especialista) =>
          especialista.id.includes(searchEspecialidade)
        );
      }
      setFilteredEspecialistas(filtered);
    };

    filterEspecialistas();
  }, [searchNome, searchEspecialidade, especialistas, especialidades]);

  const deleteEspecialista = async (id) => {
    try {
      await api.delete(`/especialistas/${id}`);
      setEspecialistas(especialistas.filter((especialista) => especialista.id !== id));
      setFilteredEspecialistas(filteredEspecialistas.filter((especialista) => especialista.id !== id));
    } catch (error) {
      console.error("Error deleting especialista:", error);
    }
  };

  return (
    <div className="consulta-list">
      <h1>Especialistas</h1>
      <div className="filters">
        <label>
          Nome do Especialista:
          <input
            type="text"
            value={searchNome}
            onChange={(e) => setSearchNome(e.target.value)}
          />
        </label>
        <label>
          Nome da Especialidade:
          <input
            type="text"
            value={searchEspecialidade}
            onChange={(e) => setSearchEspecialidade(e.target.value)}
          />
        </label>
        {authenticated ? (
          <Link to="/especialistas/new" className="new-consulta">
            Novo Especialista
          </Link>
        ) : (
          <p>Autenticação necessária</p>
        )}
      </div>

      <table>
        <thead>
          <tr>
            <th>Nome do especialista</th>
            <th>id da especialidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredEspecialistas.map((especialista) => (
            <tr key={especialista.id}>
              <td>{especialista.nome}</td>
              <td>{especialista.id_especialidade}</td>
              <td>
                {authenticated ? (
                  <>
                    <Link to={`/especialistas/edit/${especialista.id}`} className="edit-btn">
                      Editar
                    </Link>
                    <button onClick={() => deleteEspecialista(especialista.id)} className="delete-btn">
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

export default EspecialistaList;
