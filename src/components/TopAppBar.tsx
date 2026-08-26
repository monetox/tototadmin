import React, { useState, useRef, useEffect } from 'react';
import { TabType } from '../types';
import { 
  Search, 
  Bell, 
  Menu as MenuIcon, 
  ExternalLink, 
  Sparkles, 
  CheckCheck,
  ChevronDown,
  Download,
  FileCode
} from 'lucide-react';

interface TopAppBarProps {
  currentTab: TabType;
  brandName: string;
  onNavigate: (tab: TabType) => void;
  onOpenNewReservation: () => void;
  onToggleMobileMenu?: () => void;
  onOpenFirebaseModal?: () => void;
  isFirebaseConnected?: boolean;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentTab,
  brandName,
  onNavigate,
  onOpenNewReservation,
  onToggleMobileMenu,
  onOpenFirebaseModal,
  isFirebaseConnected = true
}) => {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Sample notifications
  const [notifications, setNotifications] = useState([
    {
      id: 'n1',
      title: 'New VIP Reservation',
      desc: 'Elias Makonnen booked for 4 guests (19:30)',
      time: '10m ago',
      unread: true,
      type: 'reservations' as TabType
    },
    {
      id: 'n2',
      title: 'Kitchen Stock Alert',
      desc: 'Gomen Kitfo requires prep updates',
      time: '1h ago',
      unread: true,
      type: 'menu' as TabType
    },
    {
      id: 'n3',
      title: 'Patron Google Maps Photo',
      desc: 'New 5-star photo posted for Gerji location',
      time: '2h ago',
      unread: false,
      type: 'bento_media' as TabType
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#FDFCF5]/90 backdrop-blur-md sticky top-0 z-30 border-b border-[#1A1A1A]/10 shadow-2xs flex justify-between items-center w-full px-6 md:px-12 h-18 shrink-0">
      <div className="flex items-center gap-4 md:gap-8">
        {/* Mobile Hamburger */}
        {onToggleMobileMenu && (
          <button 
            id="btn-mobile-menu"
            onClick={onToggleMobileMenu}
            className="md:hidden text-[#1A1A1A]/70 hover:text-[#1A1A1A] p-1.5 rounded-md hover:bg-[#EFECE5] transition-colors"
            aria-label="Open menu"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        )}

        {/* Navigation Breadcrumb Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            id="subview-overview"
            onClick={() => onNavigate('dashboard')}
            className={`font-sans text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              currentTab === 'dashboard'
                ? 'text-[#FDFCF5] bg-[#1A1A1A] shadow-2xs'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EFECE5]'
            }`}
          >
            Overview
          </button>
          <button
            id="subview-menu"
            onClick={() => onNavigate('menu')}
            className={`font-sans text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              currentTab === 'menu'
                ? 'text-[#FDFCF5] bg-[#1A1A1A] shadow-2xs'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EFECE5]'
            }`}
          >
            Menu CMS
          </button>
          <button
            id="subview-reservations"
            onClick={() => onNavigate('reservations')}
            className={`font-sans text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
              currentTab === 'reservations'
                ? 'text-[#FDFCF5] bg-[#1A1A1A] shadow-2xs'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EFECE5]'
            }`}
          >
            Reservations
          </button>
          <button
            id="subview-analytics"
            onClick={() => onNavigate('analytics')}
            className={`font-sans text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-md transition-all whitespace-nowrap hidden sm:inline-block ${
              currentTab === 'analytics'
                ? 'text-[#FDFCF5] bg-[#1A1A1A] shadow-2xs'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#EFECE5]'
            }`}
          >
            Analytics
          </button>
          <button
            id="subview-consumer-preview"
            onClick={() => onNavigate('consumer_site')}
            className="font-sans text-[10px] font-bold tracking-[0.18em] uppercase px-3 py-1.5 rounded-md bg-[#FAF8F0] border border-[#1A1A1A]/20 hover:border-[#1A1A1A] text-[#1A1A1A] transition-all flex items-center gap-1.5 whitespace-nowrap ml-1"
          >
            <ExternalLink className="w-3 h-3 text-[#1A1A1A]/70" />
            <span>Customer Website</span>
          </button>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Download Standalone Single HTML */}
        <a
          id="btn-download-single-html"
          href="/totot-restaurant-app.html"
          download="totot-restaurant-app.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#1A1A1A] text-[#FDFCF5] hover:bg-[#333333] transition-all text-[10px] font-bold uppercase tracking-wider shadow-2xs"
          title="Download single-file standalone HTML"
        >
          <Download className="w-3 h-3 text-[#FDFCF5]/80" />
          <span>Single HTML</span>
        </a>

        {/* Firebase Live Cloud Status Indicator */}
        {onOpenFirebaseModal && (
          <button
            id="btn-firebase-status"
            onClick={onOpenFirebaseModal}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFFFFF] border border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40 text-[#1A1A1A] transition-all shadow-2xs group"
            title="Firebase Backend Integration & Status"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="font-mono text-[11px] font-bold text-[#1A1A1A] tracking-tight">
              totot-restaurant
            </span>
            <span className="text-[9px] font-bold tracking-wider uppercase text-[#1A1A1A]/50 bg-[#EFECE5] px-1.5 py-0.5 rounded border border-[#1A1A1A]/10 hidden sm:inline-block">
              Live Firestore
            </span>
          </button>
        )}

        {/* Search Bar / Trigger */}
        <div className="relative">
          {showSearchInput ? (
            <div className="flex items-center bg-[#FFFFFF] border border-[#1A1A1A]/30 rounded-md px-3 py-1.5 w-48 sm:w-64 animate-fadeIn shadow-2xs">
              <Search className="w-3.5 h-3.5 text-[#1A1A1A]/60 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Search bookings, menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="bg-transparent text-[12px] text-[#1A1A1A] focus:outline-none w-full placeholder:text-[#1A1A1A]/40"
              />
              <button 
                onClick={() => {
                  setShowSearchInput(false);
                  setSearchQuery('');
                }}
                className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] text-[11px] ml-1"
              >
                ✕
              </button>
            </div>
          ) : (
            <button 
              id="btn-top-search"
              onClick={() => setShowSearchInput(true)}
              className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors p-2 rounded-full hover:bg-[#EFECE5]"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button 
            id="btn-top-notifications"
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-[#1A1A1A]/70 hover:text-[#1A1A1A] transition-colors relative p-2 rounded-full hover:bg-[#EFECE5]"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1A1A1A] rounded-full ring-2 ring-[#FDFCF5]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#FFFFFF] border border-[#1A1A1A]/15 rounded-md shadow-xl py-3 z-50 animate-fadeIn">
              <div className="flex items-center justify-between px-4 pb-3 border-b border-[#1A1A1A]/10">
                <div className="flex items-center gap-2">
                  <span className="font-serif italic font-semibold text-[15px] text-[#1A1A1A]">Notifications</span>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase bg-[#EFECE5] text-[#1A1A1A] rounded-full border border-[#1A1A1A]/15">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllRead}
                    className="text-[11px] font-medium text-[#1A1A1A] hover:underline flex items-center gap-1"
                  >
                    <CheckCheck className="w-3 h-3" /> Mark read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#1A1A1A]/5">
                {notifications.map((n) => (
                  <div 
                    key={n.id}
                    onClick={() => {
                      onNavigate(n.type);
                      setShowNotifications(false);
                    }}
                    className={`p-3.5 hover:bg-[#F7F5EE] cursor-pointer transition-colors flex gap-3 items-start ${
                      n.unread ? 'bg-[#F7F5EE]/60' : ''
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#EFECE5] border border-[#1A1A1A]/15 text-[#1A1A1A] flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-[#1A1A1A] truncate">{n.title}</p>
                      <p className="text-[11px] text-[#1A1A1A]/70 line-clamp-2 mt-0.5">{n.desc}</p>
                      <span className="text-[9px] font-semibold text-[#1A1A1A]/40 mt-1 block uppercase tracking-wider">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Hairline Divider */}
        <div className="h-5 w-px bg-[#1A1A1A]/15" />

        {/* Chief Administrator Profile */}
        <div className="relative" ref={profileRef}>
          <button 
            id="btn-admin-profile"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="text-right hidden lg:block">
              <p className="text-[12px] font-bold text-[#1A1A1A] group-hover:opacity-80 transition-opacity leading-tight">
                Admin Profile
              </p>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#1A1A1A]/50">Curator</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#EFECE5] overflow-hidden border border-[#1A1A1A]/20 group-hover:border-[#1A1A1A] transition-colors shadow-2xs">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAAZc5E1AEgsuBCDAVRxT7BpvdlCpHFo2bCh8CxNW6WhfsDc6vjpXGfIDaA-i_a2l7mRE4ajp6OHS0-L4EbdKYkZA-LNIRAbLabxWYNJ9YHr2j_ZQ9FKf7E4w6DfIxzDNAKEw1c2TK982NPACSLlYOvFmElUEutZn64RMp6FdnyJDXsCyXz3KMZ-2e_Hwlgx9nyE7DFJNDbf1_13m0yt_k2AYs7ggQGayE4WLItSEOxeZd55ffVXJuPPg" 
                alt="Chief Administrator Portrait" 
                className="w-full h-full object-cover grayscale contrast-125"
              />
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#1A1A1A]/50 hidden sm:block group-hover:text-[#1A1A1A] transition-colors" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-64 bg-[#FFFFFF] border border-[#1A1A1A]/15 rounded-md shadow-xl py-2 z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-[#1A1A1A]/10">
                <p className="text-[13px] font-bold text-[#1A1A1A]">Dawit Kassahun</p>
                <p className="text-[10px] font-bold tracking-wider uppercase text-[#1A1A1A]/60">Chief Curator & Director</p>
                <p className="text-[10px] text-[#1A1A1A]/40 mt-0.5 font-mono">dawitkassahun143@gmail.com</p>
              </div>

              <div className="py-1">
                <button 
                  onClick={() => {
                    onNavigate('settings');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[12px] text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-[#F7F5EE] transition-colors font-medium"
                >
                  Restaurant Settings
                </button>
                <button 
                  onClick={() => {
                    onNavigate('consumer_site');
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-[12px] font-bold text-[#1A1A1A] hover:bg-[#F7F5EE] transition-colors flex items-center justify-between"
                >
                  <span>Public Exhibition View</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#1A1A1A]/60" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
