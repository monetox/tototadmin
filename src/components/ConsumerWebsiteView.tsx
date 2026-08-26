import React, { useState } from 'react';
import { MenuItem, SiteSettings, MediaItem, Reservation, ReservationStatus } from '../types';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Clock, 
  Check, 
  Calendar, 
  Users, 
  Sparkles, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface ConsumerWebsiteViewProps {
  menuItems: MenuItem[];
  siteSettings: SiteSettings;
  mediaItems: MediaItem[];
  onReturnToAdmin: () => void;
  onSubmitReservation: (res: Omit<Reservation, 'id' | 'createdAt' | 'status'> & { status?: ReservationStatus }) => void;
}

export const ConsumerWebsiteView: React.FC<ConsumerWebsiteViewProps> = ({
  menuItems,
  siteSettings,
  mediaItems,
  onReturnToAdmin,
  onSubmitReservation
}) => {
  const [activeTab, setActiveTab] = useState<'specialties' | 'sides' | 'drinks'>('specialties');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2 People');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('19:30');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericGuests = parseInt(guests) || 2;
    onSubmitReservation({
      customerName: name,
      contactPhone: phone,
      partySize: numericGuests,
      date,
      time,
      isVIP: numericGuests >= 6,
      specialRequests: 'Online booking via Consumer Website',
      status: 'Pending'
    });
    setIsSubmitted(true);
    setName('');
    setPhone('');
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const filteredMenu = menuItems.filter(item => item.category === activeTab && item.available);

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F5F5F7] font-sans antialiased overflow-x-hidden">
      {/* Top Floating Admin Return Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#1A1A1A]/90 backdrop-blur-md border-b border-[#C5A059]/30 py-2.5 px-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[#C5A059] font-bold uppercase tracking-wider">Live Customer Website Mode</span>
        </div>
        <button
          onClick={onReturnToAdmin}
          className="px-3.5 py-1.5 bg-[#C5A059] text-[#0A0A0B] font-bold uppercase tracking-wider rounded-full hover:bg-[#DCB86E] transition-all flex items-center gap-1.5 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Admin Console</span>
        </button>
      </div>

      {/* Hero Section with Warm Atmosphere */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg"
            alt="Totot Atmosphere"
            className="w-full h-full object-cover brightness-[0.3] contrast-[1.1] blur-[2px] scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/60 via-[#0A0A0B]/80 to-[#0A0A0B]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A059]/40 bg-[#0A0A0B]/60 text-[#C5A059] text-[11px] font-bold tracking-[0.2em] uppercase">
            <span>Gurage Heritage • Addis Ababa</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Crafted Tradition.<br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#C5A059] via-[#DCB86E] to-[#C5A059]">
              Pure Flavor.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-[#B8B8BD] font-light leading-relaxed">
            {siteSettings.subheadline}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#menu"
              className="px-8 py-3.5 rounded-full bg-[#C5A059] text-[#0A0A0B] font-bold text-sm hover:bg-[#DCB86E] transition-all shadow-lg hover:shadow-[#C5A059]/20"
            >
              Explore Menu
            </a>
            <a
              href="#reserve"
              className="px-8 py-3.5 rounded-full border border-[#F5F5F7]/20 text-[#F5F5F7] hover:border-[#C5A059] hover:text-[#C5A059] transition-all text-sm backdrop-blur-xs bg-[#0A0A0B]/40"
            >
              Book Table
            </a>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <p className="text-[11px] font-bold tracking-[0.22em] text-[#C5A059] uppercase">The Menu</p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold">Made to order, priced plainly.</h2>
          <p className="text-[#B8B8BD] text-sm max-w-md mx-auto">All prices in Ethiopian Birr (ETB). Freshly prepared to order.</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {[
            { id: 'specialties', label: 'Specialties' },
            { id: 'sides', label: 'Sides' },
            { id: 'drinks', label: 'Drinks & Coffee' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all ${
                activeTab === tab.id
                  ? 'bg-[#C5A059] text-[#0A0A0B] shadow-md'
                  : 'border border-[#F5F5F7]/10 text-[#B8B8BD] hover:border-[#C5A059]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[#F5F5F7]/10 rounded-2xl p-2 bg-[#121215]">
          {filteredMenu.map(item => (
            <div key={item.id} className="p-6 rounded-xl bg-[#17171b] flex justify-between items-start gap-4 hover:bg-[#1f1f24] transition-colors">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#F5F5F7]">{item.name}</h3>
                <p className="text-xs text-[#B8B8BD] mt-1 font-light leading-relaxed">{item.description}</p>
              </div>
              <div className="font-mono text-sm font-bold text-[#C5A059] whitespace-nowrap">
                {item.price} ETB
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Atmosphere & Bento Media Gallery */}
      {mediaItems.length > 0 && (
        <section className="py-20 px-6 max-w-5xl mx-auto border-t border-[#F5F5F7]/10">
          <div className="text-center space-y-3 mb-12">
            <p className="text-[11px] font-bold tracking-[0.22em] text-[#C5A059] uppercase">Atmosphere & Visuals</p>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">The Gurage Dining Experience</h2>
            <p className="text-[#B8B8BD] text-sm max-w-md mx-auto">Mesob dining, traditional Jebena coffee brewing, and authentic ambiance in Gerji.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mediaItems.map(media => (
              <div key={media.id} className="group relative rounded-2xl overflow-hidden bg-[#17171b] border border-[#F5F5F7]/10 hover:border-[#C5A059]/40 transition-all shadow-lg">
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={media.imageUrl}
                    alt={media.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 bg-gradient-to-t from-[#121215] via-[#121215]/90 to-transparent">
                  <h3 className="font-serif text-base font-semibold text-[#F5F5F7]">{media.title}</h3>
                  <p className="text-xs text-[#B8B8BD] mt-1 leading-relaxed">{media.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reservation Form Section */}
      <section id="reserve" className="py-24 px-6 bg-[#121215] border-t border-[#F5F5F7]/5">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <p className="text-[11px] font-bold tracking-[0.22em] text-[#C5A059] uppercase">Reservations</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Book your table.</h2>
            <p className="text-[#B8B8BD] text-xs">Tell us when you're coming — we'll have the Mesob warm and ready.</p>
          </div>

          <form onSubmit={handleBookingSubmit} className="p-8 rounded-3xl bg-[#17171b] border border-[#C5A059]/20 space-y-4 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#B8B8BD] mb-1">Name</label>
                <input
                  required
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#F5F5F7]/10 rounded-xl p-3 text-sm focus:border-[#C5A059] outline-none text-[#F5F5F7]"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#B8B8BD] mb-1">Phone</label>
                <input
                  required
                  placeholder="+251 91 123 4567"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#F5F5F7]/10 rounded-xl p-3 text-sm focus:border-[#C5A059] outline-none text-[#F5F5F7] font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#B8B8BD] mb-1">Guests</label>
                <select
                  value={guests}
                  onChange={e => setGuests(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#F5F5F7]/10 rounded-xl p-3 text-xs focus:border-[#C5A059] outline-none text-[#F5F5F7]"
                >
                  <option>1 Person</option>
                  <option>2 People</option>
                  <option>3 People</option>
                  <option>4 People</option>
                  <option>5 People</option>
                  <option>6 People</option>
                  <option>7+ People</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#B8B8BD] mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#F5F5F7]/10 rounded-xl p-3 text-xs focus:border-[#C5A059] outline-none text-[#F5F5F7] font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-bold tracking-wider text-[#B8B8BD] mb-1">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-[#F5F5F7]/10 rounded-xl p-3 text-xs focus:border-[#C5A059] outline-none text-[#F5F5F7] font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#C5A059] text-[#0A0A0B] font-bold text-sm uppercase tracking-wider hover:bg-[#DCB86E] transition-all shadow-md mt-2"
            >
              Confirm Reservation
            </button>

            {isSubmitted && (
              <div className="p-3.5 rounded-xl bg-[#C5A059]/10 border border-[#C5A059] text-[#DCB86E] text-xs text-center font-medium animate-fade-in">
                Thank you! Your table request has been registered in the Totot Management System.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#F5F5F7]/10 text-center text-xs text-[#B8B8BD]">
        <div className="font-serif text-lg font-bold text-[#F5F5F7] mb-2">{siteSettings.brandName}</div>
        <p>{siteSettings.address} • {siteSettings.phone}</p>
        <p className="mt-4 text-[11px] text-[#B8B8BD]/60">© 2026 Totot Kitfo. All rights reserved.</p>
      </footer>
    </div>
  );
};
