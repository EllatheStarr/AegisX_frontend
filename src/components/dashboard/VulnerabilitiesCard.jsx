import React from "react";
import { motion } from "framer-motion";

const VulnerabilitiesCard = ({ vulnerabilitiesSummary, boxShadow }) => {
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
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>Active Transactions: 78</span>
        <span>Average Response: 0.3s</span>
        <span>Fraud Alerts: 2</span>
      </div>
    </motion.div>
  );
};

export default VulnerabilitiesCard;
