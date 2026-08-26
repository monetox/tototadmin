/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  MenuItem, 
  Reservation, 
  ReservationStatus, 
  SiteSettings, 
  MediaItem, 
  TabType,
  CategoryType
} from './types';
import { 
  initialMenuItems, 
  initialReservations, 
  initialSiteSettings, 
  initialMediaItems 
} from './data/initialData';

import { 
  seedInitialFirestoreDataIfEmpty,
  subscribeToReservations,
  subscribeToMenuItems,
  subscribeToSiteSettings,
  subscribeToMediaItems,
  createReservationInFirestore,
  updateReservationStatusInFirestore,
  deleteReservationFromFirestore,
  saveMenuItemInFirestore,
  deleteMenuItemFromFirestore,
  saveSiteSettingsInFirestore,
  saveMediaItemInFirestore,
  deleteMediaItemFromFirestore
} from './firebase';

import { Sidebar } from './components/Sidebar';
import { TopAppBar } from './components/TopAppBar';
import { DashboardView } from './components/DashboardView';
import { MenuCMSView } from './components/MenuCMSView';
import { ReservationsView } from './components/ReservationsView';
import { SettingsView } from './components/SettingsView';
import { BentoMediaView } from './components/BentoMediaView';
import { AnalyticsView } from './components/AnalyticsView';
import { ReportsView } from './components/ReportsView';
import { ConsumerWebsiteView } from './components/ConsumerWebsiteView';

import { NewReservationModal } from './components/NewReservationModal';
import { MenuModal } from './components/MenuModal';
import { PromotionModal } from './components/PromotionModal';
import { ReservationDetailsModal } from './components/ReservationDetailsModal';
import { FirebaseIntegrationModal } from './components/FirebaseIntegrationModal';

