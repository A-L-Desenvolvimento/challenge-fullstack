import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./AxiosConfig";
import Swal from "sweetalert2"; // Importando o SweetAlert2

const Public = () => {
  const [products, setProducts] = useState([]); // Estado para armazenar os produtos
  const navigate = useNavigate();

  // Faz a requisição à API ao montar o componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProducts(); // Chama a função para buscar os produtos
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="title">Bem-vindo ao Sistema</h2>
          <div>
            <Link to="/login">
              <button className="btn-primary">Login</button>
            </Link>
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-700 mb-4">Produtos</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="td-table">ID</th>
                <th className="td-table">Nome</th>
                <th className="td-table">Preço</th>
                <th className="td-table">Quantidade</th>
                <th className="td-table">Status</th>
                <th className="td-table">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="td-table">{product.id}</td>
                    <td className="td-table">{product.name}</td>
                    <td className="td-table">R$ {product.price}</td>
                    <td className="td-table">{product.quantity}</td>
                    <td className="td-table">
                      <span
                        className={
                          product.active === 1 ? "status-active" : "status-inactive"
                        }
                      >
                        {product.active === 1 ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="td-table">
                      <Link to={`/details/${product.id}`}>
                        <button className="bg-gray-500 btn-custom">
                          Visualizar
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="td-table text-center text-gray-500"
                  >
                    Carregando produtos...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Public;
