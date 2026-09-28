import axios from "axios";

const instace = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default instace;
