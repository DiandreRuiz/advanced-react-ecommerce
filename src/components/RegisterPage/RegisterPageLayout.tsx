import Container from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Register from "./Register";

const RegisterPageLayout = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Register />
                </Col>
            </Row>
        </Container>
    );
};

export default RegisterPageLayout;
