import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h4>FOODDELIVERY</h4>
          <p>Найшвидша доставка їжі у твоєму місті.</p>
        </div>
        <div className="footer-section">
          <h4>Контакти</h4>
          <p>Телефон: +380 99 123 45 67</p>
          <p>Email: support@fooddrive.com</p>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 FOODDELIVERY. Усі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;