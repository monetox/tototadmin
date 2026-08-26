import React from 'react';
import { Reservation, ReservationStatus } from '../types';
import { X, Users, Calendar, Clock, Phone, User, Trash2, CheckCircle2, MessageSquare } from 'lucide-react';

interface ReservationDetailsModalProps {
  reservation: Reservation | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string, status: ReservationStatus) => void;
  onDelete: (id: string) => void;
}

export const ReservationDetailsModal: React.FC<ReservationDetailsModalProps> = ({
  reservation,
  isOpen,
  onClose,
  onUpdateStatus,
  onDelete
}) => {
  if (!isOpen || !reservation) return null;

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FDFCF5] border border-[#1A1A1A]/15 rounded-md w-full max-w-md p-6 space-y-4 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
          <div>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50">
              Booking Details
            </span>
            <h3 className="font-serif italic text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
              <span>{reservation.customerName}</span>
              {reservation.isVIP && (
                <span className="px-1.5 py-0.5 rounded text-[8px] bg-[#1A1A1A] text-[#FDFCF5] font-bold font-sans">
                  VIP
                </span>
              )}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info Grid */}
        <div className="space-y-3 text-[13px] bg-[#FAF8F0] p-4 rounded border border-[#1A1A1A]/10">
          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-[#1A1A1A]/50" />
            <div>
              <div className="text-[10px] uppercase font-bold text-[#1A1A1A]/50">Phone</div>
              <div className="font-mono">{reservation.contactPhone}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-[#1A1A1A]/50" />
            <div>
              <div className="text-[10px] uppercase font-bold text-[#1A1A1A]/50">Party Size</div>
              <div>{reservation.partySize} Guests</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-[#1A1A1A]/50" />
            <div>
              <div className="text-[10px] uppercase font-bold text-[#1A1A1A]/50">Date & Arrival Time</div>
              <div className="font-mono">{reservation.date} at {reservation.time}</div>
            </div>
          </div>

          {reservation.specialRequests && (
            <div className="flex items-start gap-3 pt-2 border-t border-[#1A1A1A]/10">
              <MessageSquare className="w-4 h-4 text-[#1A1A1A]/50 mt-0.5" />
              <div>
                <div className="text-[10px] uppercase font-bold text-[#1A1A1A]/50">Special Requests</div>
                <div className="italic text-[#1A1A1A]/80">"{reservation.specialRequests}"</div>
              </div>
            </div>
          )}
        </div>

        {/* Status Selection */}
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/70">
            Booking Status
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['Confirmed', 'Pending', 'Completed', 'Cancelled'] as ReservationStatus[]).map(status => (
              <button
                key={status}
                type="button"
                onClick={() => onUpdateStatus(reservation.id, status)}
                className={`py-2 px-3 rounded text-[11px] font-bold uppercase tracking-wider border transition-all ${
                  reservation.status === status
                    ? 'bg-[#1A1A1A] text-[#FDFCF5] border-[#1A1A1A]'
                    : 'bg-[#FFFFFF] text-[#1A1A1A]/70 border-[#1A1A1A]/20 hover:bg-[#EFECE5]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-3 border-t border-[#1A1A1A]/10">
          <button
            onClick={() => {
              if (confirm('Delete this reservation?')) {
                onDelete(reservation.id);
                onClose();
              }
            }}
            className="text-[11px] font-bold uppercase tracking-wider text-red-700 hover:underline flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Record</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] rounded text-[11px] font-bold uppercase tracking-wider shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
