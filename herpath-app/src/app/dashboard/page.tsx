'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/AppContext';
import { AppLayout } from '@/components/AppLayout';
import {
  currentUser, mentors, opportunities, learningPaths, journeyStages,
  User, LearningPath, Opportunity
} from '@/data/mockData';
import {
  ArrowRight, BookOpen, Briefcase, TrendingUp, ChevronRight,
  MapPin, Globe, Star, Zap, Clock, CheckCircle2, Circle, Play,
  Sparkles, Target, Users,
} from 'lucide-react';

function JourneyTracker() {
  const total = journeyStages.length;
  const completed = journeyStages.filter(s => s.completed).length;
  const current = journeyStages.find(s => s.current);
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="card" style={{ padding: '24px 28px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', border: 'none', color: 'white', marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: '6px' }}>Your Journey</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: '4px' }}>{pct}% Complete</div>
          <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)' }}>Currently: <strong>{current?.label}</strong> stage</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius)', padding: '10px 16px', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, textAlign: 'center' }}>{completed}/{total}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>Stages done</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.2)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent-mid)', borderRadius: 3, transition: 'width 0.8s ease' }} />
        </div>
      </div>

      {/* Journey stages */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
        {journeyStages.map((stage, i) => (
          <React.Fragment key={stage.id}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: stage.completed ? 'var(--accent-mid)' : stage.current ? 'white' : 'rgba(255,255,255,0.2)',
                border: stage.current ? '2px solid var(--accent)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}>
                {stage.completed ? <CheckCircle2 size={14} color="var(--secondary)" /> : stage.current ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--primary)' }} /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.4)' }} />}
              </div>
              <span style={{ fontSize: '0.625rem', color: stage.completed || stage.current ? 'white' : 'rgba(255,255,255,0.5)', fontWeight: stage.current ? 700 : 400, whiteSpace: 'nowrap' }}>{stage.label}</span>
            </div>
            {i < journeyStages.length - 1 && (
              <div style={{ flex: 1, height: 1, background: i < completed ? 'var(--accent-mid)' : 'rgba(255,255,255,0.2)', minWidth: 12 }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function MentorCard({ mentor }: { mentor: User }) {
  const [showWhy, setShowWhy] = useState(false);

  return (
    <div className="card card-hover" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
        <div className="avatar-placeholder avatar-lg" style={{ background: mentor.avatarColor, color: 'white' }}>{mentor.initials}</div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text)', fontFamily: "'Plus Jakarta Sans'" }}>{mentor.name}</span>
            {mentor.isVerified && <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckCircle2 size={10} color="white" /></div>}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{mentor.role}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="star-rating" style={{ fontSize: '0.75rem' }}>
              <Star size={12} fill="currentColor" />
              <span style={{ color: 'var(--text)', fontWeight: 600, marginLeft: '2px' }}>{mentor.rating}</span>
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>·</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{mentor.reviewCount} reviews</span>
          </div>
        </div>
        <div className="match-score">{mentor.matchScore}%</div>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {mentor.skills.slice(0, 3).map(s => <span key={s} className="chip skill" style={{ fontSize: '0.75rem', padding: '3px 10px' }}>{s}</span>)}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} />{mentor.location}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Globe size={12} />{mentor.languages.join(', ')}</span>
      </div>

      {/* Why button */}
      <button
        onClick={() => setShowWhy(!showWhy)}
        style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', padding: '0', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
      >
        <Sparkles size={12} /> Why this match?
      </button>

      {showWhy && (
        <div style={{ padding: '10px 12px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', marginBottom: '12px', fontSize: '0.8125rem' }}>
          <div style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '6px' }}>Match reasons:</div>
          {[
            { label: '✓ Teaches Canva', ok: true },
            { label: `✓ Speaks ${mentor.languages.includes('Hindi') ? 'Hindi' : mentor.languages[0]}`, ok: true },
            { label: `${mentor.location === currentUser.location ? '✓' : '✗'} Based in ${mentor.location}`, ok: mentor.location === currentUser.location },
            { label: '✓ Supports your business goal', ok: true },
          ].map((r, i) => (
            <div key={i} style={{ color: r.ok ? 'var(--primary)' : 'var(--text-muted)', marginBottom: '2px' }}>{r.label}</div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        <Link href={`/discover/mentor/${mentor.id}`} className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>View Profile</Link>
        <Link href={`/discover/mentor/${mentor.id}/book`} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Book Session</Link>
      </div>
    </div>
  );
}

function LearningCard({ path }: { path: LearningPath }) {
  return (
    <div className="card card-hover" style={{ padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--text)', fontFamily: "'Plus Jakarta Sans'", marginBottom: '4px' }}>{path.skill}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{path.completedLessons}/{path.totalLessons} lessons · {path.estimatedHours}h</div>
        </div>
        <span className="badge badge-neutral">{path.difficulty}</span>
      </div>
      <div className="progress-bar" style={{ marginBottom: '12px' }}>
        <div className="progress-fill" style={{ width: `${path.progress}%` }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 700 }}>{path.progress}% complete</span>
        <Link href={`/learn/${path.id}`} className="btn btn-primary btn-sm" style={{ gap: '5px' }}>
          <Play size={13} /> Continue
        </Link>
      </div>
    </div>
  );
}

function OpportunityCard({ opp }: { opp: Opportunity }) {
  return (
    <div className="card card-hover" style={{ padding: '18px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.9375rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: '2px' }}>{opp.title}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{opp.company} · {opp.location}</div>
        </div>
        <div className="match-score">{opp.matchScore}%</div>
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
        {opp.skills.map(s => <span key={s} className="chip skill" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{s}</span>)}
      </div>
      <Link href={`/opportunities/${opp.id}`} className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
        View Opportunity <ArrowRight size={13} />
      </Link>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useApp();
  const firstName = user?.name?.split(' ')[0] || 'there';

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const enrolledPaths = learningPaths.filter(p => p.isEnrolled && p.progress < 100);
  const topMentors = mentors.slice(0, 2);
  const topOpps = opportunities.slice(0, 2);

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <h1 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text)' }}>Dashboard</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="avatar-placeholder avatar-md" style={{ background: currentUser.avatarColor, color: 'white', fontSize: '0.75rem' }}>
            {currentUser.initials}
          </div>
        </div>
      </div>

      <div className="page-container">
        {/* Greeting */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: '6px' }}>
            {greeting}, {firstName} 👋
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Here's what's waiting for you today.</p>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Skills', value: currentUser.skills.length, icon: Target, color: 'var(--primary)', bg: 'var(--accent-light)' },
            { label: 'In Progress', value: enrolledPaths.length, icon: BookOpen, color: '#7C3AED', bg: '#F5F3FF' },
            { label: 'Projects', value: currentUser.projects, icon: TrendingUp, color: '#059669', bg: '#ECFDF5' },
            { label: 'Certificates', value: currentUser.certificates, icon: Zap, color: '#D97706', bg: '#FFFBEB' },
          ].map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="card" style={{ padding: '16px 18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color, flexShrink: 0 }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text)', fontFamily: "'Plus Jakarta Sans'" }}>{value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Journey Tracker */}
        <JourneyTracker />

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Continue Learning */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h2 className="section-title"><BookOpen size={18} color="var(--primary)" />Continue Learning</h2>
                <Link href="/learn" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>View all <ChevronRight size={14} /></Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {enrolledPaths.map(p => <LearningCard key={p.id} path={p} />)}
              </div>
            </div>

            {/* Opportunities */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h2 className="section-title"><Briefcase size={18} color="var(--primary)" />Opportunities</h2>
                <Link href="/opportunities" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>View all <ChevronRight size={14} /></Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {topOpps.map(o => <OpportunityCard key={o.id} opp={o} />)}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* AI Recommendation */}
            <div className="card" style={{ padding: '20px', background: 'linear-gradient(135deg, var(--accent-light), #E0FDF4)', border: '1px solid var(--accent-mid)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles size={16} color="var(--primary)" />
                <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--primary)' }}>AI Recommendation</span>
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, fontFamily: "'Plus Jakarta Sans'", marginBottom: '6px' }}>Start Generative AI</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>Based on your goal to start a business, AI skills will give you a 3x productivity advantage.</p>
              <Link href="/learn/lp2" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
                <Play size={13} /> Start Learning
              </Link>
            </div>

            {/* Recommended Mentors */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h2 className="section-title"><Users size={18} color="var(--primary)" />Recommended Mentors</h2>
                <Link href="/discover" style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>See all <ChevronRight size={14} /></Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {topMentors.map(m => <MentorCard key={m.id} mentor={m} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
