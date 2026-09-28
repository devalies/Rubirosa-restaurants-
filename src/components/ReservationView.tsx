import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle2,
  MapPin,
  X,
} from 'lucide-react';

export const ReservationView: React.FC = () => {
  const { createReservation, reservations, cancelReservation, setActivePage } = useApp();

  const [partySize, setPartySize] = useState<number>(2);
  const [date, setDate] = useState<string>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });
  const [selectedTime, setSelectedTime] = useState<string>('7:15 PM');
  const [seatingArea, setSeatingArea] = useState<'main-dining' | 'window' | 'bar-counter' | 'chefs-corner'>('main-dining');
  const [specialOccasion, setSpecialOccasion] = useState<string>('Casual Dinner');
  const [dietaryNotes, setDietaryNotes] = useState<string>('');
  const [guestName, setGuestName] = useState('Elena Rossi');
  const [guestEmail, setGuestEmail] = useState('elena.rossi@nyc.rr.com');
  const [guestPhone, setGuestPhone] = useState('(212) 555-0198');

  const [confirmedReservationId, setConfirmedReservationId] = useState<string | null>(null);

  const timeSlots = [
    { label: 'Lunch', times: ['11:30 AM', '12:00 PM', '12:45 PM', '1:30 PM', '2:15 PM'] },
    { label: 'Early Dinner', times: ['5:00 PM', '5:30 PM', '6:00 PM'] },
    { label: 'Prime Dinner', times: ['6:30 PM', '7:15 PM', '7:45 PM', '8:15 PM', '8:45 PM'] },
    { label: 'Late Night', times: ['9:15 PM', '9:45 PM', '10:15 PM'] },
  ];

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const created = createReservation({
      guestName,
      email: guestEmail,
      phone: guestPhone,
      date,
      time: selectedTime,
      partySize,
      seatingArea,
      dietaryNotes: dietaryNotes.trim() || undefined,
      specialOccasion: specialOccasion !== 'Casual Dinner' ? specialOccasion : undefined,
    });
    setConfirmedReservationId(created.id);
  };

  const activeReservations = reservations.filter((r) => r.status === 'confirmed');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12 font-sans">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="text-xs font-bold uppercase tracking-widest text-[#F5B014]">
          Table Bookings
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-stone-900">
          Reserve Your Table at Rubirosa
        </h1>
        <p className="text-sm text-stone-600 leading-relaxed">
          Bookings open 14 days in advance. Tables are held for 15 minutes. Dining time is 90 minutes for parties of 2–4, and 120 minutes for larger gatherings.
        </p>
      </div>

      {/* Confirmation View */}
      {confirmedReservationId ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-stone-200 shadow-sm max-w-2xl mx-auto text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              Reservation Confirmed!
            </h2>
            <p className="text-sm text-stone-600">
              We have your table reserved, <span className="font-bold text-stone-900">{guestName}</span>. A confirmation has been sent to {guestEmail}.
            </p>
          </div>

          {/* Details Ticket */}
          <div className="bg-[#FAF8F5] p-5 rounded-xl border border-stone-200 text-left space-y-3 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200">
              <span className="text-stone-500 font-medium">Confirmation Code</span>
              <span className="font-mono font-bold text-stone-900 text-sm">
                {confirmedReservationId}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-stone-500 block">Date</span>
                <span className="font-semibold text-stone-800 text-sm">{date}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Time</span>
                <span className="font-semibold text-stone-800 text-sm">{selectedTime}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Party</span>
                <span className="font-semibold text-stone-800 text-sm">{partySize} Guests</span>
              </div>
              <div>
                <span className="text-stone-500 block">Area</span>
                <span className="font-semibold text-stone-800 text-sm capitalize">
                  {seatingArea.replace('-', ' ')}
                </span>
              </div>
            </div>

            {dietaryNotes && (
              <div className="pt-2 border-t border-stone-200">
                <span className="text-stone-500 block">Dietary & Kitchen Notes:</span>
                <span className="text-stone-800 italic">{dietaryNotes}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => {
                setConfirmedReservationId(null);
                setActivePage('menu');
              }}
              className="px-6 py-3.5 bg-[#F5B014] hover:bg-[#e5a40f] text-stone-950 font-bold rounded-xl text-xs cursor-pointer shadow-xs"
            >
              Browse Trattoria Menu
            </button>
            <button
              onClick={() => setConfirmedReservationId(null)}
              className="px-5 py-3.5 border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold rounded-xl text-xs cursor-pointer"
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Booking Form */}
          <form
            onSubmit={handleBook}
            className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6"
          >
            {/* Step 1: Party & Date */}
            <div className="space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#F5B014]" />
                <span>1. Select Party Size & Date</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-stone-600 block mb-1 font-medium">Number of Guests</label>
                  <select
                    value={partySize}
                    onChange={(e) => setPartySize(Number(e.target.value))}
                    aria-label="Number of Guests"
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F5B014] cursor-pointer"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-stone-600 block mb-1 font-medium">Dining Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    aria-label="Dining Date"
                    className="w-full p-2.5 text-sm border border-stone-300 rounded-lg bg-white text-stone-800 focus:outline-none focus:ring-1 focus:ring-[#F5B014] cursor-pointer"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Time Slots */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F5B014]" />
                <span>2. Choose Seating Time</span>
              </div>

              <div className="space-y-3">
                {timeSlots.map((group) => (
                  <div key={group.label} className="space-y-1.5">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">
                      {group.label}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {group.times.map((slot) => {
                        const isSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedTime(slot)}
                            className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer tabular-nums whitespace-nowrap ${
                              isSelected
                                ? 'bg-stone-950 text-[#F5B014] shadow-xs'
                                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                            }`}
                          >
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3: Seating Preference */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#F5B014]" />
                <span>3. Seating Atmosphere</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'main-dining', label: 'Main Dining', desc: 'Cozy red banquettes' },
                  { id: 'window', label: 'Mulberry Window', desc: 'Streetfront view' },
                  { id: 'bar-counter', label: 'Vintage Bar', desc: 'Craft amaro & pizza' },
                  { id: 'chefs-corner', label: 'Trattoria Corner', desc: 'Intimate ambiance' },
                ].map((area) => {
                  const isChosen = seatingArea === area.id;
                  return (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => setSeatingArea(area.id as any)}
                      className={`p-3 text-left rounded-lg border text-xs transition-all cursor-pointer ${
                        isChosen
                          ? 'border-stone-900 bg-stone-50 ring-1 ring-stone-900'
                          : 'border-stone-200 hover:border-stone-300 bg-white'
                      }`}
                    >
                      <div className="font-bold text-stone-900">{area.label}</div>
                      <div className="text-[11px] text-stone-500 mt-0.5">{area.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Contact Details */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800">
                4. Guest Information & Preferences
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-stone-600 block mb-1 font-medium">Full Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-lg text-stone-900"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-600 block mb-1 font-medium">Email Address</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-lg text-stone-900"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs text-stone-600 block mb-1 font-medium">Phone Number</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-lg text-stone-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-xs text-stone-600 block mb-1 font-medium">Special Occasion</label>
                  <select
                    value={specialOccasion}
                    onChange={(e) => setSpecialOccasion(e.target.value)}
                    aria-label="Special Occasion"
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-lg bg-white text-stone-800"
                  >
                    <option value="Casual Dinner">Casual Nolita Dinner</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Anniversary">Romantic Anniversary</option>
                    <option value="Date Night">Date Night</option>
                    <option value="Family Gathering">Family Gathering</option>
                    <option value="Business Dining">Business Dining</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-stone-600 block mb-1 font-medium">
                    Dietary or Allergy Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 1 Celiac diner, 1 Nut allergy..."
                    value={dietaryNotes}
                    onChange={(e) => setDietaryNotes(e.target.value)}
                    className="w-full p-2.5 text-xs border border-stone-300 rounded-lg text-stone-900"
                  />
                </div>
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#F5B014] hover:bg-[#e5a40f] text-stone-950 rounded-xl text-sm font-bold transition-colors shadow-xs cursor-pointer whitespace-nowrap"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>

          {/* Right Rail: Existing Reservations & Policies */}
          <div className="space-y-6">
            {/* Active Bookings Card */}
            <div className="bg-white rounded-2xl p-5 border border-stone-200 space-y-4">
              <h3 className="font-serif text-lg font-bold text-stone-900">
                Your Upcoming Tables
              </h3>

              {activeReservations.length === 0 ? (
                <div className="text-xs text-stone-500 py-3">
                  No active reservations yet. Complete the form to reserve.
                </div>
              ) : (
                <div className="space-y-3">
                  {activeReservations.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 space-y-2 text-xs"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-stone-900">
                            {res.date} at {res.time}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {res.partySize} Guests · {res.seatingArea.replace('-', ' ')}
                          </div>
                        </div>
                        <button
                          onClick={() => cancelReservation(res.id)}
                          className="text-stone-400 hover:text-red-700 p-1 cursor-pointer"
                          title="Cancel reservation"
                          aria-label="Cancel reservation"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-[11px] text-stone-400 font-mono">Code: {res.id}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Trattoria Etiquette */}
            <div className="p-5 bg-white rounded-2xl border border-stone-200 space-y-2 text-xs text-stone-500">
              <span className="font-bold text-stone-900 block">Trattoria Etiquette</span>
              <p>• Due to our intimate Nolita dining room, incomplete parties cannot be seated.</p>
              <p>• We accommodate stroller parking in our front vestibule.</p>
              <p>• Walk-ins are always welcomed at our vintage bar counter!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
