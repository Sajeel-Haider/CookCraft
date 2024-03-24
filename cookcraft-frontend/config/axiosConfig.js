import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.10.3:8080", // Change to your HTTPS server URL
  timeout: 5000, // Adjust timeout as needed
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Add other Axios configuration options as needed
});

// Add an interceptor to handle HTTPS requests and CORS restrictions
instance.interceptors.response.use(
  (response) => {
    // Handle success response
    return response;
  },
  (error) => {
    // Handle error response
    console.error("Axios error:", error);
    return Promise.reject(error);
  }
);

export default instance;
