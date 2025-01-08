import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "./AxiosConfig";
import Swal from "sweetalert2";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    active: 0,
    description: "",
  });

  const token = localStorage.getItem("auth");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
        Swal.fire({
          icon: "error",
          title: "Erro ao Buscar Produto",
          text: "Não foi possível carregar os dados do produto.",
        });
      }
    };

    fetchProduct();
  }, [id, token]);

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
      await api.put(`/products/${id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Produto Atualizado com Sucesso!",
        text: "As alterações foram salvas.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      const errorMessage = error.response?.data?.errors
        ? error.response.data.errors.join(", ")
        : "Erro ao salvar alterações. Tente novamente.";
      Swal.fire({
        icon: "error",
        title: "Erro ao Atualizar Produto",
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
          Editar Produto
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
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full btn-primary"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
