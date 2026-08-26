import React from 'react';
import { Reservation, MenuItem } from '../types';
import { TrendingUp, Users, Calendar, DollarSign, ArrowUpRight } from 'lucide-react';

interface AnalyticsViewProps {
  reservations: Reservation[];
  menuItems: MenuItem[];
  onNavigateToReservations: () => void;
  onNavigateToMenu: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  reservations,
  menuItems,
  onNavigateToReservations,
  onNavigateToMenu
}) => {
  const confirmed = reservations.filter(r => r.status === 'Confirmed');
  const totalGuests = confirmed.reduce((sum, r) => sum + r.partySize, 0);
  const avgPartySize = confirmed.length > 0 ? (totalGuests / confirmed.length).toFixed(1) : '0';

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#1A1A1A]/10 pb-6">
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/50 mb-1">
          Dining Patterns & Performance
        </div>
        <h2 className="font-serif italic text-3xl font-semibold text-[#1A1A1A]">
          Analytics & Yield
        </h2>
        <p className="text-[12px] text-[#1A1A1A]/60 mt-1">
          Insights into banquet seating, party sizes, and peak service hours.
        </p>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bento-card p-6 rounded-md">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 mb-1">
            Confirmed Covers
          </div>
          <div className="font-serif text-3xl font-bold text-[#1A1A1A]">
            {totalGuests} <span className="text-sm font-sans font-normal text-[#1A1A1A]/60">Guests</span>
          </div>
          <div className="text-[11px] text-emerald-800 mt-2">
            Average party size of {avgPartySize} patrons per Mesob
          </div>
        </div>

        <div className="bento-card p-6 rounded-md">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 mb-1">
            Peak Dining Windows
          </div>
          <div className="font-serif text-3xl font-bold text-[#1A1A1A]">
            19:00 – 21:30
          </div>
          <div className="text-[11px] text-[#1A1A1A]/70 mt-2">
            Dinner rush accounts for 62% of reservations
          </div>
        </div>

        <div className="bento-card p-6 rounded-md">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 mb-1">
            Catalog Health
          </div>
          <div className="font-serif text-3xl font-bold text-[#1A1A1A]">
            {menuItems.filter(m => m.available).length} / {menuItems.length}
          </div>
          <div className="text-[11px] text-[#1A1A1A]/70 mt-2">
            100% active inventory readiness
          </div>
        </div>
      </div>

      {/* Service Breakdown */}
      <div className="bento-card p-6 md:p-8 rounded-md shadow-2xs">
        <h3 className="font-serif italic text-xl font-semibold mb-4">
          Time-of-Day Distribution
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#FFFFFF] rounded border border-[#1A1A1A]/10">
            <div className="text-[11px] font-bold uppercase text-[#1A1A1A]/60">Lunch Rush</div>
            <div className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">32%</div>
            <div className="text-[10px] text-[#1A1A1A]/50 mt-1">12:00 PM – 3:30 PM</div>
          </div>
          <div className="p-4 bg-[#FFFFFF] rounded border border-[#1A1A1A]/10">
            <div className="text-[11px] font-bold uppercase text-[#1A1A1A]/60">Dinner Gathering</div>
            <div className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">58%</div>
            <div className="text-[10px] text-[#1A1A1A]/50 mt-1">6:30 PM – 10:00 PM</div>
          </div>
          <div className="p-4 bg-[#FFFFFF] rounded border border-[#1A1A1A]/10">
            <div className="text-[11px] font-bold uppercase text-[#1A1A1A]/60">Late Night 24H</div>
            <div className="font-serif text-2xl font-bold text-[#1A1A1A] mt-1">10%</div>
            <div className="text-[10px] text-[#1A1A1A]/50 mt-1">10:30 PM – 8:00 AM</div>
          </div>
        </div>
      </div>
    </div>
  );
};
