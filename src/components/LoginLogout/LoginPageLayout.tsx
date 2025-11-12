import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "./LoginForm";

const LoginPageLayout = () => {
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={4}>
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPageLayout;
