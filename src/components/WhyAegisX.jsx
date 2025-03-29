import React, { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion as Motion,
  animate,
} from "framer-motion";
import { 
  Shield, Activity, Link, Settings, 
  RefreshCcw, BarChart3, ArrowRight,
  CheckCircle
} from "lucide-react";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const FeatureCard = ({ icon: IconComponent, title, description }) => {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
      className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/30 rounded-2xl p-7 transition-all duration-300 flex flex-col h-full"
    >
      <div className="mb-5 w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-2xl shadow-inner">
        {IconComponent && <IconComponent size={22} className="text-white/90" strokeWidth={1.5} />}
      </div>
      <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
      <p className="text-gray-300/90 font-light leading-relaxed text-sm">{description}</p>
    </Motion.div>
  );
};

const FeatureBadge = ({ children }) => (
  <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-800 bg-gray-900/80">
    <CheckCircle size={12} className="text-emerald-400" />
    <span className="text-gray-200">{children}</span>
  </span>
);

export const WhyAegisX = () => {
  const color = useMotionValue(COLORS[0]);

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const borderColor = useMotionTemplate`1px solid ${color}`;
  const glowEffect = useMotionTemplate`0px 0px 30px ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 20px ${color}`;
  
  return (
    <section className="relative bg-gradient-to-b from-gray-950 to-gray-900 py-28 px-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <Motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-opacity-50 rounded-full filter blur-[100px]"
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
        <Motion.div 
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-opacity-50 rounded-full filter blur-[120px]"
          animate={{ 
            backgroundColor: [...COLORS].reverse(),
            x: [0, -15, 0],
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
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-2"
          >
            <Motion.span 
              style={{ boxShadow: glowEffect }}
              className="text-xs uppercase tracking-[0.2em] font-medium inline-block py-1.5 px-4 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm text-gray-200"
            >
              Why Choose AegisX
            </Motion.span>
          </Motion.div>
          
          <Motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-semibold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-5 leading-tight"
          >
            Advanced Protection. <br/>Complete Control.
          </Motion.h2>
          
          <Motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-300/90 font-light text-lg"
          >
            Our proprietary defense systems provide unprecedented security for digital assets and financial infrastructure.
          </Motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <FeatureCard 
            icon={Shield} 
            title="Zero-Day Defense" 
            description="Proactive protection against unknown vulnerabilities with AI-driven anomaly detection and behavioral analysis." 
          />
          <FeatureCard 
            icon={Activity} 
            title="Real-time Monitoring" 
            description="Continuous surveillance of network activity with instant alerts and automated response mechanisms." 
          />
          <FeatureCard 
            icon={Link} 
            title="Blockchain Integration" 
            description="Seamless security for distributed ledger technologies with specialized protection for smart contracts." 
          />
          <FeatureCard 
            icon={Settings} 
            title="Customizable Solutions" 
            description="Tailored security frameworks designed for your specific infrastructure and compliance requirements." 
          />
          <FeatureCard 
            icon={RefreshCcw} 
            title="Automated Recovery" 
            description="Self-healing systems that minimize downtime and ensure business continuity after security incidents." 
          />
          <FeatureCard 
            icon={BarChart3} 
            title="Comprehensive Analytics" 
            description="Detailed security metrics and threat intelligence to continuously improve your security posture." 
          />
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <Motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-gray-800/50 bg-gray-900/40 backdrop-blur-xl p-8 h-full"
          >
            <h3 className="text-2xl font-medium mb-4 text-white">Enterprise-grade Security</h3>
            <p className="text-gray-300 mb-5 font-light">
              Built for financial institutions with strict regulatory compliance needs and high-value asset protection requirements.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <FeatureBadge>SOC 2 Compliant</FeatureBadge>
              <FeatureBadge>GDPR Ready</FeatureBadge>
              <FeatureBadge>ISO 27001</FeatureBadge>
              <FeatureBadge>99.99% Uptime</FeatureBadge>
            </div>
          </Motion.div>
          
          <Motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-gray-800/50 bg-gray-900/40 backdrop-blur-xl p-8 h-full"
          >
            <h3 className="text-2xl font-medium mb-4 text-white">AI-Powered Threat Prevention</h3>
            <p className="text-gray-300 mb-5 font-light">
              Our neural networks analyze millions of patterns per second to detect and neutralize threats before they impact your systems.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              <FeatureBadge>Predictive Analysis</FeatureBadge>
              <FeatureBadge>Behavioral Detection</FeatureBadge>
              <FeatureBadge>Automated Response</FeatureBadge>
              <FeatureBadge>Continuous Learning</FeatureBadge>
            </div>
          </Motion.div>
        </div>

        {/* CTA Section */}
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          <Motion.div 
            style={{ border: borderColor }}
            className="relative z-10 flex flex-col lg:flex-row items-center justify-between px-8 py-10 rounded-3xl bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-xl"
          >
            <div className="lg:max-w-xl mb-8 lg:mb-0 text-center lg:text-left">
              <h3 className="text-3xl font-semibold mb-4 text-white">Ready to secure your digital assets?</h3>
              <p className="text-gray-300 text-lg mb-6 max-w-lg">
                Join the growing network of financial institutions protected by AegisX's next-generation security platform.
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ boxShadow }}
                  className="px-8 py-3.5 rounded-xl bg-white text-gray-900 font-medium transition-all flex items-center gap-2"
                >
                  Schedule a Demo
                  <ArrowRight size={18} />
                </Motion.button>
                
                <Motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 rounded-xl bg-transparent border border-gray-700 text-white font-medium transition-all"
                >
                  Contact Sales
                </Motion.button>
              </div>
            </div>
            
            <div className="lg:w-96 lg:h-96 w-full h-64 relative">
              <Motion.div
                animate={{ 
                  rotateZ: [0, 360],
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0"
              >
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <Motion.path
                    fill="none"
                    strokeWidth={1}
                    stroke="currentColor"
                    d="M100,20 C120,20 140,35 160,60 C180,85 180,115 160,140 C140,165 120,180 100,180 C80,180 60,165 40,140 C20,115 20,85 40,60 C60,35 80,20 100,20 Z"
                    animate={{
                      stroke: COLORS,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                  <Motion.path
                    fill="none"
                    strokeWidth={1}
                    stroke="currentColor"
                    d="M100,40 C115,40 130,50 145,70 C160,90 160,110 145,130 C130,150 115,160 100,160 C85,160 70,150 55,130 C40,110 40,90 55,70 C70,50 85,40 100,40 Z"
                    animate={{
                      stroke: [...COLORS].reverse(),
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                  <Motion.circle
                    cx="100"
                    cy="100"
                    r="40"
                    fill="none"
                    strokeWidth={1}
                    stroke="currentColor"
                    animate={{
                      stroke: COLORS,
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />
                </svg>
              </Motion.div>
            </div>
          </Motion.div>
        </Motion.div>
      </div>
    </section>
  );
};
