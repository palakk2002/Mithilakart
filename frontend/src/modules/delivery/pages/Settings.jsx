import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Lock, Globe, Shield, Smartphone } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();

  const settingGroups = [
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', value: 'On' },
        { icon: Globe, label: 'Language', value: 'English' },
        { icon: Smartphone, label: 'App Theme', value: 'Light' }
      ]
    },
    {
      title: 'Security',
      items: [
        { icon: Lock, label: 'Change Password', value: '' },
        { icon: Shield, label: 'Privacy Policy', value: '' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">Settings</h1>
      </div>

      <div className="p-4 space-y-8">
        {settingGroups.map((group, gIdx) => (
          <div key={gIdx} className="space-y-3">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{group.title}</h3>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {group.items.map((item, iIdx) => (
                <button 
                  key={iIdx}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b last:border-0 border-slate-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      <item.icon size={18} className="text-[#6FAE4A]" />
                    </div>
                    <span className="text-[15px] font-bold text-slate-700">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400">{item.value}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
        
        <div className="pt-4 px-2">
          <p className="text-[11px] text-slate-400 font-medium text-center">App Version 2.4.0 (Stable)</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;

