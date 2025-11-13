import { useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { type ProfileUser } from "../../types";

const Register = () => {
    // Firebase Auth Form State
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [registerUserError, setRegisterUserError] = useState<string | null>(null);

    // Firestore State
    const [addUserData, setAddUserData] = useState<Omit<ProfileUser, "id">>({ name: "", email: "", password: "" });
    const [addUserDataError, setAddUserDataError] = useState<string | null>(null);

    const handleUpdateUserData = () => {
        setAddUserData({
            name: name,
            email: email,
            password: password,
        });
    };

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        // Store data according to interface when form is submitted
        // to prepare for doc creation
        handleUpdateUserData();

        // Add new User document to 'user' collection in Firestore
        try {
            await addDoc(collection(db, "users"), addUserData);
            alert("User data added!");
        } catch (error) {
            if (error instanceof Error) {
                setAddUserDataError(error.message);
            } else {
                setAddUserDataError(String(error));
            }
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Succesfully Created User!");
        } catch (error) {
            if (error instanceof Error) {
                setRegisterUserError(error.message);
            } else {
                setRegisterUserError(String(error));
            }
        }
    };

    return (
        <>
            <div className="bg-light p-3 rounded">
                <Form onSubmit={handleRegister}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button type="submit" className="mt-3 mx-auto d-block">
                        Register
                    </Button>
                </Form>
                {addUserDataError && <p>{addUserDataError}</p>}
                {registerUserError && <p>{registerUserError}</p>}
            </div>
        </>
    );
};

export default Register;
