import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "../style/relatorioPaciente.css";

const RelatorioPaciente = () => {
  const { numero_de_utente } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [historicos, setHistoricos] = useState([]);
  const [especialistas, setEspecialistas] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const patientResult = await api.get(
          `/pacientes?numero_de_utente=${numero_de_utente}`
        );
        const patient = patientResult.data[0];

        if (patient) {
          setPatient(patient);

          const [consultasResult, historicosResult] = await Promise.all([
            api.get(`/pacientes/${patient.id}/consultas`),
            api.get(`/pacientes/${patient.id}/historicos`),
          ]);

          setConsultas(consultasResult.data);
          setHistoricos(historicosResult.data);

          // Buscar informações do especialista para cada consulta
          const especialistasIds = consultasResult.data.map(
            (consulta) => consulta.especialista_id
          );
          const especialistasResult = await api.get(
            `/especialistas?ids=${especialistasIds.join(",")}`
          );
          setEspecialistas(especialistasResult.data);

          // Buscar informações da especialidade para cada especialista
          const especialidadesIds = especialistasResult.data.map(
            (especialista) => especialista.id_especialidade
          );
          const especialidadesResult = await api.get(
            `/especialidades?ids=${especialidadesIds.join(",")}`
          );
          setEspecialidades(especialidadesResult.data);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatientData();
  }, [numero_de_utente]);

  const getEspecialistaNome = (especialistaId) => {
    const especialista = especialistas.find(
      (especialista) => especialista.id === especialistaId
    );
    return especialista ? especialista.nome : "Especialista não encontrado";
  };

  const getEspecialidadeNome = (especialistaId) => {
    const especialista = especialistas.find(
      (especialista) => especialista.id === especialistaId
    );
    const especialidade = especialidades.find(
      (especialidade) => especialidade.id === especialista.id_especialidade
    );
    return especialidade ? especialidade.nome : "Especialidade não encontrada";
  };

  const renderConsultas = () => {
    return (
      <div className="consultas-section">
        <h3>Consultas</h3>
        <table>
          <thead>
            <tr>
              <th>Data e Hora</th>
              <th>Especialidade</th>
              <th>Especialista</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            {consultas.map((consulta) => (
              <tr key={consulta.id}>
                <td>{consulta.data_e_hora.replace("T", " ").slice(0, 16)}</td>
                <td>{getEspecialidadeNome(consulta.especialista_id)}</td>
                <td>{getEspecialistaNome(consulta.especialista_id)}</td>
                <td>{consulta.observacoes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderHistoricos = () => {
    return (
      <div className="historicos-section">
        <h2>Histórico</h2>
        <h3>Observações</h3>
        <ul>
          {historicos.map((historico) => (
            <li key={historico.id}>{historico.historico}</li>
          ))}
        </ul>
        <h4>Alergias</h4>
        <ul>
          {historicos.map((historico) => (
            <li key={historico.id}>{historico.alergias}</li>
          ))}
        </ul>
        <h4>Medicação</h4>
        <ul>
          {historicos.map((historico) => (
            <li key={historico.id}>{historico.medicacao}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="patient-report">
      <h1>Relatório do Paciente</h1>
      <button onClick={() => navigate("/")}>Voltar ao Dashboard</button>

      {patient && (
        <div className="patient-details">
          <h2>{patient.nome}</h2>
          <p>Contacto: {patient.contacto}</p>
          <p>NºUtente: {patient.numero_de_utente}</p>
        </div>
      )}

      {consultas.length > 0 && renderConsultas()}

      {historicos.length > 0 && renderHistoricos()}
    </div>
  );
};

export default RelatorioPaciente;
