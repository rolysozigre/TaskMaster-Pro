import React, { useState } from 'react';
import { login } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0,0,0,0.1)',
        padding: '2rem',
      }}>
        <h2 className="text-center mb-3 text-black" style={{ fontWeight: 'bold' }}>TaskMaster Pro</h2>
        <p className="text-center mb-4 text-black">Bienvenue ! Veuillez vous connecter pour poursuivre.</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Votre nom d'utilisateur"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="form-control"
                placeholder="Votre mot de passe"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">Se connecter</button>
        </form>
      </div>
    </div>
  );
}
