import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);

    const addToFavorites = (pantryId) => {
        setFavorites((prev) => [...prev, pantryId]);
    };

    const removeFromFavorites = (pantryId) => {
        setFavorites((prev) => prev.filter((id) => id !== pantryId));
    };

    return (
        <AuthContext.Provider
            value={{ user, setUser, favorites, addToFavorites, removeFromFavorites }}
        >
            {children}
        </AuthContext.Provider>
    );
};
