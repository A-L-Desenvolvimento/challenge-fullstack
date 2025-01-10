import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("auth"); // Remove a autenticação
    navigate("/login"); // Redireciona para a página de login
  }, [navigate]);

  return (
    <div>
      <h2>Saindo...</h2>
    </div>
  );
};

export default Logout;
