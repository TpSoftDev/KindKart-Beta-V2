import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Pantry Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
      <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact" required />
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
      <button type="submit">Register Pantry</button>
    </form>
  );
};

export default PantryRegistration;