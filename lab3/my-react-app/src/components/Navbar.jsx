import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = ({ cartCount, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      onLogout(); 
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
  };

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
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="logout-btn"
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Вийти ({user.email.split("@")[0]})
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login" className="login-link">
                Увійти
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
