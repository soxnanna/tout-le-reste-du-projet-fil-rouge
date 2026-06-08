import React from 'react';

/**
 * StatsPanel Component
 * Displays statistics cards matching the requested layout:
 * - Total Projects/Certs
 * - In Progress
 * - Completed
 * - Archived
 * 
 * Props:
 * - items: Array of projects or certifications
 * - labelType: 'projets' or 'certifications'
 */
function StatsPanel({ items = [], labelType = 'projets' }) {
  const total = items.length;
  
  // Calculate counts based on 'statut' field
  const enCours = items.filter(item => item.statut === 'En cours').length;
  const termines = items.filter(item => item.statut === 'Terminé').length;

  const typeText = labelType === 'projets' ? 'Projets total' : 'Certifications total';
  const terminesText = labelType === 'projets' ? 'Terminés' : 'Obtenues';

  return (
    <div className="stats-section">
      <div className="stats-header">
        <span className="stats-subtitle">VUE D'ENSEMBLE</span>
        <h2 className="stats-main-title">Statistiques</h2>
        <div className="stats-title-underline"></div>
      </div>

      <div className="stats-grid">
        {/* Card 1: Total */}
        <div className="stats-card total-card">
          <div className="stats-card-inner">
            <div className="stats-icon-wrapper">
              <svg className="stats-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stats-info">
              <span className="stats-number">{total}</span>
              <span className="stats-label">{typeText}</span>
            </div>
          </div>
        </div>

        {/* Card 2: En cours */}
        <div className="stats-card encours-card">
          <div className="stats-card-inner">
            <div className="stats-icon-wrapper">
              <svg className="stats-icon spinner-anim" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 4"/>
                <circle cx="12" cy="12" r="3" fill="currentColor"/>
              </svg>
            </div>
            <div className="stats-info">
              <span className="stats-number">{enCours}</span>
              <span className="stats-label">En cours</span>
            </div>
          </div>
        </div>

        {/* Card 3: Terminés */}
        <div className="stats-card termines-card">
          <div className="stats-card-inner">
            <div className="stats-icon-wrapper">
              <svg className="stats-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stats-info">
              <span className="stats-number">{termines}</span>
              <span className="stats-label">{terminesText}</span>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default StatsPanel;
