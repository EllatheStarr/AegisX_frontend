import React, { useEffect } from "react";
import {
  motion as Motion,
  useMotionTemplate,
  useMotionValue,
  animate
} from "framer-motion";
import {
  ArrowRight,
  Shield,
  MessageCircle
} from "lucide-react";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const CallToActionSection = () => {
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
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-950 py-24 px-4 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <Motion.div 
          className="absolute top-0 left-1/4 w-72 h-72 bg-opacity-50 rounded-full filter blur-[100px]"
          animate={{ 
            backgroundColor: COLORS,
            x: [0, 30, 0],
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <Motion.div 
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-opacity-50 rounded-full filter blur-[120px]"
          animate={{ 
            backgroundColor: [...COLORS].reverse(),
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ border: borderGlow }}
          className="rounded-3xl bg-gray-900/40 backdrop-blur-xl p-10 md:p-16 text-center"
        >
          <div className="flex justify-center mb-6">
            <Motion.div 
              style={{ boxShadow: textGlow }}
              className="rounded-full p-4 bg-gray-900/70 border border-gray-800"
            >
              <Shield size={40} className="text-white" strokeWidth={1.5} />
            </Motion.div>
          </div>
          
          <Motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-5xl font-semibold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-6 leading-tight"
          >
            Protect Your Financial Platform<br/>with Advanced Fraud Prevention
          </Motion.h2>
          
          <Motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-300/90 font-light text-lg mb-10 max-w-2xl mx-auto"
          >
            Stay ahead of cyber threats with next-generation AI defense. Prevent fraud in real-time with AegisX's intelligent threat detection platform designed specifically for neobanks.
          </Motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{ boxShadow }}
              className="px-8 py-3.5 rounded-xl bg-white text-gray-900 font-medium transition-all flex items-center gap-2 justify-center mx-auto"
              onClick={() => window.navigate('/signup')}
            >
              Get Started Now
              <ArrowRight size={18} />
            </Motion.button>
            
            <Motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-xl bg-transparent border border-gray-700 text-white font-medium transition-all flex items-center gap-2 justify-center mx-auto"
              onClick={() => window.navigate('/contact')}
            >
              <MessageCircle size={18} />
              Talk to an Expert
            </Motion.button>
          </div>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">GDPR Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-purple-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">99.99% Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-6 bg-red-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">Blockchain Secured</span>
            </div>
          </div>
        </Motion.div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
    </section>
  );
};

export default CallToActionSection;
