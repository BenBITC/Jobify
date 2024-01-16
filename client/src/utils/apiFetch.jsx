import axios from "axios";

const apiFetch = axios.create({
  baseURL: "/api/v1",
});

export default apiFetch;
