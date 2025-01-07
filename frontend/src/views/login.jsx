import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useStateContext } from "../contexts/contextprovider";
import axiosClient from "../axiosClient";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);

  const { setUser, setToken } = useStateContext();

  const Submit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        } else if (response && response.status === 401) {
          setErrors({ email: ["E-mail ou senha inválidos"] });
        }
      });
  };

  return (
    <Form onSubmit={Submit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          className={errors && errors.email ? "is-invalid" : ""}
          ref={emailRef}
          type="email"
          placeholder="Digite seu e-mail"
        />
        {errors && errors.email && (
          <Form.Control.Feedback type="invalid">
            {errors.email[0]}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Senha</Form.Label>
        <Form.Control
          className={errors && errors.password ? "is-invalid" : ""}
          ref={passwordRef}
          type="password"
          placeholder="Digite sua senha"
        />
        {errors && errors.password && (
          <Form.Control.Feedback type="invalid">
            {errors.password[0]}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Button variant="primary" type="submit" className="w-100">
        Entrar
      </Button>

      <p className="text-center mt-3">
        Não é cadastrado? <Link to="/register">Cadastre-se</Link>
      </p>
    </Form>
  );
}
