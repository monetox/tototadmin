import React from 'react';
import { Reservation, MenuItem, SiteSettings } from '../types';
import { Printer, Download, FileText } from 'lucide-react';

interface ReportsViewProps {
  reservations: Reservation[];
  menuItems: MenuItem[];
  siteSettings: SiteSettings;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  reservations,
  menuItems,
  siteSettings
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#1A1A1A]/50 mb-1">
            Documentation & Auditing
          </div>
          <h2 className="font-serif italic text-3xl font-semibold text-[#1A1A1A]">
            Daily Operational Reports
          </h2>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Daily Manifest</span>
        </button>
      </div>

      <div className="bento-card p-6 md:p-8 rounded-md space-y-6 shadow-2xs">
        <div className="flex justify-between items-start border-b border-[#1A1A1A]/10 pb-4">
          <div>
            <h3 className="font-serif text-2xl font-bold">{siteSettings.brandName}</h3>
            <p className="text-[12px] text-[#1A1A1A]/60">{siteSettings.address}</p>
          </div>
          <div className="text-right font-mono text-[12px] text-[#1A1A1A]/70">
            Generated: {new Date().toLocaleString()}
          </div>
        </div>

        <div>
          <h4 className="font-serif font-bold text-lg mb-3">Reservations Manifest</h4>
          <div className="divide-y divide-[#1A1A1A]/10 text-[13px]">
            {reservations.map(r => (
              <div key={r.id} className="py-2.5 flex justify-between">
                <div>
                  <span className="font-bold">{r.customerName}</span> ({r.partySize} Guests)
                  <span className="ml-2 font-mono text-[11px] text-[#1A1A1A]/60">{r.contactPhone}</span>
                </div>
                <div className="font-mono text-[12px]">
                  {r.date} • {r.time} • <strong className="uppercase text-[10px]">{r.status}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
