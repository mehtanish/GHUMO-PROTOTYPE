import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Mail, Compass, User } from 'lucide-react';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
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
      navigate('/app');
    } else {
      setError('Email already in use. Please sign in.');
    }
  };

  return (
    <div className="auth-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
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
  );
};
