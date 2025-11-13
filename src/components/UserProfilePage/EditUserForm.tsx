import { useState, useEffect, useCallback, type FormEvent } from "react";
import { useFirebaseAuth } from "../LoginLogout/FirebaseAuthProvider";
import { db } from "../../firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DeleteAccountModal from "./DeleteAccountModal";

const EditUserForm = () => {
    // Firebase auth context
    const { user } = useFirebaseAuth();

    const [address, setAddress] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
    const [error, setError] = useState<unknown | null>(null);
    const [showAccountDeletionModal, setShowAccountDeletionModal] = useState<boolean>(false);

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

    const handleCloseModal = () => {
        setShowAccountDeletionModal(false);
    };

    const updateUser = async () => {
        const updateInfoFormValidate = (): boolean => {
            const issues: string[] = [];

            if (!name) issues.push("All profiles must have a First Name!");
            if (!email) issues.push("All profiles must have an associated Email!");
            if (!!password && password !== passwordConfirmation) issues.push("Password & Confirm Password must match!");

            if (issues.length > 0) {
                alert(issues.join("\n")); // join each message on a new line
                return false;
            }

            return true;
        };

        const updatedUserDoc = doc(db, "users", user.uid);

        try {
            // Form Validation & re-fetching of data
            if (!updateInfoFormValidate()) {
                fetchData();
                return;
            }

            await updateDoc(updatedUserDoc, {
                address: address ? address : null,
                name: name,
                email: email,
                // password confirmation checked in form validation above
                ...(!!password && { password: password }),
            });

            alert("Succesfully Updated User Information!");
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
        <>
            <DeleteAccountModal show={showAccountDeletionModal} user={user} handleCloseModal={handleCloseModal} />
            <Form onSubmit={handleSubmit} className="bg-light p-3">
                <h1 className="text-center">Edit User</h1>
                <Form.Group className="mb-3">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control value={name} onChange={(e) => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-5">
                    <Form.Label>Address</Form.Label>
                    <Form.Control value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Group>
                <hr className="mb-5" />
                <Form.Group className="mb-3">
                    <Form.Label>Change Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" className="mt-3 mb-3 d-block mx-auto">
                    Save
                </Button>
                <Button
                    variant="outline-danger"
                    className="d-block mx-auto"
                    onClick={() => setShowAccountDeletionModal((prev) => !prev)}
                >
                    Delete Account
                </Button>
                {error ? <p>{error instanceof Error ? error.message : String(error)}</p> : null}
            </Form>
        </>
    );
};

export default EditUserForm;
