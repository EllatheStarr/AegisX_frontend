import React, { useState, useEffect, useRef } from "react";
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
import blockchainService from "../utils/blockchain-service";

// Dashboard components
import Header from "../components/dashboard/Header";
import Footer from "../components/dashboard/Footer";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import SecurityScoreCard from "../components/dashboard/SecurityScoreCard";
import BlockchainCard from "../components/dashboard/BlockchainCard";
import FinancialTransactionCard from "../components/dashboard/FinancialTransactionCard";
import UserAuthenticationCard from "../components/dashboard/UserAuthenticationCard";
import ThreatsTable from "../components/dashboard/ThreatsTable";
import ComplianceCard from "../components/dashboard/ComplianceCard";
import VulnerabilitiesCard from "../components/dashboard/VulnerabilitiesCard";
import BlockchainTransactions from "../components/dashboard/BlockchainTransactions";
import TransactionModal from "../components/dashboard/TransactionModal";

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
  const navigationAttemptedRef = useRef(false);
  
  // Blockchain state
  const [blockchainStatus, setBlockchainStatus] = useState({ connected: false, hasWallet: false });
  const [blockchainTransactions, setBlockchainTransactions] = useState([]);
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newRiskAssessment, setNewRiskAssessment] = useState({ score: 0, flagged: false });
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  
  // Motion templates
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 10%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const glowEffect = useMotionTemplate`0px 0px 30px ${color}`;
  
  // Safe navigation function to prevent navigation loops
  const safeNavigate = (path) => {
    if (!navigationAttemptedRef.current) {
      navigationAttemptedRef.current = true;
      setTimeout(() => {
        window.navigate(path);
        navigationAttemptedRef.current = false;
      }, 100);
    }
  };
  
  useEffect(() => {
    // Get current user data from localStorage
    const currentUser = getCurrentUser();
    console.log("Dashboard currentUser:", currentUser);
    
    if (!currentUser) {
      // Redirect to login if no user found
      console.log("No user found, redirecting to login");
      safeNavigate('/login');
      return;
    }
    
    setUser(currentUser);

    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
    
    // Initialize blockchain service
    initializeBlockchain();

    // Cleanup function
    return () => {
      // Perform any necessary cleanup for blockchain service
    };
  }, []);

  // Initialize blockchain service with improved error handling and reconnection
  const initializeBlockchain = async () => {
    try {
      globalLoadingHandler.startLoading();
      
      // Check current connection status first
      const currentStatus = blockchainService.getConnectionStatus();
      setBlockchainStatus(currentStatus);
      
      // Try to initialize if not already connected
      let initialized = currentStatus.connected;
      if (!initialized) {
        initialized = await blockchainService.initialize();
        if (initialized) {
          const status = blockchainService.getConnectionStatus();
          setBlockchainStatus(status);
        }
      }
      
      // Always fetch/generate transactions, even if we're using a cached connection
      const transactions = blockchainService.getTransactions();
      if (transactions && transactions.length > 0) {
        setBlockchainTransactions(transactions);
      } else {
        // Generate mock transactions for demo purposes
        const mockTransactions = blockchainService.generateMockTransactions(5);
        setBlockchainTransactions(mockTransactions);
      }
      
      // If we have a previously connected wallet, try to reconnect
      if (currentStatus.hasWallet && window.ethereum) {
        await reconnectWallet();
      }
    } catch (error) {
      console.error("Failed to initialize blockchain:", error);
      // Show user-friendly error message
      setBlockchainStatus({
        ...blockchainStatus,
        errorMessage: "Blockchain connection failed. Please try reconnecting."
      });
    } finally {
      globalLoadingHandler.endLoading();
    }
  };

  // New method to attempt wallet reconnection
  const reconnectWallet = async () => {
    try {
      setConnectingWallet(true);
      await blockchainService.connectWallet(window.ethereum);
      const status = blockchainService.getConnectionStatus();
      setBlockchainStatus(status);
    } catch (error) {
      console.error("Failed to reconnect wallet:", error);
    } finally {
      setConnectingWallet(false);
    }
  };

  // Connect wallet (e.g., MetaMask)
  const connectWallet = async () => {
    try {
      setConnectingWallet(true);
      globalLoadingHandler.startLoading();
      
      // Check if MetaMask is available
      if (!window.ethereum) {
        alert("MetaMask is not installed. Please install MetaMask to connect your wallet.");
        return;
      }
      
      const connected = await blockchainService.connectWallet(window.ethereum);
      if (connected) {
        const status = blockchainService.getConnectionStatus();
        setBlockchainStatus(status);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      alert(`Failed to connect wallet: ${error.message}`);
    } finally {
      setConnectingWallet(false);
      globalLoadingHandler.endLoading();
    }
  };

  // Open transaction assessment modal
  const openTransactionModal = (transaction) => {
    setSelectedTransaction(transaction);
    setNewRiskAssessment({
      score: transaction.riskScore,
      flagged: transaction.flagged
    });
    setShowTransactionModal(true);
  };

  // Close transaction modal
  const closeTransactionModal = () => {
    setShowTransactionModal(false);
    setSelectedTransaction(null);
  };

  // Update risk assessment for a transaction
  const updateRiskAssessment = async () => {
    if (!selectedTransaction) return;
    
    try {
      globalLoadingHandler.startLoading();
      const result = await blockchainService.updateTransactionRisk(
        selectedTransaction.transactionId,
        newRiskAssessment.score,
        newRiskAssessment.flagged
      );
      
      // Update transactions list
      setBlockchainTransactions(prev => prev.map(tx => 
        tx.transactionId === selectedTransaction.transactionId 
          ? { ...tx, riskScore: newRiskAssessment.score, flagged: newRiskAssessment.flagged }
          : tx
      ));
      
      setShowTransactionModal(false);
      return result;
    } catch (error) {
      console.error("Failed to update risk assessment:", error);
      alert(`Failed to update risk assessment: ${error.message}`);
      return null;
    } finally {
      globalLoadingHandler.endLoading();
    }
  };

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
      safeNavigate('/login');
    } catch (error) {
      console.error("Error during logout:", error);
      // Still redirect to login even if API call fails
      safeNavigate('/login');
    } finally {
      setIsLoggingOut(false);
      globalLoadingHandler.endLoading();
    }
  };

  // Render tab content with enhanced styling to match homepage
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <WelcomeSection />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div
                className="col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SecurityScoreCard 
                  securityScore={securityScore} 
                  scanStatus={scanStatus} 
                  boxShadow={boxShadow}
                />
              </motion.div>
              
              <motion.div
                className="col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <BlockchainCard 
                  blockchainStatus={blockchainStatus}
                  blockchainTransactions={blockchainTransactions}
                  connectWallet={connectWallet}
                  connectingWallet={connectingWallet}
                  setActiveTab={setActiveTab}
                  boxShadow={boxShadow}
                />
              </motion.div>
              
              <motion.div
                className="col-span-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <UserAuthenticationCard boxShadow={boxShadow} />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ThreatsTable threats={recentThreats} />
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <ComplianceCard 
                  complianceStatus={complianceStatus} 
                  boxShadow={boxShadow} 
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <VulnerabilitiesCard 
                  vulnerabilitiesSummary={vulnerabilitiesSummary} 
                  boxShadow={boxShadow} 
                />
              </motion.div>
            </div>
          </>
        );
        
      case 'blockchain':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <motion.h2 
                className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Blockchain Transactions
              </motion.h2>
              <motion.p 
                className="text-gray-400 max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Monitor and analyze financial transactions secured by blockchain technology. Assess risk levels and flag suspicious activities.
              </motion.p>
            </div>
            
            <BlockchainTransactions 
              transactions={blockchainTransactions} 
              openTransactionModal={openTransactionModal}
            />
          </motion.div>
        );
        
      case 'threats':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <motion.h2 
                className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Security Threats
              </motion.h2>
              <motion.p 
                className="text-gray-400 max-w-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Real-time monitoring of potential security threats to your financial platform. Immediate alerts and response capabilities.
              </motion.p>
            </div>
            
            <ThreatsTable threats={recentThreats} />
          </motion.div>
        );
        
      case 'settings':
        return (
          <motion.div
            className="p-8 bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800/30"
            style={{ boxShadow }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">Account & Security Settings</h2>
              <p className="text-gray-400 mb-6">Configure your account security preferences and manage platform settings</p>
              
              <div className="space-y-6">
                <div className="p-4 border border-gray-800/50 rounded-xl bg-gray-800/30 backdrop-blur-sm">
                  <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-gray-400 text-sm mb-3">Add an extra layer of security to your account</p>
                  <div className="flex items-center">
                    <div className="mr-4 w-12 h-6 bg-blue-900/30 rounded-full relative">
                      <div className="absolute inset-y-1 left-1 w-4 h-4 bg-blue-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-blue-400">Enabled</span>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-800/50 rounded-xl bg-gray-800/30 backdrop-blur-sm">
                  <h3 className="text-lg font-medium mb-2">Email Notifications</h3>
                  <p className="text-gray-400 text-sm mb-3">Receive alerts about security events</p>
                  <div className="flex items-center">
                    <div className="mr-4 w-12 h-6 bg-gray-800/70 rounded-full relative">
                      <div className="absolute inset-y-1 left-1 w-4 h-4 bg-gray-500 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-400">Disabled</span>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-800/50 rounded-xl bg-gray-800/30 backdrop-blur-sm">
                  <h3 className="text-lg font-medium mb-2">API Access Keys</h3>
                  <p className="text-gray-400 text-sm mb-3">Manage access keys for API integration</p>
                  <button 
                    className="px-4 py-2 bg-gray-800/70 hover:bg-gray-700/70 text-gray-300 rounded-lg text-sm transition-colors"
                  >
                    Generate New Key
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
        
      default:
        return <p>Select a tab</p>;
    }
  };

  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen flex flex-col relative">
      {/* Stars Background */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>

      {/* Animated background elements - matching homepage style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -right-40 w-80 h-80 bg-opacity-50 rounded-full filter blur-[100px]"
          animate={{ 
            backgroundColor: COLORS_TOP,
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 left-1/4 w-96 h-96 bg-opacity-50 rounded-full filter blur-[120px]"
          animate={{ 
            backgroundColor: [...COLORS_TOP].reverse(),
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Header */}
      <Header 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        blockchainStatus={blockchainStatus} 
        getUserInitials={getUserInitials}
        boxShadow={boxShadow}
        glowEffect={glowEffect}
      />

      {/* Main Content */}
      <motion.main 
        className="relative z-10 flex-1 p-8 overflow-auto"
        style={{ background: backgroundImage }}
      >
        {/* Grid background - matching homepage */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        
        <div className="max-w-7xl mx-auto">
          {renderTabContent()}
        </div>
      </motion.main>
      
      {/* Footer */}
      <Footer 
        isLoggingOut={isLoggingOut} 
        handleLogout={handleLogout} 
        border={border}
        glowEffect={glowEffect}
      />

      {/* Transaction Modal */}
      <TransactionModal 
        showModal={showTransactionModal}
        transaction={selectedTransaction}
        closeModal={closeTransactionModal}
        updateRiskAssessment={updateRiskAssessment}
        newRiskAssessment={newRiskAssessment}
        setNewRiskAssessment={setNewRiskAssessment}
      />
    </div>
  );
};

export default Dashboard;
