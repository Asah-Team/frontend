import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Inject token automatically
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle invalid/expired token
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Cek apakah errornya 401
    if (error.response?.status === 401) {
      
      if (!originalRequest.url.includes("/auth/signin")) {
        console.warn("Token invalid atau expired.");

        // Hapus token
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // redirect ke login
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;