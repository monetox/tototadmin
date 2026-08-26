import React, { useState } from 'react';
import { MenuItem, CategoryType } from '../types';
import { 
  Plus, 
  Download, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Sparkles, 
  Eye, 
  EyeOff,
  LayoutGrid,
  List,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface MenuCMSViewProps {
  menuItems: MenuItem[];
  onToggleAvailability: (id: string) => void;
  onAddNewItem: () => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (id: string) => void;
  onExportJSON: () => void;
}

export const MenuCMSView: React.FC<MenuCMSViewProps> = ({
  menuItems,
  onToggleAvailability,
  onAddNewItem,
  onEditItem,
  onDeleteItem,
  onExportJSON
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryType>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'unavailable'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const activeCount = menuItems.filter(i => i.available).length;
  const soldOutCount = menuItems.filter(i => !i.available).length;

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'available' ? item.available :
      !item.available;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/50 mb-1">
            Menu Catalog & Availability Controls
          </div>
          <h2 className="font-serif italic text-3xl font-semibold text-[#1A1A1A]">
            Culinary Offerings & Live Toggles
          </h2>
          <p className="text-[12px] text-[#1A1A1A]/60 mt-1">
            Toggle dishes ON or OFF instantly. Changes reflect immediately on the consumer dining site.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Quick Stats Pills */}
          <div className="flex items-center gap-1.5 bg-[#FAF8F0] border border-[#1A1A1A]/15 px-3 py-1.5 rounded-md text-[11px] font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
            <span className="font-bold text-[#1A1A1A]">{activeCount}</span>
            <span className="text-[#1A1A1A]/60">Serving</span>
            <span className="text-[#1A1A1A]/30">|</span>
            <span className="inline-block w-2 h-2 rounded-full bg-red-500"></span>
            <span className="font-bold text-[#1A1A1A]">{soldOutCount}</span>
            <span className="text-[#1A1A1A]/60">Off</span>
          </div>

          <button
            onClick={onExportJSON}
            className="px-3.5 py-2 rounded-md border border-[#1A1A1A]/15 hover:bg-[#EFECE5] text-[#1A1A1A] text-[11px] font-bold tracking-wider uppercase flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <button
            onClick={onAddNewItem}
            className="px-4 py-2 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] rounded-md text-[11px] font-bold tracking-[0.18em] uppercase transition-all shadow-2xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Dish</span>
          </button>
        </div>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category & Status Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'specialties', label: 'Specialties' },
            { id: 'sides', label: 'Sides' },
            { id: 'drinks', label: 'Drinks & Coffee' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#1A1A1A] text-[#FDFCF5] shadow-2xs'
                  : 'bg-[#FAF8F0] text-[#1A1A1A]/70 hover:bg-[#EFECE5] border border-[#1A1A1A]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}

          <div className="hidden sm:block h-4 w-px bg-[#1A1A1A]/20 mx-1"></div>

          {/* Status Quick Filter */}
          <button
            onClick={() => setStatusFilter(statusFilter === 'available' ? 'all' : 'available')}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border transition-all ${
              statusFilter === 'available'
                ? 'bg-emerald-800 text-white border-emerald-900 shadow-2xs'
                : 'bg-[#FAF8F0] text-emerald-800 border-emerald-300 hover:bg-emerald-50'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Active Only ({activeCount})</span>
          </button>

          <button
            onClick={() => setStatusFilter(statusFilter === 'unavailable' ? 'all' : 'unavailable')}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 border transition-all ${
              statusFilter === 'unavailable'
                ? 'bg-red-800 text-white border-red-900 shadow-2xs'
                : 'bg-[#FAF8F0] text-red-800 border-red-300 hover:bg-red-50'
            }`}
          >
            <AlertCircle className="w-3 h-3" />
            <span>Sold Out Only ({soldOutCount})</span>
          </button>
        </div>

        {/* View Mode & Search */}
        <div className="flex items-center gap-3">
          {/* Grid vs Table Layout Switcher */}
          <div className="flex items-center bg-[#EFECE5] p-0.5 rounded-md border border-[#1A1A1A]/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-[#FFFFFF] text-[#1A1A1A] shadow-2xs' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'}`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-[#FFFFFF] text-[#1A1A1A] shadow-2xs' : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'}`}
              title="Quick Toggle Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-[#1A1A1A]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dish title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bento-input pl-9 pr-3 py-1.5 rounded-md text-[12px] w-full placeholder-[#1A1A1A]/40"
            />
          </div>
        </div>
      </div>

      {/* Grid Mode */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => (
            <div 
              key={item.id}
              className={`bento-card p-5 rounded-md flex flex-col justify-between shadow-2xs transition-all ${
                !item.available ? 'opacity-75 bg-[#F4F1EA] border-dashed border-[#1A1A1A]/30' : 'bg-[#FAF8F0]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/60 bg-[#EFECE5] px-2 py-0.5 rounded border border-[#1A1A1A]/10">
                    {item.category}
                  </span>

                  <div className="font-mono font-bold text-[16px] text-[#1A1A1A]">
                    {item.price} <span className="text-[11px] font-normal text-[#1A1A1A]/60">ETB</span>
                  </div>
                </div>

                <h3 className="font-serif font-bold text-[18px] text-[#1A1A1A] mb-1.5 flex items-center gap-2">
                  <span>{item.name}</span>
                  {item.isFeatured && (
                    <span className="px-1.5 py-0.5 rounded text-[8px] bg-amber-200 text-amber-950 font-bold uppercase">
                      Featured
                    </span>
                  )}
                </h3>

                <p className="text-[12px] text-[#1A1A1A]/70 leading-relaxed line-clamp-3 mb-4 font-normal">
                  {item.description}
                </p>
              </div>

              {/* Bottom Controls with Switch Toggle */}
              <div className="pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                {/* Visual On/Off Switch Toggle */}
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={item.available}
                    onClick={() => onToggleAvailability(item.id)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      item.available ? 'bg-emerald-600' : 'bg-[#1A1A1A]/30'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        item.available ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${item.available ? 'text-emerald-800' : 'text-red-700'}`}>
                    {item.available ? 'Available (ON)' : 'Sold Out (OFF)'}
                  </span>
                </div>

                {/* Edit and Delete Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditItem(item)}
                    className="p-1.5 rounded hover:bg-[#EFECE5] text-[#1A1A1A]/80 hover:text-[#1A1A1A] transition-colors"
                    title="Edit Dish"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteItem(item.id)}
                    className="p-1.5 rounded hover:bg-red-50 text-red-700 transition-colors"
                    title="Delete Dish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick-Toggle Table Mode */}
      {viewMode === 'table' && (
        <div className="bento-card rounded-md overflow-hidden shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="bg-[#EFECE5]/70 border-b border-[#1A1A1A]/10 text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 font-sans">
                  <th className="py-3.5 px-4 font-bold">Dish Name</th>
                  <th className="py-3.5 px-4 font-bold">Category</th>
                  <th className="py-3.5 px-4 font-bold">Price (ETB)</th>
                  <th className="py-3.5 px-4 font-bold">Quick Toggle Availability</th>
                  <th className="py-3.5 px-4 text-right font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A1A]/8">
                {filteredItems.map(item => (
                  <tr key={item.id} className={`hover:bg-[#FFFFFF] transition-colors ${!item.available ? 'bg-[#F4F1EA]/60' : ''}`}>
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">
                      <div className="flex items-center gap-2">
                        <span>{item.name}</span>
                        {item.isFeatured && (
                          <span className="px-1.5 py-0.5 rounded text-[8px] bg-amber-200 text-amber-950 font-bold uppercase">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#1A1A1A]/60 font-normal line-clamp-1 max-w-sm">
                        {item.description}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/60 bg-[#EFECE5] px-2 py-0.5 rounded border border-[#1A1A1A]/10">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold">
                      {item.price} ETB
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={item.available}
                          onClick={() => onToggleAvailability(item.id)}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            item.available ? 'bg-emerald-600' : 'bg-[#1A1A1A]/30'
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                              item.available ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${item.available ? 'text-emerald-800' : 'text-red-700'}`}>
                          {item.available ? 'Serving (ON)' : 'Off (Sold Out)'}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onEditItem(item)}
                          className="p-1.5 rounded hover:bg-[#EFECE5] text-[#1A1A1A]/80 hover:text-[#1A1A1A]"
                          title="Edit Dish"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteItem(item.id)}
                          className="p-1.5 rounded hover:bg-red-50 text-red-700"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
