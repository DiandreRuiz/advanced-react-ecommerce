import { Routes, Route } from "react-router-dom";
import HomePageLayout from "./components/HomePage/HomePageLayout";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePageLayout />} />
                <Route path="/register" element={<HomePageLayout />} />
            </Routes>
        </>
    );
}

export default App;
