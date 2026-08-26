import React, { useState } from 'react';
import { Reservation, ReservationStatus } from '../types';
import { 
  Plus, 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  Check, 
  X, 
  Trash2,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface ReservationsViewProps {
  reservations: Reservation[];
  onUpdateStatus: (id: string, status: ReservationStatus) => void;
  onDeleteReservation: (id: string) => void;
  onOpenNewReservation: () => void;
  onOpenReservationDetails: (res: Reservation) => void;
}

export const ReservationsView: React.FC<ReservationsViewProps> = ({
  reservations,
  onUpdateStatus,
  onDeleteReservation,
  onOpenNewReservation,
  onOpenReservationDetails
}) => {
  const [statusFilter, setStatusFilter] = useState<'All' | ReservationStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = reservations.filter(res => {
    const matchesStatus = statusFilter === 'All' || res.status === statusFilter;
    const matchesSearch = res.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.contactPhone.includes(searchQuery) ||
                          (res.specialRequests && res.specialRequests.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/50 mb-1">
            Table & Banquet Bookings
          </div>
          <h2 className="font-serif italic text-3xl font-semibold text-[#1A1A1A]">
            Reservations Ledger
          </h2>
          <p className="text-[12px] text-[#1A1A1A]/60 mt-1">
            Track dining arrivals, VIP requests, and table assignments.
          </p>
        </div>

        <button
          onClick={onOpenNewReservation}
          className="px-4 py-2.5 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] rounded-md text-[11px] font-bold tracking-[0.18em] uppercase transition-all shadow-2xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>New Reservation</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-wrap">
          {(['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all ${
                statusFilter === tab
                  ? 'bg-[#1A1A1A] text-[#FDFCF5] shadow-2xs'
                  : 'bg-[#FAF8F0] text-[#1A1A1A]/70 hover:bg-[#EFECE5] border border-[#1A1A1A]/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-3.5 h-3.5 text-[#1A1A1A]/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by patron or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bento-input pl-9 pr-3 py-1.5 rounded-md text-[12px] w-full placeholder-[#1A1A1A]/40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bento-card rounded-md overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-[#EFECE5]/60 border-b border-[#1A1A1A]/10 text-[10px] uppercase tracking-wider text-[#1A1A1A]/60 font-sans">
                <th className="py-3.5 px-4 font-bold">Patron Name</th>
                <th className="py-3.5 px-4 font-bold">Contact</th>
                <th className="py-3.5 px-4 font-bold">Party Size</th>
                <th className="py-3.5 px-4 font-bold">Date & Time</th>
                <th className="py-3.5 px-4 font-bold">Special Requests</th>
                <th className="py-3.5 px-4 font-bold">Status</th>
                <th className="py-3.5 px-4 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1A1A1A]/8">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-[13px] text-[#1A1A1A]/50">
                    No reservations found matching current criteria.
                  </td>
                </tr>
              ) : (
                filtered.map(res => (
                  <tr key={res.id} className="hover:bg-[#FFFFFF] transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">
                      <div className="flex items-center gap-2">
                        <span>{res.customerName}</span>
                        {res.isVIP && (
                          <span className="px-1.5 py-0.5 rounded text-[8px] bg-[#1A1A1A] text-[#FDFCF5] font-bold">
                            VIP
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[12px] text-[#1A1A1A]/80">
                      {res.contactPhone}
                    </td>

                    <td className="py-3.5 px-4 font-bold">
                      {res.partySize} Guests
                    </td>

                    <td className="py-3.5 px-4 font-mono text-[12px]">
                      {res.date} • {res.time}
                    </td>

                    <td className="py-3.5 px-4 text-[12px] text-[#1A1A1A]/70 max-w-xs truncate italic">
                      "{res.specialRequests || 'Standard Mesob'}"
                    </td>

                    <td className="py-3.5 px-4">
                      <select
                        value={res.status}
                        onChange={(e) => onUpdateStatus(res.id, e.target.value as ReservationStatus)}
                        className={`text-[10px] font-bold uppercase tracking-wider rounded border px-2 py-1 outline-none ${
                          res.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                          res.status === 'Pending' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                          res.status === 'Completed' ? 'bg-[#1A1A1A] text-[#FDFCF5] border-[#1A1A1A]' :
                          'bg-red-50 text-red-800 border-red-300'
                        }`}
                      >
                        <option value="Confirmed">✓ Confirmed</option>
                        <option value="Pending">⏳ Pending</option>
                        <option value="Completed">🏁 Completed</option>
                        <option value="Cancelled">✕ Cancelled</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onOpenReservationDetails(res)}
                          className="px-2.5 py-1 bg-[#1A1A1A] text-[#FDFCF5] rounded text-[10px] font-bold uppercase tracking-wider hover:bg-[#333333]"
                        >
                          View
                        </button>
                        <button
                          onClick={() => onDeleteReservation(res.id)}
                          className="p-1 rounded hover:bg-red-50 text-red-700"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
