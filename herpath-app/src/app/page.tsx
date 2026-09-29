'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { currentUser } from '@/data/mockData';
import { Eye, EyeOff, Globe, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

const features = [
  'AI-powered personalized learning paths',
  'Connect with mentors in your language',
  'Build a professional skill portfolio',
  'Discover real earning opportunities',
];

const stats = [
  { value: '50K+', label: 'Women Empowered' },
  { value: '1,200+', label: 'Expert Mentors' },
  { value: '85%', label: 'Find Opportunities' },
];

export default function LoginPage() {
  const [email, setEmail] = useState('riya@herpath.app');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState('English');
  const { login, completeOnboarding } = useApp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setError('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    login(currentUser);
    completeOnboarding();
    router.push('/dashboard');
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login(currentUser);
    completeOnboarding();
    router.push('/dashboard');
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    login(currentUser);
    router.push('/onboarding');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Panel */}
      <div style={{
        flex: '1',
        background: 'linear-gradient(145deg, var(--secondary) 0%, var(--primary) 60%, var(--accent) 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              borderRadius: '50%',
              border: '1px solid white',
              top: `${10 + i * 8}%`,
              left: `${-20 + i * 6}%`,
            }} />
          ))}
        </div>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '56px', position: 'relative' }}>
          <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)' }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.125rem', fontFamily: "'Plus Jakarta Sans'" }}>H</span>
          </div>
          <span style={{ color: 'white', fontWeight: 800, fontSize: '1.375rem', fontFamily: "'Plus Jakarta Sans'", letterSpacing: '-0.02em' }}>HerPath</span>
        </div>

        {/* Hero Text */}
        <div style={{ position: 'relative', marginBottom: '48px' }}>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '16px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Her Skills. Her Journey. Her Future.</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans'", marginBottom: '24px' }}>
            Learn.<br />Connect.<br />Grow.<br />Earn.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '400px' }}>
            The AI-powered platform that turns your skills into visible opportunities and financial independence.
          </p>
        </div>

        {/* Features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={18} color="var(--accent-mid)" />
              <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9375rem' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '32px' }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '1.5rem', fontFamily: "'Plus Jakarta Sans'" }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8125rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '480px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 48px',
        background: 'var(--card)',
        position: 'relative',
      }}>
        {/* Language + Top */}
        <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Globe size={14} color="var(--text-muted)" />
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            style={{ border: 'none', background: 'none', fontSize: '0.875rem', color: 'var(--text-muted)', cursor: 'pointer', outline: 'none' }}
          >
            {['English', 'Hindi', 'Marathi'].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text)', marginBottom: '8px', fontFamily: "'Plus Jakarta Sans'" }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Sign in to continue your HerPath journey.</p>
        </div>

        {/* Demo Login Banner */}
        <div style={{ padding: '12px 16px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 'var(--radius)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={16} color="var(--primary)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--primary)' }}>Try the demo</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary-dark)' }}>Explore HerPath as Riya Sharma</div>
          </div>
          <button onClick={handleDemoLogin} className="btn btn-primary btn-sm">
            Start Demo <ArrowRight size={13} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email or Phone</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              className={`form-input ${error ? 'error' : ''}`}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <Link href="/forgot-password" style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 500 }}>Forgot password?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className={`form-input ${error ? 'error' : ''}`}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{ paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isLoading} style={{ justifyContent: 'center', marginTop: '4px' }}>
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                Signing in...
              </span>
            ) : 'Log In'}
          </button>

          <div className="divider-text">or</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn btn-secondary btn-lg w-full"
            disabled={isLoading}
            style={{ justifyContent: 'center', gap: '10px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '28px', fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
          Don't have an account?{' '}
          <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
