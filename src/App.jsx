import { useState, useEffect } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { isAuthenticated } from './utils/api';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status for protected routes
    const checkAuthForProtectedRoutes = () => {
      const protectedRoutes = ['/dashboard'];
      
      // If current page is a protected route and user is not authenticated
      if (protectedRoutes.includes(currentPage) && !isAuthenticated()) {
        // Redirect to login
        window.history.pushState({}, "", "/login");
        setCurrentPage('/login');
      }
      
      setLoading(false);
    };
    
    checkAuthForProtectedRoutes();
  }, [currentPage]);

  // Simple client-side routing
  const renderPage = () => {
    if (loading) {
      return <div className="flex items-center justify-center h-screen bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
    }
    
    switch (currentPage) {
      case '/login':
        return <Login />;
      case '/signup':
        return <Signup />;
      case '/dashboard':
        // Additional runtime check to ensure protected routes remain protected
        return isAuthenticated() ? <Dashboard /> : <Login />;
      default:
        return <Homepage />;
    }
  };

  // Update URL without page refresh
  const navigate = (path) => {
    // Check if trying to access protected route
    if (path === '/dashboard' && !isAuthenticated()) {
      path = '/login';
    }
    
    window.history.pushState({}, "", path);
    setCurrentPage(path);
  };

  // Listen for back/forward button
  window.onpopstate = () => {
    setCurrentPage(window.location.pathname);
  };

  // Make navigate function available globally
  window.navigate = navigate;

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;