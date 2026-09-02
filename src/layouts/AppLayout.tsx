import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Compass, LayoutDashboard, Map, MapPin, 
  MessageSquareText, Users, DollarSign, Calendar, 
  Award, Heart, Settings, LogOut, Search, Bell, Menu, X, Sparkles, Building2
} from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import { Button } from '../components/Button';
import { WhatCanIDoModal } from '../components/WhatCanIDoModal';
import GhostFibers from '../components/GhostFibers';
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
    { name: 'Hotels', path: '/app/hotels', icon: Building2 },
    { name: 'My Trips', path: '/app/trips', icon: MapPin },
    { name: 'India Passport', path: '/app/passport', icon: Award },
    { name: 'Impact Score', path: '/app/impact', icon: Heart },
    { name: 'Saved Places', path: '/app/saved', icon: Heart },
  ];

  return (
    <div className="app-layout" style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
          lightMode={false}
          fps={60}
          paused={false}
        />
      </div>
      {/* Mobile sidebar toggle */}
      <div className="mobile-header md-hidden">
        <div className="logo-container">
          <Compass className="logo-icon" size={24} />
          <span className="logo-text playfair-display-sc-bold">Ghumo</span>
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
            <span className="logo-text playfair-display-sc-bold">Ghumo</span>
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
