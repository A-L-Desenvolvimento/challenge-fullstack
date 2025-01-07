import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";
import Top from "../components/Top";

export default function FormProduct() {
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
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);

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

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (product.id) {
      axiosClient
        .put(`/products/${product.id}`, product)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/products", product)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
              <p className="h5 text-primary mt-3">Carregando...</p>
            </div>
          ) : (
            <>
              <Top
                title={product.id ? "Editar Produto" : "Novo Produto"}
                link="/"
                text="Voltar"
                variant="secondary"
                icon={<FaArrowLeft className="me-2" />}
              />

              <Form onSubmit={onSubmit} className="mt-5 mb-5">
                <Form.Group className="mb-3" controlId="formBasicActive">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    className={errors && errors.active ? "is-invalid" : ""}
                    value={product.active}
                    onChange={(ev) =>
                      setProduct({ ...product, active: ev.target.value })
                    }
                  >
                    <option value="1">Ativo</option>
                    <option value="0">Inativo</option>
                  </Form.Select>
                  {errors && errors.active && (
                    <Form.Control.Feedback type="invalid">
                      {errors.active[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    className={errors && errors.name ? "is-invalid" : ""}
                    onChange={(ev) =>
                      setProduct({ ...product, name: ev.target.value })
                    }
                    value={product.name}
                    type="text"
                    placeholder="Digite o nome do produto"
                  />
                  {errors && errors.name && (
                    <Form.Control.Feedback type="invalid">
                      {errors.name[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    className={errors && errors.description ? "is-invalid" : ""}
                    onChange={(ev) =>
                      setProduct({ ...product, description: ev.target.value })
                    }
                    value={product.description}
                    as="textarea"
                    placeholder="Digite a descrição do produto"
                    style={{ height: "100px" }}
                  />
                  {errors && errors.description && (
                    <Form.Control.Feedback type="invalid">
                      {errors.description[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                  <Form.Label>Preço</Form.Label>
                  <Form.Control
                    className={errors && errors.price ? "is-invalid" : ""}
                    onChange={(ev) =>
                      setProduct({ ...product, price: ev.target.value })
                    }
                    value={product.price}
                    type="text"
                    placeholder="Digite o preço do produto"
                  />
                  {errors && errors.price && (
                    <Form.Control.Feedback type="invalid">
                      {errors.price[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicQuantity">
                  <Form.Label>Quantidade</Form.Label>
                  <Form.Control
                    className={errors && errors.quantity ? "is-invalid" : ""}
                    onChange={(ev) =>
                      setProduct({ ...product, quantity: ev.target.value })
                    }
                    value={product.quantity}
                    type="text"
                    placeholder="Digite a quantidade do produto"
                  />
                  {errors && errors.quantity && (
                    <Form.Control.Feedback type="invalid">
                      {errors.quantity[0]}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  {product.id ? "Atualizar" : "Adicionar"}
                </Button>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
