import React from 'react';

function DetaillerProjet({ projet, modeEdition, onAnnuler, onEditer, onSauvegarder, onChangerChamp }) {
  const gererSoumission = (e) => {
    e.preventDefault();
    onSauvegarder(projet);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>
          {modeEdition ? '✏️ ÉDITION' : '📋 DÉTAILS'}
        </h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {!modeEdition && (
            <button className="btn btn-outline" onClick={onEditer} style={{ padding: '8px 15px' }}>Modifier</button>
          )}
          <button className="btn btn-back" onClick={onAnnuler} style={{ padding: '8px 15px', margin: 0 }}>Fermer</button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
        {!modeEdition ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid var(--border-main)' }}>
              <img src={projet.image} alt={projet.libelle} style={{ width: '100%', display: 'block' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '1rem' }}>{projet.libelle}</h2>
              <span className="badge-tech" style={{ marginBottom: '1.5rem' }}>{projet.technologie}</span>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', fontSize: '1.05rem' }}>{projet.description}</p>
            </div>
            <div style={{ display: 'flex', gap: '2rem', padding: '1.5rem', background: 'var(--bg-card-sub)', borderRadius: '16px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Statut</p>
                <p style={{ fontWeight: '700', color: 'var(--primary)' }}>{projet.statut || 'En cours'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Début</p>
                <p style={{ fontWeight: '700' }}>{projet.dateDebut || 'Non défini'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Fin</p>
                <p style={{ fontWeight: '700' }}>{projet.dateFin || 'En cours'}</p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={gererSoumission} className="contact-form">
            <div className="form-group">
              <label>Libellé</label>
              <input
                type="text"
                value={projet.libelle}
                onChange={(e) => onChangerChamp('libelle', e.target.value)}
                className="champ-saisie"
                required
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                value={projet.image}
                onChange={(e) => onChangerChamp('image', e.target.value)}
                className="champ-saisie"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={projet.description}
                onChange={(e) => onChangerChamp('description', e.target.value)}
                rows="5"
                className="champ-saisie"
                required
              />
            </div>
            <div className="form-group">
              <label>Technologies</label>
              <input
                type="text"
                value={projet.technologie}
                onChange={(e) => onChangerChamp('technologie', e.target.value)}
                className="champ-saisie"
                required
              />
            </div>
            <div className="form-group">
              <label>Statut</label>
              <select
                value={projet.statut || 'En cours'}
                onChange={(e) => onChangerChamp('statut', e.target.value)}
                className="champ-saisie"
              >
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
              </select>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="form-group">
                <label>Date Début</label>
                <input
                  type="date"
                  value={projet.dateDebut}
                  onChange={(e) => onChangerChamp('dateDebut', e.target.value)}
                  className="champ-saisie"
                />
              </div>
              <div className="form-group">
                <label>Date Fin</label>
                <input
                  type="date"
                  value={projet.dateFin}
                  onChange={(e) => onChangerChamp('dateFin', e.target.value)}
                  className="champ-saisie"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>💾 Sauvegarder</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default DetaillerProjet;
