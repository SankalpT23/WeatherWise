import { ReactNode, CSSProperties } from 'react';
import { WeatherTheme } from '../../utils/weatherThemes';

interface GlassCardProps {
  children: ReactNode;
  theme: WeatherTheme;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export default function GlassCard({ children, theme, className = '', style, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-3xl transition-transform duration-300 hover:scale-[1.02] ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={{
        background: theme.cardBg,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${theme.cardBorder}`,
        boxShadow: theme.cardShadow,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
