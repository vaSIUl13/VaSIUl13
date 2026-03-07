import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="logo">FOODDELIVERY</div>

        <div className={`burger ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li className='nav-links-item'><a href="#menu" onClick={() => setIsOpen(false)}>Меню</a></li>
          <li className='nav-links-item'><a href="#cart" onClick={() => setIsOpen(false)}>Кошик</a></li>
          <li className='nav-links-item'><a href="#orders" onClick={() => setIsOpen(false)}>Замовлення</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;