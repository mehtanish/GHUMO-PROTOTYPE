import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAuthContext } from '../context/AuthContext';
import { LogOut, Award, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all demo data? This cannot be undone.")) {
      localStorage.clear();
      window.location.href = '/';
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: 'var(--spacing-8)' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('profile')}
          style={{ padding: '0.5rem 1rem', borderBottom: activeTab === 'profile' ? '2px solid var(--color-accent-gold)' : '2px solid transparent', color: activeTab === 'profile' ? 'var(--text-primary)' : 'var(--text-tertiary)', fontWeight: 500 }}
        >
          Profile
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          style={{ padding: '0.5rem 1rem', borderBottom: activeTab === 'settings' ? '2px solid var(--color-accent-gold)' : '2px solid transparent', color: activeTab === 'settings' ? 'var(--text-primary)' : 'var(--text-tertiary)', fontWeight: 500 }}
        >
          Settings
        </button>
      </div>

      {activeTab === 'profile' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          <Card padding="lg" style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
            <img src={user?.avatar} alt={user?.name} style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid var(--border-light)' }} />
            <div>
              <h2>{user?.name}</h2>
              <p className="text-secondary">{user?.email}</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <span className="text-sm text-tertiary">India</span>
                <span className="text-sm text-tertiary">Speaks English, Hindi</span>
              </div>
            </div>
          </Card>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
            <Card variant="interactive" padding="md" onClick={() => navigate('/app/passport')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Award size={32} color="var(--color-accent-gold)" />
                <div>
                  <h4>India Passport</h4>
                  <p className="text-secondary text-sm">3 Badges Unlocked</p>
                </div>
              </div>
            </Card>
            
            <Card variant="interactive" padding="md" onClick={() => navigate('/app/impact')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Heart size={32} color="var(--color-success)" />
                <div>
                  <h4>Impact Score</h4>
                  <p className="text-secondary text-sm">{user?.impactScore}/100 points</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        <Card padding="lg">
          <h2 className="mb-6">Account Settings</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <h4>Notifications</h4>
                <p className="text-secondary text-sm">Manage trip and guide alerts</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <h4>Privacy</h4>
                <p className="text-secondary text-sm">Manage your data and visibility</p>
              </div>
              <Button variant="outline">Configure</Button>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <h4 style={{ color: 'var(--color-warning)' }}>Reset Demo Data</h4>
                <p className="text-secondary text-sm">Clear all local storage data</p>
              </div>
              <Button variant="outline" onClick={handleReset} style={{ borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}>Reset</Button>
            </div>
            
            <div className="mt-6">
              <Button variant="ghost" onClick={handleLogout} style={{ color: 'var(--color-warning)' }} icon={<LogOut size={16} />}>
                Logout
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
