import { useState, useRef } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { WeatherTheme } from '../../utils/weatherThemes';
import { useWeather } from '../../contexts/WeatherContext';

interface SearchBarProps {
  theme: WeatherTheme;
}

export default function SearchBar({ theme }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchCity, isLoading } = useWeather();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    await searchCity(query.trim());
    setQuery('');
    inputRef.current?.blur();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto">
      <div
        className="relative flex items-center rounded-2xl transition-all duration-300"
        style={{
          background: theme.searchBg,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${focused ? theme.cardBorder : 'rgba(255,255,255,0.12)'}`,
          boxShadow: focused
            ? `0 0 0 2px ${theme.accentColor}30, 0 4px 20px rgba(0,0,0,0.15)`
            : '0 4px 20px rgba(0,0,0,0.1)',
          width: focused ? '110%' : '100%',
          transform: focused ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        <Search
          size={16}
          className="absolute left-4 transition-colors duration-200"
          style={{ color: focused ? theme.accentColor : `${theme.textMuted}` }}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search city..."
          className="w-full pl-10 pr-10 py-3 bg-transparent outline-none text-sm"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: theme.textPrimary,
          }}
        />
        {isLoading ? (
          <Loader2 size={16} className="absolute right-4 animate-spin" style={{ color: theme.accentColor }} />
        ) : query.trim() ? (
          <button
            type="submit"
            className="absolute right-3 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-150 hover:scale-110"
            style={{ background: theme.accentBg }}
          >
            <Search size={12} style={{ color: theme.accentColor }} />
          </button>
        ) : null}
      </div>
    </form>
  );
}
