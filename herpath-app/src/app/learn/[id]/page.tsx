'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { learningPaths, mentors } from '@/data/mockData';
import { ArrowLeft, Play, CheckCircle2, Lock, BookOpen, FileText, Lightbulb, HelpCircle, Clock, Star, Users, Award, Target } from 'lucide-react';

export default function LearningPathPage() {
  const params = useParams();
  const pathId = params.id as string;
  const path = learningPaths.find(p => p.id === pathId) || learningPaths[0];
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const typeIcons: Record<string, React.ReactNode> = {
    'Video': <Play size={14} />,
    'Article': <FileText size={14} />,
    'Practice': <Target size={14} />,
    'Quiz': <HelpCircle size={14} />,
  };

  const relatedMentors = mentors.filter(m => m.skills.some(s => s.toLowerCase().includes(path.skill.toLowerCase()))).slice(0, 2);

  return (
    <AppLayout>
      <div className="topbar">
        <Link href="/learn" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Back to Learn
        </Link>
      </div>

      <div className="page-container">
        {/* Header */}
        <div className="card" style={{ padding: '28px', marginBottom: '24px', background: 'linear-gradient(135deg, var(--accent-light), white)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
            <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-md)', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <BookOpen size={28} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>{path.skill}</h1>
                <span className={`badge ${path.difficulty === 'Beginner' ? 'badge-success' : path.difficulty === 'Intermediate' ? 'badge-primary' : 'badge-warning'}`}>{path.difficulty}</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: '16px', lineHeight: 1.6 }}>{path.description}</p>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {[
                  { icon: <BookOpen size={14} />, label: `${path.totalLessons} lessons` },
                  { icon: <Clock size={14} />, label: `${path.estimatedHours}h estimated` },
                  { icon: <Users size={14} />, label: '1.2K enrolled' },
                  { icon: <Star size={14} fill="currentColor" />, label: '4.8 rating' },
                ].map(({ icon, label }, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    {icon} {label}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: "'Plus Jakarta Sans'" }}>{path.progress}%</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '8px' }}>complete</div>
              <div className="progress-bar" style={{ width: '120px', marginLeft: 'auto' }}>
                <div className="progress-fill" style={{ width: `${path.progress}%` }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
          <div>
            {/* Tabs */}
            <div className="tabs" style={{ marginBottom: '20px' }}>
              {['overview', 'videos', 'practice', 'experts'].map(tab => (
                <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)} style={{ textTransform: 'capitalize' }}>
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontWeight: 700, marginBottom: '4px' }}>Course Modules</h3>
                {(path.modules || []).map((mod, i) => (
                  <div key={mod.id} className="card" style={{ padding: '16px', cursor: 'pointer', borderColor: mod.completed ? 'var(--accent-mid)' : 'var(--border)', background: mod.completed ? 'var(--accent-light)' : 'white' }}
                    onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 'var(--radius)', background: mod.completed ? 'var(--primary)' : 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: mod.completed ? 'white' : 'var(--text-muted)', flexShrink: 0 }}>
                        {mod.completed ? <CheckCircle2 size={16} /> : typeIcons[mod.type] || <Play size={14} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.9375rem', color: mod.completed ? 'var(--primary)' : 'var(--text)' }}>{mod.title}</div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{mod.type}</span>
                          <span>·</span>
                          <Clock size={11} />
                          <span>{mod.duration}</span>
                        </div>
                      </div>
                      {!mod.completed && i > 0 && !path.modules?.[i - 1]?.completed && <Lock size={14} color="var(--text-muted)" />}
                    </div>
                    {mod.completed && <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600, marginTop: '6px', marginLeft: '44px' }}>✓ Completed</div>}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="grid-2">
                {[
                  { title: 'Introduction to ' + path.skill, duration: '15 min', views: '8.2K', type: 'Video' },
                  { title: 'Core concepts explained', duration: '22 min', views: '6.1K', type: 'Video' },
                  { title: 'Practical walkthrough', duration: '34 min', views: '12.3K', type: 'Video' },
                  { title: 'Advanced techniques', duration: '28 min', views: '4.7K', type: 'Video' },
                ].map((v, i) => (
                  <div key={i} className="card card-hover" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ height: '120px', background: `hsl(${160 + i * 20},40%,92%)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(15,118,110,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={18} color="white" />
                      </div>
                    </div>
                    <div style={{ padding: '14px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '4px' }}>{v.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.duration} · {v.views} views</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'practice' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="card" style={{ padding: '20px', border: '2px solid var(--accent-mid)', background: 'var(--accent-light)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Target size={20} color="var(--primary)" />
                    <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Challenge: Build a Real Project</span>
                  </div>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                    Apply your {path.skill} skills by creating a real-world project. This goes directly to your portfolio.
                  </p>
                  <button className="btn btn-primary">Start Challenge <Play size={14} /></button>
                </div>
                {[
                  'Quick Quiz: Test your knowledge',
                  'Peer Review: Exchange feedback',
                  'Mini Project: 30-minute exercise',
                ].map((item, i) => (
                  <div key={i} className="card card-hover" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {i === 0 ? <HelpCircle size={16} color="var(--text-muted)" /> : i === 1 ? <Users size={16} color="var(--text-muted)" /> : <Lightbulb size={16} color="var(--text-muted)" />}
                    </div>
                    <div style={{ flex: 1, fontWeight: 600, fontSize: '0.875rem' }}>{item}</div>
                    <button className="btn btn-secondary btn-sm">Start</button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'experts' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Experts who teach {path.skill}:</p>
                {relatedMentors.map(mentor => (
                  <div key={mentor.id} className="card card-hover" style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <div className="avatar-placeholder avatar-lg" style={{ background: mentor.avatarColor, color: 'white' }}>{mentor.initials}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700 }}>{mentor.name}</div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{mentor.role}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8125rem', color: '#F59E0B' }}>
                          <Star size={12} fill="currentColor" />
                          <span style={{ color: 'var(--text)', fontWeight: 600 }}>{mentor.rating}</span>
                          <span style={{ color: 'var(--text-muted)' }}>({mentor.reviewCount} reviews)</span>
                        </div>
                      </div>
                      <Link href={`/discover/mentor/${mentor.id}/book`} className="btn btn-primary btn-sm">Book</Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="card" style={{ padding: '20px' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '14px' }}>Your Progress</h4>
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', fontFamily: "'Plus Jakarta Sans'" }}>{path.progress}%</div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{path.completedLessons} of {path.totalLessons} lessons done</div>
              </div>
              <div className="progress-bar" style={{ height: 10, marginBottom: '14px' }}>
                <div className="progress-fill" style={{ width: `${path.progress}%` }} />
              </div>
              <Link href="#" className="btn btn-primary w-full" style={{ justifyContent: 'center', gap: '6px' }}>
                <Play size={15} /> Continue Learning
              </Link>
            </div>

            <div className="card" style={{ padding: '20px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Award size={18} color="var(--primary)" />
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Certificate</span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Complete this course to earn your HerPath certificate and add it to your portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
