import React from 'react';
import ProductCard from '../components/common/ProductCard';

// Import local assets
import SamsungImg from '../../../assets/products/product01.jpg';
import EarbudsImg from '../../../assets/products/product03.jpg';
import ElectronicsImg from '../../../assets/products/product04.jpg';
import LaptopImg from '../../../assets/products/product02.jpg';
import ShoesImg from '../../../assets/products/product07.jpg';
import JewelleryImg from '../../../assets/products/product12.jpg';

const Products = () => {
  const dummyProducts = [
    { id: 1, title: 'Apple iPhone 15 (Blue, 128 GB)', price: '69,999', oldPrice: '79,900', rating: '4.6', reviews: '2,450', image: SamsungImg },
    { id: 2, title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones', price: '29,990', oldPrice: '34,990', rating: '4.8', reviews: '1,120', image: EarbudsImg },
    { id: 3, title: 'Samsung Galaxy Watch 6 (44mm, Bluetooth)', price: '18,499', oldPrice: '29,999', rating: '4.5', reviews: '890', image: ElectronicsImg },
    { id: 4, title: 'Dell Inspiron 15 Laptop (16GB RAM, 512GB SSD)', price: '45,990', oldPrice: '58,000', rating: '4.3', reviews: '560', image: LaptopImg },
    { id: 5, title: 'Nike Air Max Pulse Mens Shoes', price: '12,995', oldPrice: '14,995', rating: '4.7', reviews: '320', image: ShoesImg },
    { id: 6, title: 'Adidas Ultraboost Light Running Shoes', price: '16,199', oldPrice: '18,999', rating: '4.6', reviews: '450', image: ShoesImg },
    { id: 7, title: 'Canon EOS R100 Mirrorless Camera', price: '42,990', oldPrice: '52,990', rating: '4.4', reviews: '210', image: ElectronicsImg },
    { id: 8, title: 'Logitech MX Master 3S Wireless Mouse', price: '9,495', oldPrice: '10,995', rating: '4.9', reviews: '780', image: ElectronicsImg },
  ];

  return (
    <div className="container mx-auto px-4 py-8 flex gap-6">
      {/* Sidebar Filters */}
      <aside className="hidden lg:block w-64 bg-white p-4 shadow-sm border border-gray-200 self-start">
        <h2 className="font-bold text-lg mb-4 border-b pb-2">Filters</h2>
        
        <div className="mb-6">
          <h3 className="font-bold text-sm mb-2 uppercase">Category</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><input type="checkbox" className="mr-2" /> Electronics</li>
            <li><input type="checkbox" className="mr-2" /> Fashion</li>
            <li><input type="checkbox" className="mr-2" /> Home & Kitchen</li>
            <li><input type="checkbox" className="mr-2" /> Beauty</li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-sm mb-2 uppercase">Price</h3>
          <div className="flex items-center gap-2">
            <input type="text" placeholder="Min" className="w-full p-1 border text-sm" />
            <span>-</span>
            <input type="text" placeholder="Max" className="w-full p-1 border text-sm" />
          </div>
        </div>

        <div>
          <h3 className="font-bold text-sm mb-2 uppercase">Customer Ratings</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li className="cursor-pointer hover:text-primary-dark">4★ & above</li>
            <li className="cursor-pointer hover:text-primary-dark">3★ & above</li>
          </ul>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="bg-white p-4 shadow-sm border border-gray-200 mb-6 flex justify-between items-center">
          <h1 className="font-bold text-gray-800">Showing 1-8 of 100 products</h1>
          <select className="border p-1 text-sm outline-none">
            <option>Sort by: Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {dummyProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

