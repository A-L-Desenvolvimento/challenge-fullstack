import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./AxiosConfig";

const ProductDetails = () => {
  const { id } = useParams(); // Obtém o ID do produto da URL
  const navigate = useNavigate(); // Função para redirecionar
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    active: 0,
    description: "",
  });

  // Requisição para buscar os detalhes do produto
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="box-container">
        <button
          onClick={() => navigate("/")}
          className="btn-back"
        >
          ← Voltar
        </button>
        <h2 className="title">
          Detalhes do Produto
        </h2>
        <div className="space-y-4">
          <div>
            <p className="input-label">Nome</p>
            <p className="input-info">{product.name}</p>
          </div>
          <div>
            <p className="input-label">Preço</p>
            <p className="input-info">
              R${product.price}
            </p>
          </div>
          <div>
            <p className="input-label">Quantidade</p>
            <p className="input-info">
              {product.quantity}
            </p>
          </div>
          <div>
            <p className="input-label">Status</p>
            <p className="input-info">
              {product.active === 1 ? "Ativo" : "Inativo"}
            </p>
          </div>
          <div>
            <p className="input-label">Descrição</p>
            <p className="input-info">
              {product.description || "Sem descrição"}
            </p>
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default ProductDetails;
