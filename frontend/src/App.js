import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import MapPage from "./MapPage";
import UserRegistration from "./UserRegistration";
import PantryRegistration from "./PantryRegistration";
import Login from "./Login";
import Navbar from "./NavBar";
import { AuthProvider } from "./AuthContext";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MapPage />} />
                    <Route path="/map/:zipCode" element={<MapPage />} />
                    <Route path="/register/user" element={<UserRegistration />} />
                    <Route path="/register/pantry" element={<PantryRegistration />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
