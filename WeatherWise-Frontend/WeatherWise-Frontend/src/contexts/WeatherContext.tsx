import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { WeatherData } from '../types/weather';
import { fetchWithAuth } from '../lib/api';

interface WeatherContextType {
  weather: WeatherData | null;
  isLoading: boolean;
  searchCity: (city: string) => Promise<void>;
  lastSearched: string;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastSearched, setLastSearched] = useState('');

  const searchCity = useCallback(async (city: string) => {
    if (!city.trim()) return;
    setIsLoading(true);
    try {
      // Fetch both weather and AI insight concurrently
      const [weatherResponse, insightResponse] = await Promise.all([
        fetchWithAuth(`/weather/current?city=${encodeURIComponent(city)}`),
        fetchWithAuth(`/weather/insight?city=${encodeURIComponent(city)}`).catch(() => null) // Ignore insight failure
      ]);

      if (weatherResponse) {
        // Map backend response specifically
        const weatherData: WeatherData = {
          city: weatherResponse.city,
          country: weatherResponse.country,
          temperature: weatherResponse.temperature,
          feelsLike: weatherResponse.feelsLike,
          condition: weatherResponse.condition,
          description: weatherResponse.description,
          humidity: weatherResponse.humidity,
          windSpeed: weatherResponse.windSpeed,
          pressure: weatherResponse.pressure,
          visibility: weatherResponse.visibility,
          aiInsight: insightResponse ? insightResponse.aiInsight : undefined,
          // Deduce conditionType safely using both condition string and temperature context
          conditionType: (() => {
            const cond = weatherResponse.condition?.toLowerCase() || '';
            const temp = weatherResponse.temperature;
            
            if (cond.includes('rain') || cond.includes('drizzle') || cond.includes('thunderstorm')) return 'rainy';
            if (cond.includes('snow')) return 'snow';
            if (temp <= 18) return 'cool'; // If it's cold/chilly, show the cool theme gracefully
            if (cond.includes('cloud') && temp < 30) return 'cloudy'; // Gloomy, but not explicitly freezing
            
            return 'sunny'; // Defaults to warm/hot clear skies to avoid dark themes on sunny hot days
          })()
        };
        setWeather(weatherData);
        setLastSearched(weatherData.city);
      }
    } catch (e: any) {
      console.error("Failed to search city:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, isLoading, searchCity, lastSearched }}>
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error('useWeather must be used within WeatherProvider');
  return ctx;
}
