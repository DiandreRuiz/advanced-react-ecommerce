import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditUserForm from "./EditUserForm";

const EditUserFormLayout = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={5}>
                    <EditUserForm />
                </Col>
            </Row>
        </Container>
    );
};

export default EditUserFormLayout;
