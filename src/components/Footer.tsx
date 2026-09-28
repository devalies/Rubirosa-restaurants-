import React from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Phone, Clock, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <p className="text-xs text-stone-400 leading-relaxed font-normal">
              60-year Pappalardo family recipe thin-crust pizza and reinvented Italian-American classics served in the heart of Nolita since 2009.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-stone-400">
              <span className="text-[#F5B014] font-medium">Identifies as women-owned</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-300">LGBTQ+ friendly</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F5B014]">
              Explore
            </div>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button
                  onClick={() => {
                    setActivePage('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home & Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('menu');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Full Menu & Gluten-Free
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('reservation');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('reviews');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  7,600+ Diner Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActivePage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Location & Contact
                </button>
              </li>
              <li>
                <a
                  href="https://rubirosanyc.shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#F5B014] hover:text-[#ffd166] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Rubirosa Shop (Sauces & Merch)</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Service */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F5B014]">
              Hours & Service
            </div>
            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex items-center gap-2 text-stone-200">
                <Clock className="w-3.5 h-3.5 text-[#F5B014]" />
                <span className="font-semibold">Open 7 Days a Week</span>
              </div>
              <div>Mon – Thu: 11:00 AM – 11:00 PM</div>
              <div>Fri – Sat: 11:00 AM – 11:30 PM</div>
              <div>Sun: 11:00 AM – 10:30 PM</div>
              <div className="pt-1 text-[11px] text-stone-500">
                Kitchen closes 30 minutes prior to closing
              </div>
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F5B014]">
              Nolita Location
            </div>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F5B014] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-stone-400" />
                <a href="tel:+12129650500" className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phoneFormatted}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-stone-400" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-stone-500">
                Subway: Prince St (N/R/W) · Spring St (6) · Broadway-Lafayette (B/D/F/M)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Rubirosa NYC. All rights reserved.</p>
          <div className="flex items-center gap-1 text-[11px] text-stone-400">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#F5B014] fill-[#F5B014]" />
            <span>for Nolita pizza lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
