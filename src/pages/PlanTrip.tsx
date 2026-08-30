import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { SpecularButton } from '../components/SpecularButton';
import { Input } from '../components/Input';
import { MapPin, Calendar, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { addTrip } from '../store/tripStore';
import type { Trip, TripDNA } from '../store/tripStore';
import { ItineraryViewer } from '../components/ItineraryViewer';
import './PlanTrip.css';

const steps = [
  { id: 'destination', title: 'Where are you going?' },
  { id: 'dates', title: 'When and how long?' },
  { id: 'budget', title: 'What is your budget?' },
  { id: 'companions', title: 'Who is travelling?' },
  { id: 'dna', title: 'Personalize this trip?' },
  { id: 'generating', title: 'Crafting your journey...' },
  { id: 'review', title: 'Your Custom Itinerary' },
];

export const PlanTrip: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form State
  const queryParams = new URLSearchParams(window.location.search);
  const urlStartDate = queryParams.get('startDate') || '';

  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState(urlStartDate);
  const [endDate, setEndDate] = useState('');
  const [budget, setBudget] = useState('Standard (₹5,000 - ₹10,000/day)');
  const [companions, setCompanions] = useState('Couple');
  const [wantDNA, setWantDNA] = useState<boolean | null>(null);
  const [dna, setDna] = useState<TripDNA>({
    history: 50, culture: 50, food: 50, nature: 50, adventure: 50, relaxation: 50
  });

  const [generatedTrip, setGeneratedTrip] = useState<Trip | null>(null);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(curr => curr + 1);
      
      // If moving to 'generating' step, start fake AI generation
      if (currentStep + 1 === 5) {
        setTimeout(() => {
          handleGenerateTrip();
        }, 3500); // 3.5 seconds of fake AI generation
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(curr => curr - 1);
  };

  const handleGenerateTrip = () => {
    const destLower = destination.toLowerCase();
    
    let generatedItinerary = [
      {
        day: 1,
        date: 'Day 1: Arrival & Forts',
        items: [
          { id: 'j1_1', time: '09:00 AM', activity: 'Arrival & Check-in', description: 'Arrive in Jaipur, check-in to your hotel and freshen up.', price: '—' },
          { id: 'j1_2', time: '10:30 AM', activity: 'Amer Fort Exploration', description: 'Walk up the grand ramparts of Amer Fort, exploring the stunning Sheesh Mahal (Mirror Palace).', price: '₹500' },
          { id: 'j1_3', time: '02:30 PM', activity: 'Jal Mahal Photo Stop', description: 'Admire the beautiful palace floating in the middle of Man Sagar Lake.', price: 'Free' },
          { id: 'j1_4', time: '04:30 PM', activity: 'Hawa Mahal & Rooftop Café', description: 'Witness the iconic pink facade of the Palace of Winds, followed by a warm tea at a rooftop café.', price: '₹200' }
        ]
      },
      {
        day: 2,
        date: 'Day 2: Royal Heritage & Feasts',
        items: [
          { id: 'j2_1', time: '09:30 AM', activity: 'City Palace Museum Tour', description: 'Visit the royal chambers, courtyards, and the private weapons gallery of the Maharaja.', price: '₹700' },
          { id: 'j2_2', time: '12:00 PM', activity: 'Jantar Mantar Observatory', description: 'Explore the UNESCO world heritage site featuring the world\'s largest stone sundial.', price: '₹200' },
          { id: 'j2_3', time: '03:00 PM', activity: 'Albert Hall Museum visit', description: 'Examine rare artifacts, portraits, and Egyptian mummies in this stunning Indo-Saracenic building.', price: '₹300' },
          { id: 'j2_4', time: '06:30 PM', activity: 'Chokhi Dhani Ethnic Resort', description: 'Enjoy Rajasthani folk dances, puppet shows, camel rides, and a luxurious traditional sit-down feast.', price: '₹1200' }
        ]
      },
      {
        day: 3,
        date: 'Day 3: Scenic Vistas & Crafts',
        items: [
          { id: 'j3_1', time: '09:30 AM', activity: 'Jaigarh Fort Excursion', description: 'Examine Jaivana, the world\'s largest cannon on wheels, and enjoy views of the hills.', price: '₹250' },
          { id: 'j3_2', time: '01:00 PM', activity: 'Johri Bazar Local Shopping', description: 'Shop for authentic hand-block print bedsheets, mojri leather shoes, and blue pottery.', price: '—' },
          { id: 'j3_3', time: '04:30 PM', activity: 'Nahargarh Fort Sunset View', description: 'Climb to Nahargarh Fort for a breathtaking panoramic sunset view over the Pink City.', price: '₹300' }
        ]
      }
    ];

    if (destLower.includes('kashmir') || destLower.includes('gulmarg') || destLower.includes('srinagar')) {
      generatedItinerary = [
        {
          day: 1,
          date: 'Day 1: Lakes & Houseboats',
          items: [
            { id: 'k1_1', time: '09:00 AM', activity: 'Airport Arrival & Houseboat Check-in', description: 'Fly into Srinagar. Check-in to a luxury cedar wood houseboat on Dal Lake/Nigeen Lake.', price: '—' },
            { id: 'k1_2', time: '02:00 PM', activity: 'Shikara Ride & Floating Markets', description: 'Take a traditional Shikara boat ride across Dal Lake, visiting floating flower shops and Char Chinar island.', price: '₹800' },
            { id: 'k1_3', time: '06:00 PM', activity: 'Hazratbal Shrine Sunset visit', description: 'Watch the sunset over the lake from the peaceful Hazratbal Shrine.', price: 'Free' }
          ]
        },
        {
          day: 2,
          date: 'Day 2: Gulmarg High-Altitude Snow',
          items: [
            { id: 'k2_1', time: '08:30 AM', activity: 'Scenic Drive to Gulmarg', description: 'Drive through pine forests and winding roads up to the mountain resort of Gulmarg.', price: '—' },
            { id: 'k2_2', time: '10:30 AM', activity: 'Gulmarg Gondola Phase 1 & 2', description: 'Ride the world\'s second-highest cable car up to Apharwat Peak at 14,000 ft for breathtaking snow peaks.', price: '₹920' },
            { id: 'k2_3', time: '01:00 PM', activity: 'Traditional Wazwan Feast', description: 'Have lunch at Highland Park hotel, enjoying authentic Kashmiri dishes like Rogan Josh and Rista.', price: '₹800' },
            { id: 'k2_4', time: '03:30 PM', activity: 'Strawberry Valley walk', description: 'Stroll through meadow valleys and see the historic St. Mary\'s stone church.', price: 'Free' }
          ]
        },
        {
          day: 3,
          date: 'Day 3: Mughal History & Pashmina Weavers',
          items: [
            { id: 'k3_1', time: '09:30 AM', activity: 'Mughal Gardens Tour', description: 'Visit the terraced gardens of Shalimar Bagh (Abode of Love) and Nishat Bagh built by Mughal emperors.', price: '₹100' },
            { id: 'k3_2', time: '01:30 PM', activity: 'Pashmina Weaving Workshop', description: 'Visit a local cooperative and watch artisans weave genuine Pashmina shawls by hand.', price: 'Free' },
            { id: 'k3_3', time: '04:30 PM', activity: 'Old City Heritage Walk', description: 'Walk through historic Zaina Kadal, cross wooden bridges, and visit the grand Jamia Masjid.', price: 'Free' }
          ]
        }
      ];
    } else if (destLower.includes('udaipur') || destLower.includes('rajasthan') || destLower.includes('jaisalmer')) {
      generatedItinerary = [
        {
          day: 1,
          date: 'Day 1: Palaces & Lake Pichola',
          items: [
            { id: 'u1_1', time: '09:30 AM', activity: 'Hotel Check-in & City Palace Tour', description: 'Check-in and visit the Udaipur City Palace, the largest palace complex in Rajasthan.', price: '₹400' },
            { id: 'u1_2', time: '03:30 PM', activity: 'Saheliyon-ki-Bari Gardens', description: 'Explore the historic Garden of the Maidens, famous for marble fountains and pools.', price: '₹100' },
            { id: 'u1_3', time: '05:30 PM', activity: 'Lake Pichola Sunset Boat Cruise', description: 'Watch the sunset cast a gold reflection over the Taj Lake Palace and Jag Mandir island.', price: '₹900' }
          ]
        },
        {
          day: 2,
          date: 'Day 2: Hills, Forts & Folk Dances',
          items: [
            { id: 'u2_1', time: '09:30 AM', activity: 'Vintage Car Museum', description: 'See the private collection of classic cars belonging to the Maharanas of Udaipur.', price: '₹400' },
            { id: 'u2_2', time: '12:00 PM', activity: 'Monsoon Palace Sunset View', description: 'Drive up to Sajjangarh Monsoon Palace on a high hill for a panoramic view of the lakes.', price: '₹300' },
            { id: 'u2_3', time: '03:30 PM', activity: 'Karni Mata Ropeway Ride', description: 'Take a cable car ride up to Karni Mata temple for scenic viewpoints.', price: '₹150' },
            { id: 'u2_4', time: '07:00 PM', activity: 'Dharohar Folk Dance Show', description: 'Watch puppet shows, pot dances, and traditional music at Bagore-ki-Haveli mansion.', price: '₹200' }
          ]
        },
        {
          day: 3,
          date: 'Day 3: Temples & Art Markets',
          items: [
            { id: 'u3_1', time: '09:00 AM', activity: 'Eklingji & Nagda Temple Ruins', description: 'Take a morning excursion to 10th-century temples dedicated to Shiva.', price: '₹300' },
            { id: 'u3_2', time: '02:00 PM', activity: 'Miniature Art Shopping', description: 'Shop for authentic Mewar miniature paintings and handicraft souvenirs at Hathi Pol bazaar.', price: '—' },
            { id: 'u3_3', time: '05:00 PM', activity: 'Ambrai Ghat lakeside stroll', description: 'Stroll along the waterfront, enjoying the best lakefront view of the illuminated City Palace.', price: 'Free' }
          ]
        }
      ];
    }

    const trip: Trip = {
      id: `trip_${Date.now()}`,
      destination: destination || 'Jaipur, Rajasthan',
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      duration: 3,
      budget,
      companions,
      dna: wantDNA ? dna : undefined,
      status: 'planning',
      itinerary: generatedItinerary
    };

    setGeneratedTrip(trip);
    setCurrentStep(6);
  };

  const handleSaveAndConfirm = () => {
    if (generatedTrip) {
      addTrip(generatedTrip);
    }
    navigate('/app/trips');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Where are you going?</h2>
            <div className="mt-6">
              <Input 
                icon={MapPin} 
                placeholder="e.g. Jaipur, Rajasthan" 
                value={destination}
                onChange={e => setDestination(e.target.value)}
              />
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>When and how long?</h2>
            <div className="flex gap-4 mt-6">
              <Input 
                type="date"
                label="Start Date"
                icon={Calendar} 
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
              <Input 
                type="date"
                label="End Date"
                icon={Calendar} 
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>What is your budget?</h2>
            <div className="options-grid mt-6">
              {['Budget (Under ₹5,000/day)', 'Standard (₹5,000 - ₹10,000/day)', 'Premium (₹10,000+/day)'].map(opt => (
                <Card 
                  key={opt}
                  variant="interactive" 
                  className={`option-card ${budget === opt ? 'selected' : ''}`}
                  onClick={() => setBudget(opt)}
                >
                  {opt}
                </Card>
              ))}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Who is travelling?</h2>
            <div className="options-grid mt-6">
              {['Solo', 'Couple', 'Family', 'Friends'].map(opt => (
                <Card 
                  key={opt}
                  variant="interactive" 
                  className={`option-card ${companions === opt ? 'selected' : ''}`}
                  onClick={() => setCompanions(opt)}
                >
                  {opt}
                </Card>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h2>Personalize this trip?</h2>
            <p className="text-secondary mt-2">Create a unique Tourist DNA profile just for {destination || 'this trip'}.</p>
            
            {wantDNA === null && (
              <div className="flex gap-4 mt-6">
                <Button variant="primary" onClick={() => setWantDNA(true)}>Yes, personalize it</Button>
                <Button variant="outline" onClick={() => { setWantDNA(false); nextStep(); }}>No, skip this</Button>
              </div>
            )}
            
            {wantDNA === true && (
              <div className="dna-sliders mt-6">
                {Object.entries(dna).map(([key, value]) => (
                  <div key={key} className="dna-slider-container">
                    <div className="flex justify-between mb-2">
                      <span style={{ textTransform: 'capitalize' }}>{key}</span>
                      <span className="text-gold">{value}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="100" 
                      value={value}
                      className="wanderly-slider"
                      onChange={(e) => setDna({...dna, [key]: parseInt(e.target.value)})}
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        );
      case 5:
        return (
          <motion.div 
            className="generating-step"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
          >
            <div className="ai-pulse">
              <Sparkles size={48} color="var(--color-accent-gold)" />
            </div>
            <h2 className="mt-8">Understanding your preferences...</h2>
            <p className="text-secondary mt-2">Exploring {destination || 'India'} to find local experiences.</p>
            
            <div className="progress-bar-container mt-8">
              <motion.div 
                className="progress-bar-fill"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3.5, ease: "linear" }}
              />
            </div>
          </motion.div>
        );
      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="plan-review-step"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2>Your Personalized Itinerary Is Ready! 🎉</h2>
                <p className="text-secondary mt-1">Hover over the timeline to explore days and activities.</p>
              </div>
            </div>

            {generatedTrip && (
              <ItineraryViewer 
                itinerary={generatedTrip.itinerary} 
                destinationName={generatedTrip.destination}
                accentColor="var(--color-accent-gold)"
              />
            )}

            <div className="flex justify-end gap-4 mt-8">
              <Button variant="outline" onClick={() => setCurrentStep(0)}>
                Plan Another
              </Button>
              <SpecularButton size="md" onClick={handleSaveAndConfirm}>
                <CheckCircle2 size={18} /> Save & View in My Trips
              </SpecularButton>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="plan-trip-container">
      {/* Progress Header */}
      {currentStep < 5 && (
        <div className="plan-progress">
          {steps.slice(0, 5).map((step, index) => (
            <div key={step.id} className={`progress-dot ${index === currentStep ? 'active' : index < currentStep ? 'completed' : ''}`} />
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <Card className="plan-card" padding="lg">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>

        {/* Navigation Actions */}
        {currentStep < 5 && (
          <div className="plan-actions mt-12">
            <Button variant="ghost" onClick={prevStep} disabled={currentStep === 0}>
              Back
            </Button>
            
            <Button 
              variant="primary" 
              onClick={nextStep}
              disabled={
                (currentStep === 0 && !destination) ||
                (currentStep === 4 && wantDNA === null)
              }
            >
              {currentStep === 4 ? 'Generate Trip' : 'Continue'} <ChevronRight size={18} />
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};
