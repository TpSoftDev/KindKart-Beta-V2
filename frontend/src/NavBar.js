import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f8f9fa' }}>
      <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
      <Link to="/register/user" style={{ margin: '0 10px' }}>Register User</Link>
      <Link to="/register/pantry" style={{ margin: '0 10px' }}>Register Pantry</Link>
    </nav>
  );
};

export default Navbar;