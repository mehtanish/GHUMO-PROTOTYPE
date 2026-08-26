import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import {
  MapPin, Utensils, Compass, Coffee, Navigation, Plus, Check, X, Sparkles, Sun, Clock
} from 'lucide-react';
import './WhatCanIDoModal.css';

interface WhatCanIDoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryType = 'eat' | 'explore' | 'chill';

interface RecommendationItem {
  id: string;
  name: string;
  category: CategoryType;
  city: string;
  image: string;
  distance: string;
  timeAway: string;
  rating: number;
  description: string;
  highlight: string;
}

const mockRecommendations: RecommendationItem[] = [
  // KASHMIR / SRINAGAR
  {
    id: 'r1',
    name: 'Ahdoos Wazwan & Heritage Dining',
    category: 'eat',
    city: 'Kashmir',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=600&auto=format&fit=crop',
    distance: '1.2 km away',
    timeAway: '12 min walk',
    rating: 4.9,
    description: 'Iconic heritage restaurant along Jhelum river serving authentic 7-course Kashmiri Wazwan, Rogan Josh, and Rista.',
    highlight: 'Must Try: Authentic Rogan Josh & Saffron Kahwa'
  },
  {
    id: 'r2',
    name: 'Chai Jaai Tea Room',
    category: 'eat',
    city: 'Kashmir',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop',
    distance: '2.0 km away',
    timeAway: '18 min walk',
    rating: 4.8,
    description: 'Charming tea lounge blending Parisian aesthetic with Kashmiri tea culture. Serves Noon Chai & Sheermal.',
    highlight: 'Must Try: Pink Noon Chai & Fresh Sheermal Bread'
  },
  {
    id: 'r3',
    name: 'Dal Lake Shikara Ghat 1',
    category: 'explore',
    city: 'Kashmir',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=600&auto=format&fit=crop',
    distance: '0.8 km away',
    timeAway: '8 min walk',
    rating: 4.9,
    description: 'Glide through floating lotus markets and wooden houseboats during golden hour sunset.',
    highlight: 'Best Activity: 1-Hour Sunset Shikara Ride'
  },
  {
    id: 'r4',
    name: 'Pari Mahal Terraced Mughal Gardens',
    category: 'explore',
    city: 'Kashmir',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=600&auto=format&fit=crop',
    distance: '4.5 km away',
    timeAway: '15 min drive',
    rating: 4.8,
    description: 'Ancient 6-terraced astrological library built by Dara Shikoh with panoramic views of Srinagar.',
    highlight: 'Top Sight: 360° Sunset View over Dal Lake'
  },
  {
    id: 'r5',
    name: 'Nigeen Lake Waterfront Promenade',
    category: 'chill',
    city: 'Kashmir',
    image: 'https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?q=80&w=600&auto=format&fit=crop',
    distance: '3.0 km away',
    timeAway: '10 min drive',
    rating: 4.9,
    description: 'Serene, peaceful lake promenade shielded from commercial crowds. Ideal for evening walks and hot tea.',
    highlight: 'Atmosphere: Peaceful Lake Breeze & Quietude'
  },
  {
    id: 'r6',
    name: 'Shankaracharya Hilltop Viewpoint',
    category: 'chill',
    city: 'Kashmir',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop',
    distance: '3.8 km away',
    timeAway: '12 min drive',
    rating: 4.7,
    description: 'Elevated hilltop peak offering cool mountain breeze and complete panorama of Srinagar city valley.',
    highlight: 'Experience: Panoramic Valley Breeze'
  },

  // JAIPUR
  {
    id: 'r7',
    name: 'Rawat Mishtan Bhandar',
    category: 'eat',
    city: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop',
    distance: '1.4 km away',
    timeAway: '14 min walk',
    rating: 4.8,
    description: 'World-famous legendary sweetshop serving steaming hot, crispy Pyaz Kachoris.',
    highlight: 'Must Try: Hot Pyaz Kachori & Mirchi Bada'
  },
  {
    id: 'r8',
    name: 'Amer Fort Light & Sound Show',
    category: 'explore',
    city: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop',
    distance: '8.5 km away',
    timeAway: '25 min drive',
    rating: 4.9,
    description: 'Illuminated evening light and music show recounting the royal history of Rajput kings.',
    highlight: 'Night Sight: Illuminated Rajput Fort'
  },
  {
    id: 'r9',
    name: 'Nahargarh Sunset Point (Padaao)',
    category: 'chill',
    city: 'Jaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop',
    distance: '6.0 km away',
    timeAway: '20 min drive',
    rating: 4.9,
    description: 'High altitude fort ridge overlooking the entire Pink City skyline with evening drinks.',
    highlight: 'Vibe: Pink City Skyline at Sunset'
  },

  // UDAIPUR
  {
    id: 'r10',
    name: 'Ambrai Lakeview Dining',
    category: 'eat',
    city: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop',
    distance: '1.2 km away',
    timeAway: '12 min walk',
    rating: 4.9,
    description: 'Waterfront dining at Amet Haveli directly facing City Palace and Lake Pichola.',
    highlight: 'Vibe: Candlelight Lakeview Dining'
  },
  {
    id: 'r11',
    name: 'City Palace & Crystal Gallery',
    category: 'explore',
    city: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop',
    distance: '0.9 km away',
    timeAway: '10 min walk',
    rating: 4.8,
    description: 'Grand royal palace complex built over 400 years showcasing Mewar history and architecture.',
    highlight: 'Sight: Royal Mewar Architecture'
  },
  {
    id: 'r12',
    name: 'Fateh Sagar Promenade & Kulhad Coffee',
    category: 'chill',
    city: 'Udaipur',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600&auto=format&fit=crop',
    distance: '2.5 km away',
    timeAway: '15 min walk',
    rating: 4.8,
    description: 'Lively lakefront street food drive with sunset views, cold coffee, and lake breeze.',
    highlight: 'Chill Spot: Kulhad Cold Coffee by Lake'
  }
];

