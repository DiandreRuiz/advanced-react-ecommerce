import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductsDisplay from "../ProductsDisplay";
import CategoriesDropdown from "./CategoriesDropdown";
import ShoppingCartDropdown from "../ShoppingCartDropdown";

const HomePageLayout = () => {
    return (
        <Container>
            <Row>
                <Col xs={3} lg={1}>
                    <ShoppingCartDropdown />
                </Col>
                <Col xs={3} lg={1}>
                    <CategoriesDropdown />
                </Col>
            </Row>
            <ProductsDisplay />
        </Container>
    );
};

export default HomePageLayout;
