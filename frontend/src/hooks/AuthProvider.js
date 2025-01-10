import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginService, registerService } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    setIsAuthenticated(true);
  }
  setLoading(false);
}, []);


  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginService(email, password);
      setIsAuthenticated(true);
      localStorage.setItem("token", response.data?.token);
      navigate("/Home");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const register = async (name, email, password, password_confirmation) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await registerService(name, email, password, password_confirmation);
      if (response?.status === 201) {
        return true;
      }

    } catch (err) {
      console.error("Error in registration:", err);
      setError(err.message || "Falhou");
      return false;
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout, error, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};




