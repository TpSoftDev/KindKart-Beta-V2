import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    // Check for an existing token
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:5001/user/validate", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Token validation failed");
                    return res.json();
                })
                .then((data) => {
                    setUser({ id: data.id, name: data.name, email: data.email });
                    setFavorites(data.favorites || []);
                })
                .catch(() => {
                    localStorage.removeItem("token");
                });
        }
    }, [navigate]);

    // Add a pantry to favorites
    const addToFavorites = async (pantryId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const response = await fetch("http://localhost:5001/user/favorites", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ pantryId, action: "add" }),
        });

        if (response.ok) {
            setFavorites((prev) => [...prev, pantryId]);
        }
    };

    // Remove a pantry from favorites
    const removeFromFavorites = async (pantryId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const response = await fetch("http://localhost:5001/user/favorites", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ pantryId, action: "remove" }),
        });

        if (response.ok) {
            setFavorites((prev) => prev.filter((id) => id !== pantryId));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                favorites,
                addToFavorites,
                removeFromFavorites,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
