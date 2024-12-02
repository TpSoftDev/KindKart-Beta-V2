const mongoose = require('mongoose');

// Define the pantry schema
const pantrySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
  location: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true }
});

// Create the pantry model
const Pantry = mongoose.model('Pantry', pantrySchema);

module.exports = Pantry; 