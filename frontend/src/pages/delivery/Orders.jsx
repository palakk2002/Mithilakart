import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, CheckCircle2, Clock, MapPin, ChevronRight, X, Zap, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_ORDERS = {
  pending: [
    {
      id: 'OD87471', customer: 'Vikram S.', address: 'Lajpat Nagar, South Delhi',
      pickupAddress: 'Vendor: FreshMart, CR Park, Delhi',
      items: 2, distance: '1.8 km', earning: 35, weight: '1.2 kg',
      timeLeft: 90, // seconds to accept
    },
    {
      id: 'OD87475', customer: 'Neha P.', address: 'Green Park, New Delhi',
      pickupAddress: 'Vendor: QuickShop, Malviya Nagar, Delhi',
      items: 1, distance: '3.1 km', earning: 52, weight: '0.5 kg',
      timeLeft: 110,
    },
  ],
  active: [
    {
      id: 'OD87463', customer: 'Rahul S.', address: 'Sector 15, Noida, UP',
      pickupAddress: 'Vendor: MegaMart, Sector 12, Noida',
      items: 3, distance: '2.4 km', earning: 48, status: 'in_transit',
    },
  ],
  history: [
    { id: 'OD87450', customer: 'Priya M.', address: 'Lajpat Nagar, Delhi', earning: 42, date: 'Today, 3:10 PM' },
    { id: 'OD87447', customer: 'Amit V.', address: 'South Ex, Delhi', earning: 55, date: 'Today, 2:22 PM' },
    { id: 'OD87441', customer: 'Sneha K.', address: 'Saket, Delhi', earning: 38, date: 'Today, 1:05 PM' },
    { id: 'OD87430', customer: 'Raj N.', address: 'Hauz Khas, Delhi', earning: 61, date: 'Yesterday, 6:45 PM' },
  ],
};

const TABS = ['Pending', 'Active', 'History'];

const LiveCountdown = ({ initialTime, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  React.useEffect(() => {
    if (timeLeft <= 0) {
      onExpire();
      return;
    }
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const percentage = (timeLeft / initialTime) * 100;

  return (
    <div className="flex items-center gap-2 min-w-[80px] bg-white/20 px-2 py-0.5 rounded-full">
      <div className="relative w-3 h-3">
        <svg className="w-3 h-3 -rotate-90">
          <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="1" fill="transparent" opacity="0.3" />
          <motion.circle 
            cx="6" cy="6" r="5" stroke="white" strokeWidth="1" fill="transparent" 
            strokeDasharray="31.4"
            animate={{ strokeDashoffset: 31.4 - (31.4 * percentage) / 100 }}
            className="text-white"
          />
        </svg>
      </div>
      <span className="text-white text-[10px] font-black tabular-nums">{timeLeft}s</span>
    </div>
  );
};

const SwipeAction = ({ children, onAccept, onDecline }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background Actions */}
      <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none">
        <div className="flex flex-col items-center gap-1 text-red-500">
          <X size={20} />
          <span className="text-[8px] font-black uppercase">Decline</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-green-500">
          <CheckCircle2 size={20} />
          <span className="text-[8px] font-black uppercase">Accept</span>
        </div>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x > 100) onAccept();
          if (info.offset.x < -100) onDecline();
        }}
        className="relative z-10 cursor-grab active:cursor-grabbing bg-white border border-slate-100 shadow-sm rounded-2xl"
      >
        {children}
      </motion.div>
    </div>
  );
};

