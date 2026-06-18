import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, ChevronRight, HelpCircle, User, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const QuestionsAnswers = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const qaData = [
    {
      id: 1,
      product: 'Premium Gold Finish Watch',
      question: 'Is this watch water resistant?',
      answer: 'Yes, it is 5ATM water resistant.',
      status: 'Answered',
      date: '20 Apr 2026'
    },
    {
      id: 2,
      product: 'Geometric Pendant',
      question: 'Does the gold fade over time?',
      answer: null,
      status: 'Pending',
      date: '25 Apr 2026'
    }
  ];

  const filteredQA = qaData.filter(item => {
    if (activeTab === 'All') return true;
    return item.status === activeTab;
  });

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
        <h1 className="text-lg font-black uppercase tracking-widest">Q & A</h1>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
           {['All', 'Answered', 'Pending'].map(tab => (
             <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all duration-300 ${activeTab === tab ? 'bg-[var(--color-gold)] text-black border-[var(--color-gold)] shadow-[0_0_20px_rgba(226,167,80,0.3)]' : 'bg-black/20 text-[var(--card-sub)] border-[var(--card-border)] hover:border-[var(--color-gold)]/30'}`}
             >
                {tab}
             </button>
           ))}
        </div>

        <div className="space-y-4">
           <AnimatePresence mode="popLayout">
             {filteredQA.map((item) => (
               <motion.div 
                 key={item.id}
                 layout
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="bg-black/20 border border-[var(--card-border)] rounded-2xl p-5 space-y-4 group hover:border-[var(--color-gold)]/30 transition-all"
               >
                  <div className="flex justify-between items-start">
                     <h3 className="text-[10px] font-black text-[var(--card-sub)] uppercase tracking-widest leading-relaxed max-w-[70%]">{item.product}</h3>
                     <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${item.status === 'Answered' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {item.status}
                     </span>
                  </div>

                  <div className="space-y-3">
                     <div className="flex gap-3">
                        <div className="p-1.5 bg-blue-500/10 rounded-lg text-blue-500 flex-shrink-0 self-start">
                           <HelpCircle size={16} />
                        </div>
                        <p className="text-xs font-black tracking-tight leading-relaxed">{item.question}</p>
                     </div>

                     {item.answer ? (
                       <div className="flex gap-3 pl-4 border-l-2 border-[var(--color-gold)]/20 ml-3">
                          <div className="p-1.5 bg-[var(--color-gold)]/10 rounded-lg text-[var(--color-gold)] flex-shrink-0 self-start">
                             <MessageCircle size={16} />
                          </div>
                          <p className="text-xs text-[var(--card-sub)] font-bold italic">{item.answer}</p>
                       </div>
                     ) : (
                       <p className="text-[10px] text-[var(--card-sub)] italic ml-10 font-bold">Waiting for seller's response...</p>
                     )}
                  </div>

                  <div className="pt-3 border-t border-[var(--card-border)]/50 flex justify-between items-center">
                     <span className="text-[10px] font-black text-[var(--card-sub)] uppercase tracking-widest">{item.date}</span>
                     <button className="text-[var(--color-gold)] hover:opacity-80 transition-opacity">
                        <ChevronRight size={18} />
                     </button>
                  </div>
               </motion.div>
             ))}
           </AnimatePresence>

           {filteredQA.length === 0 && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-center py-20 bg-black/10 rounded-3xl border border-dashed border-[var(--card-border)]"
             >
                <MessageSquare size={40} className="mx-auto text-[var(--card-sub)] mb-4 opacity-20" />
                <p className="text-sm text-[var(--card-sub)] font-bold uppercase tracking-widest">No {activeTab.toLowerCase()} questions found</p>
             </motion.div>
           )}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionsAnswers;
