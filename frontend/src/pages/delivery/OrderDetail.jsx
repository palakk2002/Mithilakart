import { 
  ArrowLeft, MapPin, Phone, CheckCircle2, Navigation, 
  ShieldCheck, AlertCircle, ArrowRight, Camera, PenTool, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const MOCK_ORDER = {
  id: 'OD87463', customer: 'Rahul Sharma', phone: '+91 98765 43210',
  address: 'Flat 4B, Emerald Apartments, Sector 15, Noida, UP - 201301',
  lat: 28.5355, lng: 77.3910,
  pickupAddress: 'FreshMart, Shop 12, Sector 15 Market, Noida',
  pickupLat: 28.5400, pickupLng: 77.3890,
  items: 3, earning: 48, otp: '7843', status: 'in_transit',
};

const STATUS_STEPS = [
  { key: 'accepted', label: 'Accepted', desc: 'Head to vendor' },
  { key: 'at_pickup', label: 'Pickup', desc: 'Collect package' },
  { key: 'in_transit', label: 'Transit', desc: 'On the way' },
  { key: 'delivered', label: 'Done', desc: 'Delivered' },
];

const SignaturePad = ({ onSave }) => {
  const canvasRef = React.useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    onSave(canvasRef.current.toDataURL());
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onSave(null);
  };

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  }, []);

  return (
    <div className="relative w-full bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 h-40 overflow-hidden">
      <canvas
        ref={canvasRef}
        width={400}
        height={160}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="w-full h-full touch-none cursor-crosshair"
      />
      <button onClick={clear} className="absolute top-2 right-2 p-2 bg-white/80 rounded-lg text-red-500 shadow-sm">
        <Trash2 size={14} />
      </button>
      <div className="absolute bottom-2 left-0 right-0 text-center pointer-events-none">
        <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Sign inside the box</p>
      </div>
    </div>
  );
};

