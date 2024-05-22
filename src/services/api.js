import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3030",
});

export const getConsultas = async () => {
  return await api.get("/consultas");
};
export const getPacientes = async () => {
  return await api.get("/pacientes");
};
export const getEspecialistas = async () => {
  return await api.get("/especialistas");
};

export default api;
