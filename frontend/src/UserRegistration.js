import React, { useState } from 'react';
import './GlobalTheme.css';

const UserRegistration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(''); // Add password state


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send POST request to backend
      const response = await fetch('http://localhost:5001/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password }) // Convert data to JSON
      });
      const data = await response.json(); // Parse JSON response
      console.log(data.message); // Log success message
    } catch (error) {
      console.error('Error registering user:', error); // Log any errors
    }
  };

  return (
    <div className="theme-container">
      <form className="theme-form" onSubmit={handleSubmit}>
        <h2 className="theme-form-title">Register User</h2>
        <input 
          type="text" 
          className="theme-input" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          className="theme-input" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="tel" 
          className="theme-input" 
          placeholder="Phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          className="theme-input" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button className="theme-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default UserRegistration;