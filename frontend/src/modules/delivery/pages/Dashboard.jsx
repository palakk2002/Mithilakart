import React from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, Package, CheckCircle2, Clock, 
  ChevronRight, MapPin, ArrowRight, Zap, User
} from 'lucide-react';
import { motion } from 'framer-motion';

const ACTIVE_ORDER = {
  id: 'OD87463',
  customer: 'Rahul S.',
  address: 'Sector 15, Noida, UP - 201301',
  items: 3,
  distance: '2.4 km',
  status: 'picked_up',
  earning: 48,
};

const EarningsChart = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = [40, 70, 45, 90, 65, 100, 30]; // Mock height %
  const currentDay = 5; // Saturday (index 5)

  return (
    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Weekly Performance</h3>
          <p className="text-lg font-black text-slate-900 mt-0.5">₹2,480.00</p>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-lg">
          <TrendingUp size={12} />
          <span>+12%</span>
        </div>
      </div>
      
      <div className="flex items-end justify-between gap-2 h-24 px-1">
        {values.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
            <div className="w-full relative flex items-end justify-center h-full">
               <motion.div 
                 initial={{ height: 0 }}
                 animate={{ height: `${v}%` }}
                 transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
                 className={`w-full max-w-[8px] rounded-full transition-colors ${i === currentDay ? 'bg-blue-600' : 'bg-slate-100 group-hover:bg-slate-200'}`}
               />
               {i === currentDay && (
                 <div className="absolute -top-6 bg-slate-900 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                   ₹{v * 10}
                 </div>
               )}
            </div>
            <span className={`text-[8px] font-bold ${i === currentDay ? 'text-blue-600' : 'text-slate-400'}`}>{days[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShiftTimer = ({ isOnline }) => {
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let interval = null;
    if (isOnline) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOnline]);

  const formatTime = (totalSeconds) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-4 flex items-center justify-between text-white overflow-hidden relative">
      <div className="relative z-10">
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Shift Time</p>
        <p className="text-2xl font-mono font-black mt-1 tabular-nums">{formatTime(seconds)}</p>
      </div>
      <div className="relative z-10 text-right">
        <div className={`w-2 h-2 rounded-full ml-auto mb-1 ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-slate-500'}`} />
        <p className="text-[10px] font-bold text-slate-400">{isOnline ? 'Recording' : 'Paused'}</p>
      </div>
      {/* Background Glow */}
      {isOnline && (
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"
        />
      )}
    </div>
  );
};

const CircularProgress = ({ current, total, label }) => {
  const percentage = (current / total) * 100;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex items-center gap-4">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <svg className="w-12 h-12 -rotate-90">
          <circle cx="24" cy="24" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-100" />
          <motion.circle 
            cx="24" cy="24" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="text-blue-600"
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-[10px] font-black text-slate-900">{current}</span>
      </div>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-xs font-bold text-slate-900">Goal: {total} deliveries</p>
      </div>
    </div>
  );
};

const DeliveryDashboard = () => {
  const navigate = useNavigate();
  const { isOnline } = useOutletContext();

  const stats = [
    { label: "Today's Earnings", value: '₹284', sub: '+₹48 active', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Avg. Time', value: '22 min', sub: 'per delivery', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Orders Left', value: '2', sub: 'pending nearby', icon: Package, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const recentDeliveries = [
    { id: 'OD87450', customer: 'Priya M.', address: 'Lajpat Nagar, Delhi', earning: 42, time: '10 min ago', status: 'delivered' },
    { id: 'OD87447', customer: 'Amit V.', address: 'South Ex, Delhi', earning: 55, time: '48 min ago', status: 'delivered' },
    { id: 'OD87441', customer: 'Sneha K.', address: 'Saket, Delhi', earning: 38, time: '2h ago', status: 'delivered' },
  ];

  return (
    <div className="space-y-4 px-4 pt-5 pb-24">
      {/* Shift Timer */}
      <ShiftTimer isOnline={isOnline} />

      {/* Offline Banner */}
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 text-blue-700 px-5 py-4 rounded-2xl flex items-center gap-3 border border-blue-100"
        >
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Zap size={16} className="text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] font-black uppercase tracking-wider">Ready to earn?</p>
            <p className="text-[10px] text-blue-600/70 font-bold">Go online to see new delivery orders</p>
          </div>
          <ArrowRight size={16} className="opacity-50" />
        </motion.div>
      )}

      {/* Greeting */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Hi, Amit 👋</h1>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">South Delhi Zone</p>
        </div>
        <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
          <User size={20} />
        </div>
      </div>

      {/* Daily Progress */}
      <CircularProgress current={6} total={10} label="Daily Goal Progress" />

      {/* Active Order Banner */}
      {isOnline && (
        <motion.button
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => navigate(`/delivery/orders/${ACTIVE_ORDER.id}`)}
          className="w-full bg-blue-600 text-white rounded-3xl p-5 text-left shadow-xl shadow-blue-100"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-70">Active Delivery</span>
              </div>
              <p className="text-lg font-black leading-tight">{ACTIVE_ORDER.customer}</p>
            </div>
            <div className="bg-white/20 px-3 py-1.5 rounded-full">
              <span className="text-xs font-black">+₹{ACTIVE_ORDER.earning}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-blue-100 text-xs font-bold mb-4">
            <MapPin size={13} />
            <span className="truncate">{ACTIVE_ORDER.address}</span>
            <span className="opacity-60 whitespace-nowrap">• {ACTIVE_ORDER.distance}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-3 py-1.5 rounded-full">In Transit</span>
            <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider">
              View Details <ArrowRight size={14} />
            </div>
          </div>
        </motion.button>
      )}

      {/* Weekly Chart */}
      <EarningsChart />

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl p-3 border border-slate-50 shadow-sm"
          >
            <div className={`w-7 h-7 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center mb-2`}>
              <stat.icon size={14} />
            </div>
            <p className="text-sm font-black text-slate-900 leading-none">{stat.value}</p>
            <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tight mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Deliveries */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Recent Activity</h2>
          <button onClick={() => navigate('/delivery/orders')} className="text-blue-600 text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
            History <ChevronRight size={14} />
          </button>
        </div>
        <div className="space-y-2">
          {recentDeliveries.map((d, i) => (
            <div key={i} className="bg-white rounded-2xl px-4 py-3.5 border border-slate-50 shadow-sm flex items-center gap-4">
              <div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={18} className="text-green-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 leading-tight">{d.customer}</p>
                <p className="text-[11px] text-slate-400 font-medium truncate">{d.address}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-black text-green-600">+₹{d.earning}</p>
                <p className="text-[10px] text-slate-300 font-medium mt-0.5">{d.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryDashboard;
