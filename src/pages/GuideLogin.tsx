import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { mockGuides, setActiveGuideUser } from '../store/guideStore';
import { GraduationCap, ShieldCheck, ArrowRight, Upload, Lock, Mail, User, Building, CheckCircle } from 'lucide-react';
import './GuideLogin.css';

export const GuideLogin: React.FC = () => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  // Sign in state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [university, setUniversity] = useState('');
  const [studentId, setStudentId] = useState('');
  const [city, setCity] = useState('Srinagar (Kashmir)');
  const [idFileUploaded, setIdFileUploaded] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default to Zahra Wani if email contains kashmir or default, else Rahul Sharma
    const emailLower = loginEmail.toLowerCase();
    if (emailLower.includes('jaipur') || emailLower.includes('rahul')) {
      setActiveGuideUser('g1');
    } else if (emailLower.includes('udaipur') || emailLower.includes('vikram')) {
      setActiveGuideUser('g3');
    } else {
      setActiveGuideUser('g2'); // Default Zahra Wani
    }
    navigate('/guide-portal');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg('Student verification successful! Creating your guide profile...');
    
    // Register custom guide
    const newGuideId = 'g_custom_' + Date.now();
    const newGuide = {
      id: newGuideId,
      name: regName || 'Verified Student Guide',
      city: city.split(' ')[0],
      university: university || 'Kashmir University',
      languages: ['English', 'Hindi'],
      specialities: ['Heritage', 'Local Culture', 'Food Walks'],
      rating: 5.0,
      reviews: 1,
      price: 199,
      isOnline: true,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(regName || 'Guide')}`
    };

    mockGuides.unshift(newGuide);
    setActiveGuideUser(newGuideId);

    setTimeout(() => {
      navigate('/guide-portal');
    }, 1200);
  };

  return (
    <div className="guide-login-container">
      <div className="guide-login-card-wrapper">
        <Card className="guide-login-card">
          <div className="guide-login-header">
            <div className="portal-badge">
              <GraduationCap size={22} />
              <span>Student Guide Portal</span>
            </div>
            <h2>{isRegistering ? 'Register as Student Guide' : 'Guide Sign In'}</h2>
            <p className="text-secondary">
              {isRegistering
                ? 'Verify your student credentials to start hosting travelers and earning.'
                : 'Enter your university email and password to access your booked sessions.'}
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="auth-tab-switch">
            <button
              className={`auth-tab-btn ${!isRegistering ? 'active' : ''}`}
              onClick={() => { setIsRegistering(false); setSuccessMsg(''); }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab-btn ${isRegistering ? 'active' : ''}`}
              onClick={() => { setIsRegistering(true); setSuccessMsg(''); }}
            >
              Register & Verify Student ID
            </button>
          </div>

          {successMsg && (
            <div className="verification-success-alert">
              <CheckCircle size={18} />
              <span>{successMsg}</span>
            </div>
          )}

          {!isRegistering ? (
            /* Sign In Form */
            <form onSubmit={handleLogin} className="guide-login-form">
              <div className="form-group">
                <label>University Email ID</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    className="input-field-padded"
                    placeholder="e.g. zahra.wani@kashmiruniv.edu.in"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    className="input-field-padded"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={e => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-4">
                Sign In to Guide Portal <ArrowRight size={18} style={{ marginLeft: 8 }} />
              </Button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegister} className="guide-login-form">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    className="input-field-padded"
                    placeholder="e.g. Zahra Wani"
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>University Email ID (.edu / .ac.in)</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    className="input-field-padded"
                    placeholder="e.g. student@kashmiruniv.ac.in"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>University / Institution Name</label>
                <div className="input-with-icon">
                  <Building size={18} className="input-icon" />
                  <input
                    type="text"
                    className="input-field-padded"
                    placeholder="e.g. Kashmir University, Srinagar"
                    value={university}
                    onChange={e => setUniversity(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row-grid">
                <div className="form-group">
                  <label>Student ID Roll No.</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="e.g. KU-2024-8842"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Guiding City</label>
                  <select
                    className="input-field"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  >
                    <option value="Srinagar (Kashmir)">Srinagar (Kashmir)</option>
                    <option value="Jaipur (Rajasthan)">Jaipur (Rajasthan)</option>
                    <option value="Udaipur (Rajasthan)">Udaipur (Rajasthan)</option>
                    <option value="Jaisalmer (Rajasthan)">Jaisalmer (Rajasthan)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Verify Student Status (Upload Student ID Card)</label>
                <div
                  className={`file-upload-box ${idFileUploaded ? 'uploaded' : ''}`}
                  onClick={() => setIdFileUploaded(true)}
                >
                  <Upload size={20} />
                  <span>
                    {idFileUploaded ? '✅ Student ID Card Verified' : 'Click to Upload College ID Photo / Certificate'}
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label>Create Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    className="input-field-padded"
                    placeholder="Create secure password"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-4">
                Verify Student & Create Guide Account <ShieldCheck size={18} style={{ marginLeft: 8 }} />
              </Button>
            </form>
          )}

          <div className="guide-login-footer">
            <ShieldCheck size={16} className="verified-icon" />
            <span>Strict Student Verification Powered by Ghumo Network</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
