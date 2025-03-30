import React from "react";
import { motion } from "framer-motion";

const UserAuthenticationCard = ({ boxShadow }) => {
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
  );
};

export default UserAuthenticationCard;
