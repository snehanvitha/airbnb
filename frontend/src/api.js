import axios from "axios";

const API = axios.create({
  baseURL: "https://airbnb-1-dijp.onrender.com/api"
});

export default API;