import { initializeApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCCFFu12F3QUslhWWmocfTIXCXdZvSPrzk",
    authDomain: "advanced-react-ecommerce-35542.firebaseapp.com",
    projectId: "advanced-react-ecommerce-35542",
    storageBucket: "advanced-react-ecommerce-35542.firebasestorage.app",
    messagingSenderId: "495238611941",
    appId: "1:495238611941:web:75cf97c01e23ac3c8ea50c",
};

// Initializing App
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
