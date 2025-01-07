import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";

export default function DefaultLayout() {
  const { user, token, setUser, setToken } = useStateContext();

  useEffect(() => {
    if (!token) {
      return;
    }
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, [token]);

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser(null);
      setToken(null);
    });
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Cadastro de Produtos</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!token ? (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              ) : (
                <NavDropdown title={user.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="#" onClick={onLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
