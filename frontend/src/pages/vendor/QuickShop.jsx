import React from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryCard from '../../components/vendor/CategoryCard';

const CATEGORIES_DATA = [
  {
    title: 'Grocery',
    items: [
      { name: 'Fruits & Vegetables', img: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=200&auto=format&fit=crop&q=60' },
      { name: 'Atta, Rice & Dal', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&auto=format&fit=crop&q=60' },
      { name: 'Oil, Ghee & Masala', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&auto=format&fit=crop&q=60' },
      { name: 'Dairy, Bread & Eggs', img: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&auto=format&fit=crop&q=60' },
      { name: 'Cereals & Dry Fruits', img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=200&auto=format&fit=crop&q=60' },
      { name: 'Chicken, Meat & Fish', img: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=200&auto=format&fit=crop&q=60' },
      { name: 'Instant & Frozen Food', img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&auto=format&fit=crop&q=60' },
    ]
  },
  {
    title: 'Snacks & Drinks',
    items: [
      { name: 'Chips & Namkeens', img: 'https://images.unsplash.com/photo-1599490659273-e3a728591176?w=200&auto=format&fit=crop&q=60' },
      { name: 'Ice Creams', img: 'https://images.unsplash.com/photo-1501443762811-c52940c6a2c3?w=200&auto=format&fit=crop&q=60' },
      { name: 'Drinks & Juices', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&auto=format&fit=crop&q=60' },
      { name: 'Sweets & Chocolates', img: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=200&auto=format&fit=crop&q=60' },
      { name: 'Tea, Coffee & Milk Drinks', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=200&auto=format&fit=crop&q=60' },
      { name: 'Bakery & Biscuits', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&auto=format&fit=crop&q=60' },
      { name: 'Sauces & Spreads', img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=200&auto=format&fit=crop&q=60' },
    ]
  },
  {
    title: 'Beauty & Personal Care',
    items: [
      { name: 'Bath, Body & Grooming', img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=60' },
      { name: 'Baby Care', img: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=200&auto=format&fit=crop&q=60' },
      { name: 'Hair Care', img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=60' },
      { name: 'Healthcare & Pharma', img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=200&auto=format&fit=crop&q=60' },
      { name: 'Wellness & Hygiene', img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=200&auto=format&fit=crop&q=60' },
      { name: 'Beauty & Fragrances', img: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&auto=format&fit=crop&q=60' },
    ]
  },
  {
    title: 'Household, Stationery & Lifestyle',
    items: [
      { name: 'Cleaning Essentials', img: 'https://images.unsplash.com/photo-1585421514738-ee184b245e35?w=200&auto=format&fit=crop&q=60' },
      { name: 'Stationery Supplies', img: 'https://images.unsplash.com/photo-1586075010923-2dd45e9b2d4f?w=200&auto=format&fit=crop&q=60' },
      { name: 'Toys & Games', img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=200&auto=format&fit=crop&q=60' },
      { name: 'Sports & Fitness', img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=200&auto=format&fit=crop&q=60' },
      { name: 'Home & Kitchen', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=200&auto=format&fit=crop&q=60' },
      { name: 'Electricals & Tools', img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&auto=format&fit=crop&q=60' },
      { name: 'Fashion Accessories', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=200&auto=format&fit=crop&q=60' },
      { name: 'Pet Supplies', img: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&auto=format&fit=crop&q=60' },
    ]
  },
  {
    title: 'Mobiles & Electronics',
    items: [
      { name: 'Mobiles', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&auto=format&fit=crop&q=60' },
      { name: 'Electronics & Gadgets', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&auto=format&fit=crop&q=60' },
      { name: 'Audio & Smart Watches', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=200&auto=format&fit=crop&q=60' },
    ]
  }
];

const QuickShop = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white min-h-screen px-3 py-4">
      {/* Location reminder banner matching screenshot exactly */}
      <div className="mb-6 bg-rose-50/40 border border-rose-100/60 rounded-xl p-3 flex justify-between items-center cursor-pointer shadow-2xs hover:bg-rose-50/70 transition-colors">
        <span className="text-[11px] font-semibold text-rose-900 leading-snug">
          Share your location to access Minutes & explore offers trending in your area.
        </span>
        <svg className="w-4 h-4 text-rose-800 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {CATEGORIES_DATA.map((section, sIdx) => (
        <div key={sIdx} className="mb-8">
          <h2 className="text-[15px] font-bold text-gray-900 mb-3 tracking-tight">
            {section.title}
          </h2>
          <div className="grid grid-cols-4 gap-2">
            {section.items.map((item, itemIdx) => (
              <CategoryCard
                key={itemIdx}
                item={item}
                onClick={() => navigate('/quick-shop/category', { state: { category: item.name } })}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickShop;
