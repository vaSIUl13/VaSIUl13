import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/AuthPage.css';

const AuthPage = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true); // Стан для перемикання Вхід/Реєстрація
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      
      // ОНОВЛЮЄМО КОРИСТУВАЧА В APP.JS
      const loggedInUser = userCredential.user;
      setUser(loggedInUser); 
      localStorage.setItem("user", JSON.stringify(loggedInUser));

      navigate('/'); 
    } catch (err) {
      setError("Помилка: " + err.message); 
    }
  };

  return (
    <div className="container auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? 'Вхід' : 'Реєстрація'}</h2>
        
        {error && <p className="error-message">{error}</p>}
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль (мінімум 6 символів)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <button type="submit" className="order-btn">
          {isLogin ? 'Увійти' : 'Зареєструватися'}
        </button>
        
        <p onClick={() => setIsLogin(!isLogin)} className="auth-toggle">
          {isLogin ? 'Немає акаунта? Створити' : 'Вже є акаунт? Увійти'}
        </p>
      </form>
    </div>
  );
};

export default AuthPage;