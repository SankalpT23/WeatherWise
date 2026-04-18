import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Sparkles, Bot } from 'lucide-react';
import { WeatherTheme } from '../../utils/weatherThemes';

interface AIInsightCardProps {
  insight: string;
  theme: WeatherTheme;
  city: string;
}

export default function AIInsightCard({ insight, theme, city }: AIInsightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', delay: 0.5 }
      );
    }
  }, [city]);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8, delay: 0.7 });
    }
  }, [insight]);

  return (
    <div
      ref={cardRef}
      className="rounded-3xl p-5 md:p-6 relative overflow-hidden"
      style={{
        background: theme.cardBg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${theme.cardBorder}`,
        boxShadow: theme.insightGlow,
      }}
    >
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 80% 20%, ${theme.accentColor}18 0%, transparent 60%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-center gap-2.5 mb-4">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: theme.accentBg, border: `1px solid ${theme.cardBorder}` }}
          >
            <Bot size={15} style={{ color: theme.accentColor }} />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span
                className="text-sm font-semibold"
                style={{ fontFamily: 'Inter, sans-serif', color: theme.textPrimary }}
              >
                AI Weather Insight
              </span>
              <Sparkles size={12} style={{ color: theme.accentColor }} />
            </div>
            <span
              className="text-xs"
              style={{ fontFamily: 'Inter, sans-serif', color: theme.textMuted }}
            >
              Powered by WeatherWise AI
            </span>
          </div>
        </div>

        <p
          ref={textRef}
          className="leading-relaxed"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            color: theme.textSecondary,
            lineHeight: '1.65',
          }}
        >
          {insight}
        </p>

        <div
          className="flex items-center gap-1.5 mt-4 pt-3"
          style={{ borderTop: `1px solid ${theme.cardBorder}` }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: theme.accentColor }}
          />
          <span
            className="text-xs"
            style={{ fontFamily: 'Inter, sans-serif', color: theme.textMuted }}
          >
            Updated just now for {city}
          </span>
        </div>
      </div>
    </div>
  );
}
