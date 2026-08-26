import React from 'react';
import { TabType } from '../types';
import { 
  Plus, 
  Globe, 
  X
} from 'lucide-react';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenNewReservation: () => void;
  pendingReservationsCount: number;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenFirebaseModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  onOpenNewReservation,
  pendingReservationsCount,
  mobileOpen = false,
  onCloseMobile,
  onOpenFirebaseModal
}) => {
  const navItems: { id: TabType; label: string; materialIcon: string; badge?: number }[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      materialIcon: 'dashboard'
    },
    {
      id: 'menu',
      label: 'Menu CMS',
      materialIcon: 'restaurant_menu'
    },
    {
      id: 'reservations',
      label: 'Reservations',
      materialIcon: 'event_available',
      badge: pendingReservationsCount > 0 ? pendingReservationsCount : undefined
    },
    {
      id: 'bento_media',
      label: 'Bento & Media',
      materialIcon: 'grid_view'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      materialIcon: 'monitoring'
    },
    {
      id: 'reports',
      label: 'Reports & Logs',
      materialIcon: 'receipt_long'
    },
    {
      id: 'settings',
      label: 'Settings',
      materialIcon: 'settings'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-[#1A1A1A]/40 z-40 md:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside className={`
        bg-[#F7F5EE] h-screen w-64 lg:w-72 shrink-0 border-r border-[#1A1A1A]/10 
        flex flex-col py-6 px-5 z-40 transition-transform duration-300 ease-in-out select-none
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Brand Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => onSelectTab('dashboard')}>
            <div className="w-10 h-10 rounded-full bg-[#EFECE5] overflow-hidden border border-[#1A1A1A]/20 shrink-0 flex items-center justify-center shadow-xs">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwawvBMqLpjDJK9EEQdH-Fq0U3YTEVdGHc9dKlyYbmzFdxJFsCpgn-vjGRI56Y1V0qAqEcO3oIUv9gjzPHaYs-aXa3OHZA_9MeaRMCYzrr-n2f9BFLg2D2ZenpcUDPxT6GdN0r8TrcrkzmLqM0dp1qkc5E66AOLIumpRQ_aAR3c-Y9HDPyWU5Dw_XwfgWbPLh3g41xuC3CKsTbBBV2Sgc5FmmqcDL1Z9s7IXIwInp84JqeA3wD8ZcYbw" 
                alt="Adulis Luxury Emblem" 
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <div>
              <h1 className="font-serif italic text-[21px] font-bold text-[#1A1A1A] tracking-tight leading-none">
                Adulis & Totot
              </h1>
              <p className="text-[9px] font-bold text-[#1A1A1A]/50 mt-1 uppercase tracking-[0.25em] font-sans">
                Curated Studio
              </p>
            </div>
          </div>

          {/* Close button for mobile */}
          {onCloseMobile && (
            <button 
              onClick={onCloseMobile}
              className="md:hidden text-[#1A1A1A]/60 hover:text-[#1A1A1A] p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Section Label */}
        <div className="text-[9px] font-bold tracking-[0.3em] uppercase text-[#1A1A1A]/40 px-3.5 mb-2">
          Management
        </div>

        {/* Navigation Tabs */}
        <ul className="flex flex-col gap-1.5 flex-grow overflow-y-auto pr-1">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <li key={item.id}>
                <button
                  id={`nav-tab-${item.id}`}
                  onClick={() => {
                    onSelectTab(item.id);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-md text-left transition-all duration-200 group
                    ${isActive 
                      ? 'bg-[#1A1A1A] text-[#FDFCF5] font-medium shadow-xs' 
                      : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-[#EFECE5]'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`material-symbols-outlined text-[19px] transition-transform group-hover:scale-105 ${isActive ? 'text-[#FDFCF5]' : 'text-[#1A1A1A]/60'}`}>
                      {item.materialIcon}
                    </span>
                    <span className="text-[13px] tracking-wide font-sans">{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase border ${
                      isActive 
                        ? 'bg-[#FDFCF5]/20 text-[#FDFCF5] border-white/30' 
                        : 'bg-[#EFECE5] text-[#1A1A1A] border-[#1A1A1A]/15'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Public Website Preview Switcher & New Reservation */}
        <div className="mt-auto pt-4 flex flex-col gap-2 border-t border-[#1A1A1A]/10">
          <button
            id="nav-consumer-view"
            onClick={() => {
              onSelectTab('consumer_site');
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full py-2.5 px-3 bg-[#FFFFFF] border border-[#1A1A1A]/15 hover:border-[#1A1A1A]/50 text-[#1A1A1A] text-[11px] font-bold tracking-[0.15em] uppercase rounded-md transition-all flex items-center justify-center gap-2 group shadow-2xs"
          >
            <Globe className="w-3.5 h-3.5 text-[#1A1A1A]/70 transition-transform group-hover:rotate-45" />
            <span>Public Exhibition</span>
          </button>

          <button 
            id="btn-sidebar-new-reservation"
            onClick={() => {
              onOpenNewReservation();
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#333333] text-[#FDFCF5] font-bold text-[11px] tracking-[0.15em] uppercase rounded-md transition-all duration-200 flex items-center justify-center gap-2 shadow-xs active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>New Reservation</span>
          </button>

          {onOpenFirebaseModal && (
            <button
              onClick={onOpenFirebaseModal}
              className="w-full py-2 px-2.5 rounded-md bg-[#EFECE5] hover:bg-[#E5E0D5] border border-[#1A1A1A]/10 text-left transition-all flex items-center justify-between text-[#1A1A1A]"
            >
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Firebase Sync</span>
              </div>
              <span className="text-[9px] font-mono text-[#1A1A1A]/60">Connected</span>
            </button>
          )}

          <div className="text-center pt-1">
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-[#1A1A1A]/35">
              EST. MMXXIV — ADDIS ABABA
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
