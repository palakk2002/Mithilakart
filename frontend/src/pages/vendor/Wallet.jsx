import React from 'react';
import { Wallet as WalletIcon, CreditCard, ArrowUpRight, ArrowDownLeft, Plus, ChevronRight } from 'lucide-react';

const Wallet = () => {
  const transactions = [
    { id: 1, title: 'Cashback - iPhone 15 Purchase', date: '22 Apr 2026', amount: '+ ₹500', type: 'credit' },
    { id: 2, name: 'Payment to Amazon Bazaar', date: '21 Apr 2026', amount: '- ₹375', type: 'debit' },
  ];

  return (
    <div className="bg-[#eaeded] min-h-screen pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-primary rounded-lg">
                   <WalletIcon size={24} className="text-slate-900" />
                </div>
                <h1 className="text-xl font-bold">Cocio Pay Balance</h1>
             </div>
             <ChevronRight size={20} className="text-slate-400" />
          </div>
          
          <div className="flex items-baseline gap-1 mb-8">
             <span className="text-sm font-medium text-slate-500">Available Balance:</span>
             <span className="text-3xl font-black text-slate-900">₹1,245.50</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <button className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <Plus size={24} className="text-primary-dark" />
                <span className="text-xs font-bold">Add Money</span>
             </button>
             <button className="flex flex-col items-center gap-2 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <CreditCard size={24} className="text-orange-600" />
                <span className="text-xs font-bold">Manage Cards</span>
             </button>
          </div>
        </div>

        <h2 className="text-lg font-bold mb-4 px-2">Recent Transactions</h2>
        <div className="space-y-3">
           {transactions.map(t => (
              <div key={t.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${t.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
                       {t.type === 'credit' ? <ArrowDownLeft size={20} className="text-green-600" /> : <ArrowUpRight size={20} className="text-red-600" />}
                    </div>
                    <div>
                       <p className="text-sm font-bold text-slate-800">{t.title || t.name}</p>
                       <p className="text-[10px] text-slate-500">{t.date}</p>
                    </div>
                 </div>
                 <span className={`font-bold ${t.type === 'credit' ? 'text-green-600' : 'text-slate-900'}`}>{t.amount}</span>
              </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;

