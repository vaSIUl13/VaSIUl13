import React from "react";
import "../styles/DishCard.css";
import "../styles/MenuPage.css"

const DishCard = ({ dish, onAddToCart }) => {
  return (
    <div className="dish-card">
      <img src={dish.image} alt={dish.name} />
      <h3>{dish.name}</h3>
      <p>{dish.description}</p>
      <p>
        <strong>Ціна: {dish.price} грн</strong>
      </p>  
      <button onClick={() => onAddToCart(dish)} className="dish-card-button">Додати в кошик</button>
    </div>
  );
};

export default DishCard;
