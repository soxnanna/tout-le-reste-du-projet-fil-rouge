import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [isLight, setIsLight] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === null;
  });

  useEffect(() => {
    if (isLight) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLight]);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-link" style={{ padding: 0, background: 'none' }}>
           <img src="/logo-ak.png" alt="Anna KEITA Logo" className="navbar-logo" />
        </Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Accueil</Link>
        <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>Parcours</Link>
        <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>Projets</Link>
        <Link to="/contact" className="nav-link nav-contact-btn">Contact</Link>
        
        <button 
          className="theme-toggle" 
          onClick={() => setIsLight(!isLight)}
          title="Changer le thème"
        >
          {isLight ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
