import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Projet from './Projet';
import StatsPanel from './StatsPanel';

const API_URL = '/api/projets';
const CERTS_API_URL = '/api/certifications';

function Home() {
  const navigate = useNavigate();
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Show welcome modal on first load of the session
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => setShowWelcome(true), 1500);
      sessionStorage.setItem('hasVisited', 'true');
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get(API_URL);
        setFeaturedProjects(response.data.slice(0, 3));
      } catch (error) {
        console.error('Erreur lors du chargement des projets :', error);
      }
    };

    const fetchCertifications = async () => {
      try {
        const response = await axios.get(CERTS_API_URL);
        setCertifications(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des certifications :', error);
      }
    };

    fetchProjects();
    fetchCertifications();
  }, []);

  return (
    <div className="home-page">
      {/* Welcome Modal */}
      {showWelcome && (
        <div className="modal-overlay" onClick={() => setShowWelcome(false)}>
          <div className="welcome-modal" onClick={e => e.stopPropagation()}>
            <button className="welcome-close" onClick={() => setShowWelcome(false)}>✕</button>
            <img 
              src="/profile.jpg" 
              alt="Anna" 
              className="modal-img" 
              onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Anna+Keita&background=6366f1&color=fff'}
            />
            <h2 className="section-title" style={{ fontSize: '2rem' }}>Bonjour ! 👋</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              Bienvenue dans mon univers technique. <br/>
              Je suis Anna, passionnée par le Cloud & les Infrastructures.
            </p>
            <button className="btn btn-primary" onClick={() => setShowWelcome(false)}>DÉCOUVRIR MON TRAVAIL</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero">
        <div className="profile-img-container" style={{ position: 'relative' }}>
          <div className="stat-badge">8+ PROJETS</div>
          <img 
            src="/profile.jpg" 
            alt="Anna KEITA" 
            className="profile-img"
            onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=Anna+Keita&background=6366f1&color=fff&size=200'} 
          />
        </div>
        <h1 className="hero-title">
          Anna <span>KEITA</span>
        </h1>
        <p className="hero-subtitle">
          Passionnée par le Cloud, le DevOps & l'Administration Systèmes / Réseaux. <br/>
          En quête d'excellence opérationnelle et d'apprentissage continu.
        </p>

        <div className="social-hero">
          <a href="https://github.com/soxnanna" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
            <i className="fab fa-github">GH</i>
          </a>
          <a href="https://www.linkedin.com/in/anna-keita-1a83052aa/" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
            <i className="fab fa-linkedin">IN</i>
          </a>
        </div>

        <div className="skills-grid">
          <div className="skill-card">
            <span className="skill-icon">☁️</span>
            <span className="skill-name">AWS Cloud</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🐧</span>
            <span className="skill-name">Linux / Admin</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🐳</span>
            <span className="skill-name">Docker / CI-CD</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">🛡️</span>
            <span className="skill-name">Cybersécurité</span>
          </div>
          <div className="skill-card">
            <span className="skill-icon">⚛️</span>
            <span className="skill-name">React / Node</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '4rem' }}>
          <Link to="/portfolio" className="btn btn-primary">VOIR MES PROJETS</Link>
          <Link to="/cv" className="btn btn-outline">CONSULTER MON CV 📑</Link>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="certifications-section" style={{ padding: '8rem 10% 4rem', borderTop: '1px solid var(--border-main)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="section-title">Certifications <span>Officielles</span></h2>
          <p style={{ color: 'var(--text-muted)' }}>Validation de mes compétences par les leaders du marché.</p>
        </div>

        {/* Dynamic Statistics Panel for Certifications */}
        <StatsPanel items={certifications} labelType="certifications" />

        <div className="certifs-grid" style={{ marginTop: '3rem' }}>
          {certifications.map(cert => {
            const isAws = cert.libelle.toLowerCase().includes('aws');
            return (
              <div key={cert._id} className={`certif-card ${isAws ? 'featured' : ''}`}>
                <span className="skill-icon">{cert.image || '📜'}</span>
                <h3 className="certif-title">{cert.libelle}</h3>
                <p className="certif-org">{cert.organisation}</p>
                
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  {cert.statut === 'En cours' ? (
                    <span style={{ 
                      background: 'rgba(217, 119, 6, 0.1)', 
                      color: '#fbbf24', 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      fontSize: '0.65rem', 
                      fontWeight: '800' 
                    }}>
                      ⚡ EN COURS
                    </span>
                  ) : (
                    <span style={{ 
                      background: 'rgba(16, 185, 129, 0.1)', 
                      color: '#34d399', 
                      padding: '4px 10px', 
                      borderRadius: '100px', 
                      fontSize: '0.65rem', 
                      fontWeight: '800' 
                    }}>
                      ✓ OBTENUE ({cert.dateObtention})
                    </span>
                  )}
                  {isAws && <div style={{ color: 'var(--accent)', fontWeight: '800', fontSize: '0.7rem', marginTop: '5px' }}>CORE EXPERTISE</div>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects" style={{ padding: '8rem 10%', borderTop: '1px solid var(--border-main)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
          <div>
            <h2 className="section-title">Projets <span>Phares</span></h2>
            <p style={{ color: 'var(--text-muted)' }}>Une sélection de mes travaux récents.</p>
          </div>
          <Link to="/portfolio" className="btn-detail-link" style={{ fontSize: '1rem', fontWeight: '800', textDecoration: 'none' }}>Tout voir →</Link>
        </div>
        
        <div className="projects-grid" style={{ padding: '0' }}>
          {featuredProjects.map(projet => (
            <Projet
              key={projet._id}
              projet={projet}
              onAfficherDetail={(p) => navigate(`/projet/${p._id}`)}
              isReadOnly={true}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
