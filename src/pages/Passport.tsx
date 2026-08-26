import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Award, Lock, Unlock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Passport.css';

const badges = [
  { id: 'b1', name: 'Heritage Explorer', description: 'Visited 3+ historical monuments', icon: Award, unlocked: true },
  { id: 'b2', name: 'Food Explorer', description: 'Tried 10 local dishes', icon: Award, unlocked: true },
  { id: 'b3', name: 'Culture Collector', description: 'Attended a local festival', icon: Award, unlocked: false },
  { id: 'b4', name: 'Local Supporter', description: 'Hired a student guide', icon: Award, unlocked: true },
  { id: 'b5', name: 'Hidden Gem Hunter', description: 'Visited an offbeat destination', icon: Award, unlocked: false },
  { id: 'b6', name: 'Responsible Traveler', description: 'Impact score > 90', icon: Award, unlocked: false },
];

export const Passport: React.FC = () => {
  const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
  
  return (
    <div className="passport-container">
      <header className="passport-header mb-8 text-center">
        <h1>India Passport</h1>
        <p className="text-secondary text-lg mt-2">Track your journeys, earn badges, and build your traveler profile.</p>
      </header>

      <div className="passport-stats grid grid-3 gap-6 mb-12">
        <Card variant="glass" className="text-center p-6">
          <div className="text-gold text-3xl font-700 mb-2">5/28</div>
          <div className="text-secondary">States Visited</div>
        </Card>
        <Card variant="glass" className="text-center p-6">
          <div className="text-gold text-3xl font-700 mb-2">12</div>
          <div className="text-secondary">Destinations</div>
        </Card>
        <Card variant="glass" className="text-center p-6">
          <div className="text-gold text-3xl font-700 mb-2">3</div>
          <div className="text-secondary">Badges Unlocked</div>
        </Card>
      </div>

      <h2 className="mb-6">Your Badges</h2>
      <div className="badges-grid">
        {badges.map(badge => (
          <Card 
            key={badge.id} 
            variant="interactive" 
            padding="lg" 
            className={`badge-card ${badge.unlocked ? 'unlocked' : 'locked'}`}
            onClick={() => badge.unlocked && setSelectedBadge(badge.id)}
          >
            <div className="badge-icon-wrapper">
              <badge.icon size={32} />
              {!badge.unlocked && <Lock size={16} className="lock-icon" />}
            </div>
            <h3 className="mt-4 text-center">{badge.name}</h3>
            <p className="text-secondary text-sm text-center mt-2">{badge.description}</p>
            {badge.unlocked && (
              <div className="unlock-status mt-4 text-success text-xs flex items-center justify-center gap-1">
                <Unlock size={12} /> Unlocked
              </div>
            )}
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {selectedBadge && (
          <div className="modal-overlay" onClick={() => setSelectedBadge(null)}>
            <motion.div 
              className="passport-modal"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="celebration-rays"></div>
              <div className="badge-icon-wrapper large mx-auto">
                <Award size={64} />
              </div>
              <h2 className="text-center mt-6 text-gold">{badges.find(b => b.id === selectedBadge)?.name}</h2>
              <p className="text-center text-secondary mt-2">
                You earned this badge by completing specific local experiences. Keep exploring to unlock more!
              </p>
              <div className="mt-8 flex justify-center">
                <button className="wanderly-btn wanderly-btn--primary" onClick={() => setSelectedBadge(null)}>Awesome</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
