import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h1 className="navbar-title">MOJK Stocks</h1>
      <hr className="navbar-divider" />
        <button onClick={() => navigate('/home')}>Home</button>
    </div>
  );
}

export default Navbar;
