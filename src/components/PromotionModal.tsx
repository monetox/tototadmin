import React from 'react';
import { MenuItem } from '../types';
import { X, Sparkles, Check } from 'lucide-react';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  onSelectFeaturedDish: (dishId: string) => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  onSelectFeaturedDish
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FDFCF5] border border-[#1A1A1A]/15 rounded-md w-full max-w-lg p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700" />
            <h3 className="font-serif italic text-xl font-bold text-[#1A1A1A]">
              Featured Public Showcase Dishes
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-[12px] text-[#1A1A1A]/70 leading-relaxed">
          Select the signature items highlighted on the hero and bento section of the public website.
        </p>

        <div className="max-h-72 overflow-y-auto divide-y divide-[#1A1A1A]/8 border border-[#1A1A1A]/10 rounded bg-[#FAF8F0]">
          {menuItems.map(item => (
            <div
              key={item.id}
              onClick={() => onSelectFeaturedDish(item.id)}
              className="p-3 flex items-center justify-between hover:bg-[#FFFFFF] cursor-pointer transition-colors"
            >
              <div>
                <div className="font-bold text-[13px] text-[#1A1A1A]">{item.name}</div>
                <div className="text-[11px] text-[#1A1A1A]/60 font-mono">{item.price} ETB • {item.category}</div>
              </div>

              <button
                className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  item.isFeatured
                    ? 'bg-[#1A1A1A] text-[#FDFCF5]'
                    : 'bg-[#EFECE5] text-[#1A1A1A]/60 hover:bg-[#1A1A1A]/10'
                }`}
              >
                {item.isFeatured ? 'Featured ✓' : 'Set Featured'}
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] rounded text-[11px] font-bold uppercase tracking-wider"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
