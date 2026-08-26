import React, { useState } from 'react';
import { Reservation, ReservationStatus } from '../types';
import { X, Users, Calendar, Clock, Phone, User, MessageSquare } from 'lucide-react';

interface NewReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (res: Omit<Reservation, 'id' | 'createdAt' | 'status'> & { status?: ReservationStatus }) => void;
}

export const NewReservationModal: React.FC<NewReservationModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:30');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isVIP, setIsVIP] = useState(false);
  const [status, setStatus] = useState<ReservationStatus>('Confirmed');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    onSubmit({
      customerName: name,
      contactPhone: phone,
      partySize: Number(partySize),
      date,
      time,
      specialRequests,
      isVIP,
      status
    });
    setName('');
    setPhone('');
    setSpecialRequests('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#FDFCF5] border border-[#1A1A1A]/15 rounded-md w-full max-w-md p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
          <h3 className="font-serif italic text-xl font-bold text-[#1A1A1A]">
            New Reservation Record
          </h3>
          <button onClick={onClose} className="p-1 text-[#1A1A1A]/60 hover:text-[#1A1A1A]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-[13px]">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
              Patron Full Name
            </label>
            <div className="relative">
              <User className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
              <input
                required
                type="text"
                placeholder="Dr. Yohannes Berhane"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bento-input w-full pl-9 pr-3 py-2 rounded text-[13px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
              Contact Phone
            </label>
            <div className="relative">
              <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
              <input
                required
                type="tel"
                placeholder="+251 91 123 4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bento-input w-full pl-9 pr-3 py-2 rounded text-[13px] font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
                Guests
              </label>
              <input
                required
                type="number"
                min="1"
                max="50"
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value))}
                className="bento-input w-full px-3 py-2 rounded text-[13px]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
                Date
              </label>
              <input
                required
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bento-input w-full px-2 py-2 rounded text-[11px] font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
                Time
              </label>
              <input
                required
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="bento-input w-full px-2 py-2 rounded text-[11px] font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider mb-1 text-[#1A1A1A]/70">
              Special Requests / Mesob Location
            </label>
            <input
              type="text"
              placeholder="e.g. VIP Mesob hall, mild spice kitfo"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="bento-input w-full px-3 py-2 rounded text-[13px]"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider cursor-pointer">
              <input
                type="checkbox"
                checked={isVIP}
                onChange={(e) => setIsVIP(e.target.checked)}
                className="rounded text-[#1A1A1A]"
              />
              <span>VIP Guest Status</span>
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ReservationStatus)}
              className="text-[10px] font-bold uppercase rounded border border-[#1A1A1A]/20 px-2 py-1 bg-[#FFFFFF]"
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
            </select>
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
              Save Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
