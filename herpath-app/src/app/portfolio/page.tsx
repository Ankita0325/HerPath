'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/AppLayout';
import { currentUser, projects, certificates, learningPaths, Project, Certificate } from '@/data/mockData';
import {
  Award, Briefcase, Edit3, Share2, Plus, X, ExternalLink, BookOpen,
  Trash2, Copy, Check, ChevronRight, Eye, TrendingUp, Target, Users,
  Star, Clock, CheckCircle2,
} from 'lucide-react';

/* ─── SKILL PROFICIENCY DATA ─── */
const skillProficiency = [
  { name: 'Canva', level: 90, projects: 5, canTeach: true, cert: true },
  { name: 'Digital Marketing', level: 80, projects: 4, canTeach: false, cert: true },
  { name: 'Video Editing', level: 70, projects: 3, canTeach: false, cert: false },
  { name: 'AI Tools', level: 55, projects: 1, canTeach: false, cert: false },
  { name: 'Instagram Marketing', level: 75, projects: 3, canTeach: true, cert: false },
];

/* ─── SHARE MODAL ─── */
function ShareModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const link = 'herpath.app/u/riya-sharma';

  const handleCopy = () => {
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Share Portfolio</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', border: '2px solid var(--accent-mid)' }}>
            <Share2 size={26} color="var(--primary)" />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Your portfolio is ready to share with the world.</p>
        </div>
        <div style={{ background: 'var(--bg-alt)', borderRadius: 'var(--radius)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ flex: 1, fontSize: '0.9375rem', color: 'var(--primary)', fontWeight: 500 }}>{link}</span>
          <button onClick={handleCopy} className="btn btn-primary btn-sm" style={{ gap: 5, flexShrink: 0 }}>
            {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Link</>}
          </button>
        </div>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center' }}>
          Anyone with this link can view your public portfolio.
        </p>
      </div>
    </div>
  );
}

/* ─── PROJECT MODAL ─── */
function ProjectModal({ project, onClose, onDelete }: { project: Project; onClose: () => void; onDelete: (id: string) => void }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg">
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>{project.title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ height: 180, borderRadius: 'var(--radius)', background: project.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, border: '1px solid var(--border)' }}>
          <div style={{ textAlign: 'center' }}>
            <Briefcase size={40} color="var(--primary)" style={{ opacity: 0.4 }} />
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 8 }}>Project Preview</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8 }}>Overview</div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{project.description}</p>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8 }}>Skills Used</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.skills.map(s => <span key={s} className="chip skill" style={{ fontSize: '0.8125rem' }}>{s}</span>)}
            </div>
          </div>
        </div>
        <div style={{ marginBottom: 20, padding: '14px 16px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8 }}>Project Outcome</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['Professional deliverables created', 'Client satisfaction achieved', 'Added to verified portfolio'].map((o, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={14} color="var(--success)" /> {o}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={() => { onDelete(project.id); onClose(); }} className="btn btn-secondary btn-sm" style={{ color: 'var(--error)', borderColor: 'var(--error)', gap: 4 }}>
            <Trash2 size={13} /> Delete
          </button>
          <button className="btn btn-secondary btn-sm" style={{ gap: 4 }}><Edit3 size={13} /> Edit</button>
          <button className="btn btn-primary btn-sm" style={{ gap: 4 }}><Share2 size={13} /> Share</button>
        </div>
      </div>
    </div>
  );
}

