import React, { useState } from "react";
import { postProduct } from "../services/api";
import TextInput from "./shared/inputs/TextInput";
import TextArea from "./shared/inputs/TextArea";
import CustomButton from "./shared/buttons/CustomButton";
import LabeledCheckbox from "./shared/inputs/LabeledCheckbox";
import { useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    active: false,
  });
  const [error, setError] = useState("");

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  const postProductData = async () => {
    try {
      await postProduct(product);
      alert("Produto salvo com sucesso!");
      navigate("/Home");
    } catch (err) {
      setError("Falha ao salvar o produto.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-md shadow-md">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <TextInput
          className="mb-4"
          label="Nome"
          value={product.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />

        <TextArea
          label="Descrição"
          value={product.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
          placeholder="Digite a descrição do produto"
        />
        <TextInput
          className="mb-4"
          label="Preço"
          type="number"
          value={product.price}
          onChange={(e) => handleChange("price", e.target.value)}
          required
        />
        <TextInput
          className="mb-4"
          label="Quantidade"
          type="number"
          value={product.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
          required
        />

        <LabeledCheckbox
          label="Ativo"
          checked={product.active}
          onChange={(e) => handleChange("active", e.target.checked)}
          className="mb-4"
        />

        <div className="mt-4">
          <CustomButton
            onClick={postProductData}
            variant="primary"
            label="Salvar"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
