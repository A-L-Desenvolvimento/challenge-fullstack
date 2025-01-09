import React, { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import TextInput from "../shared/inputs/TextInput";
import CustomButton from "../shared/buttons/CustomButton";
import ShopLogo from "../layout/ShopLogo";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const { login, error, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    login(email, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-2">
          <ShopLogo size={40} />
        </div>
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          GhostShop
        </h2>

        {error && (
          <div className="text-red-500 text-center mb-4 p-2 border border-red-500 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-600">Carregando...</div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <TextInput
              className="mb-4"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextInput
              className="mb-4"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex justify-between items-center mt-4">
              <div className="inline-block text-sm text-gray-600">
                Novo por aqui?{" "}
                <Link
                  to="/register/"
                  className="text-blue-500  hover:underline"
                >
                  Criar Conta
                </Link>
              </div>
              <CustomButton label="Entrar" onClick={handleLogin} />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
