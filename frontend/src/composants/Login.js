import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('userInfo', JSON.stringify(response.data));
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la connexion');
    }
  };

  return (
    <div className="login-container">
      <div className="contact-form-container" style={{ maxWidth: '450px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title">Admin <span>Login</span></h2>
          <p style={{ color: 'var(--text-muted)' }}>Accès réservé à l'administration.</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #ef4444', textAlign: 'center', fontWeight: '600' }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="contact-form">
          <div className="form-group">
            <label>Email Professionnel</label>
            <input 
              className="champ-saisie"
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="soxnanna@gmail.com"
              required 
            />
          </div>
          <div className="form-group">
            <label>Mot de passe</label>
            <input 
              className="champ-saisie"
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
            S'authentifier 🔒
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
