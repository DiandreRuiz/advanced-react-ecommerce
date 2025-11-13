import { useState, type FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = () => {
    // Firebase Auth Form State
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const userCreds = await createUserWithEmailAndPassword(auth, email, password);
            alert("Succesfully Created User!");
            await setDoc(doc(db, "users", userCreds.user.uid), {
                name,
                email,
                password,
            });
            alert("User data added!");
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        }

        // Add new User document to 'user' collection in Firestore
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
                {error && <p>{error}</p>}
            </div>
        </>
    );
};

export default Register;
