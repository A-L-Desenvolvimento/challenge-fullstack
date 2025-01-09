import React, { useEffect } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    await login(values.email, values.password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      {error && <div className="error">{error}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <LoginForm type="register" onSubmit={handleRegister} />
      )}
    </div>
  );
};

export default Login;
