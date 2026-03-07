import React from 'react';
import MenuPage from './pages/MenuPage.jsx';
import Navbar from './components/Navbar.jsx';
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <Navbar /> 
      <main className="container">
        <MenuPage />
      </main>
    </div>
  );
}

export default App;