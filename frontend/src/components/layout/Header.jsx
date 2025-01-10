import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "../shared/buttons/CustomButton";
import ShopLogo from "./ShopLogo";
import { useAuth } from "../../hooks/AuthProvider";

const Header = () => {
  const { logout } = useAuth();

  const handleSair = () => {
    try {
      logout();
    } catch (error) {
      console.error("Erro ao tentar sair:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg py-4 px-4 fixed w-full z-30">
      <nav className="px-4 mx-auto container sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className=" flex gap-4">
            <Link to="/Home" className="flex items-center">
              <ShopLogo size={40} />
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <Link to="/Home">Home</Link>
              <Link to="#">Sobre</Link>
              <Link to="#">Contato</Link>
            </div>
          </div>
          <CustomButton
            onClick={() => handleSair()}
            variant="primary"
            label="Sair"
          />
        </div>
      </nav>
    </header>
  );
};

export default Header;