const CameraSimulation = ({ onCapture, onClose }) => {
  const [flashing, setFlashing] = useState(false);
  
  const capture = () => {
    setFlashing(true);
    setTimeout(() => {
      onCapture('https://images.unsplash.com/photo-1539186607619-df476afe3ff1?auto=format&fit=crop&q=80&w=400');
      setFlashing(false);
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black flex flex-col">
      <div className="p-6 flex items-center justify-between text-white">
        <button onClick={onClose}><ArrowLeft size={24} /></button>
        <span className="text-sm font-black uppercase tracking-widest">Package Proof</span>
        <div className="w-6" />
      </div>
      
      <div className="flex-1 bg-slate-900 relative flex items-center justify-center overflow-hidden">
         <div className="absolute inset-10 border-2 border-white/20 rounded-3xl" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/10 rounded-full" />
         <Package size={80} className="text-white/10" />
         
         <AnimatePresence>
           {flashing && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 bg-white z-50"
             />
           )}
         </AnimatePresence>
      </div>

      <div className="p-12 flex items-center justify-center bg-black">
         <button 
           onClick={capture}
           className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1 active:scale-90 transition-transform"
         >
            <div className="w-full h-full bg-white rounded-full" />
         </button>
      </div>
      
      <div className="pb-8 text-center bg-black">
        <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Center the package in the frame</p>
      </div>
    </div>
  );
};

const DeliveryOrderDetail = () => {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState('accepted');
  const [otpInput, setOtpInput] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [delivered, setDelivered] = useState(false);
  
  // Proof states
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const statusIndex = STATUS_STEPS.findIndex(s => s.key === currentStatus);

  const handleNextStep = () => {
    if (statusIndex === 0) setCurrentStatus('at_pickup');
    else if (statusIndex === 1) setCurrentStatus('in_transit');
  };

  const handleVerifyOTP = () => {
    if (otpInput === MOCK_ORDER.otp) {
      setOtpVerified(true);
      setTimeout(() => {
        handleMarkDelivered();
      }, 1500);
    } else {
      toast.error('Incorrect OTP. Please check with customer.');
    }
  };

  const handleMarkDelivered = () => {
    setCurrentStatus('delivered');
    setDelivered(true);
  };

  const getPrimaryButtonLabel = () => {
    if (statusIndex === 0) return 'Arrived at Pickup';
    if (statusIndex === 1) return 'Package Picked Up';
    if (statusIndex === 2) return 'Arrived at Customer';
    return 'Completed';
  };

  if (delivered) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-28 h-28 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-100 border-8 border-green-50">
            <CheckCircle2 size={56} className="text-white" strokeWidth={2.5} />
          </div>
        </motion.div>

        <h2 className="text-2xl font-black text-slate-900 mb-2">Delivery Successful!</h2>
        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Order #{MOCK_ORDER.id}</p>
        
        <div className="mt-8 grid grid-cols-2 gap-3 w-full">
           <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[8px] font-black text-slate-400 uppercase mb-2">Package Photo</p>
              <img src={capturedPhoto} className="w-full h-20 object-cover rounded-lg" alt="Proof" />
           </div>
           <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="text-[8px] font-black text-slate-400 uppercase mb-2">Customer Sign</p>
              <img src={signature} className="w-full h-20 object-contain rounded-lg bg-white" alt="Sign" />
           </div>
        </div>

        <div className="mt-4 p-5 bg-slate-900 rounded-2xl w-full">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Earnings</p>
           <p className="text-3xl font-black text-white">₹{MOCK_ORDER.earning}.00</p>
        </div>

        <button onClick={() => navigate('/delivery/orders')}
          className="mt-8 w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-100 active:scale-95 transition-all">
          Finish Run
        </button>
      </div>
    );
  }

  return (
    <div className="pb-40 bg-[#f8fafc] min-h-screen">
      <AnimatePresence>
        {showCamera && (
          <CameraSimulation 
            onCapture={(img) => { setCapturedPhoto(img); setShowCamera(false); }} 
            onClose={() => setShowCamera(false)} 
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-40 px-4 py-4 border-b border-slate-100 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2.5 bg-slate-100 rounded-xl text-slate-700"><ArrowLeft size={20} /></button>
        <div className="flex-1">
          <h1 className="text-sm font-black text-slate-900">Order #{MOCK_ORDER.id}</h1>
          <div className="flex items-center gap-1.5 mt-0.5">
             <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
             <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest">{currentStatus.replace('_', ' ')}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Status Timeline */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-50 flex items-center justify-between">
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trip Status</h3>
             <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">Step {statusIndex + 1}/4</span>
          </div>
          <div className="p-5 flex justify-between relative px-10">
            <div className="absolute top-[34px] left-12 right-12 h-0.5 bg-slate-100" />
            <motion.div initial={{ width: 0 }} animate={{ width: `${(statusIndex / (STATUS_STEPS.length - 1)) * 100}%` }} className="absolute top-[34px] left-12 right-12 h-0.5 bg-blue-600 origin-left" />
            {STATUS_STEPS.map((step, i) => (
              <div key={step.key} className="relative z-10 flex flex-col items-center gap-2">
                <motion.div animate={{ scale: step.key === currentStatus ? 1.2 : 1, backgroundColor: statusIndex >= i ? '#2563eb' : '#f1f5f9' }} className="w-5 h-5 rounded-full border-4 border-white shadow-sm" />
                <span className={`text-[8px] font-black uppercase ${statusIndex >= i ? 'text-blue-600' : 'text-slate-300'}`}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Store Card */}
        <div className={`bg-white rounded-3xl border p-5 ${statusIndex < 2 ? 'border-blue-100 ring-4 ring-blue-50/50' : 'opacity-60'}`}>
          <div className="flex items-start justify-between mb-4">
            <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Store</p><p className="text-base font-black text-slate-900">FreshMart Vendor</p></div>
            <button onClick={() => window.open(`https://www.google.com/maps/dir/`)} className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Navigation size={18} /></button>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold bg-slate-50 p-3 rounded-2xl border border-slate-100"><MapPin size={14} className="text-blue-600" /><span className="truncate">{MOCK_ORDER.pickupAddress}</span></div>
        </div>

        {/* Customer Card */}
        <div className={`bg-white rounded-3xl border p-5 ${statusIndex >= 2 ? 'border-green-100 ring-4 ring-green-50/50' : 'opacity-60'}`}>
          <div className="flex items-start justify-between mb-4">
            <div><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Customer</p><p className="text-base font-black text-slate-900">{MOCK_ORDER.customer}</p></div>
            <div className="flex gap-2">
              <a href={`tel:${MOCK_ORDER.phone}`} className="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center"><Phone size={18} /></a>
              <button onClick={() => window.open(`https://www.google.com/maps/dir/`)} className="w-10 h-10 bg-green-600 text-white rounded-2xl flex items-center justify-center shadow-lg"><Navigation size={18} /></button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-bold bg-slate-50 p-3 rounded-2xl border border-slate-100"><MapPin size={14} className="text-green-600" /><span className="truncate">{MOCK_ORDER.address}</span></div>
        </div>

        {/* Proof of Delivery Section */}
        {statusIndex >= 2 && (
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100 overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex items-center gap-3">
               <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center"><CheckCircle2 size={16} className="text-purple-600" /></div>
               <h3 className="text-sm font-black text-slate-900">Proof of Delivery</h3>
            </div>
            
            <div className="p-5 space-y-4">
               {/* Photo Proof */}
               <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Package Photo</p>
                  {capturedPhoto ? (
                    <div className="relative group">
                       <img src={capturedPhoto} className="w-full h-40 object-cover rounded-2xl" alt="Proof" />
                       <button onClick={() => setCapturedPhoto(null)} className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>
                    </div>
                  ) : (
                    <button onClick={() => setShowCamera(true)} className="w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-500 transition-all">
                       <Camera size={24} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Take Photo</span>
                    </button>
                  )}
               </div>

               {/* Signature Proof */}
               <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Signature</p>
                  <SignaturePad onSave={setSignature} />
               </div>
            </div>
          </div>
        )}

        {/* OTP Section */}
        <div id="otp-section" className={`bg-white rounded-3xl border p-6 transition-all ${statusIndex >= 2 && capturedPhoto && signature ? 'border-amber-200 shadow-xl shadow-amber-50' : 'opacity-30 pointer-events-none'}`}>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center"><ShieldCheck size={20} className="text-amber-600" /></div>
            <div><h3 className="text-sm font-black text-slate-900">Verify OTP</h3><p className="text-[10px] text-slate-400 font-bold uppercase">Final Step</p></div>
          </div>
          <div className="flex gap-2 mb-4">
            {[...Array(4)].map((_, i) => (
              <input key={i} type="tel" maxLength={1} value={otpInput[i] || ''} onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                if (val) {
                  const newOtp = otpInput.split(''); newOtp[i] = val; setOtpInput(newOtp.join(''));
                  if (i < 3) e.target.nextSibling?.focus();
                } else {
                  const newOtp = otpInput.split(''); newOtp[i] = ''; setOtpInput(newOtp.join(''));
                  if (i > 0) e.target.previousSibling?.focus();
                }
              }} className="w-full aspect-square bg-slate-50 border-2 border-slate-100 rounded-2xl text-center text-xl font-black text-slate-900 focus:border-amber-400 outline-none" />
            ))}
          </div>
          <button onClick={handleVerifyOTP} disabled={otpInput.length < 4 || otpVerified} className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest ${otpVerified ? 'bg-green-600 text-white' : 'bg-amber-500 text-white shadow-lg shadow-amber-100 active:scale-95 transition-all'}`}>{otpVerified ? 'IDENTITY VERIFIED ✓' : 'VERIFY & COMPLETE'}</button>
        </div>

        <button onClick={() => setShowIssueModal(true)} className="w-full py-4 text-slate-400 font-black text-[10px] uppercase tracking-widest border-2 border-dashed border-slate-200 rounded-3xl">Report Issue</button>
      </div>

      {!delivered && (
        <div className="fixed bottom-6 left-6 right-6 z-50">
           <motion.button whileTap={{ scale: 0.95 }} onClick={handleNextStep} className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 ${statusIndex >= 2 ? 'bg-slate-100 text-slate-400 pointer-events-none' : 'bg-blue-600 text-white shadow-blue-200'}`}>
              {getPrimaryButtonLabel()} <ArrowRight size={18} />
           </motion.button>
        </div>
      )}

      {/* Issue Modal */}
      <AnimatePresence>
        {showIssueModal && (
          <div className="fixed inset-0 z-[100] flex items-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowIssueModal(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} className="relative w-full bg-white rounded-t-[40px] p-8 pb-12">
              <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
              <h3 className="text-xl font-black text-slate-900 mb-6">What happened?</h3>
              <div className="space-y-3">{['Store is closed', 'Customer unavailable', 'Vehicle breakdown', 'Other'].map(issue => (
                <button key={issue} onClick={() => setShowIssueModal(false)} className="w-full text-left p-4 bg-slate-50 rounded-2xl text-sm font-bold text-slate-700">{issue}</button>
              ))}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeliveryOrderDetail;
