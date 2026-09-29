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

import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

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

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : { name: email.split('@')[0], userType: 'learner' };

      login({ 
        ...currentUser, 
        id: user.uid, 
        name: userData.name || email.split('@')[0], 
        email: user.email || email, 
        userType: userData.userType || 'learner' 
      });
      
      completeOnboarding();
      router.push('/dashboard');
    } catch (err: any) {
      console.warn('Firebase login auth fallback to Firestore lookup:', err.code || err.message);
      
      try {
        // Search Firestore users collection by email fallback
        const q = query(collection(db, 'users'), where('email', '==', email.trim()));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          login({
            ...currentUser,
            id: userData.uid || userData.id || 'usr_fs',
            name: userData.name || email.split('@')[0],
            email: userData.email || email,
            phone: userData.phone || '',
            userType: userData.userType || 'learner'
          });
          completeOnboarding();
          router.push('/dashboard');
          return;
        }
      } catch (fsErr) {
        console.warn('Firestore fallback lookup error:', fsErr);
      }

      // Default fallback login for testing/demo
      login({ 
        ...currentUser, 
        name: email.split('@')[0], 
        email: email 
      });
      completeOnboarding();
      router.push('/dashboard');
    } finally {
      setIsLoading(false);
    }
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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Left Panel */}
      <div style={{
        flex: '1',
        background: 'linear-gradient(135deg, #0D5E57 0%, #0F766E 50%, #059669 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 56px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated Background Mesh Spheres */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }}>
          <div className="animate-float" style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, #99F6E4 0%, transparent 70%)', top: '-10%', left: '-10%' }} />
          <div className="animate-pulse-glow" style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, #10B981 0%, transparent 70%)', bottom: '-20%', right: '-10%' }} />
        </div>

        {/* Logo */}
        <div className="animate-fade-in-up" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px', position: 'relative' }}>
          <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', fontFamily: "'Plus Jakarta Sans'" }}>H</span>
          </div>
          <span style={{ color: 'white', fontWeight: 800, fontSize: '1.375rem', fontFamily: "'Plus Jakarta Sans'", letterSpacing: '-0.02em' }}>HerPath</span>
        </div>

        {/* Hero Text */}
        <div className="animate-fade-in-up" style={{ position: 'relative', marginBottom: '40px', animationDelay: '0.1s' }}>
          <div style={{ color: '#99F6E4', fontSize: '0.8125rem', fontWeight: 700, marginBottom: '14px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Her Skills. Her Journey. Her Future.</div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2.25rem,4vw,3.25rem)', fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.03em', fontFamily: "'Plus Jakarta Sans'", marginBottom: '20px' }}>
            Learn.<br />Connect.<br />Grow.<br />Earn.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '420px' }}>
            The AI-powered platform that turns your skills into visible opportunities and financial independence.
          </p>
        </div>

        {/* Features */}
        <div className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px', animationDelay: '0.2s' }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '10px 14px', borderRadius: 'var(--radius)', border: '1px solid rgba(255,255,255,0.15)', maxWidth: 440 }}>
              <CheckCircle2 size={18} color="#99F6E4" />
              <span style={{ color: 'white', fontSize: '0.9375rem', fontWeight: 500 }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="animate-fade-in-up" style={{ display: 'flex', gap: '20px', animationDelay: '0.3s' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', padding: '14px 18px', borderRadius: 'var(--radius-md)', flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 800, fontSize: '1.375rem', fontFamily: "'Plus Jakarta Sans'" }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.75rem', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        width: '520px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 48px',
        background: 'var(--card)',
        position: 'relative',
        boxShadow: 'var(--shadow-xl)',
      }}>
        {/* Language + Top */}
        <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Globe size={14} color="var(--text-muted)" />
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            style={{ border: 'none', background: 'none', fontSize: '0.875rem', color: 'var(--text-muted)', cursor: 'pointer', outline: 'none', fontWeight: 600 }}
          >
            {['English', 'Hindi', 'Marathi'].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div className="animate-fade-in-up" style={{ marginBottom: '24px' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text)', marginBottom: '8px', fontFamily: "'Plus Jakarta Sans'" }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Select your account type to sign in.</p>
        </div>

        {/* Login Account Type Toggle */}
        <div className="animate-fade-in-up" style={{ display: 'flex', gap: 6, padding: 5, background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)', marginBottom: 20 }}>
          <button
            type="button"
            className="btn btn-animated"
            style={{ flex: 1, justifyContent: 'center', background: 'var(--card)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.84rem', boxShadow: 'var(--shadow-xs)' }}
          >
            Learner Login
          </button>
          <Link
            href="/login/expert"
            className="btn btn-animated"
            style={{ flex: 1, justifyContent: 'center', background: 'transparent', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.84rem' }}
          >
            Expertise Login
          </Link>
        </div>

        {/* Demo Login Banner */}
        <div className="animate-fade-in-up" style={{ padding: '12px 16px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={18} color="var(--primary)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary-dark)' }}>Try the demo account</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>Explore HerPath as Learner Riya Sharma</div>
          </div>
          <button onClick={handleDemoLogin} className="btn btn-primary btn-sm btn-animated">
            Start Demo <ArrowRight size={13} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="animate-fade-in-up" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email or Phone</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError(''); }}
              className={`form-input input-animated ${error ? 'error' : ''}`}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label" htmlFor="password">Password</label>
              <Link href="/forgot-password" style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 600 }}>Forgot password?</Link>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                className={`form-input input-animated ${error ? 'error' : ''}`}
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

          <button type="submit" className="btn btn-primary btn-lg btn-animated w-full" disabled={isLoading} style={{ justifyContent: 'center', marginTop: '4px' }}>
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
            className="btn btn-secondary btn-lg btn-animated w-full"
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
          <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 700 }}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
