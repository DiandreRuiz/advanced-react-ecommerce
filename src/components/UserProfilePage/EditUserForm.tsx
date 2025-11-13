import { useState, useEffect, useCallback, type FormEvent } from "react";
import { useFirebaseAuth } from "../LoginLogout/FirebaseAuthProvider";
import { db } from "../../firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const EditUserForm = () => {
    // Firebase auth context
    const { user } = useFirebaseAuth();

    const [address, setAddress] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<unknown | null>(null);

    if (!user) {
        throw Error("Unable to find current signed in user!");
    }

    // Grab the current data from the db for <form> initialization
    const fetchData = useCallback(async () => {
        const userDocRef = doc(db, "users", user.uid);
        try {
            const userDocSnap = await getDoc(userDocRef);
            // Address not available to edit besides in this field so that
            // record may not exist in the doc
            const fetchedAddress: undefined | string = userDocSnap.get("address");
            setAddress(fetchedAddress ? fetchedAddress : "");
            setName(userDocSnap.get("name"));
            setEmail(userDocSnap.get("email"));
            setPassword(userDocSnap.get("password"));
        } catch (error) {
            if (error instanceof Error) {
                setError(`Could not fetch current state of user information: ${error.message}`);
            } else {
                setError(`Could not fetch current state of user information: ${String(error)}`);
            }
        }
    }, [user?.uid]);

    // We don't define the function within useEffect because we need to call it again when the user
    // updates the information in the document.
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const updateUser = async () => {
        const updatedUserDoc = doc(db, "users", user.uid);
        try {
            await updateDoc(updatedUserDoc, { address: address, name: name, email: email, password: password });
            await fetchData();
        } catch (error) {
            if (error instanceof Error) {
                setError(`Could not update user ${user.uid}: ${error.message}`);
            } else {
                setError(`Could not update user ${user.uid}: ${String(error)}`);
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        updateUser();
    };

    return (
        <Form onSubmit={handleSubmit} className="bg-light p-3">
            <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" className="mt-3 d-block mx-auto">
                Save
            </Button>
            {error ? <p>{error instanceof Error ? error.message : String(error)}</p> : null}
        </Form>
    );
};

export default EditUserForm;
