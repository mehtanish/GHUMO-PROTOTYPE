export interface TripDNA {
  history: number;
  culture: number;
  food: number;
  nature: number;
  adventure: number;
  relaxation: number;
}

export interface ItineraryItem {
  id: string;
  time: string;
  activity: string;
  description: string;
  price: string;
}

export interface TripDay {
  day: number;
  date: string;
  items: ItineraryItem[];
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: number; // in days
  budget: string;
  companions: string;
  dna?: TripDNA;
  itinerary: TripDay[];
  status: 'planning' | 'upcoming' | 'completed';
}

const DEFAULT_SAMPLE_TRIPS: Trip[] = [
  {
    id: 'sample_jaipur',
    destination: 'Jaipur, Rajasthan',
    startDate: '2026-09-10',
    endDate: '2026-09-13',
    duration: 3,
    budget: 'Standard (₹5,000 - ₹10,000/day)',
    companions: 'Couple',
    status: 'upcoming',
    itinerary: [
      {
        day: 1,
        date: 'Day 1: Arrival & Forts',
        items: [
          { id: 'j1_1', time: '09:00 AM', activity: 'Arrival & Check-in', description: 'Arrive in Jaipur, check-in to heritage hotel and freshen up.', price: '—' },
          { id: 'j1_2', time: '10:30 AM', activity: 'Amer Fort Exploration', description: 'Walk up the grand ramparts of Amer Fort, exploring Sheesh Mahal (Mirror Palace).', price: '₹500' },
          { id: 'j1_3', time: '02:30 PM', activity: 'Jal Mahal Photo Stop', description: 'Admire the palace floating in the middle of Man Sagar Lake.', price: 'Free' },
          { id: 'j1_4', time: '04:30 PM', activity: 'Hawa Mahal & Rooftop Café', description: 'Witness the iconic pink facade of the Palace of Winds, followed by tea.', price: '₹200' }
        ]
      },
      {
        day: 2,
        date: 'Day 2: Royal Heritage & Feasts',
        items: [
          { id: 'j2_1', time: '09:30 AM', activity: 'City Palace Museum Tour', description: 'Visit royal chambers, courtyards, and Maharaja weapons gallery.', price: '₹700' },
          { id: 'j2_2', time: '12:00 PM', activity: 'Jantar Mantar Observatory', description: 'Explore UNESCO world heritage site featuring world\'s largest stone sundial.', price: '₹200' },
          { id: 'j2_3', time: '03:00 PM', activity: 'Albert Hall Museum visit', description: 'Examine rare artifacts, portraits, and Indo-Saracenic architecture.', price: '₹300' },
          { id: 'j2_4', time: '06:30 PM', activity: 'Chokhi Dhani Ethnic Resort', description: 'Rajasthani folk dances, puppet shows, camel rides, and traditional feast.', price: '₹1200' }
        ]
      },
      {
        day: 3,
        date: 'Day 3: Scenic Vistas & Crafts',
        items: [
          { id: 'j3_1', time: '09:30 AM', activity: 'Jaigarh Fort Excursion', description: 'Examine Jaivana, the world\'s largest cannon on wheels, with hill views.', price: '₹250' },
          { id: 'j3_2', time: '01:00 PM', activity: 'Johri Bazar Local Shopping', description: 'Shop for authentic hand-block prints, mojri shoes, and blue pottery.', price: '—' },
          { id: 'j3_3', time: '04:30 PM', activity: 'Nahargarh Fort Sunset View', description: 'Climb to Nahargarh Fort for a breathtaking panoramic sunset over the Pink City.', price: '₹300' }
        ]
      }
    ]
  },
  {
    id: 'sample_kashmir',
    destination: 'Srinagar & Gulmarg, Kashmir',
    startDate: '2026-10-05',
    endDate: '2026-10-08',
    duration: 3,
    budget: 'Premium (₹10,000+/day)',
    companions: 'Friends',
    status: 'planning',
    itinerary: [
      {
        day: 1,
        date: 'Day 1: Lakes & Houseboats',
        items: [
          { id: 'k1_1', time: '09:00 AM', activity: 'Houseboat Check-in', description: 'Fly into Srinagar. Check-in to luxury cedar wood houseboat on Nigeen Lake.', price: '—' },
          { id: 'k1_2', time: '02:00 PM', activity: 'Shikara Ride & Floating Markets', description: 'Traditional Shikara boat ride across Dal Lake to Char Chinar island.', price: '₹800' },
          { id: 'k1_3', time: '06:00 PM', activity: 'Hazratbal Shrine Sunset', description: 'Watch the sunset over the peaceful lake waters from the shrine.', price: 'Free' }
        ]
      },
      {
        day: 2,
        date: 'Day 2: Gulmarg Snow & Gondola',
        items: [
          { id: 'k2_1', time: '08:30 AM', activity: 'Scenic Drive to Gulmarg', description: 'Drive through pine forests and winding roads to Gulmarg mountain resort.', price: '—' },
          { id: 'k2_2', time: '10:30 AM', activity: 'Gulmarg Gondola Ride', description: 'Ride world\'s 2nd-highest cable car to Apharwat Peak at 14,000 ft.', price: '₹920' },
          { id: 'k2_3', time: '01:00 PM', activity: 'Authentic Wazwan Feast', description: 'Enjoy Kashmiri specialties like Rogan Josh, Rista, and saffron rice.', price: '₹800' }
        ]
      },
      {
        day: 3,
        date: 'Day 3: Mughal Heritage & Artisans',
        items: [
          { id: 'k3_1', time: '09:30 AM', activity: 'Mughal Gardens Tour', description: 'Visit terraced gardens of Shalimar Bagh and Nishat Bagh.', price: '₹100' },
          { id: 'k3_2', time: '01:30 PM', activity: 'Pashmina Weaving Workshop', description: 'Watch master artisans weave pure Pashmina shawls on handlooms.', price: 'Free' },
          { id: 'k3_3', time: '04:30 PM', activity: 'Old City Heritage Stroll', description: 'Cross historic wooden bridges and visit grand Jamia Masjid.', price: 'Free' }
        ]
      }
    ]
  }
];

export const getStoredTrips = (): Trip[] => {
  const trips = localStorage.getItem('wanderly_trips');
  if (trips) {
    try {
      const parsed = JSON.parse(trips);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch {
      // fallback
    }
  }
  return DEFAULT_SAMPLE_TRIPS;
};

export const saveTrips = (trips: Trip[]) => {
  localStorage.setItem('wanderly_trips', JSON.stringify(trips));
};

export const addTrip = (trip: Trip) => {
  const trips = getStoredTrips();
  trips.push(trip);
  saveTrips(trips);
};

export const updateTrip = (updatedTrip: Trip) => {
  let trips = getStoredTrips();
  trips = trips.map(t => t.id === updatedTrip.id ? updatedTrip : t);
  saveTrips(trips);
};
