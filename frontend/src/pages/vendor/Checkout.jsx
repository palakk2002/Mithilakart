import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Edit2, Loader2, CheckCircle
} from 'lucide-react';
import useAccountStore from '../../store/useAccountStore';
import ElectronicsImg from '../../assets/products/product04.jpg';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('card');
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

  const deliveryFee = 30;
  const subTotal = product.price;
  const totalAmount = subTotal + deliveryFee;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePayments = () => {
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
      setTimeout(() => navigate('/profile/orders'), 2000);
    }, 2000);
  };

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
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Order Successful!</h2>
            <p className="text-gray-500">Redirecting to your orders...</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#f9f9f9] min-h-screen font-sans pb-[240px]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#f9f9f9] px-4 py-4 flex items-center justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="w-10 h-10 bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center justify-center border border-gray-100/50 active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} className="text-slate-800" />
        </button>
        <h1 className="text-[18px] font-bold text-slate-800 mr-10 flex-1 text-center">Checkout</h1>
      </div>

      <div className="max-w-md mx-auto px-4">
        {/* Delivery to Section */}
        <div className="mt-4">
          <h2 className="text-base font-bold text-slate-800 mb-3">Delivery to</h2>
          
          {/* Home Address Card */}
          <div 
            onClick={() => setSelectedAddress('home')}
            className={`bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border transition-all duration-200 flex items-start gap-4 mb-3 cursor-pointer ${
              selectedAddress === 'home' 
                ? 'border-[var(--color-gold)]/60 shadow-[0_4px_16px_rgba(226,167,80,0.08)]' 
                : 'border-transparent opacity-80'
            }`}
          >
            <div className="mt-1">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedAddress === 'home' ? 'border-[var(--color-gold)]' : 'border-gray-200'
              }`}>
                {selectedAddress === 'home' && (
                  <div className="w-3 h-3 rounded-full bg-[var(--color-gold)]"></div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-slate-800">Home</span>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <Edit2 size={16} />
                </button>
              </div>
              <p className="text-[12px] text-gray-500 mt-1 font-medium">+91 888 888 8888</p>
              <p className="text-[12px] text-gray-400 mt-1 leading-relaxed">1749 Chaudhray Dhaba Delhi</p>
            </div>
          </div>

          {/* Office Address Card */}
          <div 
            onClick={() => setSelectedAddress('office')}
            className={`bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border transition-all duration-200 flex items-start gap-4 mb-3 cursor-pointer ${
              selectedAddress === 'office' 
                ? 'border-[var(--color-gold)]/60 shadow-[0_4px_16px_rgba(226,167,80,0.08)]' 
                : 'border-transparent opacity-80'
            }`}
          >
            <div className="mt-1">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedAddress === 'office' ? 'border-[var(--color-gold)]' : 'border-gray-200'
              }`}>
                {selectedAddress === 'office' && (
                  <div className="w-3 h-3 rounded-full bg-[var(--color-gold)]"></div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-slate-800">Office</span>
                <button className="text-gray-400 hover:text-gray-600 p-1">
                  <Edit2 size={16} />
                </button>
              </div>
              <p className="text-[12px] text-gray-500 mt-1 font-medium">(0261) 555-0115</p>
              <p className="text-[12px] text-gray-400 mt-1 leading-relaxed">2588 Ratan lal sahdev marg</p>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="mt-6">
          <h2 className="text-base font-bold text-slate-800 mb-3">payment method</h2>

          {/* Credit Card */}
          <div 
            onClick={() => setSelectedPayment('card')}
            className="flex items-center justify-between bg-white rounded-2xl p-4 mb-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100/50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-gray-50 rounded flex items-center justify-center border border-gray-100">
                <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="6" fill="#EB001B" fillOpacity="0.8"/>
                  <circle cx="16" cy="8" r="6" fill="#F79E1B" fillOpacity="0.8"/>
                </svg>
              </div>
              <span className="text-[14px] font-bold text-slate-800">Credit Card</span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              selectedPayment === 'card' ? 'border-[var(--color-gold)]' : 'border-gray-200'
            }`}>
              {selectedPayment === 'card' && (
                <div className="w-3 h-3 rounded-full bg-[var(--color-gold)]"></div>
              )}
            </div>
          </div>

          {/* PayPal */}
          <div 
            onClick={() => setSelectedPayment('paypal')}
            className="flex items-center justify-between bg-white rounded-2xl p-4 mb-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100/50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-gray-50 rounded flex items-center justify-center border border-gray-100">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.076 2.02C7.567 2.01 8.28 2 9.22 2H16.03c1.55 0 2.87.97 3.25 2.44l2.13 8.35c.18.72-.03 1.48-.56 2.01-.52.53-1.25.82-1.99.82h-4.83c-.47 0-.89.31-1.02.76l-1.06 3.6c-.15.53-.63.89-1.18.89H6.18c-.78 0-1.37-.73-1.21-1.49l2.84-13.43c.15-.71.77-1.21 1.49-1.21z" fill="#003087"/>
                  <path d="M10.076 6.02C10.567 6.01 11.28 6 12.22 6H19.03c1.55 0 2.87.97 3.25 2.44l1.37 5.37c-.37-.47-.93-.76-1.56-.76h-4.83c-.47 0-.89.31-1.02.76l-1.06 3.6c-.15.53-.63.89-1.18.89H8.18c-.78 0-1.37-.73-1.21-1.49l1.84-8.6c.15-.71.77-1.21 1.49-1.21z" fill="#0079C1"/>
                </svg>
              </div>
              <span className="text-[14px] font-bold text-slate-800">PayPal</span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              selectedPayment === 'paypal' ? 'border-[var(--color-gold)]' : 'border-gray-200'
            }`}>
              {selectedPayment === 'paypal' && (
                <div className="w-3 h-3 rounded-full bg-[var(--color-gold)]"></div>
              )}
            </div>
          </div>

          {/* Google Pay */}
          <div 
            onClick={() => setSelectedPayment('gpay')}
            className="flex items-center justify-between bg-white rounded-2xl p-4 mb-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-gray-100/50 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-7 bg-gray-50 rounded flex items-center justify-center border border-gray-100">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.98 12.28c0-.62-.05-1.23-.16-1.82H12v3.45h4.48c-.19 1.01-.76 1.87-1.62 2.44v2.03h2.62c1.53-1.41 2.5-3.48 2.5-6.1z" fill="#4285F4"/>
                  <path d="M12 20.36c2.26 0 4.15-.75 5.54-2.03l-2.62-2.03c-.73.49-1.66.78-2.92.78-2.25 0-4.15-1.52-4.83-3.57H4.47v2.1c1.38 2.74 4.22 4.62 7.53 4.62z" fill="#34A853"/>
                  <path d="M7.17 13.51c-.17-.51-.27-1.06-.27-1.63s.1-1.12.27-1.63v-2.1H4.47c-.58 1.16-.91 2.47-.91 3.73s.33 2.57.91 3.73l2.7-2.1z" fill="#FBBC05"/>
                  <path d="M12 6.89c1.23 0 2.33.42 3.2 1.25l2.4-2.4C16.14 4.38 14.25 3.64 12 3.64c-3.31 0-6.15 1.88-7.53 4.62l2.7 2.1c.68-2.05 2.58-3.57 4.83-3.57z" fill="#EA4335"/>
                </svg>
              </div>
              <span className="text-[14px] font-bold text-slate-800">Google Pay</span>
            </div>
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              selectedPayment === 'gpay' ? 'border-[var(--color-gold)]' : 'border-gray-200'
            }`}>
              {selectedPayment === 'gpay' && (
                <div className="w-3 h-3 rounded-full bg-[var(--color-gold)]"></div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-8px_30px_rgba(0,0,0,0.06)] rounded-t-[32px] px-6 pt-5 pb-6 border-t border-gray-100/60 z-50">
        <div className="max-w-md mx-auto">
          {/* Price Breakdown */}
          <div className="space-y-2.5 mb-5">
            <div className="flex justify-between items-center text-[14px] text-gray-500">
              <span>Delivery fee</span>
              <span>₹{deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-[14px] text-gray-500">
              <span>Sub total</span>
              <span>₹{subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
              <span className="text-[16px] font-bold text-slate-800">Total</span>
              <span className="text-[18px] font-black text-slate-900">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Payments Button */}
          <button 
            onClick={handlePayments}
            className="w-full bg-[var(--color-gold)] hover:bg-[var(--color-gold-hover)] text-white font-bold py-4 rounded-2xl shadow-lg shadow-[var(--color-gold)]/10 active:scale-[0.98] transition-all text-center text-[16px]"
          >
            Payments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
