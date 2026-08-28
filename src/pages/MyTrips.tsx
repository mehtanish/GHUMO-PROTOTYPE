import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SpecularButton } from '../components/SpecularButton';
import { Calendar, Users, DollarSign, ExternalLink } from 'lucide-react';
import { getStoredTrips } from '../store/tripStore';
import type { Trip } from '../store/tripStore';
import { ItineraryViewer } from '../components/ItineraryViewer';
import './MyTrips.css';

type TabType = 'all' | 'upcoming' | 'planning' | 'completed';

const getDestinationImage = (dest: string) => {
  const d = dest.toLowerCase();
  if (d.includes('kashmir') || d.includes('srinagar') || d.includes('gulmarg')) {
    return 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop';
  }
  if (d.includes('jaipur') || d.includes('pink city')) {
    return 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop';
  }
  if (d.includes('udaipur') || d.includes('rajasthan') || d.includes('jaisalmer')) {
    return 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop';
  }
  return 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600&auto=format&fit=crop';
};

export const MyTrips: React.FC = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [expandedTripId, setExpandedTripId] = useState<string | null>(null);

  useEffect(() => {
    setTrips(getStoredTrips());
  }, []);

  const filteredTrips = trips.filter(trip => {
    if (activeTab === 'all') return true;
    return trip.status === activeTab;
  });

  return (
    <div className="my-trips-container">
      <header className="flex justify-between items-end mb-8">
        <div>
          <h1 className="section-title text-uppercase mb-2" style={{fontSize: '0.875rem', letterSpacing: '0.1em', color: 'var(--text-tertiary)'}}>YOUR JOURNEYS</h1>
          <h2>My Trips</h2>
        </div>
        <SpecularButton size="md" onClick={() => navigate('/app/plan')}>
          Plan New Trip
        </SpecularButton>
      </header>

      {/* Tabs */}
      <div className="trips-tabs">
        {(['all', 'upcoming', 'planning', 'completed'] as TabType[]).map(tab => (
          <button 
            key={tab}
            className={`trip-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Trips Grid */}
      {filteredTrips.length > 0 ? (
        <div className="trips-grid mt-6">
          {filteredTrips.map(trip => (
            <Card key={trip.id} variant="interactive" padding="none" className="trip-card">
              <div className="trip-card-header">
                <img 
                  src={getDestinationImage(trip.destination)} 
                  alt={trip.destination}
                />
                <div className="trip-status-badge">{trip.status}</div>
              </div>
              <div className="trip-card-content">
                <h3>{trip.destination}</h3>
                <div className="trip-details mt-4">
                  <div className="trip-detail-item">
                    <Calendar size={16} /> <span>{trip.startDate} to {trip.endDate}</span>
                  </div>
                  <div className="trip-detail-item">
                    <DollarSign size={16} /> <span>{trip.budget}</span>
                  </div>
                  <div className="trip-detail-item">
                    <Users size={16} /> <span>{trip.companions}</span>
                  </div>
                </div>
                <div className="trip-actions mt-6">
                  <Button 
                    variant="outline" 
                    fullWidth 
                    onClick={() => setExpandedTripId(expandedTripId === trip.id ? null : trip.id)}
                  >
                    {expandedTripId === trip.id ? 'Hide Details' : 'View Details'} <ExternalLink size={16} className="ml-2"/>
                  </Button>
                </div>
                
                {expandedTripId === trip.id && (
                  <div className="trip-itinerary mt-6 pt-6" style={{ borderTop: '1px solid var(--border-light)' }}>
                    <ItineraryViewer 
                      itinerary={trip.itinerary || []} 
                      destinationName={trip.destination}
                      accentColor="var(--color-accent-gold)"
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="empty-trips-state mt-6" padding="lg">
          <img 
            src="https://images.unsplash.com/photo-1593693397690-362cb9666cb3?q=80&w=2069&auto=format&fit=crop" 
            alt="Empty State" 
            className="empty-state-img"
          />
          <div className="empty-state-content">
            <h3>No trips on the board yet.</h3>
            <p className="text-secondary mt-2">Start exploring India and build your perfect itinerary.</p>
            <SpecularButton size="md" className="mt-6" onClick={() => navigate('/app/plan')}>
              Plan a trip
            </SpecularButton>
          </div>
        </Card>
      )}
    </div>
  );
};
