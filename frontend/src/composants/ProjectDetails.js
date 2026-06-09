import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = '/api/projets';

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projet, setProjet] = useState(null);
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const chargerProjet = async () => {
      try {
        const reponse = await axios.get(`${API_URL}/${id}`);
        setProjet(reponse.data);
      } catch (erreur) {
        console.error('Erreur lors du chargement du projet :', erreur);
      } finally {
        setChargement(false);
      }
    };
    chargerProjet();
  }, [id]);

  if (chargement) {
    return <div className="chargement" style={{ textAlign: 'center', padding: '10rem', color: 'var(--text-main)' }}>⏳ Chargement des détails...</div>;
  }

  if (!projet) {
    return (
      <div className="aucun-projet" style={{ textAlign: 'center', padding: '10rem' }}>
        <h2 className="section-title">Oups ! Ce <span>projet</span> n'existe pas.</h2>
        <button className="btn btn-primary" onClick={() => navigate('/portfolio')}>
          Retour au Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="projet-details-page">
      <div className="details-container-v2">
        <button className="btn btn-back" onClick={() => navigate(-1)}>
          ← Retour au portfolio
        </button>

        <div className="details-hero">
          <div className="details-image-wrapper">
             <img src={projet.image} alt={projet.libelle} className="details-full-image" />
          </div>
          
          <div className="details-header-info">
            <span className="badge-tech">{projet.technologie}</span>
            <h1 className="details-title">{projet.libelle}</h1>
            <p className="hero-subtitle" style={{ margin: '0', textAlign: 'left' }}>Une solution innovante développée avec rigueur.</p>
          </div>
        </div>

        <div className="details-body">
          <div className="details-section">
            <h3>À propos du projet</h3>
            <p className="details-description-text">{projet.description}</p>
          </div>
          
          <div className="details-sidebar">
             <div className="cta-box">
                <h4>Ce projet vous intéresse ?</h4>
                <p>Besoin d'une infrastructure similaire ou d'une expertise Cloud/Réseaux ?</p>
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => navigate('/contact')}>
                  Me contacter 📨
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
