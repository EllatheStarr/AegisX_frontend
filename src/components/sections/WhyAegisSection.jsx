import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import ProfessionalShield from "../icons/ProfessionalShield";

const WhyAegisSection = () => {
  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
        <ProfessionalShield /> Why AegisX?
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed md:text-lg">
        AegisX is the cutting-edge solution designed to detect and neutralize cyber threats before they impact your systems, using advanced AI, blockchain security, and predictive intelligence.
      </p>
      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h3 className="text-xl font-medium">✔ Preemptive Threat Detection</h3>
          <p className="mt-2 text-sm text-gray-400">
            AI models identify malicious patterns and potential cyber attacks before they can execute, preventing damage.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h3 className="text-xl font-medium">✔ Zero-Day Vulnerability Shield</h3>
          <p className="mt-2 text-sm text-gray-400">
            Detect and mitigate previously unknown security vulnerabilities through behavioral analysis and anomaly detection.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h3 className="text-xl font-medium">✔ Advanced Threat Intelligence</h3>
          <p className="mt-2 text-sm text-gray-400">
            Continuous monitoring of dark web and threat feeds to proactively defend against emerging attack vectors.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <h3 className="text-xl font-medium">✔ Immutable Security Logging</h3>
          <p className="mt-2 text-sm text-gray-400">
            Blockchain-secured audit trails ensure complete visibility while preventing log tampering by attackers.
          </p>
        </motion.div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 rounded-full bg-gray-700 px-6 py-3 text-lg font-medium text-gray-50 shadow-lg hover:bg-gray-600"
        onClick={() => window.navigate('/signup')}
      >
        See It in Action
      </motion.button>
    </section>
  );
};

export default WhyAegisSection;
