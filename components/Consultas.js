import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/consula.css";

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/consultas");
        setConsultas(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Consultas</h1>
      <table className="consultas-table">
        <thead>
          <tr>
            <th>Data e hora</th>
            <th>Paciente ID</th>
            <th>Especialista ID</th>
            <th>Observações</th>
          </tr>
        </thead>
        <tbody>
          {consultas.map((consulta) => (
            <tr key={consulta.id}>
              <td>{consulta.data_e_hora}</td>
              <td>{consulta.paciente_id}</td>
              <td>{consulta.especialista_id}</td>
              <td>{consulta.observacoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Consultas;
