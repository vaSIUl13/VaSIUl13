import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import MenuPage from "./pages/MenuPage"; 
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.id === item.id);
      if (existingItem) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleOrderSubmit = async () => {
    if (!user) {
      alert("Будь ласка, увійдіть, щоб оформити замовлення.");
      return;
    }

    const orderData = {
      userEmail: user.email,
      items: cart,
      date: new Date().toISOString(),
      totalPrice: cart.reduce((total, item) => total + item.price * item.quantity, 0),
    };

    try {
      const response = await fetch("https://vasiul13.onrender.com/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        clearCart();
      } else {
        alert(data.message || "Помилка при оформленні.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Не вдалося з'єднатися з сервером.");
    }
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar cartCount={cart.length} user={user} setUser={setUser} />
        <main>
          <Routes>
            {/* Оскільки Home немає, поставимо MenuPage як головну сторінку */}
            <Route path="/" element={<MenuPage onAddToCart={addToCart} />} />
            <Route path="/menu" element={<MenuPage onAddToCart={addToCart} />} />
            <Route
              path="/cart"
              element={
                <CartPage
                  cart={cart}
                  removeFromCart={removeFromCart}
                  onOrderSubmit={handleOrderSubmit}
                />
              }
            />
            <Route path="/orders" element={<OrderPage user={user} />} />
            <Route path="/login" element={<AuthPage setUser={setUser} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;