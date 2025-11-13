import { useState, useEffect, useCallback, type FormEvent } from "react";
import Form from "react-bootstrap/Form";
import type { ProfileUser } from "../../types";
import { useFirebaseAuth } from "../LoginLogout/FirebaseAuthProvider";
import { db } from "../../firebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";

const EditUserForm = () => {
    // Firebase auth context
    const { user, loading, error } = useFirebaseAuth();

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
};

export default EditUserForm;
