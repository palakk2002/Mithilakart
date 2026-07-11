/**
 * Sidebar Component
 * Professional sidebar navigation for seller dashboard.
 */
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Package, PlusCircle, Warehouse, ShoppingCart,
  RotateCcw, Users, Star, Ticket, Bell, BarChart3, Wallet,
  Settings, LogOut, ChevronLeft, ChevronRight, Store,
} from 'lucide-react';
import { useSellerAuth } from '../../context/SellerAuthContext';
import { SIDEBAR_MENU } from '../../constants';

const iconComponents = {
  LayoutDashboard, Package, PlusCircle, Warehouse, ShoppingCart,
  RotateCcw, Users, Star, Ticket, Bell, BarChart3, Wallet,
  Settings, LogOut, Store,
};

const Sidebar = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { seller, logout } = useSellerAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/seller/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 hidden lg:flex flex-col
        bg-[var(--seller-sidebar-bg,#fff)] border-r border-[var(--seller-border-light,#F3F4F6)]
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-20' : 'w-[272px]'}
      `}
    >
      {/* Header / Logo Area */}
      <div className={`h-16 flex items-center border-b border-[var(--seller-border-light,#F3F4F6)] ${collapsed ? 'justify-center px-2' : 'px-6'}`}>
        {collapsed ? (
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
            <Store size={20} className="text-white" />
          </div>
        ) : (
          <Link to="/seller/dashboard" className="flex items-center gap-3 group">
            <img 
              src="/mthibg.png" 
              alt="Mithilakart" 
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 overflow-y-auto seller-no-scrollbar">
        {SIDEBAR_MENU.map((group, gIdx) => (
          <div key={gIdx} className={gIdx > 0 ? 'mt-6' : ''}>
            {/* Group Label */}
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                {group.group}
              </p>
            )}

            <div className="space-y-1">
              {group.items.map((item) => {
                const IconComponent = iconComponents[item.icon];
                const active = isActive(item.path);

                // Logout special case
                if (item.path === '#logout') {
                  return (
                    <button
                      key={item.name}
                      onClick={handleLogout}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                        transition-all duration-200 group
                        text-red-400 hover:bg-red-950/30 hover:text-red-500
                        ${collapsed ? 'justify-center' : ''}
                      `}
                      title={collapsed ? item.name : undefined}
                    >
                      {IconComponent && <IconComponent size={20} className="flex-shrink-0" />}
                      {!collapsed && <span>{item.name}</span>}
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                      transition-all duration-200 group relative
                      ${collapsed ? 'justify-center' : ''}
                      ${active
                        ? 'bg-slate-800 text-white shadow-none border border-slate-700'
                        : 'text-slate-400 hover:bg-slate-900/60 hover:text-white'
                      }
                    `}
                    title={collapsed ? item.name : undefined}
                  >
                    {IconComponent && (
                      <IconComponent
                        size={20}
                        className={`flex-shrink-0 ${active ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}
                      />
                    )}
                    {!collapsed && <span>{item.name}</span>}

                    {/* Tooltip for collapsed mode */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg
                                      opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {item.name}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Sidebar Footer — Seller Info */}
      <div className={`border-t border-[var(--seller-border-light,#F3F4F6)] p-4 ${collapsed ? 'px-2' : ''}`}>
        {collapsed ? (
          <div className="w-10 h-10 mx-auto bg-slate-900 rounded-xl flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {seller?.name?.charAt(0) || 'S'}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-3 bg-slate-900/60 rounded-xl">
            <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">
                {seller?.name?.charAt(0) || 'S'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {seller?.storeName || 'Seller Store'}
              </p>
              <p className="text-[10px] text-green-500 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full seller-pulse-dot" />
                Verified Seller
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={onToggle}
        className="absolute top-20 -right-3 w-6 h-6 bg-slate-900 border border-slate-800 rounded-full
                   flex items-center justify-center shadow-sm hover:shadow-md transition-all
                   hover:bg-slate-800 hover:border-slate-700 z-50"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={14} className="text-slate-400" /> : <ChevronLeft size={14} className="text-slate-400" />}
      </button>
    </aside>
  );
};

export default Sidebar;
