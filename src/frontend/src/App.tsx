import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import './App.css';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Auth
import { AuthContainer } from './components/auth/AuthContainer';

// Dashboard
import { Dashboard } from './components/dashboard/Dashboard';

// PARA Components
import { Projects } from './components/para/Projects';
import { Areas } from './components/para/Areas';
import { Resources } from './components/para/Resources';
import { Archives } from './components/para/Archives';

// Service
import { authService } from './services/authService';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check authentication status on load
  useEffect(() => {
    const checkAuth = async () => {
      // In a real app, this would validate the token with the backend
      const auth = await authService.isLoggedIn();
      setIsAuthenticated(auth);
    };

    checkAuth();
  }, []);

  // Handle login success
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = async () => {
    await authService.logout();
    localStorage.removeItem('jarvis_auth_token');
    setIsAuthenticated(false);
  };

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <MantineProvider>
        <div style={{ height: '100vh', position: 'relative' }}>
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)'
          }}>
            Loading...
          </div>
        </div>
      </MantineProvider>
    );
  }

  return (
    <MantineProvider>
      <BrowserRouter>
        {!isAuthenticated ? (
          <Routes>
            <Route
              path="/*"
              element={<AuthContainer onAuthSuccess={handleAuthSuccess} />}
            />
          </Routes>
        ) : (
          <Routes>
            <Route element={<AppLayout onLogout={handleLogout} />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/areas" element={<Areas />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/archives" element={<Archives />} />
              <Route path="/settings" element={<div>Settings (Not implemented in prototype)</div>} />
              <Route path="/help" element={<div>Help (Not implemented in prototype)</div>} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
