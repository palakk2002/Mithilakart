import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Filter, ArrowLeft, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../../components/common/ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

// Import local assets
import SamsungImg from '../../assets/products/product01.jpg';
import EarbudsImg from '../../assets/products/product03.jpg';
import ElectronicsImg from '../../assets/products/product04.jpg';
import LaptopImg from '../../assets/products/product02.jpg';
import ShoesImg from '../../assets/products/product07.jpg';
import JewelleryImg from '../../assets/products/product12.jpg';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');

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
      className="bg-black min-h-screen text-white pb-20"
    >
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-[var(--color-gold)]/20 p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-[var(--color-gold)]">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 flex items-center bg-[#121212] border border-[var(--color-gold)]/30 rounded-xl px-4 py-2.5">
           <SearchIcon size={18} className="text-[var(--color-gold)]" />
           <input 
             type="text" 
             defaultValue={query}
             onKeyDown={(e) => {
               if (e.key === 'Enter') {
                 navigate(`/vendor/search?q=${e.target.value}`);
               }
             }}
             className="bg-transparent border-none outline-none flex-1 px-3 text-sm font-bold"
             placeholder="Search Mithilakart..."
           />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Results Info & Filters */}
        <div className="flex items-center justify-between mb-8">
           <div>
              <h2 className="text-xs font-black uppercase tracking-widest text-[var(--color-gold)]">Results for "{query}"</h2>
              <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">{filteredProducts.length} items found</p>
           </div>
           <div className="flex items-center gap-4">
              <button className="p-2 bg-white/5 rounded-lg border border-white/10 text-[var(--color-gold)]">
                 <Filter size={18} />
              </button>
              <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                 <button 
                   onClick={() => setViewMode('grid')}
                   className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-[var(--color-gold)] text-black' : 'text-gray-500'}`}
                 >
                    <LayoutGrid size={16} />
                 </button>
                 <button 
                   onClick={() => setViewMode('list')}
                   className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-[var(--color-gold)] text-black' : 'text-gray-500'}`}
                 >
                    <List size={16} />
                 </button>
              </div>
           </div>
        </div>

        {/* Sorting Tags */}
        <div className="flex gap-2 mb-8 overflow-x-auto no-scrollbar">
           {['Relevance', 'Newest', 'Price: Low-High', 'Price: High-Low', 'Top Rated'].map(tag => (
             <button 
               key={tag}
               className="whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 bg-white/5 hover:border-[var(--color-gold)]/30 transition-all active:scale-95"
             >
                {tag}
             </button>
           ))}
        </div>

        {/* Product Grid */}
        <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
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
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10 mt-10">
             <SearchIcon size={48} className="mx-auto text-gray-700 mb-4 opacity-20" />
             <h3 className="text-lg font-black uppercase tracking-widest text-[var(--color-gold)]">No results found</h3>
             <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-2 max-w-xs mx-auto">Try checking your spelling or use more general keywords</p>
             <button 
               onClick={() => navigate('/vendor/home')}
               className="mt-6 px-8 py-3 bg-[var(--color-gold)] text-black rounded-xl font-black uppercase tracking-widest text-[10px]"
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
