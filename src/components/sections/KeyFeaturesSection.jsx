import React, { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate
} from "framer-motion";
import {
  Brain,
  Lock,
  Bell,
  ShieldCheck,
  Fingerprint,
  BarChart3,
  ArrowRight,
  Globe,
  Eye,
  Key
} from "lucide-react";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      className="rounded-2xl bg-gray-900/60 backdrop-blur-xl p-7 border border-gray-800/30 shadow-lg transition-all duration-300 h-full"
    >
      <div className="mb-5 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-2xl shadow-inner">
        <Icon size={22} className="text-white/90" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
      <p className="text-gray-300/90 font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const KeyFeaturesSection = () => {
  const color = useMotionValue(COLORS[0]);

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const textGlow = useMotionTemplate`0px 0px 30px ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 20px ${color}`;
  
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-950 py-24 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-opacity-50 rounded-full filter blur-[100px]"
          animate={{ 
            backgroundColor: COLORS,
            x: [0, 10, 0],
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-96 h-96 bg-opacity-50 rounded-full filter blur-[120px]"
          animate={{ 
            backgroundColor: [...COLORS].reverse(),
            x: [0, 15, 0],
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-2"
          >
            <motion.span 
              style={{ boxShadow: textGlow }}
              className="text-xs uppercase tracking-[0.2em] font-medium inline-block py-1.5 px-4 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm text-gray-200"
            >
              Key Features
            </motion.span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-5 leading-tight"
          >
            Comprehensive Fraud <br/>Prevention Solutions
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-300/90 font-light text-lg"
          >
            Aegis provides neobanks with industry-leading fraud detection capabilities, secure authentication, and transaction monitoring to protect your customers and assets.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
          <FeatureCard 
            icon={Brain} 
            title="AI-Powered Fraud Detection" 
            description="Machine learning algorithms detect anomalous patterns in transactions and user behavior that indicate potential fraud attempts."
          />
          <FeatureCard 
            icon={Lock} 
            title="Blockchain Transaction Integrity" 
            description="All transactions are immutably recorded on blockchain, preventing tampering and providing verifiable audit trails."
          />
          <FeatureCard 
            icon={Bell} 
            title="Real-Time Alerts" 
            description="Instant notifications of suspicious activities allow for immediate action before financial losses can occur."
          />
          <FeatureCard 
            icon={Fingerprint} 
            title="Secure Authentication" 
            description="Multi-factor authentication including Google OAuth and facial recognition ensures only legitimate users can access accounts."
          />
          <FeatureCard 
            icon={BarChart3} 
            title="Comprehensive Analytics" 
            description="Advanced analytics dashboard provides insights into threat patterns and risk assessment for informed decision making."
          />
          <FeatureCard 
            icon={Globe} 
            title="Global Compliance" 
            description="Built-in compliance with international financial regulations including KYC, AML, and GDPR requirements."
          />
        </div>

        {/* Advanced Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl bg-gray-900/40 backdrop-blur-xl border border-gray-800/30 p-8 mb-16"
        >
          <h3 className="text-2xl font-medium mb-6 text-center text-white">Advanced Protection Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-gray-800/80 flex items-center justify-center mt-1">
                <Eye size={20} className="text-white/80" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-white">Behavioral Biometrics</h4>
                <p className="text-gray-300/90 font-light">
                  Analyze typing patterns, mouse movements, and interaction habits to create unique user profiles that can detect account takeovers.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-gray-800/80 flex items-center justify-center mt-1">
                <Key size={20} className="text-white/80" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-white">Transaction Encryption</h4>
                <p className="text-gray-300/90 font-light">
                  End-to-end encryption for all financial transactions with cryptographic key management to prevent data interception.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-gray-800/80 flex items-center justify-center mt-1">
                <ShieldCheck size={20} className="text-white/80" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-white">Adaptive Rule Engine</h4>
                <p className="text-gray-300/90 font-light">
                  Customizable rule sets that automatically adapt based on emerging fraud patterns and specific risk profiles of your customer base.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-gray-800/80 flex items-center justify-center mt-1">
                <Bell size={20} className="text-white/80" strokeWidth={1.5} />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-2 text-white">Smart Notifications</h4>
                <p className="text-gray-300/90 font-light">
                  Context-aware alerts with prioritization based on risk level, delivering critical information through multiple channels.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            style={{ boxShadow }}
            className="px-8 py-3.5 rounded-xl bg-white text-gray-900 font-medium transition-all flex items-center gap-2 mx-auto"
            onClick={() => window.navigate('/demo')}
          >
            Try the Demo
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
    </section>
  );
};

export default KeyFeaturesSection;
