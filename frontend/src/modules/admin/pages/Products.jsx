import React, { useState, useMemo } from 'react';
import { 
  Edit2, Trash2, Plus, Search, Filter, MoreVertical, Eye,
  Package, Download, AlertCircle, CheckCircle2, XCircle, Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { StatusBadge, Pagination } from '../components/ui';

const PRODUCTS = [
  { id: 1, name: 'Apple iPhone 15', category: 'Electronics', price: '₹69,999', stock: 45, status: 'In Stock', approval: 'Approved', image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=100', vendor: 'Elite Electronics' },
  { id: 2, name: 'Sony WH-1000XM5', category: 'Electronics', price: '₹29,990', stock: 12, status: 'Low Stock', approval: 'Approved', image: 'https://images.unsplash.com/photo-1670057037305-64d84711833d?w=100', vendor: 'Tech World' },
  { id: 3, name: 'Samsung Galaxy Watch 6', category: 'Electronics', price: '₹18,499', stock: 0, status: 'Out of Stock', approval: 'Approved', image: 'https://images.unsplash.com/photo-1695213601569-8088019316d3?w=100', vendor: 'Global Tech' },
  { id: 4, name: 'Nike Air Max Pulse', category: 'Fashion', price: '₹12,995', stock: 89, status: 'In Stock', approval: 'Approved', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100', vendor: 'Fashion Hub' },
  { id: 5, name: 'Logitech MX Master 3S', category: 'Electronics', price: '₹9,495', stock: 24, status: 'In Stock', approval: 'Pending', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=100', vendor: 'Tech World' },
  { id: 6, name: 'Organic Face Wash', category: 'Beauty', price: '₹499', stock: 150, status: 'In Stock', approval: 'Pending', image: '', vendor: 'Glow Cosmetics' },
  { id: 7, name: 'Cotton Kurti Set', category: 'Fashion', price: '₹1,299', stock: 0, status: 'Out of Stock', approval: 'Rejected', image: '', vendor: 'Fashion Hub' },
  { id: 8, name: 'Bluetooth Speaker', category: 'Electronics', price: '₹2,499', stock: 5, status: 'Low Stock', approval: 'Approved', image: '', vendor: 'Elite Electronics' },
];

const Products = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const tabs = ['All', 'Approved', 'Pending', 'Rejected', 'In Stock', 'Low Stock', 'Out of Stock'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesTab = activeTab === 'All' || p.status === activeTab || p.approval === activeTab;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           p.vendor.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = [
    { label: 'Total Products', value: PRODUCTS.length.toString(), icon: Package, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Pending Approval', value: PRODUCTS.filter(p => p.approval === 'Pending').length.toString(), icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Out of Stock', value: PRODUCTS.filter(p => p.status === 'Out of Stock').length.toString(), icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Active Listings', value: PRODUCTS.filter(p => p.approval === 'Approved' && p.status !== 'Out of Stock').length.toString(), icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight font-montserrat uppercase">Product Management</h1>
          <p className="text-slate-500 text-sm sm:text-base font-medium mt-1 font-raleway">Manage your inventory, pricing, approval status, and stock levels.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">
            <Download size={16} />
            Export
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-all group"
          >
            <div className={`w-11 h-11 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 font-roboto leading-none">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {/* Tabs & Search */}
        <div className="p-6 border-b border-slate-50 space-y-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-100' 
                  : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, category, vendor..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3.5 pl-12 pr-6 text-sm font-bold focus:ring-4 focus:ring-blue-50 transition-all outline-none text-slate-900 placeholder:text-slate-300"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              />
            </div>
            <button className="h-[52px] px-6 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest w-full sm:w-auto">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Approval</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              <AnimatePresence>
                {paginatedProducts.length > 0 ? paginatedProducts.map((product, i) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="group hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center flex-shrink-0">
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="w-full h-full object-contain p-1" />
                          ) : (
                            <Package size={20} className="text-slate-300" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 font-montserrat leading-tight">{product.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold mt-1">SKU: SH-902{product.id} • {product.vendor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black border border-slate-100 uppercase tracking-wider">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-black text-slate-900 font-roboto">{product.price}</td>
                    <td className="px-6 py-5">
                      <span className={`text-sm font-bold ${product.stock === 0 ? 'text-red-500' : product.stock < 15 ? 'text-amber-500' : 'text-slate-600'}`}>
                        {product.stock} units
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-5">
                      <StatusBadge status={product.approval} />
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-50 hover:text-blue-500 transition-all" title="View" aria-label="View product">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-indigo-50 hover:text-indigo-500 transition-all" title="Edit" aria-label="Edit product">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all" title="Delete" aria-label="Delete product">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3 text-slate-300">
                        <Package size={48} className="opacity-20" />
                        <p className="text-sm font-bold uppercase tracking-widest">No products found matching your criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {paginatedProducts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filteredProducts.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Products;
