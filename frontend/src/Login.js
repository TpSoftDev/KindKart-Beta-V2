import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from 'react-router-dom';
import './GlobalTheme.css';

const Login = () => {
    const { setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:5001/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || "Login failed");
                return;
            }

            const data = await response.json();
            localStorage.setItem("token", data.token); // Save token to local storage
            setUser({ id: data.user.id, name: data.user.name, email: data.user.email }); // Update AuthContext
            navigate("/"); // Redirect to home page after login
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="theme-container">
            <form className="theme-form" onSubmit={handleLogin}>
                <h2 className="theme-form-title">Login</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <input
                    type="email"
                    className="theme-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    className="theme-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" className="theme-button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
