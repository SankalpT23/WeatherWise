import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MapPin, Bell, ArrowRight, Sun } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { fetchWithAuth } from '../../lib/api';

export default function OnboardingModal() {
  const [city, setCity] = useState('');
  const [saving, setSaving] = useState(false);
  const { user, setIsNewUser } = useAuth();
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current && modalRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(
        modalRef.current,
        { y: 60, opacity: 0, scale: 0.94 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)', delay: 0.1 }
      );
    }
  }, []);

  const handleSave = async () => {
    if (!city.trim() || !user) return;
    setSaving(true);
    try {
      await fetchWithAuth('/p', {
        method: 'POST',
        body: JSON.stringify({ city: city.trim(), alertsEnabled: true, tempUnit: 'Celsius' }),
      });
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
    if (overlayRef.current && modalRef.current) {
      await new Promise<void>(resolve => {
        gsap.to(modalRef.current!, { y: -30, opacity: 0, scale: 0.95, duration: 0.35, ease: 'power2.in' });
        gsap.to(overlayRef.current!, {
          opacity: 0, duration: 0.4, delay: 0.25,
          onComplete: resolve,
        });
      });
    }
    setIsNewUser(false);
  };

  const handleSkip = () => {
    if (overlayRef.current && modalRef.current) {
      gsap.to(modalRef.current, { y: -20, opacity: 0, duration: 0.3 });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.35, delay: 0.1, onComplete: () => setIsNewUser(false) });
    } else {
      setIsNewUser(false);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.55)', backdropFilter: 'blur(6px)' }}
    >
      <div
        ref={modalRef}
        className="w-full max-w-md rounded-3xl p-8"
        style={{
          background: 'rgba(15, 25, 55, 0.85)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(147, 197, 253, 0.22)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(147,197,253,0.12)',
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(251, 191, 36, 0.18)' }}
          >
            <Sun size={22} className="text-yellow-300" />
          </div>
          <div>
            <h2
              className="text-2xl font-bold text-white"
              style={{ fontFamily: 'Outfit, sans-serif' }}
            >
              Welcome to WeatherWise
            </h2>
            <p className="text-white/50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              Let's personalize your experience
            </p>
          </div>
        </div>

        <div
          className="rounded-2xl p-4 mb-6"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="flex items-start gap-3">
            <Bell size={16} className="text-sky-300 mt-0.5 flex-shrink-0" />
            <p className="text-white/65 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              We'll send you a personalized weather report and AI insight every morning at{' '}
              <span className="text-sky-300 font-medium">7:00 AM</span>. No spam — just smart weather.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <label
            className="block text-white/70 text-sm font-medium mb-2"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Where are you right now?
          </label>
          <div className="relative">
            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              placeholder="Enter your city (e.g. San Francisco)"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white placeholder-white/30 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-sky-400/30"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.14)',
              }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 py-3.5 rounded-2xl text-sm text-white/50 hover:text-white/70 transition-colors"
            style={{ fontFamily: 'Inter, sans-serif', border: '1px solid rgba(255,255,255,0.10)' }}
          >
            Skip for now
          </button>
          <button
            onClick={handleSave}
            disabled={!city.trim() || saving}
            className="flex-1 py-3.5 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: 'linear-gradient(135deg, #0ea5e9, #2563eb)',
              boxShadow: '0 4px 20px rgba(14, 165, 233, 0.35)',
            }}
          >
            {saving ? 'Saving...' : 'Get Started'}
            {!saving && <ArrowRight size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}
