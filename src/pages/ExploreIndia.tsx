import React, { useState, useEffect } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { mockDestinations, themes } from '../store/mockData';
import { MapPin, Star, Filter, Search } from 'lucide-react';
import { Input } from '../components/Input';
import './ExploreIndia.css';

export const ExploreIndia: React.FC = () => {
  const [location, setLocation] = useState<{lat: number; lng: number} | null>(null);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.log("Geolocation error:", err)
      );
    }
  }, []);

  const month = new Date().getMonth();
  let season = 'Winter';
  if (month >= 2 && month <= 5) season = 'Summer';
  else if (month >= 6 && month <= 9) season = 'Monsoon';
  else if (month === 10) season = 'Autumn';

  return (
    <div className="explore-container">
      <header className="explore-header">
        <div>
          <h1>Explore India</h1>
          <p className="text-secondary text-lg">Discover the diverse beauty of the subcontinent.</p>
        </div>
        <div className="explore-filters">
          <Input 
            placeholder="Search destinations..." 
            icon={Search} 
            fullWidth={false}
            className="explore-search"
          />
          <Button variant="outline" icon={<Filter size={18} />}>
            Filters
          </Button>
        </div>
      </header>

      {/* Trending Destinations */}
      <section className="explore-section mt-8">
        <h3 className="section-label">Best in {season}</h3>
        <div className="trending-grid">
          {mockDestinations.slice(0, 3).map(dest => (
            <Card key={dest.id} variant="interactive" padding="none" className="explore-card large">
              <img src={dest.image} alt={dest.name} className="explore-card-img" />
              <div className="explore-card-overlay">
                <div className="explore-card-rating">
                  <Star size={14} fill="currentColor" /> {dest.rating}
                </div>
                <div className="explore-card-content">
                  <h2>{dest.name}</h2>
                  <div className="explore-card-region">
                    <MapPin size={16} /> {dest.region}
                  </div>
                  <p className="explore-card-desc">{dest.description}</p>
                  <Button variant="primary" className="mt-4">View Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Near You */}
      {location && (
        <section className="explore-section mt-12">
          <h3 className="section-label">Near Your Location</h3>
          <p className="text-sm text-secondary mb-4">Coordinates: {location.lat.toFixed(2)}, {location.lng.toFixed(2)}</p>
          <div className="all-destinations-grid">
            {mockDestinations.slice(3, 6).map(dest => (
              <Card key={`nearby-${dest.id}`} variant="interactive" padding="none" className="destination-card">
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
                    <MapPin size={14} /> {dest.region} (Nearby)
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Categories / Themes */}
      <section className="explore-section mt-12">
        <h3 className="section-label">Browse by Experience</h3>
        <div className="categories-grid">
          {themes.map(theme => (
            <div key={theme.name} className="category-pill">
              <img src={theme.image} alt={theme.name} />
              <span>{theme.name}</span>
            </div>
          ))}
          <div className="category-pill">
            <span>+ More</span>
          </div>
        </div>
      </section>

      {/* All Destinations */}
      <section className="explore-section mt-12">
        <h3 className="section-label">All Destinations</h3>
        <div className="all-destinations-grid">
          {mockDestinations.map(dest => (
            <Card key={`all-${dest.id}`} variant="interactive" padding="none" className="destination-card">
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
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
