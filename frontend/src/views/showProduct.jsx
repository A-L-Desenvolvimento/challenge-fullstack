import { Card, Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axiosClient from "../axiosClient";
import Top from "../components/Top";

export default function ShowProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    id: null,
    active: 1,
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/products/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setProduct(data.data || data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <Container className="mt-5">
      <Top
        title="Detalhes do Produto"
        link="/"
        text="Voltar"
        variant="secondary"
        icon={<FaArrowLeft className="me-2" />}
      />
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="h5 text-primary mt-3">Carregando...</p>
        </div>
      ) : (
        <Card className="mt-5 mb-5 shadow">
          <Card.Body>
            <div className="mb-4">
              <Card.Title className="text-muted mb-2">Status:</Card.Title>
              <Card.Text>
                <span
                  className={`badge bg-${
                    product.active ? "success" : "danger"
                  }`}
                >
                  {product.active ? "Ativo" : "Inativo"}
                </span>
              </Card.Text>
            </div>

            <div className="mb-4">
              <Card.Title className="text-muted mb-2">
                Nome do Produto:
              </Card.Title>
              <Card.Text className="h5">{product.name}</Card.Text>
            </div>

            <div className="mb-4">
              <Card.Title className="text-muted mb-2">Descrição:</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </div>

            <div className="mb-4">
              <Card.Title className="text-muted mb-2">Preço:</Card.Title>
              <Card.Text className="h5">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </Card.Text>
            </div>

            <div className="mb-4">
              <Card.Title className="text-muted mb-2">Quantidade:</Card.Title>
              <Card.Text className="h5">{product.quantity} unidades</Card.Text>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
