'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { mentors } from '@/data/mockData';
import { ShieldCheck, Eye, EyeOff, Globe, ArrowRight, Sparkles, UserCheck, ArrowLeft, Award } from 'lucide-react';

import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function ExpertLoginPage() {
  const [email, setEmail] = useState('priya@email.com');
  const [password, setPassword] = useState('expert1234');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(mentors[0].id);
  const [error, setError] = useState('');
  const { login } = useApp();
  const router = useRouter();

  const handleExpertLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter valid credentials.'); return; }
    setError('');
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};
      const target = mentors.find(m => m.id === selectedExpert) || mentors[0];

      login({
        ...target,
        id: user.uid,
        name: userData.name || target.name,
        email: user.email || target.email,
        userType: 'expert'
      });
      router.push('/expert/dashboard');
    } catch (err: any) {
      console.warn('Firebase expert login fallback to demo profile:', err);
      // Fallback for demo expert accounts if Firebase account is not created yet
      const target = mentors.find(m => m.id === selectedExpert) || mentors[0];
      login({ ...target, userType: 'expert' });
      router.push('/expert/dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoExpertLogin = async (expertIndex: number) => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 600));
    login(mentors[expertIndex]);
    router.push('/expert/dashboard');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', maxHeight: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* Left Panel */}
      <div style={{
        flex: '1',
        background: 'linear-gradient(135deg, #0F3D3E 0%, #0F766E 60%, #059669 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 56px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated Background Spheres */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.12, pointerEvents: 'none' }}>
          <div className="animate-float" style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, #99F6E4 0%, transparent 70%)', top: '-5%', right: '-5%' }} />
          <div className="animate-pulse-glow" style={{ position: 'absolute', width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle, #10B981 0%, transparent 70%)', bottom: '-10%', left: '-5%' }} />
        </div>

        <div className="animate-fade-in-up" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '1.25rem', fontFamily: "'Plus Jakarta Sans'" }}>H</span>
            </div>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '1.375rem', fontFamily: "'Plus Jakarta Sans'" }}>HerPath Expert Portal</span>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#99F6E4', fontWeight: 700, padding: '4px 12px', marginBottom: 14, display: 'inline-block', backdropFilter: 'blur(8px)' }}>
              Expert & Mentor Gateway
            </span>
            <h1 style={{ color: 'white', fontSize: 'clamp(2.25rem,4vw,3rem)', fontWeight: 800, lineHeight: 1.18, fontFamily: "'Plus Jakarta Sans'", marginBottom: '16px' }}>
              Guide Learners.<br />Explore Identity Graphs.<br />Empower Futures.
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 440 }}>
              Access authorized learner skill identities, inspect permitted Knowledge Graphs, and deliver personalized mentorship.
            </p>
          </div>

          {/* Quick Demo Selector */}
          <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(16px)', borderRadius: 'var(--radius-md)', padding: '20px', border: '1px solid rgba(255,255,255,0.2)', maxWidth: 460, boxShadow: '0 16px 32px rgba(0,0,0,0.15)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#99F6E4', marginBottom: 12 }}>
              Instant Demo Expert Accounts:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                onClick={() => handleDemoExpertLogin(0)}
                className="btn-animated"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.16)',
                  border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Priya Sharma</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Digital Marketing Expert · ID: HP-9B41-M3K2</div>
                </div>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => handleDemoExpertLogin(1)}
                className="btn-animated"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px', borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.16)',
                  border: '1px solid rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>Anjali Verma</div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>Finance & Business Coach · ID: HP-82JD-9K21</div>
                </div>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="animate-fade-in-up" style={{
        width: '520px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 48px',
        background: 'var(--card)',
        position: 'relative',
        boxShadow: 'var(--shadow-xl)',
        overflowY: 'auto',
        height: '100%',
      }}>
        <div style={{ position: 'absolute', top: 24, left: 24 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            <ArrowLeft size={14} /> Learner Login
          </Link>
        </div>

        <div style={{ marginBottom: '32px', marginTop: 20 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontWeight: 700, fontSize: '0.8125rem', marginBottom: 6 }}>
            <ShieldCheck size={16} /> Expert Portal Login
          </div>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--text)', fontFamily: "'Plus Jakarta Sans'" }}>Expert Sign In</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: 4 }}>Log in with your verified mentor credentials.</p>
        </div>

        <form onSubmit={handleExpertLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="form-group">
            <label className="form-label">Select Expert Profile</label>
            <select
              value={selectedExpert}
              onChange={e => {
                setSelectedExpert(e.target.value);
                const m = mentors.find(x => x.id === e.target.value);
                if (m) setEmail(m.email);
              }}
              className="form-input input-animated"
              style={{ fontWeight: 600 }}
            >
              {mentors.map(m => (
                <option key={m.id} value={m.id}>{m.name} — {m.role}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="expert-email">Expert Email</label>
            <input
              id="expert-email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-input input-animated"
              placeholder="priya@email.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="expert-pass">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="expert-pass"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="form-input input-animated"
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn btn-primary btn-lg btn-animated w-full" disabled={isLoading} style={{ justifyContent: 'center' }}>
            {isLoading ? 'Authenticating Expert...' : 'Log In as Expert'}
          </button>
        </form>

        <div className="divider-text" style={{ margin: '24px 0' }}>or switch login mode</div>

        <Link href="/" className="btn btn-secondary btn-lg btn-animated w-full" style={{ justifyContent: 'center' }}>
          Go to Learner Login
        </Link>
      </div>
    </div>
  );
}
