import React, { useEffect, useState } from "react";
import Map from "./Map";
import { useAuth } from "./AuthContext";

const MapPage = () => {
    const { user, favorites, addToFavorites, removeFromFavorites } = useAuth();
    const [pantries, setPantries] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPantries = async () => {
            try {
                const response = await fetch("http://localhost:5001/pantries");
                if (!response.ok) throw new Error("Failed to fetch pantries");
                const data = await response.json();
                setPantries(data);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchPantries();
    }, []);

    const handleFavoriteToggle = (pantryId) => {
        if (!user) {
            alert("You must be logged in to use favorites.");
            return;
        }
        if (favorites.includes(pantryId)) {
            removeFromFavorites(pantryId);
        } else {
            addToFavorites(pantryId);
        }
    };

    const displayedPantries = showFavorites ? pantries.filter((pantry) => favorites.includes(pantry._id)) : pantries;

    return (
        <div className="container mt-5">
            <h2 className="text-center">Food Pantries</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <button
                className="btn btn-secondary mb-3"
                onClick={() => setShowFavorites(!showFavorites)}
                disabled={!user}
            >
                {showFavorites ? "Show All Pantries" : "Show Favorites Only"}
            </button>
            <Map pantries={displayedPantries} />
            <div className="mt-4">
                <h3>Pantry List</h3>
                <ul>
                    {displayedPantries.map((pantry) => {
                        const isFavorite = favorites.includes(pantry._id);
                        return (
                            <li key={pantry._id}>
                                {pantry.name} - {pantry.location}
                                <button
                                    onClick={() => handleFavoriteToggle(pantry._id)}
                                    className="btn btn-link"
                                >
                                    {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default MapPage;
