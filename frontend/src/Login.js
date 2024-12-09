import React, { useState } from "react";
import { useAuth } from "./AuthContext";

const Login = () => {
    const { setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
        } catch (err) {
            setError("An error occurred. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Login</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleLogin} className="mt-3">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-4 w-100">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
