import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../services/api";
import CustomButton from "./shared/buttons/CustomButton";
import Header from "./layout/Header";
import TextInput from "./shared/inputs/TextInput";
import TextArea from "./shared/inputs/TextArea";
import LabeledCheckbox from "./shared/inputs/LabeledCheckbox";
import Message from "./shared/Alert/Message";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const MESSAGES = {
    loading: "Carregando...",
    fetchError: "Falha ao buscar detalhes do produto.",
    updateSuccess: "Produto atualizado com sucesso!",
    updateError: "Erro ao atualizar produto. Tente novamente.",
    validationError: "Por favor, preencha todos os campos obrigatórios.",
  };

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch {
      setError(MESSAGES.fetchError);
    } finally {
      setLoading(false);
    }
  }, [id, MESSAGES.fetchError]);

  const validateProduct = () => {
    if (!product?.name || !product?.description || !product?.price) {
      setError(MESSAGES.validationError);
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateProduct()) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateProduct(id, product);
      setSuccess(MESSAGES.updateSuccess);
      setIsEditing(false);
    } catch {
      setError(MESSAGES.updateError);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setProduct((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div>
      <Header title="GhostShop" subtitle="Explore nossa coleção de produtos!" />

      <div className="container mx-auto p-4">
        {loading && <Message type="loading" text={MESSAGES.loading} />}
        {error && <Message type="error" text={error} />}
        {success && <Message type="success" text={success} />}

        {product && (
          <div className="bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {isEditing ? "Editar Produto" : product.name}
            </h2>

            {isEditing ? (
              <div className="space-y-4">
                <TextInput
                  label="Nome"
                  value={product.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  placeholder="Digite o nome do produto"
                />
                <TextArea
                  label="Descrição"
                  value={product.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                  placeholder="Digite a descrição do produto"
                />
                <TextInput
                  label="Preço (R$)"
                  value={product.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  required
                  type="number"
                  placeholder="Digite o preço do produto"
                />
                <LabeledCheckbox
                  label="Ativo"
                  checked={product.active}
                  onChange={(e) => handleChange("active", e.target.checked)}
                />

                <div className="flex justify-start space-x-4">
                  <CustomButton
                    onClick={handleSave}
                    label="Salvar"
                    disabled={loading}
                  />
                  <CustomButton
                    onClick={() => setIsEditing(false)}
                    label="Cancelar"
                    disabled={loading}
                    variant="danger"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-700">
                  <span className="font-semibold">Descrição:</span>{" "}
                  {product.description}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Preço:</span> R${" "}
                  {product.price}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Quantidade:</span>{" "}
                  {product.quantity || "N/A"}
                </p>
                <LabeledCheckbox
                  label="Ativo"
                  checked={product.active}
                  disabled
                />

                <CustomButton
                  onClick={() => setIsEditing(true)}
                  label="Editar"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
