import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const KeyFeaturesSection = () => {
  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
        🔑 Key Features
      </h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h3 className="text-xl font-medium">🔹 Ransomware Prevention</h3>
          <p className="mt-2 text-sm text-gray-400">
            Detect encryption behaviors and block ransomware before files are compromised.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h3 className="text-xl font-medium">🔹 Phishing Defense</h3>
          <p className="mt-2 text-sm text-gray-400">
            AI-powered scanning of communications to identify and neutralize social engineering attempts.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h3 className="text-xl font-medium">🔹 DDoS Attack Mitigation</h3>
          <p className="mt-2 text-sm text-gray-400">
            Intelligent traffic analysis prevents service disruption from distributed denial-of-service attacks.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h3 className="text-xl font-medium">🔹 API Security Enforcement</h3>
          <p className="mt-2 text-sm text-gray-400">
            Protect critical endpoints from injection attacks and unauthorized access attempts.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h3 className="text-xl font-medium">🔹 Malware Behavioral Analysis</h3>
          <p className="mt-2 text-sm text-gray-400">
            Identify malicious code execution patterns even for previously unseen threats.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h3 className="text-xl font-medium">🔹 Threat Intelligence Dashboard</h3>
          <p className="mt-2 text-sm text-gray-400">
            Comprehensive visualization of your security posture with actionable insights and threat hunting.
          </p>
        </motion.div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 rounded-full bg-gray-700 px-6 py-3 text-lg font-medium text-gray-50 shadow-lg hover:bg-gray-600"
        onClick={() => window.navigate('/signup')}
      >
        Try the Demo
      </motion.button>
    </section>
  );
};

export default KeyFeaturesSection;
