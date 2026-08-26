import React from 'react';
import { Card } from '../components/Card';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { Heart, Users, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export const ImpactScore: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: 'var(--spacing-8)' }}>
      <header className="text-center mb-12">
        <h1>Your Impact</h1>
        <p className="text-secondary text-lg mt-2">See how your travel choices support local communities.</p>
      </header>

      <Card padding="lg" style={{ textAlign: 'center', marginBottom: 'var(--spacing-12)' }}>
        <div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
          <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="50" cy="50" r="40" fill="transparent" stroke="var(--color-surface-hover)" strokeWidth="8" />
            <motion.circle 
              cx="50" cy="50" r="40" 
              fill="transparent" 
              stroke="var(--color-success)" 
              strokeWidth="8" 
              strokeDasharray="251.2"
              initial={{ strokeDashoffset: 251.2 }}
              animate={{ strokeDashoffset: 251.2 - (251.2 * 87 / 100) }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-success)', lineHeight: 1 }}>
              <AnimatedNumber value={87} />
            </span>
            <span className="text-secondary text-sm mt-1">/ 100</span>
          </div>
        </div>
        <h3 className="mt-6">Excellent Contributor</h3>
        <p className="text-secondary mt-2">You are in the top 15% of responsible travelers on Ghumo.</p>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-6)' }}>
        <Card variant="glass" style={{ padding: 'var(--spacing-6)', display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(42, 157, 143, 0.1)', color: 'var(--color-success)', borderRadius: '50%' }}>
            <Users size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>2</div>
            <div className="text-secondary text-sm">Students Supported</div>
          </div>
        </Card>
        
        <Card variant="glass" style={{ padding: 'var(--spacing-6)', display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(248, 150, 30, 0.1)', color: 'var(--color-accent-gold)', borderRadius: '50%' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>5</div>
            <div className="text-secondary text-sm">Local Businesses</div>
          </div>
        </Card>
        
        <Card variant="glass" style={{ padding: 'var(--spacing-6)', display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(63, 55, 201, 0.1)', color: 'var(--color-secondary-blue)', borderRadius: '50%' }}>
            <Heart size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>8</div>
            <div className="text-secondary text-sm">Artisans</div>
          </div>
        </Card>
        
        <Card variant="glass" style={{ padding: 'var(--spacing-6)', display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
          <div style={{ padding: '12px', backgroundColor: 'rgba(114, 9, 183, 0.1)', color: 'var(--color-secondary-purple)', borderRadius: '50%' }}>
            <TrendingUp size={24} />
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>₹4.2k</div>
            <div className="text-secondary text-sm">Direct Local Spend</div>
          </div>
        </Card>
      </div>
    </div>
  );
};
