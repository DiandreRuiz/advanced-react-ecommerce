import { Routes, Route } from "react-router-dom";
import HomePageLayout from "./components/HomePage/HomePageLayout";
import RegisterPageLayout from "./components/RegisterPage/RegisterPageLayout";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePageLayout />} />
                <Route path="/register" element={<RegisterPageLayout />} />
            </Routes>
        </>
    );
}

export default App;
