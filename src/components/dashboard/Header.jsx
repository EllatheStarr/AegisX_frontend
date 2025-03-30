import React from "react";
import { motion } from "framer-motion";

const Header = ({ user, activeTab, setActiveTab, blockchainStatus, getUserInitials }) => {
  return (
    <header className="relative z-10 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 py-4 px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold text-white flex items-center">
            <svg 
              className="w-8 h-8 mr-2 text-blue-400" 
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: 'drop-shadow(0 0 0.15rem rgba(96, 165, 250, 0.5))' }}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            AegisX Dashboard
          </h1>
          <nav className="hidden md:flex space-x-6">
            <motion.button 
              className={`px-1 py-2 font-medium transition-colors ${activeTab === 'overview' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('overview')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Overview
            </motion.button>
            <motion.button 
              className={`px-1 py-2 font-medium transition-colors ${activeTab === 'threats' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('threats')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Threat Intelligence
            </motion.button>
            <motion.button 
              className={`px-1 py-2 font-medium transition-colors ${activeTab === 'blockchain' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('blockchain')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Blockchain Security
            </motion.button>
            <motion.button 
              className={`px-1 py-2 font-medium transition-colors ${activeTab === 'settings' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-200'}`}
              onClick={() => setActiveTab('settings')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Security Settings
            </motion.button>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* Blockchain Connection Status */}
          <div className="hidden md:flex items-center mr-3">
            <div className={`w-2 h-2 rounded-full mr-2 ${blockchainStatus.connected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-gray-400">
              {blockchainStatus.connected ? 'Blockchain Connected' : 'Blockchain Disconnected'}
            </span>
          </div>
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
              {getUserInitials()}
            </div>
            <span className="hidden md:inline-block text-sm font-medium">
              {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
