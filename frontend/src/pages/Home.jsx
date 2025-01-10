import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductTable from "../components/products/ProductTable";
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../hooks/AuthProvider";
import PageComponent from "../components/layout/PageComponent";
import ProductList from "../components/ProductList";
const Home = () => {
  const [products, setProducts] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <PageComponent>
      <ProductList products={products}></ProductList>
    </PageComponent>
  );
};

export default Home;
