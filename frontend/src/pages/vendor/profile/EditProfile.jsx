import React, { useState, useRef } from 'react';
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, Calendar, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAccountStore from '../../../store/useAccountStore';
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

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-[var(--card-bg)] min-h-screen text-[var(--card-text)]"
    >
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--card-bg)]/90 backdrop-blur-md border-b border-[var(--card-border)] p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="hover:text-[var(--color-gold)] transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-black uppercase tracking-widest">Edit Profile</h1>
        </div>
        <button onClick={handleSave} className="text-[var(--color-gold)] font-black text-xs uppercase tracking-widest bg-[var(--color-gold)]/10 px-4 py-2 rounded-lg border border-[var(--color-gold)]/30">
          Save
        </button>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative group">
            <div 
              onClick={() => fileInputRef.current.click()}
              className="w-32 h-32 bg-[var(--color-gold)] rounded-full flex items-center justify-center text-black font-black text-5xl shadow-[0_0_40px_rgba(226,167,80,0.3)] border-4 border-black overflow-hidden cursor-pointer active:scale-95 transition-transform"
            >
              {formData.avatar ? (
                <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                formData.name.charAt(0)
              )}
            </div>
            <button 
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-black border border-[var(--color-gold)] p-2 rounded-full text-[var(--color-gold)] shadow-lg hover:bg-[var(--color-gold)] hover:text-black transition-all active:scale-90"
            >
              <Camera size={20} />
            </button>
          </div>
          <button 
            onClick={() => fileInputRef.current.click()}
            className="mt-4 text-[10px] font-black text-[var(--color-gold)] uppercase tracking-[3px] hover:opacity-70 transition-opacity"
          >
            Change Photo
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--color-gold)] uppercase tracking-[3px] ml-1">Full Name</label>
            <div className={`relative ${errors.name ? 'animate-shake' : ''}`}>
              <User size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.name ? 'text-red-500' : 'text-[var(--card-sub)]'}`} />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={`w-full bg-black/20 border ${errors.name ? 'border-red-500' : 'border-[var(--card-border)]'} rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-[var(--color-gold)]/50 transition-all`}
              />
            </div>
            {errors.name && <p className="text-[10px] text-red-500 font-black uppercase tracking-wider ml-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--color-gold)] uppercase tracking-[3px] ml-1">Email Address</label>
            <div className={`relative ${errors.email ? 'animate-shake' : ''}`}>
              <Mail size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.email ? 'text-red-500' : 'text-[var(--card-sub)]'}`} />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={`w-full bg-black/20 border ${errors.email ? 'border-red-500' : 'border-[var(--card-border)]'} rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-[var(--color-gold)]/50 transition-all`}
              />
            </div>
            {errors.email && <p className="text-[10px] text-red-500 font-black uppercase tracking-wider ml-1">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-[var(--color-gold)] uppercase tracking-[3px] ml-1">Phone Number</label>
            <div className={`relative ${errors.phone ? 'animate-shake' : ''}`}>
              <Phone size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 ${errors.phone ? 'text-red-500' : 'text-[var(--card-sub)]'}`} />
              <input 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className={`w-full bg-black/20 border ${errors.phone ? 'border-red-500' : 'border-[var(--card-border)]'} rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-[var(--color-gold)]/50 transition-all`}
              />
            </div>
            {errors.phone && <p className="text-[10px] text-red-500 font-black uppercase tracking-wider ml-1">{errors.phone}</p>}
          </div>

          {/* Gender & DOB Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--color-gold)] uppercase tracking-[3px] ml-1">Gender</label>
              <div className="relative">
                <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--card-sub)]" />
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full bg-black/20 border border-[var(--card-border)] rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:outline-none focus:border-[var(--color-gold)]/50 transition-all appearance-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[var(--color-gold)] uppercase tracking-[3px] ml-1">Date of Birth</label>
              <div className="relative">
                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--card-sub)]" />
                <input 
                  type="date" 
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                  className="w-full bg-black/20 border border-[var(--card-border)] rounded-2xl py-4 pl-12 pr-4 text-[10px] font-bold focus:outline-none focus:border-[var(--color-gold)]/50 transition-all [color-scheme:dark]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 pb-12">
          <button 
            onClick={handleSave}
            className="w-full bg-[var(--color-gold)] text-black py-4 rounded-2xl font-black uppercase tracking-[3px] shadow-[0_10px_20px_rgba(226,167,80,0.2)] hover:scale-[1.02] transition-all active:scale-95 group relative overflow-hidden"
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
