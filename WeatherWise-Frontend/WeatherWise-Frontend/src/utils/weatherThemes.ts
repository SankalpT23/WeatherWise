import { WeatherCondition } from '../types/weather';

export interface WeatherTheme {
  bgGradient: string;
  bgGradientAlt: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accentColor: string;
  accentBg: string;
  searchBg: string;
  insightGlow: string;
  overlayColor: string;
  badgeBg: string;
  badgeText: string;
}

export const weatherThemes: Record<WeatherCondition, WeatherTheme> = {
  sunny: {
    bgGradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 30%, #a8edea 70%, #74b9ff 100%)',
    bgGradientAlt: 'linear-gradient(160deg, #ffeaa7 0%, #fdcb6e 40%, #81ecec 80%, #0984e3 100%)',
    cardBg: 'rgba(255, 255, 255, 0.20)',
    cardBorder: 'rgba(255, 255, 255, 0.45)',
    cardShadow: '0 8px 32px rgba(253, 160, 133, 0.18), inset 0 1px 0 rgba(255,255,255,0.4)',
    textPrimary: '#7c3a00',
    textSecondary: '#9a4a10',
    textMuted: 'rgba(124, 58, 0, 0.65)',
    accentColor: '#e07b00',
    accentBg: 'rgba(253, 160, 133, 0.25)',
    searchBg: 'rgba(255, 255, 255, 0.35)',
    insightGlow: '0 0 40px rgba(253, 203, 110, 0.45), 0 8px 32px rgba(253, 160, 133, 0.25)',
    overlayColor: 'rgba(246, 211, 101, 0.08)',
    badgeBg: 'rgba(253, 203, 110, 0.35)',
    badgeText: '#7c3a00',
  },
  cloudy: {
    bgGradient: 'linear-gradient(135deg, #636e72 0%, #2d3436 50%, #485460 100%)',
    bgGradientAlt: 'linear-gradient(160deg, #74858f 0%, #3d4852 50%, #2c3e50 100%)',
    cardBg: 'rgba(255, 255, 255, 0.08)',
    cardBorder: 'rgba(255, 255, 255, 0.15)',
    cardShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
    textPrimary: '#ecf0f1',
    textSecondary: '#bdc3c7',
    textMuted: 'rgba(189, 195, 199, 0.7)',
    accentColor: '#95a5a6',
    accentBg: 'rgba(255, 255, 255, 0.08)',
    searchBg: 'rgba(255, 255, 255, 0.12)',
    insightGlow: '0 0 40px rgba(149, 165, 166, 0.2), 0 8px 32px rgba(0,0,0,0.35)',
    overlayColor: 'rgba(45, 52, 54, 0.12)',
    badgeBg: 'rgba(255, 255, 255, 0.12)',
    badgeText: '#ecf0f1',
  },
  rainy: {
    bgGradient: 'linear-gradient(135deg, #1a2a4a 0%, #2c3e6a 40%, #1e3050 80%, #0d1b3e 100%)',
    bgGradientAlt: 'linear-gradient(160deg, #1e2d50 0%, #253560 45%, #162240 100%)',
    cardBg: 'rgba(30, 50, 100, 0.30)',
    cardBorder: 'rgba(100, 149, 237, 0.25)',
    cardShadow: '0 8px 32px rgba(13, 27, 62, 0.5), inset 0 1px 0 rgba(100,149,237,0.15)',
    textPrimary: '#d0e8ff',
    textSecondary: '#90b4e0',
    textMuted: 'rgba(144, 180, 224, 0.65)',
    accentColor: '#5b8def',
    accentBg: 'rgba(100, 149, 237, 0.18)',
    searchBg: 'rgba(30, 50, 100, 0.40)',
    insightGlow: '0 0 40px rgba(91, 141, 239, 0.3), 0 8px 32px rgba(13,27,62,0.5)',
    overlayColor: 'rgba(13, 27, 62, 0.15)',
    badgeBg: 'rgba(91, 141, 239, 0.2)',
    badgeText: '#d0e8ff',
  },
  snow: {
    bgGradient: 'linear-gradient(135deg, #e8f4f8 0%, #c8e6f0 30%, #b0d4e8 60%, #a0c4de 100%)',
    bgGradientAlt: 'linear-gradient(160deg, #f0f8ff 0%, #d4eef8 40%, #b8dff0 80%, #8ec8e8 100%)',
    cardBg: 'rgba(255, 255, 255, 0.38)',
    cardBorder: 'rgba(255, 255, 255, 0.70)',
    cardShadow: '0 8px 32px rgba(140, 200, 232, 0.25), inset 0 1px 0 rgba(255,255,255,0.8)',
    textPrimary: '#1a3a5c',
    textSecondary: '#2c5f8a',
    textMuted: 'rgba(26, 58, 92, 0.60)',
    accentColor: '#2980b9',
    accentBg: 'rgba(200, 230, 240, 0.45)',
    searchBg: 'rgba(255, 255, 255, 0.55)',
    insightGlow: '0 0 40px rgba(41, 128, 185, 0.2), 0 8px 32px rgba(140,200,232,0.3)',
    overlayColor: 'rgba(200, 230, 240, 0.12)',
    badgeBg: 'rgba(200, 230, 240, 0.55)',
    badgeText: '#1a3a5c',
  },
  night: {
    bgGradient: 'linear-gradient(135deg, #0a0e1a 0%, #0d1530 40%, #111827 70%, #070b14 100%)',
    bgGradientAlt: 'linear-gradient(160deg, #0c1020 0%, #0f1a35 40%, #0a1525 80%, #060810 100%)',
    cardBg: 'rgba(255, 255, 255, 0.05)',
    cardBorder: 'rgba(147, 197, 253, 0.15)',
    cardShadow: '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(147,197,253,0.08)',
    textPrimary: '#e2e8f0',
    textSecondary: '#93c5fd',
    textMuted: 'rgba(147, 197, 253, 0.55)',
    accentColor: '#60a5fa',
    accentBg: 'rgba(96, 165, 250, 0.12)',
    searchBg: 'rgba(15, 25, 55, 0.65)',
    insightGlow: '0 0 40px rgba(96, 165, 250, 0.2), 0 8px 32px rgba(0,0,0,0.6)',
    overlayColor: 'rgba(6, 8, 16, 0.2)',
    badgeBg: 'rgba(96, 165, 250, 0.15)',
    badgeText: '#e2e8f0',
  },
  cool: {
    bgGradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
    bgGradientAlt: 'linear-gradient(160deg, #a1c4fd 0%, #c2e9fb 100%)',
    cardBg: 'rgba(255, 255, 255, 0.25)',
    cardBorder: 'rgba(255, 255, 255, 0.55)',
    cardShadow: '0 8px 32px rgba(102, 166, 255, 0.25), inset 0 1px 0 rgba(255,255,255,0.7)',
    textPrimary: '#1e3a8a',
    textSecondary: '#2563eb',
    textMuted: 'rgba(30, 58, 138, 0.65)',
    accentColor: '#3b82f6',
    accentBg: 'rgba(255, 255, 255, 0.5)',
    searchBg: 'rgba(255, 255, 255, 0.45)',
    insightGlow: '0 0 40px rgba(59, 130, 246, 0.35), 0 8px 32px rgba(102, 166, 255, 0.2)',
    overlayColor: 'rgba(255, 255, 255, 0.15)',
    badgeBg: 'rgba(255, 255, 255, 0.6)',
    badgeText: '#1e3a8a',
  },
  default: {
    bgGradient: 'linear-gradient(135deg, #636e72 0%, #2d3436 50%, #485460 100%)',
    bgGradientAlt: 'linear-gradient(160deg, #74858f 0%, #3d4852 50%, #2c3e50 100%)',
    cardBg: 'rgba(255, 255, 255, 0.08)',
    cardBorder: 'rgba(255, 255, 255, 0.15)',
    cardShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.12)',
    textPrimary: '#ecf0f1',
    textSecondary: '#bdc3c7',
    textMuted: 'rgba(189, 195, 199, 0.7)',
    accentColor: '#95a5a6',
    accentBg: 'rgba(255, 255, 255, 0.08)',
    searchBg: 'rgba(255, 255, 255, 0.12)',
    insightGlow: '0 0 40px rgba(149, 165, 166, 0.2), 0 8px 32px rgba(0,0,0,0.35)',
    overlayColor: 'rgba(45, 52, 54, 0.12)',
    badgeBg: 'rgba(255, 255, 255, 0.12)',
    badgeText: '#ecf0f1',
  },
};

export const getTheme = (condition: WeatherCondition): WeatherTheme =>
  weatherThemes[condition];
