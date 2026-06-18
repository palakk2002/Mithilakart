import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ShieldCheck, ArrowRight, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeliveryAuth = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showPolicy, setShowPolicy] = useState(null); // null | 'terms' | 'privacy'

  const handleSendOTP = () => {
    if (phone.length < 10) {
      setError('Enter a valid 10-digit phone number');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    // Auto-focus next
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.join('').length < 4) {
      setError('Enter all 4 digits');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/delivery/dashboard');
    }, 1500);
  };

  const PolicyModal = ({ type, onClose }) => (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-4 sm:p-6"
    >
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ y: '100%' }} 
        animate={{ y: 0 }} 
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-white rounded-[32px] overflow-hidden shadow-2xl"
      >
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            {type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
          </h3>
          <button onClick={onClose} className="p-2 bg-slate-50 rounded-xl text-slate-400"><X size={20} /></button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-sm text-slate-600 font-medium leading-relaxed">
          {type === 'terms' ? (
            <>
              <p>Welcome to Cocio Delivery Partner Network. By joining our platform, you agree to the following terms:</p>
              <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest pt-2">1. Role & Responsibility</h4>
              <p>As a delivery partner, you are an independent contractor. You are responsible for safe delivery of items and maintaining professional conduct.</p>
              <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest pt-2">2. Earnings & Payouts</h4>
              <p>Payouts are processed weekly. Any disputes regarding earnings must be reported within 48 hours of the transaction.</p>
              <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest pt-2">3. Termination</h4>
              <p>Cocio reserves the right to terminate partnership in case of multiple negative feedbacks, safety violations, or fraudulent activity.</p>
            </>
          ) : (
            <>
              <p>Your privacy is important to us. Here is how we handle your data:</p>
              <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest pt-2">1. Data Collection</h4>
              <p>We collect your location data while you are "Online" to assign orders and track delivery progress for customers.</p>
              <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest pt-2">2. Document Safety</h4>
              <p>Your identity documents (License, PAN, Aadhaar) are stored securely and only used for verification purposes.</p>
              <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest pt-2">3. Third-Party Sharing</h4>
              <p>We do not sell your data. We only share necessary info (Name, Phone) with the customer you are delivering to.</p>
            </>
          )}
        </div>
        <div className="p-6 pt-2">
          <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest">I Understand</button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-nunito max-w-md mx-auto">
      <AnimatePresence>
        {showPolicy && <PolicyModal type={showPolicy} onClose={() => setShowPolicy(null)} />}
      </AnimatePresence>

      {/* Header - Centered Logo */}
      <div className="px-6 pt-16 pb-12 flex flex-col items-center">
        <img src="/Logo (4).png" alt="Cocio Logo" className="h-20 object-contain" />
      </div>

      {/* Form Area */}
      <div className="flex-1 px-6">
        <AnimatePresence mode="wait">
          {step === 'phone' ? (
            <motion.div
              key="phone"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Enter your mobile number</h2>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-50 transition-all">
                  <span className="text-slate-500 font-bold text-sm">+91</span>
                  <div className="w-px h-5 bg-slate-200" />
                  <input
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="98765 43210"
                    className="flex-1 bg-transparent text-slate-900 font-bold text-base placeholder:text-slate-300 outline-none tracking-widest"
                  />
                  <Phone size={18} className="text-slate-300" />
                </div>
              </div>

              {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Send OTP <ArrowRight size={18} /></>
                )}
              </button>

              <p className="text-center text-sm font-bold text-slate-400">
                New partner? <button onClick={() => navigate('/delivery/signup')} className="text-blue-600">Register here</button>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              className="space-y-6"
            >
              <div>
                <button onClick={() => setStep('phone')} className="flex items-center gap-1 text-blue-600 text-sm font-bold mb-4">
                  <ChevronLeft size={18} /> Back
                </button>
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Enter OTP</h2>
                <p className="text-sm text-slate-400 font-medium mt-1">Sent to <span className="text-slate-700 font-bold">+91 {phone}</span></p>
              </div>

              <div className="flex items-center justify-between gap-3">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[i] && i > 0) {
                        document.getElementById(`otp-${i - 1}`)?.focus();
                      }
                    }}
                    className="w-16 h-16 text-center text-2xl font-black text-slate-900 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                  />
                ))}
              </div>

              <p className="text-xs text-slate-400 font-medium">
                Didn't receive OTP? <button className="text-blue-600 font-bold" onClick={() => setOtp(['', '', '', ''])}>Resend in 30s</button>
              </p>

              {error && <p className="text-red-500 text-xs font-bold">{error}</p>}

              <button
                onClick={handleVerify}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Verify & Login <ArrowRight size={18} /></>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <button onClick={() => setShowPolicy('terms')} className="hover:text-blue-600">Terms & Conditions</button>
          <div className="w-1 h-1 bg-slate-200 rounded-full" />
          <button onClick={() => setShowPolicy('privacy')} className="hover:text-blue-600">Privacy Policy</button>
        </div>
      </div>

      <div className="pb-8">
        <p className="text-center text-[10px] text-slate-300 font-bold uppercase tracking-widest">
          Cocio Partner Network • Secure Login
        </p>
      </div>
    </div>
  );
};

export default DeliveryAuth;
