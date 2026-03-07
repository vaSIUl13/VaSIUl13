import React, { useState } from "react";
import dishes from "../data/dishes";
import DishCard from "../components/DishCard";
import "../styles/MenuPage.css";

const MenuPage = () => {
  const [category, setCategory] = useState("всі");

  const filteredDishes =
    category === "всі"
      ? dishes
      : dishes.filter((item) => item.category === category);

  return (
    <div id="menu" className="menu-page">
      <h1 className="title">Меню нашої платформи</h1>

      <div className="filter-buttons">
        <button onClick={() => setCategory("всі")}>Всі</button>
        <button onClick={() => setCategory("піца")}>Піца</button>
        <button onClick={() => setCategory("суші")}>Суші</button>
        <button onClick={() => setCategory("напої")}>Напої</button>
      </div>

      <div className="dishes-grid">
        {filteredDishes.map((item) => (
          <DishCard key={item.id} dish={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;