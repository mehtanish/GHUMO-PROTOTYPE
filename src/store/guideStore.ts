export interface StudentGuide {
  id: string;
  name: string;
  city: string;
  university: string;
  languages: string[];
  specialities: string[];
  rating: number;
  reviews: number;
  price: number; // per 30 min session or per hour depending on type
  isOnline: boolean;
  avatar: string;
}

export const mockGuides: StudentGuide[] = [
  {
    id: 'g1',
    name: 'Rahul Sharma',
    city: 'Jaipur',
    university: 'University of Rajasthan',
    languages: ['English', 'Hindi'],
    specialities: ['History', 'Heritage', 'Local Food'],
    rating: 4.9,
    reviews: 128,
    price: 199,
    isOnline: true,
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rahul'
  },
  {
    id: 'g2',
    name: 'Zahra Wani',
    city: 'Srinagar',
    university: 'Kashmir University',
    languages: ['English', 'Kashmiri', 'Urdu'],
    specialities: ['Nature Walks', 'Shikara Routes', 'Local Wazwan'],
    rating: 4.9,
    reviews: 95,
    price: 199,
    isOnline: true,
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Zahra'
  },
  {
    id: 'g3',
    name: 'Vikram Rathore',
    city: 'Udaipur',
    university: 'Mohanlal Sukhadia University',
    languages: ['English', 'Hindi', 'Mewari'],
    specialities: ['Lakes & Palaces', 'Photography', 'Mewar History'],
    rating: 4.8,
    reviews: 64,
    price: 249,
    isOnline: false,
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Vikram'
  },
  {
    id: 'g4',
    name: 'Meera Bai',
    city: 'Jaisalmer',
    university: 'Rajasthan Agricultural University',
    languages: ['English', 'Hindi', 'Marwari'],
    specialities: ['Desert Safaris', 'Fort Exploration', 'Folk Music'],
    rating: 5.0,
    reviews: 210,
    price: 199,
    isOnline: true,
    avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Meera'
  }
];

export interface GuideBooking {
  id: string;
  guideId: string;
  guideName: string;
  travelerName: string;
  travelerAvatar: string;
  travelerLocation: string;
  sessionType: 'virtual' | 'physical';
  date: string;
  timeSlot: string;
  topic: string;
  amount: number;
  status: 'Confirmed' | 'Completed' | 'In Progress';
  notes?: string;
}

export const initialGuideBookings: GuideBooking[] = [
  {
    id: 'b1',
    guideId: 'g2', // Zahra Wani
    guideName: 'Zahra Wani',
    travelerName: 'Sarah Jenkins',
    travelerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    travelerLocation: 'London, UK',
    sessionType: 'virtual',
    date: 'Today',
    timeSlot: '04:30 PM',
    topic: 'Kashmir Houseboat Stay & Gulmarg Gondola Tips',
    amount: 199,
    status: 'Confirmed',
    notes: 'Wants to know authentic Wazwan food places in Srinagar and best time to ride Gondola.'
  },
  {
    id: 'b2',
    guideId: 'g2', // Zahra Wani
    guideName: 'Zahra Wani',
    travelerName: 'Arjun Mehta',
    travelerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    travelerLocation: 'Mumbai, India',
    sessionType: 'physical',
    date: 'Tomorrow',
    timeSlot: '10:00 AM',
    topic: 'Lal Chowk Craft Shopping & Shikara Ride',
    amount: 499,
    status: 'Confirmed',
    notes: 'Looking for authentic Pashmina shawl shops without middleman markup.'
  },
  {
    id: 'b3',
    guideId: 'g1', // Rahul Sharma
    guideName: 'Rahul Sharma',
    travelerName: 'Emily Watson',
    travelerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    travelerLocation: 'Sydney, Australia',
    sessionType: 'virtual',
    date: 'Today',
    timeSlot: '06:00 PM',
    topic: 'Jaipur Forts & Sunset Spots Walkthrough',
    amount: 199,
    status: 'Confirmed',
    notes: 'Needs help planning Amer Fort and Nahargarh sunset timing.'
  },
  {
    id: 'b4',
    guideId: 'g3', // Vikram Rathore
    guideName: 'Vikram Rathore',
    travelerName: 'David Miller',
    travelerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    travelerLocation: 'Chicago, USA',
    sessionType: 'physical',
    date: 'Yesterday',
    timeSlot: '02:00 PM',
    topic: 'Udaipur City Palace & Lake Pichola Boat Tour',
    amount: 599,
    status: 'Completed',
    notes: 'Great session, left 5-star review.'
  }
];

export const getGuidesHiredCount = (): number => {
  const count = localStorage.getItem('wanderly_guides_hired');
  return count ? parseInt(count, 10) : 0;
};

export const getGuideBookings = (guideId?: string): GuideBooking[] => {
  const stored = localStorage.getItem('wanderly_guide_bookings');
  let bookings: GuideBooking[] = stored ? JSON.parse(stored) : initialGuideBookings;
  if (guideId) {
    bookings = bookings.filter(b => b.guideId === guideId);
  }
  return bookings;
};

export const saveGuideBookings = (bookings: GuideBooking[]) => {
  localStorage.setItem('wanderly_guide_bookings', JSON.stringify(bookings));
};

export const bookGuide = (guideId: string, type: 'virtual' | 'physical') => {
  const currentCount = getGuidesHiredCount();
  localStorage.setItem('wanderly_guides_hired', (currentCount + 1).toString());
  
  const guide = mockGuides.find(g => g.id === guideId) || mockGuides[0];
  const newBooking: GuideBooking = {
    id: 'b_' + Date.now(),
    guideId: guide.id,
    guideName: guide.name,
    travelerName: 'You (Current Traveler)',
    travelerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    travelerLocation: 'Explorer',
    sessionType: type,
    date: 'Just Now',
    timeSlot: 'Live Session',
    topic: `Local Insights & Guiding for ${guide.city}`,
    amount: type === 'virtual' ? guide.price : guide.price * 2,
    status: 'Confirmed',
    notes: 'Direct session request placed via Ghumo Portal.'
  };

  const existing = getGuideBookings();
  existing.unshift(newBooking);
  saveGuideBookings(existing);

  console.log(`Booked guide ${guideId} for ${type} session`);
  return true;
};

export const getActiveGuideUser = (): StudentGuide => {
  const storedId = localStorage.getItem('wanderly_active_guide_id');
  return mockGuides.find(g => g.id === storedId) || mockGuides[1]; // Default to Zahra Wani
};

export const setActiveGuideUser = (guideId: string) => {
  localStorage.setItem('wanderly_active_guide_id', guideId);
};

