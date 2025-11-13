import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../../firebaseConfig";

type AuthContext = {
    user: User | null;
    loading: boolean;
    error: unknown | null;
};

const Context = createContext<AuthContext>({ user: null, loading: true, error: null });

export const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(
            auth,
            (u) => {
                setUser(u);
                setLoading(false);
            },
            (e) => {
                setError(e);
                setLoading(false);
            }
        );
        return unsub;
    }, []);

    return <Context.Provider value={{ user, loading, error }}>{children}</Context.Provider>;
};

export const useFirebaseAuth = () => {
    const ctx = useContext(Context);
    if (!ctx) throw new Error("useFirebaseAuth must be called within a Provider");
    return ctx;
};
