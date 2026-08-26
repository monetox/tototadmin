import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { MenuItem, Reservation, SiteSettings, MediaItem, ReservationStatus } from './types';
import { 
  INITIAL_MENU_ITEMS, 
  INITIAL_RESERVATIONS, 
  INITIAL_SITE_SETTINGS, 
  INITIAL_MEDIA_POSTS 
} from './data/initialData';

export const firebaseConfig = {
  apiKey: "AIzaSyBz1d6Zehv5y2Jvqbhv9Y3C1gEhrcEkL0I",
  authDomain: "totot-restaurant-15a8c.firebaseapp.com",
  projectId: "totot-restaurant-15a8c",
  storageBucket: "totot-restaurant-15a8c.firebasestorage.app",
  messagingSenderId: "470989846823",
  appId: "1:470989846823:web:08ef90ac279a66a65d5102",
  measurementId: "G-JPPX9B2ST7"
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Firestore Collections & Doc References
export const RESERVATIONS_COLLECTION = 'reservations';
export const MENU_COLLECTION = 'menu_items';
export const SETTINGS_COLLECTION = 'site_settings';
export const SETTINGS_DOC = 'general';
export const MEDIA_COLLECTION = 'media_items';

/**
 * Seed initial data if Firestore collections are empty
 */
export async function seedInitialFirestoreDataIfEmpty() {
  try {
    // Check Menu
    const menuSnapshot = await getDocs(collection(db, MENU_COLLECTION));
    if (menuSnapshot.empty) {
      const batch = writeBatch(db);
      INITIAL_MENU_ITEMS.forEach(item => {
        const itemRef = doc(db, MENU_COLLECTION, item.id);
        batch.set(itemRef, item);
      });
      await batch.commit();
      console.log('Firebase: Initial menu items seeded.');
    }

    // Check Settings
    const settingsSnapshot = await getDocs(collection(db, SETTINGS_COLLECTION));
    if (settingsSnapshot.empty) {
      await setDoc(doc(db, SETTINGS_COLLECTION, SETTINGS_DOC), INITIAL_SITE_SETTINGS);
      console.log('Firebase: Initial settings seeded.');
    }

    // Check Media
    const mediaSnapshot = await getDocs(collection(db, MEDIA_COLLECTION));
    if (mediaSnapshot.empty) {
      const batch = writeBatch(db);
      INITIAL_MEDIA_POSTS.forEach(media => {
        const mediaRef = doc(db, MEDIA_COLLECTION, media.id);
        batch.set(mediaRef, media);
      });
      await batch.commit();
      console.log('Firebase: Initial media posts seeded.');
    }

    // Check Reservations
    const resSnapshot = await getDocs(collection(db, RESERVATIONS_COLLECTION));
    if (resSnapshot.empty) {
      const batch = writeBatch(db);
      INITIAL_RESERVATIONS.forEach(res => {
        const resRef = doc(db, RESERVATIONS_COLLECTION, res.id);
        batch.set(resRef, res);
      });
      await batch.commit();
      console.log('Firebase: Initial reservations seeded.');
    }
  } catch (err) {
    console.warn('Firebase auto-seed notice (permissions/network):', err);
  }
}

/**
 * Real-time Listener for Reservations
 */
export function subscribeToReservations(callback: (reservations: Reservation[]) => void, onError?: (err: Error) => void) {
  const colRef = collection(db, RESERVATIONS_COLLECTION);
  return onSnapshot(colRef, (snapshot) => {
    if (!snapshot.empty) {
      const list: Reservation[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          customerName: data.customerName || data.name || 'Guest',
          contactPhone: data.contactPhone || data.phone || data['Phone Number'] || '',
          partySize: Number(data.partySize || data.guests || 2),
          date: data.date || '',
          time: data.time || '',
          status: (data.status as ReservationStatus) || 'Pending',
          isVIP: !!data.isVIP,
          isCorporate: !!data.isCorporate,
          specialRequests: data.specialRequests || data.notes || '',
          createdAt: data.createdAt || new Date().toISOString()
        });
      });
      callback(list);
    }
  }, (err) => {
    console.error('Error listening to reservations:', err);
    if (onError) onError(err);
  });
}

/**
 * Real-time Listener for Menu Items
 */
