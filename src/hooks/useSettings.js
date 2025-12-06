import { useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export default function useSettings() {
  const [loading, setLoading] = useState(true);
  
  // Data User
  const [fullName, setFullName] = useState("-");
  const [email, setEmail] = useState("-");
  
  // Form State
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await axiosClient.get("/auth/me");
      setFullName(res.data.fullName || "-");
      setEmail(res.data.email || "-");
      setResetPasswordEmail(res.data.email || "");
    } catch (err) {
      console.error("Gagal memuat profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      await axiosClient.post("/auth/reset-password", {
        email: resetPasswordEmail,
      });
      alert("Password reset link telah dikirim ke email Anda.");
    } catch (err) {
      alert("Gagal mengirim reset password.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return {
    loading,
    fullName,
    email,
    resetPasswordEmail,
    setResetPasswordEmail,
    handleResetPassword,
    handleLogout,
  };
}