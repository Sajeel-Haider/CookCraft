import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.10.3:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default instance;
