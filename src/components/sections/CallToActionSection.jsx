import React from "react";
import { motion as Motion } from "framer-motion";

const CallToActionSection = () => {
  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-3xl font-semibold sm:text-4xl md:text-5xl">
        📢 Protect Your Platform with AegisX
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-base leading-relaxed md:text-lg">
        🚀 Stay ahead of cyber threats with next-generation AI defense. Preventing attacks is more effective than responding to breaches.
      </p>
      <Motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 rounded-full bg-gray-700 px-6 py-3 text-lg font-medium text-gray-50 shadow-lg hover:bg-gray-600"
        onClick={() => window.navigate('/signup')}
      >
        Talk to an Expert
      </Motion.button>
    </section>
  );
};

export default CallToActionSection;
