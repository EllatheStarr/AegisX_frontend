import React, { useState } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";

const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const Signup = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    industry: "",
    size: "10-50",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  const color = useMotionValue(COLORS_TOP[0]);

  React.useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStep1 = () => {
    if (!formData.companyName.trim()) {
      setError("Company name is required");
      return false;
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Valid email is required");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.industry) {
      setError("Please select your industry");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setError("");
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setLoading(true);
      setError("");
      
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 1500);
    }
  };

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 px-4 py-12 text-gray-200"
    >
      <div className="relative z-10 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Your Enterprise Account</h1>
          <p className="text-gray-400">Get started with AegisX cyberthreat prevention</p>
        </div>

        <motion.div
          className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {success ? (
            <div className="text-center py-6">
              <motion.div
                className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-2xl font-semibold mb-3">Registration Complete!</h2>
              <p className="text-gray-400 mb-6">Thank you for choosing AegisX to protect your financial platform.</p>
              <p className="text-gray-400 mb-6">Our team will contact you shortly to discuss your security needs.</p>
              <div className="flex space-x-4 justify-center">
                <motion.a
                  href="/login"
                  style={{ border }}
                  className="px-6 py-2 rounded-md transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  Go to Login
                </motion.a>
                <motion.a
                  href="/"
                  className="px-6 py-2 rounded-md border border-gray-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  Back to Home
                </motion.a>
              </div>
            </div>
          ) : (
            <form onSubmit={step === 2 ? handleSubmit : nextStep}>
              {step === 1 && (
                <motion.div
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-1">Company Name</label>
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Acme Financial Technologies"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Company Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="contact@company.com"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  className="space-y-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Create Password</label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium mb-1">Industry</label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Industry</option>
                      <option value="banking">Banking</option>
                      <option value="fintech">Fintech</option>
                      <option value="neobank">Neobank</option>
                      <option value="insurance">Insurance</option>
                      <option value="wealth_management">Wealth Management</option>
                      <option value="payments">Payments</option>
                      <option value="other">Other Financial Services</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="size" className="block text-sm font-medium mb-1">Company Size</label>
                    <select
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="1-9">1-9 employees</option>
                      <option value="10-50">10-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {error && (
                <div className="text-red-500 text-sm mt-4">
                  {error}
                </div>
              )}

              <div className="mt-6 flex justify-between">
                {step === 2 && (
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 border border-gray-600 rounded-md"
                    onClick={prevStep}
                  >
                    Back
                  </motion.button>
                )}
                
                <motion.button
                  type="submit"
                  style={{ boxShadow }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-6 py-2 rounded-md transition-colors ${step === 2 ? 'bg-blue-600 hover:bg-blue-700 ml-auto' : 'bg-blue-600 hover:bg-blue-700 w-full'} ${loading ? 'bg-gray-700' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : step === 1 ? 'Next' : 'Create Account'}
                </motion.button>
              </div>
            </form>
          )}

          {!success && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <a href="/login" className="text-blue-400 hover:underline">
                  Log in
                </a>
              </p>
            </div>
          )}
        </motion.div>

        {!success && (
          <div className="mt-8 text-center">
            <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              ← Back to home
            </a>
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};

export default Signup;
