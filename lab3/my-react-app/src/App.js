import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage'
import './styles/App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]); 
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    };

    setOrders([newOrder, ...orders]);
    setCart([]); 
    navigate('/orders');
  };

  const addToCart = (dish) => {
    setCart((prevCart) => {
      const isExist = prevCart.find(item => item.id === dish.id);
      if (isExist) {
        return prevCart.map(item =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      
      <main className="container">
        <Routes>
          <Route path="/" element={<MenuPage onAddToCart={addToCart} />} />
          <Route path="/cart" element={
            <CartPage 
              cartItems={cart} 
              onUpdateQuantity={updateQuantity} 
              onRemove={removeFromCart} 
              onCheckout={handleCheckout}
            />
          } />
          <Route path="/orders" element={<OrderPage orders={orders} />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;