import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import RegisterForm from "./RegisterForm";
import { useNavigate } from "react-router-dom";
import Message from "../shared/Alert/Message";

const Register = () => {
  const { register, error, loading } = useAuth();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(null);

  const handleRegister = async (values) => {
    try {
      const success = await register(
        values.name,
        values.email,
        values.password,
        values.password_confirmation
      );
      console.log(success);
      if (success) {
        setSuccessMessage("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      console.error("Falha no cadastro:", err);
    }
  };

  return (
    <div>
      {error && <Message type="error" text={error} />}
      {successMessage && <Message type="success" text={successMessage} />}
      {loading ? (
        <Message type="warning" text="Carregando..." />
      ) : (
        <RegisterForm onSubmit={handleRegister} />
      )}
    </div>
  );
};

export default Register;
