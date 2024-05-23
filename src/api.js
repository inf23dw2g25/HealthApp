// api.js

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030", // Adjust the base URL to match your API endpoint
  headers: {
    "Content-Type": "application/json",
    // Optionally, you can set up other default headers here
  },
});

// Add an interceptor to include the Authorization header with the Bearer token for each request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // Assuming you store the Bearer token in local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
