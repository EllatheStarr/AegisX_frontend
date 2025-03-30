import { useState, useEffect, useRef } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { isAuthenticated, getCurrentUser } from './utils/api';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [loading, setLoading] = useState(true);
  const navigationInProgressRef = useRef(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // First check if token exists in localStorage to avoid flashing login page
    const checkInitialAuth = async () => {
      try {
        const authenticated = isAuthenticated();
        const userData = getCurrentUser();
        setUser(userData);
        
        console.log("App init - authenticated:", authenticated);
        console.log("App init - userData:", userData);
        
        const path = window.location.pathname;
        
        // If on a protected route but not authenticated, redirect to login
        if (path === '/dashboard' && !authenticated) {
          console.log("Protected route without auth, redirecting to login");
          window.history.pushState({}, "", "/login");
          setCurrentPage('/login');
        }
        // If on login/signup but already authenticated, redirect to dashboard
        else if ((path === '/login' || path === '/signup') && authenticated) {
          console.log("Already authenticated, redirecting to dashboard");
          window.history.pushState({}, "", "/dashboard");
          setCurrentPage('/dashboard');
        }
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    };
    
    checkInitialAuth();
  }, []); // Empty dependency array means this runs once on mount

  // The rest of useEffect to handle navigation changes
  useEffect(() => {
    // Skip if still loading initial state
    if (loading) return;
    
    // Check authentication status for protected routes
    const checkAuthForProtectedRoutes = () => {
      // If we're already processing a navigation, skip to prevent loops
      if (navigationInProgressRef.current) {
        return;
      }
      
      const protectedRoutes = ['/dashboard'];
      
      // If current page is a protected route and user is not authenticated
      if (protectedRoutes.includes(currentPage) && !isAuthenticated()) {
        // Prevent navigation loops
        navigationInProgressRef.current = true;
        
        // Redirect to login
        window.history.pushState({}, "", "/login");
        setCurrentPage('/login');
        
        // Reset navigation flag after state update
        setTimeout(() => {
          navigationInProgressRef.current = false;
        }, 100);
      }
    };
    
    checkAuthForProtectedRoutes();
  }, [currentPage, loading]);

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
        // Simply render Dashboard component - authentication check is done in useEffect
        return <Dashboard />;
      default:
        return <Homepage />;
    }
  };

  // Update URL without page refresh
  const navigate = (path) => {
    console.log("Navigate called with path:", path);
    
    // Skip if we're already handling navigation
    if (navigationInProgressRef.current) return;
    
    // Set navigation flag to avoid loops
    navigationInProgressRef.current = true;
    
    // Check if trying to access protected route
    if (path === '/dashboard' && !isAuthenticated()) {
      console.log("Attempt to navigate to dashboard without auth, redirecting to login");
      path = '/login';
    }
    
    window.history.pushState({}, "", path);
    setCurrentPage(path);
    
    // Reset navigation flag after state update
    setTimeout(() => {
      navigationInProgressRef.current = false;
    }, 100);
  };

  // Listen for back/forward button
  useEffect(() => {
    const handlePopState = () => {
      if (!navigationInProgressRef.current) {
        setCurrentPage(window.location.pathname);
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Make navigate function available globally
  window.navigate = navigate;

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;