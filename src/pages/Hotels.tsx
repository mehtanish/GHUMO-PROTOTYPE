import React, { useState, useMemo } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { 
  Building2, 
  MapPin, 
  Star, 
  Search, 
  Filter, 
  Sparkles, 
  Compass, 
  X, 
  Check, 
  Calendar, 
  Users, 
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hotels.css';

interface HotelItem {
  id: string;
  name: string;
  location: string;
  city: string;
  distanceFromUser: string;
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
  theme: string;
  themeIcon: string;
  imageUrl: string;
  amenities: string[];
  impactBadge: string;
  featuredReview: string;
  reviewerName: string;
  description: string;
}

const HOTELS_DATA: HotelItem[] = [
  {
    id: 'h1',
    name: 'Haveli Dharampura Heritage Stay',
    location: 'Chandni Chowk, Old Delhi',
    city: 'Delhi',
    distanceFromUser: '2.1 km away',
    pricePerNight: 8500,
    rating: 4.8,
    reviewsCount: 342,
    theme: 'Heritage Haveli',
    themeIcon: '🏰',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free High-Speed WiFi', 'Rooftop Kathak & Sitar', 'Mughlai Dining', 'Artisan Walking Tour'],
    impactBadge: '100% Restored Heritage • Local Chef Guild',
    featuredReview: '“Staying here felt like living inside an 18th-century royal palace. The rooftop view of Jama Masjid at sunset is unbeatable.”',
    reviewerName: 'Priya Sharma (Solo Traveler)',
    description: 'Award-winning UNESCO-recognized restored haveli featuring ornate jharokhas, courtyards, and direct access to old craft bazaars.'
  },
  {
    id: 'h2',
    name: 'Zostel Heritage & Backpacker Hub',
    location: 'Fateh Sagar Lake Road, Udaipur',
    city: 'Udaipur',
    distanceFromUser: '1.4 km away',
    pricePerNight: 1200,
    rating: 4.7,
    reviewsCount: 890,
    theme: 'Backpacker & Social',
    themeIcon: '🎒',
    imageUrl: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
    amenities: ['High-Speed WiFi', 'Lakeview Rooftop Cafe', 'Community Kitchen', 'Daily Bicycle Trails'],
    impactBadge: 'Student Guided Trails • Eco Waste Management',
    featuredReview: '“Vibrant social vibe, spotless dorms and private rooms, and super friendly student guides leading morning lake cycles.”',
    reviewerName: 'Arjun Mehta (Digital Nomad)',
    description: 'Dynamic lakeside stay tailored for backpackers and remote workers with co-working zones and evening cultural jam sessions.'
  },
  {
    id: 'h3',
    name: 'Chinar Heritage Houseboat & Retreat',
    location: 'Nigeen Lake West, Srinagar',
    city: 'Srinagar',
    distanceFromUser: '3.8 km away',
    pricePerNight: 4600,
    rating: 4.9,
    reviewsCount: 215,
    theme: 'Lakeview & Riverside',
    themeIcon: '⛵',
    imageUrl: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80',
    amenities: ['Hand-Carved Walnut Cedar Rooms', 'Complimentary Shikara Ride', 'Traditional Wazwan Food', 'Heated Bedding'],
    impactBadge: 'Direct Artisan Family Owned • Zero Lake Pollution',
    featuredReview: '“Waking up on Nigeen lake with morning mist, wood-carved interiors, and authentic Kashmiri kahwa was unforgettable.”',
    reviewerName: 'Ananya Roy (Couple Trip)',
    description: 'Authentic handcrafted cedarwood houseboat operated by a 3rd-generation Kashmiri family with private Shikara pickup.'
  },
  {
    id: 'h4',
    name: 'Wilderness Eco Treehouse & Plantation',
    location: 'Attukad Waterfalls Road, Munnar',
    city: 'Munnar',
    distanceFromUser: '5.2 km away',
    pricePerNight: 5800,
    rating: 4.8,
    reviewsCount: 178,
    theme: 'Eco-Lodge & Treehouse',
    themeIcon: '🌿',
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    amenities: ['100% Solar Powered', 'Organic Spice Garden Tour', 'Balcony Mist View', 'Ayurvedic Wellness Spa'],
    impactBadge: 'Carbon Neutral • Local Tribal Foraging Guide',
    featuredReview: '“Perched 40ft high amid cardamom plantations. Zero single-use plastic and the freshest organic South Indian breakfast.”',
    reviewerName: 'Marcus Vance (Eco-Traveler)',
    description: 'Elevated treehouse retreat nestled in the Western Ghats canopy with panoramic tea estate sunrises and waterfall hikes.'
  },
  {
    id: 'h5',
    name: 'Rawla Narlai Boutique Heritage Fortress',
    location: 'Pali District, Near Ranakpur',
    city: 'Jaipur',
    distanceFromUser: '12.0 km away',
    pricePerNight: 14500,
    rating: 4.9,
    reviewsCount: 140,
    theme: 'Royal Palace',
    themeIcon: '👑',
    imageUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    amenities: ['Stepwell Candlelight Dinner', 'Leopard Safari Guide', 'Royal Courtyard Pool', 'Antique Furnishings'],
    impactBadge: 'Preserves 17th-Century Stepwells • Rural Employment',
    featuredReview: '“The stepwell dinner lit by 500 oil lamps is once in a lifetime. Staff treats every guest like royalty.”',
    reviewerName: 'Kabir & Sunaina (Honeymoon)',
    description: '17th-century royal hunting lodge transformed into a secluded luxury boutique retreat surrounded by ancient granite hills.'
  },
  {
    id: 'h6',
    name: 'Ganga Kinaré Riverside Wellness Resort',
    location: 'Swargashram Ghat, Rishikesh',
    city: 'Rishikesh',
    distanceFromUser: '0.8 km away',
    pricePerNight: 3900,
    rating: 4.6,
    reviewsCount: 420,
    theme: 'Spiritual & Wellness Retreat',
    themeIcon: '🧘',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Ganga Ghat Access', 'Daily Morning Yoga & Meditation', 'Satvik Organic Buffet', 'Ayurvedic Doctor on Call'],
    impactBadge: 'Eco-Ghat Cleaning Patron • Zero Noise Pollution',
    featuredReview: '“Private ghat access for morning aarti made this so serene. Great yoga teachers and nutritious organic meals.”',
    reviewerName: 'Rohit Kulkarni',
    description: 'Sanctuary on the banks of holy river Ganges offering holistic healing, yoga retreats, and direct ghat access.'
  },
  {
    id: 'h7',
    name: 'Solang Glacier Mountain Chalet',
    location: 'Old Manali Hills, Manali',
    city: 'Manali',
    distanceFromUser: '4.5 km away',
    pricePerNight: 2800,
    rating: 4.7,
    reviewsCount: 310,
    theme: 'Mountain Chalet',
    themeIcon: '🏔️',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    amenities: ['Pine-Wood Fireplace Lounge', 'Snow Peak Balconies', 'Trek Gear Rental', 'Fresh Apple Orchard Dining'],
    impactBadge: 'Locally Sourced Pine • Certified Mountain Guides',
    featuredReview: '“Cozy wooden chalets with woodstoves, stunning views of snow peaks, and homemade hot apple pies every evening.”',
    reviewerName: 'Devika Nair (Solo Traveler)',
    description: 'Authentic Kath-Kuni Himalayan architecture chalets situated amidst apple orchards overlooking snow-clad Pir Panjal range.'
  },
  {
    id: 'h8',
    name: 'Old Portuguese Villa & Tropical Stay',
    location: 'Anjuna Beach Road, North Goa',
    city: 'Goa',
    distanceFromUser: '1.2 km away',
    pricePerNight: 3200,
    rating: 4.6,
    reviewsCount: 512,
    theme: 'Eco-Lodge & Treehouse',
    themeIcon: '🌴',
    imageUrl: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    amenities: ['Swimming Pool & Palm Garden', 'Rental Scooters', 'Walk to Anjuna Flea Market', 'Artisan Goan Breakfast'],
    impactBadge: 'Solar Water Heaters • Goan Heritage Preservation',
    featuredReview: '“Restored 1920s Portuguese villa with high ceilings, lush green pool area, and quiet yet close to the beach.”',
    reviewerName: 'Rahul Sen (Friends Group)',
    description: 'Charming vintage Indo-Portuguese home featuring terracotta tiles, garden pool, and laid-back tropical vibes.'
  }
];

const THEMES = [
  'All Themes',
  'Heritage Haveli',
  'Eco-Lodge & Treehouse',
  'Lakeview & Riverside',
  'Backpacker & Social',
  'Mountain Chalet',
  'Royal Palace',
  'Spiritual & Wellness Retreat'
];

const BUDGET_RANGES = [
  { label: 'All Budgets', min: 0, max: 100000 },
  { label: 'Budget (Under ₹2,000)', min: 0, max: 2000 },
  { label: 'Comfort & Boutique (₹2k – ₹5k)', min: 2000, max: 5000 },
  { label: 'Heritage & Luxury (₹5k – ₹10k)', min: 5000, max: 10000 },
  { label: 'Royal Palaces (Above ₹10k)', min: 10000, max: 100000 }
];

const CITIES = ['All Locations', 'Delhi', 'Udaipur', 'Srinagar', 'Munnar', 'Jaipur', 'Rishikesh', 'Manali', 'Goa'];

export const Hotels: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Locations');
  const [selectedTheme, setSelectedTheme] = useState('All Themes');
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState(0);
  const [minRating, setMinRating] = useState<number>(0);
  const [nearMeOnly, setNearMeOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'priceLow' | 'priceHigh' | 'distance'>('rating');

  // Booking Modal State
  const [bookingHotel, setBookingHotel] = useState<HotelItem | null>(null);
  const [checkInDate, setCheckInDate] = useState('2026-09-05');
  const [checkOutDate, setCheckOutDate] = useState('2026-09-08');
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filter logic
  const filteredHotels = useMemo(() => {
    return HOTELS_DATA.filter(hotel => {
      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(q);
        const matchesLoc = hotel.location.toLowerCase().includes(q) || hotel.city.toLowerCase().includes(q);
        const matchesTheme = hotel.theme.toLowerCase().includes(q);
        if (!matchesName && !matchesLoc && !matchesTheme) return false;
      }

      // City
      if (selectedCity !== 'All Locations' && hotel.city !== selectedCity) {
        return false;
      }

      // Theme
      if (selectedTheme !== 'All Themes' && hotel.theme !== selectedTheme) {
        return false;
      }

      // Budget
      const budget = BUDGET_RANGES[selectedBudgetIndex];
      if (hotel.pricePerNight < budget.min || hotel.pricePerNight > budget.max) {
        return false;
      }

      // Rating
      if (minRating > 0 && hotel.rating < minRating) {
        return false;
      }

      // Near Me (< 3km filter simulation)
      if (nearMeOnly) {
        const distNum = parseFloat(hotel.distanceFromUser);
        if (distNum > 3.0) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceLow') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'priceHigh') return b.pricePerNight - a.pricePerNight;
      if (sortBy === 'distance') return parseFloat(a.distanceFromUser) - parseFloat(b.distanceFromUser);
      return 0;
    });
  }, [searchQuery, selectedCity, selectedTheme, selectedBudgetIndex, minRating, nearMeOnly, sortBy]);

  const handleOpenBooking = (hotel: HotelItem) => {
    setBookingHotel(hotel);
    setBookingSuccess(false);
  };

  const handleConfirmBooking = () => {
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingHotel(null);
    }, 2500);
  };

  return (
    <div className="hotels-page-container">
      {/* Page Header */}
      <header className="hotels-hero-header">
        <div className="flex items-center gap-2 mb-2">
          <span className="near-me-pill">
            <Sparkles size={13} /> Verified Heritage & Community-Empowering Stays
          </span>
        </div>
        <h1>Curated Hotels & Heritage Stays</h1>
        <p className="text-secondary text-lg mt-1">
          Handpicked accommodations filtered by your budget, unique theme, verified local reviews, and proximity to you.
        </p>
      </header>

      {/* Main Filter & Search Control Panel */}
      <div className="hotels-filter-card">
        {/* Top Search & Filter Grid */}
        <div className="filter-grid">
          {/* Search Box */}
          <div className="filter-group" style={{ gridColumn: 'span 2' }}>
            <label className="filter-label">
              <Search size={13} /> Search Hotel or Landmark
            </label>
            <Input 
              placeholder="e.g. Haveli in Udaipur, Treehouse, Riverside..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Location / City */}
          <div className="filter-group">
            <label className="filter-label">
              <MapPin size={13} /> Destination
            </label>
            <select 
              className="custom-select"
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
            >
              {CITIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Budget Range */}
          <div className="filter-group">
            <label className="filter-label">
              <Filter size={13} /> Budget / Night
            </label>
            <select 
              className="custom-select"
              value={selectedBudgetIndex}
              onChange={e => setSelectedBudgetIndex(Number(e.target.value))}
            >
              {BUDGET_RANGES.map((b, idx) => (
                <option key={b.label} value={idx}>{b.label}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-group">
            <label className="filter-label">
              <Compass size={13} /> Sort By
            </label>
            <select 
              className="custom-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
            >
              <option value="rating">⭐ Highest Rated (Reviews)</option>
              <option value="distance">📍 Closest to Me (GPS)</option>
              <option value="priceLow">💰 Price: Low to High</option>
              <option value="priceHigh">💎 Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Theme Scroll Chips & Quick Toggles */}
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
          <div className="flex justify-between items-center flex-wrap gap-2 mb-2">
            <span className="filter-label">
              <Sparkles size={13} className="text-accent-gold" /> Filter by Stay Theme:
            </span>

            {/* Near Me & Rating Toggles */}
            <div className="flex items-center gap-2">
              <button 
                className={`theme-chip ${nearMeOnly ? 'active' : ''}`}
                onClick={() => setNearMeOnly(!nearMeOnly)}
              >
                <Navigation size={13} /> Near Me (Under 3km)
              </button>

              <button 
                className={`theme-chip ${minRating === 4.7 ? 'active' : ''}`}
                onClick={() => setMinRating(minRating === 4.7 ? 0 : 4.7)}
              >
                <Star size={13} fill={minRating === 4.7 ? 'currentColor' : 'none'} /> 4.7+ ⭐ Superb
              </button>
            </div>
          </div>

          <div className="theme-chips-row">
            {THEMES.map(theme => (
              <button
                key={theme}
                className={`theme-chip ${selectedTheme === theme ? 'active' : ''}`}
                onClick={() => setSelectedTheme(theme)}
              >
                <span>{theme}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 style={{ fontSize: '1.35rem' }}>
            {filteredHotels.length} Stays Available
          </h3>
          <p className="text-secondary text-xs mt-0.5">
            Showing verified accommodations with transparent price guarantees and local artisan impact.
          </p>
        </div>
        {filteredHotels.length > 0 && (
          <span className="text-xs text-secondary">
            Prices include verified taxes & local breakfast
          </span>
        )}
      </div>

      {/* Hotel Cards Grid */}
      {filteredHotels.length === 0 ? (
        <Card padding="lg" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
          <Building2 size={44} style={{ color: 'var(--text-tertiary)', margin: '0 auto 1rem auto' }} />
          <h3>No hotels matching your criteria</h3>
          <p className="text-secondary text-sm mt-1 mb-4">
            Try adjusting your budget filter, location, or selecting "All Themes".
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCity('All Locations');
              setSelectedTheme('All Themes');
              setSelectedBudgetIndex(0);
              setMinRating(0);
              setNearMeOnly(false);
            }}
          >
            Reset All Filters
          </Button>
        </Card>
      ) : (
        <div className="hotels-results-grid">
          {filteredHotels.map(hotel => (
            <motion.div 
              key={hotel.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="hotel-card"
            >
              {/* Hotel Image with Badges */}
              <div className="hotel-image-wrapper">
                <img src={hotel.imageUrl} alt={hotel.name} className="hotel-img" />
                <div className="hotel-theme-badge">
                  {hotel.themeIcon} {hotel.theme}
                </div>
                <div className="hotel-rating-badge">
                  <Star size={13} fill="currentColor" /> {hotel.rating} ({hotel.reviewsCount})
                </div>
              </div>

              {/* Card Content */}
              <div className="hotel-content">
                <h3 className="hotel-title">{hotel.name}</h3>
                
                <div className="hotel-location-text">
                  <MapPin size={13} className="text-accent-gold" />
                  <span>{hotel.location} • <strong style={{ color: '#2ec4b6' }}>{hotel.distanceFromUser}</strong></span>
                </div>

                {/* Impact Pill */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.725rem', background: 'rgba(255, 184, 0, 0.1)', color: 'var(--color-accent-gold)', border: '1px solid rgba(255, 184, 0, 0.25)', padding: '2px 8px', borderRadius: '12px', display: 'inline-block' }}>
                    🏅 {hotel.impactBadge}
                  </span>
                </div>

                {/* Amenities */}
                <div className="hotel-amenities-row">
                  {hotel.amenities.slice(0, 3).map((amenity, i) => (
                    <span key={i} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="amenity-tag">+{hotel.amenities.length - 3} more</span>
                  )}
                </div>

                {/* Review Snippet */}
                <div className="hotel-review-snippet">
                  {hotel.featuredReview}
                  <span className="block text-tertiary text-xs mt-1 not-italic">
                    — {hotel.reviewerName}
                  </span>
                </div>

                {/* Price & Action Footer */}
                <div className="hotel-card-footer">
                  <div>
                    <div className="price-night-val">₹{hotel.pricePerNight.toLocaleString('en-IN')}</div>
                    <div className="price-night-sub">per room / night</div>
                  </div>

                  <Button 
                    variant="specular"
                    size="sm"
                    onClick={() => handleOpenBooking(hotel)}
                  >
                    Book Stay
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* ⭐ INTERACTIVE BOOKING MODAL */}
      <AnimatePresence>
        {bookingHotel && (
          <div className="booking-modal-overlay" onClick={() => setBookingHotel(null)}>
            <motion.div 
              className="booking-modal"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
            >
              <button 
                onClick={() => setBookingHotel(null)}
                style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <span className="near-me-pill">
                  {bookingHotel.themeIcon} {bookingHotel.theme}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#2ec4b6', fontWeight: 600 }}>
                  ⭐ {bookingHotel.rating} ({bookingHotel.reviewsCount} verified reviews)
                </span>
              </div>

              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{bookingHotel.name}</h2>
              <p className="text-secondary text-xs flex items-center gap-1 mb-4">
                <MapPin size={12} /> {bookingHotel.location}
              </p>

              {/* Booking Dates & Guests Grid */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div>
                    <label className="filter-label mb-1">
                      <Calendar size={12} /> Check-In
                    </label>
                    <input 
                      type="date" 
                      className="custom-select" 
                      value={checkInDate}
                      onChange={e => setCheckInDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="filter-label mb-1">
                      <Calendar size={12} /> Check-Out
                    </label>
                    <input 
                      type="date" 
                      className="custom-select" 
                      value={checkOutDate}
                      onChange={e => setCheckOutDate(e.target.value)}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label className="filter-label mb-1">
                      <Users size={12} /> Guests
                    </label>
                    <select 
                      className="custom-select"
                      value={guestsCount}
                      onChange={e => setGuestsCount(Number(e.target.value))}
                    >
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests (Couple / Friends)</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4+ Guests (Family)</option>
                    </select>
                  </div>
                  <div>
                    <label className="filter-label mb-1">
                      <Building2 size={12} /> Rooms
                    </label>
                    <select 
                      className="custom-select"
                      value={roomsCount}
                      onChange={e => setRoomsCount(Number(e.target.value))}
                    >
                      <option value={1}>1 Room</option>
                      <option value={2}>2 Rooms</option>
                      <option value={3}>3 Rooms</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Price Calculation Summary */}
              <div style={{ background: 'rgba(255, 184, 0, 0.05)', border: '1px solid rgba(255, 184, 0, 0.2)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem' }}>
                <div className="flex justify-between text-sm mb-1">
                  <span>₹{bookingHotel.pricePerNight.toLocaleString('en-IN')} × 3 Nights ({roomsCount} Room)</span>
                  <span style={{ fontWeight: 600 }}>₹{(bookingHotel.pricePerNight * 3 * roomsCount).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-secondary mb-1">
                  <span>Local Community Heritage Support Contribution</span>
                  <span style={{ color: '#2ec4b6' }}>Free (Included)</span>
                </div>
                <div className="flex justify-between text-xs text-secondary mb-2">
                  <span>Taxes & Breakfast Buffet</span>
                  <span>Included</span>
                </div>
                <div style={{ borderTop: '1px solid rgba(255, 184, 0, 0.2)', paddingTop: '0.5rem' }} className="flex justify-between text-base font-bold">
                  <span>Total Payable:</span>
                  <span style={{ color: 'var(--color-accent-gold)' }}>₹{(bookingHotel.pricePerNight * 3 * roomsCount).toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Confirmation Button */}
              {bookingSuccess ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{ 
                    background: 'rgba(42, 157, 143, 0.2)', 
                    border: '1px solid #2ec4b6', 
                    padding: '1rem', 
                    borderRadius: 'var(--radius-md)', 
                    textAlign: 'center' 
                  }}
                >
                  <div className="flex items-center justify-center gap-2" style={{ color: '#2ec4b6', fontWeight: 600, fontSize: '1.05rem' }}>
                    <Check size={20} /> Stay Reserved Successfully!
                  </div>
                  <p className="text-secondary text-xs mt-1">
                    Zero cancellation fee until 24 hrs prior to check-in. Added to your Trips tab.
                  </p>
                </motion.div>
              ) : (
                <Button
                  variant="specular"
                  fullWidth
                  size="lg"
                  onClick={handleConfirmBooking}
                >
                  Reserve with Zero Deposit (₹{(bookingHotel.pricePerNight * 3 * roomsCount).toLocaleString('en-IN')})
                </Button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
