import React, { useRef } from 'react';
import { Copy, RefreshCw, Share2 } from 'lucide-react';
import { WishFormData } from '../types';

interface WishCardProps {
  message: string;
  data: WishFormData;
  onReset: () => void;
}

const WishCard: React.FC<WishCardProps> = ({ message, data, onReset }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    alert('Wish copied to clipboard! 💌');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `A Valentine for ${data.receiverName}`,
        text: message,
      }).catch(console.error);
    } else {
      handleCopy();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto relative z-10 perspective-1000">
      <div 
        ref={cardRef}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden relative transform transition-all hover:rotate-1"
      >
        {/* Decorative Header Image Placeholder - using a nice gradient instead of external image to keep it clean, or a solid vibrant block */}
        <div className="h-32 bg-gradient-to-r from-rose-400 to-pink-500 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             <h3 className="text-4xl font-cursive text-white drop-shadow-md z-10">Happy Valentine's Day</h3>
        </div>

        <div className="p-8 text-center relative">
          {/* Stamp/Badge */}
          <div className="absolute -top-6 right-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-xs font-bold text-yellow-900 shadow-md border-2 border-white transform rotate-12">
            LOVE
          </div>

          <div className="mb-6">
            <p className="text-sm font-bold text-rose-400 uppercase tracking-widest mb-1">To My Dearest</p>
            <h2 className="text-3xl font-serif text-gray-800">{data.receiverName}</h2>
          </div>

          <div className="prose prose-rose mx-auto mb-8">
            <p className="text-lg text-gray-700 leading-relaxed italic font-medium">
              "{message}"
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
             <div className="h-px bg-gray-200 flex-1"></div>
             <p className="text-sm text-gray-400 font-serif px-2">With love,</p>
             <div className="h-px bg-gray-200 flex-1"></div>
          </div>
          <p className="text-xl font-cursive text-rose-600 mt-2">{data.senderName}</p>
        </div>

        {/* Action Bar */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-100">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-rose-500 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            New Wish
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={handleCopy}
              className="p-2 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all"
              title="Copy Text"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 rounded-full bg-rose-500 border border-rose-500 text-white hover:bg-rose-600 shadow-sm transition-all"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishCard;