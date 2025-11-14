import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import LogoutButton from "./LoginLogout/LogoutButton";

const NavBar = () => {
    return (
        <Navbar bg="light" variant="light" expand="md" className="p-1 mb-3">
            <Container className="d-flex justify-content-center">
                <Navbar.Toggle aria-controls="basic-navbar-nav" color="black" />
                <Navbar.Collapse className="w-auto flex-grow-0">
                    <Nav className="me-5">
                        <Nav.Link as={NavLink} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/user-profile">
                            Profile
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/orders">
                            Orders
                        </Nav.Link>
                    </Nav>
                    <div className="mt-1 mb-1">
                        <LogoutButton />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
