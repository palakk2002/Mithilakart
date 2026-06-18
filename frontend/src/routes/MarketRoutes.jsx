import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import VendorLayout from '../layouts/VendorLayout';
import Home from '../pages/vendor/Home';
import Login from '../pages/vendor/Login';
import Signup from '../pages/vendor/Signup';
import Products from '../pages/vendor/Products';
import ProductDetail from '../pages/vendor/ProductDetail';
import Cart from '../pages/vendor/Cart';
import Bag from '../pages/vendor/Bag';
import Profile from '../pages/vendor/Profile';
import Wallet from '../pages/vendor/Wallet';
import Menu from '../pages/vendor/Menu';
import Categories from '../pages/vendor/Categories';
import CategoryProducts from '../pages/vendor/CategoryProducts';
import ToysLanding from '../pages/vendor/ToysLanding';
import BeautyLanding from '../pages/vendor/BeautyLanding';
import Checkout from '../pages/vendor/Checkout';
import AllOffers from '../pages/vendor/AllOffers';
import DealsPage from '../pages/vendor/DealsPage';
import Search from '../pages/vendor/Search';
import ContinueShopping from '../pages/vendor/ContinueShopping';
import TermsOfUse from '../pages/vendor/TermsOfUse';
import PrivacyPolicy from '../pages/vendor/PrivacyPolicy';
import CancellationReturns from '../pages/vendor/CancellationReturns';
import ShippingPolicy from '../pages/vendor/ShippingPolicy';
import QuickShop from '../pages/vendor/QuickShop';
import QuickShopSubcategory from '../pages/vendor/QuickShopSubcategory';
import Mithilak from '../pages/vendor/Mithilak';


// Profile Sub-pages
import EditProfile from '../pages/vendor/profile/EditProfile';
import MyOrders from '../pages/vendor/profile/MyOrders';
import Wishlist from '../pages/vendor/profile/Wishlist';
import Coupons from '../pages/vendor/profile/Coupons';
import HelpCenter from '../pages/vendor/profile/HelpCenter';
import SavedAddresses from '../pages/vendor/profile/SavedAddresses';
import SavedCards from '../pages/vendor/profile/SavedCards';
import NotificationSettings from '../pages/vendor/profile/NotificationSettings';
import MyReviews from '../pages/vendor/profile/MyReviews';
import QuestionsAnswers from '../pages/vendor/profile/QuestionsAnswers';
import OrderDetail from '../pages/vendor/profile/OrderDetail';

const MarketRoutes = () => {
  return (
    <Routes>
      {/* Auth routes without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/terms" element={<TermsOfUse />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/cancellation-returns" element={<CancellationReturns />} />
      <Route path="/shipping" element={<ShippingPolicy />} />

      {/* Pages with layout */}
      <Route element={<VendorLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/bag" element={<Bag />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        
        {/* Profile Sub-routes */}
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/orders" element={<MyOrders />} />
        <Route path="/profile/orders/:orderId" element={<OrderDetail />} />
        <Route path="/profile/wishlist" element={<Wishlist />} />
        <Route path="/profile/coupons" element={<Coupons />} />
        <Route path="/profile/help-center" element={<HelpCenter />} />
        <Route path="/profile/addresses" element={<SavedAddresses />} />
        <Route path="/profile/cards" element={<SavedCards />} />
        <Route path="/profile/notifications" element={<NotificationSettings />} />
        <Route path="/profile/reviews" element={<MyReviews />} />
        <Route path="/profile/questions" element={<QuestionsAnswers />} />

        <Route path="/wallet" element={<Wallet />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/category-products" element={<CategoryProducts />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/toys" element={<ToysLanding />} />
        <Route path="/beauty" element={<BeautyLanding />} />
        <Route path="/continue-shopping/:productId" element={<ContinueShopping />} />
        <Route path="/all-offers" element={<AllOffers />} />
        <Route path="/quick-shop" element={<QuickShop />} />
        <Route path="/quick-shop/category" element={<QuickShopSubcategory />} />
        <Route path="/mithilak" element={<Mithilak />} />
        <Route path="/fresh-grocery" element={<QuickShop />} />
      </Route>

      {/* Redirects */}
      <Route path="/" element={<Navigate to="home" replace />} />
    </Routes>
  );
};

export default MarketRoutes;
