import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Composant Projet
 * Affiche le libellé et l'image d'un projet
 */
function Projet({ projet, onSupprimer, onAfficherDetail, isReadOnly }) {
  return (
    <div className="carte-projet">
      {/* Image du projet */}
      <div className="projet-image-container">
        <img
          src={projet.image}
          alt={projet.libelle}
          className="projet-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/600x400?text=Image+non+disponible';
          }}
        />
      </div>

      {/* Corps de la carte */}
      <div className="projet-corps">
        <span className="projet-techno">🛠 {projet.technologie}</span>
        
        <Link
          to={`/projet/${projet._id}`}
          className="projet-libelle"
          onClick={(e) => {
            if (onAfficherDetail) {
              e.preventDefault();
              onAfficherDetail(projet);
            }
          }}
        >
          {projet.libelle}
        </Link>

        {/* Bouton Voir Détails */}
        <button 
          className="btn btn-detail-link" 
          onClick={(e) => {
            e.preventDefault();
            if (onAfficherDetail) onAfficherDetail(projet);
          }}
        >
          Détails du projet →
        </button>

        {/* Bouton Supprimer (masqué si isReadOnly) */}
        {!isReadOnly && (
          <button
            className="btn btn-supprimer"
            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', marginTop: '1rem' }}
            onClick={() => onSupprimer(projet._id)}
          >
            🗑 Supprimer
          </button>
        )}
      </div>
    </div>
  );
}

export default Projet;
