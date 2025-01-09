import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductGrid from "./products/ProductGrid";
import ProductTable from "./products/ProductTable";
import CustomButton from "./shared/buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import Loading from "./shared/Loading";
import Message from "./shared/Alert/Message";

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Falha ao carregar os Produtos, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Produtos
        </h2>

        <CustomButton
          onClick={() => navigate("/ProductCreate")}
          label="Adicionar Produto"
        />
      </div>

      <Message type="error" text={error} />

      <div className="mt-6">
        <Loading isLoading={loading}>
          <ProductTable products={products} />
        </Loading>
      </div>
    </>
  );
};

export default ProductList;
