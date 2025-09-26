import React, { useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import LocalUserDashboard from './components/local/LocalUserDashboard';
import ManufacturerDashboard from './components/manufacturer/ManufacturerDashboard';
import RecyclerDashboard from './components/recycler/RecyclerDashboard';
import { User } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleRoleSelect = (role: User['role']) => {
    const mockUser: User = {
      id: '1',
      name: role === 'local' ? 'John Doe' : role === 'manufacturer' ? 'TechCorp Inc.' : 'EcoRecycle Center',
      email: role === 'local' ? 'john@example.com' : role === 'manufacturer' ? 'contact@techcorp.com' : 'info@ecorecycle.com',
      role
    };
    setCurrentUser(mockUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderDashboard = () => {
    if (!currentUser) return <LandingPage onRoleSelect={handleRoleSelect} />;
    
    switch (currentUser.role) {
      case 'local':
        return <LocalUserDashboard />;
      case 'manufacturer':
        return <ManufacturerDashboard />;
      case 'recycler':
        return <RecyclerDashboard />;
      default:
        return <LandingPage onRoleSelect={handleRoleSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={currentUser} 
        onRoleChange={handleRoleSelect}
        onLogout={handleLogout}
      />
      {renderDashboard()}
    </div>
  );
}

export default App;