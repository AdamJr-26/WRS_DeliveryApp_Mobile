import Axios from "axios";
export const axios = Axios.create({
  baseURL: "http://192.168.68.106:4000/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
