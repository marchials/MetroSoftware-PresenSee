import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login gagal");
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Anda harus login terlebih dahulu sebagai admin.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ username: newUsername, password: newPassword }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registrasi gagal");
      setSuccess("Admin berhasil dibuat, silakan login.");
      setNewUsername("");
      setNewPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <div className="text-center mb-5">
              <h2 className="display-4 text-success fw-bold">PresenSee!</h2>
              <div className="border-bottom border-success border-3 w-25 mx-auto"></div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <AnimatePresence mode="wait">
              {!showRegisterForm ? (
                <motion.div
                  key="login"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card shadow-sm border-0 p-4"
                >
                  <h3 className="text-success mb-4">Login</h3>
                  <form onSubmit={handleLogin}>
                    <input type="text" className="form-control mb-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input type="password" className="form-control mb-4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button type="submit" className="btn btn-success w-100">Login</button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="register"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card shadow-sm border-0 p-4"
                >
                  <h3 className="text-success mb-4">New Admin</h3>
                  <form onSubmit={handleRegister}>
                    <input type="text" className="form-control mb-3" placeholder="Username" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required />
                    <input type="password" className="form-control mb-4" placeholder="Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    <button type="submit" className="btn btn-success w-100">Buat Admin</button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <button className="btn btn-outline-success w-100 mt-3" onClick={() => setShowRegisterForm(!showRegisterForm)}>
              {showRegisterForm ? "← Kembali ke Login" : "+ Admin Baru"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
