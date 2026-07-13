import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Mail, Lock, Truck, MapPin, ArrowRight, ChevronLeft, ShieldCheck, Camera, X } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import useDeliveryStore from '../../../store/useDeliveryStore';

const SectionTitle = ({ title }) => (
  <div className="border-b border-[#c6e9d0] pb-1.5 mb-4 mt-6">
    <h3 className="text-[10px] font-extrabold text-[#3b8a53] uppercase tracking-wider">{title}</h3>
  </div>
);

const InputField = ({ label, name, type = "text", placeholder, required = false, value, onChange }) => (
  <div className="flex-grow min-w-[200px]">
    <label className="text-[11px] font-bold text-[#1f592c] mb-1 block">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] px-4 py-2.5 text-[13px] font-semibold text-[#0a4a17] placeholder-[#81b29a] focus:outline-none transition-all shadow-inner"
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
    <div className="flex-grow min-w-[200px]">
      <label className="text-[11px] font-bold text-[#1f592c] mb-1 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="w-full bg-[#e8fced] border-2 border-dashed border-[#a5dcb5] rounded-[16px] p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-[#e8fced]/80 transition-colors relative min-h-[70px] overflow-hidden shadow-inner"
      >
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden" 
          accept="image/*"
        />
        {value ? (
          <div className="absolute inset-0 bg-[#e8fced] flex items-center justify-between px-4">
            <span className="text-xs font-bold text-[#0a4a17] truncate max-w-[80%]">Uploaded Successfully</span>
            <X size={16} className="text-red-500 cursor-pointer" onClick={(e) => {
              e.stopPropagation();
              onChange(null);
            }} />
          </div>
        ) : (
          <>
            <Camera size={20} className="text-[#3b8a53]" />
            <span className="text-[11px] font-bold text-[#3b8a53] uppercase tracking-wider">Choose File</span>
          </>
        )}
      </div>
    </div>
  );
};

