import { Routes, Route } from "react-router-dom";
import HomePageLayout from "./components/HomePage/HomePageLayout";
import NavBar from "./components/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useFirebaseAuth } from "./components/LoginLogout/FirebaseAuthProvider";
import LoginRegisterCombo from "./components/LoginLogout/LoginRegisterCombo";
import EditUserFormLayout from "./components/UserProfilePage/EditUserFormLayout";

function App() {
    const { user, loading, error } = useFirebaseAuth();

    if (error) return <p>{error instanceof Error ? error.message : String(error)}</p>;
    if (loading)
        return (
            <Container>
                <Row className="mt-5">
                    <Col>
                        <Spinner />
                    </Col>
                </Row>
            </Container>
        );

    return (
        <>
            {user ? (
                <>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<HomePageLayout />} />
                        <Route path="/user-profile" element={<EditUserFormLayout />} />
                    </Routes>
                </>
            ) : (
                <LoginRegisterCombo />
            )}
        </>
    );
}

export default App;
