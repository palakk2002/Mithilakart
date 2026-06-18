import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MenuItem = ({ icon: Icon, title, path, color = "text-[var(--card-text)]", textColor = "text-[var(--card-text)]" }) => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(path)}
      className="w-full flex items-center justify-between py-4 px-2 hover:bg-black/5 dark:hover:bg-white/5 transition-colors border-b border-[var(--card-border)] last:border-0 group"
    >
      <div className="flex items-center gap-4">
        <div className={`${color} group-hover:scale-110 transition-transform`}>
          <Icon size={22} strokeWidth={2} />
        </div>
        <span className={`text-sm font-black tracking-tight ${textColor}`}>{title}</span>
      </div>
      <ChevronRight size={18} className="text-gray-400 group-hover:text-[var(--color-gold)] transition-colors" />
    </button>
  );
};

export default MenuItem;
