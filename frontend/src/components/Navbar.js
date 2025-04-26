import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from './AuthContext';
import { FontSizeControls } from "./FontSizeControls";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <header className="theater-header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo">
            <Link to="/" className="logo-link">
              <span className="logo-primary">Teatro</span>
              <span className="logo-secondary">Online</span>
            </Link>
          </div>

          <nav className="desktop-nav">
            <Link to="/" className="nav-link">Strona Główna</Link>
            <Link to="/spektakle" className="nav-link">Spektakle</Link>
            <Link to="/repertuar" className="nav-link">Repertuar</Link>
            <Link to="/cennik" className="nav-link">Cennik</Link>
            <Link to="/regulamin" className="nav-link">Regulamin</Link>
            {user && (
              <Link to="/moje-rezerwacje" className="nav-link">
                Moje rezerwacje
              </Link>
            )}
          </nav>

          <div className="auth-buttons">
            {user ? (
              <button onClick={handleLogout} className="auth-button logout-button">
                <svg className="icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Wyloguj się
              </button>
            ) : (
              <Link to="/login">
                <button className="auth-button login-button">
                  <svg className="icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  Zaloguj się / Zarejestruj się
                </button>
              </Link>

            )}
          </div>
          <FontSizeControls />
        </div>
      </div>
    </header>
  );
}
