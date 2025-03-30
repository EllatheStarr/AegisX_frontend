import React from "react";
import { motion } from "framer-motion";

const WelcomeSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 p-6 bg-gray-900/60 backdrop-blur-sm rounded-xl shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Fintech Security Operations Center</h2>
      <p className="text-gray-400">Protecting your digital financial platform with advanced threat intelligence and prevention.</p>
    </motion.div>
  );
};

export default WelcomeSection;
