import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, CheckCircle2, ChevronRight, ShieldCheck, 
  Star, Info, Truck, CheckCircle, Zap, Loader2, IndianRupee, CreditCard
} from 'lucide-react';
import useAccountStore from '../../store/useAccountStore';
import ElectronicsImg from '../../assets/products/product04.jpg';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(2); // 1: Address, 2: Order Summary, 3: Payment
  const [selectedPayment, setSelectedPayment] = useState('UPI');
  const [selectedUpi, setSelectedUpi] = useState('paytm');
  const [orderStatus, setOrderStatus] = useState('idle'); // 'idle', 'processing', 'success'
  const addOrder = useAccountStore((state) => state.addOrder);

  const product = location.state?.product || {
    name: 'EVOFOX Blaze Wired Ambidextrous ...',
    price: 622,
    oldPrice: 1299,
    discount: '52%',
    image: ElectronicsImg,
    rating: '4.5',
    reviews: '5,960'
  };

  const address = {
    name: 'Mukesh Jinodiya',
    type: 'HOME',
    address: '83 kishan pura mataji mandir, sector no. 5 new harsud chhanera, New Harsud, Nehru Marg, Mangal Pandey Ward, Harsud, Khandwa 450116',
    phone: '9302841832'
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const handleContinue = () => {
    if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setOrderStatus('processing');
      
      const newOrder = {
        id: `OD${Math.floor(Math.random() * 1000000000)}`,
        status: 'Confirmed',
        date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        items: [{
          name: product.name,
          price: product.price,
          image: product.image
        }]
      };

      setTimeout(() => {
        addOrder(newOrder);
        setOrderStatus('success');
        setTimeout(() => navigate('/vendor/profile/orders'), 2000);
      }, 2000);
    }
  };

  const renderStepper = () => (
    <div className="bg-white px-4 py-4 border-b border-gray-100 sticky top-14 z-40">
      <div className="flex items-center justify-between relative max-w-sm mx-auto">
        {/* Connecting Lines */}
        <div className="absolute top-3.5 left-[15%] right-[15%] h-[2px] bg-gray-100 -z-0">
          <div className={`h-full bg-[#084224] transition-all duration-500`} style={{ width: currentStep === 2 ? '50%' : currentStep === 3 ? '100%' : '0%' }}></div>
        </div>

        {/* Step 1: Address */}
        <div className="flex flex-col items-center gap-1.5 z-10 bg-white px-2">
          <div className="w-7 h-7 rounded-full bg-[#084224] text-white flex items-center justify-center text-[12px] font-bold">
            <CheckCircle2 size={16} />
          </div>
          <span className="text-[11px] font-bold text-gray-400">Address</span>
        </div>

        {/* Step 2: Order Summary */}
        <div className="flex flex-col items-center gap-1.5 z-10 bg-white px-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${currentStep >= 2 ? 'bg-[#084224] text-white' : 'bg-gray-100 text-gray-400'}`}>
            {currentStep > 2 ? <CheckCircle2 size={16} /> : '2'}
          </div>
          <span className={`text-[11px] font-bold ${currentStep === 2 ? 'text-slate-900' : 'text-gray-400'}`}>Order Summary</span>
        </div>

        {/* Step 3: Payment */}
        <div className="flex flex-col items-center gap-1.5 z-10 bg-white px-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${currentStep === 3 ? 'bg-[#084224] text-white' : 'bg-gray-100 text-gray-400'}`}>
            3
          </div>
          <span className={`text-[11px] font-bold ${currentStep === 3 ? 'text-slate-900' : 'text-gray-400'}`}>Payment</span>
        </div>
      </div>
    </div>
  );

  const renderOrderSummary = () => (
    <div className="animate-in fade-in slide-in-from-right duration-300">
      {/* Deliver To */}
      <div className="bg-white p-4 border-b border-gray-100 shadow-sm mb-2">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-[15px] font-bold text-slate-900">Deliver to:</h3>
          <button className="text-[#084224] text-[13px] font-bold border border-gray-200 px-4 py-1.5 rounded-sm">Change</button>
        </div>
        <p className="text-[14px] font-bold text-slate-800 mb-2">
          {address.name} <span className="text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded ml-1 font-black uppercase">HOME</span>
        </p>
        <p className="text-[13px] text-gray-600 leading-relaxed mb-4">{address.address}</p>
        <p className="text-[14px] text-slate-800 font-medium tracking-tight">{address.phone}</p>
      </div>

      {/* Product Item */}
      <div className="bg-white p-4 border-b border-gray-100 shadow-sm mb-2">
        <div className="flex gap-4 mb-4">
          <div className="w-20 h-20 bg-gray-50 rounded-sm p-1 flex-shrink-0">
            <img src={product.image} className="w-full h-full object-contain mix-blend-multiply" alt="product" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[14px] text-slate-800 line-clamp-2 leading-snug mb-1">{product.name}</h4>
            <p className="text-[11px] text-gray-400 mb-2 uppercase">USB 2.0, Black</p>
            <div className="flex items-center gap-1.5 mb-2">
              <div className="flex items-center bg-green-700 text-white px-1 py-0.5 rounded-sm text-[10px] font-bold">
                {product.rating} <Star size={8} fill="white" className="ml-0.5" />
              </div>
              <span className="text-[11px] text-gray-400 font-medium">({product.reviews})</span>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-3.5 ml-1" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-bold text-green-700">↓ {product.discount}</span>
              <span className="text-[13px] text-gray-400 line-through">₹{product.oldPrice}</span>
              <span className="text-[16px] font-bold text-slate-900">₹{product.price}</span>
            </div>
            <p className="text-[11px] text-gray-500 font-medium mt-1">+ ₹19 Protect Promise Fee <Info size={10} className="inline ml-0.5" /></p>
          </div>
        </div>
        <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
          <Truck size={16} className="text-gray-400" />
          <p className="text-[12px] text-slate-800"><span className="italic font-black text-[10px] uppercase tracking-tighter mr-1">Express</span> Delivery in 2 days, Fri</p>
        </div>
      </div>

      {/* Price Summary */}
      <div className="bg-white p-4 shadow-sm mb-32">
        <div className="space-y-5 mb-8">
          <div className="flex justify-between items-center text-[15px]">
            <p className="text-slate-800">MRP</p>
            <p className="text-slate-800 font-medium">₹{product.oldPrice}</p>
          </div>
          <div className="flex justify-between items-center text-[15px]">
            <p className="text-slate-800 flex items-center gap-1">Fees <ChevronRight size={14} className="rotate-90 text-gray-400" /></p>
            <p className="text-slate-800 font-medium">₹19</p>
          </div>
          <div className="flex justify-between items-center text-[15px]">
            <p className="text-slate-800 flex items-center gap-1">Discounts <ChevronRight size={14} className="rotate-90 text-gray-400" /></p>
            <p className="text-green-700 font-medium">- ₹677</p>
          </div>
          <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
            <h3 className="text-[18px] font-bold text-slate-900">Total Amount</h3>
            <h3 className="text-[18px] font-bold text-slate-900">₹{product.price + 19}</h3>
          </div>
        </div>
        
        <div className="bg-[#f1f9f5] px-4 py-3 rounded-sm border border-[#e6f3ec] flex items-center justify-center gap-2 mb-6">
           <Zap size={14} className="text-green-600 fill-green-600" />
           <p className="text-[13px] font-bold text-green-800">You'll save ₹658 on this order!</p>
        </div>

        <p className="text-[11px] text-gray-400 text-center leading-relaxed">
          By continuing with the order, you confirm that you are above 18 years of age, and you agree to the Mithilakart's <span className="text-[#084224]">Terms of Use</span> and <span className="text-[#084224]">Privacy Policy</span>
        </p>
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="animate-in fade-in slide-in-from-right duration-300 pb-32">
      {/* Price Summary Card */}
      <div className="bg-[#f5faff] px-4 py-4 border-b border-gray-100 shadow-sm mx-4 mt-4 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-1">
            <span className="text-[14px] text-slate-600">Total Amount</span>
            <ChevronRight size={14} className="rotate-90 text-slate-400" />
          </div>
          <span className="text-[18px] font-bold text-slate-900 tracking-tight">₹{product.price + 19}</span>
        </div>
        <div className="flex justify-between items-center mb-3 border-t border-gray-200/50 pt-3">
          <span className="text-[14px] text-gray-400 border-b border-dashed border-gray-300">Bank cashback</span>
          <span className="text-[14px] font-medium text-green-600">-₹50</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[14px] text-slate-600">Final Amount</span>
          <span className="text-[16px] font-bold text-slate-500">₹{product.price + 19 - 50}</span>
        </div>
      </div>

      {/* Cashback Banner */}
      <div className="bg-[#f1f9f5] px-4 py-3 border border-[#e6f3ec] mx-4 mt-3 rounded-xl flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[14px] font-bold text-green-700">5% Cashback</span>
          <span className="text-[12px] text-green-600">Claim now with payment offers</span>
        </div>
        <div className="flex items-center gap-1 bg-white px-2 py-1.5 rounded-full shadow-sm border border-gray-100">
           <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center text-[8px] font-bold text-orange-600 italic">IC</div>
           <div className="w-5 h-5 bg-primary-green/20 rounded-full flex items-center justify-center text-[8px] font-bold text-primary-dark italic">M</div>
           <span className="text-[10px] font-bold text-gray-400 ml-0.5">+3</span>
        </div>
      </div>

      {/* Payment Options */}
      <div className="mt-6 space-y-0.5 border-t border-gray-100">
        {/* UPI Option */}
        <div className="bg-white border-b border-gray-100">
           <div 
            onClick={() => setSelectedPayment(selectedPayment === 'UPI' ? '' : 'UPI')}
            className="px-4 py-4 flex items-start justify-between cursor-pointer"
           >
             <div className="flex items-center gap-4">
                <div className="w-8 h-6 border border-gray-200 rounded flex items-center justify-center text-[8px] font-black tracking-tight text-gray-400 bg-gray-50 uppercase">UPI</div>
                <h3 className="text-[15px] font-bold text-slate-800">UPI</h3>
             </div>
             <ChevronRight size={20} className={`text-slate-400 transition-transform ${selectedPayment === 'UPI' ? 'rotate-90' : ''}`} />
           </div>

           {selectedPayment === 'UPI' && (
             <div className="px-4 pb-6 pt-2 animate-in slide-in-from-top duration-200">
                <div className="border border-gray-100 rounded-xl p-4 shadow-sm bg-white">
                    {/* Paytm */}
                    <div className="flex items-start gap-4 mb-6 cursor-pointer" onClick={() => setSelectedUpi('paytm')}>
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${selectedUpi === 'paytm' ? 'border-[#084224]' : 'border-gray-300'}`}>
                          {selectedUpi === 'paytm' && <div className="w-2.5 h-2.5 bg-[#084224] rounded-full"></div>}
                       </div>
                       <div className="flex-1">
                          <div className="flex items-center justify-between">
                             <span className="text-[14px] font-bold text-slate-800">Paytm</span>
                             <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/paytm_5a68fd.png" alt="paytm" className="h-4" />
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                             <CheckCircle size={10} className="text-green-600" />
                             <span className="text-[11px] text-green-600 font-medium border-b border-dashed border-green-300">₹50 cashback applicable. Tap for info</span>
                          </div>
                          {selectedUpi === 'paytm' && (
                             <button 
                                onClick={handleContinue}
                                className="w-full bg-[#ffc107] text-slate-900 py-3.5 rounded-sm font-black uppercase text-[14px] mt-6 shadow-md"
                             >
                               Pay ₹{product.price + 19}
                             </button>
                          )}
                       </div>
                    </div>

                    {/* PhonePe */}
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSelectedUpi('phonepe')}>
                       <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUpi === 'phonepe' ? 'border-[#084224]' : 'border-gray-300'}`}>
                          {selectedUpi === 'phonepe' && <div className="w-2.5 h-2.5 bg-[#084224] rounded-full"></div>}
                       </div>
                       <div className="flex-1 flex items-center justify-between">
                          <span className="text-[14px] font-medium text-slate-800">PhonePe</span>
                          <div className="w-6 h-6 bg-purple-700 rounded-full flex items-center justify-center text-white text-[10px] font-black">पे</div>
                       </div>
                    </div>
                </div>
             </div>
           )}
        </div>

        {/* Credit / Debit Card */}
        <div className="bg-white border-b border-gray-100">
           <div 
            onClick={() => setSelectedPayment(selectedPayment === 'CARD' ? '' : 'CARD')}
            className="px-4 py-4 flex items-start justify-between cursor-pointer"
           >
             <div className="flex items-start gap-4">
                <CreditCard size={20} className="text-slate-800 mt-1" />
                <div className="flex flex-col">
                  <h3 className="text-[15px] font-bold text-slate-800">Credit / Debit / ATM Card</h3>
                  <p className="text-[11px] text-gray-400 mt-0.5">Add and secure cards as per RBI guidelines</p>
                  <p className="text-[11px] text-green-600 font-bold mt-1">Get upto 5% cashback • 2 offers available</p>
                </div>
             </div>
             <ChevronRight size={20} className={`text-slate-400 transition-transform ${selectedPayment === 'CARD' ? 'rotate-90' : ''}`} />
           </div>
        </div>

        {/* Cash on Delivery */}
        <div className="bg-white border-b border-gray-100">
           <div 
            onClick={() => setSelectedPayment(selectedPayment === 'COD' ? '' : 'COD')}
            className="px-4 py-4 flex items-start justify-between cursor-pointer"
           >
             <div className="flex items-start gap-4">
                <IndianRupee size={20} className="text-slate-800 mt-1" />
                <h3 className="text-[15px] font-bold text-slate-800">Cash on Delivery</h3>
             </div>
             <ChevronRight size={20} className={`text-slate-400 transition-transform ${selectedPayment === 'COD' ? 'rotate-90' : ''}`} />
           </div>

           {selectedPayment === 'COD' && (
             <div className="px-4 pb-6 pt-2 animate-in slide-in-from-top duration-200">
                <div className="border border-gray-100 rounded-xl p-6 shadow-sm bg-white">
                  <p className="text-[12px] text-gray-500 leading-relaxed mb-6">
                    Due to handling costs, a nominal fee of ₹9 will be charged for orders placed using this option. Avoid this fee by paying online now.
                  </p>
                  <button 
                    onClick={handleContinue}
                    className="w-full bg-[#ffc107] text-slate-900 py-3.5 rounded-sm font-black uppercase text-[14px] shadow-md"
                  >
                    Place Order
                  </button>
                </div>
             </div>
           )}
        </div>

        {/* Gift Card */}
        <div className="bg-white border-b border-gray-100">
           <div className="px-4 py-4 flex items-center justify-between">
             <div className="flex items-center gap-4">
                <ShieldCheck size={20} className="text-slate-800" />
                <h3 className="text-[14px] font-bold text-slate-800">Have a Mithilakart Gift Card?</h3>
             </div>
             <button className="text-[#084224] text-[13px] font-bold">Add</button>
           </div>
        </div>

        {/* EMI */}
        <div className="bg-white border-b border-gray-100">
           <div className="px-4 py-4 flex items-center justify-between opacity-60">
             <div className="flex items-center gap-4">
                <Star size={20} className="text-slate-800" />
                <h3 className="text-[14px] font-bold text-slate-800">EMI</h3>
             </div>
             <div className="flex items-center gap-1.5">
                <span className="text-[12px] text-gray-500">Unavailable</span>
                <Info size={14} className="text-gray-400" />
             </div>
           </div>
        </div>
      </div>

      {/* Trust Message */}
      <div className="mt-12 mb-20 text-center px-8">
         <p className="text-[16px] font-medium text-gray-400 mb-4 tracking-tight">35 Crore happy customers and counting!</p>
         <div className="w-10 h-10 border-2 border-gray-200 rounded-full flex items-center justify-center mx-auto opacity-40">
            <div className="w-6 h-0.5 bg-gray-300 rounded-full relative">
               <div className="absolute -top-1.5 -left-1 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
               <div className="absolute -top-1.5 -right-1 w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            </div>
         </div>
      </div>
    </div>
  );

  if (orderStatus !== 'idle') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center w-full fixed inset-0 z-[1000] px-6 text-center">
        {orderStatus === 'processing' ? (
          <>
            <Loader2 size={48} className="text-[#084224] animate-spin mb-6" />
            <p className="text-lg font-bold text-slate-900">Processing Your Order</p>
            <p className="text-sm text-gray-500 mt-2">Please do not close this window</p>
          </>
        ) : (
          <div className="animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl mx-auto">
              <CheckCircle size={40} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Success!</h2>
            <p className="text-gray-500">Redirecting you to home...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="active:scale-95 transition-transform">
            <ArrowLeft size={24} className="text-slate-800" />
          </button>
          <h1 className="text-[18px] font-bold text-slate-900">Order Summary</h1>
        </div>
      </div>

      {renderStepper()}

      <main className="max-w-xl mx-auto">
        {currentStep === 2 ? renderOrderSummary() : renderPayment()}
      </main>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 flex items-center justify-between z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col pl-2">
          <span className="text-[12px] text-gray-400 line-through">₹{product.oldPrice}</span>
          <div className="flex items-center gap-1">
            <span className="text-[20px] font-black text-slate-900">₹{product.price + 19}</span>
            <Info size={14} className="text-gray-400" />
          </div>
        </div>
        <button 
          onClick={handleContinue}
          className="bg-[#ffc107] text-slate-900 px-12 py-3.5 rounded-sm font-black uppercase text-[15px] shadow-lg active:scale-95 transition-transform"
        >
          {currentStep === 3 ? 'Place Order' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;


