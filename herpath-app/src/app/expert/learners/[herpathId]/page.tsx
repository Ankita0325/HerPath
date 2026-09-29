'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { useApp } from '@/lib/AppContext';
import { currentUser } from '@/data/mockData';
import { KnowledgeGraphViewer } from '@/components/KnowledgeGraphViewer';
import { getLearnerTimelineEvents } from '@/services/neo4jService';
import {
  ArrowLeft, ShieldCheck, Sparkles, BookOpen, Briefcase, Award, Trophy,
  Target, Clock, Lock, CheckCircle2, AlertTriangle, ExternalLink,
} from 'lucide-react';

export default function ExpertLearnerViewPage() {
  const params = useParams();
  const rawId = (params.herpathId as string) || 'HP-7K29-X4M8';
  const herpathId = decodeURIComponent(rawId).toUpperCase();

  const { accessRequests } = useApp();
  const [activeTab, setActiveTab] = useState('graph');

  // Verify Active Permission
  const accessRecord = accessRequests.find(
    r => r.learnerHerPathId.toUpperCase() === herpathId && r.status === 'APPROVED'
  );

  if (!accessRecord) {
    return (
      <AppLayout>
        <div className="topbar">
          <Link href="/expert/learners" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
            <ArrowLeft size={16} /> Back to My Learners
          </Link>
        </div>

        <div className="page-container" style={{ maxWidth: 640, textAlign: 'center', padding: '56px 20px' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--error-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Lock size={32} color="var(--error)" />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 8 }}>
            Access Restricted
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: 24, lineHeight: 1.6 }}>
            You do not currently have active learner consent for <strong>{herpathId}</strong>. The learner must approve your request before you can view protected history.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <Link href="/expert/lookup" className="btn btn-primary">Request Access</Link>
            <Link href="/expert/dashboard" className="btn btn-secondary">Go to Dashboard</Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  const learner = currentUser;
  const granted = accessRecord.grantedCategories || {
    skills: true,
    projects: true,
    learningProgress: true,
    certificates: true,
    achievements: true,
    assessments: false,
    goals: true,
  };

  const timelineEvents = getLearnerTimelineEvents(learner.id, granted);

  return (
    <AppLayout>
      <div className="topbar">
        <Link href="/expert/learners" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to My Learners
        </Link>
      </div>

      <div className="page-container">
        {/* LEARNER PROFILE HERO HEADER */}
        <div className="card" style={{ padding: '28px', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div className="avatar-placeholder avatar-xl" style={{ background: learner.avatarColor, color: 'white', width: 72, height: 72, fontSize: '1.5rem', fontWeight: 800 }}>
              {learner.initials}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>{learner.name}</h1>
                <span className="badge badge-primary" style={{ fontFamily: 'monospace', fontWeight: 700 }}>{learner.herpathId}</span>
                <span className="badge badge-success" style={{ gap: 4 }}>
                  <ShieldCheck size={12} /> Active Consent Granted
                </span>
              </div>

              <div style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{learner.role} · {learner.location}</div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                <span>Profile Strength: <strong style={{ color: 'var(--primary)' }}>85%</strong></span>
                <span>Access Purpose: <strong style={{ color: 'var(--text)' }}>{accessRecord.purpose}</strong></span>
                <span>Expires: <strong style={{ color: 'var(--success)' }}>{accessRecord.expiresAt ? new Date(accessRecord.expiresAt).toLocaleDateString() : 'Active'}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="tabs" style={{ marginBottom: 24, width: '100%', overflowX: 'auto', flexWrap: 'nowrap' }}>
          {[
            { id: 'graph', label: 'Knowledge Graph' },
            { id: 'skills', label: 'Skills' },
            { id: 'learning', label: 'Learning Paths' },
            { id: 'projects', label: 'Projects' },
            { id: 'certificates', label: 'Certificates' },
            { id: 'timeline', label: 'Timeline' },
          ].map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ padding: '9px 18px', fontWeight: activeTab === tab.id ? 700 : 500 }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: KNOWLEDGE GRAPH */}
        {activeTab === 'graph' && (
          <div>
            <KnowledgeGraphViewer
              learnerId={learner.id}
              grantedCategories={granted}
              learnerName={learner.name}
              herpathId={learner.herpathId}
            />
          </div>
        )}

        {/* TAB 2: SKILLS */}
        {activeTab === 'skills' && (
          <div>
            {granted.skills !== false ? (
              <div className="grid-3">
                {[
                  { name: 'Canva', level: '90%', cat: 'Design & Visuals', desc: 'Advanced brand asset creation & layout design.' },
                  { name: 'Digital Marketing', level: '80%', cat: 'Marketing', desc: 'Social media strategy, campaign analytics & SEO.' },
                  { name: 'Video Editing', level: '60%', cat: 'Media', desc: 'Short-form Reels & YouTube video editing.' },
                ].map(s => (
                  <div key={s.name} className="card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <h4 style={{ fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>{s.name}</h4>
                      <span className="badge badge-primary">{s.level}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 10 }}>{s.cat}</div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: 12 }}>{s.desc}</p>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: s.level }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Lock size={24} style={{ marginBottom: 6 }} />
                <div>Skills category is currently restricted by the learner.</div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: LEARNING PATHS */}
        {activeTab === 'learning' && (
          <div>
            {granted.learningProgress !== false ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="card" style={{ padding: '22px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <div>
                      <h3 style={{ fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>Digital Marketing Mastery</h3>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>8 of 10 Modules Completed · Enrolled Jan 2026</div>
                    </div>
                    <span className="badge badge-success" style={{ fontSize: '0.875rem' }}>80% Complete</span>
                  </div>
                  <div className="progress-bar" style={{ marginBottom: 16 }}>
                    <div className="progress-fill" style={{ width: '80%' }} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: '0.8125rem' }}>
                    <div style={{ color: 'var(--success)', fontWeight: 600 }}>✓ Canva Basics</div>
                    <div style={{ color: 'var(--success)', fontWeight: 600 }}>✓ Social Media Strategy</div>
                    <div style={{ color: 'var(--success)', fontWeight: 600 }}>✓ Branding & Visual Identity</div>
                    <div style={{ color: 'var(--text-muted)' }}>○ Campaign Analytics & ROI</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Lock size={24} style={{ marginBottom: 6 }} />
                <div>Learning Progress category is restricted by learner.</div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: PROJECTS */}
        {activeTab === 'projects' && (
          <div>
            {granted.projects !== false ? (
              <div className="grid-2">
                {[
                  { name: 'Brand Campaign for Bakery', date: 'April 2026', skills: ['Canva', 'Branding', 'Digital Marketing'] },
                  { name: 'Instagram Creator Portfolio', date: 'May 2026', skills: ['Social Media', 'Content Creation'] },
                ].map(p => (
                  <div key={p.name} className="card" style={{ padding: '20px' }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 10 }}>Created {p.date}</div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {p.skills.map(s => <span key={s} className="chip skill" style={{ fontSize: '0.75rem' }}>{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Lock size={24} style={{ marginBottom: 6 }} />
                <div>Projects category is restricted by learner.</div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: CERTIFICATES */}
        {activeTab === 'certificates' && (
          <div>
            {granted.certificates !== false ? (
              <div className="grid-2">
                <div className="card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <Award size={32} color="var(--primary)" />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'" }}>Google Digital Marketing Certificate</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Issued by Google · May 2026</div>
                      <span className="badge badge-success" style={{ marginTop: 6 }}>✓ Verified Credential</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Lock size={24} style={{ marginBottom: 6 }} />
                <div>Certificates category is restricted by learner.</div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: TIMELINE */}
        {activeTab === 'timeline' && (
          <div>
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontWeight: 800, fontSize: '1.125rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 20 }}>
                Chronological Learning Timeline
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {timelineEvents.map(evt => (
                  <div key={evt.id} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 50, textAlign: 'right', fontWeight: 800, fontSize: '0.8125rem', color: 'var(--primary)', paddingTop: 2 }}>
                      {evt.month}
                    </div>
                    <div style={{ width: 12, height: 12, borderRadius: '50%', background: evt.color, marginTop: 4, flexShrink: 0 }} />
                    <div style={{ flex: 1, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{evt.title}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: 2 }}>{evt.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