const DeliveryOrders = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Pending');
  const [orders, setOrders] = useState(MOCK_ORDERS);

  const handleDecline = (orderId) => {
    setOrders(prev => ({
      ...prev,
      pending: prev.pending.filter(o => o.id !== orderId),
    }));
  };

  const handleAccept = (order) => {
    setOrders(prev => ({
      ...prev,
      pending: prev.pending.filter(o => o.id !== order.id),
      active: [...prev.active, { ...order, status: 'accepted' }],
    }));
    setActiveTab('Active');
  };

  return (
    <div className="pt-5 pb-24">
      {/* Header */}
      <div className="px-4 mb-4">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">Orders</h1>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">
          {orders.pending.length} New assigned • {orders.active.length} In progress
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 px-4 mb-6">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-[11px] font-black uppercase tracking-widest relative transition-colors ${
              activeTab === tab ? 'text-blue-600' : 'text-slate-400'
            }`}
          >
            {tab}
            {tab === 'Pending' && orders.pending.length > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full min-w-[16px] inline-block">{orders.pending.length}</span>
            )}
            {activeTab === tab && (
              <motion.div layoutId="ordersTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="px-4">
        <AnimatePresence mode="wait">
          {/* --- PENDING ORDERS --- */}
          {activeTab === 'Pending' && (
            <motion.div 
              key="pending"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {orders.pending.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
                  <Package size={32} className="text-slate-200 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">All caught up!</p>
                  <p className="text-[10px] text-slate-300 font-bold mt-1 uppercase">Waiting for new assignments...</p>
                </div>
              ) : (
                orders.pending.map((order, i) => (
                  <SwipeAction 
                    key={order.id} 
                    onAccept={() => handleAccept(order)} 
                    onDecline={() => handleDecline(order.id)}
                  >
                    <div className="overflow-hidden">
                      {/* Alert Bar */}
                      <div className="bg-amber-500 px-4 py-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap size={13} className="text-white fill-white" />
                          <span className="text-white text-[9px] font-black uppercase tracking-widest">New Assignment</span>
                        </div>
                        <LiveCountdown initialTime={order.timeLeft} onExpire={() => handleDecline(order.id)} />
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">OrderID #{order.id}</p>
                            <p className="text-lg font-black text-slate-900 leading-tight">{order.customer}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-black text-green-600 leading-none">₹{order.earning}</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{order.distance} TRIP</p>
                          </div>
                        </div>

                        <div className="space-y-3 relative pb-2 mb-4">
                          <div className="absolute left-2 top-3 bottom-3 w-px border-l border-dashed border-slate-200" />
                          
                          <div className="flex items-start gap-4">
                            <div className="w-4 h-4 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 z-10">
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Store Location</p>
                              <p className="text-[11px] font-bold text-slate-600">{order.pickupAddress}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-4">
                            <div className="w-4 h-4 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0 z-10">
                              <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                            </div>
                            <div>
                              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Customer Location</p>
                              <p className="text-[11px] font-bold text-slate-600">{order.address}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 border-t border-slate-50 pt-4">
                          <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider">{order.items} Items</span>
                          <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-wider">{order.weight}</span>
                          <div className="ml-auto flex items-center gap-1 text-[9px] font-black text-slate-300 uppercase tracking-widest italic">
                            Swipe to act <ArrowRight size={10} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwipeAction>
                ))
              )}
            </motion.div>
          )}

          {/* --- ACTIVE ORDERS --- */}
          {activeTab === 'Active' && (
            <motion.div 
              key="active"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {orders.active.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-100">
                  <Clock size={32} className="text-slate-200 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-wide">No active runs</p>
                  <p className="text-[10px] text-slate-300 font-bold mt-1 uppercase">Go to pending to start earning</p>
                </div>
              ) : (
                orders.active.map((order, i) => (
                  <motion.button
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => navigate(`/delivery/orders/${order.id}`)}
                    className="w-full bg-slate-900 rounded-3xl p-6 text-left shadow-2xl shadow-slate-200 relative overflow-hidden group"
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-blue-600/10 skew-x-[20deg] translate-x-16 group-hover:bg-blue-600/20 transition-colors" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">In Transit</span>
                      </div>
                      
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Target</p>
                          <p className="text-xl font-black text-white">{order.customer}</p>
                          <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold mt-2">
                            <MapPin size={12} className="text-blue-500" />
                            <span className="truncate max-w-[180px]">{order.address}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-blue-400">₹{order.earning}</p>
                          <div className="flex items-center gap-1 text-[10px] font-black text-white bg-white/10 px-2 py-1 rounded-lg mt-3 ml-auto w-fit">
                            Live <ChevronRight size={12} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </motion.div>
          )}

          {/* --- HISTORY --- */}
          {activeTab === 'History' && (
            <motion.div 
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-3"
            >
              {orders.history.map((order, i) => (
                <div key={order.id} className="bg-white rounded-2xl px-5 py-4 border border-slate-50 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 text-green-500 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-black text-slate-900">{order.customer}</p>
                      <p className="text-base font-black text-slate-900">₹{order.earning}</p>
                    </div>
                    <p className="text-[11px] text-slate-400 font-bold truncate mt-0.5">{order.address}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{order.date}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full" />
                      <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Paid Out</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeliveryOrders;
