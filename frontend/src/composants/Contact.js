import React, { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', objet: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/messages', form);
      setStatus('SUCCESS');
      setForm({ nom: '', email: '', objet: '', message: '' });
    } catch (err) {
      setStatus('ERROR');
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h1 className="section-title" style={{ textAlign: 'left' }}>
            Parlons de vos <span>projets</span>
          </h1>
          <p className="contact-desc">
            Vous avez une opportunité en Cloud AWS, DevOps ou Administration Systèmes ? 
            Je suis à l'écoute de nouveaux défis passionnants pour construire l'avenir de la tech.
          </p>
          
          <div className="contact-details">
            <div className="detail-item">
              <span className="detail-icon">📧</span>
              <div>
                <p className="detail-label">Email</p>
                <p className="detail-value">soxnanna@gmail.com</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📞</span>
              <div>
                <p className="detail-label">Téléphone</p>
                <p className="detail-value">+221 77 682 20 42</p>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">📍</span>
              <div>
                <p className="detail-label">Localisation</p>
                <p className="detail-value">Dakar, Sénégal</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          {status === 'SUCCESS' && (
            <div style={{ background: 'rgba(34, 211, 238, 0.1)', color: 'var(--accent)', padding: '1.2rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid var(--accent)', textAlign: 'center', fontWeight: '700' }}>
              ✨ Message envoyé avec succès !
            </div>
          )}
          {status === 'ERROR' && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1.2rem', borderRadius: '16px', marginBottom: '2rem', border: '1px solid #ef4444', textAlign: 'center', fontWeight: '700' }}>
              ❌ Une erreur est survenue.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nom complet</label>
              <input 
                className="champ-saisie"
                type="text" 
                placeholder="Votre nom" 
                required 
                value={form.nom}
                onChange={(e) => setForm({ ...form, nom: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Adresse Email</label>
              <input 
                className="champ-saisie"
                type="email" 
                placeholder="votre@email.com" 
                required 
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Objet</label>
              <input 
                className="champ-saisie"
                type="text" 
                placeholder="Sujet du message" 
                required 
                value={form.objet}
                onChange={(e) => setForm({ ...form, objet: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea 
                className="champ-saisie"
                placeholder="Décrivez votre projet..." 
                rows="5" 
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Envoyer le message 📨
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
