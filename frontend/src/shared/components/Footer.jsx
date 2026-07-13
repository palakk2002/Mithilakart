import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-white pt-10 pb-8 mt-auto border-t border-gray-100 flex flex-col items-center">
      {/* 4-Column Desktop Footer Link Grid (Hidden on Mobile) */}
      <div className="hidden md:grid grid-cols-4 gap-12 w-full max-w-[1200px] px-6 mb-8 pb-8 border-b border-gray-100">
        {/* Column 1: About */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">About Mithilakart</h3>
          <p className="text-xs text-gray-500 leading-relaxed font-semibold">
            Discover unique, high-quality handcrafted items and fresh goods directly from local artisans. We bridge the gap between traditional craftsmanship and modern convenience.
          </p>
        </div>

        {/* Column 2: Customer Care */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Customer Care</h3>
          <ul className="space-y-2 text-xs font-bold text-gray-500">
            <li>
              <Link to="/profile/help-center" className="hover:text-primary-green transition-colors">Help Center</Link>
            </li>
            <li>
              <Link to="/profile/orders" className="hover:text-primary-green transition-colors">Track Order</Link>
            </li>
            <li>
              <Link to="/cancellation-returns" className="hover:text-primary-green transition-colors">Cancellations & Returns</Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-primary-green transition-colors">Shipping Policy</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Useful Links */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Useful Links</h3>
          <ul className="space-y-2 text-xs font-bold text-gray-500">
            <li>
              <Link to="/terms" className="hover:text-primary-green transition-colors">Terms of Use</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary-green transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/home" className="hover:text-primary-green transition-colors">Home Page</Link>
            </li>
            <li>
              <Link to="/categories" className="hover:text-primary-green transition-colors">Shop by Categories</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-2 text-xs font-semibold text-gray-500">
            <li><strong>Email:</strong> support@mithilakart.com</li>
            <li><strong>Phone:</strong> +91 1800-123-4567</li>
            <li><strong>Address:</strong> Mithilakart Pvt Ltd, Mumbai, India</li>
          </ul>
        </div>
      </div>

      {/* Social Media Icons (Centered for both Desktop & Mobile) */}
      <div className="flex items-center justify-center gap-6 mb-6">
        {/* Instagram */}
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-sm"
          style={{
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* X */}
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-black transition-transform hover:scale-110 active:scale-95 shadow-sm"
        >
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* Facebook */}
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#1877F2] transition-transform hover:scale-110 active:scale-95 shadow-sm"
        >
          <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FF0000] transition-transform hover:scale-110 active:scale-95 shadow-sm"
        >
          <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        </a>
      </div>

      {/* Side-by-Side Logo & Brand Name (Centered below social icons) */}
      <div className="flex flex-col items-center justify-center gap-1.5">
        <div className="flex items-center justify-center gap-3">
          <img
            src="/logomith-removebg-preview.png"
            alt="Mithilakart Logo"
            className="h-28 w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
          <span className="text-[20px] font-black text-slate-800 tracking-wider">
            Mithilakart
          </span>
        </div>
        
        {/* Tagline / Subtitle */}
        <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
          The Artisan Marketplace
        </span>
      </div>
    </footer>
  );
};

export default Footer;
