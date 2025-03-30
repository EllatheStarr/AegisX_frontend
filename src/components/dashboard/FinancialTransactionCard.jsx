import React from "react";
import { motion } from "framer-motion";

const FinancialTransactionCard = ({ boxShadow }) => {
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
  );
};

export default FinancialTransactionCard;