const DeliverySignup = () => {
  const navigate = useNavigate();
  const addDeliveryPartner = useDeliveryStore((state) => state.addDeliveryPartner);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    altMobile: '',
    email: '',
    dob: '',
    age: '',
    fathersName: '',
    currAddress: '',
    permAddress: '',
    city: '',
    state: '',
    pinCode: '',
    emergencyContact: '',
    aadhaar: '',
    pan: '',
    profilePhoto: null,
    idCard: null,
    educationMarksheet: null,
    policeVerification: 'No',
    vehicleType: '',
    vehicleNumber: '',
    licenseNumber: '',
    rcNumber: '',
    insuranceNumber: '',
    insuranceExpiry: '',
    drivingLicenseDoc: null,
    bankName: '',
    accHolder: '',
    accNumber: '',
    ifsc: '',
    branch: '',
    upiId: '',
    applicantSignature: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDocChange = (field, base64) => {
    setFormData(prev => ({ ...prev, [field]: base64 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addDeliveryPartner(formData);
      toast.success('Registration request submitted successfully!');
      navigate('/delivery/auth');
    }, 2000);
  };

  // Inline SVG pattern for background
  const backgroundPattern = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M10 20c2-3 5-5 8-5s6 2 8 5-2 8-5 8-6-2-8-5zm30 20c2-3 5-5 8-5s6 2 8 5-2 8-5 8-6-2-8-5zM25 45c1-2 3-3 5-3s4 1 5 3-1 4-3 4-4-1-5-3zM45 15c1-2 3-3 5-3s4 1 5 3-1 4-3 4-4-1-5-3z" fill="%23ffffff" fill-opacity="0.12" fill-rule="evenodd"/></svg>`;

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-between p-4 md:p-6 bg-gradient-to-br from-[#77eba3] to-[#42c585] relative overflow-hidden"
      style={{ backgroundImage: `radial-gradient(circle at 20% 30%, #77eba3 0%, #42c585 100%), url('${backgroundPattern}')` }}
    >
      {/* Background organic elements */}
      <div className="absolute top-10 left-10 opacity-20 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0C35 25 15 35 0 50C15 65 35 75 50 100C65 75 85 65 100 50C85 35 65 25 50 0Z" fill="white" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 opacity-15 pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 80C40 80 60 60 80 20C60 20 40 40 20 80Z" fill="white" />
          <circle cx="50" cy="50" r="10" fill="white" />
        </svg>
      </div>

      {/* Top Header Row */}
      <div className="w-full max-w-[460px] flex items-center justify-between z-10">
        <button 
          onClick={() => navigate(-1)}
          className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-md active:scale-95 transition-all"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </button>
        <span className="text-white font-bold tracking-wider text-sm">DELIVERY PARTNER</span>
        <div className="w-9"></div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-[460px] bg-[#f2fff5] rounded-[32px] px-6 py-8 shadow-2xl border border-white/40 z-10 my-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-[#0a4a17]">
            Sign Up
          </h2>
          <p className="text-[#3b8a53] text-[13px] font-semibold mt-1">
            Complete details to join the delivery network
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* 1. PERSONAL DETAILS */}
          <SectionTitle title="Personal Details" />
          <div className="space-y-3.5">
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
          <div className="space-y-3.5">
            <InputField label="Aadhaar Number" name="aadhaar" placeholder="12 digits" required value={formData.aadhaar} onChange={handleChange} />
            <InputField label="PAN Number" name="pan" placeholder="10 digits" required value={formData.pan} onChange={handleChange} />
            <FileUpload label="Photo" required value={formData.profilePhoto} onChange={(val) => handleDocChange('profilePhoto', val)} />
            <FileUpload label="ID Card" required value={formData.idCard} onChange={(val) => handleDocChange('idCard', val)} />
            <FileUpload label="Higher Education Marksheet" required value={formData.educationMarksheet} onChange={(val) => handleDocChange('educationMarksheet', val)} />
            
            <div className="flex items-center gap-4 py-1">
              <span className="text-[11px] font-bold text-[#1f592c] uppercase">Police Verification:</span>
              <div className="flex items-center gap-3">
                {['Yes', 'No'].map(val => (
                  <label key={val} className="flex items-center gap-1.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="policeVerification" 
                      value={val} 
                      checked={formData.policeVerification === val}
                      onChange={handleChange}
                      className="accent-[#0c5c20] w-3.5 h-3.5"
                    />
                    <span className="text-[12px] font-bold text-[#0a4a17]">{val}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 3. VEHICLE DETAILS */}
          <SectionTitle title="Vehicle Details" />
          <div className="space-y-3.5">
            <div className="flex-1">
              <label className="text-[11px] font-bold text-[#1f592c] mb-1 block">Vehicle Type</label>
              <select 
                name="vehicleType" 
                value={formData.vehicleType} 
                onChange={handleChange} 
                className="w-full bg-[#e8fced] border-2 border-transparent focus:border-[#42c585] rounded-[16px] px-4 py-2.5 text-[13px] font-semibold text-[#0a4a17] outline-none"
              >
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
          <div className="space-y-3.5">
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
            className="w-full bg-[#0c5c20] hover:bg-[#073f15] text-white py-4 rounded-[16px] text-[15px] font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'Submit Application'
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-[12px] font-bold text-[#3b8a53]">
          Already registered?{' '}
          <button type="button" onClick={() => navigate('/delivery/auth')} className="text-[#0a4a17] hover:underline">
            Login
          </button>
        </div>
      </div>

      {/* Footer Logo & Styling */}
      <div className="flex flex-col items-center gap-1 my-4 z-10">
        <img 
          src="/mthibg.png" 
          alt="Mithilakart" 
          className="h-10 w-auto object-contain"
        />
        <div className="flex items-center text-[18px] font-bold text-white tracking-wide italic">
          <span className="opacity-90">Mithila</span><span className="text-[#073f15]">kart</span>
        </div>
      </div>
    </div>
  );
};

export default DeliverySignup;
