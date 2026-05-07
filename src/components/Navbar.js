import React, { useState, useEffect } from 'react';
import { Briefcase, Shield, Target, Activity, LogOut, Trophy, User, Sun, Moon, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ activeTab, setActiveTab, exp, level, expProgress }) => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div 
          className="nav-brand" 
          onClick={() => setActiveTab('dashboard')}
          style={{ cursor: 'pointer' }}
        >
          <div className="brand-icon">
            <Briefcase size={20} strokeWidth={2.5} />
          </div>
          <div className="brand-info">
            <span className="brand-text">HireTrack</span>
            <span className="brand-subtitle">Placement Portal</span>
          </div>
        </div>
        
        <nav className={`nav-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
          >
            <Activity size={18} /> Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => { setActiveTab('leaderboard'); setIsMobileMenuOpen(false); }}
          >
            <Trophy size={18} /> Leaderboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'vault' ? 'active' : ''}`}
            onClick={() => { setActiveTab('vault'); setIsMobileMenuOpen(false); }}
          >
            <Shield size={18} /> Vault
          </button>
          <button 
            className={`nav-btn ${activeTab === 'predictor' ? 'active' : ''}`}
            onClick={() => { setActiveTab('predictor'); setIsMobileMenuOpen(false); }}
          >
            <Target size={18} /> Predictor
          </button>
          <button 
            className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => { setActiveTab('profile'); setIsMobileMenuOpen(false); }}
          >
            <User size={18} /> Profile
          </button>
        </nav>

        <div className="nav-actions">
          <div className="theme-switch-wrapper">
            <button 
              onClick={toggleTheme}
              className={`theme-switch ${theme}`}
              title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              <div className="switch-handle">
                {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
              </div>
              <div className="switch-icons">
                <Sun size={12} className="icon-sun" />
                <Moon size={12} className="icon-moon" />
              </div>
            </button>
          </div>
          <div className="user-stats-pill">
            <div className="level-badge">Lv. {level}</div>
            <div className="exp-info">
              <span className="exp-text">{exp} XP</span>
              <div className="exp-bar-bg">
                <div className="exp-bar-fill" style={{ width: `${expProgress}%` }}></div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="logout-btn"
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="mobile-menu-btn"
            title="Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
