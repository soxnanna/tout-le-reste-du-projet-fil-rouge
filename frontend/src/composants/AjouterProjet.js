import React, { useState } from 'react';

function AjouterProjet({ onAjouter }) {
  const [formulaire, setFormulaire] = useState({
    libelle: '',
    image: '',
    description: '',
    technologie: '',
    dateDebut: '',
    dateFin: '',
    statut: 'En cours'
  });

  const [formulaireOuvert, setFormulaireOuvert] = useState(false);
  const [erreurs, setErreurs] = useState({});

  const gererChangement = (e) => {
    const { name, value } = e.target;
    setFormulaire(prev => ({ ...prev, [name]: value }));
    if (erreurs[name]) {
      setErreurs(prev => ({ ...prev, [name]: '' }));
    }
  };

  const valider = () => {
    const nouvellesErreurs = {};
    if (!formulaire.libelle.trim()) nouvellesErreurs.libelle = 'Le libellé est obligatoire';
    if (!formulaire.description.trim()) nouvellesErreurs.description = 'La description est obligatoire';
    if (!formulaire.technologie.trim()) nouvellesErreurs.technologie = 'La technologie est obligatoire';
    return nouvellesErreurs;
  };

  const gererSoumission = (e) => {
    e.preventDefault();
    const erreursTrouvees = valider();
    if (Object.keys(erreursTrouvees).length > 0) {
      setErreurs(erreursTrouvees);
      return;
    }

    const nouveauProjet = {
      ...formulaire,
      image: formulaire.image.trim() || `https://via.placeholder.com/600x400?text=${encodeURIComponent(formulaire.libelle)}`
    };

    onAjouter(nouveauProjet);
    setFormulaire({ libelle: '', image: '', description: '', technologie: '', dateDebut: '', dateFin: '', statut: 'En cours' });
    setErreurs({});
    setFormulaireOuvert(false);
  };

  return (
    <div className="ajouter-projet" style={{ marginTop: '4rem' }}>
      <button
        className="btn btn-outline"
        onClick={() => setFormulaireOuvert(!formulaireOuvert)}
        style={{ width: '100%', padding: '20px', borderStyle: 'dashed' }}
      >
        {formulaireOuvert ? '✖ Fermer le formulaire' : '➕ Ajouter un nouveau projet au portfolio'}
      </button>

      {formulaireOuvert && (
        <form className="contact-form-container" onSubmit={gererSoumission} style={{ marginTop: '2rem' }}>
          <h3 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Nouveau <span>Projet</span></h3>

          <div className="contact-form">
            <div className="form-group">
              <label>Libellé du projet *</label>
              <input
                type="text"
                name="libelle"
                value={formulaire.libelle}
                onChange={gererChangement}
                placeholder="Ex: Infrastructure AWS Multi-AZ"
                className="champ-saisie"
              />
              {erreurs.libelle && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{erreurs.libelle}</span>}
            </div>

            <div className="form-group">
              <label>URL de l'image</label>
              <input
                type="text"
                name="image"
                value={formulaire.image}
                onChange={gererChangement}
                placeholder="https://..."
                className="champ-saisie"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formulaire.description}
                onChange={gererChangement}
                placeholder="Détails techniques du projet..."
                rows="4"
                className="champ-saisie"
              />
              {erreurs.description && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{erreurs.description}</span>}
            </div>

            <div className="form-group">
              <label>Technologies *</label>
              <input
                type="text"
                name="technologie"
                value={formulaire.technologie}
                onChange={gererChangement}
                placeholder="React, AWS, Terraform..."
                className="champ-saisie"
              />
              {erreurs.technologie && <span style={{ color: '#ef4444', fontSize: '0.8rem' }}>{erreurs.technologie}</span>}
            </div>

            <div className="form-group">
              <label>Statut *</label>
              <select
                name="statut"
                value={formulaire.statut}
                onChange={gererChangement}
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
                  name="dateDebut"
                  value={formulaire.dateDebut}
                  onChange={gererChangement}
                  className="champ-saisie"
                />
              </div>
              <div className="form-group">
                <label>Date Fin</label>
                <input
                  type="date"
                  name="dateFin"
                  value={formulaire.dateFin}
                  onChange={gererChangement}
                  className="champ-saisie"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              🚀 Enregistrer le projet
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AjouterProjet;
