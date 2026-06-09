import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Projet from './Projet';
import StatsPanel from './StatsPanel';
import { useNavigate } from 'react-router-dom';

const API_URL = '/api/projets';

function Portfolio() {
  const [projets, setProjets] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [filtre, setFiltre] = useState('TOUS'); 
  const navigate = useNavigate();

  useEffect(() => {
    const chargerProjets = async () => {
      try {
        const reponse = await axios.get(API_URL);
        setProjets(reponse.data);
      } catch (erreur) {
        console.error('Erreur lors du chargement des projets :', erreur);
      } finally {
        setChargement(false);
      }
    };
    chargerProjets();
  }, []);

  const projetsFiltrés = projets.filter(p => {
    if (filtre === 'TOUS') return true;
    if (filtre === 'ODC') {
      return p.categorie && p.categorie.toUpperCase() === 'ODC';
    }
    if (filtre === 'ISI') {
      return p.categorie && p.categorie.toUpperCase() === 'ISI';
    }
    return true;
  });

  const renduGrille = () => {
    if (projetsFiltrés.length === 0) {
      return (
        <div className="no-projects" style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
          <p>Aucun projet trouvé dans cette catégorie pour le moment.</p>
        </div>
      );
    }
    return projetsFiltrés.map(projet => (
      <Projet
        key={projet._id}
        projet={projet}
        onAfficherDetail={(p) => navigate(`/projet/${p._id}`)}
        isReadOnly={true}
      />
    ));
  };

  if (chargement) {
    return (
      <div className="chargement" style={{ textAlign: 'center', padding: '10rem', color: 'var(--text-main)' }}>
        ⏳ Synchronisation du Portfolio...
      </div>
    );
  }

  return (
    <div className="portfolio-page">
      <header className="portfolio-header" style={{ padding: '6rem 10% 0', textAlign: 'center' }}>
        <h1 className="section-title">
          Mes <span>Réalisations</span>
        </h1>
        <p className="section-subtitle" style={{ color: 'var(--text-muted)' }}>Découvrez mes projets en Cloud, Réseaux et DevOps.</p>
      </header>

      {/* Dynamic Statistics Panel */}
      <div style={{ padding: '0 10%' }}>
        <StatsPanel items={projets} labelType="projets" />
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <div className="filter-bar">
          <button className={`filter-btn ${filtre === 'TOUS' ? 'active' : ''}`} onClick={() => setFiltre('TOUS')}>Tous</button>
          <button className={`filter-btn ${filtre === 'ODC' ? 'active' : ''}`} onClick={() => setFiltre('ODC')}>ODC (Cloud, Dev & DevOps)</button>
          <button className={`filter-btn ${filtre === 'ISI' ? 'active' : ''}`} onClick={() => setFiltre('ISI')}>ISI (Admin Systèmes & Réseaux)</button>
        </div>
      </div>

      <div className="projects-grid">
        {renduGrille()}
      </div>
    </div>
  );
}

export default Portfolio;
