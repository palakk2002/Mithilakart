import SearchInput from '../../../shared/components/SearchInput';
import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2,
  Package, Grid, Filter,
  CheckCircle2, XCircle, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MARKETPLACE_TABS_LIST } from '../../../shared/constants/marketplace';

const CategoryManager = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Electronics', slug: 'electronics', count: 124, status: 'Active', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop', visibleTabs: ['quick_shop'], subcategories: [{ id: 1, name: 'Mobiles', visibleTabs: ['quick_shop'] }, { id: 2, name: 'Laptops', visibleTabs: ['quick_shop'] }] },
    { id: 2, name: 'Fashion', slug: 'fashion', count: 856, status: 'Active', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop', visibleTabs: ['mithilakart', 'mithilak'], subcategories: [{ id: 3, name: 'Men', visibleTabs: ['mithilakart', 'mithilak'] }, { id: 4, name: 'Women', visibleTabs: ['mithilakart', 'mithilak'] }] },
    { id: 3, name: 'Home & Kitchen', slug: 'home-kitchen', count: 432, status: 'Active', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&h=400&fit=crop', visibleTabs: ['mithilakart'], subcategories: [{ id: 5, name: 'Furniture', visibleTabs: ['mithilakart'] }] },
    { id: 4, name: 'Beauty', slug: 'beauty', count: 215, status: 'Active', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop', visibleTabs: ['quick_shop'], subcategories: [{ id: 6, name: 'Makeup', visibleTabs: ['quick_shop'] }] },
    { id: 5, name: 'Toys', slug: 'toys', count: 167, status: 'Draft', image: 'https://images.unsplash.com/photo-1532330393533-443990a51d10?w=400&h=400&fit=crop', visibleTabs: [], subcategories: [] },
    { id: 6, name: 'Stationery', slug: 'stationery', count: 0, status: 'Inactive', image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?w=400&h=400&fit=crop', visibleTabs: [], subcategories: [] },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  // Category Modal Form State
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catStatus, setCatStatus] = useState('Active');
  const [catImage, setCatImage] = useState('');
  const [catVisibleTabs, setCatVisibleTabs] = useState([]);
  const [catSubcategories, setCatSubcategories] = useState([]);

  // Subcategory Form State (Inline editor inside Category form)
  const [newSubName, setNewSubName] = useState('');
  const [newSubVisibleTabs, setNewSubVisibleTabs] = useState([]);
  const [editingSubIndex, setEditingSubIndex] = useState(null);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingCategory(null);
    setCatName('');
    setCatSlug('');
    setCatStatus('Active');
    setCatImage('');
    setCatVisibleTabs([]);
    setCatSubcategories([]);
    setNewSubName('');
    setNewSubVisibleTabs([]);
    setEditingSubIndex(null);
    setIsAddModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setCatName(category.name);
    setCatSlug(category.slug);
    setCatStatus(category.status);
    setCatImage(category.image);
    setCatVisibleTabs(category.visibleTabs || []);
    setCatSubcategories(category.subcategories || []);
    setNewSubName('');
    setNewSubVisibleTabs([]);
    setEditingSubIndex(null);
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex justify-between items-center max-w-5xl">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight font-montserrat uppercase">Category Manager</h1>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 font-raleway">Manage platform hierarchy</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 transition-all"
        >
          <Plus size={14} />
          New Category
        </button>
      </div>

      {/* Stats Quick View - More Compact Width */}
      <div className="grid grid-cols-3 gap-4 max-w-3xl">
        {[
          { label: 'Total', value: categories.length, icon: Grid, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Active', value: categories.filter(c => c.status === 'Active').length, icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Drafts', value: categories.filter(c => c.status !== 'Active').length, icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className={`w-9 h-9 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shadow-inner`}>
              <stat.icon size={18} />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
              <p className="text-lg font-black text-slate-900 font-roboto leading-none">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search & Filters - Compact Width */}
      <div className="flex gap-3 items-center max-w-xl">
        <div className="flex-1">
          <SearchInput 
            type="text" 
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-900 transition-all shadow-sm">
          <Filter size={14} />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        <AnimatePresence>
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.02 }}
              className="group bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col"
            >
              <div className="relative h-20 overflow-hidden bg-slate-50">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-widest shadow-sm ${
                    category.status === 'Active' ? 'bg-green-500 text-white' : 
                    category.status === 'Draft' ? 'bg-amber-500 text-white' : 'bg-slate-400 text-white'
                  }`}>
                    {category.status}
                  </span>
                </div>
              </div>
              
              <div className="p-3 flex-1 flex flex-col gap-2.5">
                <div>
                  <h3 className="text-[12px] font-bold text-slate-900 uppercase tracking-tight font-montserrat line-clamp-1 leading-tight">{category.name}</h3>
                  <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5 font-roboto leading-none">/{category.slug}</p>
                </div>

                <div className="flex items-center gap-1.5">
                  <Package size={10} className="text-blue-500" />
                  <span className="text-[9px] font-bold text-slate-500 font-raleway leading-none">{category.count} Products</span>
                </div>

                <div className="pt-2 border-t border-slate-50 flex gap-1.5">
                  <button 
                    onClick={() => openEditModal(category)}
                    className="flex-1 py-1.5 bg-slate-50 text-slate-700 rounded-lg text-[8px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all flex items-center justify-center gap-1"
                  >
                    <Edit2 size={10} />
                    Manage
                  </button>
                  <button 
                    onClick={() => setCategories(categories.filter(c => c.id !== category.id))}
                    className="p-1.5 bg-slate-50 text-slate-400 rounded-lg hover:bg-red-50 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Category Card - Also Compact */}
        <button 
          onClick={openAddModal}
          className="group border-2 border-dashed border-slate-100 rounded-xl flex flex-col items-center justify-center p-4 gap-2 hover:border-blue-500 hover:bg-blue-50/20 transition-all min-h-[160px]"
        >
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-300 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm">
            <Plus size={20} />
          </div>
          <div className="text-center">
            <p className="text-[9px] font-black text-slate-400 group-hover:text-blue-600 uppercase tracking-widest font-montserrat">New Category</p>
          </div>
        </button>
      </div>

      {/* Add / Edit Category & Subcategory Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight font-montserrat uppercase">
                    {editingCategory ? 'Edit Category' : 'Add Category'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5 font-raleway">
                    Configure visibility and metadata
                  </p>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1.5 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-lg transition-colors"
                >
                  <XCircle size={16} />
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Category Name *</label>
                  <input
                    value={catName}
                    onChange={(e) => {
                      setCatName(e.target.value);
                      if (!editingCategory) setCatSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                    }}
                    placeholder="e.g. Electronics"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[12px] font-bold outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Slug</label>
                  <input
                    value={catSlug}
                    onChange={(e) => setCatSlug(e.target.value)}
                    placeholder="e.g. electronics"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[12px] font-bold outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Image URL</label>
                  <input
                    value={catImage}
                    onChange={(e) => setCatImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[12px] font-bold outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Status</label>
                  <select
                    value={catStatus}
                    onChange={(e) => setCatStatus(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3 py-2 text-[12px] font-bold outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Checkbox Group for Category Visible Tabs */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-montserrat">
                  Visible Tabs (Category)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {MARKETPLACE_TABS_LIST.map((tab) => (
                    <label key={tab.id} className="flex items-center gap-2 cursor-pointer p-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={catVisibleTabs.includes(tab.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setCatVisibleTabs([...catVisibleTabs, tab.id]);
                          } else {
                            setCatVisibleTabs(catVisibleTabs.filter((t) => t !== tab.id));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-[11px] font-bold text-slate-700">{tab.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Subcategories Section */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block font-montserrat">
                    Manage Subcategories
                  </label>
                </div>

                {/* Subcategory Add/Edit Inputs inline */}
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-3">
                  <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">
                    {editingSubIndex !== null ? 'Edit Subcategory' : 'Add Subcategory'}
                  </p>
                  <div className="flex gap-2">
                    <input
                      value={newSubName}
                      onChange={(e) => setNewSubName(e.target.value)}
                      placeholder="e.g. Mobiles"
                      className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-[12px] font-bold outline-none focus:ring-2 focus:ring-blue-200 bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (!newSubName.trim()) return;
                        if (editingSubIndex !== null) {
                          const updated = [...catSubcategories];
                          updated[editingSubIndex] = {
                            ...updated[editingSubIndex],
                            name: newSubName.trim(),
                            visibleTabs: newSubVisibleTabs,
                          };
                          setCatSubcategories(updated);
                          setEditingSubIndex(null);
                        } else {
                          setCatSubcategories([
                            ...catSubcategories,
                            {
                              id: Date.now(),
                              name: newSubName.trim(),
                              visibleTabs: newSubVisibleTabs,
                            },
                          ]);
                        }
                        setNewSubName('');
                        setNewSubVisibleTabs([]);
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                    >
                      {editingSubIndex !== null ? 'Update' : 'Add'}
                    </button>
                    {editingSubIndex !== null && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingSubIndex(null);
                          setNewSubName('');
                          setNewSubVisibleTabs([]);
                        }}
                        className="px-3 py-2 bg-slate-200 text-slate-700 rounded-lg text-[10px] font-black uppercase"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

                  {/* Subcategory Visible Tabs Checkboxes */}
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest block">
                      Subcategory Visible Tabs
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {MARKETPLACE_TABS_LIST.map((tab) => (
                        <label key={tab.id} className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newSubVisibleTabs.includes(tab.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewSubVisibleTabs([...newSubVisibleTabs, tab.id]);
                              } else {
                                setNewSubVisibleTabs(newSubVisibleTabs.filter((t) => t !== tab.id));
                              }
                            }}
                            className="w-3.5 h-3.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-[10px] font-bold text-slate-600">{tab.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Subcategories List */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {catSubcategories.length === 0 ? (
                    <p className="text-center text-[10px] text-slate-400 py-3 uppercase tracking-wider font-medium">
                      No subcategories added yet
                    </p>
                  ) : (
                    catSubcategories.map((sub, index) => (
                      <div key={index} className="flex items-center justify-between p-2.5 bg-slate-50/50 border border-slate-100 rounded-xl">
                        <div>
                          <p className="text-[12px] font-bold text-slate-800 leading-tight">{sub.name}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5 font-bold uppercase tracking-wider">
                            Tabs: {sub.visibleTabs.length > 0 ? sub.visibleTabs.join(', ') : 'None'}
                          </p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingSubIndex(index);
                              setNewSubName(sub.name);
                              setNewSubVisibleTabs(sub.visibleTabs || []);
                            }}
                            className="p-1 bg-white border border-slate-200 rounded text-slate-500 hover:text-blue-500 hover:border-blue-200 transition-colors"
                          >
                            <Edit2 size={10} />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCatSubcategories(catSubcategories.filter((_, i) => i !== index));
                            }}
                            className="p-1 bg-white border border-slate-200 rounded text-slate-400 hover:text-red-500 hover:border-red-200 transition-colors"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!catName.trim()) return;
                    if (editingCategory) {
                      setCategories(categories.map(c => c.id === editingCategory.id ? {
                        ...c,
                        name: catName,
                        slug: catSlug,
                        status: catStatus,
                        image: catImage || 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
                        visibleTabs: catVisibleTabs,
                        subcategories: catSubcategories,
                      } : c));
                    } else {
                      setCategories([
                        ...categories,
                        {
                          id: Date.now(),
                          name: catName,
                          slug: catSlug,
                          status: catStatus,
                          count: 0,
                          image: catImage || 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop',
                          visibleTabs: catVisibleTabs,
                          subcategories: catSubcategories,
                        }
                      ]);
                    }
                    setIsAddModalOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                >
                  Save Category
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryManager;
