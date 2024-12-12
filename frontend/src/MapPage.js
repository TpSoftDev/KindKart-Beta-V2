import React, { useEffect, useState } from "react";
import Map from "./Map";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import './MapPage.css';
import './GlobalTheme.css';

const MapPage = () => {
  const { user, favorites, addToFavorites, removeFromFavorites } = useAuth();
  const [pantries, setPantries] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        alert("You must be logged in to use favorites. Please log in or register.");
        navigate("/login");
        return;
    }
    if (favorites.includes(pantryId)) {
        removeFromFavorites(pantryId);
    } else {
        addToFavorites(pantryId);
    }
  };

  const displayedPantries = showFavorites
    ? pantries.filter((pantry) => favorites.includes(pantry._id))
    : pantries;

  return (
    <div className="map-page-container">
      <div className="map-section">
        <div className="map-header">
          <h2 className="map-title">Food Pantries Near You</h2>
          {error && <p className="error-message">{error}</p>}
          <button
            className="favorites-toggle"
            onClick={() => setShowFavorites(!showFavorites)}
            disabled={!user}
          >
            {showFavorites ? "Show All Pantries" : "Show Favorites Only"}
          </button>
        </div>
        <Map pantries={displayedPantries} />
      </div>

      <div className="pantry-list-section">
        <h3 className="pantry-list-title">Pantry Locations</h3>
        <div className="pantry-grid">
          {displayedPantries.map((pantry) => {
            const isFavorite = favorites.includes(pantry._id);
            return (
              <div key={pantry._id} className="pantry-card">
                <div className="pantry-info">
                  <h4>{pantry.name}</h4>
                  <p>{pantry.location}</p>
                </div>
                <button
                  onClick={() => handleFavoriteToggle(pantry._id)}
                  className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
                >
                  {isFavorite ? "Remove Favorite" : "Add Favorite"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MapPage;
