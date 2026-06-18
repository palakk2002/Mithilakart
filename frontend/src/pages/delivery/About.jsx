import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Globe, ExternalLink } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-24 font-sans">
      <div className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-slate-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-slate-800 tracking-tight">About</h1>
      </div>

      <div className="p-8 flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-600 rounded-[28px] flex items-center justify-center shadow-xl shadow-blue-100 mb-6">
          <Package size={48} className="text-white" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Cocia Delivery</h2>
        <p className="text-sm font-bold text-slate-400 mt-1">Version 2.4.0</p>

        <div className="mt-12 w-full space-y-4">
          <p className="text-[14px] text-slate-600 font-medium text-center leading-relaxed">
            Cocia is the next generation delivery platform connecting local merchants with professional delivery partners to provide ultra-fast fulfillment.
          </p>

          <div className="pt-8 space-y-3">
             {[
               { icon: Globe, label: 'Official Website', link: 'www.cocia.com' },
               { icon: ExternalLink, label: 'Terms of Service', link: '' },
               { icon: ExternalLink, label: 'Privacy Policy', link: '' }
             ].map((link, idx) => (
               <button key={idx} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-[15px] font-bold text-slate-700">
                 <div className="flex items-center gap-3">
                   <link.icon size={18} className="text-[#2874f0]" />
                   {link.label}
                 </div>
                 <span className="text-[11px] text-slate-300 font-black uppercase tracking-widest">{link.link}</span>
               </button>
             ))}
          </div>

          <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-[4px] pt-20">
            © 2026 Cocia Technologies
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
