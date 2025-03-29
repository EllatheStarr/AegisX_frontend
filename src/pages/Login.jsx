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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
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
        // In a real app, you would redirect or set auth state
        alert("Login successful! Welcome back to AegisX.");
      } else {
        setError("Invalid email or password. Please try again.");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <motion.section
      style={{ backgroundImage }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Secure your financial platform with AegisX</p>
        </div>

        <motion.div
          className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {success ? (
            <div className="text-center">
              <motion.div
                className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-xl font-semibold mb-2">Login Successful!</h2>
              <p className="text-gray-400 mb-4">Redirecting you to your dashboard...</p>
              <motion.button
                style={{ border }}
                className="w-full py-2 rounded-md transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                Go to Dashboard
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Company Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enterprise@company.com"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-sm font-medium">Password</label>
                    <a href="#" className="text-sm text-blue-400 hover:underline">Forgot password?</a>
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {error && (
                  <div className="text-red-500 text-sm py-2">
                    {error}
                  </div>
                )}

                <div>
                  <motion.button
                    type="submit"
                    style={{ boxShadow }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-2 rounded-md transition-colors ${loading ? 'bg-gray-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                    disabled={loading}
                  >
                    {loading ? 'Authenticating...' : 'Log In'}
                  </motion.button>
                </div>

                <div className="text-center text-sm text-gray-400">
                  <p>Demo credentials:</p>
                  <p className="font-mono text-xs mt-1 bg-gray-800 p-1 rounded">Email: demo@neobank.com | Password: demo1234</p>
                </div>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-400 hover:underline">
                Sign up for your organization
              </a>
            </p>
          </div>
        </motion.div>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Back to home
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <Stars radius={50} count={2500} factor={4} fade speed={2} />
        </Canvas>
      </div>
    </motion.section>
  );
};

export default Login;
