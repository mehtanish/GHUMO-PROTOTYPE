import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import {
  Search, MapPin, Star, GraduationCap, CheckCircle2, Video, UserCheck, MessageSquare, Send, X
} from 'lucide-react';
import { mockGuides, bookGuide } from '../store/guideStore';
import type { StudentGuide } from '../store/guideStore';
import { motion, AnimatePresence } from 'framer-motion';
import './StudentGuides.css';

type SessionType = 'virtual' | 'physical';

interface ChatMessage {
  sender: string;
  text: string;
  time: string;
}

export const StudentGuides: React.FC = () => {
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<SessionType>('virtual');
  const [paymentStep, setPaymentStep] = useState<0 | 1 | 2>(0); // 0 = closed, 1 = options & payment, 2 = success
  const [searchQuery, setSearchQuery] = useState('');
  
  // AI Chat State for Online Sessions
  const [activeChatGuide, setActiveChatGuide] = useState<StudentGuide | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState('');

  const guide = mockGuides.find(g => g.id === selectedGuideId);

  const filteredGuides = mockGuides.filter(g => {
    const q = searchQuery.toLowerCase();
    return g.name.toLowerCase().includes(q) ||
      g.city.toLowerCase().includes(q) ||
      g.university.toLowerCase().includes(q) ||
      g.specialities.some(s => s.toLowerCase().includes(q));
  });

  const handleBookClick = (guideId: string) => {
    setSelectedGuideId(guideId);
    setSessionType('virtual');
    setPaymentStep(1);
  };

  const processPayment = () => {
    if (guide) {
      bookGuide(guide.id, sessionType);
      setTimeout(() => {
        setPaymentStep(2);
      }, 1500);
    }
  };

  const startAIChatSession = (targetGuide: StudentGuide) => {
    setActiveChatGuide(targetGuide);
    setPaymentStep(0);
    setChatMessages([
      {
        sender: targetGuide.name,
        text: `Namaste! I'm ${targetGuide.name}, your verified student guide from ${targetGuide.university} in ${targetGuide.city}. Welcome to our live online guidance session! How can I help you plan your trip?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeChatGuide) return;

    const userText = inputMsg;
    const userMsg: ChatMessage = {
      sender: 'You',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputMsg('');

    // Generate Contextual AI Student Guide Response
    setTimeout(() => {
      let aiText = `That's a fantastic inquiry about ${activeChatGuide.city}! `;
      const q = userText.toLowerCase();

      if (activeChatGuide.city.includes('Srinagar') || activeChatGuide.city.includes('Kashmir')) {
        if (q.includes('food') || q.includes('wazwan') || q.includes('eat') || q.includes('restaurant')) {
          aiText += "As a student at Kashmir University, I strongly recommend trying authentic Wazwan at Ahdoos or Mughal Darbar in Srinagar! Also try hot saffron Kahwa tea by Dal Lake.";
        } else if (q.includes('shop') || q.includes('pashmina') || q.includes('saffron') || q.includes('market')) {
          aiText += "For authentic Pashmina shawls and pure saffron, check government emporiums around Lal Chowk. Avoid roadside vendors offering 90% discounts as those are synthetic blends!";
        } else if (q.includes('snow') || q.includes('gulmarg') || q.includes('gondola')) {
          aiText += "If you are heading to Gulmarg for snow sports, book Phase 1 & 2 Gondola tickets online at least 4 days in advance as slots fill up quickly!";
        } else {
          aiText += "Kashmir is absolute paradise. I can guide you to secret sunrise Shikara spots on Dal Lake or hidden old Srinagar heritage houses.";
        }
      } else if (activeChatGuide.city.includes('Jaipur')) {
        if (q.includes('food') || q.includes('kachori') || q.includes('sweet')) {
          aiText += "You must try Rawat Mishtan Bhandar for hot Pyaz Kachori and Laxmi Mishtan Bhandar (LMB) in Johri Bazaar for traditional Ghevar!";
        } else if (q.includes('fort') || q.includes('sunset') || q.includes('view')) {
          aiText += "For sunset views over Jaipur, skip the crowded spots and head to Padaao restaurant on top of Nahargarh Fort!";
        } else {
          aiText += "Jaipur has incredible royal heritage. Let me know if you want a curated walk through the pink bazaar and Amber fort!";
        }
      } else if (activeChatGuide.city.includes('Udaipur')) {
        if (q.includes('lake') || q.includes('boat') || q.includes('photo')) {
          aiText += "Take a boat ride from Rameshwar Ghat to Jagmandir Palace right at 5:30 PM for the most picturesque golden hour reflections on Lake Pichola.";
        } else {
          aiText += "Udaipur is serene and magical. I can recommend authentic roof-top Mewari dining facing City Palace!";
        }
      } else {
        aiText += `I recommend exploring the local markets and heritage corridors around ${activeChatGuide.city}. Let me know what specific interests you have!`;
      }

      const aiMsg: ChatMessage = {
        sender: activeChatGuide.name,
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const getMeetingPoint = (city: string) => {
    if (city.includes('Srinagar') || city.includes('Kashmir')) return 'Clock Tower (Ghanta Ghar), Lal Chowk, Srinagar';
    if (city.includes('Jaipur')) return 'Main Courtyard, Hawa Mahal, Jaipur';
    if (city.includes('Udaipur')) return 'Main Entrance Gate, City Palace, Udaipur';
    return `Central Market Clock Tower, ${city}`;
  };

  return (
    <div className="guides-container">
      <header className="guides-header mb-8">
        <div>
          <h1>Meet the people who know India best.</h1>
          <p className="text-secondary text-lg mt-2">
            Hire local university students for authentic virtual AI consultations or offline city walkthrough tours.
          </p>
        </div>
      </header>

      {/* Search & Filter bar */}
      <div className="filters-bar mb-8">
        <Input
          placeholder="Search by city, university, language, or interest..."
          icon={Search}
          className="search-input"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <div className="filter-chips">
          <button className="chip active" onClick={() => setSearchQuery('')}>All Guides</button>
          <button className="chip" onClick={() => setSearchQuery('Srinagar')}>Kashmir</button>
          <button className="chip" onClick={() => setSearchQuery('Jaipur')}>Jaipur</button>
          <button className="chip" onClick={() => setSearchQuery('Udaipur')}>Udaipur</button>
        </div>
      </div>

      {/* Guides Grid */}
      <div className="guides-grid">
        {filteredGuides.map(g => (
          <Card key={g.id} variant="default" padding="lg" className="guide-card">
            <div className="guide-header">
              <div className="guide-avatar-wrapper">
                <img src={g.avatar} alt={g.name} className="guide-avatar" />
                {g.isOnline && <span className="online-badge"></span>}
              </div>
              <div className="guide-basic-info">
                <h3>{g.name}</h3>
                <div className="text-secondary text-sm flex items-center gap-1">
                  <MapPin size={14} /> {g.city}
                </div>
                <div className="text-secondary text-sm flex items-center gap-1 mt-1">
                  <GraduationCap size={14} /> {g.university}
                </div>
              </div>
            </div>

            <div className="guide-stats mt-4">
              <div className="stat-pill"><Star size={14} className="text-gold" /> {g.rating} ({g.reviews})</div>
              <div className="stat-pill">Online: ₹{g.price}</div>
              <div className="stat-pill offline-pill">Offline: ₹{g.price * 3 + 100}</div>
            </div>

            <div className="guide-tags mt-4">
              {g.specialities.map(spec => <span key={spec} className="tag">{spec}</span>)}
            </div>

            <div className="guide-languages text-sm text-secondary mt-3">
              Speaks: {g.languages.join(' • ')}
            </div>

            <div className="guide-actions mt-6">
              <Button variant="primary" fullWidth onClick={() => handleBookClick(g.id)}>
                Book Guide Session
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Booking Options & Payment Modal */}
      <AnimatePresence>
        {paymentStep === 1 && guide && (
          <div className="modal-overlay" onClick={() => setPaymentStep(0)}>
            <motion.div
              className="payment-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
            >
              <h2>Select Session & Confirm Booking</h2>
              <p className="text-secondary text-sm mt-1">Choose how you wish to connect with {guide.name} ({guide.university}):</p>

              {/* Session Type Selectors */}
              <div className="session-options-grid mt-4">
                <div
                  className={`session-option-card ${sessionType === 'virtual' ? 'selected' : ''}`}
                  onClick={() => setSessionType('virtual')}
                >
                  <div className="option-header">
                    <div className="option-title">
                      <Video size={18} className="text-accent" />
                      <span>Virtual Session (Online)</span>
                    </div>
                    <span className="price-tag">₹{guide.price}</span>
                  </div>
                  <p className="option-desc">
                    30-Minute live online consultation & instant AI chat with {guide.name} for itinerary review and local secrets.
                  </p>
                </div>

                <div
                  className={`session-option-card ${sessionType === 'physical' ? 'selected' : ''}`}
                  onClick={() => setSessionType('physical')}
                >
                  <div className="option-header">
                    <div className="option-title">
                      <UserCheck size={18} className="text-gold" />
                      <span>Walkthrough Session (Offline)</span>
                    </div>
                    <span className="price-tag gold">₹{guide.price * 3 + 100}</span>
                  </div>
                  <p className="option-desc">
                    Half-Day (3-4 Hours) in-person city walkthrough with {guide.name} in {guide.city}. Explores hidden food alleys & monuments.
                  </p>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="mt-4 payment-summary">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-secondary">Guide</span>
                  <span className="font-500">{guide.name} ({guide.city})</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-secondary">Session Mode</span>
                  <span className="font-500">
                    {sessionType === 'virtual' ? '🟢 Online Virtual Session (30m)' : '📍 Offline Walkthrough Tour (Half-Day)'}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-secondary">Session Fee</span>
                  <span>₹{sessionType === 'virtual' ? guide.price : guide.price * 3 + 100}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-secondary">Student Support Platform Fee</span>
                  <span>₹{sessionType === 'virtual' ? 20 : 50}</span>
                </div>
                <div className="flex justify-between py-3 font-600 text-lg text-gold">
                  <span>Total Payable</span>
                  <span>
                    ₹{(sessionType === 'virtual' ? guide.price + 20 : guide.price * 3 + 150)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-4">
                <Button variant="ghost" onClick={() => setPaymentStep(0)}>Cancel</Button>
                <Button variant="primary" onClick={processPayment} fullWidth>
                  Pay & Confirm Booking
                </Button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Success Modal */}
        {paymentStep === 2 && guide && (
          <div className="modal-overlay" onClick={() => setPaymentStep(0)}>
            <motion.div
              className="payment-modal text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="success-icon mb-4 mx-auto">
                <CheckCircle2 size={64} color="var(--color-success)" />
              </div>
              <h2 className="text-success">Booking Confirmed!</h2>

              {sessionType === 'virtual' ? (
                <div>
                  <p className="text-secondary mt-2">
                    Your 30-minute Virtual AI Guidance Session with <strong>{guide.name}</strong> is live.
                  </p>
                  <div className="mt-6 flex gap-4 justify-center">
                    <Button variant="ghost" onClick={() => setPaymentStep(0)}>Close</Button>
                    <Button variant="primary" onClick={() => startAIChatSession(guide)}>
                      <MessageSquare size={18} style={{ marginRight: 6 }} /> Start Online Session Chat
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-secondary mt-2">
                    Your Offline Walkthrough Session with <strong>{guide.name}</strong> in {guide.city} is scheduled!
                  </p>

                  <div className="offline-pass-card mt-4">
                    <div className="pass-title">📍 Walkthrough Tour Meeting Details</div>
                    <div className="pass-row">
                      <span>Guide Contact:</span> <strong>+91 98765 43210</strong>
                    </div>
                    <div className="pass-row">
                      <span>Meeting Point:</span> <strong>{getMeetingPoint(guide.city)}</strong>
                    </div>
                    <div className="pass-row">
                      <span>Scheduled Time:</span> <strong>Tomorrow, 10:00 AM</strong>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4 justify-center">
                    <Button variant="primary" onClick={() => setPaymentStep(0)}>
                      Done & View My Bookings
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dedicated AI Student Guide Chatbot Modal */}
      {activeChatGuide && (
        <div className="guide-chat-modal-overlay" onClick={() => setActiveChatGuide(null)}>
          <div className="guide-chat-modal-box" onClick={e => e.stopPropagation()}>
            <div className="guide-chat-modal-header">
              <div className="guide-chat-user-info">
                <img src={activeChatGuide.avatar} alt={activeChatGuide.name} className="guide-chat-avatar" />
                <div>
                  <h3>Live Session: {activeChatGuide.name}</h3>
                  <p className="text-secondary text-xs flex items-center gap-1">
                    <GraduationCap size={12} /> {activeChatGuide.university} &bull; {activeChatGuide.city}
                  </p>
                </div>
              </div>
              <button className="chat-close-btn" onClick={() => setActiveChatGuide(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="guide-chat-messages-container">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`guide-chat-bubble ${msg.sender === 'You' ? 'user' : 'guide'}`}
                >
                  <div className="bubble-sender">{msg.sender}</div>
                  <div className="bubble-text">{msg.text}</div>
                  <div className="bubble-time">{msg.time}</div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendChatMessage} className="guide-chat-input-row">
              <input
                type="text"
                placeholder={`Ask ${activeChatGuide.name} about local spots in ${activeChatGuide.city}...`}
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