export const WhatCanIDoModal: React.FC<WhatCanIDoModalProps> = ({ isOpen, onClose }) => {
  const [selectedCity, setSelectedCity] = useState<'Kashmir' | 'Jaipur' | 'Udaipur'>('Kashmir');
  const [activeCategory, setActiveCategory] = useState<CategoryType>('eat');
  const [addedItems, setAddedItems] = useState<{ [id: string]: boolean }>({});

  if (!isOpen) return null;

  const filteredRecs = mockRecommendations.filter(
    item => item.city === selectedCity && item.category === activeCategory
  );

  const toggleAddItem = (id: string) => {
    setAddedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="what-modal-overlay" onClick={onClose}>
      <div className="what-modal-container" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="what-modal-header">
          <div className="modal-header-title">
            <div className="sparkle-badge">
              <Sparkles size={20} />
              <span>Real-Time Radar</span>
            </div>
            <h2>What Can I Do Now?</h2>
          </div>
          <button className="what-close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Location & Context Banner */}
        <div className="location-context-bar">
          <div className="detected-location">
            <MapPin size={16} className="pin-icon" />
            <span>Detected Location:</span>
            <select
              className="city-select-dropdown"
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value as any)}
            >
              <option value="Kashmir">Srinagar / Kashmir (GPS Active)</option>
              <option value="Jaipur">Jaipur (Rajasthan)</option>
              <option value="Udaipur">Udaipur (Rajasthan)</option>
            </select>
          </div>

          <div className="weather-time-info">
            <Sun size={15} /> <span>18°C Clear</span> &bull; <Clock size={15} /> <span>Perfect for local outings</span>
          </div>
        </div>

        {/* Category Selector Tabs */}
        <div className="category-tabs-container">
          <button
            className={`cat-tab ${activeCategory === 'eat' ? 'active' : ''}`}
            onClick={() => setActiveCategory('eat')}
          >
            <Utensils size={18} />
            <span>To Eat</span>
          </button>

          <button
            className={`cat-tab ${activeCategory === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveCategory('explore')}
          >
            <Compass size={18} />
            <span>To Explore</span>
          </button>

          <button
            className={`cat-tab ${activeCategory === 'chill' ? 'active' : ''}`}
            onClick={() => setActiveCategory('chill')}
          >
            <Coffee size={18} />
            <span>To Chill</span>
          </button>
        </div>

        {/* Recommendations Grid */}
        <div className="recommendations-scroll-body">
          <div className="recs-grid">
            {filteredRecs.map(item => (
              <Card key={item.id} className="rec-card">
                <div className="rec-card-image-wrap">
                  <img src={item.image} alt={item.name} className="rec-img" />
                  <span className="distance-badge">
                    <Navigation size={12} /> {item.distance} &bull; {item.timeAway}
                  </span>
                </div>

                <div className="rec-card-content">
                  <div className="rec-card-top-row">
                    <h3 className="rec-title">{item.name}</h3>
                    <span className="rec-rating">⭐ {item.rating}</span>
                  </div>

                  <p className="rec-desc">{item.description}</p>
                  <div className="rec-highlight">{item.highlight}</div>

                  <div className="rec-card-actions">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert(`Opening live GPS directions to ${item.name}...`)}
                    >
                      <Navigation size={14} style={{ marginRight: 4 }} /> Directions
                    </Button>

                    <Button
                      variant={addedItems[item.id] ? 'secondary' : 'primary'}
                      size="sm"
                      onClick={() => toggleAddItem(item.id)}
                    >
                      {addedItems[item.id] ? (
                        <>
                          <Check size={14} style={{ marginRight: 4 }} /> Added to Itinerary
                        </>
                      ) : (
                        <>
                          <Plus size={14} style={{ marginRight: 4 }} /> Add to Trip
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
