import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import AuthContext from "./AuthContext";
import "../style/consulta.css";

const EspecialidadeList = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [especialidades, setEspecialidades] = useState([]);
  const [filterEspecialidades, setFilteredEspecialidades] = useState([]);
  const [searchNome, setSearchNome] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const especialidadesResult = await api.get("/especialidades");
        const especialidades = especialidadesResult.data;
        


        setEspecialidades(especialidades);
        setFilteredEspecialidades(especialidades);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filterEspecialidades = () => {
      let filtered = especialidades;
      
      if (searchNome) {
        filtered = filtered.filter((especialidade) =>
          especialidade.nome.toLowerCase().includes(searchNome.toLowerCase())
        );
      }

      setFilteredEspecialidades(filtered);
    };

    filterEspecialidades();
  }, [
    searchNome,
    especialidades,
  ]);

  const deleteEspecialidade = async (id) => {
    try {
      await api.delete(`/especialidades/${id}`);
      setEspecialidades(especialidades.filter((especialidade) => especialidade.id !== id));
    } catch (error) {
      console.error("Error deleting especialidade:", error);
    }
  };

  return (
    <div className="consulta-list">
      <h1>Especialidades</h1>
      <div className="filters">
        <label>
          Nome da Especialidade:
          <input
            type="text"
            value={searchNome}
            onChange={(e) => setSearchNome(e.target.value)}
          />
        </label>
        {authenticated ? (
          <>
            <Link to="/especialidades/new" className="new-consulta">
              Nova Especialidade
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
            <th>ID Especialidade</th>
            <th>Nome da Especialidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filterEspecialidades.map((especialidade) => (
            <tr key={especialidade.id}>
              <td>{especialidade.id}</td>
              <td>{especialidade.nome}</td>
              <td>
                {authenticated ? (
                  <>
                    <Link
                      to={`/especialidades/edit/${especialidade.id}`}
                      className="edit-btn"
                    >
                      Editar
                    </Link>
                    <Link
                      onClick={() => deleteEspecialidade(especialidade.id)}
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

export default EspecialidadeList;
