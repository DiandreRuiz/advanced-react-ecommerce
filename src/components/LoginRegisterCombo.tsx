import { useState } from "react";
import LoginForm from "./LoginLogout/LoginForm";
import Register from "./RegisterPage/Register";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Container from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LoginRegisterCombo = () => {
    const radios = [
        { name: "Login", value: "1" },
        { name: "Register", value: "2" },
    ];
    const [radioValue, setRadioValue] = useState("1");

    return (
        <Container>
            <Row>
                <Col>{radioValue === "1" ? <LoginForm /> : <Register />}</Col>
            </Row>
            <Row className="justify-content-center mt-5">
                <Col md={4}>
                    <ButtonGroup>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
                                variant={idx % 2 ? "outline-success" : "outline-danger"}
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginRegisterCombo;
