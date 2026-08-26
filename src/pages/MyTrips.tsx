import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Calendar, Users, DollarSign, ExternalLink } from 'lucide-react';
import { getStoredTrips } from '../store/tripStore';
import type { Trip } from '../store/tripStore';
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
        <Button variant="primary" onClick={() => navigate('/app/plan')}>
          Plan New Trip
        </Button>
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
                    <h4 className="mb-4">Itinerary</h4>
                    {trip.itinerary && trip.itinerary.length > 0 ? (
                      <div className="itinerary-days" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {trip.itinerary.map(day => (
                          <div key={day.day}>
                            <h5 className="mb-3 text-secondary">Day {day.day} - {day.date}</h5>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {day.items.map(item => (
                                <div key={item.id} style={{ padding: '0.75rem', background: 'var(--color-surface-hover)', borderRadius: 'var(--radius-sm)' }}>
                                  <div className="flex justify-between items-center mb-1">
                                    <span style={{ fontWeight: 600 }}>{item.activity}</span>
                                    <span className="text-secondary text-sm">{item.time}</span>
                                  </div>
                                  <p className="text-sm text-secondary">{item.description}</p>
                                  <div className="text-xs text-gold mt-2">{item.price}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-secondary">No itinerary planned yet.</p>
                    )}
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
            <Button variant="primary" className="mt-6" onClick={() => navigate('/app/plan')}>
              Plan a trip
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
