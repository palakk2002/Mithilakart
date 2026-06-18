import React from 'react';
import { ArrowLeft, Star, MessageSquare, ThumbsUp, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const MyReviews = () => {
  const navigate = useNavigate();

  const reviews = [
    {
      id: 1,
      product: 'Premium Gold Finish Watch',
      rating: 5,
      comment: 'Absolutely stunning watch! The gold finish is very premium and it looks much better in person.',
      date: '15 Apr 2026',
      likes: 12
    },
    {
      id: 2,
      product: 'Silver Geometric Earring',
      rating: 4,
      comment: 'Very beautiful design, though a bit smaller than expected.',
      date: '10 Apr 2026',
      likes: 5
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-[var(--card-bg)] min-h-screen text-[var(--card-text)]"
    >
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[var(--card-bg)]/90 backdrop-blur-md border-b border-[var(--card-border)] p-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="hover:text-[var(--color-gold)] transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black uppercase tracking-widest">My Reviews</h1>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
        <div className="bg-black/20 border border-[var(--card-border)] rounded-2xl p-6 flex items-center justify-between">
           <div className="text-center flex-1 border-r border-[var(--card-border)]">
              <h3 className="text-3xl font-black text-[var(--color-gold)]">4.5</h3>
              <div className="flex justify-center gap-0.5 my-1">
                 {[1,2,3,4].map(i => <Star key={i} size={10} className="text-[var(--color-gold)] fill-[var(--color-gold)]" />)}
                 <Star size={10} className="text-gray-600" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-[var(--card-sub)]">Overall Rating</p>
           </div>
           <div className="text-center flex-1">
              <h3 className="text-3xl font-black text-[var(--card-text)]">{reviews.length}</h3>
              <div className="flex justify-center gap-0.5 my-1">
                 <MessageSquare size={10} className="text-blue-500 fill-blue-500" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-[var(--card-sub)]">Total Reviews</p>
           </div>
        </div>

        <div className="space-y-4">
           {reviews.map((rev) => (
             <div key={rev.id} className="bg-black/20 border border-[var(--card-border)] rounded-2xl p-5 space-y-3 group hover:border-[var(--color-gold)]/30 transition-all">
                <div className="flex justify-between items-start">
                   <div className="space-y-1">
                      <h3 className="text-xs font-black group-hover:text-[var(--color-gold)] transition-colors">{rev.product}</h3>
                      <div className="flex gap-0.5">
                         {[...Array(5)].map((_, i) => (
                           <Star key={i} size={12} className={i < rev.rating ? "text-[var(--color-gold)] fill-[var(--color-gold)]" : "text-gray-700"} />
                         ))}
                      </div>
                   </div>
                   <button className="text-[var(--card-sub)]">
                      <MoreVertical size={16} />
                   </button>
                </div>
                
                <p className="text-xs text-[var(--card-sub)] font-bold italic">"{rev.comment}"</p>
                
                <div className="flex items-center justify-between pt-2 border-t border-[var(--card-border)]/50">
                   <span className="text-[10px] font-black text-[var(--card-sub)] uppercase tracking-widest">{rev.date}</span>
                   <div className="flex items-center gap-1.5 text-blue-500">
                      <ThumbsUp size={12} />
                      <span className="text-[10px] font-black">{rev.likes}</span>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MyReviews;
