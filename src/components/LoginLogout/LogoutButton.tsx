import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Button from "react-bootstrap/Button";

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            signOut(auth);
            alert("User Signed Out");
        } catch (error) {
            console.error(error);
        }
    };

    return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
