import { useState } from "react";
import LoginForm from "./LoginForm";
import Register from "../RegisterPage/Register";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LoginRegisterCombo = () => {
    const radios = [
        { name: "Login", value: "1" },
        { name: "Register", value: "2" },
    ];
    const [radioValue, setRadioValue] = useState("1");

    return (
        <Container className="p-5">
            <Row className="justify-content-center mb-3">
                <Col md={4} className="w-auto">
                    <ButtonGroup className="">
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                id={`radio-${idx}`}
                                type="radio"
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
            <Row className="justify-content-center">
                <Col md={4}>{radioValue === "1" ? <LoginForm /> : <Register />}</Col>
            </Row>
        </Container>
    );
};

export default LoginRegisterCombo;
