import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Bot, Users } from 'lucide-react';

export const AskLocal: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: 'var(--spacing-8)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-12)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-2)' }}>Ask a Local</h1>
        <p className="text-secondary text-lg">How would you like help today?</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-8)' }}>
        <Card 
          variant="interactive" 
          padding="lg" 
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--spacing-6)' }}
          onClick={() => navigate('/app/ai')}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(63, 55, 201, 0.2)', color: 'var(--color-secondary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={40} />
          </div>
          <div>
            <h2>AI Assistant</h2>
            <p className="text-secondary mt-2">Get instant, personalized recommendations based on your Trip DNA.</p>
          </div>
        </Card>

        <Card 
          variant="interactive" 
          padding="lg" 
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--spacing-6)' }}
          onClick={() => navigate('/app/guides')}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(248, 150, 30, 0.2)', color: 'var(--color-accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={40} />
          </div>
          <div>
            <h2>Local Expert</h2>
            <p className="text-secondary mt-2">Connect with a local student guide for authentic, real-time insights.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
