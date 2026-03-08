import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          FOODDELIVERY
        </Link>

        <div
          className={`burger ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-links ${isOpen ? "active" : ""}`}>
          <li>
            <Link
              className="nav-links-item"
              to="/"
              onClick={() => setIsOpen(false)}
            >
              Меню
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="cart-link"
            >
              Кошик
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </li>
          <li>
            <Link
              className="nav-links-item"
              to="/orders"
              onClick={() => setIsOpen(false)}
            >
              Замовлення
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
