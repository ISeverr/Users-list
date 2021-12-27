import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function LoginForm() {
  const { loading, request } = useHttp();
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.user.userId);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Container className="h-75 d-flex align-items-center justify-content-center">
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formBasicCheckbox"
            ></Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleLogin}
              disabled={loading}
            >
              Login
            </Button>
            <Button variant="outline-primary" href="/">
              Back
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
