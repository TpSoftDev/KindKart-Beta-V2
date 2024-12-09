// frontend/src/MapPage.js
// IMPORTANT pantry._id is used but it is determined by the server get.. so whatever it is getting from there should be the var name
import React, { useEffect, useState } from "react";
import Map from "./Map";
import { useAuth } from "./AuthContext"; // Added AuthContext for managing favorites

const MapPage = () => {
    const { favorites, addToFavorites, removeFromFavorites } = useAuth(); // AuthContext functions
    const [pantries, setPantries] = useState([]); // State to store pantry data
    const [showFavorites, setShowFavorites] = useState(false); // State for toggling favorites view
    const [error, setError] = useState(null); // State for handling errors

    useEffect(() => {
        // Fetch pantry data from the backend
        const fetchPantries = async () => {
            try {
                const response = await fetch("http://localhost:5001/pantries");
                if (!response.ok) throw new Error("Failed to fetch pantries");
                const data = await response.json();
                setPantries(data); // Update state with fetched data
            } catch (err) {
                setError(err.message); // Set error state on failure
            }
        };

        fetchPantries(); // Call the fetch function
    }, []); // Empty dependency array to run once on mount

    const handleFavoriteToggle = (pantryId) => {
        // Add or remove pantry from favorites
        if (favorites.includes(pantryId)) {
            removeFromFavorites(pantryId);
        } else {
            addToFavorites(pantryId);
        }
    };

    const displayedPantries = showFavorites
        ? pantries.filter((pantry) => favorites.includes(pantry._id)) // Filter pantries by favorites
        : pantries; // Show all pantries if not filtering by favorites

    return (
        <div className="container mt-5">
            <h2 className="text-center">Food Pantries</h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <button
                className="btn btn-secondary mb-3"
                onClick={() => setShowFavorites(!showFavorites)}
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
