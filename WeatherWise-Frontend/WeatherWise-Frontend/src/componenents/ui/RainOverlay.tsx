import { useMemo } from 'react';

interface Drop {
  left: number;
  delay: number;
  duration: number;
  opacity: number;
  height: number;
}

export default function RainOverlay() {
  const drops = useMemo<Drop[]>(() => {
    return Array.from({ length: 80 }, () => ({
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 0.6 + Math.random() * 0.5,
      opacity: 0.15 + Math.random() * 0.25,
      height: 12 + Math.random() * 16,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {drops.map((drop, i) => (
        <div
          key={i}
          className="absolute top-0 rain-drop-anim"
          style={{
            left: `${drop.left}%`,
            width: '1.5px',
            height: `${drop.height}px`,
            background: 'linear-gradient(to bottom, transparent, rgba(147, 197, 253, 0.8))',
            opacity: drop.opacity,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
            borderRadius: '0 0 2px 2px',
          }}
        />
      ))}
    </div>
  );
}
