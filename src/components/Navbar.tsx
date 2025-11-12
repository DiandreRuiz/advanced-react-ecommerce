import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import BrandEarth from "../assets/planet.svg";
import BrandText from "../assets/text.svg";
import navStyles from "../styles/NavBar.module.css";

const NavBar = () => {
    return (
        <Navbar bg="light" variant="light" expand="md" className="p-1 mb-3">
            <Container className="d-flex justify-content-center pe-5">
                <Navbar.Brand href="/" className="brand-logo brandLogo">
                    <div className={`${navStyles.logoContainer} me-0`}>
                        {/* Static center logo */}
                        <img src={BrandEarth} alt="Shirt logo" className={navStyles.logoEarth} />

                        {/* Rotating wrapper for orbiting text */}
                        <div className={navStyles.orbit}>
                            <img src={BrandText} alt="Text logo" className={navStyles.logoText} />
                        </div>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" color="black" />
                <Navbar.Collapse className="w-auto flex-grow-0">
                    <Nav className="text-center">
                        <Nav.Link as={NavLink} to="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/products">
                            Junk
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/add-junk">
                            Add Junk
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/my-junk">
                            My Junk
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
