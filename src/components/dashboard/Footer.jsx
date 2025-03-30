import React from "react";
import { motion } from "framer-motion";

const Footer = ({ isLoggingOut, handleLogout, border }) => {
  return (
    <footer className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-t border-gray-800 p-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-400">© 2025 AegisX. All rights reserved.</p>
        <motion.button 
          className={`text-sm rounded-full px-4 py-1 flex items-center justify-center ${isLoggingOut ? 'opacity-70' : 'hover:text-white text-gray-400'}`}
          whileHover={isLoggingOut ? {} : { scale: 1.05 }}
          whileTap={isLoggingOut ? {} : { scale: 0.95 }}
          style={{ border }}
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging out...
            </>
          ) : (
            'Log Out'
          )}
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
