import { Routes, Route } from "react-router-dom";
import HomePageLayout from "./components/HomePage/HomePageLayout";
import NavBar from "./components/Navbar";
import { useState, useEffect } from "react";

import { type User, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import LoginRegisterCombo from "./components/LoginRegisterCombo";

function App() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);
    return (
        <>
            {user ? (
                <>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePageLayout />} />
                    </Routes>
                </>
            ) : (
                <LoginRegisterCombo />
            )}
        </>
    );
}

export default App;
