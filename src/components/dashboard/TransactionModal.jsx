import React from "react";
import { motion } from "framer-motion";

const TransactionModal = ({ 
  showModal, 
  transaction, 
  closeModal, 
  updateRiskAssessment, 
  newRiskAssessment, 
  setNewRiskAssessment 
}) => {
  if (!showModal || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div 
        className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 p-6 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Transaction Details</h3>
          <button 
            onClick={closeModal} 
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">Transaction ID</p>
              <p className="font-medium text-gray-200">{transaction.transactionId.substring(0, 14)}...</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Type</p>
              <p className="font-medium text-gray-200">{transaction.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Amount</p>
              <p className="font-medium text-gray-200">{transaction.amount} {transaction.currency}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Source</p>
              <p className="font-medium text-gray-200">{transaction.source}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Timestamp</p>
              <p className="font-medium text-gray-200">{new Date(transaction.timestamp).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Verification Status</p>
              <p className={`font-medium ${transaction.verified ? 'text-green-400' : 'text-yellow-400'}`}>
                {transaction.verified ? 'Verified' : 'Pending Verification'}
              </p>
            </div>
          </div>
          
          {transaction.blockchainTxHash && (
            <div>
              <p className="text-sm text-gray-400">Blockchain Hash</p>
              <p className="font-medium text-gray-200">{transaction.blockchainTxHash.substring(0, 22)}...</p>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-700 pt-4 mb-6">
          <h4 className="text-lg font-medium mb-3">Risk Assessment</h4>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Risk Score (0-100)</label>
            <input
              type="range"
              min="0"
              max="100"
              value={newRiskAssessment.score}
              onChange={(e) => setNewRiskAssessment({
                ...newRiskAssessment,
                score: parseInt(e.target.value)
              })}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-green-400">Low Risk (0)</span>
              <span className={`text-sm font-medium ${
                newRiskAssessment.score > 75 ? 'text-red-400' :
                newRiskAssessment.score > 50 ? 'text-yellow-400' :
                'text-green-400'
              }`}>{newRiskAssessment.score}</span>
              <span className="text-xs text-red-400">High Risk (100)</span>
            </div>
          </div>
          
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="flagged"
              checked={newRiskAssessment.flagged}
              onChange={() => setNewRiskAssessment({
                ...newRiskAssessment,
                flagged: !newRiskAssessment.flagged
              })}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-600 focus:ring-offset-gray-800"
            />
            <label htmlFor="flagged" className="ml-2 text-sm font-medium text-gray-300">
              Flag this transaction as suspicious
            </label>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded"
            onClick={updateRiskAssessment}
          >
            Update Risk Assessment
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded"
            onClick={closeModal}
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionModal;
