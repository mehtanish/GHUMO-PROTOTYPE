import { useState, useEffect } from 'react';
import { getCurrentUserId, getStoredUsers, setCurrentUser, saveUsers } from '../store/authStore';
import type { UserProfile } from '../store/authStore';

export const useAuth = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      const users = getStoredUsers();
      const foundUser = users.find(u => u.id === userId);
      if (foundUser) {
        setUser(foundUser);
      }
    }
    setLoading(false);
  }, []);

  const login = (email: string) => {
    const users = getStoredUsers();
    // Simulate finding user by email
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      setCurrentUser(foundUser.id);
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (name: string, email: string) => {
    const users = getStoredUsers();
    const existing = users.find(u => u.email === email);
    if (existing) return false;

    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/notionists/svg?seed=${name}`,
      passportProgress: 0,
      impactScore: 0,
      savedPlaces: []
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser.id);
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setUser(null);
  };

  return { user, loading, login, register, logout };
};
