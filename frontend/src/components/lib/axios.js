import axios from "axios";
BASE_URL = import.meta.env.MODE === "devlopment" ?  "http://localhost:5001/api" : "/api";
const api = axios.create({
  baseURL: BASE_URL,
  
});
export default api;