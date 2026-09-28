import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Train,
  Send,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useApp();

  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryType, setInquiryType] = useState('Private Dining / Buyout');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been sent to our Mulberry St management.');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#F5B014]">
          Mulberry Street Nolita
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Find & Connect with Rubirosa
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Nestled between Prince & Spring Streets in Manhattan's historic Nolita neighborhood.
        </p>
      </div>

      {/* Main Grid: Details Left, Map & Form Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Direct Info & Hours */}
        <div className="space-y-6">
          {/* Quick Contact Card */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-6 shadow-xs">
            <h2 className="font-serif text-2xl font-bold text-stone-900">
              Restaurant Details
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm">Address</div>
                  <div className="text-stone-600 mt-0.5">{RESTAURANT_INFO.address}</div>
                  <div className="text-stone-400 mt-0.5">{RESTAURANT_INFO.neighborhood} · {RESTAURANT_INFO.crossStreets}</div>
                  <div className="text-stone-400 mt-0.5 font-mono">Plus Code: {RESTAURANT_INFO.plusCode}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm">Telephone</div>
                  <a
                    href="tel:+12129650500"
                    className="text-stone-700 hover:text-[#c48d0e] font-semibold transition-colors"
                  >
                    {RESTAURANT_INFO.phoneFormatted}
                  </a>
                  <div className="text-stone-400 mt-0.5">Lines open daily at 10:30 AM</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-sm">General Inquiries</div>
                  <a
                    href={`mailto:${RESTAURANT_INFO.email}`}
                    className="text-stone-700 hover:text-[#c48d0e] font-semibold transition-colors"
                  >
                    {RESTAURANT_INFO.email}
                  </a>
                  <div className="text-stone-400 mt-0.5">Table reservations handled via online booking system</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <a
                href="https://maps.google.com/?q=235+Mulberry+St,+New+York,+NY+10012"
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Google Maps Directions</span>
              </a>
            </div>
          </div>

          {/* Operating Hours Table */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Operating Schedule
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>Opens Daily at 11:00 AM</span>
              </div>
            </div>

            <div className="divide-y divide-stone-100 text-xs">
              {RESTAURANT_INFO.hours.map((h) => (
                <div key={h.day} className="py-2.5 flex items-center justify-between text-stone-700">
                  <span className="font-bold text-stone-900">{h.day}</span>
                  <div className="text-right">
                    <span className="font-medium">{h.hours}</span>
                    <span className="text-[11px] text-stone-400 block">Peak around {h.popularPeak}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Subway & Transit Guide */}
          <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-stone-200 space-y-3 text-xs">
            <div className="flex items-center gap-2 font-serif text-base font-bold text-stone-900">
              <Train className="w-4 h-4 text-[#F5B014]" />
              <span>Nearby Subway Stations</span>
            </div>
            <div className="space-y-2 text-stone-600">
              <div className="flex justify-between">
                <span><strong>Prince St Station</strong> (N, R, W trains)</span>
                <span className="text-stone-500 font-mono">2 min walk</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Spring St Station</strong> (6 train)</span>
                <span className="text-stone-500 font-mono">3 min walk</span>
              </div>
              <div className="flex justify-between">
                <span><strong>Broadway–Lafayette St</strong> (B, D, F, M)</span>
                <span className="text-stone-500 font-mono">5 min walk</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tripleseat Event Booking & Message Form */}
        <div className="space-y-6">
          {/* Tripleseat Integration Banner */}
          <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-2xl border border-stone-800 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F5B014]">
              Private Dining & Special Events
            </span>
            <h3 className="font-serif text-2xl font-bold">
              Celebrate on Mulberry Street
            </h3>
            <p className="text-xs text-stone-300 leading-relaxed font-normal">
              Hosting a birthday, rehearsal dinner, or group gathering? Rubirosa provides full dining room buyouts, family-style pizza & pasta tasting menus, and custom beverage pairings powered by Tripleseat event management.
            </p>
            <a
              href="https://tripleseat.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F5B014] hover:bg-[#e5a40f] text-stone-950 font-bold rounded-lg text-xs transition-colors"
            >
              <span>Submit Tripleseat Inquiry</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Direct Message Form */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-xs space-y-6">
            <div>
              <h3 className="font-serif text-xl font-bold text-stone-900">
                Send Us a Note
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Have questions regarding kitchen allergens, dietary requirements, or private table requests?
              </p>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="font-serif text-lg font-bold text-stone-900">
                  Grazie! Message Received.
                </div>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Our team on Mulberry Street will respond within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-stone-600 hover:underline pt-2 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-stone-600 block mb-1 font-medium">Your Name</label>
                    <input
                      type="text"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-stone-600 block mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-stone-600 block mb-1 font-medium">Subject / Department</label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full p-2.5 border border-stone-300 rounded-lg bg-white text-stone-900"
                  >
                    <option value="Private Dining / Buyout">Private Dining / Group Buyout</option>
                    <option value="Dietary & Allergen Question">Dietary & Allergen Question</option>
                    <option value="Catering & Delivery">Catering Inquiries</option>
                    <option value="Press & Media">Press & Media</option>
                    <option value="General Feedback">General Hospitality Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-600 block mb-1 font-medium">Your Message</label>
                  <textarea
                    rows={4}
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    placeholder="Tell us about your event date, expected guest count, or dietary question..."
                    className="w-full p-2.5 border border-stone-300 rounded-lg text-stone-900"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Rubirosa</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
