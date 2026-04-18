import { AuthProvider, useAuth } from './contexts/AuthContext';
import { WeatherProvider } from './contexts/WeatherContext';
import AuthPage from './componenents/auth/AuthPage';
import Dashboard from './componenents/dashboard/Dashboard';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #0f4c75 100%)' }}
      >
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center animate-pulse"
            style={{ background: 'rgba(255,255,255,0.15)' }}
          >
            <span style={{ fontSize: '18px' }}>☀</span>
          </div>
          <p
            className="text-white/60 text-sm"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            WeatherWise
          </p>
        </div>
      </div>
    );
  }

  return user ? (
    <WeatherProvider>
      <Dashboard />
    </WeatherProvider>
  ) : (
    <AuthPage />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
