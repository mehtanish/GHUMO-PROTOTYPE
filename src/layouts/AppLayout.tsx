import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Compass, LayoutDashboard, Map, MapPin, 
  MessageSquareText, Users, DollarSign, Calendar, 
  Award, Heart, Settings, LogOut, Search, Bell, Menu, X, Sparkles
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/Button';
import { WhatCanIDoModal } from '../components/WhatCanIDoModal';
import './AppLayout.css';

export const AppLayout: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isWhatCanIDoOpen, setIsWhatCanIDoOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: LayoutDashboard },
    { name: 'Explore India', path: '/app/explore', icon: Map },
    { name: 'Plan a Trip', path: '/app/plan', icon: Calendar },
    { name: 'AI Assistant', path: '/app/ai', icon: MessageSquareText },
    { name: 'Ask a Local', path: '/app/ask-local', icon: Users },
    { name: 'Student Guides', path: '/app/guides', icon: Users },
    { name: 'Fair Price', path: '/app/fair-price', icon: DollarSign },
    { name: 'My Trips', path: '/app/trips', icon: MapPin },
    { name: 'India Passport', path: '/app/passport', icon: Award },
    { name: 'Impact Score', path: '/app/impact', icon: Heart },
    { name: 'Saved Places', path: '/app/saved', icon: Heart },
  ];

  return (
    <div className="app-layout">
      {/* Mobile sidebar toggle */}
      <div className="mobile-header md-hidden">
        <div className="logo-container">
          <Compass className="logo-icon" size={24} />
          <span className="logo-text">Ghumo</span>
        </div>
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <Compass className="logo-icon" size={28} />
            <span className="logo-text">Ghumo</span>
          </div>
          <button className="close-btn md-hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink 
                  to={item.path} 
                  end={item.path === '/app'}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <ul className="nav-list">
            <li>
              <NavLink to="/app/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <Settings size={20} />
                <span>Settings</span>
              </NavLink>
            </li>
            <li>
              <button className="nav-link logout-btn" onClick={handleLogout}>
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="sidebar-overlay md-hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        {/* Topbar */}
        <header className="topbar">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search destinations, experiences, guides..." 
            />
            <div className="search-shortcut">⌘K</div>
          </div>
          
          <div className="topbar-actions">
            <Button
              variant="primary"
              size="sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onClick={() => setIsWhatCanIDoOpen(true)}
            >
              <Sparkles size={16} />
              <span>What can I do now?</span>
            </Button>
            <button className="icon-btn">
              <Bell size={20} />
            </button>
            <div className="user-profile">
              <img src={user?.avatar} alt={user?.name} className="user-avatar" />
              <span className="user-name">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          <Outlet />
        </main>
      </div>

      <WhatCanIDoModal
        isOpen={isWhatCanIDoOpen}
        onClose={() => setIsWhatCanIDoOpen(false)}
      />
    </div>
  );
};
