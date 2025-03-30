import React from "react";
import { AuroraHero } from "../components/AuroraHero";
import GitHubIcon from "../components/icons/GitHubIcon";
import WhyAegisSection from "../components/sections/WhyAegisSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import KeyFeaturesSection from "../components/sections/KeyFeaturesSection";
import NeobankSection from "../components/sections/NeobankSection";
import CallToActionSection from "../components/sections/CallToActionSection";

// Re-export AuroraHero so it can be imported from Homepage
export { AuroraHero };

const LandingPage = () => {
  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen relative">
      {/* GitHub Link */}
      <a 
        href="https://github.com/brabentil/AegisX.git" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors duration-300"
        aria-label="View source on GitHub"
      >
        <GitHubIcon />
      </a>

      {/* Hero Section */}
      <AuroraHero />

      {/* Main Content Sections */}
      <WhyAegisSection />
      <HowItWorksSection />
      <KeyFeaturesSection />
      <NeobankSection />
      <CallToActionSection />
    </div>
  );
};

export default LandingPage;