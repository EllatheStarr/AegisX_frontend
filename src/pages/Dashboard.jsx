import React, { useState, useEffect } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import { authAPI, getCurrentUser } from "../utils/api";
import { globalLoadingHandler } from "../utils/interceptors";

// Same color scheme as AuroraHero for consistency
const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

// Fintech-specific mock data
const recentThreats = [
  { id: 1, type: "Payment Fraud Attempt", severity: "Critical", time: "10 min ago", status: "Blocked", source: "193.27.14.92" },
  { id: 2, type: "Suspicious API Integration", severity: "High", time: "23 min ago", status: "Investigating", source: "Payment Gateway" },
  { id: 3, type: "KYC Verification Bypass", severity: "Critical", time: "1 hour ago", status: "Blocked", source: "Mobile App" },
  { id: 4, type: "Account Takeover Attempt", severity: "High", time: "2 hours ago", status: "Quarantined", source: "User Login System" },
  { id: 5, type: "Abnormal Transaction Pattern", severity: "Medium", time: "3 hours ago", status: "Flagged", source: "Credit Card Processing" },
];

const securityScore = 87;
const scanStatus = "Last scan completed: Today at 14:32";
const vulnerabilitiesSummary = { critical: 1, high: 3, medium: 7, low: 12 };
const complianceStatus = { pci: 92, gdpr: 97, sox: 86, aml: 95 };

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    // Get current user data from localStorage
    const currentUser = getCurrentUser();
    if (!currentUser) {
      // Redirect to login if no user found
      window.navigate('/login');
      return;
    }
    
    setUser(currentUser);

    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "?";
    
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      globalLoadingHandler.startLoading();
      await authAPI.logout();
      window.navigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      // Still redirect to login even if API call fails
      window.navigate('/login');
    } finally {
      setIsLoggingOut(false);
      globalLoadingHandler.endLoading();
    }
  };

  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const gradientBg = useMotionTemplate`linear-gradient(to bottom, rgba(2, 6, 23, 0.8), rgba(2, 6, 23, 0.95)), radial-gradient(circle at top, ${color}, transparent 70%)`;

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen flex flex-col relative">
      {/* Stars Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>

      {/* Header */}
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

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-6 overflow-auto" style={{ background: gradientBg }}>
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 p-6 bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Fintech Security Operations Center</h2>
          <p className="text-gray-400">Protecting your digital financial platform with advanced threat intelligence and prevention.</p>
        </motion.div>
        
        {/* Security Score and Core Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            style={{ boxShadow }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-medium mb-4">Banking Platform Security</h3>
            <div className="flex items-center mb-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-blue-500 mr-4">
                <span className="text-xl font-bold">{securityScore}%</span>
              </div>
              <div>
                <p className="text-sm text-gray-400">{scanStatus}</p>
                <p className={`text-sm font-medium ${securityScore > 80 ? 'text-green-400' : securityScore > 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                  {securityScore > 80 ? 'Good' : securityScore > 60 ? 'Needs Attention' : 'At Risk'}
                </p>
              </div>
            </div>
            <button className="text-blue-400 text-sm hover:underline">View Security Report →</button>
          </motion.div>
          
          <motion.div 
            className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            style={{ boxShadow }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              duration: 0.5, 
              delay: 0.2 
            }}
          >
            <h3 className="text-lg font-medium mb-4">Financial Transaction Security</h3>
            <div className="flex space-x-4 mb-2">
              <div className="flex-1 bg-gray-700 p-3 rounded text-center">
                <span className="block text-2xl font-bold text-green-400">4.2K</span>
                <span className="text-xs text-gray-400">Secure Transactions</span>
              </div>
              <div className="flex-1 bg-gray-700 p-3 rounded text-center">
                <span className="block text-2xl font-bold text-yellow-400">16</span>
                <span className="text-xs text-gray-400">Flagged</span>
              </div>
              <div className="flex-1 bg-gray-700 p-3 rounded text-center">
                <span className="block text-2xl font-bold text-red-400">3</span>
                <span className="text-xs text-gray-400">Blocked</span>
              </div>
            </div>
            <button className="text-blue-400 text-sm hover:underline">View Transaction Monitor →</button>
          </motion.div>
          
          <motion.div 
            className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            style={{ boxShadow }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              duration: 0.5, 
              delay: 0.3 
            }}
          >
            <h3 className="text-lg font-medium mb-4">User Authentication</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Successful Logins</span>
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center text-green-400 font-bold bg-gray-700 rounded">957</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">MFA Challenges</span>
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center text-blue-400 font-bold bg-gray-700 rounded">143</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Failed Attempts</span>
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center text-orange-400 font-bold bg-gray-700 rounded">28</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Blocked IPs</span>
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center text-red-400 font-bold bg-gray-700 rounded">12</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Financial Threats */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Financial Threat Intelligence</h3>
            <motion.button 
              className="text-sm text-blue-400 hover:underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Threats
            </motion.button>
          </div>
          <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Threat Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Severity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Source</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Time</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {recentThreats.map((threat) => (
                  <tr key={threat.id} className="hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{threat.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        threat.severity === 'Critical' ? 'bg-red-900 text-red-300' :
                        threat.severity === 'High' ? 'bg-orange-900 text-orange-300' :
                        threat.severity === 'Medium' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-blue-900 text-blue-300'
                      }`}>
                        {threat.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{threat.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        threat.status === 'Blocked' ? 'bg-green-900 text-green-300' :
                        threat.status === 'Investigating' ? 'bg-blue-900 text-blue-300' :
                        threat.status === 'Quarantined' ? 'bg-purple-900 text-purple-300' :
                        'bg-yellow-900 text-yellow-300'
                      }`}>
                        {threat.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-400 hover:text-blue-300">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        
        {/* Compliance and Realtime Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div 
            className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              duration: 0.5, 
              delay: 0.5 
            }}
            style={{ boxShadow }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-lg font-medium mb-4">Financial Compliance Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="block font-medium">PCI-DSS Compliance</span>
                  <span className="text-sm text-gray-400">Payment Card Security</span>
                </div>
                <span className="text-green-400 flex items-center">
                  <span className="mr-2">{complianceStatus.pci}%</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="block font-medium">AML Monitoring</span>
                  <span className="text-sm text-gray-400">Anti-Money Laundering</span>
                </div>
                <span className="text-green-400 flex items-center">
                  <span className="mr-2">{complianceStatus.aml}%</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
                <div>
                  <span className="block font-medium">GDPR Status</span>
                  <span className="text-sm text-gray-400">Data Privacy</span>
                </div>
                <span className="text-green-400 flex items-center">
                  <span className="mr-2">{complianceStatus.gdpr}%</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            style={{ boxShadow }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              duration: 0.5, 
              delay: 0.6 
            }}
          >
            <h3 className="text-lg font-medium mb-4">System Vulnerabilities</h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              <div className="p-3 bg-red-900/40 rounded text-center">
                <span className="block text-2xl font-bold text-red-400">{vulnerabilitiesSummary.critical}</span>
                <span className="text-xs text-gray-400">Critical</span>
              </div>
              <div className="p-3 bg-orange-900/40 rounded text-center">
                <span className="block text-2xl font-bold text-orange-400">{vulnerabilitiesSummary.high}</span>
                <span className="text-xs text-gray-400">High</span>
              </div>
              <div className="p-3 bg-yellow-900/40 rounded text-center">
                <span className="block text-2xl font-bold text-yellow-400">{vulnerabilitiesSummary.medium}</span>
                <span className="text-xs text-gray-400">Medium</span>
              </div>
              <div className="p-3 bg-blue-900/40 rounded text-center">
                <span className="block text-2xl font-bold text-blue-400">{vulnerabilitiesSummary.low}</span>
                <span className="text-xs text-gray-400">Low</span>
              </div>
            </div>
            <h3 className="text-lg font-medium mb-4">Payment Gateway Security</h3>
            <div className="aspect-video bg-gray-900 rounded flex items-center justify-center">
              <p className="text-gray-500">Payment Processing Security Visualization</p>
              {/* In a real app, you'd have a chart showing payment processing security metrics */}
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-400">
              <span>Active Transactions: 78</span>
              <span>Average Response: 0.3s</span>
              <span>Fraud Alerts: 2</span>
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
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
    </div>
  );
};

export default Dashboard;
