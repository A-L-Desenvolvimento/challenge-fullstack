import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./AxiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    try {
      const response = await api.post("/login/", { email, password }); // Usando a instância de axios

      const { token } = response.data;

      if (token) {
        localStorage.setItem("auth", token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Erro ao autenticar.");
      } else {
        setError("Erro de conexão com o servidor.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <button
          onClick={() => navigate("/")}
          className="btn-back"
        >
          ← Voltar
        </button>
        <h2 className="title">
          Login
        </h2>
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="input-label"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input-field"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="input-label"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
