import { WeatherCondition } from '../../types/weather';

interface WeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
}

export default function WeatherIcon({ condition, size = 120, className = '' }: WeatherIconProps) {
  const s = size;

  if (condition === 'sunny') {
    return (
      <svg width={s} height={s} viewBox="0 0 120 120" className={`weather-icon-sunny ${className}`} fill="none">
        <circle cx="60" cy="60" r="22" fill="#FDE68A" className="sun-core" />
        <circle cx="60" cy="60" r="28" fill="rgba(253,230,138,0.3)" className="sun-glow-inner" />
        <circle cx="60" cy="60" r="36" fill="rgba(253,230,138,0.15)" className="sun-glow-outer" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={60 + 35 * Math.cos((angle * Math.PI) / 180)}
            y1={60 + 35 * Math.sin((angle * Math.PI) / 180)}
            x2={60 + 48 * Math.cos((angle * Math.PI) / 180)}
            y2={60 + 48 * Math.sin((angle * Math.PI) / 180)}
            stroke="#FDE68A"
            strokeWidth="3"
            strokeLinecap="round"
            className="sun-ray"
          />
        ))}
      </svg>
    );
  }

  if (condition === 'cloudy') {
    return (
      <svg width={s} height={s} viewBox="0 0 120 120" className={`weather-icon-cloudy ${className}`} fill="none">
        <ellipse cx="52" cy="58" rx="28" ry="18" fill="rgba(148,163,184,0.9)" />
        <ellipse cx="72" cy="60" rx="24" ry="16" fill="rgba(148,163,184,0.95)" />
        <ellipse cx="46" cy="50" rx="18" ry="18" fill="rgba(203,213,225,0.95)" />
        <ellipse cx="66" cy="46" rx="20" ry="20" fill="rgba(226,232,240,0.98)" />
        <ellipse cx="80" cy="55" rx="16" ry="16" fill="rgba(203,213,225,0.95)" />
        <ellipse cx="62" cy="65" rx="32" ry="14" fill="rgba(148,163,184,0.85)" />
      </svg>
    );
  }

  if (condition === 'rainy') {
    return (
      <svg width={s} height={s} viewBox="0 0 120 120" className={`weather-icon-rainy ${className}`} fill="none">
        <ellipse cx="48" cy="46" rx="22" ry="16" fill="rgba(71,85,105,0.9)" />
        <ellipse cx="68" cy="44" rx="20" ry="18" fill="rgba(100,116,139,0.9)" />
        <ellipse cx="80" cy="50" rx="16" ry="14" fill="rgba(71,85,105,0.85)" />
        <ellipse cx="60" cy="56" rx="32" ry="12" fill="rgba(51,65,85,0.95)" />
        {[
          [42, 70, 38, 84],
          [56, 68, 52, 82],
          [70, 72, 66, 86],
          [50, 82, 46, 96],
          [64, 80, 60, 94],
          [78, 74, 74, 88],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" className="rain-drop" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </svg>
    );
  }

  if (condition === 'snow') {
    return (
      <svg width={s} height={s} viewBox="0 0 120 120" className={`weather-icon-snow ${className}`} fill="none">
        <ellipse cx="48" cy="46" rx="22" ry="16" fill="rgba(186,230,253,0.9)" />
        <ellipse cx="68" cy="44" rx="20" ry="18" fill="rgba(224,242,254,0.95)" />
        <ellipse cx="80" cy="50" rx="16" ry="14" fill="rgba(186,230,253,0.88)" />
        <ellipse cx="60" cy="56" rx="32" ry="12" fill="rgba(240,249,255,0.95)" />
        {[42, 56, 70, 50, 64, 78].map((cx, i) => (
          <g key={i} className="snowflake" style={{ animationDelay: `${i * 0.2}s` }}>
            <circle cx={cx} cy={72 + (i % 2) * 12} r="2.5" fill="white" opacity="0.9" />
          </g>
        ))}
        {[38, 52, 66, 44, 58, 72].map((cx, i) => (
          <g key={`s2-${i}`} className="snowflake" style={{ animationDelay: `${i * 0.25}s` }}>
            <circle cx={cx} cy={86 + (i % 3) * 6} r="2" fill="rgba(186,230,253,0.9)" opacity="0.8" />
          </g>
        ))}
      </svg>
    );
  }

  if (condition === 'night') {
    return (
      <svg width={s} height={s} viewBox="0 0 120 120" className={`weather-icon-night ${className}`} fill="none">
        <path
          d="M55 28 C40 30 30 44 32 60 C34 76 48 86 64 84 C72 83 79 78 82 71 C74 74 65 72 58 66 C51 60 48 51 50 42 C51 36 53 31 55 28Z"
          fill="#E2E8F0"
          opacity="0.9"
        />
        {[
          [82, 32, 1.5],
          [88, 44, 1.2],
          [76, 22, 1],
          [92, 58, 1.8],
          [70, 38, 1],
          [96, 35, 1.3],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={0.6 + i * 0.06} className="star-twinkle" style={{ animationDelay: `${i * 0.4}s` }} />
        ))}
      </svg>
    );
  }

  if (condition === 'cool') {
    return (
      <svg width={s} height={s} viewBox="0 0 120 120" className={`weather-icon-cool ${className}`} fill="none">
        <circle cx="60" cy="60" r="22" fill="#BAE6FD" className="sun-core" />
        <circle cx="60" cy="60" r="28" fill="rgba(186,230,253,0.3)" className="sun-glow-inner" />
        <circle cx="60" cy="60" r="36" fill="rgba(186,230,253,0.15)" className="sun-glow-outer" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={i}
            x1={60 + 35 * Math.cos((angle * Math.PI) / 180)}
            y1={60 + 35 * Math.sin((angle * Math.PI) / 180)}
            x2={60 + 48 * Math.cos((angle * Math.PI) / 180)}
            y2={60 + 48 * Math.sin((angle * Math.PI) / 180)}
            stroke="#BAE6FD"
            strokeWidth="3"
            strokeLinecap="round"
            className="sun-ray"
          />
        ))}
        {/* Frosty breeze traces */}
        <path d="M 30 80 Q 50 65, 90 85" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 40 90 Q 60 75, 100 95" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  return null;
}
