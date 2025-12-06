import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient";

export default function useLogin() {
  const navigate = useNavigate();

  // State
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle Input Change
  const handleChange = (field, value) => {
    if (error) setError("");
    setForm({ ...form, [field]: value });
  };

  // Handle Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axiosClient.post("/auth/signin", form);
      const accessToken = res.data?.accessToken;
      const refreshToken = res.data?.refreshToken;

      if (!accessToken) {
        throw new Error("Token tidak diterima.");
      }

      // Simpan token
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Login gagal, periksa email atau password Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    error,
    isLoading,
    showPassword,
    setShowPassword,
    handleChange,
    handleLogin,
  };
}