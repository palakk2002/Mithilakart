import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, Calendar, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAccountStore from '../../../../store/useAccountStore';
import toast from 'react-hot-toast';

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { userProfile, updateProfile } = useAccountStore();
  
  const [formData, setFormData] = useState({ ...userProfile });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (formData.phone.length < 10) newErrors.phone = 'Invalid phone number';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      updateProfile(formData);
      toast.success('Profile Updated Successfully');
      setTimeout(() => navigate(-1), 1500);
    } else {
      toast.error('Please fix the errors');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
        toast.success('Photo updated locally');
      };
      reader.readAsDataURL(file);
    }
  };

  const isQuickShopFlow = localStorage.getItem('isQuickShopFlow') === 'true';
  const isMithilakFlow = localStorage.getItem('isMithilakFlow') === 'true';
  const isFreshGroceryFlow = localStorage.getItem('isFreshGroceryFlow') === 'true';

  const pageBg = isMithilakFlow ? 'bg-gradient-to-b from-[#f3e8ff]/60 via-[#faf5ff] to-[#f5f3ff]' : isFreshGroceryFlow ? 'bg-gradient-to-b from-[#FFF0A0]/25 via-[#FFFDF3] to-[#FFF]' : (isQuickShopFlow ? 'bg-[#fff5f7]' : 'bg-bg-cream');
  const headerBg = isMithilakFlow ? 'bg-gradient-to-r from-[#8b5cf6] to-[#6366f1]' : isFreshGroceryFlow ? 'bg-[#FFF0A0]' : (isQuickShopFlow ? 'bg-gradient-to-r from-[#F26522] to-[#FF8C00]' : 'bg-[#FCF7EE] border-b border-[#F3E3CD]/60');
  const headerTextColor = (isMithilakFlow || isQuickShopFlow) ? 'text-white' : (isFreshGroceryFlow ? 'text-black' : 'text-[#3C2415]');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`${pageBg} min-h-screen text-slate-800 font-sans relative transition-colors duration-300`}
    >
      {/* Global Repeating Mithila Art Page Background Texture */}
      {!(isMithilakFlow || isQuickShopFlow || isFreshGroceryFlow) && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 bg-repeat opacity-[0.03] select-none"
          style={{
            backgroundImage: "url('/Screenshot 2026-07-17 130906.png')",
            backgroundSize: '360px',
          }}
        />
      )}

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Header */}
      <div className={`sticky top-0 z-50 p-4 flex items-center justify-between relative z-10 transition-colors duration-300 ${headerBg}`}>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className={`p-1 rounded-full hover:bg-slate-50 transition-colors ${headerTextColor}`} aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
          <h1 className={`text-[17px] font-black uppercase tracking-widest ${headerTextColor}`}>Edit Profile</h1>
        </div>
        <button onClick={handleSave} className="bg-[#3E5A44] text-white font-black text-xs uppercase tracking-widest px-5 py-2 rounded-xl shadow-sm hover:bg-[#06331b] active:scale-95 transition-all">
          Save
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 w-full space-y-8 relative z-10">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div 
              onClick={() => fileInputRef.current.click()}
              className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center text-[#3E5A44] font-black text-5xl shadow-md border-4 border-white overflow-hidden cursor-pointer active:scale-95 transition-transform"
            >
              {formData.avatar ? (
                <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                formData.name ? formData.name.charAt(0).toUpperCase() : 'H'
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-[#3E5A44] border-2 border-white p-2.5 rounded-full text-white shadow-md hover:bg-[#06331b] transition-all active:scale-90"
            >
              <Camera size={18} />
            </button>
          </div>
          <button 
            onClick={() => fileInputRef.current.click()}
            className="mt-4 text-[10px] font-black text-[#3E5A44] uppercase tracking-[3px] hover:opacity-70 transition-opacity"
          >
            Change Photo
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#3E5A44] uppercase tracking-[3px] ml-1">Full Name</label>
            <div className={`relative ${errors.name ? 'animate-shake' : ''}`}>
              <User size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.name ? 'text-red-500' : 'text-slate-400'}`} />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-slate-200'} rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#3E5A44]/50 transition-all shadow-sm`}
              />
            </div>
            {errors.name && <p className="text-[10px] text-red-500 font-black uppercase tracking-wider ml-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#3E5A44] uppercase tracking-[3px] ml-1">Email Address</label>
            <div className={`relative ${errors.email ? 'animate-shake' : ''}`}>
              <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-500' : 'text-slate-400'}`} />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full bg-white border ${errors.email ? 'border-red-500' : 'border-slate-200'} rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#3E5A44]/50 transition-all shadow-sm`}
              />
            </div>
            {errors.email && <p className="text-[10px] text-red-500 font-black uppercase tracking-wider ml-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[#3E5A44] uppercase tracking-[3px] ml-1">Phone Number</label>
            <div className={`relative ${errors.phone ? 'animate-shake' : ''}`}>
              <Phone size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.phone ? 'text-red-500' : 'text-slate-400'}`} />
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-slate-200'} rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#3E5A44]/50 transition-all shadow-sm`}
              />
            </div>
            {errors.phone && <p className="text-[10px] text-red-500 font-black uppercase tracking-wider ml-1">{errors.phone}</p>}
          </div>

          {/* Gender & DOB Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#3E5A44] uppercase tracking-[3px] ml-1">Gender</label>
              <div className="relative">
                <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#3E5A44]/50 transition-all appearance-none shadow-sm"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#3E5A44] uppercase tracking-[3px] ml-1">Date of Birth</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#3E5A44]/50 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 pb-12">
          <button 
            onClick={handleSave}
            className="w-full bg-[#3E5A44] text-white py-4 rounded-2xl font-black uppercase tracking-[3px] shadow-lg shadow-emerald-100 hover:scale-[1.02] transition-all active:scale-95 group relative overflow-hidden"
          >
            <span className="relative z-10">Save Changes</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default EditProfile;
