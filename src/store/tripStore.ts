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

export const getStoredTrips = (): Trip[] => {
  const trips = localStorage.getItem('wanderly_trips');
  return trips ? JSON.parse(trips) : [];
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
