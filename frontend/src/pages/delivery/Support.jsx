import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Phone, Mail, HelpCircle, FileText } from 'lucide-react';

const Support = () => {
  const navigate = useNavigate();

  const channels = [
    { icon: MessageSquare, label: 'Chat with us', desc: 'Typical response time: 2 mins', color: 'bg-blue-500' },
    { icon: Phone, label: 'Call Support', desc: 'Available 24/7 for active orders', color: 'bg-green-500' },
    { icon: Mail, label: 'Email Support', desc: 'Get help within 24 hours', color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">Help & Support</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-[#2874f0] rounded-3xl p-6 text-white overflow-hidden relative">
          <HelpCircle size={100} className="absolute -right-4 -bottom-4 opacity-10" />
          <h2 className="text-xl font-black mb-2">How can we help?</h2>
          <p className="text-sm opacity-80 font-medium">We're here to help you 24/7 with any delivery related issues.</p>
        </div>

        <div className="space-y-4">
          {channels.map((ch, idx) => (
            <button key={idx} className="w-full bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 text-left active:scale-[0.98] transition-all">
              <div className={`w-12 h-12 ${ch.color} rounded-xl flex items-center justify-center text-white`}>
                <ch.icon size={24} />
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-slate-800">{ch.label}</h4>
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{ch.desc}</p>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-4">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1 mb-3">Quick Resources</h3>
          <div className="space-y-2">
            {['Delivery Partner FAQ', 'Payment Policies', 'Safety Guidelines'].map(item => (
              <button key={item} className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 text-sm font-bold text-slate-700">
                <div className="flex items-center gap-3">
                   <FileText size={16} className="text-slate-400" />
                   {item}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
