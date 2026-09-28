import React from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/restaurantData';
import {
  Star,
  MapPin,
  Clock,
  Navigation,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setActivePage, setSelectedMenuItem } = useApp();

  const featuredItems = MENU_ITEMS.filter((i) => i.popular || i.signature).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 font-sans">
      {/* 1. Cinematic Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        {/* Background Image with dark gradient scrim */}
        <div className="absolute inset-0">
          <img
            src={RESTAURANT_INFO.images.heroPizza}
            alt="Rubirosa Tie Dye Thin Crust Pizza"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/80 to-stone-950/50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32 flex flex-col justify-end min-h-[620px]">
          <div className="max-w-3xl space-y-6">
            {/* Trust metadata */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-stone-300">
              <span className="flex items-center gap-1 font-semibold text-[#F5B014]">
                <Star className="w-4 h-4 fill-[#F5B014] text-[#F5B014]" />
                <span className="tabular-nums font-bold text-base text-white">
                  {RESTAURANT_INFO.rating}
                </span>
              </span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span className="tabular-nums font-medium">({RESTAURANT_INFO.reviewsCount.toLocaleString()} reviews)</span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span>{RESTAURANT_INFO.priceRange}</span>
              <span aria-hidden="true" className="text-stone-500">·</span>
              <span className="text-[#F5B014] font-medium">Pizza & Italian Trattoria</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
              Rubirosa NYC
            </h1>

            {/* Subheading / Brief */}
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed font-normal max-w-2xl">
              {RESTAURANT_INFO.tagline}
            </p>

            {/* Key Service Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-300 pt-1 font-medium">
              {RESTAURANT_INFO.services.map((srv, idx) => (
                <React.Fragment key={srv}>
                  <span className="text-stone-200">{srv}</span>
                  {idx < RESTAURANT_INFO.services.length - 1 && (
                    <span aria-hidden="true" className="text-stone-600">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Google Maps Actions Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Primary CTA */}
              <button
                onClick={() => setActivePage('reservation')}
                className="px-6 py-3.5 bg-[#F5B014] hover:bg-[#e5a40f] text-stone-950 font-bold text-sm rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-stone-950" />
                <span>Reserve a Table</span>
              </button>

              <button
                onClick={() => setActivePage('menu')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-lg backdrop-blur-md transition-all cursor-pointer whitespace-nowrap border border-white/20"
              >
                View Full Menu
              </button>

              {/* Action Buttons */}
              <button
                onClick={() =>
                  window.open(
                    'https://maps.google.com/?q=235+Mulberry+St,+New+York,+NY+10012',
                    '_blank'
                  )
                }
                className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-colors cursor-pointer border border-white/20"
                title="Directions"
                aria-label="Get Directions"
              >
                <Navigation className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Restaurant Snapshot Bar (Google Maps Details) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200/90 grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Location */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Mulberry St · Nolita
              </div>
              <div className="text-sm font-semibold text-stone-900 mt-0.5">
                235 Mulberry St, NY 10012
              </div>
              <div className="text-xs text-stone-500 mt-0.5">{RESTAURANT_INFO.plusCode}</div>
            </div>
          </div>

          {/* Hours Status */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Operating Status
              </div>
              <div className="text-sm font-semibold text-stone-900 mt-0.5">
                {RESTAURANT_INFO.status}
              </div>
              <div className="text-xs text-stone-500 mt-0.5">Open Daily 11 AM – 11 PM</div>
            </div>
          </div>

          {/* Pricing & Reservation */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Reservations & Price
              </div>
              <div className="text-sm font-semibold text-stone-900 mt-0.5">
                {RESTAURANT_INFO.priceRange} per person
              </div>
              <div className="text-xs text-stone-500 mt-0.5">
                Reported by 524 people · Tripleseat
              </div>
            </div>
          </div>

          {/* Identity & Inclusivity */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Neighborhood Values
              </div>
              <div className="text-sm font-semibold text-stone-900 mt-0.5">
                Women-Owned · LGBTQ+
              </div>
              <div className="text-xs text-emerald-700 font-bold mt-0.5">
                100% Dedicated GF Menu
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Gemini Verified Summary & Proof Adjacency */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F5F2EB] rounded-2xl p-6 sm:p-8 border border-stone-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-widest">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>Review Summary · 7,699 Diner Reviews</span>
              </div>
              <p className="font-serif text-lg sm:text-xl text-stone-800 italic leading-relaxed">
                "{RESTAURANT_INFO.googleGeminiSummary}"
              </p>
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <span>Summarized with Gemini from Google Maps</span>
                <span aria-hidden="true">·</span>
                <span className="font-bold text-stone-800">4.7 / 5.0 Star Average</span>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5">
              <button
                onClick={() => setActivePage('reviews')}
                className="px-5 py-2.5 bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center"
              >
                Read All Reviews
              </button>
              <button
                onClick={() => setActivePage('reservation')}
                className="px-5 py-2.5 bg-[#F5B014] hover:bg-[#e5a40f] text-stone-950 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-stone-950" />
                <span>Book a Table</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Signature Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-[#F5B014]">
              Kitchen Highlights
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
              Reinvented Italian-American Classics
            </h2>
          </div>
          <button
            onClick={() => setActivePage('menu')}
            className="flex items-center gap-1.5 text-sm font-bold text-stone-900 hover:text-[#c48d0e] transition-colors cursor-pointer"
          >
            <span>Explore full menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMenuItem(item)}
              className="group bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-200 text-stone-500 font-serif text-xl font-bold p-4 text-center">
                    {item.name}
                  </div>
                )}
                {item.signature && (
                  <div className="absolute top-3 left-3 bg-stone-950/85 backdrop-blur-md text-[#F5B014] text-[11px] font-bold px-2.5 py-1 rounded-md">
                    Signature
                  </div>
                )}
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-serif font-bold text-stone-900 tabular-nums">
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                  <span className="text-[11px] text-stone-400 capitalize">
                    {item.category.replace('-', ' & ')}
                  </span>
                  <span className="font-bold text-stone-900 group-hover:text-[#c48d0e] flex items-center gap-1">
                    <span>View Dish</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Nolita Trattoria Atmosphere & 1960 Heritage Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          {/* Visual Showcase */}
          <div className="relative min-h-[380px] lg:min-h-full">
            <img
              src={RESTAURANT_INFO.images.interior}
              alt="Rubirosa Nolita Dining Room"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Story Prose */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center space-y-6">
            <div className="text-xs font-bold uppercase tracking-widest text-[#F5B014]">
              Family Heritage Since 1960
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              A 60-Year Staten Island Recipe on Mulberry Street
            </h2>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
              Rubirosa was born from a rich family tradition. In 1960, the Pappalardo family established their signature paper-thin, crackly pizza crust in Staten Island.
            </p>
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-normal">
              Today on Mulberry Street in Nolita, we continue that craft with reimagined Italian-American recipes, fresh handmade pasta cut daily, and an allergy-conscious kitchen where almost every single dish can be savored 100% gluten-free.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => setActivePage('reservation')}
                className="px-6 py-3.5 bg-[#F5B014] hover:bg-[#e5a40f] text-stone-950 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Book a Table Tonight
              </button>
              <button
                onClick={() => setActivePage('contact')}
                className="px-5 py-3.5 border border-stone-600 hover:border-stone-400 text-stone-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Location & Private Events
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
