import React, { useEffect, useState } from "react";
import { getEspecialistas } from "../services/api";

function EspecialistaPage() {
  const [especialistas, setEspecialistas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEspecialistas();
        setEspecialistas(response.data);
      } catch (error) {
        console.error("Erro ao buscar especialistas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Especialistas</h1>
      <ul>
        {especialistas.map((especialista) => (
          <li key={especialista.id}>
            {especialista.nome} - {especialista.id_especialidade}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EspecialistaPage;
