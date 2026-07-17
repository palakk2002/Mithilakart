import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter, ArrowLeft, LayoutGrid, List, Mic } from 'lucide-react';
import ProductCard from '../components/common/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';
import SearchInput from '../../../shared/components/SearchInput';

// Import local assets for search page
import SamsungImg from '../../../assets/products/product01.jpg';
import LaptopImg from '../../../assets/products/product02.jpg';
import EarbudsImg from '../../../assets/products/product03.jpg';
import ElectronicsImg from '../../../assets/products/product04.jpg';
import ShoesImg from '../../../assets/products/product07.jpg';
import JewelleryImg from '../../../assets/products/product12.jpg';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [viewMode, setViewMode] = useState('grid');
  const [isListening, setIsListening] = useState(false);
  const [searchValue, setSearchValue] = useState(query);

  useEffect(() => {
    setSearchValue(query);
  }, [query]);

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please use Chrome or Safari.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setSearchValue(speechToText);
      navigate(`/search?q=${encodeURIComponent(speechToText)}`);
    };

    recognition.onerror = (e) => {
      console.error(e);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const isMithilakFlow = localStorage.getItem('isMithilakFlow') === 'true';
  const isQuickShopFlow = localStorage.getItem('isQuickShopFlow') === 'true';
  const isFreshGroceryFlow = localStorage.getItem('isFreshGroceryFlow') === 'true';

  const pageBg = isMithilakFlow ? 'bg-gradient-to-b from-[#f3e8ff]/60 via-[#faf5ff] to-[#f5f3ff]' : isFreshGroceryFlow ? 'bg-gradient-to-b from-[#FFF0A0]/25 via-[#FFFDF3] to-[#FFF]' : (isQuickShopFlow ? 'bg-[#fff5f7]' : 'bg-[#eaf5ee]');
  const headerBg = isMithilakFlow ? 'bg-gradient-to-r from-[#8b5cf6] to-[#6366f1]' : isFreshGroceryFlow ? 'bg-gradient-to-r from-[#F5B014] to-[#FFF0A0]' : (isQuickShopFlow ? 'bg-gradient-to-r from-[#ff2a5f] to-[#ff7e5f]' : 'bg-[#6FAE4A]');
  const textPrimary = isMithilakFlow ? 'text-[#7c3aed]' : isFreshGroceryFlow ? 'text-[#7A3E17]' : (isQuickShopFlow ? 'text-[#d6186d]' : 'text-[#6FAE4A]');
  const borderPrimary = isMithilakFlow ? 'border-[#7c3aed]' : isFreshGroceryFlow ? 'border-[#7A3E17]' : (isQuickShopFlow ? 'border-[#d6186d]' : 'border-[#6FAE4A]');

  const allProducts = [
    { id: 1, name: 'Apple iPhone 15 (Blue, 128 GB)', price: '69,999', oldPrice: '79,900', rating: '4.6', reviews: '2,450', image: SamsungImg, brand: 'APPLE' },
    { id: 2, name: 'Sony WH-1000XM5 Wireless Headphones', price: '29,990', oldPrice: '34,990', rating: '4.8', reviews: '1,120', image: EarbudsImg, brand: 'SONY' },
    { id: 3, name: 'Samsung Galaxy Watch 6 (44mm)', price: '18,499', oldPrice: '29,999', rating: '4.5', reviews: '890', image: ElectronicsImg, brand: 'SAMSUNG' },
    { id: 4, name: 'Dell Inspiron 15 Laptop', price: '45,990', oldPrice: '58,000', rating: '4.3', reviews: '560', image: LaptopImg, brand: 'DELL' },
    { id: 5, name: 'Nike Air Max Pulse', price: '12,995', oldPrice: '14,995', rating: '4.7', reviews: '320', image: ShoesImg, brand: 'NIKE' },
    { id: 6, name: 'Adidas Ultraboost Light', price: '16,199', oldPrice: '18,999', rating: '4.6', reviews: '450', image: ShoesImg, brand: 'ADIDAS' },
    { id: 7, name: 'Premium Gold Finish Watch', price: '4,499', oldPrice: '5,999', rating: '4.9', reviews: '1.2k', image: JewelleryImg, brand: 'MITHILAKART' },
    { id: 8, name: 'Sleek Geometric Pendant', price: '3,499', oldPrice: '4,499', rating: '4.8', reviews: '850', image: JewelleryImg, brand: 'MITHILAKART' },
  ];

  const filteredProducts = allProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen ${pageBg} text-slate-800 pb-20`}
    >
      {/* Search Header (Colored based on active tab) */}
      <div className={`sticky top-0 z-40 ${headerBg} p-4 flex items-center gap-4 shadow-md`}>
        <button onClick={() => navigate(-1)} className={isFreshGroceryFlow ? 'text-black' : 'text-white'}>
          <ArrowLeft size={24} />
        </button>
        <SearchInput
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              navigate(`/search?q=${e.target.value}`);
            }
          }}
          placeholder={isListening ? "Listening..." : "Search Mithilakart..."}
          rightElement={
            <Mic 
              size={18} 
              onClick={handleVoiceSearch}
              className={`cursor-pointer hover:text-opacity-80 transition-colors ${
                isListening ? 'text-red-500 animate-pulse' : 'text-gray-400 hover:text-gray-600'
              }`} 
            />
          }
        />
      </div>

      <div className="container mx-auto px-2 py-4 md:px-4 md:py-6 max-w-4xl">
        {/* Results Info & Filters */}
        <div className="flex items-center justify-between mb-5">
           <div>
              <h2 className={`text-xs font-black uppercase tracking-widest ${textPrimary}`}>Results for "{query}"</h2>
              <p className="text-[10px] font-bold text-slate-450 mt-1 uppercase tracking-widest">{filteredProducts.length} items found</p>
           </div>
           <div className="flex items-center gap-3">
              <button className="p-2 bg-white rounded-lg border border-slate-150 text-slate-700 shadow-sm active:scale-95 transition-all">
                 <Filter size={16} />
              </button>
              <div className="flex bg-white p-1 rounded-lg border border-slate-150 shadow-sm">
                 <button 
                   onClick={() => setViewMode('grid')}
                   className={`p-1 rounded-md transition-all ${viewMode === 'grid' ? 'bg-[#6FAE4A] text-white' : 'text-slate-400'}`}
                 >
                    <LayoutGrid size={14} />
                 </button>
                 <button 
                   onClick={() => setViewMode('list')}
                   className={`p-1 rounded-md transition-all ${viewMode === 'list' ? 'bg-[#6FAE4A] text-white' : 'text-slate-400'}`}
                 >
                    <List size={14} />
                 </button>
              </div>
           </div>
        </div>

        {/* Sorting Tags */}
        <div className="flex gap-1.5 mb-5 overflow-x-auto no-scrollbar">
           {['Relevance', 'Newest', 'Price: Low-High', 'Price: High-Low', 'Top Rated'].map(tag => (
             <button 
               key={tag}
               className={`whitespace-nowrap px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-150 bg-white text-slate-700 hover:${borderPrimary} transition-all active:scale-95 shadow-sm`}
             >
                {tag}
             </button>
           ))}
        </div>

        {/* Product Grid */}
        <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-4" : "space-y-3"}>
           <AnimatePresence mode="popLayout">
             {filteredProducts.map((product) => (
               <motion.div 
                 key={product.id}
                 layout
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.9 }}
                 transition={{ duration: 0.3 }}
               >
                 <ProductCard product={product} />
               </motion.div>
             ))}
           </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm mt-8">
             <SearchIcon size={40} className="mx-auto text-slate-300 mb-3 opacity-50" />
             <h3 className={`text-base font-black uppercase tracking-widest ${textPrimary}`}>No results found</h3>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2 max-w-xs mx-auto">Try checking your spelling or use more general keywords</p>
             <button 
               onClick={() => navigate('/home')}
               className={`mt-5 px-6 py-2.5 ${headerBg} ${isFreshGroceryFlow ? 'text-black' : 'text-white'} rounded-xl font-black uppercase tracking-widest text-[9px] shadow-md`}
             >
                Go Back Home
             </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Search;
