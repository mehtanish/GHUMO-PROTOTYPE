import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { SpecularButton } from '../components/SpecularButton';
import { FlyingPosters } from '../components/FlyingPosters';
import { Card } from '../components/Card';
import { mockDestinations, themes } from '../store/mockData';
import { MapPin, Star, Sparkles, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import './Landing.css';

const FLYING_POSTER_ITEMS = [
  'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=800&auto=format&fit=crop', // Kashmir Dal Lake
  'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800&auto=format&fit=crop', // Jaipur Amer Fort
  'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop', // Udaipur Lake Palace
  'https://images.unsplash.com/photo-1561361066-608b411d7395?q=80&w=800&auto=format&fit=crop', // Varanasi Ganga Ghats
  'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop', // Kerala Backwaters
  'https://images.unsplash.com/photo-1600100397608-f010f443bbf6?q=80&w=800&auto=format&fit=crop', // Hampi Ancient Stone
  'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800&auto=format&fit=crop', // Taj Mahal Agra
  'https://images.unsplash.com/photo-1509233725247-49e657c54213?q=80&w=800&auto=format&fit=crop'  // Thar Desert Golden Dunes
];

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
            <SpecularButton 
              size="lg" 
              tint="var(--color-accent-gold)" 
              tintOpacity={0.2} 
              lineColor="#FFDCA1" 
              baseColor="rgba(255, 184, 0, 0.5)" 
              textColor="#FFF" 
              onClick={() => navigate('/login')}
            >
              Plan My Trip
            </SpecularButton>
            <Button size="lg" variant="glass" onClick={() => document.getElementById('flying-showcase')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore 3D Odyssey
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 3D Flying Posters Interactive Showcase */}
      <section id="flying-showcase" className="flying-posters-showcase-section">
        <div className="section-header text-center">
          <div className="showcase-badge mb-3">
            <Sparkles size={14} className="text-gold mr-1" />
            <span>INTERACTIVE 3D PERSPECTIVE</span>
          </div>
          <h2 className="section-title">Fly Across India's Landscapes</h2>
          <p className="text-secondary max-w-xl mx-auto mt-2">
            Experience the real-time WebGL perspective warp. Drag or scroll inside to float through Himalayan peaks, Rajasthani forts, and tranquil backwaters.
          </p>
        </div>

        <div className="flying-posters-wrapper">
          <div className="flying-posters-overlay-gradient"></div>
          <FlyingPosters 
            items={FLYING_POSTER_ITEMS}
            planeWidth={340}
            planeHeight={340}
            distortion={3.2}
            scrollEase={0.02}
          />
          <div className="posters-hint-overlay">
            <Compass size={16} className="text-gold animate-spin-slow" />
            <span>Drag or scroll to navigate the 3D gallery</span>
          </div>
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
              <SpecularButton size="lg" onClick={() => navigate('/register')}>
                Start Your Journey
              </SpecularButton>
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
