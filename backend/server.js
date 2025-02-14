// Import necessary modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

// Import Mongoose models
const User = require("./models/User");
const Pantry = require("./models/Pantry");

// Initialize the Express application
const app = express();
const PORT = process.env.PORT || 5001; // Define the port number

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies in requests

// MongoDB connection string
const mongoURI = "mongodb://localhost:27017/KindKartDB";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB")) // Log success message
  .catch((err) => console.error("Could not connect to MongoDB", err)); // Log error message

// Sample data for food pantries (this will be replaced with database data later)
const foodPantries = [
  { lat: 40.7128, lng: -74.006 }, // Example coordinates
  { lat: 40.7306, lng: -73.9352 },
];

// GET endpoint to fetch food pantry locations
app.get("/locations", (req, res) => {
  const zip = req.query.zip; // Get zip code from query parameters
  // For now, return all sample locations
  res.json({ locations: foodPantries });
});

// Endpoint to register a new user
app.post("/user/register", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const user = new User({ name, email, phone });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to register a new pantry
app.post("/pantry/register", async (req, res) => {
  try {
    const { name, email, description, contact, location } = req.body;

    // Geocode the location to get latitude and longitude
    const geocodeResponse = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: location,
          key: "AIzaSyDuuwSS5l45rptEcPwiTM3o7EWMvYtPMOU", // Ensure this is your actual API key
        },
      }
    );

    console.log(geocodeResponse.data); // Log the full response

    if (geocodeResponse.data.results.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid address, unable to geocode." });
    }

    const { lat, lng } = geocodeResponse.data.results[0].geometry.location;

    const pantry = new Pantry({
      name,
      email,
      description,
      contact,
      location,
      latitude: lat,
      longitude: lng,
    });
    await pantry.save();
    res.status(201).json({ message: "Pantry registered successfully" });
  } catch (error) {
    console.error("Error registering pantry:", error); // Log any errors
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to get all pantries
app.get("/pantries", async (req, res) => {
  try {
    const pantries = await Pantry.find(); // Fetch all pantries from the database
    res.json(pantries); // Send pantries as JSON response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start message
});