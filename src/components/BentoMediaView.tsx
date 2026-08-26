import React, { useState } from 'react';
import { MediaItem } from '../types';
import { 
  Plus, 
  Sparkles, 
  Trash2, 
  Heart, 
  Image as ImageIcon, 
  Video, 
  ExternalLink 
} from 'lucide-react';

interface BentoMediaViewProps {
  mediaItems: MediaItem[];
  onToggleFeatured: (id: string) => void;
  onAddMedia: (item: Omit<MediaItem, 'id' | 'likes'>) => void;
  onDeleteMedia: (id: string) => void;
}

export const BentoMediaView: React.FC<BentoMediaViewProps> = ({
  mediaItems,
  onToggleFeatured,
  onAddMedia,
  onDeleteMedia
}) => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState<'photo' | 'video'>('photo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !imageUrl) return;
    onAddMedia({
      title,
      caption,
      imageUrl,
      type,
      featuredOnBento: true,
      author: 'Totot Management'
    });
    setTitle('');
    setCaption('');
    setImageUrl('');
    setIsAddOpen(false);
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/50 mb-1">
            Visual Storytelling & Google Maps Highlights
          </div>
          <h2 className="font-serif italic text-3xl font-semibold text-[#1A1A1A]">
            Atmosphere & Bento Media
          </h2>
          <p className="text-[12px] text-[#1A1A1A]/60 mt-1">
            Curate photos and short clips featured on the public consumer showcase.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="px-4 py-2.5 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] rounded-md text-[11px] font-bold tracking-[0.18em] uppercase transition-all shadow-2xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add Media</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaItems.map(item => (
          <div key={item.id} className="bento-card rounded-md overflow-hidden flex flex-col justify-between shadow-2xs group">
            <div className="relative aspect-video bg-[#1A1A1A] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 right-3 bg-[#1A1A1A]/80 text-[#FDFCF5] text-[10px] font-bold uppercase px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
                {item.type === 'photo' ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                <span>{item.type}</span>
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-[17px] text-[#1A1A1A] mb-1">
                  {item.title}
                </h3>
                <p className="text-[12px] text-[#1A1A1A]/70 leading-relaxed mb-3">
                  {item.caption}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => onToggleFeatured(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.featuredOnBento 
                      ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                      : 'bg-[#EFECE5] text-[#1A1A1A]/60'
                  }`}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>{item.featuredOnBento ? 'Featured on Bento' : 'Hidden'}</span>
                </button>

                <button
                  onClick={() => onDeleteMedia(item.id)}
                  className="p-1 text-red-700 hover:bg-red-50 rounded"
                  title="Delete item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Media Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-[#FDFCF5] border border-[#1A1A1A]/15 rounded-md w-full max-w-md p-6 space-y-4 shadow-xl">
            <h3 className="font-serif italic text-xl font-bold">Add Media Item</h3>
            <form onSubmit={handleSubmit} className="space-y-3 text-[13px]">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Traditional Coffee Ritual"
                  className="bento-input w-full p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Caption / Details</label>
                <textarea
                  required
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  rows={2}
                  placeholder="Brief description of the visual..."
                  className="bento-input w-full p-2 rounded"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1">Image URL</label>
                <input
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="bento-input w-full p-2 rounded font-mono text-[12px]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#1A1A1A]/10">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-[#1A1A1A]/20 rounded text-[11px] font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1A1A1A] text-[#FDFCF5] rounded text-[11px] font-bold uppercase"
                >
                  Save Media
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
