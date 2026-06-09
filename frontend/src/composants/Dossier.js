import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Projet from './Projet';
import AjouterProjet from './AjouterProjet';
import DetaillerProjet from './DetaillerProjet';

const API_URL = '/api/projets';

function Dossier() {
  const [projets, setProjets] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [vue, setVue] = useState('projets'); // 'projets' | 'certifications' | 'messages'
  const [projetSelectionne, setProjetSelectionne] = useState(null); 
  const [projetAEditer, setProjetAEditer] = useState(null);         
  const [certSelectionne, setCertSelectionne] = useState(null);
  const [certAEditer, setCertAEditer] = useState(null);
  const [recherche, setRecherche] = useState('');      
  const [chargement, setChargement] = useState(true);  
  const [formCertOuvert, setFormCertOuvert] = useState(false);
  const [nouvelleCert, setNouvelleCert] = useState({
    libelle: '',
    organisation: '',
    statut: 'Terminé',
    image: '',
    dateObtention: '',
    lien: ''
  });

  const { id } = useParams();    
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || !userInfo.token) {
      navigate('/login');
    } else {
      chargerProjets();
      chargerCertifications();
      chargerMessages();
    }
  }, []);

  useEffect(() => {
    if (id && projets.length > 0) {
      const projet = projets.find(p => p._id === id);
      if (projet) setProjetSelectionne(projet);
    }
  }, [id, projets]);

  const chargerProjets = async () => {
    try {
      setChargement(true);
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      const reponse = await axios.get(API_URL, config);
      setProjets(reponse.data);
    } catch (erreur) {
      console.error('Erreur projets:', erreur);
    } finally {
      setChargement(false);
    }
  };

  const chargerCertifications = async () => {
    try {
      const reponse = await axios.get('/api/certifications');
      setCertifications(reponse.data);
    } catch (erreur) {
      console.error('Erreur certs:', erreur);
    }
  };

  const chargerMessages = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      const reponse = await axios.get('/api/messages', config);
      setMessages(reponse.data);
    } catch (erreur) {
      console.error('Erreur messages:', erreur);
    }
  };

  const ajouterProjet = async (nouveauProjet) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      const reponse = await axios.post(API_URL, nouveauProjet, config);
      setProjets([...projets, reponse.data]);
    } catch (erreur) {
      console.error('Erreur ajout:', erreur);
    }
  };

  const supprimerProjet = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce projet ?')) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      await axios.delete(`${API_URL}/${id}`, config);
      setProjets(projets.filter(p => p._id !== id));
      if (projetSelectionne && projetSelectionne._id === id) {
        setProjetSelectionne(null);
      }
    } catch (erreur) {
      console.error('Erreur suppression:', erreur);
    }
  };

  const editerProjet = async (projetModifie) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      const reponse = await axios.put(`${API_URL}/${projetModifie._id}`, projetModifie, config);
      setProjets(projets.map(p => p._id === projetModifie._id ? reponse.data : p));
      setProjetSelectionne(reponse.data);
      setProjetAEditer(null);
    } catch (erreur) {
      console.error('Erreur modification:', erreur);
    }
  };

  const ajouterCertification = async (nouvelleCert) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      const reponse = await axios.post('/api/certifications', nouvelleCert, config);
      setCertifications([...certifications, reponse.data]);
    } catch (erreur) {
      console.error('Erreur ajout certification:', erreur);
    }
  };

  const supprimerCertification = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette certification ?')) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      await axios.delete(`/api/certifications/${id}`, config);
      setCertifications(certifications.filter(c => c._id !== id));
      if (certSelectionne && certSelectionne._id === id) {
        setCertSelectionne(null);
      }
    } catch (erreur) {
      console.error('Erreur suppression certification:', erreur);
    }
  };

  const editerCertification = async (certModifiee) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const config = { headers: { Authorization: `Bearer ${userInfo?.token}` } };
      const reponse = await axios.put(`/api/certifications/${certModifiee._id}`, certModifiee, config);
      setCertifications(certifications.map(c => c._id === certModifiee._id ? reponse.data : c));
      setCertSelectionne(reponse.data);
      setCertAEditer(null);
    } catch (erreur) {
      console.error('Erreur modification certification:', erreur);
    }
  };

  const afficherDetail = (projet) => {
    setProjetSelectionne(projet);
    setProjetAEditer(null);
  };

  const fermerDetail = () => {
    setProjetSelectionne(null);
    setProjetAEditer(null);
  };

  const projetsFiltres = projets.filter(p =>
    p.libelle.toLowerCase().includes(recherche.toLowerCase())
  );

  const certificationsFiltrees = certifications.filter(c =>
    c.libelle.toLowerCase().includes(recherche.toLowerCase()) ||
    c.organisation.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div className="dossier">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="dashboard-icon">🛡️</div>
          <div>
            <h1 className="section-title" style={{ margin: 0 }}>Espace <span>Gestion</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Gérez vos projets et consultez vos messages.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', marginLeft: 'auto' }}>
            <button 
              className={`filter-btn ${vue === 'projets' ? 'active' : ''}`}
              onClick={() => { setVue('projets'); setRecherche(''); }}
            >
              Projets ({projets.length})
            </button>
            <button 
              className={`filter-btn ${vue === 'certifications' ? 'active' : ''}`}
              onClick={() => { setVue('certifications'); setRecherche(''); }}
            >
              Certifications ({certifications.length})
            </button>
            <button 
              className={`filter-btn ${vue === 'messages' ? 'active' : ''}`}
              onClick={() => { setVue('messages'); setRecherche(''); }}
            >
              Messages ({messages.length})
            </button>
          </div>
        </div>

        <div className="admin-actions-bar">
          {vue === 'projets' ? (
            <>
              <div className="recherche-wrapper">
                <span className="search-icon-v2">🔍</span>
                <input
                  type="text"
                  placeholder="Rechercher un projet..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                  className="champ-recherche-v2"
                />
              </div>
              <button className="btn btn-primary" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                + Nouveau Projet
              </button>
            </>
          ) : vue === 'certifications' ? (
            <>
              <div className="recherche-wrapper">
                <span className="search-icon-v2">🔍</span>
                <input
                  type="text"
                  placeholder="Rechercher une certification..."
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                  className="champ-recherche-v2"
                />
              </div>
              <button className="btn btn-primary" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
                + Nouvelle Certification
              </button>
            </>
          ) : (
            <div style={{ flex: 1, fontWeight: '700', color: 'var(--primary)' }}>
              Boîte de réception des contacts
            </div>
          )}
          
          <button 
            className="btn btn-outline" 
            onClick={() => {
              localStorage.removeItem('userInfo');
              navigate('/login');
            }}
            style={{ padding: '8px 20px', fontSize: '0.8rem' }}
          >
            Déconnexion 🚪
          </button>
        </div>
      </div>

      <div className="dashboard">
        {vue === 'projets' ? (
          <>
            <div className="liste-projets">
              {chargement ? (
                <div className="chargement" style={{ textAlign: 'center', padding: '2rem' }}>⏳ Synchronisation...</div>
              ) : projetsFiltres.length === 0 ? (
                <div className="aucun-projet" style={{ textAlign: 'center', padding: '2rem' }}>
                  {recherche ? `Aucun résultat pour "${recherche}"` : 'Aucun projet disponible.'}
                </div>
              ) : (
                projetsFiltres.map(projet => (
                  <Projet
                    key={projet._id}
                    projet={projet}
                    onSupprimer={supprimerProjet}
                    onAfficherDetail={afficherDetail}
                    isReadOnly={false}
                  />
                ))
              )}
            </div>

            <div className="detail-container">
              {projetSelectionne ? (
                <DetaillerProjet
                  projet={projetAEditer || projetSelectionne}
                  modeEdition={projetAEditer !== null}
                  onAnnuler={fermerDetail}
                  onEditer={() => setProjetAEditer({ ...projetSelectionne })}
                  onSauvegarder={editerProjet}
                  onChangerChamp={(champ, valeur) =>
                    setProjetAEditer(prev => ({ ...prev, [champ]: valeur }))
                  }
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                    <p>Sélectionnez un projet pour l'éditer.</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : vue === 'certifications' ? (
          <>
            <div className="liste-projets">
              {certificationsFiltrees.length === 0 ? (
                <div className="aucun-projet" style={{ textAlign: 'center', padding: '2rem' }}>
                  {recherche ? `Aucun résultat pour "${recherche}"` : 'Aucune certification disponible.'}
                </div>
              ) : (
                certificationsFiltrees.map(cert => (
                  <div key={cert._id} className={`carte-projet ${certSelectionne && certSelectionne._id === cert._id ? 'active' : ''}`} style={{ cursor: 'pointer' }} onClick={() => { setCertSelectionne(cert); setCertAEditer(null); }}>
                    <div className="projet-corps">
                      <span className="projet-techno">{cert.organisation}</span>
                      <h4 style={{ color: 'white', fontSize: '1.2rem', margin: '0.5rem 0' }}>
                        {cert.image || '📜'} {cert.libelle}
                      </h4>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <span style={{ 
                          background: cert.statut === 'En cours' ? 'rgba(217, 119, 6, 0.1)' : cert.statut === 'Terminé' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(100, 116, 139, 0.1)', 
                          color: cert.statut === 'En cours' ? '#fbbf24' : cert.statut === 'Terminé' ? '#34d399' : '#94a3b8', 
                          padding: '4px 10px', 
                          borderRadius: '100px', 
                          fontSize: '0.7rem', 
                          fontWeight: '800' 
                        }}>
                          {cert.statut}
                        </span>
                        <button
                          className="btn btn-supprimer"
                          style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '6px 12px', fontSize: '0.75rem', margin: 0 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            supprimerCertification(cert._id);
                          }}
                        >
                          🗑 Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="detail-container">
              {certSelectionne ? (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-main)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800' }}>
                      {certAEditer ? '✏️ ÉDITION' : '📋 DÉTAILS'}
                    </h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {!certAEditer && (
                        <button className="btn btn-outline" onClick={() => setCertAEditer({ ...certSelectionne })} style={{ padding: '8px 15px' }}>Modifier</button>
                      )}
                      <button className="btn btn-back" onClick={() => { setCertSelectionne(null); setCertAEditer(null); }} style={{ padding: '8px 15px', margin: 0 }}>Fermer</button>
                    </div>
                  </div>

                  <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
                    {!certAEditer ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div>
                          <div style={{ fontSize: '4rem', marginBottom: '1rem', textAlign: 'center' }}>{certSelectionne.image || '📜'}</div>
                          <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', textAlign: 'center' }}>{certSelectionne.libelle}</h2>
                          <p style={{ color: 'var(--primary)', fontWeight: '800', textAlign: 'center', fontSize: '1.1rem' }}>{certSelectionne.organisation}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', background: 'var(--bg-card-sub)', borderRadius: '16px' }}>
                          <div>
                            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Statut</p>
                            <p style={{ fontWeight: '700' }}>{certSelectionne.statut}</p>
                          </div>
                          {certSelectionne.dateObtention && (
                            <div>
                              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Date d'obtention</p>
                              <p style={{ fontWeight: '700' }}>{certSelectionne.dateObtention}</p>
                            </div>
                          )}
                          {certSelectionne.lien && (
                            <div>
                              <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Lien de vérification</p>
                              <a href={certSelectionne.lien} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: '700', textDecoration: 'none' }}>
                                Visiter le site de l'autorité →
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={(e) => { e.preventDefault(); editerCertification(certAEditer); }} className="contact-form">
                        <div className="form-group">
                          <label>Libellé de la certification</label>
                          <input
                            type="text"
                            value={certAEditer.libelle}
                            onChange={(e) => setCertAEditer({ ...certAEditer, libelle: e.target.value })}
                            className="champ-saisie"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Organisation émettrice</label>
                          <input
                            type="text"
                            value={certAEditer.organisation}
                            onChange={(e) => setCertAEditer({ ...certAEditer, organisation: e.target.value })}
                            className="champ-saisie"
                            required
                          />
                        </div>
                        <div className="form-group">
                          <label>Statut</label>
                          <select
                            value={certAEditer.statut}
                            onChange={(e) => setCertAEditer({ ...certAEditer, statut: e.target.value })}
                            className="champ-saisie"
                          >
                            <option value="En cours">En cours</option>
                            <option value="Terminé">Terminé</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label>Icône / Emoji (ex: ☁️, 🛰️, 🐧)</label>
                          <input
                            type="text"
                            value={certAEditer.image}
                            onChange={(e) => setCertAEditer({ ...certAEditer, image: e.target.value })}
                            className="champ-saisie"
                          />
                        </div>
                        <div className="form-group">
                          <label>Date d'obtention</label>
                          <input
                            type="text"
                            value={certAEditer.dateObtention}
                            onChange={(e) => setCertAEditer({ ...certAEditer, dateObtention: e.target.value })}
                            className="champ-saisie"
                          />
                        </div>
                        <div className="form-group">
                          <label>Lien justificatif URL</label>
                          <input
                            type="text"
                            value={certAEditer.lien}
                            onChange={(e) => setCertAEditer({ ...certAEditer, lien: e.target.value })}
                            className="champ-saisie"
                          />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>💾 Sauvegarder</button>
                      </form>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📜</div>
                    <p>Sélectionnez une certification pour l'éditer.</p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="messages-list" style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {messages.length === 0 ? (
              <div className="message-card" style={{ textAlign: 'center' }}>Aucun message reçu.</div>
            ) : (
              messages.map(msg => (
                <div key={msg._id} className="message-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h4 style={{ color: 'var(--primary)', fontSize: '1.2rem', margin: 0 }}>{msg.objet}</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p style={{ marginBottom: '1rem', fontWeight: '800' }}>De : {msg.nom} <span style={{ fontWeight: '400', opacity: 0.7 }}>({msg.email})</span></p>
                  <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>{msg.message}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {vue === 'projets' && <AjouterProjet onAjouter={ajouterProjet} />}

      {vue === 'certifications' && (
        <div className="ajouter-projet" style={{ marginTop: '4rem' }}>
          <button
            className="btn btn-outline"
            onClick={() => setFormCertOuvert(!formCertOuvert)}
            style={{ width: '100%', padding: '20px', borderStyle: 'dashed' }}
          >
            {formCertOuvert ? '✖ Fermer le formulaire' : '➕ Ajouter une nouvelle certification'}
          </button>

          {formCertOuvert && (
            <form className="contact-form-container" onSubmit={(e) => {
              e.preventDefault();
              if (!nouvelleCert.libelle.trim() || !nouvelleCert.organisation.trim()) return;
              ajouterCertification(nouvelleCert);
              setNouvelleCert({ libelle: '', organisation: '', statut: 'Terminé', image: '', dateObtention: '', lien: '' });
              setFormCertOuvert(false);
            }} style={{ marginTop: '2rem' }}>
              <h3 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Nouvelle <span>Certification</span></h3>

              <div className="contact-form">
                <div className="form-group">
                  <label>Libellé de la certification *</label>
                  <input
                    type="text"
                    value={nouvelleCert.libelle}
                    onChange={(e) => setNouvelleCert({ ...nouvelleCert, libelle: e.target.value })}
                    placeholder="Ex: AWS Certified Solutions Architect"
                    className="champ-saisie"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Organisation émettrice *</label>
                  <input
                    type="text"
                    value={nouvelleCert.organisation}
                    onChange={(e) => setNouvelleCert({ ...nouvelleCert, organisation: e.target.value })}
                    placeholder="Ex: Amazon Web Services"
                    className="champ-saisie"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Statut *</label>
                  <select
                    value={nouvelleCert.statut}
                    onChange={(e) => setNouvelleCert({ ...nouvelleCert, statut: e.target.value })}
                    className="champ-saisie"
                  >
                    <option value="En cours">En cours</option>
                    <option value="Terminé">Terminé</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Icône / Emoji (ex: ☁️, 🛰️, 🐧)</label>
                  <input
                    type="text"
                    value={nouvelleCert.image}
                    onChange={(e) => setNouvelleCert({ ...nouvelleCert, image: e.target.value })}
                    placeholder="Ex: ☁️"
                    className="champ-saisie"
                  />
                </div>

                <div className="form-group">
                  <label>Date d'obtention (si obtenue)</label>
                  <input
                    type="text"
                    value={nouvelleCert.dateObtention}
                    onChange={(e) => setNouvelleCert({ ...nouvelleCert, dateObtention: e.target.value })}
                    placeholder="Ex: 2024-01-15"
                    className="champ-saisie"
                  />
                </div>

                <div className="form-group">
                  <label>Lien justificatif URL</label>
                  <input
                    type="text"
                    value={nouvelleCert.lien}
                    onChange={(e) => setNouvelleCert({ ...nouvelleCert, lien: e.target.value })}
                    placeholder="https://..."
                    className="champ-saisie"
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                  🚀 Enregistrer la certification
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

export default Dossier;
