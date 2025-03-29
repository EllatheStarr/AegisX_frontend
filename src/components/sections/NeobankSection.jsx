import React from "react";
import { motion as Motion } from "framer-motion";

const NeobankSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-800 to-gray-900 text-center">
      <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
        🌍 Why Neobanks & Fintechs Need AegisX
      </h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto px-4">
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <h3 className="text-xl font-medium">📉 300% Increase in Banking Cyberattacks</h3>
          <p className="mt-2 text-gray-400">Financial institutions are prime targets for sophisticated threat actors.</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <h3 className="text-xl font-medium">⚠ 63% of Breaches Target Credentials</h3>
          <p className="mt-2 text-gray-400">Identity protection is critical for preventing account takeovers.</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg">
          <h3 className="text-xl font-medium">🔐 94% of Malware Delivered via Email</h3>
          <p className="mt-2 text-gray-400">Proactive threat detection stops attacks at the entry point.</p>
        </div>
      </div>
      <Motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 rounded-full bg-gray-700 px-6 py-3 text-lg font-medium text-gray-50 shadow-lg hover:bg-gray-600"
        onClick={() => window.navigate('/signup')}
      >
        Learn More
      </Motion.button>
    </section>
  );
};

export default NeobankSection;
