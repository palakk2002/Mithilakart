import React, { useState } from 'react';
import { ArrowLeft, Bell, Smartphone, Mail, Zap, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotificationSettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    offers: true,
    updates: true,
    orders: true,
    security: true,
    newsletter: false
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[var(--card-bg)] min-h-screen text-[var(--card-text)]"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--card-bg)]/90 backdrop-blur-md border-b border-[var(--card-border)] p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="hover:text-[var(--color-gold)] transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black uppercase tracking-widest">Notifications</h1>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
        <div className="bg-black/20 border border-[var(--card-border)] rounded-2xl p-6 flex items-center gap-4 mb-8">
           <div className="p-3 bg-[var(--color-gold)]/10 rounded-full text-[var(--color-gold)]">
              <Bell size={24} className="animate-bounce" />
           </div>
           <div>
              <h3 className="text-sm font-black uppercase tracking-widest">Stay Updated</h3>
              <p className="text-[10px] text-[var(--card-sub)] font-bold uppercase tracking-widest leading-tight">Control how you receive alerts and exclusive offers from Mithilakart.</p>
           </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-[10px] font-black text-[var(--color-gold)] uppercase tracking-[3px] ml-1">Push Notifications</h2>
          
          <div className="bg-black/20 border border-[var(--card-border)] rounded-2xl overflow-hidden divide-y divide-[var(--card-border)]">
             {[
               { id: 'offers', title: 'Promotions & Offers', icon: Zap, color: 'text-amber-500' },
               { id: 'orders', title: 'Order Updates', icon: Smartphone, color: 'text-primary-dark' },
               { id: 'updates', title: 'System Updates', icon: Bell, color: 'text-purple-500' },
               { id: 'security', title: 'Account Security', icon: Bell, color: 'text-red-500' }
             ].map((item) => (
               <div key={item.id} className="p-5 flex items-center justify-between hover:bg-black/5 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className={`p-2 rounded-lg ${item.color} bg-white/5`}>
                        <item.icon size={18} />
                     </div>
                     <span className="text-xs font-black tracking-tight">{item.title}</span>
                  </div>
                  <button 
                    onClick={() => toggleSetting(item.id)}
                    className={`w-12 h-6 rounded-full transition-all relative ${settings[item.id] ? 'bg-[var(--color-gold)]' : 'bg-gray-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings[item.id] ? 'right-1' : 'left-1'}`}></div>
                  </button>
               </div>
             ))}
          </div>
        </div>

        <div className="space-y-6">
           <h2 className="text-[10px] font-black text-[var(--color-gold)] uppercase tracking-[3px] ml-1">Email Preferences</h2>
           <div className="bg-black/20 border border-[var(--card-border)] rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-2 rounded-lg text-green-500 bg-white/5">
                    <Mail size={18} />
                 </div>
                 <span className="text-xs font-black tracking-tight">Weekly Newsletter</span>
              </div>
              <button 
                onClick={() => toggleSetting('newsletter')}
                className={`w-12 h-6 rounded-full transition-all relative ${settings.newsletter ? 'bg-[var(--color-gold)]' : 'bg-gray-700'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.newsletter ? 'right-1' : 'left-1'}`}></div>
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationSettings;

