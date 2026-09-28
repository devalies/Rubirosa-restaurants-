import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO, REVIEW_TAGS } from '../data/restaurantData';
import {
  Star,
  Sparkles,
  ThumbsUp,
  PenTool,
  X,
} from 'lucide-react';

export const ReviewsView: React.FC = () => {
  const { reviews, addReview } = useApp();

  const [activeTag, setActiveTag] = useState<string>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  // New review form states
  const [rating, setRating] = useState(5);
  const [authorName, setAuthorName] = useState('Elena Rossi');
  const [highlightDish, setHighlightDish] = useState('The TIE DYE™ Pizza');
  const [content, setContent] = useState('');
  const [selectedTag, setSelectedTag] = useState('tie dye');

  const filteredReviews = reviews.filter((r) => {
    if (activeTag === 'all') return true;
    return (
      r.tags.some((t) => t.toLowerCase().includes(activeTag.toLowerCase())) ||
      r.content.toLowerCase().includes(activeTag.toLowerCase()) ||
      r.highlightDish?.toLowerCase().includes(activeTag.toLowerCase())
    );
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addReview({
      author: authorName,
      badge: 'Verified Diner · Nolita',
      rating,
      content: content.trim(),
      highlightDish,
      tags: [selectedTag, 'verified diner'],
    });

    setIsWriteModalOpen(false);
    setContent('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans">
      {/* Title & Overview */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200">
        <div className="space-y-2">
          <div className="text-xs font-bold uppercase tracking-widest text-[#F5B014]">
            Diner Community
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
            Google Reviews & Stories
          </h1>
          <p className="text-sm text-stone-600 max-w-xl leading-relaxed">
            Over 7,600 verified guest reviews from Mulberry Street regulars, neighborhood locals, and food lovers from around the world.
          </p>
        </div>

        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="px-6 py-3 bg-[#F5B014] hover:bg-[#e5a40f] text-stone-950 rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0"
        >
          <PenTool className="w-4 h-4 text-stone-950" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Google Maps Scorecard & Gemini AI Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scorecard */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-5xl sm:text-6xl font-bold text-stone-900 tabular-nums">
              {RESTAURANT_INFO.rating}
            </span>
            <div>
              <div className="flex text-[#F5B014]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-[#F5B014] text-[#F5B014]" />
                ))}
              </div>
              <div className="text-xs text-stone-500 mt-1 tabular-nums font-medium">
                {RESTAURANT_INFO.reviewsCount.toLocaleString()} reviews
              </div>
            </div>
          </div>

          {/* Rating Breakdown Bars */}
          <div className="space-y-1.5 pt-2 text-xs">
            {[
              { star: 5, pct: '88%' },
              { star: 4, pct: '8%' },
              { star: 3, pct: '2%' },
              { star: 2, pct: '1%' },
              { star: 1, pct: '1%' },
            ].map((bar) => (
              <div key={bar.star} className="flex items-center gap-2 text-stone-500">
                <span className="w-3 font-mono">{bar.star}</span>
                <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#F5B014] rounded-full" style={{ width: bar.pct }} />
                </div>
                <span className="w-8 text-right font-mono tabular-nums">{bar.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Gemini AI Summary from Google Maps */}
        <div className="lg:col-span-2 bg-[#F5F2EB] p-6 sm:p-8 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Summarized with Gemini</span>
            </div>
            <p className="font-serif text-lg sm:text-xl text-stone-800 italic leading-relaxed">
              "{RESTAURANT_INFO.googleGeminiSummary}"
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-300/60 gap-2">
            <span>Aggregated from 7,600+ authentic Google Maps diner submissions</span>
            <span className="text-stone-800 font-bold">Updated weekly</span>
          </div>
        </div>
      </div>

      {/* Review Filter Tags (from Google Maps Screenshot) */}
      <div className="space-y-3">
        <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
          Filter by Mentioned Dishes & Topics:
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {REVIEW_TAGS.map((tag) => {
            const isActive = activeTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => setActiveTag(tag.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-lg transition-colors whitespace-nowrap cursor-pointer font-medium ${
                  isActive
                    ? 'bg-stone-950 text-white font-bold shadow-xs'
                    : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-300'
                }`}
              >
                <span>{tag.label}</span>
                <span className={`text-[11px] tabular-nums ${isActive ? 'text-amber-300' : 'text-stone-400'}`}>
                  ({tag.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center text-stone-500">
            No reviews match "{activeTag}". Select another tag to view diner stories.
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-4 shadow-xs"
            >
              {/* Author & Rating */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-sm">
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 text-sm">{rev.author}</h3>
                    <div className="text-xs text-stone-400">
                      {rev.badge || 'Verified Diner'} · {rev.date}
                    </div>
                  </div>
                </div>

                <div className="flex text-[#F5B014]">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#F5B014] text-[#F5B014]" />
                  ))}
                </div>
              </div>

              {/* Highlight dish metadata */}
              {rev.highlightDish && (
                <div className="text-xs text-stone-500">
                  Dish mentioned: <strong className="text-stone-800">{rev.highlightDish}</strong>
                </div>
              )}

              {/* Review Text */}
              <p className="text-sm text-stone-700 leading-relaxed">{rev.content}</p>

              {/* Tags & Likes */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <div className="flex items-center gap-1.5">
                  {rev.tags.map((t) => (
                    <span key={t} className="text-[11px] text-stone-400">
                      #{t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-stone-500">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span className="tabular-nums">{rev.likesCount} helpful</span>
                </div>
              </div>

              {/* Owner Response */}
              {rev.ownerResponse && (
                <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/80 space-y-1.5 text-xs text-stone-700">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-stone-950">Response from Rubirosa</span>
                    <span className="text-stone-400">{rev.ownerResponse.date}</span>
                  </div>
                  <p className="leading-relaxed text-stone-600">{rev.ownerResponse.text}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Write a Review Modal */}
      {isWriteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsWriteModalOpen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Share Your Dining Story
                </h3>
                <div className="text-xs text-stone-500 mt-0.5">
                  Help fellow diners find the best dishes on Mulberry St
                </div>
              </div>
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs font-sans">
              {/* Star selector */}
              <div>
                <label className="text-stone-600 block mb-1 font-medium">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          starVal <= rating
                            ? 'fill-[#F5B014] text-[#F5B014]'
                            : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-stone-600 block mb-1 font-medium">Your Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900"
                    required
                  />
                </div>
                <div>
                  <label className="text-stone-600 block mb-1 font-medium">Favorite Dish Tried</label>
                  <input
                    type="text"
                    value={highlightDish}
                    onChange={(e) => setHighlightDish(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-stone-600 block mb-1 font-medium">Feature Tag</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full p-2.5 border border-stone-300 rounded-lg bg-white text-stone-900"
                >
                  <option value="tie dye">Tie Dye Pizza</option>
                  <option value="gluten free">Gluten-Free Specialist</option>
                  <option value="handmade pasta">Handmade Cavatelli / Carbonara</option>
                  <option value="thin crust pizza">Thin Crust Pizza</option>
                  <option value="service">Attentive Service & Staff</option>
                  <option value="cozy vibe">Cozy Nolita Atmosphere</option>
                </select>
              </div>

              <div>
                <label className="text-stone-600 block mb-1 font-medium">Your Experience</label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you ordered, how the crust tasted, and what made your Mulberry Street visit special..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3 border border-stone-300 rounded-lg text-stone-900"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F5B014] hover:bg-[#e5a40f] text-stone-950 font-bold rounded-lg cursor-pointer"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
