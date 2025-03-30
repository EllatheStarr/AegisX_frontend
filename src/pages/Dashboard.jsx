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
  
  // Blockchain state
  const [blockchainStatus, setBlockchainStatus] = useState({ connected: false, hasWallet: false });
  const [blockchainTransactions, setBlockchainTransactions] = useState([]);
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [newRiskAssessment, setNewRiskAssessment] = useState({ score: 0, flagged: false });
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  
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
    
    // Initialize blockchain service
    initializeBlockchain();
  }, []);

  // Initialize blockchain service
  const initializeBlockchain = async () => {
    try {
      globalLoadingHandler.startLoading();
      const initialized = await blockchainService.initialize();
      if (initialized) {
        const status = blockchainService.getConnectionStatus();
        setBlockchainStatus(status);
        
        // Generate mock transactions for demo purposes
        const transactions = blockchainService.generateMockTransactions(5);
        setBlockchainTransactions(transactions);
      }
    } catch (error) {
      console.error("Failed to initialize blockchain:", error);
    } finally {
      globalLoadingHandler.endLoading();
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

  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <WelcomeSection />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <SecurityScoreCard 
                securityScore={securityScore} 
                scanStatus={scanStatus} 
                boxShadow={boxShadow} 
              />
              
              <BlockchainCard 
                blockchainStatus={blockchainStatus}
                blockchainTransactions={blockchainTransactions}
                connectWallet={connectWallet}
                connectingWallet={connectingWallet}
                setActiveTab={setActiveTab}
                boxShadow={boxShadow}
              />
              
              <UserAuthenticationCard boxShadow={boxShadow} />
            </div>
            
            <ThreatsTable threats={recentThreats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ComplianceCard 
                complianceStatus={complianceStatus} 
                boxShadow={boxShadow} 
              />
              
              <VulnerabilitiesCard 
                vulnerabilitiesSummary={vulnerabilitiesSummary} 
                boxShadow={boxShadow} 
              />
            </div>
          </>
        );
        
      case 'blockchain':
        return (
          <BlockchainTransactions 
            transactions={blockchainTransactions} 
            openTransactionModal={openTransactionModal}
          />
        );
        
      case 'threats':
        return (
          <>
            <WelcomeSection />
            <ThreatsTable threats={recentThreats} />
          </>
        );
        
      case 'settings':
        return (
          <div className="p-6 bg-gray-900/60 backdrop-blur-sm rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <p className="text-gray-400">Settings panel is under development.</p>
          </div>
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

      {/* Header */}
      <Header 
        user={user} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        blockchainStatus={blockchainStatus} 
        getUserInitials={getUserInitials}
      />

      {/* Main Content */}
      <main className="relative z-10 flex-1 p-6 overflow-auto" style={{ background: gradientBg }}>
        {renderTabContent()}
      </main>
      
      {/* Footer */}
      <Footer 
        isLoggingOut={isLoggingOut} 
        handleLogout={handleLogout} 
        border={border}
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
