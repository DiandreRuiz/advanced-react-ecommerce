import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import OrdersDisplay from "./OrdersDisplay";

const OrdersDisplayLayout = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <OrdersDisplay />
                </Col>
            </Row>
        </Container>
    );
};

export default OrdersDisplayLayout;
