import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import type { Product } from "../types";
import axios from "axios";

const populateFirestoreProducts = async () => {
    const response = await axios.get("https://fakestoreapi.com/products");
    const data: Product[] = response.data;
    console.log(`Number of products in: ${data.length}`);
    const collectionRef = collection(db, "products");
    data.forEach(async (item) => {
        try {
            await addDoc(collectionRef, { ...item });
        } catch (error) {
            console.error(error);
        }
    });
    console.log("Finished uploading to firestore");
};

await populateFirestoreProducts();
