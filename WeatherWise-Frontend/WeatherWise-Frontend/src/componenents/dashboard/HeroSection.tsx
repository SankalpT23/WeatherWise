import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { MapPin } from 'lucide-react';
import { WeatherData } from '../../types/weather';
import { WeatherTheme } from '../../utils/weatherThemes';
import WeatherIcon from '../ui/WeatherIcon';

interface HeroSectionProps {
  weather: WeatherData;
  theme: WeatherTheme;
}

export default function HeroSection({ weather, theme }: HeroSectionProps) {
  const tempRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);
  const conditionRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(iconRef.current, { scale: 0.5, opacity: 0, rotation: -15 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.6)' })
      .fromTo(tempRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo(cityRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .fromTo(conditionRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }, '-=0.25');
  }, [weather.city, weather.conditionType]);

  return (
    <div className="flex flex-col items-center text-center px-4">
      <div ref={iconRef} className="mb-4 md:mb-6">
        <WeatherIcon condition={weather.conditionType || 'sunny'} size={110} />
      </div>

      <div
        ref={tempRef}
        style={{
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 200,
          fontSize: 'clamp(80px, 18vw, 160px)',
          lineHeight: 1,
          color: theme.textPrimary,
          letterSpacing: '-4px',
          textShadow: `0 4px 30px ${theme.accentColor}40`,
        }}
      >
        {weather.temperature}°
      </div>

      <div
        ref={cityRef}
        className="flex items-center gap-1.5 mt-2 mb-1"
      >
        <MapPin size={16} style={{ color: theme.accentColor }} />
        <span
          style={{
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 500,
            fontSize: 'clamp(20px, 4vw, 28px)',
            color: theme.textPrimary,
            letterSpacing: '-0.3px',
          }}
        >
          {weather.city}
          {weather.country && (
            <span style={{ color: theme.textMuted, fontWeight: 300 }}>, {weather.country}</span>
          )}
        </span>
      </div>

      <div ref={conditionRef}>
        <span
          className="inline-block px-4 py-1.5 rounded-full text-sm font-medium"
          style={{
            fontFamily: 'Inter, sans-serif',
            background: theme.badgeBg,
            color: theme.badgeText,
            backdropFilter: 'blur(8px)',
            border: `1px solid ${theme.cardBorder}`,
          }}
        >
          {weather.condition}
        </span>
      </div>

    </div>
  );
}
