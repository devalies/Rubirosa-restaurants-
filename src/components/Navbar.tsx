import React from 'react';
import { useApp } from '../context/AppContext';
import { RubirosaLogo } from './RubirosaLogo';
import { Menu as MenuIcon, X, Calendar, ShoppingBag, ExternalLink } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activePage,
    setActivePage,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useApp();

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'reservation', label: 'Reserve a Table' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => {
              setActivePage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="cursor-pointer text-left focus:outline-none"
            aria-label="Rubirosa Home"
          >
            <RubirosaLogo className="h-10" variant="horizontal" />
          </button>

          {/* Clean text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700 font-sans">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActivePage(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`relative py-1 cursor-pointer transition-colors whitespace-nowrap text-[15px] ${
                    isActive ? 'text-stone-950 font-bold' : 'hover:text-stone-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F5B014] rounded-full animate-in fade-in duration-200" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Shop & Reserve Table */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://rubirosanyc.shop/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-stone-800 hover:text-stone-950 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg transition-all shadow-xs whitespace-nowrap active:scale-95"
              aria-label="Shop Rubirosa online store"
              title="Shop Rubirosa online (opens in new tab)"
            >
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F5B014]" />
              <span>Shop</span>
              <ExternalLink className="w-3 h-3 text-stone-400 hidden sm:inline" />
            </a>

            <button
              onClick={() => {
                setActivePage('reservation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-stone-950 bg-[#F5B014] hover:bg-[#e5a40f] rounded-lg transition-all cursor-pointer shadow-xs whitespace-nowrap active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-950" />
              <span>Reserve Table</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FAF8F5] p-6 shadow-xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-stone-200">
                <RubirosaLogo className="h-9" variant="horizontal" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-stone-500 hover:text-stone-800 rounded-md cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list */}
              <div className="mt-6 flex flex-col gap-2 font-sans">
                {navLinks.map((link) => {
                  const isActive = activePage === link.id;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActivePage(link.id);
                        setIsMobileMenuOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-stone-950 text-white font-semibold'
                          : 'text-stone-800 hover:bg-stone-100'
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 space-y-3 font-sans">
              <a
                href="https://rubirosanyc.shop/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-white hover:bg-stone-100 text-stone-950 font-semibold rounded-lg text-sm text-center shadow-xs border border-stone-200 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-[#F5B014]" />
                <span>Shop Sauces & Merch Online</span>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>

              <button
                onClick={() => {
                  setActivePage('reservation');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-3.5 bg-[#F5B014] hover:bg-[#e5a40f] text-stone-950 font-bold rounded-lg text-sm text-center shadow-xs cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Reserve a Table</span>
              </button>
              <div className="text-center text-xs text-stone-500">
                235 Mulberry St, Nolita · (212) 965-0500
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
