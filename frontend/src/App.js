import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import MapPage from './MapPage';
import UserRegistration from './UserRegistration';
import PantryRegistration from './PantryRegistration';
import Navbar from './NavBar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map/:zipCode" element={<MapPage />} />
        <Route path="/register/user" element={<UserRegistration />} />
        <Route path="/register/pantry" element={<PantryRegistration />} />
      </Routes>
    </Router>
  );
}

export default App;
