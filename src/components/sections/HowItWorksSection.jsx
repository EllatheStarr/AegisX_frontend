import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const HowItWorksSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-900 text-center">
      <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
        ⚙ How It Works
      </h2>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <div className="text-2xl font-bold mb-3">1️⃣</div>
          <h3 className="text-xl font-medium">Continuous Assessment</h3>
          <p className="mt-2 text-sm text-gray-400">
            AI constantly analyzes your systems for vulnerabilities and suspicious behavior patterns.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <div className="text-2xl font-bold mb-3">2️⃣</div>
          <h3 className="text-xl font-medium">Threat Classification</h3>
          <p className="mt-2 text-sm text-gray-400">
            Machine learning models identify and categorize potential threats with precision targeting.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <div className="text-2xl font-bold mb-3">3️⃣</div>
          <h3 className="text-xl font-medium">Adaptive Defense</h3>
          <p className="mt-2 text-sm text-gray-400">
            Automated countermeasures deploy to neutralize threats based on severity and type.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <div className="text-2xl font-bold mb-3">4️⃣</div>
          <h3 className="text-xl font-medium">Blockchain Verification</h3>
          <p className="mt-2 text-sm text-gray-400">
            All security events are cryptographically sealed, ensuring tamper-proof threat intelligence.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
