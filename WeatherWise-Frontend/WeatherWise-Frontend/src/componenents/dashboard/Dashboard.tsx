import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Settings } from 'lucide-react';
import { useWeather } from '../../contexts/WeatherContext';
import { fetchWithAuth } from '../../lib/api';
import { getTheme } from '../../utils/weatherThemes';
import { WeatherCondition } from '../../types/weather';
import SearchBar from './SearchBar';
import HeroSection from './HeroSection';
import DetailsGrid from './DetailsGrid';
import AIInsightCard from './AIInsightCard';
import PreferencesDrawer from './PreferencesDrawer';
import RainOverlay from '../ui/RainOverlay';

const BG_GRADIENTS: Record<WeatherCondition, string> = {
  sunny: 'linear-gradient(135deg, #f6d365 0%, #fda085 30%, #a8edea 70%, #74b9ff 100%)',
  cloudy: 'linear-gradient(135deg, #636e72 0%, #2d3436 50%, #485460 100%)',
  rainy: 'linear-gradient(135deg, #1a2a4a 0%, #2c3e6a 40%, #1e3050 80%, #0d1b3e 100%)',
  snow: 'linear-gradient(135deg, #e8f4f8 0%, #c8e6f0 30%, #b0d4e8 60%, #a0c4de 100%)',
  night: 'linear-gradient(135deg, #0a0e1a 0%, #0d1530 40%, #111827 70%, #070b14 100%)',
  cool: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  default: 'linear-gradient(135deg, #636e72 0%, #2d3436 50%, #485460 100%)',
};

export default function Dashboard() {
  const { weather, isLoading, searchCity } = useWeather();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const pref = await fetchWithAuth('/p');
        if (pref && pref.city) {
          await searchCity(pref.city);
        } else {
          await searchCity('San Francisco');
        }
      } catch (e) {
        await searchCity('San Francisco');
      } finally {
        setInitialLoad(false);
      }
    })();
  }, [searchCity]);

  const theme = weather ? getTheme(weather.conditionType || 'sunny') : getTheme('sunny');
  const bgRef = useRef<HTMLDivElement>(null);
  const prevCondition = useRef<WeatherCondition>(weather ? weather.conditionType || 'sunny' : 'sunny');

  useEffect(() => {
    if (!weather) return;
    const currentCondition = weather.conditionType || 'sunny';
    if (bgRef.current && prevCondition.current !== currentCondition) {
      gsap.to(bgRef.current, {
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: function () {
          if (bgRef.current) {
            bgRef.current.style.background = BG_GRADIENTS[currentCondition];
          }
        },
      });
      prevCondition.current = currentCondition;
    }
  }, [weather]);

  useEffect(() => {
    if (bgRef.current && weather) {
      bgRef.current.style.background = BG_GRADIENTS[weather.conditionType || 'sunny'];
    }
  }, [weather]);

  if (initialLoad || !weather) {
    return (
      <div className="min-h-screen flex items-center justify-center animate-pulse"
        style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #0f4c75 100%)' }}>
        <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Loading Weather...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        ref={bgRef}
        className="fixed inset-0 transition-none"
        style={{ background: BG_GRADIENTS[weather.conditionType || 'sunny'] }}
      />

      {weather.conditionType === 'night' && (
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white star-twinkle"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                top: `${Math.random() * 70}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.6 + 0.1,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {weather.conditionType === 'rainy' && <RainOverlay />}

      {weather.conditionType === 'snow' && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white snow-fall"
              style={{
                width: Math.random() * 6 + 3,
                height: Math.random() * 6 + 3,
                left: `${Math.random() * 100}%`,
                top: '-10px',
                opacity: 0.7 + Math.random() * 0.3,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-4 md:px-8 pt-6 pb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
            >
              <span style={{ fontSize: '14px' }}>☀</span>
            </div>
            <span
              className="text-sm font-semibold hidden sm:block"
              style={{ fontFamily: 'Outfit, sans-serif', color: theme.textPrimary, letterSpacing: '-0.3px' }}
            >
              WeatherWise
            </span>
          </div>

          <div className="flex-1 max-w-xs mx-4">
            <SearchBar theme={theme} />
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: theme.cardBg,
              backdropFilter: 'blur(12px)',
              border: `1px solid ${theme.cardBorder}`,
              color: theme.textMuted,
            }}
          >
            <Settings size={16} />
          </button>
        </header>

        <main className="flex-1 flex flex-col items-center justify-start px-4 md:px-6 pb-8">
          <div className="w-full max-w-4xl mx-auto">
            <div className="mt-4 md:mt-8 mb-8 md:mb-10">
              <HeroSection weather={weather} theme={theme} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-5">
              <div className="lg:col-span-3">
                <DetailsGrid weather={weather} theme={theme} />
              </div>
              <div className="lg:col-span-2">
                <AIInsightCard
                  insight={weather.aiInsight || ''}
                  theme={theme}
                  city={weather.city}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      <PreferencesDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        theme={theme}
      />
    </div>
  );
}