export function subscribeToMenuItems(callback: (items: MenuItem[]) => void, onError?: (err: Error) => void) {
  const colRef = collection(db, MENU_COLLECTION);
  return onSnapshot(colRef, (snapshot) => {
    if (!snapshot.empty) {
      const list: MenuItem[] = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        list.push({
          id: docSnap.id,
          name: data.name || '',
          description: data.description || data.desc || '',
          price: Number(data.price) || 0,
          category: data.category || 'specialties',
          image: data.image || '',
          available: data.available !== undefined ? !!data.available : true,
          isFeatured: !!data.isFeatured,
          prepTimeMinutes: data.prepTimeMinutes || 15
        });
      });
      callback(list);
    }
  }, (err) => {
    console.error('Error listening to menu items:', err);
    if (onError) onError(err);
  });
}

/**
 * Real-time Listener for Site Settings
 */
export function subscribeToSiteSettings(callback: (settings: SiteSettings) => void, onError?: (err: Error) => void) {
  const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data() as SiteSettings);
    }
  }, (err) => {
    console.error('Error listening to site settings:', err);
    if (onError) onError(err);
  });
}

/**
 * Real-time Listener for Media Items
 */
export function subscribeToMediaItems(callback: (items: MediaItem[]) => void, onError?: (err: Error) => void) {
  const colRef = collection(db, MEDIA_COLLECTION);
  return onSnapshot(colRef, (snapshot) => {
    if (!snapshot.empty) {
      const list: MediaItem[] = [];
      snapshot.forEach(docSnap => {
        list.push({
          id: docSnap.id,
          ...docSnap.data()
        } as MediaItem);
      });
      callback(list);
    }
  }, (err) => {
    console.error('Error listening to media items:', err);
    if (onError) onError(err);
  });
}

// ------------------- Mutation Helpers -------------------

/**
 * Add or Save a reservation in Firestore
 */
export async function createReservationInFirestore(resData: Omit<Reservation, 'id' | 'createdAt' | 'status'> & { status?: ReservationStatus }) {
  try {
    const newDocRef = doc(collection(db, RESERVATIONS_COLLECTION));
    const record: Reservation = {
      ...resData,
      id: newDocRef.id,
      status: resData.status || 'Pending',
      createdAt: new Date().toISOString()
    };
    await setDoc(newDocRef, record);
    return record;
  } catch (err) {
    console.error('Failed to create reservation in Firestore:', err);
    throw err;
  }
}

/**
 * Update reservation status
 */
export async function updateReservationStatusInFirestore(id: string, status: ReservationStatus) {
  try {
    const resRef = doc(db, RESERVATIONS_COLLECTION, id);
    await updateDoc(resRef, { status });
  } catch (err) {
    console.error('Failed to update reservation status in Firestore:', err);
    throw err;
  }
}

/**
 * Delete a reservation
 */
export async function deleteReservationFromFirestore(id: string) {
  try {
    const resRef = doc(db, RESERVATIONS_COLLECTION, id);
    await deleteDoc(resRef);
  } catch (err) {
    console.error('Failed to delete reservation in Firestore:', err);
    throw err;
  }
}

/**
 * Save / Update Menu Item
 */
export async function saveMenuItemInFirestore(item: MenuItem) {
  try {
    const itemRef = doc(db, MENU_COLLECTION, item.id);
    await setDoc(itemRef, item, { merge: true });
  } catch (err) {
    console.error('Failed to save menu item in Firestore:', err);
    throw err;
  }
}

/**
 * Delete Menu Item
 */
export async function deleteMenuItemFromFirestore(id: string) {
  try {
    const itemRef = doc(db, MENU_COLLECTION, id);
    await deleteDoc(itemRef);
  } catch (err) {
    console.error('Failed to delete menu item from Firestore:', err);
    throw err;
  }
}

/**
 * Save Site Settings
 */
export async function saveSiteSettingsInFirestore(settings: SiteSettings) {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, SETTINGS_DOC);
    await setDoc(docRef, settings, { merge: true });
  } catch (err) {
    console.error('Failed to save site settings in Firestore:', err);
    throw err;
  }
}

/**
 * Save Media Item
 */
export async function saveMediaItemInFirestore(item: MediaItem) {
  try {
    const itemRef = doc(db, MEDIA_COLLECTION, item.id);
    await setDoc(itemRef, item, { merge: true });
  } catch (err) {
    console.error('Failed to save media item in Firestore:', err);
    throw err;
  }
}

/**
 * Delete Media Item
 */
export async function deleteMediaItemFromFirestore(id: string) {
  try {
    const itemRef = doc(db, MEDIA_COLLECTION, id);
    await deleteDoc(itemRef);
  } catch (err) {
    console.error('Failed to delete media item in Firestore:', err);
    throw err;
  }
}
