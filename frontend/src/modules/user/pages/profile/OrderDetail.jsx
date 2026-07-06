import React, { useState } from 'react';
import { 
  ArrowLeft, ChevronRight, Copy, CheckCircle2, HelpCircle, 
  Star, Edit3, ThumbsUp, Truck, ExternalLink, MessageSquare, 
  ShoppingBag, MapPin, User, Phone, Download, Info, Wallet, X
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useAccountStore from '../../../../store/useAccountStore';

// Real Images from Assets
import BannerImg from '../../../../assets/Banner.jpeg';

// Recommendation Assets
import Appliances from '../../../../assets/products/product08.jpg';
import Cookware from '../../../../assets/products/product13.jpg';
import HomeRevamp from '../../../../assets/products/product01.jpg';
import Earbuds from '../../../../assets/products/product03.jpg';
import SamsungS24 from '../../../../assets/products/product01.jpg';
import AsusLaptop from '../../../../assets/products/product02.jpg';

const OrderDetail = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const orders = useAccountStore((state) => state.orders);
  
  const [showUpdates, setShowUpdates] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [rating, setRating] = useState(2); // Initial stars from design
  const [reviewText, setReviewText] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  const isQuickShopFlow = localStorage.getItem('isQuickShopFlow') === 'true';
  const isFreshGroceryFlow = localStorage.getItem('isFreshGroceryFlow') === 'true';
  const primaryText = isFreshGroceryFlow ? 'text-[#7A3E17]' : isQuickShopFlow ? 'text-[#d6186d]' : 'text-primary-dark';
  const primaryBg = isFreshGroceryFlow ? 'bg-[#7A3E17]' : isQuickShopFlow ? 'bg-[#d6186d]' : 'bg-green-600';
  const primaryLightBg = isFreshGroceryFlow ? 'bg-[#FFF0A0]/40 border border-[#7A3E17]/10' : isQuickShopFlow ? 'bg-pink-50' : 'bg-primary-light';
  const primaryActiveBg = isFreshGroceryFlow ? 'active:bg-[#FFF0A0]' : isQuickShopFlow ? 'active:bg-pink-50' : 'active:bg-primary-light';

  // Find the specific order
  const order = orders.find(o => o.id === orderId) || orders[0];

  if (!order) return null;

  const mainItem = order.items[0];

  const recommendations = [
    { id: 1, name: "Samsung Galaxy S24 Ultra 5G", rating: 4.8, reviews: 1520, price: "1,29,999", oldPrice: "1,39,999", discount: "7% off", image: SamsungS24 },
    { id: 2, name: "Asus Zenbook S13 OLED Laptop", rating: 4.6, reviews: 840, price: "94,990", oldPrice: "1,14,990", discount: "17% off", image: AsusLaptop },
    { id: 3, name: "Noise Buds VS104 Earbuds", rating: 4.2, reviews: 3200, price: "1,299", oldPrice: "3,499", discount: "62% off", image: Earbuds },
  ];

  const interests = [
    { id: 1, title: "Min. 50% Off", sub: "Kitchen Appliances", image: Appliances },
    { id: 2, title: "Min. 40% Off", sub: "Premium Cookware", image: Cookware },
    { id: 3, title: "Min. 60% Off", sub: "Home Revamp", image: HomeRevamp },
  ];

  const handleDownloadInvoice = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert('Invoice download started...');
    }, 1500);
  };

  const deliveryUpdates = [
    { title: "Order Confirmed", date: "Thu, 9th Apr '26", desc: "Your Order has been placed.", details: ["Thu, 9th Apr '26 - 12:21am", "Seller has processed your order.", "Thu, 9th Apr '26 - 1:46am", "Your item has been picked up by delivery partner.", "Thu, 9th Apr '26 - 1:46am"], active: true },
    { title: "Shipped", date: "Thu, 9th Apr '26", desc: "Ekart Logistics - FMPP3903353206", details: ["Your item has been shipped.", "Thu, 9th Apr '26 - 2:44am", "Your item has been received in the hub nearest to you"], active: true },
    { title: "Out For Delivery", date: "Mon, 13th Apr '26", desc: "Your item is out for delivery", details: ["Mon, 13th Apr '26 - 6:45am"], active: true },
    { title: "Delivered", date: "Mon, 13th Apr '26", desc: "Your item has been delivered", details: ["Mon, 13th Apr '26 - 7:15pm"], active: true },
  ];

  return (
    <div className={`min-h-screen font-nunito pb-10 transition-colors duration-300 ${
      isFreshGroceryFlow ? 'bg-gradient-to-b from-[#FFF0A0]/25 via-[#FFFDF3] to-[#FFF]' : 'bg-[#f1f2f4]'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 px-4 py-4 flex items-center justify-between shadow-sm transition-colors duration-300 ${
        isFreshGroceryFlow ? 'bg-[#FFF0A0]' : 'bg-white'
      }`}>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-1 -ml-1 text-slate-800">
            <ArrowLeft size={26} />
          </button>
          <h1 className="text-[19px] font-bold text-slate-900 font-montserrat">Order Details</h1>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-1.5 border border-gray-200 rounded-md text-[14px] font-bold text-slate-700 active:bg-gray-50 transition-colors">
          Help
        </button>
      </div>

      <div className="max-w-2xl mx-auto space-y-3 pb-24">
        {/* Product Info Card */}
        <div className="bg-white p-5 flex gap-5">
          <div className="w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 p-2 border border-gray-100">
            <img src={mainItem.image} alt={mainItem.name} className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div className="flex-1 py-1">
            <h2 className="text-[16px] font-bold text-slate-800 leading-snug mb-1.5">{mainItem.name}</h2>
            <p className="text-[14px] text-gray-500 font-medium">Size: 6 • Color: Olive</p>
          </div>
          <ChevronRight size={20} className="text-gray-300 self-center" />
        </div>

        {/* Order ID Section (Top) */}
        <div className="bg-white px-5 py-4 flex items-center gap-3 border-t border-gray-50">
           <span className="text-[13px] text-gray-400 font-black uppercase tracking-widest">Order #{order.id}</span>
           <button className={`${primaryText} active:scale-90 transition-transform`}>
              <Copy size={16} />
           </button>
        </div>

        {/* Status Card */}
        <div className="bg-white p-5 mx-2 rounded-xl border border-gray-100 shadow-sm mt-2">
           <div className="flex justify-between items-start mb-5">
              <div>
                 <h3 className={`text-[18px] font-black ${isQuickShopFlow ? 'text-[#d6186d]' : 'text-green-600'} mb-1.5`}>{order.status}, {order.date}</h3>
                 <div className="flex items-center gap-2 mt-2">
                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
                       <HelpCircle size={12} className="text-gray-400" />
                    </div>
                    <p className="text-[13px] text-gray-500 font-medium">
                       Return policy valid till May 15 <span className={`${primaryText} font-bold ml-1`}>Know more</span>
                    </p>
                 </div>
                 <p className="text-[13px] text-gray-500 font-medium mt-1.5">Tap 'Help' for return related support.</p>
              </div>
              <div className={`w-10 h-10 ${isQuickShopFlow ? 'bg-[#d6186d]' : 'bg-green-650'} rounded-full flex items-center justify-center shadow-lg shadow-green-100`}>
                 <CheckCircle2 size={22} className="text-white" strokeWidth={3} />
              </div>
           </div>
           
           <div className="pt-5 border-t border-gray-50 text-center">
              <button 
                onClick={() => setShowUpdates(true)}
                className={`text-[15px] font-black ${primaryText} uppercase tracking-tight active:scale-95 transition-transform`}
              >
                See all updates
              </button>
           </div>
        </div>

        {/* Rate Your Experience Section */}
        <div className="mt-8 px-5 py-2">
           <h3 className="text-[18px] font-black text-slate-800 tracking-tight">Rate your experience</h3>
        </div>

        <div className="bg-white p-5 mx-2 rounded-xl shadow-sm border border-gray-50 space-y-6">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100">
                 <ShoppingBag size={24} className="text-gray-400" />
              </div>
              <span className="text-[16px] font-bold text-slate-700">Write a product review</span>
           </div>

           <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-5">
                 <span className="text-[16px] font-bold text-slate-800">Bad</span>
                 <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star 
                        key={star} 
                        size={26} 
                        onClick={() => setRating(star)}
                        className={`cursor-pointer transition-colors ${star <= rating ? (isQuickShopFlow ? 'text-[#d6186d] fill-[#d6186d]' : 'text-green-600 fill-green-600') : 'text-gray-200'}`} 
                      />
                    ))}
                 </div>
              </div>
              <button 
                onClick={() => setShowReviewModal(true)}
                className={`flex items-center gap-2 px-5 py-2.5 border ${isQuickShopFlow ? 'border-[#d6186d] hover:bg-pink-50' : 'border-blue-500'} rounded-md text-[14px] font-black ${primaryText} uppercase tracking-tight ${primaryActiveBg} transition-colors`}
              >
                 <Edit3 size={16} />
                 Write review
              </button>
           </div>
        </div>

        {/* Helpful Info Section */}
        <div className="bg-white mx-2 rounded-xl shadow-sm border border-gray-50 overflow-hidden divide-y divide-gray-50 mt-3">
           <div className="p-5 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-5">
                 <ThumbsUp size={22} className="text-gray-400" />
                 <span className="text-[16px] font-bold text-slate-700">Did you find this page helpful?</span>
              </div>
              <ChevronRight size={22} className="text-gray-300" />
           </div>
           <div className="p-5 flex items-center justify-between active:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-5">
                 <Truck size={22} className="text-gray-400" />
                 <span className="text-[16px] font-bold text-slate-700">How was your delivery experience?</span>
              </div>
              <ChevronRight size={22} className="text-gray-300" />
           </div>
        </div>

        {/* Banner Section */}
        <div className="p-4">
           <div className="bg-slate-900 rounded-2xl p-7 relative overflow-hidden h-48 flex flex-col justify-center shadow-lg">
              <div className="absolute right-0 top-0 bottom-0 w-1/2">
                 <img src={BannerImg} className="w-full h-full object-cover opacity-60" alt="ad" />
              </div>
              <div className="relative z-10 pr-24">
                 <div className="flex items-center gap-2 mb-3">
                    <span className="text-white text-[14px] font-bold">Flipkart × Uber</span>
                  </div>
                  <h2 className="text-white text-[20px] font-black leading-tight mb-3">Get 4% Coins on Uber rides Redeem for 2X value</h2>
                  <button className="text-[13px] font-black text-white underline underline-offset-4 uppercase tracking-widest">Link now</button>
              </div>
              <div className="absolute bottom-4 left-7 flex items-center gap-1.5 opacity-50">
                 <span className="text-[11px] text-white font-bold tracking-widest uppercase">*T&C Apply</span>
              </div>
           </div>
        </div>

        {/* Interested Section */}
        <div className="px-5 py-5">
           <h3 className="text-[18px] font-black text-slate-800 tracking-tight mb-5">You might be also interested in</h3>
           <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
              {interests.map(item => (
                <div key={item.id} className="min-w-[150px] bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex flex-col items-center text-center">
                   <div className="h-24 w-full flex items-center justify-center mb-4">
                      <img src={item.image} className="h-full object-contain" alt={item.sub} />
                   </div>
                   <h4 className="text-[15px] font-black text-slate-900 leading-tight mb-1.5">{item.title}</h4>
                   <p className="text-[13px] text-gray-400 font-bold uppercase tracking-tight">{item.sub}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Recommendations Section */}
        <div className="px-5 py-5">
           <h3 className="text-[18px] font-black text-slate-800 tracking-tight mb-5">You May Also Like...</h3>
           <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
              {recommendations.map(item => (
                <div key={item.id} className="min-w-[200px] bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                   <div className="h-32 flex items-center justify-center mb-4 p-2 bg-gray-50 rounded-xl">
                      <img src={item.image} className="h-full object-contain" alt={item.name} />
                   </div>
                   <h4 className="text-[14px] font-bold text-slate-800 line-clamp-2 h-10 mb-3 leading-tight">{item.name}</h4>
                   <div className="flex items-center gap-2.5 mb-3">
                      <div className={`text-white text-[12px] font-black px-2 py-0.5 rounded flex items-center gap-0.5 ${primaryBg}`}>
                         {item.rating} <Star size={10} fill="white" />
                      </div>
                      <span className="text-[12px] text-gray-400 font-bold">({item.reviews})</span>
                   </div>
                   <div className="flex items-baseline gap-2">
                      <span className="text-[16px] font-black text-slate-900">₹{item.price}</span>
                      <span className="text-[12px] text-gray-400 line-through">₹{item.oldPrice}</span>
                      <span className={`text-[11px] font-black ${primaryText}`}>{item.discount}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Delivery Details */}
        <div className="px-5 py-5">
           <h3 className="text-[18px] font-black text-slate-800 tracking-tight mb-4">Delivery details</h3>
           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 space-y-5">
              <div className="flex gap-5">
                 <div className={`w-10 h-10 ${primaryLightBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <MapPin size={20} className={primaryText} />
                 </div>
                 <div>
                    <h4 className="text-[15px] font-black text-slate-900 mb-1.5">Home</h4>
                    <p className="text-[14px] text-gray-500 leading-relaxed">83 kishan pura mataji mandir, sector no. 5 new hars...</p>
                 </div>
              </div>
              <div className="flex gap-5 border-t border-gray-50 pt-5">
                 <div className={`w-10 h-10 ${primaryLightBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <User size={20} className={primaryText} />
                 </div>
                 <div>
                    <h4 className="text-[15px] font-black text-slate-900 mb-1.5">Mukesh Jinodiya</h4>
                    <div className="flex items-center gap-2.5 text-[14px] text-gray-500">
                       <Phone size={14} />
                       <span>9302841832</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Price Details */}
        <div className="px-5 py-5">
           <h3 className="text-[18px] font-black text-slate-800 tracking-tight mb-4">Price details</h3>
           <div className="bg-white rounded-2xl shadow-sm border border-gray-50 overflow-hidden">
              <div className="p-6 space-y-4">
                 <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-500 font-medium">Listing price</span>
                    <span className="text-slate-900 font-bold">₹599</span>
                 </div>
                 <div className="flex justify-between items-center text-[15px]">
                    <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                       Special price <Info size={16} className="text-gray-300" />
                    </div>
                    <span className="text-slate-900 font-bold">₹539</span>
                 </div>
                 <div className="flex justify-between items-center text-[15px]">
                    <div className="flex items-center gap-1.5 text-gray-500 font-medium">
                       Total fees <ChevronRight size={16} className="text-gray-300 rotate-90" />
                    </div>
                    <span className="text-slate-900 font-bold">₹16</span>
                 </div>
                 <div className="pt-4 border-t border-dashed border-gray-200 flex justify-between items-center">
                    <span className="text-[17px] font-black text-slate-900">Total amount</span>
                    <span className="text-[17px] font-black text-slate-900">₹555</span>
                 </div>
              </div>
              <div className="bg-gray-50 p-5 border-t border-gray-100 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <span className="text-[13px] text-gray-400 font-black uppercase tracking-tight">Paid By</span>
                 </div>
                 <div className="flex items-center gap-2.5 bg-white px-4 py-2 rounded-xl border border-gray-200">
                    <Wallet size={16} className="text-gray-600" />
                    <span className="text-[14px] font-bold text-slate-800">Cash On Delivery</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Invoice Section */}
        <div className="px-5 py-3">
           <button 
            onClick={handleDownloadInvoice}
            disabled={isDownloading}
            className={`w-full bg-white border border-gray-200 py-5 rounded-2xl flex items-center justify-center gap-4 active:bg-gray-50 transition-colors shadow-sm ${isDownloading ? 'opacity-50' : ''}`}
           >
              <Download size={22} className={isDownloading ? `animate-bounce ${primaryText}` : primaryText} />
              <span className="text-[16px] font-black text-slate-800 uppercase tracking-tight">
                {isDownloading ? 'Downloading...' : 'Download Invoice'}
              </span>
           </button>
        </div>

        {/* Final Order ID Section */}
        <div className="px-5 py-8 border-t border-gray-100 mt-6">
           <div className="flex items-center justify-between mb-6">
              <div>
                 <p className="text-[13px] text-gray-400 font-black uppercase tracking-widest mb-1.5">Order ID</p>
                 <span className="text-[15px] font-bold text-slate-800">{order.id}</span>
              </div>
              <button className={`p-2.5 bg-gray-50 rounded-xl ${primaryText} active:scale-90 transition-transform`}>
                 <Copy size={22} />
              </button>
           </div>
           <button 
            onClick={() => navigate('/vendor/home')}
            className={`w-full ${isQuickShopFlow ? 'bg-pink-50 text-[#d6186d]' : 'bg-[#f0f5ff] text-primary-dark'} py-5 rounded-2xl font-black uppercase tracking-widest text-[14px] border ${isQuickShopFlow ? 'border-[#d6186d]/30' : 'border-primary-green/30'} active:scale-[0.98] transition-transform`}
           >
              Shop more from Mithilakart
           </button>
        </div>
      </div>

      {/* Updates Modal */}
      <AnimatePresence>
        {showUpdates && (
          <div className="fixed inset-0 z-[200] flex items-end justify-center">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowUpdates(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-w-xl bg-white rounded-t-[32px] overflow-hidden shadow-2xl h-[85vh] flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <button onClick={() => setShowUpdates(false)} className="p-1">
                   <ArrowLeft size={24} />
                </button>
                <h2 className="text-[18px] font-black text-slate-900 uppercase tracking-tight">Delivery Updates</h2>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-12">
                {deliveryUpdates.map((update, index) => (
                  <div key={index} className="relative flex gap-6">
                    {/* Timeline Line */}
                    {index !== deliveryUpdates.length - 1 && (
                      <div className={`absolute left-[13px] top-[26px] bottom-[-48px] w-1 ${isQuickShopFlow ? 'bg-[#d6186d]' : 'bg-green-500'} rounded-full`} />
                    )}
                    
                    {/* Circle */}
                    <div className={`z-10 w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${update.active ? (isQuickShopFlow ? 'bg-[#d6186d] shadow-lg shadow-pink-100' : 'bg-green-500 shadow-lg shadow-green-100') : 'bg-gray-200'}`}>
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    </div>

                    <div className="space-y-4 flex-1 -mt-1">
                       <div className="flex flex-col">
                         <h3 className="text-[16px] font-black text-slate-800">{update.title} <span className="text-[14px] text-gray-400 font-bold ml-2">{update.date}</span></h3>
                         <p className="text-[14px] text-gray-600 font-medium mt-1">{update.desc}</p>
                       </div>
                       
                       <div className="space-y-3">
                         {update.details.map((detail, dIndex) => (
                           <p key={dIndex} className="text-[13px] text-gray-400 font-bold leading-tight pl-0">
                             {detail}
                           </p>
                         ))}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setShowReviewModal(false)}
               className="absolute inset-0 bg-black/60 backdrop-blur-sm"
             />
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="relative w-full max-w-md bg-white rounded-[24px] overflow-hidden shadow-2xl p-6"
             >
                <div className="flex justify-between items-center mb-6">
                   <h3 className="text-[18px] font-black text-slate-900 uppercase tracking-tight">Write a Review</h3>
                   <button onClick={() => setShowReviewModal(false)} className="p-2 bg-gray-100 rounded-full">
                      <X size={18} className="text-gray-500" />
                   </button>
                </div>
                
                <div className="flex flex-col items-center mb-8">
                   <div className="flex gap-2 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={32} 
                          onClick={() => setRating(star)}
                          className={`cursor-pointer transition-all active:scale-125 ${star <= rating ? (isQuickShopFlow ? 'text-[#d6186d] fill-[#d6186d] shadow-sm' : 'text-green-600 fill-green-600 shadow-sm') : 'text-gray-200'}`} 
                        />
                      ))}
                   </div>
                   <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                     {(rating === 5 && 'Excellent!') || 
                      (rating === 4 && 'Very Good!') || 
                      (rating === 3 && 'Good') || 
                      (rating === 2 && 'Fair') || 
                      (rating === 1 && 'Bad') || 'Select Rating'}
                   </p>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6">
                   <textarea 
                    placeholder="Share your experience with this product..."
                    className="w-full bg-transparent border-none outline-none text-[15px] text-slate-800 placeholder:text-gray-400 min-h-[120px] resize-none"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                   />
                </div>

                <button 
                  onClick={() => setShowReviewModal(false)}
                  className={`w-full ${isQuickShopFlow ? 'bg-[#d6186d]' : 'bg-slate-900'} text-white py-4 rounded-2xl font-black uppercase tracking-widest text-[14px] shadow-xl active:scale-[0.98] transition-transform flex items-center justify-center gap-2`}
                >
                   <MessageSquare size={18} />
                   Submit Review
                </button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default OrderDetail;
