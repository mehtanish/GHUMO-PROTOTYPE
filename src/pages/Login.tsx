import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Mail, Compass } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    const success = login(email);
    if (success) {
      navigate('/app');
    } else {
      setError('Account not found. Please create an account.');
    }
  };

  return (
    <div className="auth-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <Card variant="glass" padding="lg" style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <Compass size={48} color="var(--color-accent-gold)" />
          </div>
          <h2>Welcome back</h2>
          <p className="text-secondary">Enter your email to sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
            Sign In
          </Button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <p className="text-secondary">
            Don't have an account? <Link to="/register" style={{ color: 'var(--color-accent-gold)' }}>Create one</Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
