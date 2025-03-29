import { useState } from 'react';
import './App.css';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  // Simple client-side routing
  const renderPage = () => {
    switch (currentPage) {
      case '/login':
        return <Login />;
      case '/signup':
        return <Signup />;
      default:
        return <Homepage />;
    }
  };

  // Update URL without page refresh
  const navigate = (path) => {
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