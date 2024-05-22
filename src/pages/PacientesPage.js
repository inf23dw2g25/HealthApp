import React, { useEffect, useState } from "react";
import { getPacientes } from "../services/api";

function PacientesPage() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPacientes();
        setPacientes(response.data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Pacientes</h1>
      <ul>
        {pacientes.map((paciente) => (
          <li key={paciente.id}>
            {paciente.nome} : {paciente.contacto}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PacientesPage;
