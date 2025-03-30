import React from "react";
import { motion } from "framer-motion";

const ComplianceCard = ({ complianceStatus, boxShadow }) => {
  return (
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
  );
};

export default ComplianceCard;
