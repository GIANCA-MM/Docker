import axios from "./axios.js";

export const registerRequest = (user) =>
  axios.post(`/register`, user, {
    headers: {
      "Content-Type": "application/json", // Asegura que se envíe en formato JSON
    },
  });

export const loginRequest = (user) =>
  axios.post(`/login`, user, {
    headers: {
      "Content-Type": "application/json", // Asegura que se envíe en formato JSON
    },
  });

export const verifyTokenRequest = () => axios.get("/verify");
