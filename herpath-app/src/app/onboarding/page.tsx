'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import { roleOptions, skillOptions, learnOptions, goalOptions, languageOptions, availabilityOptions } from '@/data/mockData';
import { ChevronRight, ChevronLeft, CheckCircle2, MapPin, Plus, X } from 'lucide-react';

const TOTAL_STEPS = 7;

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '32px' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 4,
          borderRadius: 2,
          background: i < current ? 'var(--primary)' : i === current ? 'var(--accent)' : 'var(--border)',
          flex: i < current || i === current ? 2 : 1,
          transition: 'all 0.4s ease',
        }} />
      ))}
    </div>
  );
}

function OptionCard({ label, icon, selected, onClick }: { label: string; icon: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '14px 12px',
        borderRadius: 'var(--radius)',
        border: `2px solid ${selected ? 'var(--primary)' : 'var(--border)'}`,
        background: selected ? 'var(--accent-light)' : 'var(--card)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        transition: 'all var(--transition)',
        color: selected ? 'var(--primary)' : 'var(--text)',
        fontWeight: selected ? 600 : 500,
        fontSize: '0.875rem',
      }}
    >
      <span style={{ fontSize: '1.5rem' }}>{icon}</span>
      {label}
    </button>
  );
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    role: '',
    skills: [] as string[],
    wantToLearn: [] as string[],
    goals: [] as string[],
    language: 'English',
    location: '',
    availability: [] as string[],
    customSkill: '',
  });
  const { user, completeOnboarding } = useApp();
  const router = useRouter();
  const name = user?.name?.split(' ')[0] || 'there';

  const toggleArray = (field: 'skills' | 'wantToLearn' | 'goals' | 'availability', value: string) => {
    setData(d => ({
      ...d,
      [field]: d[field].includes(value) ? d[field].filter(v => v !== value) : [...d[field], value],
    }));
  };

  const addCustomSkill = () => {
    if (data.customSkill.trim() && !data.skills.includes(data.customSkill.trim())) {
      setData(d => ({ ...d, skills: [...d.skills, d.customSkill.trim()], customSkill: '' }));
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!data.role;
      case 1: return data.skills.length > 0;
      case 2: return data.wantToLearn.length > 0;
      case 3: return data.goals.length > 0;
      case 4: return !!data.language;
      case 5: return !!data.location.trim();
      case 6: return data.availability.length > 0;
      default: return true;
    }
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(s => s + 1);
    else handleComplete();
  };

  const handleComplete = async () => {
    completeOnboarding();
    setStep(TOTAL_STEPS);
    await new Promise(r => setTimeout(r, 2000));
    router.push('/dashboard');
  };

  if (step === TOTAL_STEPS) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, var(--bg) 0%, var(--accent-light) 100%)' }}>
        <div style={{ textAlign: 'center', animation: 'slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          <div style={{ width: 80, height: 80, background: 'linear-gradient(135deg, var(--primary), var(--accent))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(15,118,110,0.3)' }}>
            <CheckCircle2 size={40} color="white" />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: '12px' }}>You're ready, {name}! 🎉</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '24px' }}>We've created your personalized HerPath.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {data.skills.slice(0, 3).map(s => <span key={s} className="chip skill">{s}</span>)}
            {data.wantToLearn.slice(0, 2).map(s => <span key={s} className="chip" style={{ background: 'var(--accent-light)', color: 'var(--primary)', border: '1px solid var(--accent-mid)' }}>Learn: {s}</span>)}
          </div>
          <div style={{ marginTop: '32px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            <div style={{ width: 16, height: 16, border: '2px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            Entering HerPath...
          </div>
        </div>
      </div>
    );
  }

  const stepTitles = [
    { title: 'About You', sub: "Let's get to know you better.", step: 'Step 1 of 7' },
    { title: 'Your Skills', sub: 'What skills do you already have?', step: 'Step 2 of 7' },
    { title: 'What to Learn', sub: 'What would you like to learn?', step: 'Step 3 of 7' },
    { title: 'Your Goal', sub: 'What is your goal on HerPath?', step: 'Step 4 of 7' },
    { title: 'Language', sub: 'What language do you prefer?', step: 'Step 5 of 7' },
    { title: 'Your Location', sub: 'Where are you based?', step: 'Step 6 of 7' },
    { title: 'Availability', sub: 'When are you available?', step: 'Step 7 of 7' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <div style={{ width: 32, height: 32, borderRadius: '9px', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '0.75rem' }}>H</span>
            </div>
            <span style={{ fontWeight: 800, fontSize: '0.9375rem', fontFamily: "'Plus Jakarta Sans'" }}>HerPath</span>
          </div>
        </div>

        <div className="card" style={{ padding: '40px', animation: 'slideUp 0.3s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>{stepTitles[step].step}</span>
          </div>

          <StepIndicator current={step} total={TOTAL_STEPS} />

          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: '6px' }}>{stepTitles[step].title}</h2>
            <p style={{ color: 'var(--text-muted)' }}>{stepTitles[step].sub}</p>
          </div>

          {/* Step Content */}
          <div key={step} style={{ animation: 'fadeIn 0.25s ease' }}>
            {/* Step 0: Role */}
            {step === 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {roleOptions.map(opt => (
                  <OptionCard key={opt.id} label={opt.label} icon={opt.icon} selected={data.role === opt.id} onClick={() => setData(d => ({ ...d, role: opt.id }))} />
                ))}
              </div>
            )}

            {/* Step 1: Skills */}
            {step === 1 && (
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                  {skillOptions.map(s => (
                    <button key={s} className={`chip ${data.skills.includes(s) ? 'selected' : ''}`} onClick={() => toggleArray('skills', s)}>{s}</button>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <input
                    className="form-input"
                    placeholder="Add a custom skill..."
                    value={data.customSkill}
                    onChange={e => setData(d => ({ ...d, customSkill: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addCustomSkill()}
                    style={{ flex: 1 }}
                  />
                  <button onClick={addCustomSkill} className="btn btn-secondary">
                    <Plus size={16} /> Add
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Want to Learn */}
            {step === 2 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {learnOptions.map(s => (
                  <button key={s} className={`chip ${data.wantToLearn.includes(s) ? 'selected' : ''}`} onClick={() => toggleArray('wantToLearn', s)}>{s}</button>
                ))}
              </div>
            )}

            {/* Step 3: Goals */}
            {step === 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {goalOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => toggleArray('goals', opt.id)}
                    style={{
                      padding: '14px 16px',
                      borderRadius: 'var(--radius)',
                      border: `2px solid ${data.goals.includes(opt.id) ? 'var(--primary)' : 'var(--border)'}`,
                      background: data.goals.includes(opt.id) ? 'var(--accent-light)' : 'var(--card)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      transition: 'all var(--transition)',
                      textAlign: 'left',
                      color: data.goals.includes(opt.id) ? 'var(--primary)' : 'var(--text)',
                      fontWeight: data.goals.includes(opt.id) ? 600 : 500,
                      fontSize: '0.9375rem',
                    }}
                  >
                    <span style={{ fontSize: '1.125rem' }}>{opt.icon}</span>
                    {opt.label}
                    {data.goals.includes(opt.id) && <CheckCircle2 size={16} style={{ marginLeft: 'auto' }} />}
                  </button>
                ))}
              </div>
            )}

            {/* Step 4: Language */}
            {step === 4 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                {languageOptions.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setData(d => ({ ...d, language: lang }))}
                    style={{
                      padding: '14px 10px',
                      borderRadius: 'var(--radius)',
                      border: `2px solid ${data.language === lang ? 'var(--primary)' : 'var(--border)'}`,
                      background: data.language === lang ? 'var(--accent-light)' : 'var(--card)',
                      cursor: 'pointer',
                      transition: 'all var(--transition)',
                      color: data.language === lang ? 'var(--primary)' : 'var(--text)',
                      fontWeight: data.language === lang ? 600 : 500,
                      fontSize: '0.875rem',
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}

            {/* Step 5: Location */}
            {step === 5 && (
              <div className="form-group">
                <div style={{ position: 'relative' }}>
                  <MapPin size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    className="form-input"
                    placeholder="e.g., Mumbai, Pune, Delhi..."
                    value={data.location}
                    onChange={e => setData(d => ({ ...d, location: e.target.value }))}
                    style={{ paddingLeft: '44px', fontSize: '1rem' }}
                    autoFocus
                  />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                  {['Mumbai', 'Pune', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur'].map(city => (
                    <button
                      key={city}
                      onClick={() => setData(d => ({ ...d, location: city }))}
                      className={`chip ${data.location === city ? 'selected' : ''}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Availability */}
            {step === 6 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {availabilityOptions.map(opt => (
                  <button
                    key={opt}
                    onClick={() => toggleArray('availability', opt)}
                    style={{
                      padding: '14px 10px',
                      borderRadius: 'var(--radius)',
                      border: `2px solid ${data.availability.includes(opt) ? 'var(--primary)' : 'var(--border)'}`,
                      background: data.availability.includes(opt) ? 'var(--accent-light)' : 'var(--card)',
                      cursor: 'pointer',
                      transition: 'all var(--transition)',
                      color: data.availability.includes(opt) ? 'var(--primary)' : 'var(--text)',
                      fontWeight: data.availability.includes(opt) ? 600 : 500,
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                    }}
                  >
                    {data.availability.includes(opt) && <CheckCircle2 size={14} />}
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            {step > 0 && (
              <button onClick={() => setStep(s => s - 1)} className="btn btn-secondary" style={{ gap: '6px' }}>
                <ChevronLeft size={16} /> Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="btn btn-primary"
              disabled={!canProceed()}
              style={{ flex: 1, justifyContent: 'center', gap: '6px' }}
            >
              {step === TOTAL_STEPS - 1 ? (
                <>Complete Setup <CheckCircle2 size={16} /></>
              ) : (
                <>Continue <ChevronRight size={16} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