/* ─── ADD PROJECT MODAL ─── */
function AddProjectModal({ onClose, onAdd }: { onClose: () => void; onAdd: (p: Project) => void }) {
  const [form, setForm] = useState({ title: '', description: '', skills: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onAdd({
      id: `proj-${Date.now()}`,
      title: form.title,
      description: form.description || 'A new project added to my portfolio.',
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      bgColor: '#F0FDF4',
      createdAt: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Add Project</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Project Title *</label>
            <input className="form-input" placeholder="e.g., Brand Campaign for XYZ" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={3} placeholder="What did you create? What was the outcome?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Skills Used (comma separated)</label>
            <input className="form-input" placeholder="e.g., Canva, Digital Marketing" value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} />
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── SKILL DETAIL MODAL ─── */
function SkillDetailModal({ skill, onClose }: { skill: typeof skillProficiency[0]; onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 440 }}>
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>{skill.name}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 6 }}>Proficiency</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="progress-bar" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${skill.level}%` }} /></div>
              <span style={{ fontWeight: 700, color: 'var(--primary)', minWidth: 36 }}>{skill.level}%</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {[
              { label: 'Projects', value: skill.projects, icon: <Briefcase size={16} /> },
              { label: 'Can Teach', value: skill.canTeach ? 'Yes' : 'No', icon: <Users size={16} /> },
              { label: 'Certificate', value: skill.cert ? 'Yes' : 'No', icon: <Award size={16} /> },
            ].map(({ label, value, icon }) => (
              <div key={label} style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
                <div style={{ color: 'var(--primary)', marginBottom: 4 }}>{icon}</div>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>
          {skill.canTeach && (
            <div style={{ padding: '12px 14px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', border: '1px solid var(--accent-mid)' }}>
              <div style={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.875rem', marginBottom: 4 }}>✓ You can teach this skill</div>
              <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>You are eligible to mentor others in {skill.name}.</p>
            </div>
          )}
          <Link href="/opportunities" onClick={onClose} className="btn btn-primary" style={{ justifyContent: 'center' }}>Find Opportunities with {skill.name}</Link>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PORTFOLIO PAGE ─── */
export default function PortfolioPage() {
  const [myProjects, setMyProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<typeof skillProficiency[0] | null>(null);
  const [activeTab, setActiveTab] = useState('skills');

  const enrolledPaths = learningPaths.filter(p => p.isEnrolled && p.progress < 100);

  const handleDeleteProject = (id: string) => {
    setMyProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>Portfolio</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Your professional skill identity.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" style={{ gap: 5 }}><Edit3 size={14} /> Edit</button>
          <button onClick={() => setShowShare(true)} className="btn btn-primary btn-sm" style={{ gap: 5 }}><Share2 size={14} /> Share</button>
        </div>
      </div>

      <div className="page-container">
        {/* Profile Header */}
        <div className="card" style={{ padding: '28px', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <div className="avatar-placeholder" style={{ width: 84, height: 84, background: currentUser.avatarColor, color: 'white', fontSize: '1.625rem', fontWeight: 800, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {currentUser.initials}
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderRadius: '50%', background: 'var(--success)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={11} color="white" />
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 4 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>{currentUser.name}</h1>
                <span className="badge badge-primary">Verified ✓</span>
              </div>
              <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Digital Creator &amp; Aspiring Entrepreneur</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: 520, marginBottom: 14 }}>
                {currentUser.bio}
              </p>
              {/* Stats */}
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                {[
                  { value: myProjects.length, label: 'Projects', icon: <Briefcase size={14} /> },
                  { value: certificates.length, label: 'Certificates', icon: <Award size={14} /> },
                  { value: skillProficiency.length, label: 'Skills', icon: <Target size={14} /> },
                  { value: currentUser.canTeach.length, label: 'Can Teach', icon: <Users size={14} /> },
                ].map(({ value, label, icon }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ color: 'var(--primary)' }}>{icon}</div>
                    <span style={{ fontWeight: 700, color: 'var(--text)' }}>{value}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
              <button onClick={() => setShowShare(true)} className="btn btn-primary btn-sm" style={{ gap: 5 }}><Share2 size={13} /> Share Portfolio</button>
              <button className="btn btn-secondary btn-sm" style={{ gap: 5 }}><Edit3 size={13} /> Edit Portfolio</button>
            </div>
          </div>
        </div>

        {/* Profile Completion Card */}
        <div className="card" style={{ padding: '18px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 16, background: 'linear-gradient(135deg, #EFF6FF, white)', border: '1px solid #BFDBFE' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Profile Strength — 85%</div>
            <div className="progress-bar" style={{ marginBottom: 6 }}>
              <div className="progress-fill" style={{ width: '85%' }} />
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Add 1 experience entry to reach 100%</div>
          </div>
          <Link href="/profile" className="btn btn-secondary btn-sm">Complete Profile</Link>
        </div>

        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: 24 }}>
          {[
            { id: 'skills', label: 'Skills' },
            { id: 'projects', label: `Projects (${myProjects.length})` },
            { id: 'certificates', label: `Certificates (${certificates.length})` },
            { id: 'teach', label: 'Can Teach' },
            { id: 'learning', label: 'Learning' },
          ].map(tab => (
            <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
          ))}
        </div>

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {skillProficiency.map(skill => (
              <div
                key={skill.name}
                className="card card-hover"
                style={{ padding: '18px 20px', cursor: 'pointer' }}
                onClick={() => setSelectedSkill(skill)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9375rem', fontFamily: "'Plus Jakarta Sans'" }}>{skill.name}</span>
                      {skill.canTeach && <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>Can Teach</span>}
                      {skill.cert && <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>Certified</span>}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="progress-bar" style={{ flex: 1 }}>
                        <div className="progress-fill" style={{ width: `${skill.level}%` }} />
                      </div>
                      <span style={{ fontWeight: 700, color: 'var(--primary)', minWidth: 36, fontSize: '0.875rem' }}>{skill.level}%</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexShrink: 0, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Briefcase size={13} /> {skill.projects} projects</span>
                  </div>
                  <ChevronRight size={16} color="var(--text-muted)" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <button onClick={() => setShowAddProject(true)} className="btn btn-primary btn-sm" style={{ gap: 5 }}><Plus size={14} /> Add Project</button>
            </div>
            <div className="grid-3">
              {myProjects.map(proj => (
                <div key={proj.id} className="card card-hover" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }} onClick={() => setSelectedProject(proj)}>
                  <div style={{ height: 140, background: proj.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)' }}>
                    <Briefcase size={36} color="var(--primary)" style={{ opacity: 0.35 }} />
                  </div>
                  <div style={{ padding: '16px 16px 14px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 4 }}>{proj.title}</div>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 10 }} className="line-clamp-2">{proj.description}</p>
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 12 }}>
                      {proj.skills.slice(0, 2).map(s => <span key={s} className="chip skill" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{s}</span>)}
                      {proj.skills.length > 2 && <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>+{proj.skills.length - 2}</span>}
                    </div>
                    <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', gap: 4 }}>
                      <Eye size={13} /> View Project
                    </button>
                  </div>
                </div>
              ))}
              {/* Add Project Card */}
              <div className="card" onClick={() => setShowAddProject(true)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 20px', cursor: 'pointer', border: '2px dashed var(--border)', boxShadow: 'none', minHeight: 240 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLElement).style.background = 'var(--accent-light)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.background = 'white'; }}
              >
                <Plus size={24} color="var(--text-muted)" style={{ marginBottom: 10 }} />
                <div style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.875rem' }}>Add Project</div>
              </div>
            </div>
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <button className="btn btn-primary btn-sm" style={{ gap: 5 }}><Plus size={14} /> Add Certificate</button>
            </div>
            <div className="grid-3">
              {certificates.map(cert => (
                <div key={cert.id} className="card card-hover" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ height: 120, background: cert.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)' }}>
                    <Award size={36} color="var(--primary)" style={{ opacity: 0.5 }} />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 4 }}>{cert.title}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 4 }}>{cert.issuer}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 12 }}>{cert.issuedAt}</div>
                    <span className="chip skill" style={{ fontSize: '0.75rem' }}>{cert.skill}</span>
                    <button className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center', marginTop: 12, gap: 4 }}>
                      <ExternalLink size={13} /> View Certificate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Can Teach Tab */}
        {activeTab === 'teach' && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
              {currentUser.canTeach.map(skill => (
                <div key={skill} className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--radius)', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 size={18} color="var(--primary)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>{skill}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Available to teach online</div>
                  </div>
                  <Link href="/opportunities" className="btn btn-secondary btn-sm">Find Students</Link>
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: '20px', background: 'linear-gradient(135deg, var(--accent-light), white)', border: '1px solid var(--accent-mid)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <Star size={18} color="var(--primary)" />
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>Start Mentoring</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>
                Turn your skills into income by mentoring others. Set your own rate and availability.
              </p>
              <Link href="/opportunities?tab=mentor" className="btn btn-primary" style={{ gap: 5 }}>
                <Users size={15} /> Offer Mentoring
              </Link>
            </div>
          </div>
        )}

        {/* Learning Tab */}
        {activeTab === 'learning' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', marginBottom: 4 }}>Skills you're currently building:</p>
            {enrolledPaths.map(path => (
              <div key={path.id} className="card card-hover" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius)', background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <BookOpen size={18} color="var(--primary)" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{path.skill}</div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${path.progress}%` }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.875rem' }}>{path.progress}%</span>
                    <Link href={`/learn/${path.id}`} className="btn btn-secondary btn-sm">Continue</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showShare && <ShareModal onClose={() => setShowShare(false)} />}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onDelete={handleDeleteProject} />}
      {showAddProject && <AddProjectModal onClose={() => setShowAddProject(false)} onAdd={p => setMyProjects(prev => [p, ...prev])} />}
      {selectedSkill && <SkillDetailModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
    </AppLayout>
  );
}
