import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            signOut(auth);
            alert("User Signed Out");
        } catch (error) {
            console.error(error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