export default function App() {
  // State initialization with localStorage fallback
  const [currentTab, setCurrentTab] = useState<TabType>(() => {
    return (localStorage.getItem('totot_current_tab') as TabType) || 'dashboard';
  });

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('totot_menu_items');
    return saved ? JSON.parse(saved) : initialMenuItems;
  });

  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('totot_reservations');
    return saved ? JSON.parse(saved) : initialReservations;
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('totot_site_settings');
    return saved ? JSON.parse(saved) : initialSiteSettings;
  });

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(() => {
    const saved = localStorage.getItem('totot_media_items');
    return saved ? JSON.parse(saved) : initialMediaItems;
  });

  const [isFirebaseConnected, setIsFirebaseConnected] = useState(true);

  // Modals state
  const [isNewResModalOpen, setIsNewResModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [selectedResDetails, setSelectedResDetails] = useState<Reservation | null>(null);
  const [isFirebaseModalOpen, setIsFirebaseModalOpen] = useState(false);

  // Bootstrap Firebase & set up real-time onSnapshot listeners
  useEffect(() => {
    // Attempt to seed if remote collections are empty
    seedInitialFirestoreDataIfEmpty();

    // 1. Listen to real-time reservations from Firestore (including bookings from other website!)
    const unsubscribeReservations = subscribeToReservations(
      (liveReservations) => {
        if (liveReservations && liveReservations.length > 0) {
          setReservations(liveReservations);
          setIsFirebaseConnected(true);
        }
      },
      () => setIsFirebaseConnected(false)
    );

    // 2. Listen to real-time menu catalog
    const unsubscribeMenu = subscribeToMenuItems(
      (liveMenu) => {
        if (liveMenu && liveMenu.length > 0) {
          setMenuItems(liveMenu);
          setIsFirebaseConnected(true);
        }
      },
      () => setIsFirebaseConnected(false)
    );

    // 3. Listen to real-time site settings
    const unsubscribeSettings = subscribeToSiteSettings(
      (liveSettings) => {
        if (liveSettings) {
          setSiteSettings(liveSettings);
        }
      }
    );

    // 4. Listen to real-time media
    const unsubscribeMedia = subscribeToMediaItems(
      (liveMedia) => {
        if (liveMedia && liveMedia.length > 0) {
          setMediaItems(liveMedia);
        }
      }
    );

    return () => {
      unsubscribeReservations();
      unsubscribeMenu();
      unsubscribeSettings();
      unsubscribeMedia();
    };
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('totot_current_tab', currentTab);
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem('totot_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('totot_reservations', JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem('totot_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('totot_media_items', JSON.stringify(mediaItems));
  }, [mediaItems]);

  // Handler functions with Firestore synchronization
  const handleToggleMenuAvailability = async (id: string) => {
    const target = menuItems.find(item => item.id === id);
    if (target) {
      const updated = { ...target, available: !target.available };
      setMenuItems(prev => prev.map(item => item.id === id ? updated : item));
      try {
        await saveMenuItemInFirestore(updated);
      } catch (err) {
        console.error('Error syncing menu availability to Firestore:', err);
      }
    }
  };

  const handleSaveMenuItem = async (itemData: Partial<MenuItem>) => {
    if (editingMenuItem) {
      const updatedItem: MenuItem = {
        ...editingMenuItem,
        ...itemData
      };
      setMenuItems(prev => prev.map(item => 
        item.id === editingMenuItem.id ? updatedItem : item
      ));
      try {
        await saveMenuItemInFirestore(updatedItem);
      } catch (err) {
        console.error('Error saving updated menu item to Firestore:', err);
      }
    } else {
      const newItem: MenuItem = {
        id: `item-${Date.now()}`,
        name: itemData.name || 'New Item',
        description: itemData.description || '',
        price: itemData.price || 0,
        category: (itemData.category as CategoryType) || 'specialties',
        image: itemData.image || 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
        available: itemData.available !== undefined ? itemData.available : true,
        isFeatured: !!itemData.isFeatured,
        prepTimeMinutes: itemData.prepTimeMinutes || 15
      };
      setMenuItems(prev => [newItem, ...prev]);
      try {
        await saveMenuItemInFirestore(newItem);
      } catch (err) {
        console.error('Error creating menu item in Firestore:', err);
      }
    }
    setEditingMenuItem(null);
  };

  const handleDeleteMenuItem = async (id: string) => {
    if (confirm('Are you sure you want to remove this menu item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
      try {
        await deleteMenuItemFromFirestore(id);
      } catch (err) {
        console.error('Error deleting menu item from Firestore:', err);
      }
    }
  };

  const handleExportMenuJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(menuItems, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "totot_menu_catalog.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleUpdateReservationStatus = async (id: string, status: ReservationStatus) => {
    setReservations(prev => prev.map(res => 
      res.id === id ? { ...res, status } : res
    ));
    try {
      await updateReservationStatusInFirestore(id, status);
    } catch (err) {
      console.error('Error updating reservation status in Firestore:', err);
    }
  };

  const handleDeleteReservation = async (id: string) => {
    setReservations(prev => prev.filter(res => res.id !== id));
    try {
      await deleteReservationFromFirestore(id);
    } catch (err) {
      console.error('Error deleting reservation from Firestore:', err);
    }
  };

  const handleCreateReservation = async (newRes: Omit<Reservation, 'id' | 'createdAt' | 'status'> & { status?: ReservationStatus }) => {
    const tempId = `res-${Date.now()}`;
    const resEntry: Reservation = {
      ...newRes,
      id: tempId,
      status: newRes.status || 'Confirmed',
      createdAt: new Date().toISOString()
    };
    setReservations(prev => [resEntry, ...prev]);

    try {
      await createReservationInFirestore(newRes);
    } catch (err) {
      console.error('Error saving reservation to Firestore:', err);
    }
  };

  const handleSelectFeaturedDish = async (dishId: string) => {
    const updated = menuItems.map(item => ({
      ...item,
      isFeatured: item.id === dishId
    }));
    setMenuItems(updated);
    for (const item of updated) {
      try {
        await saveMenuItemInFirestore(item);
      } catch (err) {
        console.error('Error updating dish feature status:', err);
      }
    }
  };

  const handleToggleMediaFeatured = async (id: string) => {
    const target = mediaItems.find(m => m.id === id);
    if (target) {
      const updated = { ...target, featuredOnBento: !target.featuredOnBento };
      setMediaItems(prev => prev.map(m => m.id === id ? updated : m));
      try {
        await saveMediaItemInFirestore(updated);
      } catch (err) {
        console.error('Error updating media featured status:', err);
      }
    }
  };

  const handleAddMedia = async (newItem: Omit<MediaItem, 'id' | 'likes'>) => {
    const created: MediaItem = {
      ...newItem,
      id: `media-${Date.now()}`,
      likes: Math.floor(Math.random() * 50) + 12
    };
    setMediaItems(prev => [created, ...prev]);
    try {
      await saveMediaItemInFirestore(created);
    } catch (err) {
      console.error('Error saving media item to Firestore:', err);
    }
  };

  const handleDeleteMedia = async (id: string) => {
    setMediaItems(prev => prev.filter(m => m.id !== id));
    try {
      await deleteMediaItemFromFirestore(id);
    } catch (err) {
      console.error('Error deleting media from Firestore:', err);
    }
  };

  const handleSaveSettings = async (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    try {
      await saveSiteSettingsInFirestore(newSettings);
    } catch (err) {
      console.error('Error saving site settings to Firestore:', err);
    }
  };

  // If consumer site view is selected
  if (currentTab === 'consumer_site') {
    return (
      <ConsumerWebsiteView
        menuItems={menuItems}
        siteSettings={siteSettings}
        mediaItems={mediaItems}
        onReturnToAdmin={() => setCurrentTab('dashboard')}
        onSubmitReservation={handleCreateReservation}
      />
    );
  }

  // Pending reservations badge count
  const pendingCount = reservations.filter(r => r.status === 'Pending').length;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FDFCF5] text-[#1A1A1A] font-sans">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        pendingReservationsCount={pendingCount}
        onOpenNewReservation={() => setIsNewResModalOpen(true)}
        onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-[#FDFCF5]">
        {/* Persistent Top App Bar */}
        <TopAppBar
          currentTab={currentTab}
          brandName={siteSettings.brandName}
          onNavigate={(tab) => setCurrentTab(tab)}
          onOpenNewReservation={() => setIsNewResModalOpen(true)}
          onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
          isFirebaseConnected={isFirebaseConnected}
        />

        {/* View Router */}
        <main className="flex-1 overflow-y-auto bg-[#FDFCF5] flex flex-col">
          {currentTab === 'dashboard' && (
            <DashboardView
              reservations={reservations}
              menuItems={menuItems}
              siteSettings={siteSettings}
              onNavigateToReservations={() => setCurrentTab('reservations')}
              onNavigateToMenu={() => setCurrentTab('menu')}
              onNavigateToMedia={() => setCurrentTab('bento_media')}
              onManagePromotion={() => setIsPromoModalOpen(true)}
              onOpenReservationDetails={(res) => setSelectedResDetails(res)}
              onToggleAvailability={handleToggleMenuAvailability}
            />
          )}

          {currentTab === 'menu' && (
            <MenuCMSView
              menuItems={menuItems}
              onToggleAvailability={handleToggleMenuAvailability}
              onAddNewItem={() => {
                setEditingMenuItem(null);
                setIsMenuModalOpen(true);
              }}
              onEditItem={(item) => {
                setEditingMenuItem(item);
                setIsMenuModalOpen(true);
              }}
              onDeleteItem={handleDeleteMenuItem}
              onExportJSON={handleExportMenuJSON}
            />
          )}

          {currentTab === 'reservations' && (
            <ReservationsView
              reservations={reservations}
              onUpdateStatus={handleUpdateReservationStatus}
              onDeleteReservation={handleDeleteReservation}
              onOpenNewReservation={() => setIsNewResModalOpen(true)}
              onOpenReservationDetails={(res) => setSelectedResDetails(res)}
            />
          )}

          {currentTab === 'bento_media' && (
            <BentoMediaView
              mediaItems={mediaItems}
              onToggleFeatured={handleToggleMediaFeatured}
              onAddMedia={handleAddMedia}
              onDeleteMedia={handleDeleteMedia}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              settings={siteSettings}
              onSaveSettings={handleSaveSettings}
              onOpenFirebaseModal={() => setIsFirebaseModalOpen(true)}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              reservations={reservations}
              menuItems={menuItems}
              onNavigateToReservations={() => setCurrentTab('reservations')}
              onNavigateToMenu={() => setCurrentTab('menu')}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView
              reservations={reservations}
              menuItems={menuItems}
              siteSettings={siteSettings}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      <NewReservationModal
        isOpen={isNewResModalOpen}
        onClose={() => setIsNewResModalOpen(false)}
        onSubmit={handleCreateReservation}
      />

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => {
          setIsMenuModalOpen(false);
          setEditingMenuItem(null);
        }}
        onSave={handleSaveMenuItem}
        itemToEdit={editingMenuItem}
      />

      <PromotionModal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        menuItems={menuItems}
        onSelectFeaturedDish={handleSelectFeaturedDish}
      />

      <ReservationDetailsModal
        reservation={selectedResDetails}
        isOpen={!!selectedResDetails}
        onClose={() => setSelectedResDetails(null)}
        onUpdateStatus={handleUpdateReservationStatus}
        onDelete={handleDeleteReservation}
      />

      <FirebaseIntegrationModal
        isOpen={isFirebaseModalOpen}
        onClose={() => setIsFirebaseModalOpen(false)}
        isConnected={isFirebaseConnected}
        reservationsCount={reservations.length}
        menuItemsCount={menuItems.length}
      />
    </div>
  );
}
