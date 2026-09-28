import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MenuItem } from '../types';
import { X, Heart, AlertTriangle, ShieldCheck, Calendar, Info } from 'lucide-react';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  const { favorites, toggleFavorite, setActivePage } = useApp();

  if (!item) return null;

  const isFavorite = favorites.includes(item.id);
  const isPizza = item.category === 'pizza';
  const [selectedCrust, setSelectedCrust] = useState<'round' | 'sicilian'>('round');

  const basePrice =
    selectedCrust === 'sicilian' && item.pizzaOptions?.sicilianPrice
      ? item.pizzaOptions.sicilianPrice
      : item.price;

  const handleBookTable = () => {
    onClose();
    setActivePage('reservation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200 font-sans"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Image banner */}
        <div className="relative h-60 sm:h-68 bg-stone-900 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-stone-900 text-stone-300 p-6 text-center">
              <span className="font-serif text-3xl text-stone-100 font-semibold">{item.name}</span>
              <span className="text-xs text-[#F5B014] mt-2 tracking-widest uppercase font-bold">
                Rubirosa Culinary Spec
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 p-2 bg-stone-900/70 hover:bg-stone-900 text-white rounded-full transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Favorite button */}
          <button
            onClick={() => toggleFavorite(item.id)}
            className="absolute top-3.5 left-3.5 p-2 bg-stone-900/70 hover:bg-stone-900 text-white rounded-full transition-colors backdrop-blur-md cursor-pointer"
            aria-label="Toggle favorite"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? 'fill-red-600 text-red-600' : 'text-white'
              }`}
            />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="text-xs font-bold text-[#F5B014] uppercase tracking-widest">
              {item.category.replace('-', ' & ')}
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight mt-0.5">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Price & Dietary highlights */}
          <div>
            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-serif font-bold text-stone-900 tabular-nums">
                ${basePrice}
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-600 font-medium">
                {item.isGlutenFree && (
                  <span className="flex items-center gap-1 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md font-bold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> 100% Gluten-Free
                  </span>
                )}
                {item.glutenFreeAvailable && !item.isGlutenFree && (
                  <span className="text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md font-bold">
                    GF Available Upon Request
                  </span>
                )}
                {item.isVegetarian && (
                  <span className="bg-stone-100 px-2 py-1 rounded-md text-stone-700">
                    Vegetarian
                  </span>
                )}
              </div>
            </div>
            <p className="mt-2.5 text-stone-600 text-sm leading-relaxed">{item.description}</p>
          </div>

          {/* Fresh ingredients */}
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-1.5">
              Authentic Ingredients
            </span>
            <p className="text-xs text-stone-600 leading-relaxed">
              {item.ingredients.join(' · ')}
            </p>
          </div>

          {/* Clear Allergen Warning */}
          <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-xl flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 space-y-1">
              <span className="font-bold text-amber-900">Allergen Notice:</span>
              <div>
                Contains:{' '}
                <span className="capitalize font-semibold">
                  {item.allergens.length > 0 ? item.allergens.join(', ') : 'None of major 8'}
                </span>
              </div>
              {item.allergenNote && (
                <div className="text-amber-800 italic mt-0.5">{item.allergenNote}</div>
              )}
            </div>
          </div>

          {/* Pizza Specific Styles */}
          {isPizza && (
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                Available Crust Preparations
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedCrust('round')}
                  className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                    selectedCrust === 'round'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-stone-900">Round Thin Crust</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Original 1960 family recipe</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCrust('sicilian')}
                  className={`p-3 text-left border rounded-xl transition-all cursor-pointer ${
                    selectedCrust === 'sicilian'
                      ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                      : 'border-stone-200 bg-white'
                  }`}
                >
                  <div className="text-xs font-bold text-stone-900">Sicilian Square Crust</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Airy focaccia pan crust (+$5)</div>
                </button>
              </div>

              {item.glutenFreeAvailable && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    Our kitchen prepares gluten-free pizzas on dedicated allergy-safe pans with separate cutters.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer (No shopping buttons: just Reserve Table CTA and Close) */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            Back to Menu
          </button>

          <button
            onClick={handleBookTable}
            className="flex-1 py-3 px-5 bg-[#F5B014] hover:bg-[#e5a40f] text-stone-950 rounded-xl font-bold text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>Book Table to Taste</span>
          </button>
        </div>
      </div>
    </div>
  );
};
