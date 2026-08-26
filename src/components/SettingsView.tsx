import React, { useState, useEffect } from 'react';
import { SiteSettings } from '../types';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Info, 
  Eye, 
  Mail, 
  Share2, 
  Check,
  Database,
  Code2,
  ExternalLink
} from 'lucide-react';
import { firebaseConfig } from '../firebase';

interface SettingsViewProps {
  settings: SiteSettings;
  onSaveSettings: (newSettings: SiteSettings) => void;
  onOpenFirebaseModal?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSaveSettings,
  onOpenFirebaseModal
}) => {
  const [formData, setFormData] = useState<SiteSettings>(settings);
  const [is24Hours, setIs24Hours] = useState(settings.hoursType === '24hours');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);

  useEffect(() => {
    setFormData(settings);
    setIs24Hours(settings.hoursType === '24hours');
  }, [settings]);

  const handleChange = (field: keyof SiteSettings, value: string) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      setHasUnsavedChanges(true);
      return updated;
    });
  };

  const handleToggle24Hours = () => {
    const next = !is24Hours;
    setIs24Hours(next);
    setFormData(prev => ({
      ...prev,
      hoursType: next ? '24hours' : 'custom'
    }));
    setHasUnsavedChanges(true);
  };

  const handleDiscard = () => {
    setFormData(settings);
    setIs24Hours(settings.hoursType === '24hours');
    setHasUnsavedChanges(false);
  };

  const handleSave = () => {
    onSaveSettings(formData);
    setHasUnsavedChanges(false);
    setSaveSuccessMessage(true);
    setTimeout(() => setSaveSuccessMessage(false), 3000);
  };

  return (
    <div className="flex-1 p-6 md:p-12 max-w-[1600px] mx-auto w-full animate-fadeIn">
      {/* Header */}
      <div className="mb-10 pb-6 border-b border-[#1A1A1A]/10 max-w-[1400px]">
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-2 text-[#1A1A1A]/50 font-sans">
          Selection 07 / Identity & Coordinates
        </div>
        <h2 className="font-serif italic text-[32px] md:text-[44px] font-normal text-[#1A1A1A] tracking-tight leading-[0.95] mb-2">
          Establishment Details & Settings
        </h2>
        <p className="text-[14px] text-[#1A1A1A]/70 font-medium max-w-3xl">
          Configure Totot Cultural Restaurant's public-facing metadata. Live updates reflect instantly on client-facing footer manifests and booking confirmations.
        </p>
      </div>

      {/* Bento Grid Layout for Settings Editor */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 max-w-[1400px]">
        {/* Left Column: Form Editor (7 cols) */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          {/* General Information Card */}
          <div className="bento-card p-6 md:p-8 rounded-md shadow-2xs">
            <div className="flex items-center gap-3 border-b border-[#1A1A1A]/10 pb-4 mb-6">
              <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">info</span>
              <h3 className="text-[11px] font-bold text-[#1A1A1A] tracking-[0.2em] uppercase font-sans">
                Location & Coordinates
              </h3>
            </div>

            <div className="space-y-6">
              {/* Location Address */}
              <div>
                <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-2" htmlFor="address">
                  Physical Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1A1A1A]/40">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    placeholder="Enter full address"
                    className="bento-input block w-full pl-10 pr-4 py-3 rounded-md text-[13px] text-[#1A1A1A]"
                  />
                </div>
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-[10px] font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-2" htmlFor="phone">
                  Concierge & Reservation Hotline
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1A1A1A]/40">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="Enter phone number"
                    className="bento-input block w-full pl-10 pr-4 py-3 rounded-md text-[13px] text-[#1A1A1A]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Firebase Cloud Backend & Synchronization Card */}
          <div className="bento-card p-6 md:p-8 rounded-md shadow-2xs bg-[#FAF8F0]">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <Database className="w-5 h-5 text-[#1A1A1A]" />
                <h3 className="text-[11px] font-bold text-[#1A1A1A] tracking-[0.2em] uppercase font-sans">
                  Firebase Cloud Backend & Multi-Site Bridge
                </h3>
              </div>
              <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Active Sync
              </span>
            </div>

            <p className="text-[13px] text-[#1A1A1A]/70 mb-4 leading-relaxed font-medium">
              This site and your other consumer website are bridged through Firestore. Table bookings and menu edits synchronize live across both portals in real-time.
            </p>

            <div className="p-3.5 bg-[#FFFFFF] rounded-md border border-[#1A1A1A]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[12px] font-mono mb-4">
              <div>
                <span className="text-[#1A1A1A]/50 block text-[10px] uppercase font-sans font-bold">Project ID</span>
                <span className="text-[#1A1A1A] font-bold">{firebaseConfig.projectId}</span>
              </div>
              <div>
                <span className="text-[#1A1A1A]/50 block text-[10px] uppercase font-sans font-bold">Auth Domain</span>
                <span className="text-[#1A1A1A]">{firebaseConfig.authDomain}</span>
              </div>
            </div>

            {onOpenFirebaseModal && (
              <button
                type="button"
                onClick={onOpenFirebaseModal}
                className="w-full py-2.5 bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] rounded-md text-[11px] font-bold tracking-[0.15em] uppercase transition-all shadow-2xs flex items-center justify-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                <span>View Integration Code & Script for Other Website</span>
              </button>
            )}
          </div>

          {/* Operating Hours Card */}
          <div className="bento-card p-6 md:p-8 rounded-md shadow-2xs">
            <div className="flex items-center gap-3 border-b border-[#1A1A1A]/10 pb-4 mb-6">
              <span className="material-symbols-outlined text-[#1A1A1A] text-[20px]">schedule</span>
              <h3 className="text-[11px] font-bold text-[#1A1A1A] tracking-[0.2em] uppercase font-sans">
                Dining Hall Operating Hours
              </h3>
            </div>

            <div className="space-y-4">
              {/* Mon - Sun Toggle Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#FFFFFF] border border-[#1A1A1A]/10 rounded-md gap-4 shadow-2xs">
                <div className="flex items-center gap-4">
                  {/* Toggle Switch */}
                  <button
                    type="button"
                    onClick={handleToggle24Hours}
                    className={`
                      relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border border-transparent 
                      transition-colors duration-200 ease-in-out focus:outline-none
                      ${is24Hours ? 'bg-[#1A1A1A]' : 'bg-[#EFECE5] border-[#1A1A1A]/20'}
                    `}
                    role="switch"
                    aria-checked={is24Hours}
                  >
                    <span
                      aria-hidden="true"
                      className={`
                        pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#FFFFFF] shadow-2xs ring-0 
                        transition duration-200 ease-in-out border border-[#1A1A1A]/10 mt-0.5
                        ${is24Hours ? 'translate-x-5' : 'translate-x-0.5'}
                      `}
                    />
                  </button>
                  <span className="text-[13px] font-bold text-[#1A1A1A] w-28 uppercase tracking-wider text-[11px]">Mon – Sun</span>
                </div>

                <div className="flex items-center gap-3 flex-1 justify-end">
                  {is24Hours ? (
                    <div className="bg-[#EFECE5] border border-[#1A1A1A]/10 rounded-md px-4 py-2 text-[12px] text-[#1A1A1A] font-bold uppercase tracking-wider">
                      Open 24 Hours (Continuous Service)
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input 
                        type="time" 
                        value={formData.openTime} 
                        onChange={(e) => handleChange('openTime', e.target.value)}
                        className="bento-input rounded-md px-3 py-1.5 text-[12px] text-[#1A1A1A]"
                      />
                      <span className="text-[#1A1A1A]/50">–</span>
                      <input 
                        type="time" 
                        value={formData.closeTime} 
                        onChange={(e) => handleChange('closeTime', e.target.value)}
                        className="bento-input rounded-md px-3 py-1.5 text-[12px] text-[#1A1A1A]"
                      />
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[12px] text-[#1A1A1A]/60 mt-2 font-medium flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#1A1A1A]/70" />
                {is24Hours 
                  ? 'Configured for continuous hospitality. Night kitchen and coffee ceremonies active around the clock.' 
                  : `Configured to daily culinary service from ${formData.openTime} to ${formData.closeTime}.`}
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between mt-2">
            <div>
              {saveSuccessMessage && (
                <div className="text-[12px] text-emerald-800 flex items-center gap-1.5 font-bold animate-fadeIn">
                  <Check className="w-4 h-4" /> Coordinates & preferences saved!
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button 
                id="btn-discard-settings"
                onClick={handleDiscard}
                disabled={!hasUnsavedChanges}
                className="px-5 py-2.5 border border-[#1A1A1A]/15 rounded-md text-[11px] font-bold tracking-wider uppercase text-[#1A1A1A]/70 hover:bg-[#EFECE5] transition-colors disabled:opacity-40"
              >
                Discard Changes
              </button>

              <button 
                id="btn-save-settings"
                onClick={handleSave}
                className="px-6 py-2.5 bg-[#1A1A1A] text-[#FDFCF5] font-bold text-[11px] tracking-[0.2em] uppercase rounded-md hover:bg-[#333333] transition-all shadow-2xs active:scale-95 flex items-center gap-2"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Footer Preview (5 cols) */}
        <div className="xl:col-span-5">
          <div className="bento-card h-full overflow-hidden flex flex-col sticky top-24 shadow-2xs rounded-md">
            {/* Preview Header */}
            <div className="px-6 py-4 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-[#EFECE5]/70">
              <div className="flex items-center gap-2 text-[#1A1A1A]">
                <Eye className="w-4 h-4 text-[#1A1A1A]/70" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
                  Public Footer Preview
                </span>
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#1A1A1A]/20" />
                <div className="w-2 h-2 rounded-full bg-[#1A1A1A]/20" />
                <div className="w-2 h-2 rounded-full bg-[#1A1A1A]/20" />
              </div>
            </div>

            {/* Preview Canvas */}
            <div className="flex-1 p-8 bg-[#FDFCF5] flex flex-col justify-end relative min-h-[420px]">
              {/* Mock Website Footer */}
              <div className="relative z-10 border-t border-[#1A1A1A]/10 pt-10">
                <div className="grid grid-cols-1 gap-6">
                  {/* Brand Column */}
                  <div>
                    <h4 className="font-serif italic text-[24px] font-normal text-[#1A1A1A] mb-2">
                      Totot Cultural Restaurant
                    </h4>
                    <p className="text-[13px] text-[#1A1A1A]/70 leading-relaxed mb-4 font-medium">
                      Authentic Ethiopian gastronomy, traditional mesob dining, and timeless Gurage hospitality.
                    </p>
                    <div className="flex gap-2.5">
                      <div className="w-8 h-8 rounded-md bg-[#FFFFFF] border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] hover:bg-[#EFECE5] transition-colors shadow-2xs">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="w-8 h-8 rounded-md bg-[#FFFFFF] border border-[#1A1A1A]/15 flex items-center justify-center text-[#1A1A1A] hover:bg-[#EFECE5] transition-colors shadow-2xs">
                        <Share2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="space-y-3 font-sans border-t border-[#1A1A1A]/10 pt-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-widest mb-0.5">
                          Location
                        </h5>
                        <p className="text-[13px] text-[#1A1A1A] font-medium leading-snug" id="preview-address">
                          {formData.address || 'Gerji, Next to Imperial Hotel, Addis Ababa, Ethiopia'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-widest mb-0.5">
                          Concierge
                        </h5>
                        <p className="text-[13px] text-[#1A1A1A] font-mono font-medium" id="preview-phone">
                          {formData.phone || '+251 11 629 2381'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#1A1A1A]/70 shrink-0 mt-0.5" />
                      <div>
                        <h5 className="text-[9px] font-bold text-[#1A1A1A]/50 uppercase tracking-widest mb-0.5">
                          Dining Hours
                        </h5>
                        <p className="text-[13px] text-[#1A1A1A] font-medium leading-snug">
                          Monday – Sunday: {is24Hours ? 'Open 24 Hours' : `${formData.openTime} – ${formData.closeTime}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
