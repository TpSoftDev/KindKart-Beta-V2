// frontend/src/MapPage.js
import React, { useEffect, useState } from "react";
import Map from "./Map";

const MapPage = () => {
  const [pantries, setPantries] = useState([]); // State to store pantry data

  useEffect(() => {
    // Fetch pantry data from the backend
    const fetchPantries = async () => {
      try {
        const response = await fetch("http://localhost:5001/pantries");
        const data = await response.json();
        setPantries(data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching pantries:", error); // Log any errors
      }
    };

    fetchPantries(); // Call the fetch function
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="container mt-5">
      <h2 className="text-center">Food Pantries</h2>
      <Map pantries={pantries} /> {/* Render the map with pantry data */}
      <div className="mt-4">
        <h3>Pantry List</h3>
        <ul>
          {pantries.map((pantry, index) => (
            <li key={index}>
              {pantry.name} - {pantry.location} {/* Display pantry name and location */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapPage;
