import { MenuItem, Reservation, SiteSettings, MediaItem } from '../types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-1',
    name: 'Totot Special Kitfo',
    description: 'Finely minced premium lean beef warmed in authentic niter kibbeh (clarified spiced butter) and mitmita, served with freshly made ayib and braised gomen on enset leaves.',
    price: 520,
    category: 'specialties',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: true,
    prepTimeMinutes: 15
  },
  {
    id: 'item-2',
    name: 'Kitfo Leb-Leb (Lightly Warmed)',
    description: 'Gently warmed rare minced beef with aromatic korarima cardamom, seasoned clarified butter, and warm kocho.',
    price: 480,
    category: 'specialties',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 12
  },
  {
    id: 'item-3',
    name: 'Gored Gored Prime',
    description: 'Lean tenderloin cubes gently warmed with rich spiced butter, awaze chili dip, and served with injera rolls.',
    price: 490,
    category: 'specialties',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 10
  },
  {
    id: 'item-4',
    name: 'Dulet Special',
    description: 'Traditional Gurage delicacy of finely minced beef, tripe, and liver sautéed with diced red onions, jalapeños, garlic, and spiced butter.',
    price: 410,
    category: 'specialties',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 18
  },
  {
    id: 'item-5',
    name: 'Gomen Besiga',
    description: 'Tender collard greens slow-braised with rich beef short ribs, ginger, and garlic.',
    price: 380,
    category: 'specialties',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/Gomen_besiga.jpg',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 20
  },
  {
    id: 'item-6',
    name: 'Traditional Ayib with Mitmita',
    description: 'Cool Ethiopian cottage cheese whipped with mild herbs to balance spicy dishes.',
    price: 120,
    category: 'sides',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 5
  },
  {
    id: 'item-7',
    name: 'Warm Kocho Flatbread',
    description: 'Fermented enset flatbread, griddled crisp on the outside and soft within.',
    price: 80,
    category: 'sides',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 5
  },
  {
    id: 'item-8',
    name: 'Jebena Coffee Ceremony',
    description: 'Table-side frankincense, freshly roasted Yirgacheffe coffee beans brewed slowly in clay pottery.',
    price: 250,
    category: 'drinks',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: true,
    prepTimeMinutes: 15
  },
  {
    id: 'item-9',
    name: 'Artisanal Tej (Honey Wine)',
    description: 'House-fermented honey wine aged with gesho leaves in glass flasks.',
    price: 190,
    category: 'drinks',
    image: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    available: true,
    isFeatured: false,
    prepTimeMinutes: 5
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-101',
    customerName: 'Dr. Yohannes Berhane',
    contactPhone: '+251 91 123 4567',
    partySize: 6,
    date: '2026-08-26',
    time: '19:30',
    status: 'Confirmed',
    isVIP: true,
    isCorporate: true,
    specialRequests: 'Mesob table by the Jebena coffee ritual, mild spice kitfo.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'res-102',
    customerName: 'Sara Mengistu',
    contactPhone: '+251 92 884 9102',
    partySize: 4,
    date: '2026-08-26',
    time: '20:00',
    status: 'Pending',
    isVIP: false,
    isCorporate: false,
    specialRequests: 'Birthday celebration, extra kocho baskets.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'res-103',
    customerName: 'Abebe Tadesse',
    contactPhone: '+251 93 450 1199',
    partySize: 2,
    date: '2026-08-26',
    time: '18:45',
    status: 'Confirmed',
    isVIP: false,
    isCorporate: false,
    specialRequests: 'Leb-leb kitfo with extra ayib.',
    createdAt: new Date().toISOString()
  },
  {
    id: 'res-104',
    customerName: 'Hilton Addis Delegation',
    contactPhone: '+251 11 517 0000',
    partySize: 12,
    date: '2026-08-27',
    time: '13:00',
    status: 'Confirmed',
    isVIP: true,
    isCorporate: true,
    specialRequests: 'Banquet cultural mesob seating with full coffee ritual.',
    createdAt: new Date().toISOString()
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  brandName: 'Totot Cultural Restaurant',
  locationTag: 'Gerji, Addis Ababa',
  address: '2R54+2W4, Gerji Imperial Street, Bole Sub-City, Addis Ababa, Ethiopia',
  phone: '+251 11 646 0718',
  email: 'concierge@tototrestaurant.com',
  openTime: '08:00',
  closeTime: '23:30',
  hoursType: '24hours',
  headline: 'Crafted Tradition. Pure Flavor.',
  subheadline: 'Totot Kitfo brings the authentic Gurage art of kitfo to Gerji — finely minced beef, warmed gently in niter kibbeh and mitmita, served the way it has been for generations.',
  instagramHandle: '@totot_kitfo',
  googleMapsUrl: 'https://maps.google.com/?q=Totot+Traditional+Restaurant+Gerji+Addis+Ababa'
};

export const INITIAL_MEDIA_POSTS: MediaItem[] = [
  {
    id: 'med-1',
    title: 'Traditional Atmosphere & Low Mesob Seating',
    caption: 'Patrons enjoying authentic Gurage hospitality and freshly brewed coffee.',
    imageUrl: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    type: 'photo',
    featuredOnBento: true,
    author: 'Totot Archives',
    likes: 42
  },
  {
    id: 'med-2',
    title: 'Fresh Gomen Besiga Plating',
    caption: 'Slow-braised collard greens with tender beef cuts on banana leaves.',
    imageUrl: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/Gomen_besiga.jpg',
    type: 'photo',
    featuredOnBento: true,
    author: 'Chef Mesfin',
    likes: 29
  },
  {
    id: 'med-3',
    title: 'Master Chef Kitfo Preparation',
    caption: 'Hand-mincing tender beef to order with spiced clarified butter.',
    imageUrl: 'https://raw.githubusercontent.com/Tototkitfo/Totot-kitfo/main/caption.jpg',
    type: 'video',
    featuredOnBento: true,
    author: 'Totot Kitchen',
    likes: 67
  }
];

export const initialMenuItems = INITIAL_MENU_ITEMS;
export const initialReservations = INITIAL_RESERVATIONS;
export const initialSiteSettings = INITIAL_SITE_SETTINGS;
export const initialMediaItems = INITIAL_MEDIA_POSTS;
