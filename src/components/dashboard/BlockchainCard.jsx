import React from "react";
import { motion } from "framer-motion";

const BlockchainCard = ({ blockchainStatus, blockchainTransactions, connectWallet, connectingWallet, setActiveTab, boxShadow }) => {
  return (
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
        delay: 0.15 
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Blockchain Security</h3>
        <div className={`px-2 py-1 text-xs rounded-full font-semibold ${blockchainStatus.connected ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
          {blockchainStatus.connected ? 'Connected' : 'Not Connected'}
        </div>
      </div>
      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Verified Transactions:</span>
          <span>{blockchainTransactions.filter(tx => tx.verified).length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Pending Verification:</span>
          <span>{blockchainTransactions.filter(tx => !tx.verified).length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">High Risk Transactions:</span>
          <span className="text-yellow-400">{blockchainTransactions.filter(tx => tx.riskScore > 70).length}</span>
        </div>
      </div>
      {!blockchainStatus.hasWallet ? (
        <motion.button 
          className="w-full py-2 px-3 mt-2 text-sm font-medium rounded bg-blue-600 hover:bg-blue-700 text-white"
          onClick={connectWallet}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={connectingWallet}
        >
          {connectingWallet ? 'Connecting...' : 'Connect Wallet'}
        </motion.button>
      ) : (
        <button onClick={() => setActiveTab('blockchain')} className="text-blue-400 text-sm hover:underline">
          View Blockchain Transactions →
        </button>
      )}
    </motion.div>
  );
};

export default BlockchainCard;
