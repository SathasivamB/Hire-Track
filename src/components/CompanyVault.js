import React, { useState } from 'react';
// Institutional Placement Portal - Company Vault
import { Lock, Unlock, PlayCircle, Zap } from 'lucide-react';
import './CompanyVault.css';

const CompanyLogo = ({ company }) => {
  const [error, setError] = useState(false);
  
  if (error || !company.logo || company.logo.length < 5) {
    return (
      <div style={{ fontSize: '2rem', fontWeight: 'bold', color: company.color || 'var(--brand-blue)' }}>
        {company.name[0]}
      </div>
    );
  }
  
  return (
    <img 
      src={company.logo} 
      alt={company.name} 
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      onError={() => setError(true)}
    />
  );
};

const CompanyVault = ({ exp, setExp, totalExp, unlockedCompanies, setUnlockedCompanies, setActiveTab, setActiveCompany, companies, userProfile }) => {
  const [notification, setNotification] = useState(null);

  const handleUnlock = (company) => {
    if (unlockedCompanies.includes(company.id)) return;
    
    if (exp >= company.cost) {
      const newExp = exp - company.cost;
      const newUnlocked = [...unlockedCompanies, company.id];
      
      setExp(newExp);
      setUnlockedCompanies(newUnlocked);
      
      // Persist to backend
      if (userProfile && userProfile.email) {
        fetch(`/api/users/${encodeURIComponent(userProfile.email)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            exp: newExp,
            totalExp: totalExp,
            unlockedCompanies: newUnlocked
          })
        }).catch(err => console.error('Error syncing unlock:', err));
      }

      setNotification(`Successfully unlocked ${company.name} vault!`);
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification(`Not enough EXP to unlock ${company.name}. Need ${company.cost - exp} more.`);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="container">
      <div className="vault-header fade-up">
        <h2 className="section-title">Company Vault</h2>
        <p className="section-subtitle">Use your earned EXP to unlock premium company-specific aptitude formats.</p>
        
        <div className="current-exp-badge">
          <span>Available Balance:</span>
          <strong><Zap size={16} color="#f59e0b" /> {exp} EXP</strong>
        </div>
      </div>

      {notification && (
        <div className={`vault-notification fade-up ${notification.includes('Not enough') ? 'error' : 'success'}`}>
          {notification}
        </div>
      )}

      {(!companies || companies.length === 0) ? (
        <div className="fade-up" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-tertiary)', background: 'var(--card-bg)', borderRadius: '24px', border: '1px dashed var(--border-light)' }}>
          <div className="loading-spinner" style={{ marginBottom: '20px' }}>⌛</div>
          <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Initializing Company Vault...</h3>
          <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>Fetching latest placement data from the server.</p>
        </div>
      ) : (
        <div className="vault-grid fade-up delay-100">
          {companies.map(company => {
            const isUnlocked = unlockedCompanies.includes(company.id);
            const canAfford = exp >= company.cost;

            return (
              <div key={company.id} className={`vault-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
                <div className="vault-card-top">
                  <div className="company-logo-large" style={{ backgroundColor: 'var(--bg-primary)', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CompanyLogo company={company} />
                  </div>
                  <div className="vault-status">
                    {isUnlocked ? (
                      <span className="status-badge unlocked"><Unlock size={14}/> Unlocked</span>
                    ) : (
                      <span className="status-badge locked"><Lock size={14}/> Locked</span>
                    )}
                  </div>
                </div>
                
                <div className="vault-info">
                  <h3>{company.name}</h3>
                  <span className="company-type">{company.type}</span>
                </div>

                <div className="vault-action">
                  {isUnlocked ? (
                    <button 
                      className="btn btn-outline w-full play-btn"
                      onClick={() => {
                        setActiveCompany(company.id);
                        setActiveTab('practice');
                      }}
                    >
                      <PlayCircle size={18} /> Practice Set
                    </button>
                  ) : (
                    <button 
                      className={`btn w-full unlock-btn ${canAfford ? 'can-afford' : 'cannot-afford'}`}
                      onClick={() => handleUnlock(company)}
                    >
                      <Lock size={16} /> Unlock for {company.cost} EXP
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CompanyVault;
