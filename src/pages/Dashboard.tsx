import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SpecularButton } from '../components/SpecularButton';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { getStoredTrips } from '../store/tripStore';
import { getGuidesHiredCount } from '../store/guideStore';
import { 
  Map, Calendar, MessageSquareText, Users, DollarSign, 
  MapPin, Clock, Sparkles, ChevronRight
} from 'lucide-react';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const trips = getStoredTrips();
  const guidesHired = getGuidesHiredCount();

  // Determine greeting based on time
  const hour = new Date().getHours();
  let greeting = 'Good morning';
  if (hour >= 12 && hour < 17) greeting = 'Good afternoon';
  else if (hour >= 17) greeting = 'Good evening';

  const hasUpcomingTrip = false; // Mock state

  const quickActions = [
    { name: 'Plan a Trip', icon: Calendar, path: '/app/plan', color: '#F8961E' },
    { name: 'Ask AI', icon: MessageSquareText, path: '/app/ai', color: '#4361EE' },
    { name: 'Ask a Local', icon: Users, path: '/app/ask-local', color: '#7209B7' },
    { name: 'Find a Guide', icon: MapPin, path: '/app/guides', color: '#2A9D8F' },
    { name: 'Fair Price Check', icon: DollarSign, path: '/app/fair-price', color: '#E76F51' },
    { name: 'Explore Nearby', icon: Map, path: '/app/explore', color: '#3F37C9' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        {/* Header */}
        <header className="dashboard-header">
          <h1>{greeting}, {user?.name.split(' ')[0]} 👋</h1>
          <p className="text-secondary text-lg">Where will your journey take you today?</p>
        </header>

        {/* Dashboard Hero (Upcoming Trip or Plan prompt) */}
        <Card className="dashboard-hero" padding="none">
          {hasUpcomingTrip ? (
            <div className="hero-trip">
              {/* Future logic for upcoming trip */}
            </div>
          ) : (
            <div className="hero-empty">
              <img 
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2069&auto=format&fit=crop" 
                alt="Kerala" 
                className="hero-empty-bg"
              />
              <div className="hero-empty-content">
                <h2>Your next adventure is waiting.</h2>
                <div className="hero-empty-actions mt-4">
                  <SpecularButton size="lg" onClick={() => navigate('/app/plan')}>
                    Plan your first trip
                  </SpecularButton>
                  <Button variant="glass" size="lg" onClick={() => navigate('/app/explore')}>
                    Explore ideas
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Quick Actions Grid */}
        <section className="dashboard-section mt-8">
          <h3 className="section-label">Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map(action => (
              <Card 
                key={action.name} 
                variant="interactive" 
                className="quick-action-card"
                onClick={() => navigate(action.path)}
              >
                <div className="quick-action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                  <action.icon size={24} />
                </div>
                <h4>{action.name}</h4>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Grid */}
        <section className="dashboard-section mt-8">
          <h3 className="section-label">Your Travel Stats</h3>
          <div className="stats-grid">
            <Card variant="glass" className="stat-card">
              <span className="stat-value"><AnimatedNumber value={trips.length} /></span>
              <span className="stat-label">Trips Planned</span>
            </Card>
            <Card variant="glass" className="stat-card">
              <span className="stat-value"><AnimatedNumber value={user?.savedPlaces.length || 0} /></span>
              <span className="stat-label">Places Explored</span>
            </Card>
            <Card variant="glass" className="stat-card">
              <span className="stat-value"><AnimatedNumber value={guidesHired} /></span>
              <span className="stat-label">Guides Hired</span>
            </Card>
            <Card variant="glass" className="stat-card">
              <span className="stat-value"><AnimatedNumber value={(user?.impactScore || 0) + (guidesHired * 50)} />/100</span>
              <span className="stat-label">Impact Score</span>
            </Card>
          </div>
        </section>
      </div>

      {/* Right Sidebar Area */}
      <aside className="dashboard-right-panel">
        
        {/* AI Recommendation Widget */}
        <Card variant="glass" className="widget-card ai-recommendation">
          <div className="widget-header">
            <Sparkles size={18} className="text-gold" />
            <h4>AI Recommendation</h4>
          </div>
          <div className="recommendation-content mt-4">
            <img 
              src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2232&auto=format&fit=crop" 
              alt="Kerala Backwaters" 
              className="rec-img"
            />
            <div className="rec-info mt-3">
              <div className="flex justify-between items-center mb-1">
                <h5>Kerala</h5>
                <span className="match-badge">94% Match</span>
              </div>
              <p className="text-sm text-secondary">Based on your interest in nature and wellness.</p>
              <Button variant="ghost" fullWidth className="mt-3 flex justify-between">
                <span>Explore Now</span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </Card>

        {/* What Should I Do Right Now? Widget */}
        <Card variant="glass" className="widget-card mt-6">
          <div className="widget-header">
            <MapPin size={18} className="text-blue" />
            <h4>Right Now</h4>
          </div>
          <div className="now-content mt-4">
            <div className="now-location text-sm text-secondary mb-3">
              <Clock size={14} className="inline mr-1" /> 4:30 PM • 3 hours available
            </div>
            <div className="now-suggestion">
              <h5>Evening Heritage Walk</h5>
              <p className="text-xs text-tertiary">4:45–6:15 PM • ₹500/person</p>
            </div>
            <Button variant="outline" fullWidth className="mt-4">
              View More Suggestions
            </Button>
          </div>
        </Card>

      </aside>
    </div>
  );
};
