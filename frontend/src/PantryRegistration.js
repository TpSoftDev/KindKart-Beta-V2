import React, { useState } from 'react';
import './GlobalTheme.css';

const PantryRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:5001/pantry/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, description, contact, location }) // Convert data to JSON
      });
      const data = await response.json(); // Parse JSON response
      console.log(data.message); // Log success message
    } catch (error) {
      console.error('Error registering pantry:', error); // Log any errors
    }
  };

  return (
    <div className="theme-container">
      <form className="theme-form" onSubmit={handleSubmit}>
        <h2 className="theme-form-title">Register Pantry</h2>
        <input 
          type="text" 
          className="theme-input" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Pantry Name" 
          required 
        />
        <input 
          type="email" 
          className="theme-input" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <textarea 
          className="theme-input" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          required 
        />
        <input 
          type="text" 
          className="theme-input" 
          value={contact} 
          onChange={(e) => setContact(e.target.value)} 
          placeholder="Contact" 
          required 
        />
        <input 
          type="text" 
          className="theme-input" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          placeholder="Location" 
          required 
        />
        <button 
          type="submit" 
          className="theme-button"
        >
          Register Pantry
        </button>
      </form>
    </div>
  );
};

export default PantryRegistration;