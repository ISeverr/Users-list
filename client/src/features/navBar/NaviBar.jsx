import { Container, Navbar, Nav, Row, } from 'react-bootstrap';
import { useContext } from 'react';
import {AuthContext} from '../../context/AuthContext' ;

function NaviBar() {
    const auth = useContext(AuthContext);

    const handlerLogout = (event) => {
        event.preventDefault()
        auth.logout();  
    };

    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand >Users list</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link onClick={handlerLogout}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar>

    )
}

export default NaviBar;

