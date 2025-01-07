import { Container, Row, Col, Card } from "react-bootstrap";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";

export default function AuthLayout() {
  const { token } = useStateContext();
  const location = useLocation();

  if (token) {
    return <Navigate to="/" />;
  }

  const titles = {
    "/login": "Entrar",
    "/register": "Cadastrar",
  };

  return (
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={4}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">{titles[location.pathname]}</h2>
              <Outlet />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
