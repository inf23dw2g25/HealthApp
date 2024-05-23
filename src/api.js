// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3030",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // A resposta foi feita e o servidor respondeu com um código de status
      // que não está no intervalo de 2xx
      console.error("Error response:", error.response.data);
    } else if (error.request) {
      // A requisição foi feita mas não houve resposta
      console.error("Error request:", error.request);
    } else {
      // Algo aconteceu na configuração da requisição que acionou um erro
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
