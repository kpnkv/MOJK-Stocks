import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h1 className="navbar-title">MOJK Stocks</h1>
      <div className="navbar-buttons">
        <button onClick={() => navigate('/home')}>Home</button>
        <button onClick={() => navigate('/stocks')}>Stocks</button>
        <button onClick={() => navigate('/contact')}>Contact</button>
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/profile')}>Profile</button>
      </div>
    </div>
  );
}

export default Navbar;
