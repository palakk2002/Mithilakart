import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, Truck, MapPin, ArrowRight, ChevronLeft, ShieldCheck, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import useDeliveryStore from '../../store/useDeliveryStore';

const SectionTitle = ({ title }) => (
  <div className="border-b border-slate-100 pb-1 mb-3 mt-6">
    <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[2px]">{title}</h3>
  </div>
);

const InputField = ({ label, name, type = "text", placeholder, required = false, value, onChange }) => (
  <div className="flex-1 min-w-[130px]">
    <label className="text-[9px] font-bold text-slate-500 mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-[13px] font-bold text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition-all placeholder:text-slate-300"
    />
  </div>
);

const FileUpload = ({ label, required = false, value, onChange }) => {
  const fileInputRef = React.useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-1 min-w-[130px]">
      <label className="text-[9px] font-bold text-slate-500 mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-lg p-3 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-slate-100 transition-colors relative min-h-[60px] overflow-hidden"
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" 
          accept="image/*"
        />
        {value ? (
          <img src={value} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-md" />
        ) : (
          <>
            <Camera size={14} className="text-slate-400" />
            <span className="text-[9px] font-black text-slate-400 uppercase">Upload</span>
          </>
        )}
      </div>
    </div>
  );
};

const DeliverySignup = () => {
  const navigate = useNavigate();
  const updateProfile = useDeliveryStore(state => state.updateProfile);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    // Personal
    fullName: '', mobile: '', altMobile: '', email: '', dob: '', age: '', fathersName: '',
    currAddress: '', permAddress: '', city: '', state: '', pinCode: '', emergencyContact: '',
    // Identity
    aadhaar: '', pan: '', policeVerification: 'No',
    // Vehicle
    vehicleType: '', vehicleNumber: '', licenseNumber: '', rcNumber: '', insuranceNumber: '', insuranceExpiry: '',
    // Bank
    bankName: '', accHolder: '', accNumber: '', ifsc: '', branch: '', upiId: '',
    // Documents
    profilePhoto: null, idCard: null, educationMarksheet: null, drivingLicenseDoc: null, applicantSignature: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDocChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      updateProfile(formData);
      toast.success('Application submitted successfully!');
      navigate('/delivery/auth');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-nunito max-w-md mx-auto relative pb-8">
      {/* Header */}
      <div className="px-6 pt-6 pb-2 relative flex flex-col items-center text-center">
        <button 
          onClick={() => navigate(-1)} 
          className="absolute left-4 top-6 p-2 text-slate-400 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div className="mb-3">
          <img src="/Logo (4).png" alt="Cocia Logo" className="h-16 object-contain" />
        </div>
        
        <h1 className="text-xl font-black text-slate-900 tracking-tight font-montserrat uppercase leading-tight">
          Sign Up
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-0.5">Complete profile to join the network</p>
      </div>

      <form onSubmit={handleSubmit} className="px-6 pb-16">
        {/* 1. PERSONAL DETAILS */}
        <SectionTitle title="Personal Details" />
        <div className="space-y-3">
          <InputField label="Full Name" name="fullName" placeholder="Full name" required value={formData.fullName} onChange={handleChange} />
          <InputField label="Mobile Number" name="mobile" type="tel" placeholder="Mobile" required value={formData.mobile} onChange={handleChange} />
          <InputField label="Alt Mobile" name="altMobile" type="tel" placeholder="Optional" value={formData.altMobile} onChange={handleChange} />
          <InputField label="Email ID" name="email" type="email" placeholder="Email" required value={formData.email} onChange={handleChange} />
          <InputField label="Date of Birth" name="dob" type="date" required value={formData.dob} onChange={handleChange} />
          <InputField label="Age" name="age" type="number" placeholder="Age" value={formData.age} onChange={handleChange} />
          <InputField label="Father's Name" name="fathersName" placeholder="Father's name" value={formData.fathersName} onChange={handleChange} />
          <InputField label="Current Address" name="currAddress" placeholder="Full address" required value={formData.currAddress} onChange={handleChange} />
          <InputField label="Permanent Address" name="permAddress" placeholder="Permanent address" value={formData.permAddress} onChange={handleChange} />
          <InputField label="City" name="city" placeholder="City" required value={formData.city} onChange={handleChange} />
          <InputField label="State" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
          <InputField label="PIN Code" name="pinCode" placeholder="PIN" required value={formData.pinCode} onChange={handleChange} />
          <InputField label="Emergency Contact" name="emergencyContact" type="tel" placeholder="Emergency #" value={formData.emergencyContact} onChange={handleChange} />
        </div>

        {/* 2. IDENTITY DETAILS */}
        <SectionTitle title="Identity Details" />
        <div className="space-y-3">
          <InputField label="Aadhaar Number" name="aadhaar" placeholder="12 digits" required value={formData.aadhaar} onChange={handleChange} />
          <InputField label="PAN Number" name="pan" placeholder="10 digits" required value={formData.pan} onChange={handleChange} />
          <FileUpload label="Photo" required value={formData.profilePhoto} onChange={(val) => handleDocChange('profilePhoto', val)} />
          <FileUpload label="ID Card" required value={formData.idCard} onChange={(val) => handleDocChange('idCard', val)} />
          <FileUpload label="Higher Education Marksheet" required value={formData.educationMarksheet} onChange={(val) => handleDocChange('educationMarksheet', val)} />
          <div className="flex items-center gap-4 py-1">
            <span className="text-[9px] font-bold text-slate-500 uppercase">Police Verification:</span>
            <div className="flex items-center gap-3">
              {['Yes', 'No'].map(val => (
                <label key={val} className="flex items-center gap-1.5 cursor-pointer">
                  <input 
                    type="radio" 
                    name="policeVerification" 
                    value={val} 
                    checked={formData.policeVerification === val}
                    onChange={handleChange}
                    className="accent-blue-600 w-3 h-3"
                  />
                  <span className="text-[11px] font-bold text-slate-700">{val}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* 3. VEHICLE DETAILS */}
        <SectionTitle title="Vehicle Details" />
        <div className="space-y-3">
          <div className="flex-1">
            <label className="text-[9px] font-bold text-slate-500 mb-1 block">Vehicle Type</label>
            <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-[13px] font-bold text-slate-800 outline-none">
              <option value="">Select</option>
              <option value="Bike">Bike</option>
              <option value="E-Bike">Electric</option>
              <option value="Cycle">Cycle</option>
            </select>
          </div>
          <InputField label="Vehicle Number" name="vehicleNumber" placeholder="DL 01 ..." value={formData.vehicleNumber} onChange={handleChange} />
          <InputField label="DL Number" name="licenseNumber" placeholder="DL Number" value={formData.licenseNumber} onChange={handleChange} />
          <InputField label="RC Number" name="rcNumber" placeholder="RC Number" value={formData.rcNumber} onChange={handleChange} />
          <InputField label="Insurance #" name="insuranceNumber" placeholder="Insurance #" value={formData.insuranceNumber} onChange={handleChange} />
          <InputField label="Valid Till" name="insuranceExpiry" type="date" value={formData.insuranceExpiry} onChange={handleChange} />
          <FileUpload label="Upload DL" required value={formData.drivingLicenseDoc} onChange={(val) => handleDocChange('drivingLicenseDoc', val)} />
        </div>

        {/* 4. BANK DETAILS */}
        <SectionTitle title="Bank Details" />
        <div className="space-y-3">
          <InputField label="Bank Name" name="bankName" placeholder="Bank" required value={formData.bankName} onChange={handleChange} />
          <InputField label="Holder Name" name="accHolder" placeholder="Name" required value={formData.accHolder} onChange={handleChange} />
          <InputField label="Acc Number" name="accNumber" placeholder="Number" required value={formData.accNumber} onChange={handleChange} />
          <InputField label="IFSC Code" name="ifsc" placeholder="IFSC" required value={formData.ifsc} onChange={handleChange} />
          <InputField label="Branch" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} />
          <InputField label="UPI ID" name="upiId" placeholder="upi@bank" value={formData.upiId} onChange={handleChange} />
        </div>

        {/* 5. VERIFICATION */}
        <SectionTitle title="Verification" />
        <FileUpload label="Applicant Signature" required value={formData.applicantSignature} onChange={(val) => handleDocChange('applicantSignature', val)} />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#084224] hover:bg-blue-700 text-white py-3.5 rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-8 disabled:opacity-60"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>Submit Application</>
          )}
        </button>

        <p className="text-center text-xs font-bold text-slate-400 pt-5">
          Already registered? <button type="button" onClick={() => navigate('/delivery/auth')} className="text-blue-600">Login</button>
        </p>
      </form>

      <p className="text-center text-[9px] text-slate-300 font-bold uppercase tracking-[4px] p-6">
        Cocia Partner Network
      </p>
    </div>
  );
};

export default DeliverySignup;

