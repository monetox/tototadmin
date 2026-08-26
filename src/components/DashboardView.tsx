import React from 'react';
import { MenuItem, Reservation, SiteSettings } from '../types';
import { 
  Users, 
  UtensilsCrossed, 
  CalendarCheck, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';

interface DashboardViewProps {
  reservations: Reservation[];
  menuItems: MenuItem[];
  siteSettings: SiteSettings;
  onNavigateToReservations: () => void;
  onNavigateToMenu: () => void;
  onNavigateToMedia: () => void;
  onManagePromotion: () => void;
  onOpenReservationDetails: (res: Reservation) => void;
  onToggleAvailability?: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  reservations,
  menuItems,
  siteSettings,
  onNavigateToReservations,
  onNavigateToMenu,
  onNavigateToMedia,
  onManagePromotion,
  onOpenReservationDetails,
  onToggleAvailability
}) => {
  const confirmedReservations = reservations.filter(r => r.status === 'Confirmed');
  const pendingReservations = reservations.filter(r => r.status === 'Pending');
  const totalCovers = confirmedReservations.reduce((acc, r) => acc + r.partySize, 0);
  const featuredDishes = menuItems.filter(item => item.isFeatured);
  const availableDishesCount = menuItems.filter(item => item.available).length;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Banner / Welcome */}
      <div className="bento-card p-6 md:p-8 rounded-md relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xs">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#1A1A1A]/50 font-sans">
              Gerji Main Hall • Front Desk
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
          </div>
          <h2 className="font-serif italic text-3xl md:text-4xl text-[#1A1A1A] font-normal leading-tight">
            {siteSettings.brandName}
          </h2>
          <p className="text-[13px] text-[#1A1A1A]/70 mt-2 font-sans leading-relaxed">
            {siteSettings.headline} — Live bookings and culinary inventory management.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 z-10">
          <button
            onClick={onManagePromotion}
            className="px-4 py-2.5 bg-[#FAF8F0] hover:bg-[#EFECE5] border border-[#1A1A1A]/20 text-[#1A1A1A] rounded-md text-[11px] font-bold tracking-[0.18em] uppercase transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Offerings</span>
          </button>

          <button
            onClick={onNavigateToReservations}
            className="px-5 py-2.5 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] rounded-md text-[11px] font-bold tracking-[0.18em] uppercase transition-all shadow-2xs flex items-center gap-2"
          >
            <span>View All Tables</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bento-card p-5 rounded-md flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between text-[#1A1A1A]/60 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Daily Covers</span>
            <Users className="w-4 h-4" />
          </div>
          <div className="font-serif text-[32px] font-bold text-[#1A1A1A]">
            {totalCovers} <span className="text-[14px] font-sans font-normal text-[#1A1A1A]/50">Guests</span>
          </div>
          <div className="text-[11px] text-emerald-800 font-medium mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>Across {confirmedReservations.length} confirmed tables</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bento-card p-5 rounded-md flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between text-[#1A1A1A]/60 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Pending Requests</span>
            <AlertCircle className="w-4 h-4 text-amber-700" />
          </div>
          <div className="font-serif text-[32px] font-bold text-amber-900">
            {pendingReservations.length}
          </div>
          <div className="text-[11px] text-amber-800/80 font-medium mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Awaiting confirmation</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bento-card p-5 rounded-md flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between text-[#1A1A1A]/60 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Active Menu</span>
            <UtensilsCrossed className="w-4 h-4" />
          </div>
          <div className="font-serif text-[32px] font-bold text-[#1A1A1A]">
            {availableDishesCount} / {menuItems.length}
          </div>
          <div className="text-[11px] text-[#1A1A1A]/70 font-medium mt-2">
            Dishes ready for kitchen orders
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bento-card p-5 rounded-md flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between text-[#1A1A1A]/60 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Operating Status</span>
            <CalendarCheck className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="font-serif text-[26px] font-bold text-[#1A1A1A]">
            24 Hours
          </div>
          <div className="text-[11px] text-emerald-800 font-medium mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Open & serving continuously</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Bookings & Menu Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Reservations */}
        <div className="lg:col-span-2 bento-card p-6 md:p-7 rounded-md shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4 mb-5">
            <div>
              <h3 className="font-serif italic text-xl font-semibold text-[#1A1A1A]">
                Recent Dining & Mesob Bookings
              </h3>
              <p className="text-[11px] text-[#1A1A1A]/60">
                Synced in real-time with your consumer website
              </p>
            </div>
            <button
              onClick={onNavigateToReservations}
              className="text-[11px] font-bold tracking-wider uppercase text-[#1A1A1A] hover:underline flex items-center gap-1"
            >
              <span>Manage List</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#1A1A1A]/8">
            {reservations.slice(0, 5).map(res => (
              <div
                key={res.id}
                onClick={() => onOpenReservationDetails(res)}
                className="py-3.5 flex items-center justify-between hover:bg-[#FFFFFF]/70 px-2 rounded-md transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#EFECE5] border border-[#1A1A1A]/10 flex items-center justify-center font-serif text-sm font-bold text-[#1A1A1A]">
                    {res.customerName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[13px] text-[#1A1A1A]">{res.customerName}</span>
                      {res.isVIP && (
                        <span className="px-1.5 py-0.5 rounded text-[8px] bg-[#1A1A1A] text-[#FDFCF5] font-bold uppercase tracking-wider">
                          VIP
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[#1A1A1A]/60 font-mono">
                      {res.contactPhone} • {res.partySize} Guests
                    </div>
                  </div>
                </div>

                <div className="text-right flex items-center gap-4">
                  <div>
                    <div className="text-[12px] font-mono font-medium text-[#1A1A1A]">{res.time}</div>
                    <div className="text-[10px] text-[#1A1A1A]/50">{res.date}</div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                    res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                    res.status === 'Pending' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                    res.status === 'Completed' ? 'bg-[#1A1A1A] text-[#FDFCF5] border-[#1A1A1A]' :
                    'bg-red-50 text-red-800 border-red-300'
                  }`}>
                    {res.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Featured Dishes & Fast Navigation */}
        <div className="space-y-6">
          {/* Featured Dishes Box */}
          <div className="bento-card p-6 rounded-md shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3 mb-4">
              <div>
                <h4 className="font-serif italic text-lg font-semibold text-[#1A1A1A]">
                  Kitchen Dispatch
                </h4>
                <p className="text-[10px] text-[#1A1A1A]/60">Live dish availability switches</p>
              </div>
              <button
                onClick={onNavigateToMenu}
                className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 hover:underline"
              >
                All Dishes →
              </button>
            </div>

            <div className="space-y-3">
              {menuItems.slice(0, 4).map(dish => (
                <div key={dish.id} className={`p-3 rounded border transition-colors flex items-center justify-between gap-3 ${
                  dish.available ? 'bg-[#FFFFFF] border-[#1A1A1A]/10' : 'bg-[#F4F1EA] border-dashed border-[#1A1A1A]/20 opacity-70'
                }`}>
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] font-bold text-[#1A1A1A] truncate">{dish.name}</div>
                    <div className="text-[10px] font-mono text-[#1A1A1A]/60">{dish.price} ETB</div>
                  </div>

                  {onToggleAvailability && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        role="switch"
                        aria-checked={dish.available}
                        onClick={() => onToggleAvailability(dish.id)}
                        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          dish.available ? 'bg-emerald-600' : 'bg-[#1A1A1A]/30'
                        }`}
                        title={dish.available ? "Turn off (Sold Out)" : "Turn on (Available)"}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            dish.available ? 'translate-x-4' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <span className={`text-[9px] font-bold uppercase ${dish.available ? 'text-emerald-800' : 'text-red-700'}`}>
                        {dish.available ? 'ON' : 'OFF'}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bento-card p-6 rounded-md shadow-2xs">
            <h4 className="font-serif italic text-lg font-semibold text-[#1A1A1A] mb-3">
              Shortcuts
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-bold uppercase tracking-wider">
              <button
                onClick={onNavigateToMenu}
                className="p-3 bg-[#FFFFFF] hover:bg-[#EFECE5] border border-[#1A1A1A]/10 rounded text-left transition-colors"
              >
                🥘 Edit Menu Prices
              </button>
              <button
                onClick={onNavigateToMedia}
                className="p-3 bg-[#FFFFFF] hover:bg-[#EFECE5] border border-[#1A1A1A]/10 rounded text-left transition-colors"
              >
                📸 Media Bento
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
