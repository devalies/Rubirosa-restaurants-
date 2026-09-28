import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, ReviewItem, ReservationData } from '../types';
import { REVIEWS_DATA } from '../data/restaurantData';

interface ToastState {
  id: string;
  message: string;
  type?: 'success' | 'info';
}

interface AppContextType {
  activePage: string;
  setActivePage: (page: string) => void;
  reservations: ReservationData[];
  createReservation: (reservation: Omit<ReservationData, 'id' | 'createdAt' | 'status'>) => ReservationData;
  cancelReservation: (id: string) => void;
  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id' | 'date' | 'likesCount'>) => void;
  favorites: string[];
  toggleFavorite: (menuItemId: string) => void;
  selectedMenuItem: MenuItem | null;
  setSelectedMenuItem: (item: MenuItem | null) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  toast: ToastState | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
  dismissToast: () => void;
  menuSearchQuery: string;
  setMenuSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>('home');

  const [reservations, setReservations] = useState<ReservationData[]>(() => {
    try {
      const saved = localStorage.getItem('rubirosa_reservations');
      return saved
        ? JSON.parse(saved)
        : [
            {
              id: 'res-sample-1',
              guestName: 'Elena Rossi',
              email: 'elena.rossi@nyc.rr.com',
              phone: '(212) 555-0198',
              date: '2026-10-02',
              time: '7:30 PM',
              partySize: 2,
              seatingArea: 'main-dining',
              dietaryNotes: 'One diner requires gluten-free pasta and pizza options.',
              specialOccasion: 'Anniversary Dinner',
              createdAt: '2026-09-27',
              status: 'confirmed',
            },
          ];
    } catch {
      return [];
    }
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('rubirosa_reviews');
      return saved ? JSON.parse(saved) : REVIEWS_DATA;
    } catch {
      return REVIEWS_DATA;
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('rubirosa_favorites');
      return saved ? JSON.parse(saved) : ['pizza-tie-dye', 'salad-rubirosa'];
    } catch {
      return ['pizza-tie-dye', 'salad-rubirosa'];
    }
  });

  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [menuSearchQuery, setMenuSearchQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('rubirosa_reservations', JSON.stringify(reservations));
    } catch (e) {
      console.error(e);
    }
  }, [reservations]);

  useEffect(() => {
    try {
      localStorage.setItem('rubirosa_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('rubirosa_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }, [favorites]);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((curr) => (curr?.id === id ? null : curr));
    }, 3500);
  };

  const dismissToast = () => setToast(null);

  const createReservation = (data: Omit<ReservationData, 'id' | 'createdAt' | 'status'>): ReservationData => {
    const newRes: ReservationData = {
      ...data,
      id: `res-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'confirmed',
    };

    setReservations((prev) => [newRes, ...prev]);
    showToast('Table reservation confirmed for ' + data.guestName);
    return newRes;
  };

  const cancelReservation = (id: string) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'cancelled' as const } : r))
    );
    showToast('Reservation cancelled.');
  };

  const addReview = (newReviewData: Omit<ReviewItem, 'id' | 'date' | 'likesCount'>) => {
    const newRev: ReviewItem = {
      ...newReviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      likesCount: 1,
      ownerResponse: {
        date: 'Just now',
        text: 'Grazie mille! The Rubirosa family appreciates your review and look forward to cooking for you on Mulberry St again soon!',
      },
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you for sharing your dining review!');
  };

  const toggleFavorite = (menuItemId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(menuItemId);
      if (exists) {
        showToast('Removed from favorites', 'info');
        return prev.filter((id) => id !== menuItemId);
      } else {
        showToast('Saved to your favorites', 'success');
        return [...prev, menuItemId];
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        reservations,
        createReservation,
        cancelReservation,
        reviews,
        addReview,
        favorites,
        toggleFavorite,
        selectedMenuItem,
        setSelectedMenuItem,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        toast,
        showToast,
        dismissToast,
        menuSearchQuery,
        setMenuSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
