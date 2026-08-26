import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import {
  getActiveGuideUser,
  getGuideBookings,
  saveGuideBookings
} from '../store/guideStore';
import type { StudentGuide, GuideBooking } from '../store/guideStore';
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  DollarSign,
  User,
  CheckCircle,
  Video,
  Globe,
  GraduationCap,
  ShieldCheck,
  Sparkles,
  LogOut,
  Send,
  X
} from 'lucide-react';
import './GuidePortal.css';

export const GuidePortal: React.FC = () => {
  const navigate = useNavigate();
  const [guide, setGuide] = useState<StudentGuide>(getActiveGuideUser());
  const [bookings, setBookings] = useState<GuideBooking[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [activeChatBooking, setActiveChatBooking] = useState<GuideBooking | null>(null);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; time: string }[]>([]);
  const [inputMsg, setInputMsg] = useState('');

  useEffect(() => {
    const currentGuide = getActiveGuideUser();
    setGuide(currentGuide);
    const guideBookings = getGuideBookings(currentGuide.id);
    setBookings(guideBookings);
  }, []);

  const totalEarnings = bookings.reduce((sum, b) => sum + b.amount, 0);

  const filteredBookings = bookings.filter(b => {
    if (filter === 'upcoming') return b.status === 'Confirmed' || b.status === 'In Progress';
    if (filter === 'completed') return b.status === 'Completed';
    return true;
  });

  const handleOpenChat = (b: GuideBooking) => {
    setActiveChatBooking(b);
    setChatMessages([
      {
        sender: b.travelerName,
        text: `Hi ${guide.name}! I'm so excited for our ${b.sessionType} session regarding ${b.topic}.`,
        time: '10:00 AM'
      },
      {
        sender: guide.name,
        text: `Namaste! Welcome! I've reviewed your itinerary requirements. Ready to share all authentic local spots in ${guide.city}.`,
        time: '10:02 AM'
      }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeChatBooking) return;

    const newMsg = {
      sender: guide.name,
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMsg]);
    setInputMsg('');

    // Simulate traveler reply
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: activeChatBooking.travelerName,
          text: "Thank you so much! That recommendation sounds perfect.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  const handleMarkComplete = (bookingId: string) => {
    const updated = bookings.map(b => b.id === bookingId ? { ...b, status: 'Completed' as const } : b);
    setBookings(updated);
    saveGuideBookings(updated);
  };

  return (
    <div className="guide-portal-page">
      {/* Top Banner Header */}
      <header className="guide-portal-header">
        <div className="portal-header-container">
          <div className="guide-profile-badge">
            <img src={guide.avatar} alt={guide.name} className="portal-avatar" />
            <div className="portal-guide-details">
              <div className="portal-guide-name">
                <h1>{guide.name}</h1>
                <ShieldCheck className="verified-badge-icon" size={20} />
              </div>
              <p className="portal-university">
                <GraduationCap size={16} /> {guide.university} &bull; <MapPin size={14} /> {guide.city}
              </p>
            </div>
          </div>

          <div className="portal-header-actions">
            <div className="online-status-indicator">
              <span className="status-dot"></span>
              <span>Available for Live Sessions</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/guide-login')}>
              <LogOut size={16} style={{ marginRight: 6 }} /> Switch Guide
            </Button>
          </div>
        </div>
      </header>

      <main className="portal-main-content">
        {/* Metric Cards */}
        <section className="portal-metrics-grid">
          <Card className="metric-card">
            <div className="metric-icon-wrap gold">
              <Calendar size={22} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Booked Sessions</span>
              <span className="metric-value">{bookings.length}</span>
            </div>
          </Card>

          <Card className="metric-card">
            <div className="metric-icon-wrap green">
              <DollarSign size={22} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Total Earnings</span>
              <span className="metric-value">₹{totalEarnings}</span>
            </div>
          </Card>

          <Card className="metric-card">
            <div className="metric-icon-wrap purple">
              <Sparkles size={22} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Student Rating</span>
              <span className="metric-value">⭐ {guide.rating} / 5.0</span>
            </div>
          </Card>
        </section>

        {/* Sessions & Bookings List */}
        <section className="portal-bookings-section">
          <div className="portal-section-header">
            <div>
              <h2>Who Has Booked You ({bookings.length})</h2>
              <p className="text-secondary">
                Travelers who have hired you for virtual consultations or local guiding.
              </p>
            </div>

            <div className="filter-tab-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({bookings.length})
              </button>
              <button
                className={`filter-btn ${filter === 'upcoming' ? 'active' : ''}`}
                onClick={() => setFilter('upcoming')}
              >
                Upcoming ({bookings.filter(b => b.status !== 'Completed').length})
              </button>
              <button
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed ({bookings.filter(b => b.status === 'Completed').length})
              </button>
            </div>
          </div>

          {filteredBookings.length === 0 ? (
            <Card className="empty-bookings-card">
              <User size={40} className="text-secondary" />
              <h3>No bookings found</h3>
              <p className="text-secondary">No travelers found for this filter tab.</p>
            </Card>
          ) : (
            <div className="bookings-grid">
              {filteredBookings.map(b => (
                <Card key={b.id} className="booking-card">
                  <div className="booking-card-top">
                    <div className="traveler-info">
                      <img src={b.travelerAvatar} alt={b.travelerName} className="traveler-avatar" />
                      <div>
                        <h3 className="traveler-name">{b.travelerName}</h3>
                        <p className="traveler-location">
                          <Globe size={14} /> {b.travelerLocation}
                        </p>
                      </div>
                    </div>

                    <div className={`session-tag ${b.sessionType}`}>
                      {b.sessionType === 'virtual' ? (
                        <>
                          <Video size={14} /> Virtual Call (30 min)
                        </>
                      ) : (
                        <>
                          <MapPin size={14} /> Local Tour (In-Person)
                        </>
                      )}
                    </div>
                  </div>

                  <div className="booking-details-body">
                    <div className="booking-topic">
                      <strong>Session Topic:</strong> {b.topic}
                    </div>

                    {b.notes && (
                      <div className="booking-notes">
                        <strong>Traveler Note:</strong> "{b.notes}"
                      </div>
                    )}

                    <div className="booking-meta-row">
                      <div className="meta-item">
                        <Calendar size={15} /> <span>{b.date}</span>
                      </div>
                      <div className="meta-item">
                        <Clock size={15} /> <span>{b.timeSlot}</span>
                      </div>
                      <div className="meta-item price">
                        <DollarSign size={15} /> <span>₹{b.amount} (Paid)</span>
                      </div>
                    </div>
                  </div>

                  <div className="booking-card-actions">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleOpenChat(b)}
                    >
                      <MessageSquare size={16} style={{ marginRight: 6 }} />
                      Join Session Chat
                    </Button>

                    {b.status !== 'Completed' ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleMarkComplete(b.id)}
                      >
                        <CheckCircle size={16} style={{ marginRight: 6 }} />
                        Mark Completed
                      </Button>
                    ) : (
                      <span className="completed-badge">
                        <CheckCircle size={14} /> Session Completed
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Chat Session Modal */}
      {activeChatBooking && (
        <div className="chat-modal-overlay" onClick={() => setActiveChatBooking(null)}>
          <div className="chat-modal-box" onClick={e => e.stopPropagation()}>
            <div className="chat-modal-header">
              <div className="chat-user-header">
                <img src={activeChatBooking.travelerAvatar} alt={activeChatBooking.travelerName} className="chat-avatar" />
                <div>
                  <h3>Session with {activeChatBooking.travelerName}</h3>
                  <p>{activeChatBooking.topic}</p>
                </div>
              </div>
              <button className="close-btn" onClick={() => setActiveChatBooking(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="chat-modal-messages">
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-msg-bubble ${msg.sender === guide.name ? 'guide' : 'traveler'}`}
                >
                  <div className="msg-sender">{msg.sender}</div>
                  <div className="msg-text">{msg.text}</div>
                  <div className="msg-time">{msg.time}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="chat-modal-input">
              <input
                type="text"
                placeholder={`Message ${activeChatBooking.travelerName}...`}
                value={inputMsg}
                onChange={e => setInputMsg(e.target.value)}
              />
              <Button type="submit" variant="primary">
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
