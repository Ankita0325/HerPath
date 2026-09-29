'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/AppLayout';
import { learningPaths, LearningPath } from '@/data/mockData';
import { generateLearningPath, LearningPathSuggestion } from '@/services/aiService';
import { BookOpen, Play, Clock, ChevronRight, ArrowRight, Sparkles, Loader2, CheckCircle2, Star, Plus, Lock } from 'lucide-react';

function LearningPathCard({ path, big = false }: { path: LearningPath; big?: boolean }) {
  const colors: Record<string, { bg: string; icon: string }> = {
    'Digital Marketing': { bg: '#EFF6FF', icon: '#3B82F6' },
    'Generative AI': { bg: '#FFF7ED', icon: '#F97316' },
    'Freelancing': { bg: '#F5F3FF', icon: '#8B5CF6' },
    'Canva': { bg: '#F0FDF4', icon: '#22C55E' },
  };
  const color = colors[path.skill] || { bg: 'var(--accent-light)', icon: 'var(--primary)' };

  return (
    <div className={`card card-hover ${big ? '' : ''}`} style={{ padding: big ? '24px' : '18px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '14px' }}>
        <div style={{ width: big ? 52 : 44, height: big ? 52 : 44, borderRadius: 'var(--radius)', background: color.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <BookOpen size={big ? 24 : 20} color={color.icon} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: 700, fontSize: big ? '1.0625rem' : '0.9375rem', fontFamily: "'Plus Jakarta Sans'", color: 'var(--text)' }}>{path.skill}</span>
            <span className={`badge ${path.difficulty === 'Beginner' ? 'badge-success' : path.difficulty === 'Intermediate' ? 'badge-primary' : 'badge-warning'}`}>{path.difficulty}</span>
            {path.progress === 100 && <span className="badge badge-success">✓ Completed</span>}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: '3px' }}>{path.completedLessons}/{path.totalLessons} lessons · {path.estimatedHours}h estimated</div>
        </div>
      </div>

      {big && (
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '14px' }}>{path.description}</p>
      )}

      <div className="progress-bar" style={{ marginBottom: '10px' }}>
        <div className="progress-fill" style={{ width: `${path.progress}%` }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 700 }}>{path.progress}% complete</span>
        <Link
          href={`/learn/${path.id}`}
          className="btn btn-primary btn-sm"
          style={{ gap: '5px' }}
        >
          {path.progress === 0 ? <><Plus size={13} /> Start</> : path.progress === 100 ? <><CheckCircle2 size={13} /> Review</> : <><Play size={13} /> Continue</>}
        </Link>
      </div>
    </div>
  );
}

function AILearningInput() {
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [path, setPath] = useState<LearningPathSuggestion[] | null>(null);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setPath(generateLearningPath(goal));
    setLoading(false);
  };

  const examples = ['I want to start an online food business.', 'I want to become a freelance designer.', 'I want to learn AI for my startup.'];

  return (
    <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--secondary), var(--primary) 150%)', border: 'none', marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
        <Sparkles size={18} color="var(--accent-mid)" />
        <span style={{ fontWeight: 700, color: 'white', fontSize: '0.9375rem' }}>AI Learning Assistant</span>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: '16px' }}>Tell me your goal and I'll create a personalized learning path.</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: path ? '0' : '14px' }}>
        <input
          value={goal}
          onChange={e => setGoal(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          placeholder="e.g., I want to start an online food business."
          style={{
            flex: 1,
            padding: '11px 14px',
            borderRadius: 'var(--radius)',
            border: 'none',
            outline: 'none',
            fontSize: '0.9375rem',
            background: 'rgba(255,255,255,0.95)',
            color: 'var(--text)',
          }}
        />
        <button
          onClick={handleGenerate}
          disabled={!goal.trim() || loading}
          className="btn btn-primary"
          style={{ background: 'var(--accent)', color: 'var(--secondary)', fontWeight: 700, gap: '6px', flexShrink: 0 }}
        >
          {loading ? <Loader2 size={16} style={{ animation: 'spin 0.8s linear infinite' }} /> : <Sparkles size={16} />}
          Generate
        </button>
      </div>

      {!path && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {examples.map((ex, i) => (
            <button key={i} onClick={() => setGoal(ex)} style={{ padding: '4px 10px', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem', cursor: 'pointer' }}>
              {ex}
            </button>
          ))}
        </div>
      )}

      {path && (
        <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius)', backdropFilter: 'blur(10px)' }}>
          <div style={{ fontWeight: 700, color: 'white', marginBottom: '12px', fontSize: '0.875rem' }}>✨ Your recommended path:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {path.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: 'var(--radius)', background: 'rgba(255,255,255,0.12)' }}>
                <span style={{ fontWeight: 800, color: 'var(--accent-mid)', minWidth: '20px', fontFamily: "'Plus Jakarta Sans'" }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'white', fontSize: '0.875rem' }}>{item.skill}</div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>{item.reason} · {item.estimatedHours}h</div>
                </div>
                <span style={{ fontSize: '0.75rem', color: item.priority === 'High' ? 'var(--accent-mid)' : 'rgba(255,255,255,0.6)', fontWeight: 600 }}>{item.priority}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setPath(null)}
            style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: 'white', borderRadius: 'var(--radius)', padding: '8px 16px', fontSize: '0.8125rem', cursor: 'pointer', marginTop: '12px', width: '100%' }}
          >
            Try another goal
          </button>
        </div>
      )}
    </div>
  );
}

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState('enrolled');
  const enrolled = learningPaths.filter(p => p.isEnrolled);
  const discover = learningPaths.filter(p => !p.isEnrolled);
  const completed = learningPaths.filter(p => p.progress === 100);

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text)' }}>Learn</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Build skills that move you forward.</div>
        </div>
      </div>

      <div className="page-container">
        <AILearningInput />

        {/* Tabs */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div className="tabs">
            {[
              { id: 'enrolled', label: `In Progress (${enrolled.filter(p => p.progress < 100).length})` },
              { id: 'discover', label: 'Discover' },
              { id: 'completed', label: `Completed (${completed.length})` },
            ].map(tab => (
              <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>
          <Link href="/discover" className="btn btn-secondary btn-sm">Browse All Skills</Link>
        </div>

        {/* Content */}
        {activeTab === 'enrolled' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {enrolled.filter(p => p.progress < 100).map(p => (
              <LearningPathCard key={p.id} path={p} big />
            ))}
            {enrolled.filter(p => p.progress < 100).length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon"><BookOpen size={28} /></div>
                <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>No courses in progress</h3>
                <p style={{ color: 'var(--text-muted)' }}>Discover new skills and start learning today.</p>
                <button onClick={() => setActiveTab('discover')} className="btn btn-primary">Discover Skills</button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'discover' && (
          <div className="grid-2">
            {discover.map(p => <LearningPathCard key={p.id} path={p} />)}
            {/* More skills placeholders */}
            {[
              { id: 'extra1', skillId: 'photography', skill: 'Photography', description: 'Learn product photography for your business.', progress: 0, totalLessons: 10, completedLessons: 0, estimatedHours: 5, difficulty: 'Beginner' as const, isEnrolled: false },
              { id: 'extra2', skillId: 'excel', skill: 'Excel', description: 'Master Excel for business finance and data analysis.', progress: 0, totalLessons: 15, completedLessons: 0, estimatedHours: 7, difficulty: 'Beginner' as const, isEnrolled: false },
            ].map(p => <LearningPathCard key={p.id} path={p} />)}
          </div>
        )}

        {activeTab === 'completed' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {completed.map(p => <LearningPathCard key={p.id} path={p} big />)}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
