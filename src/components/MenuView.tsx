import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuCategory, DietaryPreference } from '../types';
import {
  Search,
  SlidersHorizontal,
  ShieldCheck,
  AlertTriangle,
  Heart,
  ChevronRight,
  Check,
} from 'lucide-react';

export const MenuView: React.FC = () => {
  const { setSelectedMenuItem, favorites, toggleFavorite, menuSearchQuery, setMenuSearchQuery } = useApp();

  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryPreference[]>([]);
  const [showAllergenBanner, setShowAllergenBanner] = useState(true);

  const categories: { id: MenuCategory; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'pizza', label: 'Thin Crust Pizza' },
    { id: 'pasta', label: 'Handmade Pasta' },
    { id: 'insalata', label: 'Insalata' },
    { id: 'antipasti', label: 'Antipasti' },
    { id: 'secondi', label: 'Secondi' },
    { id: 'dolci-cocktails', label: 'Dolci & Cocktails' },
  ];

  const dietaryFilters: { id: DietaryPreference; label: string }[] = [
    { id: 'gluten-free', label: '100% Gluten-Free' },
    { id: 'gluten-free-available', label: 'GF Available' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'nut-free', label: 'Nut-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
  ];

  const toggleDietaryFilter = (diet: DietaryPreference) => {
    setSelectedDietary((prev) =>
      prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]
    );
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // Search query match
      if (menuSearchQuery.trim()) {
        const query = menuSearchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients.some((ing) => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      // Dietary filters match
      for (const diet of selectedDietary) {
        if (diet === 'gluten-free' && !item.isGlutenFree) return false;
        if (diet === 'gluten-free-available' && !item.glutenFreeAvailable && !item.isGlutenFree) return false;
        if (diet === 'vegetarian' && !item.isVegetarian) return false;
        if (diet === 'vegan' && !item.isVegan) return false;
        if (diet === 'nut-free' && item.allergens.includes('nuts')) return false;
        if (diet === 'dairy-free' && item.allergens.includes('dairy')) return false;
      }

      return true;
    });
  }, [activeCategory, menuSearchQuery, selectedDietary]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 font-sans">
      {/* Menu Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="text-xs font-bold uppercase tracking-widest text-[#F5B014]">
          Nolita Trattoria Menu
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Reinvented Italian Classics & Thin Crust Pizza
        </h1>
        <p className="text-sm text-stone-600 max-w-3xl leading-relaxed">
          60-year Staten Island family dough tradition, freshly rolled handmade pasta, and our renowned dedicated allergy and gluten-free culinary program on Mulberry Street.
        </p>
      </div>

      {/* Allergen Advisory Banner */}
      {showAllergenBanner && (
        <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950 space-y-1">
              <span className="font-bold text-amber-900">
                Allergen & Gluten-Free Kitchen Protocol:
              </span>
              <p className="text-amber-900/90 leading-relaxed">
                Please alert your server to any allergies. Virtually all pastas and pizzas can be made 100% gluten-free on dedicated sanitized equipment. Note: Our fresh basil pesto contains <strong className="underline">pine nuts</strong> and romesco sauce contains <strong className="underline">almonds</strong>.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAllergenBanner(false)}
            className="text-amber-800 hover:text-amber-950 text-xs font-semibold cursor-pointer p-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Search and Filters Control Center */}
      <div className="space-y-4 bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pizza, pasta, salad, ingredients (e.g. vodka, tie dye, burrata, calamari)..."
            value={menuSearchQuery}
            onChange={(e) => setMenuSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-[#F5B014] focus:bg-white transition-all"
          />
          {menuSearchQuery && (
            <button
              onClick={() => setMenuSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick popular search prompts */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs pb-1 scrollbar-none">
          <span className="text-stone-400 shrink-0 font-medium">Popular:</span>
          {['Tie Dye', 'Vodka', 'Cavatelli', 'Rubirosa Salad', 'Honey Pie', 'Garlic Knots'].map(
            (tag) => (
              <button
                key={tag}
                onClick={() => setMenuSearchQuery(tag)}
                className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-md transition-colors whitespace-nowrap cursor-pointer font-medium"
              >
                {tag}
              </button>
            )
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-stone-100 pt-3">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-stone-950 text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dietary Preference Filter Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100">
          <div className="text-xs text-stone-600 font-bold flex items-center gap-1.5 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-500" />
            <span>Dietary:</span>
          </div>
          {dietaryFilters.map((diet) => {
            const isSelected = selectedDietary.includes(diet.id);
            return (
              <button
                key={diet.id}
                onClick={() => toggleDietaryFilter(diet.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-md border transition-all cursor-pointer whitespace-nowrap font-medium ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 font-bold'
                    : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-emerald-700 stroke-[3]" />}
                <span>{diet.label}</span>
              </button>
            );
          })}

          {selectedDietary.length > 0 && (
            <button
              onClick={() => setSelectedDietary([])}
              className="text-xs text-stone-500 hover:text-stone-900 underline ml-auto cursor-pointer font-medium"
            >
              Reset filters
            </button>
          )}
        </div>
      </div>

      {/* Results Count & Indication */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <div>
          Showing <span className="font-bold text-stone-900 tabular-nums">{filteredItems.length}</span> dishes
          {activeCategory !== 'all' && ` in ${categories.find((c) => c.id === activeCategory)?.label}`}
        </div>
        <div className="hidden sm:block text-stone-500">
          Click any dish to view ingredients, crust styles, and allergen details
        </div>
      </div>

      {/* Menu Grid */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-3">
          <div className="font-serif text-xl font-bold text-stone-800">
            No dishes match your current filters
          </div>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try clearing the search query or loosening your dietary filters to explore our full trattoria menu.
          </p>
          <button
            onClick={() => {
              setMenuSearchQuery('');
              setSelectedDietary([]);
              setActiveCategory('all');
            }}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isFav = favorites.includes(item.id);
            const hasNutWarning = item.allergens.includes('nuts');

            return (
              <div
                key={item.id}
                onClick={() => setSelectedMenuItem(item)}
                className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                {/* Image if available */}
                {item.image && (
                  <div className="relative aspect-16/9 overflow-hidden bg-stone-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.signature && (
                      <div className="absolute top-2.5 left-2.5 bg-stone-950/85 backdrop-blur-md text-[#F5B014] text-[11px] font-bold px-2.5 py-0.5 rounded">
                        Signature
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-stone-950/60 text-white hover:bg-stone-900 transition-colors"
                      aria-label="Toggle favorite"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          isFav ? 'fill-red-600 text-red-600' : 'text-white'
                        }`}
                      />
                    </button>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-red-900 transition-colors">
                          {item.name}
                        </h3>
                        {/* Metadata dots */}
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-0.5">
                          {item.isGlutenFree ? (
                            <span className="text-emerald-700 font-bold">100% Gluten-Free</span>
                          ) : item.glutenFreeAvailable ? (
                            <span className="text-stone-600 font-medium">GF Available</span>
                          ) : null}

                          {(item.isGlutenFree || item.glutenFreeAvailable) && item.isVegetarian && (
                            <span aria-hidden="true">·</span>
                          )}

                          {item.isVegetarian && <span>Vegetarian</span>}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-lg font-bold text-stone-900 tabular-nums">
                          ${item.price}
                        </span>
                        {item.pizzaOptions?.supportsSicilian && (
                          <div className="text-[10px] text-stone-400">Sicilian avail.</div>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Allergen Warning Highlight if tree nuts present */}
                    {hasNutWarning && (
                      <div className="flex items-center gap-1 text-[11px] text-amber-800 bg-amber-50/70 px-2 py-1 rounded">
                        <AlertTriangle className="w-3 h-3 text-amber-700 shrink-0" />
                        <span>Contains tree nuts (pesto/romesco)</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-stone-400 capitalize">
                      {item.category.replace('-', ' & ')}
                    </span>
                    <button
                      type="button"
                      className="flex items-center gap-1 font-bold text-stone-900 group-hover:text-[#c48d0e] transition-colors"
                    >
                      <span>View Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
