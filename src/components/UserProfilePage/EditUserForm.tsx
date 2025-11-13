import { useState, useEffect, type FormEvent } from "react";
import Form from "react-bootstrap/Form";
import type { ProfileUser } from "../../types";
import { useFirebaseAuth } from "../LoginLogout/FirebaseAuthProvider";
import { db } from "../../firebaseConfig";
import { getDoc, doc } from "firebase/firestore";

const EditUserForm = () => {
    // Firebase auth context
    const { user } = useFirebaseAuth();

    const [address, setAddress] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            if (!user) throw Error("Unable to find current signed in user!");
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);
        };
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    };
};

export default EditUserForm;
