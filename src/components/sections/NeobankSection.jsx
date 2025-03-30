import React, { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate
} from "framer-motion";
import {
  TrendingDown,
  AlertTriangle,
  CreditCard,
  ArrowRight,
  Building,
  ShieldAlert
} from "lucide-react";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const StatCard = ({ icon: Icon, title, description }) => {
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
      className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-7 transition-all duration-300"
    >
      <div className="mb-5 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-2xl shadow-inner">
        <Icon size={22} className="text-white/90" strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
      <p className="text-gray-300/90 font-light leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
};

const NeobankSection = () => {
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
          className="absolute top-1/3 -right-20 w-72 h-72 bg-opacity-50 rounded-full filter blur-[100px]"
          animate={{ 
            backgroundColor: COLORS,
            x: [0, -30, 0],
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 left-1/3 w-80 h-80 bg-opacity-50 rounded-full filter blur-[120px]"
          animate={{ 
            backgroundColor: [...COLORS].reverse(),
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 15, 
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
              Industry Insights
            </motion.span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-5 leading-tight"
          >
            Why Neobanks Need<br/>Comprehensive Cyber Protection
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-300/90 font-light text-lg"
          >
            Digital banking platforms face a complex landscape of cyber threats that traditional security approaches can't address. AegisX provides the advanced protection neobanks require against the full spectrum of digital risks.
          </motion.p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-16">
          <StatCard 
            icon={TrendingDown}
            title="237% Increase in Digital Banking Fraud" 
            description="Financial fraud targeting digital-only banks has increased dramatically since 2020, with new attack vectors emerging monthly."
          />
          <StatCard 
            icon={AlertTriangle}
            title="72% of Neobanks Experienced Attacks" 
            description="Nearly three-quarters of neobanks report significant fraud attempts within their first year of operation."
          />
          <StatCard 
            icon={CreditCard}
            title="$4.2B Lost to Account Takeovers" 
            description="Account takeover fraud costs neobanks billions annually, with customers increasingly expecting protection from financial platforms."
          />
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl bg-gray-900/40 backdrop-blur-xl border border-gray-800/30 p-8 mb-16"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <Building size={48} className="mb-4 text-white/80" strokeWidth={1} />
              <h3 className="text-2xl font-medium mb-3 text-white">Neobank-Specific Fraud Risks</h3>
              <p className="text-gray-300/90 font-light">
                Digital-first banks face a unique set of fraud challenges that require specialized AI-driven detection and prevention systems.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -5 }}
                className="rounded-xl bg-gray-800/50 p-4 border border-gray-700/30"
              >
                <h4 className="text-lg font-medium mb-2 text-white">Digital Onboarding Fraud</h4>
                <p className="text-sm text-gray-300/90">Remote identity verification creates opportunities for synthetic identities and document forgery during customer acquisition.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="rounded-xl bg-gray-800/50 p-4 border border-gray-700/30"
              >
                <h4 className="text-lg font-medium mb-2 text-white">Faster Payment Scams</h4>
                <p className="text-sm text-gray-300/90">Instant payment systems leave less time for manual review, requiring real-time AI detection to prevent fraudulent transfers.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="rounded-xl bg-gray-800/50 p-4 border border-gray-700/30"
              >
                <h4 className="text-lg font-medium mb-2 text-white">Cross-Border Vulnerabilities</h4>
                <p className="text-sm text-gray-300/90">International transactions create jurisdictional challenges for fraud detection and recovery across different regulatory frameworks.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="rounded-xl bg-gray-800/50 p-4 border border-gray-700/30"
              >
                <h4 className="text-lg font-medium mb-2 text-white">Mobile App Security</h4>
                <p className="text-sm text-gray-300/90">Mobile-first banking creates unique attack surfaces through compromised devices, malicious apps, and session hijacking.</p>
              </motion.div>
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
          <motion.div
            className="inline-block rounded-2xl p-8 bg-gray-900/30 backdrop-blur-xl border border-gray-800/50"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <ShieldAlert size={28} className="text-white/90" />
              <h3 className="text-2xl font-medium text-white">Is your neobank protected against next-gen fraud?</h3>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{ boxShadow }}
              className="px-8 py-3.5 rounded-xl bg-white text-gray-900 font-medium transition-all flex items-center gap-2 mx-auto"
              onClick={() => window.navigate('/protect')}
            >
              Learn More
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

export default NeobankSection;
