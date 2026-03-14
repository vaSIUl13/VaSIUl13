import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import "./styles/App.css";
import AuthPage from './pages/AuthPage';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
// import { collection, addDoc, getDocs } from 'firebase/firestore';
// import { db } from './firebase';
// import dishes from './data/dishes';

function App() {
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); 
    });
    return () => unsubscribe();
  }, []);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      items: [...cart],
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    navigate("/orders");
  };

  const addToCart = (dish) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((item) => item.id === dish.id);
      if (isExist) {
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

//   const uploadMenuToFirebase = async () => {
//   try {
//     const menuCollectionRef = collection(db, 'menu');
    
//     // Робимо перевірку: чи база порожня, щоб випадково не задублювати страви
//     const querySnapshot = await getDocs(menuCollectionRef);
    
//     if (querySnapshot.empty) {
//       console.log("База порожня. Починаю завантаження...");
      
//       // Беремо твій локальний масив dishes і кожну страву по черзі закидаємо в базу
//       for (const dish of dishes) {
//         await addDoc(menuCollectionRef, dish);
//       }
//       console.log("Меню успішно завантажено в Firebase!");
//     } else {
//       console.log("Меню вже існує в базі даних.");
//     }
//   } catch (error) {
//     console.error("Помилка завантаження меню:", error);
//   }
// };

// // 3. Спеціальний хук, який викликав цю функцію рівно один раз при запуску сайту:
//   useEffect(() => {
//     uploadMenuToFirebase();
//   }, []);

  return (
    <div className="App">
      <Navbar cartCount={cart.length} user={user} />

      <main className="container">
        <Routes>
          <Route path="/" element={<MenuPage onAddToCart={addToCart} />} />
          <Route path="/cart" element={
              <CartPage
                cartItems={cart}
                onUpdateQuantity={updateQuantity}
                onRemove={removeFromCart}
                onCheckout={handleCheckout}
                user={user}
              />
            }
          />
          <Route path="/orders" element={<OrderPage orders={orders} />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
