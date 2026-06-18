import React, { useState } from 'react';
import { TrendingUp, IndianRupee, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const WEEKLY_DATA = [
  { day: 'Mon', earning: 180, orders: 4 },
  { day: 'Tue', earning: 320, orders: 7 },
  { day: 'Wed', earning: 240, orders: 5 },
  { day: 'Thu', earning: 410, orders: 9 },
  { day: 'Fri', earning: 290, orders: 6 },
  { day: 'Sat', earning: 520, orders: 11 },
  { day: 'Sun', earning: 380, orders: 8 },
];

const HISTORY = [
  { id: 'OD87463', customer: 'Rahul S.', date: 'Today, 3:40 PM', base: 40, bonus: 8, net: 48, status: 'Pending' },
  { id: 'OD87450', customer: 'Priya M.', date: 'Today, 3:10 PM', base: 38, bonus: 4, net: 42, status: 'Pending' },
  { id: 'OD87447', customer: 'Amit V.', date: 'Today, 2:22 PM', base: 48, bonus: 7, net: 55, status: 'Processed' },
  { id: 'OD87441', customer: 'Sneha K.', date: 'Today, 1:05 PM', base: 35, bonus: 3, net: 38, status: 'Processed' },
  { id: 'OD87430', customer: 'Raj N.', date: 'Yesterday', base: 52, bonus: 9, net: 61, status: 'Processed' },
];

const maxEarning = Math.max(...WEEKLY_DATA.map(d => d.earning));

const DeliveryEarnings = () => {
  const [period, setPeriod] = useState('This Week');
  const totalWeek = WEEKLY_DATA.reduce((sum, d) => sum + d.earning, 0);
  const totalOrders = WEEKLY_DATA.reduce((sum, d) => sum + d.orders, 0);

  return (
    <div className="pt-5 px-4 pb-8 space-y-5">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Earnings</h1>
          <p className="text-sm text-slate-400 font-medium mt-0.5">South Delhi Zone</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-black text-slate-600 shadow-sm">
          {period} <ChevronDown size={14} />
        </button>
      </div>

      {/* Summary Card */}
      <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-2xl shadow-blue-100">
        <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Total This Week</p>
        <p className="text-4xl font-black tracking-tight">₹{totalWeek.toLocaleString()}</p>
        <div className="flex items-center gap-4 mt-4">
          <div><p className="text-[10px] opacity-60 font-bold uppercase">Orders</p><p className="text-xl font-black">{totalOrders}</p></div>
          <div className="w-px h-8 bg-white/20" />
          <div><p className="text-[10px] opacity-60 font-bold uppercase">Avg/Order</p><p className="text-xl font-black">₹{Math.round(totalWeek / totalOrders)}</p></div>
          <div className="w-px h-8 bg-white/20" />
          <div><p className="text-[10px] opacity-60 font-bold uppercase">Payout</p><p className="text-xs font-black mt-1 bg-amber-400 text-amber-900 px-2 py-0.5 rounded-full">Pending</p></div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5">Daily Breakdown</h3>
        <div className="flex items-end gap-2 h-28">
          {WEEKLY_DATA.map((d, i) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <p className="text-[9px] font-black text-slate-400">₹{d.earning}</p>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.earning / maxEarning) * 80}px` }}
                transition={{ delay: i * 0.05, type: 'spring' }}
                className={`w-full rounded-t-lg ${d.day === 'Sat' ? 'bg-blue-600' : 'bg-blue-100'}`}
              />
              <p className="text-[10px] font-bold text-slate-400">{d.day}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Per-order History */}
      <div>
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Order Breakdown</h3>
        <div className="space-y-2">
          {HISTORY.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white rounded-2xl px-4 py-3.5 border border-slate-100 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.customer}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{item.id} • {item.date}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] text-slate-400 font-bold">Base ₹{item.base}</span>
                    <span className="text-[10px] text-green-500 font-bold">+Bonus ₹{item.bonus}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base font-black text-green-600">+₹{item.net}</p>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${item.status === 'Processed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryEarnings;
