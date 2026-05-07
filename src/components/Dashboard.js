import React from 'react';
import { Target, ShieldCheck, Zap, TrendingUp, Award, History, CheckCircle2, Activity, BarChart3 } from 'lucide-react';
import './Dashboard.css';

const Dashboard = ({ exp, level, stats, unlockedCompanies, setActiveTab, userProfile, globalRank }) => {
  // Use real history from user profile or stats
  const history = stats.history || userProfile.history || [];

  const categoryList = [
    { name: 'Quantitative', color: '#3b82f6', icon: <Target size={14} />, shift: 5 },
    { name: 'Logical', color: '#8b5cf6', icon: <Activity size={14} />, shift: -2 },
    { name: 'Verbal', color: '#06b6d4', icon: <CheckCircle2 size={14} />, shift: 0 },
    { name: 'DSA', color: '#f59e0b', icon: <BarChart3 size={14} />, shift: 3 },
    { name: 'System Design', color: '#10b981', icon: <ShieldCheck size={14} />, shift: -1 },
    { name: 'Technical', color: '#ec4899', icon: <Zap size={14} />, shift: 2 },
  ];

  const categories = categoryList.map(cat => ({
    ...cat,
    score: stats.questionsAnswered > 0 ? Math.min(100, Math.max(0, stats.accuracy + cat.shift)) : 0
  }));

  return (
    <div className="dashboard-container">
      {/* Premium Profile Header */}
      <div className="profile-hero fade-up">
        <div className="profile-cover" style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          height: '240px',
          borderRadius: '24px',
          position: 'relative',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          <div style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', height: '120%', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)', transform: 'rotate(-15deg)' }}></div>
          <div style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '40%', height: '120%', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)', transform: 'rotate(15deg)' }}></div>

          <div className="profile-info-floating" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            padding: '0 48px',
            position: 'absolute',
            bottom: '40px',
            width: '100%',
            zIndex: 10
          }}>
            <div className="profile-avatar-premium" style={{
              width: '140px',
              height: '140px',
              borderRadius: '35px',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.2)',
              flexShrink: 0
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '28px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '3.5rem',
              }}>
                {userProfile.initials || 'U'}
              </div>
            </div>

            <div className="profile-details-text" style={{ color: 'white', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>{userProfile.name}</h2>
                <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '6px 14px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700', border: '1px solid rgba(74, 222, 128, 0.3)', textTransform: 'uppercase' }}>
                  {userProfile.department || 'B.Sc Computer Technology'} Student
                </span>
              </div>
              <div style={{ display: 'flex', gap: '20px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem' }}>
                <span>Roll No: {userProfile.studentId}</span>
                <span>•</span>
                <span>{userProfile.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid fade-up delay-100" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.9fr 0.9fr', gap: '24px' }}>
        {/* Progress Card */}
        <div className="dash-card stat-card-premium" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800' }}>Overall Progress</h3>
            <div style={{ background: '#fef3c7', color: '#b45309', padding: '6px 14px', borderRadius: '12px', fontSize: '0.875rem', fontWeight: '800' }}>
              <Zap size={16} fill="currentColor" /> {exp} XP
            </div>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '90px', height: '90px' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                <circle cx="18" cy="18" r="16" fill="none" stroke="var(--bg-secondary)" strokeWidth="4" />
                <circle cx="18" cy="18" r="16" fill="none" stroke="url(#dashGrad)" strokeWidth="4" strokeDasharray={`${(exp % 500) / 5}, 100`} strokeLinecap="round" />
                <defs><linearGradient id="dashGrad"><stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#8b5cf6" /></linearGradient></defs>
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--text-primary)' }}>{level}</div>
                <div style={{ fontSize: '0.5rem', fontWeight: 'bold', color: 'var(--text-tertiary)' }}>LEVEL</div>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
                <span>Skill Mastery</span>
                <span>{Math.floor((exp % 500) / 5)}%</span>
              </div>
              <div style={{ height: '10px', background: 'var(--bg-secondary)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', width: `${(exp % 500) / 5}%` }}></div>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '12px' }}>Gain {500 - (exp % 500)} more XP for next level.</p>
            </div>
          </div>
        </div>

        <div className="dash-card" style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(254, 243, 199, 0.15)', color: '#f59e0b', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <Award size={24} />
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: '600' }}>College Rank</div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)' }}>#{globalRank || '--'}</div>
        </div>

        <div className="dash-card" style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{ background: 'rgba(254, 242, 242, 0.15)', color: '#ef4444', width: '50px', height: '50px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <TrendingUp size={24} />
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', fontWeight: '600' }}>Challenges Solved</div>
          <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--text-primary)' }}>{stats.questionsAnswered}</div>
        </div>

        {/* Performance Breakdown Section */}
        <div className="dash-card" style={{ gridColumn: 'span 2', padding: '32px' }}>
          <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}><BarChart3 size={20} color="var(--brand-blue)" /> Category-wise Mastery</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {categories.map(cat => (
              <div key={cat.name} style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ color: cat.color }}>{cat.icon}</div>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{cat.score}%</span>
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-tertiary)' }}>{cat.name}</div>
                <div style={{ height: '6px', background: 'var(--border-light)', borderRadius: '3px', marginTop: '10px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: cat.color, width: `${cat.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '32px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: '20px', border: '1px solid var(--border-light)' }}>
            <h4 style={{ margin: '0 0 20px 0', fontSize: '1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}><History size={18} color="var(--brand-blue)"/> Recent Test History</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {history.length > 0 ? history.slice().reverse().map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', background: 'var(--bg-secondary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Award size={16} color="var(--brand-blue)"/></div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{h.company} Prep Test</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{h.date}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '800', color: '#10b981' }}>{h.accuracy}%</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Score: {h.score}</div>
                  </div>
                </div>
              )) : (
                <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8', fontSize: '0.875rem' }}>No history found. Take a test in the Practice Arena!</div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Milestones */}
        <div className="dash-card" style={{ padding: '32px' }}>
          <h3 style={{ marginBottom: '24px', fontSize: '1.125rem' }}>Unlocked Success</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)', borderRadius: '16px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--brand-blue)', textTransform: 'uppercase', marginBottom: '8px' }}>Current Goal</div>
              <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>Unlock Google Prep</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--brand-blue)', marginTop: '4px' }}>{Math.min(100, (exp/2000)*100).toFixed(0)}% Completed</div>
            </div>
            
            <div style={{ marginTop: '10px' }}>
              <h4 style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)', marginBottom: '16px' }}>Mastery Badges</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {unlockedCompanies.map(c => (
                  <div key={c} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '6px 12px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                    <ShieldCheck size={12} color="#10b981" /> {c}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button onClick={() => setActiveTab('vault')} className="btn btn-outline w-full" style={{ marginTop: '24px' }}>Explore Company Vault</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
