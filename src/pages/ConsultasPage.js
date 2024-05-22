import React, { useEffect, useState } from "react";
import { getConsultas } from "../services/api";

function ConsultasPage() {
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getConsultas();
        setConsultas(response.data);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Consultas</h1>
      <ul>
        {consultas.map((consulta) => (
          <li key={consulta.id}>
            {consulta.data_e_hora} - {consulta.especialista.nome} -{" "}
            {consulta.paciente.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConsultasPage;
