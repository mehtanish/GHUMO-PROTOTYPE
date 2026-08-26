import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { mockDestinations, themes } from '../store/mockData';
import { MapPin, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import './Landing.css';

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop" 
            alt="India Heritage" 
            className="hero-img"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Experience India Like a Local.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle text-secondary"
          >
            Discover places, plan your journey, connect with locals and experience India beyond the tourist map.
          </motion.p>
          
          <motion.div 
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" variant="primary" onClick={() => navigate('/login')}>
              Plan My Trip
            </Button>
            <Button size="lg" variant="glass" onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore India
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Explore India Section */}
      <section id="explore" className="landing-section">
        <div className="section-header">
          <h2 className="section-title">Explore India</h2>
          <p className="text-secondary">Discover the diverse beauty of the subcontinent.</p>
        </div>
        
        <div className="destinations-grid">
          {mockDestinations.map(dest => (
            <Card key={dest.id} variant="interactive" padding="none" className="destination-card">
              <div className="destination-img-container">
                <img src={dest.image} alt={dest.name} className="destination-img" />
                <div className="destination-overlay">
                  <div className="destination-rating">
                    <Star size={14} fill="currentColor" /> {dest.rating}
                  </div>
                </div>
              </div>
              <div className="destination-info">
                <h3>{dest.name}</h3>
                <div className="destination-region">
                  <MapPin size={14} /> {dest.region}
                </div>
                <p className="text-sm text-secondary mt-2">{dest.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* India is Not One Destination */}
      <section className="landing-section bg-surface">
        <div className="section-header text-center">
          <h2 className="section-title">India is not one destination</h2>
          <p className="text-secondary">It's a continent of experiences waiting to be discovered.</p>
        </div>

        <div className="themes-grid">
          {themes.map(theme => (
            <div key={theme.name} className="theme-card">
              <img src={theme.image} alt={theme.name} className="theme-img" />
              <div className="theme-overlay">
                <h3>{theme.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Go Beyond the Tourist Map */}
      <section className="landing-section">
        <div className="beyond-container">
          <div className="beyond-content">
            <h2>Go beyond the tourist map</h2>
            <p className="text-secondary mt-4 mb-8">
              Connect with local student guides, uncover hidden gems, and experience authentic culture that you won't find in standard itineraries.
            </p>
            <ul className="beyond-list">
              <li>Local Food & Markets</li>
              <li>Student Recommendations</li>
              <li>Cultural Experiences</li>
              <li>Hidden Gems</li>
            </ul>
            <div className="mt-8">
              <Button variant="primary">Start Your Journey</Button>
            </div>
          </div>
          <div className="beyond-image-container">
            <img 
              src="https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop" 
              alt="Local Experience" 
              className="beyond-img"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
