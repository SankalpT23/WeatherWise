import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X, MapPin, Bell, Save, LogOut, User, Thermometer } from 'lucide-react';
import { WeatherTheme } from '../../utils/weatherThemes';
import { useAuth } from '../../contexts/AuthContext';
import { fetchWithAuth } from '../../lib/api';

interface PreferencesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  theme: WeatherTheme;
}

export default function PreferencesDrawer({ isOpen, onClose, theme }: PreferencesDrawerProps) {
  const [city, setCity] = useState('');
  const [tempUnit, setTempUnit] = useState('Celsius');
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user, signOut } = useAuth();
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const data = await fetchWithAuth('/p');
        if (data && data.city) {
          setCity(data.city);
          setAlertsEnabled(data.alertsEnabled);
          setTempUnit(data.tempUnit || 'Celsius');
        }
      } catch (e) {
        // Preferences may not exist yet
      }
    })();
  }, [user]);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(drawerRef.current, { x: '100%' }, { x: '0%', duration: 0.4, ease: 'power3.out' });
    }
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(drawerRef.current, { x: '100%', duration: 0.35, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: onClose });
  };

  const handleSave = async () => {
    if (!user || !city.trim()) return;
    setSaving(true);
    try {
      await fetchWithAuth('/p', {
        method: 'POST',
        body: JSON.stringify({ city, alertsEnabled, tempUnit })
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div
        ref={overlayRef}
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
        onClick={handleClose}
      />
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 bottom-0 w-full max-w-xs md:max-w-sm flex flex-col"
        style={{
          background: theme.cardBg,
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: `1px solid ${theme.cardBorder}`,
          boxShadow: '-8px 0 40px rgba(0,0,0,0.3)',
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: `1px solid ${theme.cardBorder}` }}
        >
          <span
            className="text-lg font-semibold"
            style={{ fontFamily: 'Outfit, sans-serif', color: theme.textPrimary }}
          >
            Preferences
          </span>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 hover:scale-110"
            style={{ background: theme.accentBg, color: theme.textMuted }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {user && (
            <div
              className="rounded-2xl p-4"
              style={{ background: theme.accentBg, border: `1px solid ${theme.cardBorder}` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: theme.cardBg }}
                >
                  <User size={16} style={{ color: theme.accentColor }} />
                </div>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ fontFamily: 'Inter, sans-serif', color: theme.textPrimary }}
                  >
                    {user.email}
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: 'Inter, sans-serif', color: theme.textMuted }}
                  >
                    WeatherWise account
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'Inter, sans-serif', color: theme.textSecondary }}
            >
              <MapPin size={14} className="inline mr-1.5" />
              Default City
            </label>
            <input
              type="text"
              value={city}
              onChange={e => setCity(e.target.value)}
              placeholder="Enter your city"
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all duration-200 focus:ring-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: theme.accentBg,
                border: `1px solid ${theme.cardBorder}`,
                color: theme.textPrimary,
              }}
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'Inter, sans-serif', color: theme.textSecondary }}
            >
              <Thermometer size={14} className="inline mr-1.5" />
              Temperature Unit
            </label>
            <select
              value={tempUnit}
              onChange={e => setTempUnit(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none transition-all duration-200 focus:ring-2"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: theme.accentBg,
                border: `1px solid ${theme.cardBorder}`,
                color: theme.textPrimary,
              }}
            >
              <option value="Celsius">Celsius (°C)</option>
              <option value="Fahrenheit">Fahrenheit (°F)</option>
            </select>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ fontFamily: 'Inter, sans-serif', color: theme.textSecondary }}
            >
              <Bell size={14} className="inline mr-1.5" />
              Daily Alerts
            </label>
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="alertsEnabled"
                checked={alertsEnabled}
                onChange={e => setAlertsEnabled(e.target.checked)}
                className="w-5 h-5 rounded"
                style={{
                  background: theme.accentBg,
                  border: `1px solid ${theme.cardBorder}`,
                }}
              />
              <label htmlFor="alertsEnabled" className="ml-2 text-sm" style={{ color: theme.textPrimary }}>
                Enable daily AI weather report
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !city.trim()}
            className="w-full py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: saved ? 'rgba(34, 197, 94, 0.25)' : theme.accentBg,
              border: `1px solid ${saved ? 'rgba(34,197,94,0.4)' : theme.cardBorder}`,
              color: saved ? 'rgb(134, 239, 172)' : theme.textPrimary,
            }}
          >
            <Save size={15} />
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Preferences'}
          </button>
        </div>

        <div className="px-6 py-5" style={{ borderTop: `1px solid ${theme.cardBorder}` }}>
          <button
            onClick={signOut}
            className="w-full py-3 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01]"
            style={{
              fontFamily: 'Inter, sans-serif',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              color: 'rgb(252, 165, 165)',
            }}
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
