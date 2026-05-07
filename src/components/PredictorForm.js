import React, { useState } from 'react';
import { Loader2, ArrowRight } from 'lucide-react';
import './PredictorForm.css';

const PredictorForm = ({ userProfile, companies, stats }) => {
  const calculateAverageMastery = (accuracy) => {
    const safeAcc = accuracy || 0;
    const shifts = [5, -2, 0, 3, -1, 2];
    const masteries = shifts.map(s => Math.min(100, Math.max(0, safeAcc + s)));
    return Math.floor(masteries.reduce((a, b) => a + b, 0) / masteries.length);
  };

  const getCompanyAptitude = (companyId) => {
    if (!stats || !stats.history) return calculateAverageMastery(userProfile.accuracy);
    
    const companyHistory = stats.history.filter(h => h.company === companyId);
    if (companyHistory.length > 0) {
      // Return average accuracy for this specific company
      const totalAcc = companyHistory.reduce((sum, h) => sum + (h.accuracy || 0), 0);
      return Math.round(totalAcc / companyHistory.length);
    }
    
    // Fallback to average mastery
    return calculateAverageMastery(userProfile.accuracy);
  };

  const [formData, setFormData] = useState({
    cgpa: '',
    aptitudeScore: userProfile ? calculateAverageMastery(userProfile.accuracy) : '',
    hackathons: '',
    internships: '',
    projects: '',
    targetCompany: companies && companies.length > 0 ? companies[0].id : 'StartupInc'
  });

  React.useEffect(() => {
    const newScore = getCompanyAptitude(formData.targetCompany);
    setFormData(prev => ({ ...prev, aptitudeScore: newScore }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.targetCompany, userProfile, stats]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      const score = (
        (parseFloat(formData.cgpa) * 10) + 
        (parseFloat(formData.aptitudeScore)) + 
        (parseInt(formData.hackathons) * 5) + 
        (parseInt(formData.internships) * 10) + 
        (parseInt(formData.projects) * 5)
      ) / 3.5;
      
      const selectedCompany = companies.find(c => c.id === formData.targetCompany);
      let modifier = 1.0;
      if (selectedCompany) {
        if (selectedCompany.type === 'FAANG') modifier = 0.8;
        else if (selectedCompany.type === 'MNC' || selectedCompany.type === 'Service') modifier = 0.9;
      }

      const prob = Math.min(Math.max(score * modifier, 10), 98);
      setResult({
        probability: prob.toFixed(1),
        status: prob > 75 ? 'Excellent' : prob > 50 ? 'Good' : 'Needs Work'
      });
    }, 1500);
  };

  return (
    <div className="container">
      <div className="predictor-layout">
        <div className="predictor-text fade-up">
          <h2 className="section-title">Evaluate your profile.</h2>
          <p className="section-subtitle">
            Our machine learning model compares your profile against thousands of successfully placed students to determine your current standing in the job market.
          </p>
          
          <ul className="predictor-benefits">
            <li>
              <strong>Instant Analysis</strong>
              <p>Get immediate feedback on your hiring probability.</p>
            </li>
            <li>
              <strong>Data-Driven Insights</strong>
              <p>Understand which areas of your profile need improvement.</p>
            </li>
            <li>
              <strong>Actionable Next Steps</strong>
              <p>Receive personalized recommendations based on your score.</p>
            </li>
          </ul>
        </div>

        <div className="predictor-form-wrapper fade-up delay-200">
          {!result ? (
            <form className="form-card" onSubmit={handleSubmit}>
              <div className="form-header">
                <h3>Academic Profile</h3>
                <p>Fill in your details for a free evaluation.</p>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">CGPA (Out of 10)</label>
                  <input type="number" step="0.01" name="cgpa" className="input-field" placeholder="e.g. 8.5" value={formData.cgpa} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="label">Aptitude Score (%) - Auto Filled</label>
                  <input type="number" name="aptitudeScore" className="input-field" value={formData.aptitudeScore} readOnly style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-tertiary)', cursor: 'not-allowed', opacity: 0.7 }} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">Hackathons</label>
                  <input type="number" name="hackathons" className="input-field" placeholder="Number attended" value={formData.hackathons} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="label">Internships</label>
                  <input type="number" name="internships" className="input-field" placeholder="Number completed" value={formData.internships} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="label">Major Projects</label>
                <input type="number" name="projects" className="input-field" placeholder="Number of significant projects" value={formData.projects} onChange={handleChange} required />
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="label">Target Company</label>
                <select name="targetCompany" className="input-field" value={formData.targetCompany} onChange={handleChange} style={{ padding: '12px', borderRadius: '10px', border: '1px solid var(--border-light)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                  {companies.map(c => (
                    <option key={c.id} value={c.id} style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>{c.name} ({c.type})</option>
                  ))}
                </select>
              </div>

              <button type="submit" className="btn btn-brand w-full submit-btn" disabled={loading}>
                {loading ? <><Loader2 className="animate-spin" size={20} /> Processing...</> : 'Analyze Profile'}
              </button>
            </form>
          ) : (
            <div className="result-card">
              <div className="result-header">
                <h3>Analysis Complete</h3>
                <span className={`result-badge ${result.status.toLowerCase().replace(' ', '-')}`}>
                  {result.status}
                </span>
              </div>
              
              <div className="score-display">
                <div className="score-value">{result.probability}%</div>
                <div className="score-label">Placement Probability</div>
              </div>

              <div className="score-bar-container">
                <div className="score-bar-bg">
                  <div className={`score-bar-fill ${result.status.toLowerCase().replace(' ', '-')}`} style={{width: `${result.probability}%`}}></div>
                </div>
              </div>

              <p className="result-desc">
                {result.status === 'Excellent' 
                  ? 'Your profile is highly competitive. Focus on advanced interview preparation and system design.' 
                  : result.status === 'Good' 
                  ? 'You have a solid foundation. Adding one more major project or internship will boost your chances.'
                  : 'Your profile needs strengthening. Focus on improving your core coding skills and building a portfolio.'}
              </p>

              <button className="btn btn-outline w-full" onClick={() => setResult(null)}>
                Recalculate <ArrowRight size={16} style={{marginLeft: '8px'}} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictorForm;
