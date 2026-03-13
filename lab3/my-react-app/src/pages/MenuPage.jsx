import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore'; 
import { db } from '../firebase';
import DishCard from '../components/DishCard';
import '../styles/MenuPage.css';

const MenuPage = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('Всі');
  const [menuItems, setMenuItems] = useState([]); // Стан для збереження страв з бази
  const [loading, setLoading] = useState(true); // Стан для індикатора завантаження

  const categories = ['Всі', 'Піца', 'Суші', 'Напої', 'Паста', 'Боули', 'Бургери'];

  // Функція для отримання даних з Firebase
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const menuCollection = collection(db, 'menu');
        const menuSnapshot = await getDocs(menuCollection);

        const menuList = menuSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setMenuItems(menuList);
        setLoading(false); 
      } catch (error) {
        console.error("Помилка при завантаженні меню:", error);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const filteredDishes = activeCategory === 'Всі' 
  ? menuItems 
  : menuItems.filter(dish => 
      dish.category && 
      dish.category.toLowerCase().trim() === activeCategory.toLowerCase().trim()
    );

  return (
    <div className="menu-page">
      <h2 className="menu-title">НАШЕ МЕНЮ</h2>
      
      <div className="category-filters">
        {categories.map(category => (
          <button 
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{textAlign: 'center', marginTop: '50px'}}>Завантаження меню...</div>
      ) : (
        <div className="menu-grid">
          {filteredDishes.map(dish => (
            <DishCard key={dish.id} dish={dish} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuPage;