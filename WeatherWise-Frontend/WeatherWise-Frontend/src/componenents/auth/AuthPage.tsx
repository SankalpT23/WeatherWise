import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Eye, EyeOff, Mail, Lock, Cloud, Sun, Wind, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import OnboardingModal from './Onboarding';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp, isNewUser } = useAuth();
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bgRef.current) {
      gsap.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2, ease: 'power2.out' });
    }
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 40, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, []);

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: mode === 'login' ? -20 : 20, opacity: 0.5 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
    }
    setError('');
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    let authError: string | null = null;
    
    if (mode === 'login') {
      const { error } = await signIn(email, password);
      authError = error;
    } else {
      const { error } = await signUp(username, email, password);
      authError = error;
    }
    
    setSubmitting(false);
    if (authError) setError(authError);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4">
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 35%, #1a6b8a 65%, #0f4c75 100%)',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[8%] left-[12%] opacity-10 animate-float-slow">
          <Cloud size={80} className="text-white" />
        </div>
        <div className="absolute top-[18%] right-[10%] opacity-8 animate-float-mid">
          <Sun size={64} className="text-yellow-200" />
        </div>
        <div className="absolute bottom-[15%] left-[8%] opacity-8 animate-float-fast">
          <Wind size={48} className="text-white" />
        </div>
        <div className="absolute bottom-[25%] right-[15%] opacity-6 animate-float-slow">
          <Cloud size={96} className="text-white" />
        </div>
        {Array.from({ length: 60 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.4 + 0.1,
            }}
          />
        ))}
      </div>

      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: 'rgba(255, 255, 255, 0.10)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: '0 24px 64px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.18)',
          }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                <Sun size={20} className="text-yellow-200" />
              </div>
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.5px' }}
              >
                WeatherWise
              </span>
            </div>
            <h2
              className="text-3xl font-bold text-white mb-2"
              style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}
            >
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="text-white/60 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {mode === 'login'
                ? 'Sign in to access your personalized weather dashboard'
                : 'Join WeatherWise for AI-powered daily weather insights'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div className="relative">
                <User
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
                />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white placeholder-white/40 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-white/30"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    background: 'rgba(255,255,255,0.10)',
                    border: '1px solid rgba(255,255,255,0.18)',
                  }}
                />
              </div>
            )}
            
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
              />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                required
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-white placeholder-white/40 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-white/30"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              />
            </div>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                required
                minLength={6}
                className="w-full pl-11 pr-11 py-3.5 rounded-2xl text-white placeholder-white/40 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-white/30"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  background: 'rgba(255,255,255,0.10)',
                  border: '1px solid rgba(255,255,255,0.18)',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white/80 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <div
                className="rounded-xl px-4 py-3 text-sm text-red-200"
                style={{
                  background: 'rgba(220, 38, 38, 0.18)',
                  border: '1px solid rgba(220, 38, 38, 0.3)',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                fontFamily: 'Inter, sans-serif',
                background: 'rgba(255, 255, 255, 0.22)',
                border: '1px solid rgba(255,255,255,0.35)',
                color: 'white',
                backdropFilter: 'blur(8px)',
              }}
            >
              {submitting
                ? 'Please wait...'
                : mode === 'login'
                ? 'Sign In'
                : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => setMode(m => (m === 'login' ? 'register' : 'login'))}
                className="text-white font-medium hover:text-white/80 transition-colors underline underline-offset-2"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {isNewUser && <OnboardingModal />}
    </div>
  );
}
