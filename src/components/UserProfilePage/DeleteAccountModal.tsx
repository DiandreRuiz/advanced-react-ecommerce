import { useState } from "react";

import { type User, EmailAuthProvider, deleteUser, reauthenticateWithCredential } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

type DeleteAccountModalProps = {
    show: boolean;
    user: User;
};

const DeleteAccountModal = ({ show, user }: DeleteAccountModalProps) => {
    const accountDeletionMessage = "Please enter your password to delete your account...";
    const [passwordEntry, setPasswordEntry] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleAccountDeletion = async () => {
        try {
            if (!user.email) {
                setError(`Failed to fetch email for current user: ${user.uid}`);
                throw Error(`Failed to fetch email for current user: ${user.uid}`);
            }

            // We need to re-authenticate the user in order to allow deletion as per firebase auth rules
            // A wrong password input by user will be stored within error state and no deletion occurs
            const credential = EmailAuthProvider.credential(user.email, passwordEntry);
            await reauthenticateWithCredential(user, credential);
            await deleteDoc(doc(db, "users", user.uid));
            await deleteUser(user);
            alert(`Account associated with ${user.email} deleted!`);
        } catch (error) {
            setError(`Could not delete account!: ${error}`);
        }
    };

    return (
        <Modal show={show}>
            <Modal.Header>Delete Account?</Modal.Header>
            <Modal.Body>{accountDeletionMessage}</Modal.Body>
            <Form.Control value={passwordEntry} onChange={(e) => setPasswordEntry(e.target.value)} />
            <Button variant="danger" onClick={handleAccountDeletion}>
                Delete Account
            </Button>
            {error && <p>{error}</p>}
        </Modal>
    );
};

export default DeleteAccountModal;
