import React from 'react';
import { ShoppingBag, Heart, ChevronRight } from 'lucide-react';

const Bag = () => {
  const wishlistItems = [
    { id: 1, name: 'Premium Leather Wallet', price: '1,499', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200' },
    { id: 2, name: 'Cotton Slim Fit Shirt', price: '999', image: 'https://images.unsplash.com/photo-1596755094514-f87034a7a988?w=200' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingBag className="text-secondary" size={32} />
        <h1 className="text-3xl font-bold">Your Bag</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Saved for Later / Bag Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-bold mb-6 flex items-center justify-between">
            Saved Items
            <span className="text-sm font-normal text-slate-500">{wishlistItems.length} items</span>
          </h2>

          <div className="space-y-6">
            {wishlistItems.map(item => (
              <div key={item.id} className="flex gap-4 p-4 border border-slate-50 rounded-lg hover:bg-slate-50 transition-colors">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <p className="text-primary font-bold mt-1">₹{item.price}</p>
                  <div className="mt-3 flex gap-4">
                    <button className="text-xs text-blue-600 font-bold hover:underline">Move to Cart</button>
                    <button className="text-xs text-red-500 font-bold hover:underline">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offers Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4">Available Offers</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                <p className="text-xs font-bold text-green-700">Extra 10% Off on HDFC Bank Cards</p>
                <p className="text-[10px] text-green-600">Valid on orders above ₹4,999</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-xs font-bold text-blue-700">Flat ₹500 Cashback</p>
                <p className="text-[10px] text-blue-600">On your first purchase using Cocio Pay</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="font-bold mb-4">Why shop with us?</h3>
            <ul className="text-xs space-y-3 text-slate-600">
              <li className="flex items-center gap-2">✓ 100% Original Products</li>
              <li className="flex items-center gap-2">✓ Easy 30-Day Returns</li>
              <li className="flex items-center gap-2">✓ Safe & Secure Payments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bag;
