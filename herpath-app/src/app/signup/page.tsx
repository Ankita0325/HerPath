'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { currentUser } from '@/data/mockData';
import { Eye, EyeOff, Globe, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', language: 'English' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login } = useApp();
  const router = useRouter();

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Enter a valid email';
    if (form.phone && !/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSuccess(true);
    await new Promise(r => setTimeout(r, 1000));
    login({ ...currentUser, name: form.name.trim() });
    router.push('/onboarding');
  };

  const update = (field: string, val: string) => {
    setForm(f => ({ ...f, [field]: val }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <div style={{ textAlign: 'center', animation: 'slideUp 0.3s ease' }}>
          <div style={{ width: 72, height: 72, background: 'var(--success-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
            <CheckCircle2 size={36} color="var(--success)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: '8px' }}>Account Created!</h2>
          <p style={{ color: 'var(--text-muted)' }}>Taking you to your personalized onboarding...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '28px', transition: 'color var(--transition)' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--primary)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
        >
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <div className="card" style={{ padding: '40px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>H</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'" }}>HerPath</span>
          </div>

          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: '6px' }}>Create your account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: '28px' }}>Start your HerPath journey today.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name *</label>
              <input id="name" className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => update('name', e.target.value)} placeholder="Riya Sharma" />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">Email *</label>
              <input id="signup-email" type="email" className={`form-input ${errors.email ? 'error' : ''}`} value={form.email} onChange={e => update('email', e.target.value)} placeholder="riya@email.com" />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone Number</label>
              <input id="phone" type="tel" className={`form-input ${errors.phone ? 'error' : ''}`} value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="9876543210" />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="pwd">Password *</label>
                <div style={{ position: 'relative' }}>
                  <input id="pwd" type={showPassword ? 'text' : 'password'} className={`form-input ${errors.password ? 'error' : ''}`} value={form.password} onChange={e => update('password', e.target.value)} placeholder="Min. 8 characters" style={{ paddingRight: '44px' }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && <span className="form-error">{errors.password}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirm-pwd">Confirm Password *</label>
                <input id="confirm-pwd" type="password" className={`form-input ${errors.confirmPassword ? 'error' : ''}`} value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} placeholder="Repeat password" />
                {errors.confirmPassword && <span className="form-error">{errors.confirmPassword}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="lang-select">Preferred Language</label>
              <div style={{ position: 'relative' }}>
                <Globe size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <select id="lang-select" className="form-input" value={form.language} onChange={e => update('language', e.target.value)} style={{ paddingLeft: '38px' }}>
                  {['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Gujarati'].map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              By creating an account, you agree to HerPath's{' '}
              <a href="#" style={{ color: 'var(--primary)' }}>Terms of Service</a> and{' '}
              <a href="#" style={{ color: 'var(--primary)' }}>Privacy Policy</a>.
            </p>

            <button type="submit" className="btn btn-primary btn-lg w-full" disabled={isLoading} style={{ justifyContent: 'center', marginTop: '4px' }}>
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: 18, height: 18, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
            Already have an account?{' '}
            <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
