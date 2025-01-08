import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./AxiosConfig";
import Swal from "sweetalert2"; // Importando o SweetAlert2

const Dashboard = () => {
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

  // Função para deletar um produto
  const deleteProduct = async (id) => {
    // Exibe a confirmação usando SweetAlert2
    const result = await Swal.fire({
      title: "Você tem certeza?",
      text: "Isso não pode ser desfeito!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        // Faz a requisição DELETE com o Bearer token
        await api.delete(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`, // Envia o token de autenticação
          },
        });

        // Após a exclusão, atualiza a lista de produtos
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );

        Swal.fire("Deletado!", "O produto foi excluído com sucesso.", "success");
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
        Swal.fire("Erro!", "Ocorreu um erro ao excluir o produto.", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Bem-vindo ao Dashboard</h2>
          <div>
            <button
              onClick={() => navigate("/create-product")}
              className="btn-primary"
            >
              Cadastrar Produto
            </button>
            <Link to="/logout">
              <button className="btn-custom ml-4 px-4 py-2 bg-red-600">
                Sair
              </button>
            </Link>
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-700 mb-4">Produtos</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="td-table">ID</th>
                <th className="td-table text-left">Nome</th>
                <th className="td-table text-left">Preço</th>
                <th className="td-table text-left">Quantidade</th>
                <th className="td-table text-left">Status</th>
                <th className="td-table text-left">Ações</th>
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
                        className={`px-2 py-1 text-xs font-bold rounded ${
                          product.active === 1
                            ? "status-active"
                            : "status-inactive"
                        }`}
                      >
                        {product.active === 1 ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="td-table">
                      <Link to={`/product/${product.id}`}>
                        <button className="btn-custom bg-green-600">
                          Editar
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="ml-2 btn-custom bg-red-600"
                      >
                        Deletar
                      </button>
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

export default Dashboard;
