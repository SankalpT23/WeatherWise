import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Wind, Droplets, Thermometer, Gauge, Eye } from 'lucide-react';
import { WeatherData } from '../../types/weather';
import { WeatherTheme } from '../../utils/weatherThemes';
import GlassCard from '../ui/GlassCard';

interface DetailsGridProps {
  weather: WeatherData;
  theme: WeatherTheme;
}

interface DetailItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}

export default function DetailsGrid({ weather, theme }: DetailsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const details: DetailItem[] = [
    {
      icon: <Thermometer size={18} />,
      label: 'Feels Like',
      value: `${weather.feelsLike}°`,
      sub: weather.feelsLike > weather.temperature ? 'Warmer than air' : 'Cooler than air',
    },
    {
      icon: <Droplets size={18} />,
      label: 'Humidity',
      value: `${weather.humidity}%`,
      sub: weather.humidity > 70 ? 'High moisture' : weather.humidity > 40 ? 'Comfortable' : 'Dry air',
    },
    {
      icon: <Wind size={18} />,
      label: 'Wind Speed',
      value: `${weather.windSpeed}`,
      sub: 'mph',
    },
    {
      icon: <Gauge size={18} />,
      label: 'Pressure',
      value: `${weather.pressure}`,
      sub: 'hPa',
    },
    {
      icon: <Eye size={18} />,
      label: 'Visibility',
      value: `${weather.visibility}`,
      sub: 'miles',
    },
  ];

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll('.detail-card');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out', delay: 0.2 }
      );
    }
  }, [weather.city]);

  return (
    <div ref={containerRef} className="grid grid-cols-3 gap-2 md:gap-3">
      {details.map((item, i) => (
        <GlassCard key={i} theme={theme} className="detail-card p-3 md:p-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5" style={{ color: theme.accentColor }}>
              {item.icon}
              <span
                className="text-xs font-medium uppercase tracking-wider"
                style={{ fontFamily: 'Inter, sans-serif', color: theme.textMuted, fontSize: '10px' }}
              >
                {item.label}
              </span>
            </div>
            <div
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 300,
                fontSize: 'clamp(20px, 4vw, 28px)',
                color: theme.textPrimary,
                lineHeight: 1,
                letterSpacing: '-0.5px',
              }}
            >
              {item.value}
            </div>
            {item.sub && (
              <div
                className="text-xs"
                style={{ fontFamily: 'Inter, sans-serif', color: theme.textMuted }}
              >
                {item.sub}
              </div>
            )}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
