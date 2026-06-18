import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Package, ShoppingCart, TrendingUp, DollarSign, 
  Plus, ArrowRight, AlertCircle, CheckCircle2, Clock, 
  BarChart3, Wallet, Eye, MessageSquare, ShoppingBag
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { currentVendor, earnings, inventory } = useSelector(state => state.vendor);

  const weeklySales = [
    { name: 'Mon', revenue: 12000, orders: 12 },
    { name: 'Tue', revenue: 19000, orders: 18 },
    { name: 'Wed', revenue: 15000, orders: 14 },
    { name: 'Thu', revenue: 22000, orders: 25 },
    { name: 'Fri', revenue: 30000, orders: 32 },
    { name: 'Sat', revenue: 45000, orders: 48 },
    { name: 'Sun', revenue: 40000, orders: 42 },
  ];

  const StatCard = ({ title, value, sub, icon: Icon, color, bg }) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-5 rounded-2xl border border-blue-50 shadow-sm flex flex-col justify-between"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`p-4 ${bg} ${color} rounded-2xl shadow-sm border border-white/50`}>
          <Icon size={24} />
        </div>
        <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
           <ArrowRight size={20} />
        </button>
      </div>
      <div>
        <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">{title}</h4>
        <h3 className="text-3xl font-black text-slate-900 mt-2">{value}</h3>
        <p className="text-xs text-slate-500 font-medium mt-1">{sub}</p>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-slate-900 tracking-tight font-montserrat uppercase">Platform Earnings</h1>
          <p className="text-slate-500 font-medium mt-1 font-raleway">Financial oversight and transaction settlements.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-800 hover:bg-slate-50 transition-all flex items-center gap-2">
             <Plus size={18} />
             Add Product
          </button>
          <button className="px-6 py-3 bg-blue-500 text-white rounded-2xl text-sm font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:scale-105 active:scale-95 transition-all">
             View Orders
          </button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value="₹2,45,000" sub="+18% growth this month" icon={DollarSign} color="text-green-500" bg="bg-green-50" />
        <StatCard title="Platform Sales" value="1,248" sub="Total orders processed" icon={ShoppingCart} color="text-blue-500" bg="bg-blue-50" />
        <StatCard title="Active Inventory" value={inventory.totalProducts} sub={`${inventory.outOfStock} items out of stock`} icon={Package} color="text-amber-500" bg="bg-amber-50" />
        <StatCard title="Overall Rating" value="4.8" sub="Average vendor performance" icon={TrendingUp} color="text-indigo-500" bg="bg-indigo-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight font-montserrat">Revenue Analytics</h3>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full" />
                  <span className="text-xs font-bold text-slate-400">Revenue</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-indigo-200 rounded-full" />
                  <span className="text-xs font-bold text-slate-400">Orders</span>
               </div>
            </div>
          </div>
          <div className="flex-1 min-h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklySales}>
                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                   <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                   <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dx={-10} />
                   <Tooltip 
                     cursor={{fill: '#f8fafc'}}
                     contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontWeight: 'bold'}}
                   />
                   <Bar dataKey="revenue" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
                   <Bar dataKey="orders" fill="#e0e7ff" radius={[6, 6, 0, 0]} barSize={40} />
                </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Earning Overview */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col">
           <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-8 font-montserrat">Earning Hub</h3>
           <div className="p-6 bg-blue-500 rounded-2xl text-white relative overflow-hidden shadow-2xl shadow-blue-100">
              <div className="absolute top-0 right-0 p-6 opacity-20">
                 <Wallet size={80} />
              </div>
              <div className="relative z-10">
                 <p className="text-[11px] font-black text-white/50 uppercase tracking-[2px]">Withdrawable Balance</p>
                 <h2 className="text-4xl font-black mt-3">₹{earnings.withdrawable.toLocaleString()}</h2>
                 <button className="mt-8 w-full bg-white text-black py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5">
                    Request Payout
                 </button>
              </div>
           </div>

           <div className="mt-8 space-y-6">
              <div className="flex justify-between items-center">
                 <span className="text-sm font-bold text-slate-400">Total Lifetime Earnings</span>
                 <span className="text-lg font-black text-slate-900">₹{earnings.totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-sm font-bold text-slate-400">Pending Settlements</span>
                 <span className="text-lg font-black text-amber-600">₹{earnings.pending.toLocaleString()}</span>
              </div>
              <div className="pt-6 border-t border-slate-50">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h4>
                 <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: Eye, label: 'Analytics' },
                      { icon: MessageSquare, label: 'Support' },
                      { icon: BarChart3, label: 'Tax' }
                    ].map((act, i) => (
                      <button key={i} className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                         <act.icon size={18} className="text-slate-600" />
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-tighter">{act.label}</span>
                      </button>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Inventory Alert */}
         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-8">
               <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight font-montserrat">Stock Monitor</h3>
               <span className="px-4 py-1.5 bg-red-50 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {inventory.outOfStock} Alerts
               </span>
            </div>
            <div className="space-y-4">
               {[
                 { name: 'Ultra Smartwatch', stock: 2, status: 'Low Stock' },
                 { name: 'Leather Messenger Bag', stock: 0, status: 'Out of Stock' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-red-100 transition-all">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                          <Package size={22} className="text-slate-300" />
                       </div>
                       <div>
                          <h4 className="font-black text-slate-900 text-sm">{item.name}</h4>
                          <p className={`text-[10px] font-black uppercase tracking-tight mt-1 ${item.stock === 0 ? 'text-red-500' : 'text-amber-500'}`}>
                             {item.status}
                          </p>
                       </div>
                    </div>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-sm shadow-blue-50">
                       Restock
                    </button>
                 </div>
               ))}
            </div>
         </div>

         {/* Recent Orders Timeline */}
         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight mb-8 font-montserrat">Platform Activity</h3>
            <div className="space-y-8 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
               {[
                 { title: 'New Order Received', desc: 'Order #OD8745 by Rahul S.', time: '5 mins ago', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-50' },
                 { title: 'Payment Settled', desc: 'Settlement for batch #452 successful', time: '1 hour ago', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
                 { title: 'Stock Low Warning', desc: 'Stock level for "Ultra Smartwatch" is low', time: '4 hours ago', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
                 { title: 'Customer Question', desc: 'Inquiry about "Leather Messenger Bag"', time: '1 day ago', icon: Clock, color: 'text-indigo-500', bg: 'bg-indigo-50' }
               ].map((item, i) => (
                 <div key={i} className="relative flex gap-6">
                    <div className={`z-10 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg} ${item.color} shadow-sm border border-white`}>
                       <item.icon size={18} />
                    </div>
                    <div>
                       <h4 className="font-black text-slate-900 text-sm">{item.title}</h4>
                       <p className="text-xs text-slate-500 font-medium mt-1.5">{item.desc}</p>
                       <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-2 block">{item.time}</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
