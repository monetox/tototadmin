import React, { useState, useEffect } from 'react';
import { MenuItem, CategoryType } from '../types';
import { X, Utensils, DollarSign, Clock, Image as ImageIcon } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: Partial<MenuItem>) => void;
  itemToEdit: MenuItem | null;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  onSave,
  itemToEdit
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(450);
  const [category, setCategory] = useState<CategoryType>('specialties');
  const [image, setImage] = useState('');
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(15);
  const [isFeatured, setIsFeatured] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (itemToEdit) {
      setName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setPrice(itemToEdit.price);
      setCategory(itemToEdit.category);
      setImage(itemToEdit.image || '');
      setPrepTimeMinutes(itemToEdit.prepTimeMinutes || 15);
      setIsFeatured(!!itemToEdit.isFeatured);
      setAvailable(itemToEdit.available);
    } else {
      setName('');
      setDescription('');
      setPrice(450);
      setCategory('specialties');
      setImage('https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg');
      setPrepTimeMinutes(15);
      setIsFeatured(false);
      setAvailable(true);
    }
  }, [itemToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    onSave({
      name,
      description,
      price: Number(price),
      category,
      image,
      prepTimeMinutes: Number(prepTimeMinutes),
      isFeatured,
      available
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FDFCF5] border border-[#1A1A1A]/15 rounded-md w-full max-w-md p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
          <h3 className="font-serif italic text-xl font-bold text-[#1A1A1A]">
            {itemToEdit ? 'Edit Menu Dish' : 'Add New Menu Offering'}
          </h3>
          <button onClick={onClose} className="p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-[13px]">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
              Dish Title
            </label>
            <input
              required
              type="text"
              placeholder="e.g. Totot Special Kitfo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bento-input w-full px-3 py-2 rounded text-[13px]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
              Description / Ingredients
            </label>
            <textarea
              required
              rows={2}
              placeholder="Finely minced beef with seasoned butter, mitmita, served with ayib and gomen..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bento-input w-full px-3 py-2 rounded text-[13px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
                Price (ETB)
              </label>
              <input
                required
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="bento-input w-full px-3 py-2 rounded text-[13px] font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CategoryType)}
                className="bento-input w-full px-3 py-2 rounded text-[13px]"
              >
                <option value="specialties">Specialties</option>
                <option value="sides">Sides</option>
                <option value="drinks">Drinks & Coffee</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
              Image URL
            </label>
            <input
              type="text"
              placeholder="https://..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="bento-input w-full px-3 py-2 rounded text-[11px] font-mono"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="rounded text-[#1A1A1A]"
              />
              <span>Feature on Public Homepage</span>
            </label>

            <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider cursor-pointer">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
                className="rounded text-[#1A1A1A]"
              />
              <span>Available</span>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[#1A1A1A]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#1A1A1A]/20 hover:bg-[#EFECE5] rounded text-[11px] font-bold uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] rounded text-[11px] font-bold uppercase tracking-wider shadow-2xs"
            >
              Save Dish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
