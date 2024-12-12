import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";


const Navbar = () => {
  const { user, setUser } = useAuth();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#f8f9fa" }}>
      <Link to="/" style={{ margin: "0 10px" }}>
        Home
      </Link>
      <Link to="/register/user" style={{ margin: "0 10px" }}>
        Register User
      </Link>
      <Link to="/register/pantry" style={{ margin: "0 10px" }}>
        Register Pantry
      </Link>
      <Link to="/course-info" style={{ margin: "0 10px" }}>
        Course Info
      </Link>
      {user ? (
        <button onClick={handleLogout} style={{ margin: "0 10px" }}>
          Logout
        </button>
      ) : (
        <Link to="/login" style={{ margin: "0 10px" }}>
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
