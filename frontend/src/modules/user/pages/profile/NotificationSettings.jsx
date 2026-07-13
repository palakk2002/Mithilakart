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
      className="bg-[#fbfcff] min-h-screen text-slate-800 font-sans"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-1 rounded-full hover:bg-slate-50 transition-colors text-slate-800" aria-label="Go back">
          <ArrowLeft size={22} />
        </button>
        <h1 className="text-[17px] font-black uppercase tracking-widest text-slate-800">Notifications</h1>
      </div>

      <div className="container mx-auto px-4 py-8 w-full space-y-8">
        <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-5 flex items-center gap-4 mb-8">
           <div className="p-3 bg-emerald-50 rounded-2xl text-[#084224]">
              <Bell size={24} className="animate-bounce" />
           </div>
           <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-800">Stay Updated</h3>
              <p className="text-[11px] text-slate-500 font-medium mt-1 leading-normal uppercase">Control how you receive alerts and exclusive offers from Mithilakart.</p>
           </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-[10px] font-black text-[#084224] uppercase tracking-[3px] ml-1">Push Notifications</h2>
          
          <div className="bg-white border border-slate-100 shadow-sm rounded-3xl overflow-hidden divide-y divide-slate-100">
             {[
               { id: 'offers', title: 'Promotions & Offers', icon: Zap, iconColor: 'text-amber-600', bgColor: 'bg-amber-50' },
               { id: 'orders', title: 'Order Updates', icon: Smartphone, iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
               { id: 'updates', title: 'System Updates', icon: Bell, iconColor: 'text-purple-600', bgColor: 'bg-purple-50' },
               { id: 'security', title: 'Account Security', icon: Bell, iconColor: 'text-red-600', bgColor: 'bg-red-50' }
             ].map((item) => (
               <div key={item.id} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                     <div className={`p-2.5 rounded-xl ${item.iconColor} ${item.bgColor}`}>
                        <item.icon size={18} />
                     </div>
                     <span className="text-xs font-black tracking-tight text-slate-800">{item.title}</span>
                  </div>
                  <button 
                    onClick={() => toggleSetting(item.id)}
                    className={`w-12 h-6.5 rounded-full transition-all relative ${settings[item.id] ? 'bg-[#084224]' : 'bg-slate-200'}`}
                  >
                    <div className={`absolute top-1 w-4.5 h-4.5 bg-white rounded-full transition-all shadow-sm ${settings[item.id] ? 'right-1' : 'left-1'}`}></div>
                  </button>
               </div>
             ))}
          </div>
        </div>

        <div className="space-y-4">
           <h2 className="text-[10px] font-black text-[#084224] uppercase tracking-[3px] ml-1">Email Preferences</h2>
           <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="p-2.5 rounded-xl text-green-600 bg-green-50">
                    <Mail size={18} />
                 </div>
                 <span className="text-xs font-black tracking-tight text-slate-800">Weekly Newsletter</span>
              </div>
              <button 
                onClick={() => toggleSetting('newsletter')}
                className={`w-12 h-6.5 rounded-full transition-all relative ${settings.newsletter ? 'bg-[#084224]' : 'bg-slate-200'}`}
              >
                <div className={`absolute top-1 w-4.5 h-4.5 bg-white rounded-full transition-all shadow-sm ${settings.newsletter ? 'right-1' : 'left-1'}`}></div>
              </button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NotificationSettings;

