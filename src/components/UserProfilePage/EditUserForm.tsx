import { useState, useEffect, type FormEvent } from "react";
import Form from "react-bootstrap/Form";
import type { ProfileUser } from "../../types";
import { useFirebaseAuth } from "../LoginLogout/FirebaseAuthProvider";
import { db } from "../../firebaseConfig";
import { getDoc, doc, setDoc } from "firebase/firestore";

const EditUserForm = () => {
    // Firebase auth context
    const { user, loading, error } = useFirebaseAuth();

    const [address, setAddress] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<unknown | null>(null);

    if (!user) {
        setError("Cannot find user. Are you currently Signed in?");
        throw Error("Unable to find current signed in user!");
    }

    // Grab the current data from the db for <form> initialization
    useEffect(() => {
        const fetchData = async () => {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            // Address not available to edit besides in this field so that
            // record may not exist in the doc
            const fetchedAddress: undefined | string = userDocSnap.get("address");
            setAddress(fetchedAddress ? fetchedAddress : "");
            setName(userDocSnap.get("name"));
            setEmail(userDocSnap.get("email"));
            setPassword(userDocSnap.get("password"));
        };
        fetchData();
    }, [user]);

    const updateUser = async () => {
        const updatedUserDoc = doc(db, "users", user.uid);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    };
};

export default EditUserForm;
