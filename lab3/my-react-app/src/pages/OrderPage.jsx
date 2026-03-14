import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; 

function OrderPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Чекаємо, поки Firebase перевірить, чи увійшов юзер
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        fetchOrdersFromBackend(user.email);
      } else {
        setUserEmail(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Функція звернення до нашого Node.js сервера
  const fetchOrdersFromBackend = async (email) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders?email=${email}`);
      const data = await response.json();
      
      if (response.ok) {
        setOrders(data);
      } else {
        console.error("Помилка від сервера:", data.message);
      }
    } catch (error) {
      console.error("Не вдалося з'єднатися з сервером:", error);
    } finally {
      setLoading(false);
    }
  };

  // Якщо дані ще вантажаться
  if (loading) return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Завантаження замовлень...</h2>;

  // Якщо юзер не увійшов
  if (!userEmail) return <h2 style={{textAlign: 'center', marginTop: '50px'}}>Будь ласка, увійдіть в акаунт, щоб побачити свої замовлення.</h2>;

  return (
    <div className="order-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{textAlign: 'center', color: '#ff4757'}}>Мої замовлення</h2>
      
      {orders.length === 0 ? (
        <p style={{textAlign: 'center'}}>У вас ще немає оформлених замовлень.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {orders.map((order, index) => (
            <div key={order.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: '#f9f9f9' }}>
              <h3>Замовлення #{orders.length - index}</h3>
              <p><strong>Дата:</strong> {order.date}</p>
              <p><strong>Загальна сума:</strong> {order.total} грн</p>
              
              <ul style={{ listStyleType: 'none', paddingLeft: '0', marginTop: '10px' }}>
                {order.items.map((item, i) => (
                  <li key={i} style={{ borderBottom: '1px dashed #ccc', padding: '5px 0' }}>
                    {item.name} — {item.quantity} шт. (по {item.price} грн)
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderPage;