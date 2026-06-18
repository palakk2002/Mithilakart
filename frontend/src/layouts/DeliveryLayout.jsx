import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Package, IndianRupee, User, WifiOff, Wifi } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DeliveryLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(true);

  const navItems = [
    { label: 'Home', path: '/delivery/dashboard', icon: Home },
    { label: 'Orders', path: '/delivery/orders', icon: Package },
    { label: 'Earnings', path: '/delivery/earnings', icon: IndianRupee },
    { label: 'Profile', path: '/delivery/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  const showHeader = [
    '/delivery/dashboard',
    '/delivery/orders',
    '/delivery/earnings',
    '/delivery/profile'
  ].includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#f4f6f9] font-nunito flex flex-col max-w-md mx-auto relative">
      {/* Top Status Bar */}
      {showHeader && (
        <div className="sticky top-0 z-40 bg-white border-b border-slate-100 px-5 py-3 flex items-center justify-between shadow-sm animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
              <Package size={16} className="text-white" />
            </div>
            <span className="text-[15px] font-black text-slate-900 tracking-tight font-montserrat">Cocio<span className="text-blue-600">.</span> Delivery</span>
          </div>

          {/* Online / Offline Toggle */}
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
              isOnline
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'bg-slate-100 text-slate-400 border border-slate-200'
            }`}
          >
            {isOnline ? <Wifi size={13} /> : <WifiOff size={13} />}
            {isOnline ? 'Online' : 'Offline'}
          </button>
        </div>
      )}

      {/* Page Content */}
      <main className="flex-1 overflow-y-auto pb-24">
        <Outlet context={{ isOnline, setIsOnline }} />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 px-5 py-1.5 relative"
              >
                {active && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full"
                  />
                )}
                <item.icon
                  size={22}
                  className={`transition-colors ${active ? 'text-blue-600' : 'text-slate-500'}`}
                />
                <span className={`text-[9px] font-black uppercase tracking-wider transition-colors ${active ? 'text-blue-600' : 'text-slate-600'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default DeliveryLayout;
