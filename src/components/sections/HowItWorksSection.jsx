import React, { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  animate
} from "framer-motion";
import {
  Brain,
  Database,
  Bell,
  Shield,
  ArrowRight,
  Activity
} from "lucide-react";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const StepCard = ({ number, icon: Icon, title, description }) => {
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
      className="rounded-2xl bg-gray-900/60 backdrop-blur-xl p-7 border border-gray-800/30 shadow-lg transition-all duration-300"
    >
      <div className="flex items-center mb-5">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center mr-3 font-medium text-sm"
        >
          {number}
        </motion.div>
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-2xl shadow-inner">
          <Icon size={22} className="text-white/90" strokeWidth={1.5} />
        </div>
      </div>
      <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
      <p className="text-gray-300/90 font-light leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const HowItWorksSection = () => {
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
          className="absolute top-1/4 right-0 w-72 h-72 bg-opacity-50 rounded-full filter blur-[100px]"
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
          className="absolute bottom-0 left-1/4 w-80 h-80 bg-opacity-50 rounded-full filter blur-[120px]"
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
              How It Works
            </motion.span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-5 leading-tight"
          >
            Advanced Fraud Protection<br/>For Modern Neobanks
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-300/90 font-light text-lg"
          >
            Aegis provides comprehensive fraud detection and prevention through a seamless four-step process that integrates with your existing banking infrastructure.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          <StepCard 
            number="01"
            icon={Brain}
            title="AI-Powered Detection" 
            description="Machine learning models analyze transaction patterns in real-time to identify suspicious activity and potential fraud attempts."
          />
          <StepCard 
            number="02"
            icon={Database}
            title="Blockchain Verification" 
            description="All transactions are logged on a secure blockchain, creating immutable records that ensure data integrity and prevent tampering."
          />
          <StepCard 
            number="03"
            icon={Bell}
            title="Real-Time Alerts" 
            description="Suspicious activities trigger instant notifications, allowing immediate response to potential threats before they cause damage."
          />
          <StepCard 
            number="04"
            icon={Shield}
            title="Secure Authentication" 
            description="Multi-factor authentication including Google OAuth and facial recognition ensures only authorized users can access accounts."
          />
        </div>

        {/* Integration Highlights */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-2xl bg-gray-900/40 backdrop-blur-xl border border-gray-800/30 p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <Activity size={48} className="mb-4 text-white/80" strokeWidth={1} />
                <h3 className="text-2xl font-medium mb-3 text-white">Seamless Integration</h3>
                <p className="text-gray-300/90 font-light mb-4">
                  Aegis integrates with your existing neobank infrastructure, providing real-time dashboard monitoring and robust fraud prevention without disrupting operations.
                </p>
              </div>
              <div className="md:w-2/3 grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="rounded-xl bg-gray-800/50 p-4 border border-gray-700/30"
                >
                  <h4 className="text-lg font-medium mb-2 text-white">API-Based Integration</h4>
                  <p className="text-sm text-gray-300/90">Connects to your existing systems through secure APIs with minimal development effort.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="rounded-xl bg-gray-800/50 p-4 border border-gray-700/30"
                >
                  <h4 className="text-lg font-medium mb-2 text-white">Real-Time Dashboard</h4>
                  <p className="text-sm text-gray-300/90">Monitor all transaction activity and security events through an intuitive control panel.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="rounded-xl bg-gray-800/50 p-4 border border-gray-700/30"
                >
                  <h4 className="text-lg font-medium mb-2 text-white">Scalable Architecture</h4>
                  <p className="text-sm text-gray-300/90">Handles millions of transactions with consistent performance as your neobank grows.</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5 }}
                  className="rounded-xl bg-gray-800/50 p-4 border border-gray-700/30"
                >
                  <h4 className="text-lg font-medium mb-2 text-white">Regulatory Compliance</h4>
                  <p className="text-sm text-gray-300/90">Built-in compliance with financial regulations and data protection standards.</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

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
            Request a Demo
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
      
      {/* Connection lines between steps */}
      <div className="hidden lg:block absolute top-1/2 left-0 w-full -z-5 px-20">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative h-1 w-full"
        >
          <motion.div 
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"
            animate={{ 
              backgroundPosition: ['0% 0%', '100% 0%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear'
            }}
            style={{ backgroundSize: '200% 100%' }}
          />
          <motion.div
            className="absolute top-0 left-1/4 h-2 w-2 rounded-full bg-white"
            animate={{ 
              boxShadow: [
                '0 0 5px #13FFAA',
                '0 0 10px #1E67C6',
                '0 0 15px #CE84CF',
                '0 0 5px #DD335C'
              ],
              x: ['-50%', '300%']
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
