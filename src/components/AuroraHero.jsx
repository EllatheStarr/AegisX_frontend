import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import {
  useMotionTemplate,
  useMotionValue,
  motion as Motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

// Simple arrow component to replace the FiArrowRight
const ArrowRight = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export const AuroraHero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <Motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-2 inline-block rounded-full bg-gray-600/40 px-4 py-1 text-xs font-medium tracking-wider uppercase">
          🛡 AI · Blockchain · Defense
        </span>
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-semibold tracking-tight leading-none text-transparent sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight">
          Next-Gen Cybersecurity for Digital Finance
        </h1>
        <p className="my-5 max-w-lg text-center text-base text-gray-300/90 font-light leading-relaxed md:text-lg">
          Intelligent protection against advanced threats — zero-day exploits, ransomware, and supply chain vulnerabilities for modern financial platforms.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center mt-2">
          <Motion.button
            style={{
              border,
              boxShadow,
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-5 py-2.5 text-gray-50 transition-colors hover:bg-gray-950/50 font-medium text-sm tracking-wide"
            onClick={() => window.navigate('/signup')}
          >
            Get Started
            <ArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
          </Motion.button>
          
          <Motion.button
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            style={{
              boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.3)",
            }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-white text-gray-900 font-medium text-sm tracking-wide px-5 py-2.5 transition-colors hover:bg-gray-200"
            onClick={() => window.navigate('/login')}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="mr-1"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Login
          </Motion.button>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </Motion.section>
  );
};