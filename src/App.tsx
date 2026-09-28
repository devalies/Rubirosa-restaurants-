/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { ReservationView } from './components/ReservationView';
import { ReviewsView } from './components/ReviewsView';
import { ContactView } from './components/ContactView';
import { ItemModal } from './components/ItemModal';
import { Toast } from './components/Toast';
import { Calendar, UtensilsCrossed, Home, MessageSquare, Phone } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activePage,
    setActivePage,
    selectedMenuItem,
    setSelectedMenuItem,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-900 font-sans selection:bg-[#F5B014]/30 selection:text-stone-900">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-0">
        {activePage === 'home' && <HomeView />}
        {activePage === 'menu' && <MenuView />}
        {activePage === 'reservation' && <ReservationView />}
        {activePage === 'reviews' && <ReviewsView />}
        {activePage === 'contact' && <ContactView />}
      </main>

      {/* Item Detail / Allergen Modal */}
      <ItemModal
        item={selectedMenuItem}
        onClose={() => setSelectedMenuItem(null)}
      />

      {/* Notification Toast */}
      <Toast />

      {/* Mobile Sticky Navigation Bar (Clean & Focused, No Shopping Bag) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 flex items-center justify-around gap-1.5 shadow-lg">
        <button
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 py-2 px-1 rounded-lg text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            activePage === 'home'
              ? 'bg-stone-950 text-[#F5B014]'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>Home</span>
        </button>

        <button
          onClick={() => {
            setActivePage('menu');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 py-2 px-1 rounded-lg text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            activePage === 'menu'
              ? 'bg-stone-950 text-[#F5B014]'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Menu</span>
        </button>

        <button
          onClick={() => {
            setActivePage('reservation');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 py-2 px-1 rounded-lg text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            activePage === 'reservation'
              ? 'bg-stone-950 text-[#F5B014]'
              : 'bg-[#F5B014] text-stone-950 shadow-xs'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Reserve</span>
        </button>

        <button
          onClick={() => {
            setActivePage('reviews');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 py-2 px-1 rounded-lg text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            activePage === 'reviews'
              ? 'bg-stone-950 text-[#F5B014]'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Reviews</span>
        </button>

        <button
          onClick={() => {
            setActivePage('contact');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex-1 py-2 px-1 rounded-lg text-[11px] font-bold flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            activePage === 'contact'
              ? 'bg-stone-950 text-[#F5B014]'
              : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Contact</span>
        </button>
      </div>

      {/* Brand Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
