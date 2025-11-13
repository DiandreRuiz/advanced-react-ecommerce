import { useState, useEffect, type FormEvent } from "react";
import Form from "react-bootstrap/Form";
import type { ProfileUser } from "../../types";
import { db } from "../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

const EditUserForm = () => {
    const [address, setAddress] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, "users"));
            const dataArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as ProfileUser[];
        };
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    };
};

export default EditUserForm;
