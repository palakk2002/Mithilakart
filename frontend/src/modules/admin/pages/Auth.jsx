import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Check credentials: 9111966732 / 123456
    if (email === '9111966732' && password === '123456') {
      setError('');
      // Mock login
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username/phone or password');
    }
  };

  // Inline SVG pattern for background
  const backgroundPattern = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M10 20c2-3 5-5 8-5s6 2 8 5-2 8-5 8-6-2-8-5zm30 20c2-3 5-5 8-5s6 2 8 5-2 8-5 8-6-2-8-5zM25 45c1-2 3-3 5-3s4 1 5 3-1 4-3 4-4-1-5-3zM45 15c1-2 3-3 5-3s4 1 5 3-1 4-3 4-4-1-5-3z" fill="%23ffffff" fill-opacity="0.12" fill-rule="evenodd"/></svg>`;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between p-4 md:p-6 bg-gradient-to-br from-[#77eba3] to-[#42c585] relative overflow-hidden"
      style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #77eba3 0%, #42c585 100%), url('${backgroundPattern}')` }}
    >
      {/* Background organic elements */}
      <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0C35 25 15 35 0 50C15 65 35 75 50 100C65 75 85 65 100 50C85 35 65 25 50 0Z" fill="white" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 opacity-15 pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 80C40 80 60 60 80 20C60 20 40 40 20 80Z" fill="white" />
          <circle cx="50" cy="50" r="10" fill="white" />
        </svg>
      </div>

      {/* Top Header Row */}
      <div className="w-full max-w-[420px] flex items-center justify-between z-10">
        <button 
          onClick={() => navigate('/')}
          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md active:scale-95 transition-all"
        >
          <X size={20} strokeWidth={2.5} />
        </button>
        <span className="text-white font-bold tracking-wider text-sm">ADMIN PANEL</span>
        <div className="w-9"></div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-[420px] bg-[#f2fff5] rounded-[32px] px-6 py-8 shadow-2xl border border-white/40 z-10 my-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#0a4a17]">
            Welcome back
          </h2>
          <p className="text-[#3b8a53] text-[13px] font-semibold mt-1">
            Verified Management Session
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-500 text-[11px] font-bold p-3.5 rounded-2xl text-center uppercase tracking-wider">
              {error}
            </div>
          )}

          {/* Email / Username Field */}
          <div>
            <label className="block text-[12px] font-bold text-[#1f592c] mb-1.5 px-1 uppercase tracking-wider">
              Admin Username / Phone
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b8a53]">
                <Mail size={18} />
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. 9111966732"
                className="w-full pl-11 pr-4 py-3 bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] text-[14px] font-semibold text-[#0a4a17] placeholder-[#81b29a] focus:outline-none transition-all shadow-inner"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[12px] font-bold text-[#1f592c] mb-1.5 px-1 uppercase tracking-wider">
              Secure Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#3b8a53]">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-11 pr-11 py-3 bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] text-[14px] font-semibold text-[#0a4a17] placeholder-[#81b29a] focus:outline-none transition-all shadow-inner"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3b8a53] hover:text-[#0a4a17] transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 bg-[#0c5c20] hover:bg-[#073f15] text-white rounded-[16px] text-[15px] font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Sign In to Dashboard
          </motion.button>
        </form>
      </div>

      {/* Footer Logo & Styling */}
      <div className="flex flex-col items-center gap-1 my-4 z-10">
        <img 
          src="/mithilakartbglogo.png" 
          alt="Mithilakart" 
          className="h-10 w-auto object-contain brightness-0 filter invert opacity-90"
        />
        <div className="flex items-center gap-1 text-[18px] font-bold text-white tracking-wide italic">
          <span className="opacity-90">Mithila</span>
          <span className="text-[#073f15]">kart</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
