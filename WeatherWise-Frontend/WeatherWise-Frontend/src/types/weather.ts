export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snow' | 'night' | 'cool' | 'default';

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  conditionType?: WeatherCondition;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  aiInsight?: string;
}

export interface UserPreferences {
  city: string;
  alertsEnabled: boolean;
  tempUnit: string;
}
