import React, { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  animate,
  motion
} from "framer-motion";
import { 
  Shield, 
  AlertTriangle, 
  Radio, 
  Database,
  ArrowRight
} from "lucide-react";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const FeatureCard = ({ icon, title, description }) => {
  const IconComponent = icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      className="rounded-2xl bg-gray-900/60 backdrop-blur-xl p-7 border border-gray-800/30 shadow-lg transition-all duration-300"
    >
      <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-2xl shadow-inner">
        <IconComponent size={22} className="text-white/90" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-300/90 font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const WhyAegisSection = () => {
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
  const borderGlow = useMotionTemplate`1px solid ${color}`;

  return (
    <section className="relative bg-gradient-to-b from-gray-950 to-gray-900 py-24 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-opacity-50 rounded-full filter blur-[100px]"
          animate={{ 
            backgroundColor: COLORS,
            x: [0, -10, 0],
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
              Why Aegis
            </motion.span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-5 leading-tight"
          >
            Advanced Fraud Prevention<br/>For Modern Banking
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-300/90 font-light text-lg"
          >
            Aegis delivers cutting-edge fraud detection and prevention designed specifically for neobanks and digital financial platforms, protecting your customers and assets from sophisticated threats.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 mb-12">
          <FeatureCard 
            icon={Shield} 
            title="AI-Driven Fraud Detection" 
            description="Advanced machine learning algorithms analyze transaction patterns in real-time to identify anomalous activities before they result in financial losses." 
          />
          <FeatureCard 
            icon={AlertTriangle} 
            title="Account Takeover Prevention" 
            description="Sophisticated behavioral biometrics and authentication systems protect customer accounts from unauthorized access and identity theft." 
          />
          <FeatureCard 
            icon={Radio} 
            title="Real-Time Monitoring" 
            description="Continuous analysis of all transactions with instant alerts for suspicious activities, allowing immediate intervention to prevent fraud." 
          />
          <FeatureCard 
            icon={Database} 
            title="Blockchain Transaction Integrity" 
            description="Immutable record-keeping provides tamper-proof audit trails for all financial transactions, ensuring regulatory compliance and security." 
          />
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-10"
        >
          <motion.div
            style={{ border: borderGlow }}
            className="inline-block rounded-2xl p-8 bg-gray-900/30 backdrop-blur-xl"
          >
            <h3 className="text-2xl font-medium mb-4 text-white">Ready to secure your financial platform?</h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              See how Aegis can protect your neobank from fraud and financial crime with our next-generation security platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{ boxShadow }}
              className="px-8 py-3.5 rounded-xl bg-white text-gray-900 font-medium transition-all flex items-center gap-2 mx-auto"
              onClick={() => window.navigate('/demo')}
            >
              Request a Demo
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
    </section>
  );
};

export default WhyAegisSection;
