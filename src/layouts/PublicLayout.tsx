import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Compass, LayoutDashboard, LogOut } from 'lucide-react';
import { Button } from '../components/Button';
import { useAuthContext } from '../context/AuthContext';
import './PublicLayout.css';

export const PublicLayout: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();

  return (
    <div className="public-layout">
      <nav className="public-nav">
        <div className="nav-container">
          <Link to="/" className="nav-logo cursor-target">
            <Compass className="logo-icon" size={28} />
            <span className="logo-text playfair-display-sc-bold">Ghumo</span>
          </Link>
          <div className="nav-actions">
            {user ? (
              <>
                <Button variant="primary" className="cursor-target" onClick={() => navigate('/app')}>
                  <LayoutDashboard size={18} style={{ marginRight: 6 }} /> Go to App
                </Button>
                <Button variant="ghost" className="cursor-target" onClick={() => logout()}>
                  <LogOut size={18} style={{ marginRight: 6 }} /> Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" className="cursor-target" onClick={() => navigate('/login')}>
                  Sign In
                </Button>
                <Button variant="primary" className="cursor-target" onClick={() => navigate('/register')}>
                  Create Account
                </Button>
                <Button variant="glass" className="cursor-target" onClick={() => navigate('/guide-login')}>
                  Guide Login
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="public-main">
        <Outlet />
      </main>
      <footer className="public-footer">
        <p>&copy; {new Date().getFullYear()} Ghumo. Experience India.</p>
      </footer>
    </div>
  );
};
