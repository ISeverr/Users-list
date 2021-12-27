import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function RegistrationForm() {
    const { loading, request } = useHttp();
    const auth = useContext(AuthContext);
    const [form, setForm] = useState({
        email: '',
        password: '',
        nickname: '',
    });

    const handlerChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlerRegister = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            auth.login(data.token, data.user.userId);
            console.log('data', data);
            alert(data.message);
        } catch (e) {
            alert(e);
        }
    };

    return (
        <Container  className='h-75 d-flex align-items-center justify-content-center'>
            <Row>
                <Col>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                name="email"
                                type="email"
                                placeholder="Enter email"
                                onChange={handlerChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                                type="text"
                                name="nickname"
                                placeholder="Enter nickname"
                                onChange={handlerChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Create password"
                                onChange={handlerChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            onClick={handlerRegister}
                            disabled={loading}
                        >
                            Register
                        </Button>
                        <Button
                            variant="outline-primary"
                            href='/'
                        >
                            Back
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default RegistrationForm;