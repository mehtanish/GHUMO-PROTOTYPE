export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  passportProgress: number;
  impactScore: number;
  savedPlaces: string[];
}

export const getStoredUsers = (): UserProfile[] => {
  const users = localStorage.getItem('wanderly_users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: UserProfile[]) => {
  localStorage.setItem('wanderly_users', JSON.stringify(users));
};

export const getCurrentUserId = (): string | null => {
  return localStorage.getItem('wanderly_auth');
};

export const setCurrentUser = (id: string | null) => {
  if (id) {
    localStorage.setItem('wanderly_auth', id);
  } else {
    localStorage.removeItem('wanderly_auth');
  }
};
