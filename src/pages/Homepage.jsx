import React from "react";
import { AuroraHero } from "../components/AuroraHero";
import { motion } from "framer-motion";

// Re-export AuroraHero so it can be imported from Homepage
export { AuroraHero };

// GitHub icon component
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Professional Shield Icon component
const ProfessionalShield = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ 
      display: 'inline-block', 
      marginRight: '0.3em', 
      verticalAlign: 'middle',
      filter: 'drop-shadow(0 0 0.15rem rgba(255, 255, 255, 0.4))'
    }}
    className="text-blue-400"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

const LandingPage = () => {
  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen relative">
      {/* GitHub Link */}
      <a 
        href="https://github.com/yourusername/aegisx" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors duration-300"
        aria-label="View source on GitHub"
      >
        <GitHubIcon />
      </a>

      {/* Hero Section */}
      <AuroraHero />

      {/* Why AegisX Section */}
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

      {/* How It Works Section */}
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

      {/* Key Features Section */}
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

      {/* Why Neobanks Need AegisX Section */}
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
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 rounded-full bg-gray-700 px-6 py-3 text-lg font-medium text-gray-50 shadow-lg hover:bg-gray-600"
          onClick={() => window.navigate('/signup')}
        >
          Learn More
        </motion.button>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
          📢 Protect Your Platform with AegisX
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed md:text-lg">
          🚀 Stay ahead of cyber threats with next-generation AI defense. Preventing attacks is more effective than responding to breaches.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 rounded-full bg-gray-700 px-6 py-3 text-lg font-medium text-gray-50 shadow-lg hover:bg-gray-600"
          onClick={() => window.navigate('/signup')}
        >
          Talk to an Expert
        </motion.button>
      </section>
    </div>
  );
};

export default LandingPage;