import React, { useState, useEffect } from "react";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  useMotionTemplate,
  useMotionValue,
  animate,
} from "framer-motion";
import { 
  Shield, 
  AlertCircle, 
  ArrowRight, 
  Lock, 
  Mail,
  CheckCircle
} from "lucide-react";

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const color = useMotionValue(COLORS[0]);

  useEffect(() => {
    animate(color, COLORS, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, [color]);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
  const glowEffect = useMotionTemplate`0px 0px 30px ${color}`;

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Hardcoded credentials for demonstration
    const validCredentials = [
      { email: "admin@example.com", password: "securepw123" },
      { email: "demo@neobank.com", password: "demo1234" },
      { email: "enterprise@fintech.com", password: "enterprise" }
    ];

    setTimeout(() => {
      const isValid = validCredentials.some(
        cred => cred.email === email && cred.password === password
      );

      if (isValid) {
        setSuccess(true);
        setError("");
        // Immediately navigate to dashboard
        setTimeout(() => {
          window.navigate('/dashboard');
        }, 1500);
      } else {
        setError("Invalid email or password. Please try again.");
        // Shake effect for error feedback
        const formElement = document.querySelector('form');
        formElement.classList.add('shake-animation');
        setTimeout(() => {
          formElement.classList.remove('shake-animation');
        }, 500);
        // Focus on email field for re-entry
        document.getElementById('email').focus();
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        <motion.div 
          className="absolute top-1/4 -right-40 w-80 h-80 bg-opacity-50 rounded-full filter blur-[100px]"
          animate={{ 
            backgroundColor: COLORS,
            x: [0, -20, 0],
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 left-1/4 w-96 h-96 bg-opacity-50 rounded-full filter blur-[120px]"
          animate={{ 
            backgroundColor: [...COLORS].reverse(),
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-2 flex justify-center"
          >
            <motion.div 
              style={{ boxShadow: glowEffect }}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium py-1.5 px-4 rounded-full border border-gray-800 bg-gray-900/50 backdrop-blur-sm text-gray-200"
            >
              <Lock size={14} className="text-white/90" />
              Secure Login
            </motion.div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent"
          >
            Welcome Back
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-gray-400 font-light"
          >
            Secure your financial platform with advanced fraud protection
          </motion.p>
        </div>

        <motion.div
          className="bg-gray-900/60 backdrop-blur-xl border border-gray-800/30 p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {success ? (
            <div className="text-center">
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <CheckCircle className="h-8 w-8 text-white" strokeWidth={1.5} />
              </motion.div>
              <h2 className="text-xl font-semibold mb-2 text-white">Login Successful!</h2>
              <p className="text-gray-400 mb-4 font-light">Redirecting you to your dashboard...</p>
              <motion.button
                style={{ border }}
                className="w-full py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                onClick={() => window.navigate('/dashboard')}
              >
                Go to Dashboard
                <ArrowRight size={16} />
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="login-form space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">Company Email</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail size={16} />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enterprise@company.com"
                    className="w-full px-10 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
                  <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock size={16} />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-10 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                    required
                  />
                </div>
              </div>

              {error && (
                <motion.div 
                  className="text-red-400 text-sm py-3 bg-red-900/20 backdrop-blur-sm border border-red-900/50 rounded-xl px-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" strokeWidth={1.5} />
                    {error}
                  </div>
                </motion.div>
              )}

              <div>
                <motion.button
                  type="submit"
                  style={{ boxShadow }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 rounded-xl transition-colors bg-gray-800/70 hover:bg-gray-700/70 border border-gray-700/50 backdrop-blur-sm text-white font-medium flex items-center justify-center gap-2"
                  disabled={loading}
                >
                  {loading ? 'Authenticating...' : 'Log In'}
                  {!loading && <ArrowRight size={16} />}
                </motion.button>
              </div>

              <div className="text-center text-sm text-gray-400 mt-3 pt-3 border-t border-gray-800">
                <p>Demo credentials:</p>
                <p className="font-mono text-xs mt-2 bg-gray-800/50 p-2 rounded-lg">Email: demo@neobank.com | Password: demo1234</p>
              </div>
            </form>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Sign up for your organization
              </a>
            </p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8 text-center"
        >
          <a href="/" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <motion.div 
              whileHover={{ x: -3 }} 
              className="flex items-center"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            Back to home
          </a>
        </motion.div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
      
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
    </motion.section>
  );
};

export default Login;
