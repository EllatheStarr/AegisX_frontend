import React from "react";
import { motion } from "framer-motion";
import { Shield, Menu, X, AlertTriangle } from "lucide-react";

const Header = ({ user, activeTab, setActiveTab, blockchainStatus, getUserInitials, boxShadow, glowEffect }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'blockchain', label: 'Blockchain' },
    { id: 'threats', label: 'Threats' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <header className="relative z-20 border-b border-gray-800/50 bg-gray-900/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              style={{ boxShadow: glowEffect }}
              className="mr-3 p-2 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
            >
              <Shield className="h-6 w-6 text-blue-400" />
            </motion.div>
            <span className="text-xl font-semibold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Aegis<span className="text-blue-400">X</span>
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-900/30 text-blue-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* User Menu & Info */}
          <div className="flex items-center space-x-4">
            {/* Blockchain Status Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`hidden md:flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${
                blockchainStatus.connected 
                  ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                  : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full mr-2 ${
                blockchainStatus.connected ? 'bg-green-400' : 'bg-yellow-400'
              }`}></span>
              {blockchainStatus.connected ? 'Connected' : 'Disconnected'}
            </motion.div>

            {/* User Avatar */}
            <motion.div 
              style={{ boxShadow }}
              className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-medium border border-gray-600"
              whileHover={{ scale: 1.05 }}
            >
              {getUserInitials()}
            </motion.div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden bg-gray-800/70 p-2 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden border-t border-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium ${
                  activeTab === item.id 
                    ? 'bg-blue-900/30 text-blue-400' 
                    : 'text-gray-400'
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
