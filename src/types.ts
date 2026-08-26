export type TabType = 
  | 'dashboard' 
  | 'menu' 
  | 'reservations' 
  | 'bento_media' 
  | 'analytics' 
  | 'reports' 
  | 'settings' 
  | 'consumer_site';

export type CategoryType = 'specialties' | 'sides' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: CategoryType;
  image: string;
  available: boolean;
  isFeatured?: boolean;
  prepTimeMinutes?: number;
}

export type ReservationStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';

export interface Reservation {
  id: string;
  customerName: string;
  contactPhone: string;
  partySize: number;
  date: string;
  time: string;
  status: ReservationStatus;
  isVIP?: boolean;
  isCorporate?: boolean;
  specialRequests?: string;
  createdAt: string;
}

export interface SiteSettings {
  brandName: string;
  locationTag: string;
  address: string;
  phone: string;
  email: string;
  openTime: string;
  closeTime: string;
  hoursType: 'custom' | '24hours';
  headline: string;
  subheadline: string;
  instagramHandle?: string;
  googleMapsUrl?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  type: 'photo' | 'video';
  featuredOnBento: boolean;
  author?: string;
  likes?: number;
}
