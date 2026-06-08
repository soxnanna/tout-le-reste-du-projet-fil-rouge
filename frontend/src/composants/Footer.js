import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main" style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left', marginBottom: '2rem', gap: '3rem', flexWrap: 'wrap' }}>
        <div className="footer-brand" style={{ flex: '1', minWidth: '250px' }}>
          <img src="/logo-ak.png" alt="Logo" className="footer-logo" />
          <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>Passionnée par le Cloud, le DevOps & l'Administration Systèmes/Réseaux.</p>
        </div>
        
        <div className="footer-nav" style={{ display: 'flex', gap: '4rem' }}>
          <div className="footer-nav-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Navigation</h4>
            <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Accueil</Link>
            <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Parcours</Link>
            <Link to="/portfolio" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Projets</Link>
          </div>
          <div className="footer-nav-col" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Connecter</h4>
            <a href="https://github.com/soxnanna" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>GitHub</a>
            <a href="https://www.linkedin.com/in/anna-keita-1a83052aa/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom" style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-main)' }}>
        <p style={{ color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '500', letterSpacing: '0.5px' }}>© 2026 Anna KEITA — Conçu avec excellence.</p>
      </div>
    </footer>
  );
}

export default Footer;
