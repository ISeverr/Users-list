import { Col, Container,   Row,  Button } from 'react-bootstrap';


function UnAuthPage() {
    return (
      <Container className=' h-75 d-flex align-items-center justify-content-center'>
        <Row>
          <Col>
          <Button variant="outline-primary" href='/login'>Login</Button>
          </Col>
          <Col>
          <Button variant="outline-primary" href='/registration'>Registration</Button>
          </Col>
        </Row>
      </Container>
      
    );
};

export default UnAuthPage;
