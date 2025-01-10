import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./AxiosConfig";
import Swal from "sweetalert2";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    active: 0,
    description: "",
  });

  const token = localStorage.getItem("auth");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/products", product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Produto Cadastrado com Sucesso!",
        text: "O produto foi cadastrado corretamente.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);

      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors.join(", ")
        : "Ocorreu um erro ao cadastrar o produto. Tente novamente.";

      Swal.fire({
        icon: "error",
        title: "Erro ao Cadastrar Produto",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="box-container">
        <button
          onClick={() => navigate("/dashboard")}
          className="btn-back"
        >
          ← Voltar
        </button>
        <h2 className="title">
          Cadastrar Produto
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="input-label"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="input-field"
              placeholder="Digite o nome do produto"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="input-label"
            >
              Preço
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="input-field"
              placeholder="Digite o preço do produto"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="input-label"
            >
              Quantidade
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="input-field"
              placeholder="Digite a quantidade"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="active"
              className="input-label"
            >
              Status
            </label>
            <select
              id="active"
              name="active"
              value={product.active}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value={1}>Ativo</option>
              <option value={0}>Inativo</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="input-label"
            >
              Descrição
            </label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              rows="4"
              className="input-field"
              placeholder="Digite uma descrição para o produto"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Cadastrar Produto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
