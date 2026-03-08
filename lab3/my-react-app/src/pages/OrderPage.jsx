import React from "react";
import "../styles/OrderPage.css";
import "../styles/CartPage.css";
import { Link } from "react-router-dom";

const OrderPage = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="container empty-cart-container">
        <h2 className="title_order">У вас ще немає замовлень.</h2>
        <Link className="button_menu_link" to="/">
          Оберіть страву
        </Link>
      </div>
    );
  }

  return (
    <div className="order-page container">
      <h2 className="title_order">Мої Замовлення</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <span>Замовлення №{order.id}</span>
              <span className="order-date">{order.date}</span>
            </div>
            <div className="order-items-summary">
              {order.items.map((item) => (
                <p key={item.id}>
                  {item.name} x {item.quantity} — {item.price * item.quantity}{" "}
                  грн
                </p>
              ))}
            </div>
            <div className="order-footer">
              <strong>Разом: {order.total} грн</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;
