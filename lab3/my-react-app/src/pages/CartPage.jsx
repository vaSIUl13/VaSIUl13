import React from "react";
import "../styles/CartPage.css";
import { Link } from "react-router-dom";

const CartPage = ({ cartItems, onUpdateQuantity, onRemove, onCheckout }) => {
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="container empty-cart-container">
        <h2 className="title_cart">Ваш кошик порожній :(</h2>
        <Link className="button_menu_link" to="/">
          Оберіть страву
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h2 className="title_cart">Ваше замовлення</h2>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="item-info">
              <h3>{item.name}</h3>
              <p>{item.price * item.quantity} грн</p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
            </div>
            <button className="remove-btn" onClick={() => onRemove(item.id)}>
              Видалити
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Разом до сплати: {totalPrice} грн</h3>
        <button className="order-btn" onClick={onCheckout}>
          Оформити замовлення
        </button>
      </div>
    </div>
  );
};

export default CartPage;
