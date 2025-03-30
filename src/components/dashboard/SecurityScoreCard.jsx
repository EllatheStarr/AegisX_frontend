import React from "react";
import { motion } from "framer-motion";

const SecurityScoreCard = ({ securityScore, scanStatus, boxShadow }) => {
  return (
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
  );
};

export default SecurityScoreCard;
