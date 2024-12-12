import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import logo from './assets/logo.png'; // Update with your actual logo path
import './NavBar.css';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="nav-bar">
      <div className="nav-content">
        <img src={logo} alt="KindKart Logo" className="logo" />
        <div className="nav-links">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/register/user" className="nav-item">Register User</Link>
          <Link to="/register/pantry" className="nav-item">Register Pantry</Link>
          <Link to="/course-info" className="nav-item">Course Info</Link>
          {user ? (
            <button onClick={handleLogout} className="nav-item logout-btn">
              Logout
            </button>
          ) : (
            <Link to="/login" className="nav-item">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
