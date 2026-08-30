import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Mail, Compass, User } from 'lucide-react';
import CardSwap, { Card as SwapCard } from '../components/CardSwap/CardSwap';
import Topography from '../components/Topography';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const { register } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = register(name, email);
    if (success) {
      setIsLoggingIn(true);
      
      // Step timeouts
      setTimeout(() => setLoadingStep(1), 1200);
      setTimeout(() => setLoadingStep(2), 2400);
      setTimeout(() => setLoadingStep(3), 3600);

      // Final redirect
      setTimeout(() => {
        navigate('/app');
      }, 4500);
    } else {
      setError('Email already in use. Please sign in.');
    }
  };

  if (isLoggingIn) {
    return (
      <div className="login-loading-screen">
        <div className="login-loading-container">
          {/* Progress / Step List */}
          <div className="login-loading-left">
            <div>
              <h1 className="login-loading-title">Welcome to Ghumo, {name.split(' ')[0]}</h1>
              <p className="login-loading-subtitle">Initializing your traveler profile and personalizing your dashboard...</p>
            </div>
            
            <div className="login-loading-steps">
              <div className={`login-loading-step ${loadingStep === 0 ? 'login-loading-step--active' : ''} ${loadingStep > 0 ? 'login-loading-step--done' : ''}`}>
                <div className="step-indicator">
                  {loadingStep > 0 ? '✓' : '1'}
                </div>
                <div className="step-text">Creating traveler account and secure credentials...</div>
              </div>

              <div className={`login-loading-step ${loadingStep === 1 ? 'login-loading-step--active' : ''} ${loadingStep > 1 ? 'login-loading-step--done' : ''} ${loadingStep < 1 ? 'opacity-50' : ''}`}>
                <div className="step-indicator">
                  {loadingStep > 1 ? '✓' : '2'}
                </div>
                <div className="step-text">Setting up default passport bookmarks...</div>
              </div>

              <div className={`login-loading-step ${loadingStep === 2 ? 'login-loading-step--active' : ''} ${loadingStep > 2 ? 'login-loading-step--done' : ''} ${loadingStep < 2 ? 'opacity-50' : ''}`}>
                <div className="step-indicator">
                  {loadingStep > 2 ? '✓' : '3'}
                </div>
                <div className="step-text">Mapping curated student guides & travel feeds...</div>
              </div>
            </div>
          </div>

          {/* CardSwap Animation */}
          <div className="login-loading-right">
            <CardSwap
              width={340}
              height={220}
              cardDistance={40}
              verticalDistance={45}
              delay={1200}
              pauseOnHover={false}
              skewAmount={4}
            >
              <SwapCard style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1477584305150-e07a7ad61177?q=80&w=600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.25rem',
                borderRadius: '16px',
                color: '#fff',
                boxShadow: '0 12px 36px rgba(0,0,0,0.6)'
              } as React.CSSProperties}>
                <div style={{ background: 'rgba(5, 7, 12, 0.65)', backdropFilter: 'blur(8px)', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 style={{ color: 'var(--color-accent-gold, #FFB800)', margin: 0, fontSize: '15px', fontWeight: 700 }}>Jaipur</h4>
                  <p style={{ fontSize: '11px', margin: '4px 0 0', opacity: 0.85 }}>Preparing heritage walks...</p>
                </div>
              </SwapCard>
              <SwapCard style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.25rem',
                borderRadius: '16px',
                color: '#fff',
                boxShadow: '0 12px 36px rgba(0,0,0,0.6)'
              }}>
                <div style={{ background: 'rgba(5, 7, 12, 0.65)', backdropFilter: 'blur(8px)', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 style={{ color: 'var(--color-accent-gold, #FFB800)', margin: 0, fontSize: '15px', fontWeight: 700 }}>Kerala</h4>
                  <p style={{ fontSize: '11px', margin: '4px 0 0', opacity: 0.85 }}>Mapping backwater houseboats...</p>
                </div>
              </SwapCard>
              <SwapCard style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.25rem',
                borderRadius: '16px',
                color: '#fff',
                boxShadow: '0 12px 36px rgba(0,0,0,0.6)'
              }}>
                <div style={{ background: 'rgba(5, 7, 12, 0.65)', backdropFilter: 'blur(8px)', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 style={{ color: 'var(--color-accent-gold, #FFB800)', margin: 0, fontSize: '15px', fontWeight: 700 }}>Varanasi</h4>
                  <p style={{ fontSize: '11px', margin: '4px 0 0', opacity: 0.85 }}>Scheduling sunset Ganga aarti walks...</p>
                </div>
              </SwapCard>
              <SwapCard style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?q=80&w=600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '1.25rem',
                borderRadius: '16px',
                color: '#fff',
                boxShadow: '0 12px 36px rgba(0,0,0,0.6)'
              }}>
                <div style={{ background: 'rgba(5, 7, 12, 0.65)', backdropFilter: 'blur(8px)', padding: '0.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 style={{ color: 'var(--color-accent-gold, #FFB800)', margin: 0, fontSize: '15px', fontWeight: 700 }}>Hampi</h4>
                  <p style={{ fontSize: '11px', margin: '4px 0 0', opacity: 0.85 }}>Verifying historic ruins tours...</p>
                </div>
              </SwapCard>
            </CardSwap>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <Topography
          lowColor="#1A0B2E"
          midColor="#FFB800"
          highColor="#FFFFFF"
          speed={0.35}
          morphAmount={3.0}
          morphSpeed={0.05}
          bands={2.0}
          thickness={0.01}
          scale={1.0}
          pixelSize={1.0}
          glow={0.5}
          colorMode="elevation"
          contrast={3.0}
          brightness={1.0}
          fillBands={false}
          opacity={0.7}
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseRadius={0.3}
          mouseStrength={0.4}
        />
      </div>
      <div className="auth-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', width: '100%' }}>
      <Card variant="glass" padding="lg" style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Compass size={48} color="var(--color-accent-gold)" />
          </div>
          <h2>Create an account</h2>
          <p className="text-secondary">Join Ghumo to plan your next adventure</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Input 
            label="Full Name" 
            type="text" 
            placeholder="John Doe"
            icon={User}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
          />
          
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="name@example.com"
            icon={Mail}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            error={error}
          />
          
          <Button type="submit" variant="primary" fullWidth>
            Create Account
          </Button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p className="text-secondary">
            Already have an account? <Link to="/login" style={{ color: 'var(--color-accent-gold)' }}>Sign in</Link>
          </p>
        </div>
      </Card>
    </div>
    </>
  );
};
