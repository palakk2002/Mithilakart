/**
 * Reusable Marketplace Helper Functions
 */

/**
 * Detects the active marketplace tab based on the active route and local storage state.
 */
export const getCurrentMarketplaceTab = () => {
  if (localStorage.getItem('isFreshGroceryFlow') === 'true') {
    return 'groceries_fresh';
  }
  if (localStorage.getItem('isMithilakFlow') === 'true') {
    return 'mithilak';
  }
  if (window.location.pathname.includes('/quick-shop')) {
    return 'quick_shop';
  }
  return 'mithilakart';
};

/**
 * Checks if a product belongs to a specific marketplace tab.
 * Supports the listings structure as well as category fallback classification rules.
 */
export const productBelongsToTab = (product, tab) => {
  if (product.listings && product.listings.length > 0) {
    return product.listings.some(l => l.tab === tab);
  }
  if (product.tab) {
    return product.tab === tab;
  }
  
  if (tab === 'groceries_fresh') {
    return [
      'Fruits & Vegetables', 'Atta, Rice & Dal', 'Oil, Ghee & Masala', 'Dairy, Bread & Eggs', 
      'Cereals & Dry Fruits', 'Chicken, Meat & Fish', 'Instant & Frozen Food', 'Fruits & Veggies', 
      'Dairy & eggs', 'Staples', 'Beverages', 'Snacks', 'Masala & Oil', 'Frozen', 'Household', 
      'Fruits & Vegetables', 'fruits', 'veg', 'exotics', 'atta', 'rice', 'dal', 'oil', 'ghee', 
      'spices', 'milk', 'bread', 'eggs'
    ].includes(product.category) || 
      product.id?.startsWith('fv') || product.id?.startsWith('ard') || 
      product.id?.startsWith('ogm') || product.id?.startsWith('dbe');
  }
  
  if (tab === 'quick_shop') {
    return [
      'Electronics', 'Beauty', 'Stationery', 'Gifting', 'Electrical', 'Chips & Namkeens', 
      'Ice Creams', 'Drinks & Juices', 'Sweets & Chocolates', 'Tea, Coffee & Milk Drinks', 
      'Bakery & Biscuits', 'Sauces & Spreads', 'Snacks & Drinks', 'Beauty & Personal Care', 
      'Household, Stationery & Lifestyle', 'Mobiles & Electronics', 'chips', 'namkeen', 
      'tub', 'cone', 'soft', 'juice', 'choc', 'sweets', 'tea', 'coffee'
    ].includes(product.category) || 
      product.id?.startsWith('cn') || product.id?.startsWith('ic') || 
      product.id?.startsWith('dj') || product.id?.startsWith('sc') || 
      product.id?.startsWith('tcm') || product.id?.startsWith('bb') || 
      product.id?.startsWith('ss');
  }
  
  if (tab === 'mithilak') {
    return [
      'Mithila Festival & Cultural', 'Mithila Paridhan', 'Mithila Special Cuisines', 
      'Mithila Lac Bangles', 'Mithila Handcrafted Items', 'Mithila Pooja Needs', 
      'Mithila Books & Panchang', 'Mithila Achaar'
    ].includes(product.category) || 
      product.id?.startsWith('mfc') || product.id?.startsWith('mp') || 
      product.id?.startsWith('msc') || product.id?.startsWith('mlb') || 
      product.id?.startsWith('mhi') || product.id?.startsWith('mpn') || 
      product.id?.startsWith('mbp') || product.id?.startsWith('ma');
  }
  
  return true; // mithilakart or fallback default
};
