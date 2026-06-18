import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Search, Share2, ChevronDown, Heart } from 'lucide-react';

const DYNAMIC_DATA = {
  'Fruits & Vegetables': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=100&auto=format&fit=crop&q=60' },
      { id: 'veg', name: 'Fresh Vegetables', icon: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=100&auto=format&fit=crop&q=60' },
      { id: 'fruits', name: 'Fresh Fruits', icon: 'https://images.unsplash.com/photo-1610832958506-ee5633619144?w=100&auto=format&fit=crop&q=60' },
      { id: 'exotics', name: 'Exotics', icon: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=100&auto=format&fit=crop&q=60' },
    ],
    products: [
      { id: 'fv1', name: 'Jumbo Indian Cherry', img: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=300&auto=format&fit=crop&q=60', brand: 'Fresho', weight: '200 g', price: 227, oldPrice: 290, eta: '14 mins', stock: '2 left', tags: ['Carbide Free', 'Pulp-Rich Sweet'], category: 'fruits' },
      { id: 'fv2', name: 'Safeda / Banganapalli Mango', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=300&auto=format&fit=crop&q=60', brand: 'Fresho', weight: '750 - 850 g', subText: '2 pcs', price: 96, oldPrice: 120, eta: '14 mins', tags: ['Carbide Free', 'Pulp-Rich Sweet'], category: 'fruits' },
      { id: 'fv3', name: 'Litchi', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&auto=format&fit=crop&q=60', brand: 'Fresho', weight: '500 g', price: 209, oldPrice: 257, eta: '14 mins', stock: '1 left', badge: "Season's Best", tags: ['Fresh & Juicy'], category: 'fruits' },
      { id: 'fv4', name: 'Jamun', img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=300&auto=format&fit=crop&q=60', brand: 'Fresho', weight: '250 g', price: 132, oldPrice: 153, eta: '14 mins', stock: '2 left', tags: ['Rich in iron'], category: 'fruits' },
      { id: 'fv5', name: 'Fresh Tomato Hybrid', img: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=300&auto=format&fit=crop&q=60', brand: 'Organic Farms', weight: '500 g', price: 24, oldPrice: 32, eta: '14 mins', tags: ['Freshly Picked'], category: 'veg' },
      { id: 'fv6', name: 'New Potato (Aloo)', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&auto=format&fit=crop&q=60', brand: 'Organic Farms', weight: '1 kg', price: 38, oldPrice: 48, eta: '14 mins', tags: ['Daily Essentials'], category: 'veg' },
      { id: 'fv7', name: 'Hybrid Broccoli', img: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?w=300&auto=format&fit=crop&q=60', brand: 'Exotic Farms', weight: '1 pc', subText: 'approx 300g', price: 89, oldPrice: 110, eta: '14 mins', badge: 'Exotic', tags: ['High Fiber'], category: 'exotics' }
    ]
  },
  'Atta, Rice & Dal': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&auto=format&fit=crop&q=60' },
      { id: 'atta', name: 'Atta & Flours', icon: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=100&auto=format&fit=crop&q=60' },
      { id: 'rice', name: 'Rice & Rice Products', icon: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&auto=format&fit=crop&q=60' },
      { id: 'dal', name: 'Dals & Pulses', icon: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'ard1', name: 'Aashirvaad Shudh Chakki Atta', img: 'https://images.unsplash.com/photo-1574316071802-0d684efa7bf5?w=300&auto=format&fit=crop&q=60', brand: 'Aashirvaad', weight: '5 kg', price: 260, oldPrice: 295, eta: '14 mins', tags: ['100% Whole Wheat'], category: 'atta' },
      { id: 'ard2', name: 'Fortune Premium Basmati Rice', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&auto=format&fit=crop&q=60', brand: 'Fortune', weight: '1 kg', price: 115, oldPrice: 145, eta: '14 mins', tags: ['Super Long Grain'], category: 'rice' },
      { id: 'ard3', name: 'Tata Sampann Unpolished Toor Dal', img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=300&auto=format&fit=crop&q=60', brand: 'Tata Sampann', weight: '1 kg', price: 189, oldPrice: 220, eta: '14 mins', tags: ['Unpolished & Natural'], category: 'dal' },
      { id: 'ard4', name: 'Tata Sampann Moong Dal', img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=300&auto=format&fit=crop&q=60', brand: 'Tata Sampann', weight: '500 g', price: 95, oldPrice: 115, eta: '14 mins', tags: ['Protein Rich'], category: 'dal' }
    ]
  },
  'Oil, Ghee & Masala': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&auto=format&fit=crop&q=60' },
      { id: 'oil', name: 'Cooking Oils', icon: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&auto=format&fit=crop&q=60' },
      { id: 'ghee', name: 'Ghee & Vanaspati', icon: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&auto=format&fit=crop&q=60' },
      { id: 'spices', name: 'Spices & Masalas', icon: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'ogm1', name: 'Fortune Mustard Oil Kachi Ghani', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=60', brand: 'Fortune', weight: '1 L', price: 175, oldPrice: 195, eta: '14 mins', tags: ['Cold Pressed'], category: 'oil' },
      { id: 'ogm2', name: 'Amul Pure Ghee Tin', img: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&auto=format&fit=crop&q=60', brand: 'Amul', weight: '1 L', price: 690, oldPrice: 720, eta: '14 mins', tags: ['Pure Cow Ghee'], category: 'ghee' },
      { id: 'ogm3', name: 'Everest Garam Masala Powder', img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=300&auto=format&fit=crop&q=60', brand: 'Everest', weight: '100 g', price: 92, oldPrice: 105, eta: '14 mins', tags: ['Rich Aroma'], category: 'spices' }
    ]
  },
  'Dairy, Bread & Eggs': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&auto=format&fit=crop&q=60' },
      { id: 'milk', name: 'Milk', icon: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&auto=format&fit=crop&q=60' },
      { id: 'bread', name: 'Bread & Buns', icon: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&auto=format&fit=crop&q=60' },
      { id: 'eggs', name: 'Eggs', icon: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'dbe1', name: 'Amul Taaza Fresh Toned Milk', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=60', brand: 'Amul', weight: '1 L', price: 66, oldPrice: 68, eta: '14 mins', tags: ['Pasteurised Toned'], category: 'milk' },
      { id: 'dbe2', name: 'Harvest Gold Brown Bread', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=60', brand: 'Harvest Gold', weight: '400 g', price: 45, oldPrice: 50, eta: '14 mins', tags: ['High Fiber'], category: 'bread' },
      { id: 'dbe3', name: 'Fresh White Eggs Pack', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&auto=format&fit=crop&q=60', brand: 'Fresho', weight: '6 pcs', price: 42, oldPrice: 55, eta: '14 mins', tags: ['Rich in Protein'], category: 'eggs' }
    ]
  },
  'Chips & Namkeens': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1599490659273-e3a728591176?w=100&auto=format&fit=crop&q=60' },
      { id: 'chips', name: 'Potato Chips', icon: 'https://images.unsplash.com/photo-1599490659273-e3a728591176?w=100&auto=format&fit=crop&q=60' },
      { id: 'namkeen', name: 'Namkeens & Bhujia', icon: 'https://images.unsplash.com/photo-1599490659273-e3a728591176?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'cn1', name: 'Lays Classic Salted Potato Chips', img: 'https://images.unsplash.com/photo-1599490659273-e3a728591176?w=300&auto=format&fit=crop&q=60', brand: 'Lays', weight: '50 g', price: 20, oldPrice: 20, eta: '14 mins', tags: ['Crisp & Salty'], category: 'chips' },
      { id: 'cn2', name: 'Haldirams Aloo Bhujia Namkeen', img: 'https://images.unsplash.com/photo-1599490659273-e3a728591176?w=300&auto=format&fit=crop&q=60', brand: 'Haldirams', weight: '150 g', price: 45, oldPrice: 50, eta: '14 mins', tags: ['Spicy Potato Strings'], category: 'namkeen' }
    ]
  },
  'Ice Creams': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1501443762811-c52940c6a2c3?w=100&auto=format&fit=crop&q=60' },
      { id: 'tub', name: 'Tubs', icon: 'https://images.unsplash.com/photo-1501443762811-c52940c6a2c3?w=100&auto=format&fit=crop&q=60' },
      { id: 'cone', name: 'Cones & Cups', icon: 'https://images.unsplash.com/photo-1501443762811-c52940c6a2c3?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'ic1', name: 'Kwality Walls Butterscotch Tub', img: 'https://images.unsplash.com/photo-1501443762811-c52940c6a2c3?w=300&auto=format&fit=crop&q=60', brand: 'Kwality Walls', weight: '700 ml', price: 160, oldPrice: 190, eta: '14 mins', tags: ['Butterscotch Crunch'], category: 'tub' },
      { id: 'ic2', name: 'Amul Chocolate Cone', img: 'https://images.unsplash.com/photo-1501443762811-c52940c6a2c3?w=300&auto=format&fit=crop&q=60', brand: 'Amul', weight: '120 ml', price: 40, oldPrice: 45, eta: '14 mins', tags: ['Rich Chocolate'], category: 'cone' }
    ]
  },
  'Drinks & Juices': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&auto=format&fit=crop&q=60' },
      { id: 'soft', name: 'Soft Drinks', icon: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&auto=format&fit=crop&q=60' },
      { id: 'juice', name: 'Fruit Juices', icon: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'dj1', name: 'Coca-Cola Soft Drink Can', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=60', brand: 'Coca-Cola', weight: '330 ml', price: 40, oldPrice: 40, eta: '14 mins', tags: ['Refreshing Fizz'], category: 'soft' },
      { id: 'dj2', name: 'Real Mixed Fruit Juice Pack', img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&auto=format&fit=crop&q=60', brand: 'Real', weight: '1 L', price: 110, oldPrice: 125, eta: '14 mins', tags: ['100% Fruit Juice'], category: 'juice' }
    ]
  },
  'Sweets & Chocolates': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=100&auto=format&fit=crop&q=60' },
      { id: 'choc', name: 'Chocolates', icon: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=100&auto=format&fit=crop&q=60' },
      { id: 'sweets', name: 'Indian Sweets', icon: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'sc1', name: 'Cadbury Dairy Milk Silk Chocolate', img: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&auto=format&fit=crop&q=60', brand: 'Cadbury', weight: '150 g', price: 175, oldPrice: 190, eta: '14 mins', tags: ['Smooth & Creamy'], category: 'choc' },
      { id: 'sc2', name: 'Amul Fruit & Nut Dark Chocolate', img: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&auto=format&fit=crop&q=60', brand: 'Amul', weight: '150 g', price: 100, oldPrice: 120, eta: '14 mins', tags: ['Rich Cocoa'], category: 'choc' },
      { id: 'sc3', name: 'Haldiram Gulab Jamun Tin', img: 'https://images.unsplash.com/photo-1581798459219-318e76aecc7b?w=300&auto=format&fit=crop&q=60', brand: 'Haldirams', weight: '1 kg', price: 220, oldPrice: 250, eta: '14 mins', tags: ['Festive Sweet'], category: 'sweets' }
    ]
  },
  'Tea, Coffee & Milk Drinks': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=100&auto=format&fit=crop&q=60' },
      { id: 'tea', name: 'Tea', icon: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=100&auto=format&fit=crop&q=60' },
      { id: 'coffee', name: 'Coffee', icon: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'tcm1', name: 'Brooke Bond Red Label Tea', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&auto=format&fit=crop&q=60', brand: 'Brooke Bond', weight: '500 g', price: 190, oldPrice: 220, eta: '14 mins', tags: ['Healthy Flavonoids'], category: 'tea' },
      { id: 'tcm2', name: 'Nescafe Classic Instant Coffee', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=300&auto=format&fit=crop&q=60', brand: 'Nescafe', weight: '100 g', price: 280, oldPrice: 310, eta: '14 mins', tags: ['100% Pure Coffee'], category: 'coffee' }
    ]
  },
  'Bakery & Biscuits': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&auto=format&fit=crop&q=60' },
      { id: 'biscuits', name: 'Biscuits & Cookies', icon: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&auto=format&fit=crop&q=60' },
      { id: 'bread', name: 'Fresh Breads', icon: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'bb1', name: 'Britannia Good Day Cashew Cookies', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=60', brand: 'Britannia', weight: '100 g', price: 20, oldPrice: 25, eta: '14 mins', tags: ['Cashew Rich'], category: 'biscuits' },
      { id: 'bb2', name: 'Britannia Bourbon Biscuit Pack', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&auto=format&fit=crop&q=60', brand: 'Britannia', weight: '150 g', price: 30, oldPrice: 35, eta: '14 mins', tags: ['Chocolate Creamy'], category: 'biscuits' }
    ]
  },
  'Sauces & Spreads': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=100&auto=format&fit=crop&q=60' },
      { id: 'ketchup', name: 'Tomato Ketchup', icon: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=100&auto=format&fit=crop&q=60' },
      { id: 'jam', name: 'Fruit Jams', icon: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'ss1', name: 'Kissan Fresh Tomato Ketchup', img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=300&auto=format&fit=crop&q=60', brand: 'Kissan', weight: '950 g', price: 120, oldPrice: 145, eta: '14 mins', tags: ['100% Real Tomatoes'], category: 'ketchup' },
      { id: 'ss2', name: 'Kissan Mixed Fruit Jam Jar', img: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?w=300&auto=format&fit=crop&q=60', brand: 'Kissan', weight: '500 g', price: 160, oldPrice: 185, eta: '14 mins', tags: ['Real Fruit Pulps'], category: 'jam' }
    ]
  },
  'Mithila Festival & Cultural': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=100&auto=format&fit=crop&q=60' },
      { id: 'festival', name: 'Mithila Festival Packages', icon: 'https://images.unsplash.com/photo-1609137144813-7d722edbd48e?w=100&auto=format&fit=crop&q=60' },
      { id: 'marriage', name: 'Mithila Marriage Packages', icon: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&auto=format&fit=crop&q=60' },
      { id: 'cultural', name: 'Mithila Cultural Packages', icon: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=100&auto=format&fit=crop&q=60' },
      { id: 'arts', name: 'Mithila Arts', icon: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&auto=format&fit=crop&q=60' },
      { id: 'm5', name: 'M5', icon: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&auto=format&fit=crop&q=60' },
      { id: 'm6', name: 'M6', icon: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&auto=format&fit=crop&q=60' },
      { id: 'm7', name: 'M7', icon: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=100&auto=format&fit=crop&q=60' },
      { id: 'm8', name: 'M8', icon: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'mfc1', name: 'Framed Madhubani Painting (Radha Krishna)', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Kala', weight: '1 Unit', price: 1200, oldPrice: 1500, eta: '14 mins', badge: 'Authentic', tags: ['Handpainted', 'Traditional'], category: 'arts' },
      { id: 'mfc2', name: 'Handcrafted Madhubani Bookmark Set', img: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Kala', weight: '5 pcs', price: 150, oldPrice: 200, eta: '14 mins', tags: ['Handmade', 'Paper Art'], category: 'arts' },
      { id: 'mfc3', name: 'Cultural Wall Hanging Ganesha', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Decor', weight: '1 pc', price: 349, oldPrice: 450, eta: '14 mins', tags: ['Sikki Grass', 'Eco Friendly'], category: 'cultural' },
      { id: 'mfc4', name: 'Mithila Kojagari Pooja Festival Package', img: 'https://images.unsplash.com/photo-1609137144813-7d722edbd48e?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Rasoi', weight: '1 Kit', price: 899, oldPrice: 1199, eta: '14 mins', badge: 'Festive', tags: ['Pooja Needs', 'Festival Special'], category: 'festival' },
      { id: 'mfc5', name: 'Madhubani Wedding Rituals Marriage Set', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Shringar', weight: '1 Kit', price: 2499, oldPrice: 2999, eta: '14 mins', badge: 'Wedding', tags: ['Shringar', 'Marriage Kit'], category: 'marriage' }
    ]
  },
  'Mithila Paridhan': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=100&auto=format&fit=crop&q=60' },
      { id: 'sarees', name: 'Sarees', icon: 'https://images.unsplash.com/photo-1610030470343-a55099abf3ac?w=100&auto=format&fit=crop&q=60' },
      { id: 'kurtas', name: 'Kurtas & Dupattas', icon: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'mp1', name: 'Tussar Silk Madhubani Saree', img: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Weaves', weight: '1 Unit', price: 4500, oldPrice: 5500, eta: '14 mins', badge: 'Premium', tags: ['100% Pure Silk', 'Handpainted'], category: 'sarees' },
      { id: 'mp2', name: 'Hand-painted Cotton Kurta', img: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Weaves', weight: '1 Unit', price: 850, oldPrice: 1200, eta: '14 mins', tags: ['Pure Cotton', 'Unisex'], category: 'kurtas' },
      { id: 'mp3', name: 'Premium Madhubani Painted Dupatta', img: 'https://images.unsplash.com/photo-1610030470343-a55099abf3ac?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Weaves', weight: '1 Unit', price: 650, oldPrice: 850, eta: '14 mins', tags: ['Cotton-Silk', 'Ethnic Wear'], category: 'kurtas' }
    ]
  },
  'Mithila Special Cuisines': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&auto=format&fit=crop&q=60' },
      { id: 'makhana', name: 'Phool Makhana', icon: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&auto=format&fit=crop&q=60' },
      { id: 'snacks', name: 'Traditional Snacks', icon: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'msc1', name: 'Organic Premium Phool Makhana', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Farms', weight: '250 g', price: 199, oldPrice: 250, eta: '14 mins', badge: 'Fresh', tags: ['Gluten Free', 'High Protein'], category: 'makhana' },
      { id: 'msc2', name: 'Spicy Roasted Makhana Snacks', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Farms', weight: '100 g', price: 120, oldPrice: 150, eta: '14 mins', tags: ['Crispy', 'Healthy'], category: 'makhana' },
      { id: 'msc3', name: 'Mithila Homemade Anarsa Sweets', img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Rasoi', weight: '500 g', price: 250, oldPrice: 300, eta: '14 mins', tags: ['Homemade', 'Sugar Glazed'], category: 'snacks' }
    ]
  },
  'Mithila Lac Bangles': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&auto=format&fit=crop&q=60' },
      { id: 'bridal', name: 'Bridal Lahathi', icon: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&auto=format&fit=crop&q=60' },
      { id: 'daily', name: 'Daily Wear', icon: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'mlb1', name: 'Traditional Mithila Bridal Lahathi Set', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Shringar', weight: '1 Set', price: 599, oldPrice: 799, eta: '14 mins', badge: 'Bridal Special', tags: ['Pure Lac', 'Stone Work'], category: 'bridal' },
      { id: 'mlb2', name: 'Multicolored Daily Wear Lac Bangles', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Shringar', weight: '12 pcs', price: 299, oldPrice: 399, eta: '14 mins', tags: ['Lightweight', 'Durable'], category: 'daily' },
      { id: 'mlb3', name: 'Premium Designer Lac Kada Pair', img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Shringar', weight: '2 pcs', price: 399, oldPrice: 499, eta: '14 mins', tags: ['Designer Kada', 'Gold Accents'], category: 'daily' }
    ]
  },
  'Mithila Handcrafted Items': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=100&auto=format&fit=crop&q=60' },
      { id: 'sikki', name: 'Sikki Crafts', icon: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=100&auto=format&fit=crop&q=60' },
      { id: 'terracotta', name: 'Terracotta & Clay', icon: 'https://images.unsplash.com/photo-1609137144813-7d722edbd48e?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'mhi1', name: 'Handwoven Sikki Grass Basket (Mauni)', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=60', brand: 'Sikki Art', weight: '1 Unit', price: 349, oldPrice: 450, eta: '14 mins', badge: 'Handmade', tags: ['Eco-friendly', 'Traditional'], category: 'sikki' },
      { id: 'mhi2', name: 'Sikki Grass Sun God Wall Hanging', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=300&auto=format&fit=crop&q=60', brand: 'Sikki Art', weight: '1 Unit', price: 299, oldPrice: 399, eta: '14 mins', tags: ['Vibrant Colors', 'Decorative'], category: 'sikki' },
      { id: 'mhi3', name: 'Terracotta Mithila Painted Diya Pot', img: 'https://images.unsplash.com/photo-1609137144813-7d722edbd48e?w=300&auto=format&fit=crop&q=60', brand: 'Clay & Colors', weight: '1 pc', price: 199, oldPrice: 299, eta: '14 mins', tags: ['Handpainted', 'Festive'], category: 'terracotta' }
    ]
  },
  'Mithila Pooja Needs': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1609137144813-7d722edbd48e?w=100&auto=format&fit=crop&q=60' },
      { id: 'samagri', name: 'Pooja Samagri', icon: 'https://images.unsplash.com/photo-1609137144813-7d722edbd48e?w=100&auto=format&fit=crop&q=60' },
      { id: 'dhoop', name: 'Dhoop & Incense', icon: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'mpn1', name: 'Mithila Traditional Pooja Samagri Kit', img: 'https://images.unsplash.com/photo-1609137144813-7d722edbd48e?w=300&auto=format&fit=crop&q=60', brand: 'Punya Pooja', weight: '1 Kit', price: 499, oldPrice: 599, eta: '14 mins', badge: 'Devotional', tags: ['Complete Kit', 'Pure Materials'], category: 'samagri' },
      { id: 'mpn2', name: 'Handmade Cow Dung Dhoop Batti', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=60', brand: 'Punya Pooja', weight: '50 sticks', price: 99, oldPrice: 120, eta: '14 mins', tags: ['Natural Aroma', 'Chemical Free'], category: 'dhoop' },
      { id: 'mpn3', name: 'Pure Brass Aarti Diya with Handle', img: 'https://images.unsplash.com/photo-1609137144813-7d722edbd48e?w=300&auto=format&fit=crop&q=60', brand: 'Brass Crafts', weight: '1 Unit', price: 180, oldPrice: 250, eta: '14 mins', tags: ['High Quality', 'Heavy Base'], category: 'samagri' }
    ]
  },
  'Mithila Books & Panchang': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&auto=format&fit=crop&q=60' },
      { id: 'panchang', name: 'Panchangs', icon: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&auto=format&fit=crop&q=60' },
      { id: 'books', name: 'Literature & Poetry', icon: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'mbp1', name: 'Vidyapati Mithila Panchang (Latest)', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&q=60', brand: 'Vidyapati Press', weight: '1 Book', price: 80, oldPrice: 100, eta: '14 mins', badge: 'Must Have', tags: ['Latest Edition', 'Accurate'], category: 'panchang' },
      { id: 'mbp2', name: 'Maithili Folk Tales Book', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Academy', weight: '1 Book', price: 150, oldPrice: 180, eta: '14 mins', tags: ['Illustrated', 'Children Friendly'], category: 'books' },
      { id: 'mbp3', name: 'Mahakavi Vidyapati Geetanjali', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Academy', weight: '1 Book', price: 200, oldPrice: 250, eta: '14 mins', tags: ['Poetry', 'Maithili Classics'], category: 'books' }
    ]
  },
  'Mithila Achaar': {
    subcategories: [
      { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=100&auto=format&fit=crop&q=60' },
      { id: 'mango', name: 'Mango Pickle', icon: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=100&auto=format&fit=crop&q=60' },
      { id: 'chilli', name: 'Chilli & Garlic', icon: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=100&auto=format&fit=crop&q=60' }
    ],
    products: [
      { id: 'ma1', name: 'Mithila Special Sun-dried Mango Pickle', img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Rasoi', weight: '400 g', price: 249, oldPrice: 299, eta: '14 mins', badge: 'Homemade', tags: ['Spicy & Tangy', 'Traditional Method'], category: 'mango' },
      { id: 'ma2', name: 'Spicy Mithila Lal Mirch (Stuffed Red Chilli) Achaar', img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Rasoi', weight: '350 g', price: 199, oldPrice: 249, eta: '14 mins', tags: ['Stuffed', 'Very Spicy'], category: 'chilli' },
      { id: 'ma3', name: 'Traditional Garlic-Ginger Homemade Pickle', img: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Rasoi', weight: '400 g', price: 180, oldPrice: 220, eta: '14 mins', tags: ['Rich Taste', 'Digestive'], category: 'chilli' }
    ]
  }
};

const getCategoryData = (categoryName) => {
  if (DYNAMIC_DATA[categoryName]) {
    return DYNAMIC_DATA[categoryName];
  }

  // Generates generic fallback elements matching the styling system perfectly
  const defaultSubcategories = [
    { id: 'all', name: 'All', icon: 'https://images.unsplash.com/photo-1610832958506-ee5633619144?w=100&auto=format&fit=crop&q=60' },
    { id: 'premium', name: 'Premium Range', icon: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=100&auto=format&fit=crop&q=60' },
    { id: 'standard', name: 'Standard Range', icon: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=100&auto=format&fit=crop&q=60' }
  ];

  const generatedProducts = [
    { id: `gen-${categoryName}-1`, name: `Premium ${categoryName} Pack`, img: 'https://images.unsplash.com/photo-1610832958506-ee5633619144?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Brand', weight: '1 Unit', price: 199, oldPrice: 249, eta: '14 mins', tags: ['Bestseller'], category: 'premium' },
    { id: `gen-${categoryName}-2`, name: `Standard ${categoryName} Pack`, img: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?w=300&auto=format&fit=crop&q=60', brand: 'Mithila Brand', weight: '1 Unit', price: 99, oldPrice: 129, eta: '14 mins', tags: ['Value Buy'], category: 'standard' }
  ];

  return {
    subcategories: defaultSubcategories,
    products: generatedProducts
  };
};

const QuickShopSubcategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categoryName = location.state?.category || 'Fruits & Vegetables';

  // Get dynamic category structure
  const categoryData = getCategoryData(categoryName);
  
  const subCategories = categoryData.subcategories;
  const productsList = categoryData.products;

  const [activeSub, setActiveSub] = useState('all');
  const [favorites, setFavorites] = useState([]);

  // Reset active subcategory when categoryName changes
  useEffect(() => {
    setActiveSub('all');
  }, [categoryName]);

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleProductClick = (product) => {
    const discountPct = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) + '% OFF';
    navigate('/vendor/product-detail', {
      state: {
        product: {
          ...product,
          image: product.img,
          discount: discountPct,
          rating: 4.5,
          ratingCount: 42,
          category: categoryName
        }
      }
    });
  };

  const filteredProducts = activeSub === 'all' 
    ? productsList 
    : productsList.filter(p => p.category === activeSub);

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans select-none">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-2 flex items-center justify-between shadow-3xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-1 active:scale-95 text-gray-800 transition-transform"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
          <div className="flex flex-col">
            <h1 className="text-[16px] font-bold text-gray-900 leading-tight">
              {categoryName}
            </h1>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
              Delivering to : <span className="text-gray-500 font-medium truncate max-w-[150px]">Indrapuri Colony, Indore</span>
              <ChevronDown size={10} />
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-50 rounded-full text-gray-700">
            <Search size={20} strokeWidth={2.2} />
          </button>
          <button className="p-2 hover:bg-gray-50 rounded-full text-gray-700">
            <Share2 size={20} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Filters & Sort Header */}
      <div className="bg-white border-b border-gray-100/80 px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar shadow-3xs">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200/80 rounded-full text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          <SlidersHorizontalIcon /> Filters <ChevronDown size={10} />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200/80 rounded-full text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          Sort <ChevronDown size={10} />
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200/80 rounded-full text-[11px] font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          Type <ChevronDown size={10} />
        </button>
      </div>

      {/* Main Dual-Column Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Subcategories Sidebar */}
        <div className="w-[24%] bg-gray-50/60 border-r border-gray-100 overflow-y-auto no-scrollbar h-[calc(100vh-105px)]">
          {subCategories.map((sub) => {
            const isActive = activeSub === sub.id;
            return (
              <div
                key={sub.id}
                onClick={() => setActiveSub(sub.id)}
                className={`py-3.5 px-1 flex flex-col items-center gap-1.5 cursor-pointer relative transition-all ${
                  isActive ? 'bg-white' : 'bg-transparent'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#1FA54E] rounded-r-full" />
                )}
                <div className={`w-11 h-11 rounded-full overflow-hidden flex items-center justify-center border transition-all ${
                  isActive ? 'border-[#1FA54E]/25 bg-emerald-50/30' : 'border-gray-200/50 bg-white'
                }`}>
                  <img src={sub.icon} alt={sub.name} className="w-8 h-8 object-contain mix-blend-multiply" />
                </div>
                <span className={`text-[9.5px] text-center leading-tight font-semibold tracking-tight ${
                  isActive ? 'text-[#1FA54E] font-bold' : 'text-gray-500'
                }`}>
                  {sub.name}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Product Grid Area */}
        <div className="flex-1 bg-emerald-50/15 overflow-y-auto h-[calc(100vh-105px)] p-3 pb-24">
          
          {/* Promo banner */}
          <div className="bg-emerald-50/60 border border-emerald-100/60 rounded-xl p-3 flex justify-between items-center mb-4 relative overflow-hidden">
            <div className="z-10 flex flex-col">
              <span className="text-[12px] font-bold text-gray-900 leading-tight">
                Fresh & Premium Products
              </span>
              <span className="text-[9px] text-gray-500 font-medium mt-0.5">
                Nutritional goodness in every bite
              </span>
            </div>
            <img 
              src={productsList[0]?.img || "https://images.unsplash.com/photo-1610832958506-ee5633619144?w=150&auto=format&fit=crop&q=60"} 
              alt="Promo Basket" 
              className="w-16 h-12 object-contain mix-blend-multiply absolute right-2 bottom-1"
            />
          </div>

          {/* Grid list */}
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => {
              const isFav = favorites.includes(product.id);
              return (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="bg-white border border-gray-100/60 rounded-2xl p-2.5 flex flex-col relative shadow-2xs hover:shadow-xs cursor-pointer active:scale-[0.99] transition-transform"
                >
                  {/* Badge label like 'Season's Best' */}
                  {product.badge && (
                    <div className="absolute top-0 left-0 bg-[#FF6F3C] text-white text-[7.5px] font-bold px-2 py-0.5 rounded-tl-2xl rounded-br-lg z-10 shadow-3xs uppercase tracking-wider">
                      {product.badge}
                    </div>
                  )}

                  {/* Heart Favorite Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="absolute top-2.5 right-2.5 w-6 h-6 bg-white/95 backdrop-blur-xs rounded-full flex items-center justify-center shadow-xs border border-gray-100/30 z-10 active:scale-90 transition-transform"
                  >
                    <Heart 
                      size={11} 
                      className={`transition-colors ${isFav ? 'text-red-500 fill-red-500' : 'text-gray-400'}`} 
                    />
                  </button>

                  {/* Product Image Panel */}
                  <div className="h-24 w-full flex items-center justify-center p-1 relative mb-2">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                    
                    {/* Carousel Dots */}
                    <div className="absolute bottom-0 left-0 flex gap-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                      <div className="w-1 h-1 rounded-full bg-gray-300" />
                    </div>
                  </div>

                  {/* Weight Details */}
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="text-[10px] text-gray-500 font-bold border border-gray-200/60 px-1.5 py-0.5 rounded-md bg-gray-50/30">
                      {product.weight}
                    </span>
                    {product.subText && (
                      <span className="text-[9px] text-gray-400 font-semibold">{product.subText}</span>
                    )}
                  </div>

                  {/* Product Title */}
                  <h3 className="text-[11.5px] font-bold text-gray-900 leading-[1.3] line-clamp-2 h-7.5 mb-1.5">
                    {product.name}
                  </h3>

                  {/* Custom Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {product.tags.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="bg-[#FAF6EC] text-[#8C6239] text-[8px] font-bold px-1.5 py-0.5 rounded-md leading-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price and Add CTA bar */}
                  <div className="mt-auto pt-2 flex items-center justify-between border-t border-gray-50">
                    <div className="flex flex-col">
                      <span className="text-[14px] font-bold text-gray-950 leading-none">
                        ₹{product.price}
                      </span>
                      {product.oldPrice && (
                        <span className="text-[10px] text-gray-400 line-through mt-0.5">
                          ₹{product.oldPrice}
                        </span>
                      )}
                    </div>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to cart local storage flow
                        const cart = JSON.parse(localStorage.getItem('userCart') || '[]');
                        cart.push({ ...product, image: product.img, cartId: Date.now(), qty: 1 });
                        localStorage.setItem('userCart', JSON.stringify(cart));
                        window.dispatchEvent(new Event('cartUpdated'));
                      }}
                      className="px-3.5 py-1 border border-[#1FA54E] bg-white rounded-lg text-[11px] font-bold text-[#1FA54E] hover:bg-emerald-50/30 active:scale-95 transition-all shadow-3xs uppercase"
                    >
                      Add
                    </button>
                  </div>

                  {/* ETA & Stock status strip */}
                  <div className="flex items-center gap-2 mt-2 pt-1 border-t border-dashed border-gray-100 text-[8.5px] text-gray-400 font-semibold">
                    <span className="flex items-center gap-0.5 text-emerald-600">
                      ⏱ {product.eta}
                    </span>
                    {product.stock && (
                      <span className="text-rose-500 font-bold bg-rose-50/50 px-1 rounded-sm">
                        {product.stock}
                      </span>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
};

// Simple inline icon
const SlidersHorizontalIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
  </svg>
);

export default QuickShopSubcategory;
