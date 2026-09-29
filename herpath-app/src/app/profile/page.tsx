'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/AppLayout';
import { currentUser } from '@/data/mockData';
import { useApp } from '@/lib/AppContext';
import { KnowledgeGraphViewer } from '@/components/KnowledgeGraphViewer';                              // ← NEW
import { AccessRequest, AccessCategory } from '@/data/mockData';        // ← NEW types
import {
  Edit3, Share2, MapPin, Globe, Plus, X, CheckCircle2, ChevronRight,
  User, Target, BookOpen, Briefcase, Award, Clock, LogOut,
  Bell, Lock, Smartphone, Trash2, Check, Copy, TrendingUp,
  Shield,                                                              // ← NEW icon
} from 'lucide-react';

/* ─── EDIT PROFILE MODAL (unchanged) ─── */
function EditProfileModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    name: currentUser.name,
    role: 'Digital Creator & Aspiring Entrepreneur',
    bio: currentUser.bio,
    location: currentUser.location,
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Edit Profile</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="form-group">
            <label className="form-label">Professional Title</label>
            <input className="form-input" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="e.g., Digital Creator & Entrepreneur" />
          </div>
          <div className="form-group">
            <label className="form-label">About Me</label>
            <textarea className="form-input" rows={4} value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} style={{ resize: 'vertical' }} />
          </div>
          <div className="form-group">
            <label className="form-label">Location</label>
            <input className="form-input" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="City, State" />
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ gap: 5 }}>
              {saved ? <><Check size={14} /> Saved!</> : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── ADD EXPERIENCE MODAL (unchanged) ─── */
function AddExperienceModal({ onClose, onAdd }: {
  onClose: () => void;
  onAdd: (exp: Experience) => void;
}) {
  const [form, setForm] = useState({ title: '', company: '', from: '', to: '', current: false, desc: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.company) return;
    onAdd({ id: `exp-${Date.now()}`, ...form });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Add Experience</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Job Title *</label>
            <input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g., Social Media Manager" autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">Company / Organization *</label>
            <input className="form-input" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="e.g., Freelance / Company Name" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label className="form-label">From</label>
              <input className="form-input" type="month" value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="form-label">To</label>
              <input className="form-input" type="month" value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))} disabled={form.current} />
            </div>
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.875rem' }}>
            <input type="checkbox" checked={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.checked }))} />
            I currently work here
          </label>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" rows={3} value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Briefly describe your role..." style={{ resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Experience</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── ADD EDUCATION MODAL (unchanged) ─── */
function AddEducationModal({ onClose, onAdd }: {
  onClose: () => void;
  onAdd: (edu: Education) => void;
}) {
  const [form, setForm] = useState({ degree: '', school: '', field: '', from: '', to: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.degree || !form.school) return;
    onAdd({ id: `edu-${Date.now()}`, ...form });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Add Education</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-group">
            <label className="form-label">Degree / Qualification *</label>
            <input className="form-input" value={form.degree} onChange={e => setForm(f => ({ ...f, degree: e.target.value }))} placeholder="e.g., Bachelor of Engineering" autoFocus />
          </div>
          <div className="form-group">
            <label className="form-label">School / University *</label>
            <input className="form-input" value={form.school} onChange={e => setForm(f => ({ ...f, school: e.target.value }))} placeholder="e.g., Mumbai University" />
          </div>
          <div className="form-group">
            <label className="form-label">Field of Study</label>
            <input className="form-input" value={form.field} onChange={e => setForm(f => ({ ...f, field: e.target.value }))} placeholder="e.g., Computer Engineering" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group"><label className="form-label">From Year</label><input className="form-input" type="number" placeholder="2020" value={form.from} onChange={e => setForm(f => ({ ...f, from: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">To Year</label><input className="form-input" type="number" placeholder="2024" value={form.to} onChange={e => setForm(f => ({ ...f, to: e.target.value }))} /></div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Education</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─── SHARE PROFILE MODAL (unchanged) ─── */
function ShareProfileModal({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const link = 'herpath.app/u/riya-sharma';
  const handleCopy = () => { navigator.clipboard.writeText(link).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 440 }}>
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Share Profile</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <Share2 size={32} color="var(--primary)" style={{ marginBottom: 10 }} />
          <p style={{ color: 'var(--text-muted)' }}>Share your profile link with potential collaborators, mentors, or clients.</p>
        </div>
        <div style={{ background: 'var(--bg-alt)', borderRadius: 'var(--radius)', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ flex: 1, fontSize: '0.9375rem', color: 'var(--primary)', fontWeight: 500 }}>{link}</span>
          <button onClick={handleCopy} className="btn btn-primary btn-sm" style={{ gap: 4, flexShrink: 0 }}>
            {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
          </button>
        </div>
        <button onClick={onClose} className="btn btn-secondary w-full" style={{ justifyContent: 'center' }}>Close</button>
      </div>
    </div>
  );
}

/* ─── TYPES (unchanged) ─── */
interface Experience {
  id: string; title: string; company: string;
  from: string; to: string; current: boolean; desc: string;
}
interface Education {
  id: string; degree: string; school: string; field: string; from: string; to: string;
}

/* ─── SECTION CARD (unchanged) ─── */
function SectionCard({ title, icon, children, onAdd, addLabel }: {
  title: string; icon: React.ReactNode; children: React.ReactNode;
  onAdd?: () => void; addLabel?: string;
}) {
  return (
    <div className="card" style={{ padding: '20px 22px', marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'", color: 'var(--text)' }}>
          <span style={{ color: 'var(--primary)' }}>{icon}</span>
          {title}
        </div>
        {onAdd && (
          <button onClick={onAdd} className="btn btn-ghost btn-sm" style={{ gap: 4, color: 'var(--primary)', fontWeight: 600 }}>
            <Plus size={14} /> {addLabel || 'Add'}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

/* ─── SETTINGS PANEL (unchanged) ─── */
function SettingsPanel() {
  const settings = [
    { icon: <User size={16} />, label: 'Account Settings' },
    { icon: <Bell size={16} />, label: 'Notifications' },
    { icon: <Globe size={16} />, label: 'Language & Region' },
    { icon: <Lock size={16} />, label: 'Privacy & Security' },
    { icon: <Clock size={16} />, label: 'Availability Settings' },
    { icon: <Smartphone size={16} />, label: 'Connected Accounts' },
  ];
  return (
    <div className="card" style={{ padding: '4px 0' }}>
      {settings.map(({ icon, label }) => (
        <button key={label} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.9375rem', color: 'var(--text)', transition: 'background var(--transition)' }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-alt)'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}
        >
          <span style={{ color: 'var(--text-muted)' }}>{icon}</span>
          {label}
          <ChevronRight size={14} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
        </button>
      ))}
      <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
      <button style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 18px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', fontSize: '0.9375rem', color: 'var(--error)', transition: 'background var(--transition)' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--error-light)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}
      >
        <LogOut size={16} /> Log Out
      </button>
    </div>
  );
}

/* ─── PRIVACY & ACCESS PANEL (NEW) ─── */
const categoryLabels: Record<AccessCategory, string> = {
  skills: 'Skills & Proficiency',
  projects: 'Projects & Work Samples',
  learningProgress: 'Learning Paths & Progress',
  certificates: 'Certificates & Credentials',
  achievements: 'Badges & Achievements',
  assessments: 'Assessment Scores',
  goals: 'Career Goals & Interests',
};

function PrivacyPanel() {
  const { user, accessRequests, approveAccessRequest, rejectAccessRequest, revokeAccess } = useApp();
  const [copied, setCopied] = useState(false);
  const [reviewingRequest, setReviewingRequest] = useState<AccessRequest | null>(null);
  const [permissions, setPermissions] = useState<Record<AccessCategory, boolean>>({
    skills: true,
    projects: true,
    learningProgress: true,
    certificates: true,
    achievements: true,
    assessments: false,
    goals: true,
  });
  const [durationHours, setDurationHours] = useState<number>(168);

  const herpathId = user?.herpathId || 'HP-7K29-X4M8';

  const handleCopyId = () => {
    navigator.clipboard.writeText(herpathId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openReviewModal = (req: AccessRequest) => {
    setReviewingRequest(req);
    setPermissions({
      skills: req.requestedCategories.includes('skills'),
      projects: req.requestedCategories.includes('projects'),
      learningProgress: req.requestedCategories.includes('learningProgress'),
      certificates: req.requestedCategories.includes('certificates'),
      achievements: req.requestedCategories.includes('achievements'),
      assessments: req.requestedCategories.includes('assessments'),
      goals: req.requestedCategories.includes('goals'),
    });
  };

  const handleApprove = () => {
    if (reviewingRequest) {
      approveAccessRequest(reviewingRequest.id, permissions, durationHours);
      setReviewingRequest(null);
    }
  };

  const pendingRequests = accessRequests.filter(r => r.status === 'PENDING');
  const activeAccesses = accessRequests.filter(r => r.status === 'APPROVED');
  const pastRequests = accessRequests.filter(r => r.status === 'REJECTED' || r.status === 'REVOKED' || r.status === 'EXPIRED');

  return (
    <div style={{ maxWidth: 880 }}>
      {/* HerPath ID hero card */}
      <div className="card" style={{ padding: '28px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', border: 'none', color: 'white', marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Shield size={20} color="var(--accent-mid)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Your Portable Skill Identity</span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 6, color: 'white' }}>{herpathId}</h2>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', maxWidth: 460 }}>
              Share this unique ID with trusted experts so they can request access to your learning journey. Experts cannot view your data until you grant permission.
            </p>
          </div>
          <button onClick={handleCopyId} className="btn" style={{ background: 'var(--accent)', color: 'var(--secondary)', fontWeight: 700, gap: 6 }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied ID!' : 'Copy HerPath ID'}
          </button>
        </div>
      </div>

      {/* Pending requests */}
      {pendingRequests.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: 12, fontFamily: "'Plus Jakarta Sans'", display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} color="var(--warning)" /> Pending Access Requests ({pendingRequests.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {pendingRequests.map(req => (
              <div key={req.id} className="card" style={{ padding: '20px', borderLeft: '4px solid var(--warning)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div className="avatar-placeholder avatar-lg" style={{ background: req.expertAvatarColor, color: 'white' }}>{req.expertInitials}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'" }}>{req.expertName}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{req.expertRole}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--primary)', marginTop: 4, fontWeight: 500 }}>
                        Purpose: &ldquo;{req.purpose}&rdquo;
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => rejectAccessRequest(req.id)} className="btn btn-secondary btn-sm" style={{ color: 'var(--error)' }}>
                      Decline
                    </button>
                    <button onClick={() => openReviewModal(req)} className="btn btn-primary btn-sm" style={{ gap: 6 }}>
                      <Lock size={14} /> Review & Approve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active grants */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: 14, fontFamily: "'Plus Jakarta Sans'", display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 size={18} color="var(--success)" /> Active Granted Accesses ({activeAccesses.length})
        </h3>

        {activeAccesses.length === 0 ? (
          <div className="card" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Lock size={28} color="var(--text-light)" style={{ marginBottom: 8 }} />
            <div style={{ fontWeight: 600 }}>No experts currently have access to your learning data.</div>
            <div style={{ fontSize: '0.8125rem', marginTop: 4 }}>When you approve an expert request, it will appear here with instant revoke control.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {activeAccesses.map(access => (
              <div key={access.id} className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div className="avatar-placeholder avatar-lg" style={{ background: access.expertAvatarColor, color: 'white' }}>{access.expertInitials}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'" }}>{access.expertName}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{access.expertRole}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle2 size={12} /> Active Access · Expires: {access.expiresAt ? new Date(access.expiresAt).toLocaleDateString() : '7 days'}
                      </div>
                    </div>
                  </div>
                  <button onClick={() => revokeAccess(access.id)} className="btn btn-secondary btn-sm" style={{ color: 'var(--error)', borderColor: '#FECACA' }}>
                    <Trash2 size={14} /> Revoke Access Immediately
                  </button>
                </div>
                <div style={{ padding: '12px 14px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8 }}>Permitted Information:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {Object.entries(access.grantedCategories || {}).map(([cat, isGranted]) => (
                      isGranted ? (
                        <span key={cat} className="badge badge-primary" style={{ fontSize: '0.75rem' }}>
                          ✓ {categoryLabels[cat as AccessCategory] || cat}
                        </span>
                      ) : null
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History */}
      {pastRequests.length > 0 && (
        <div>
          <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', marginBottom: 12, fontFamily: "'Plus Jakarta Sans'" }}>Access History</h3>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {pastRequests.map((past, idx) => (
              <div key={past.id} style={{ padding: '14px 20px', borderBottom: idx < pastRequests.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{past.expertName}</span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginLeft: 8 }}>({past.expertRole})</span>
                </div>
                <span className={`badge ${past.status === 'REVOKED' ? 'badge-error' : 'badge-neutral'}`} style={{ fontSize: '0.75rem' }}>{past.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Review modal */}
      {reviewingRequest && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setReviewingRequest(null)}>
          <div className="modal modal-lg">
            <div className="modal-header">
              <div>
                <h3 style={{ fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>Review Access Request</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Control exactly what information this expert can view.</p>
              </div>
              <button onClick={() => setReviewingRequest(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '16px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)', marginBottom: 20 }}>
              <div className="avatar-placeholder avatar-lg" style={{ background: reviewingRequest.expertAvatarColor, color: 'white' }}>{reviewingRequest.expertInitials}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{reviewingRequest.expertName}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{reviewingRequest.expertRole}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 600, marginTop: 2 }}>Purpose: {reviewingRequest.purpose}</div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: 12, fontFamily: "'Plus Jakarta Sans'" }}>Select Permitted Data Categories</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                {(Object.keys(categoryLabels) as AccessCategory[]).map(cat => {
                  const isChecked = permissions[cat];
                  return (
                    <div
                      key={cat}
                      onClick={() => setPermissions(p => ({ ...p, [cat]: !p[cat] }))}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 'var(--radius)',
                        border: `1.5px solid ${isChecked ? 'var(--primary)' : 'var(--border)'}`,
                        background: isChecked ? 'var(--accent-light)' : 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ fontSize: '0.875rem', fontWeight: isChecked ? 600 : 400, color: isChecked ? 'var(--primary)' : 'var(--text)' }}>
                        {categoryLabels[cat]}
                      </span>
                      <div style={{ width: 18, height: 18, borderRadius: '4px', background: isChecked ? 'var(--primary)' : 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 800 }}>
                        {isChecked ? '✓' : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: 8, fontFamily: "'Plus Jakarta Sans'" }}>Access Duration</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[
                  { hours: 1, label: '1 Hour' },
                  { hours: 24, label: '24 Hours' },
                  { hours: 168, label: '7 Days (Default)' },
                  { hours: 720, label: '30 Days' },
                  { hours: 8760, label: 'Until Revoked' },
                ].map(opt => (
                  <button
                    key={opt.hours}
                    onClick={() => setDurationHours(opt.hours)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius)',
                      border: `1.5px solid ${durationHours === opt.hours ? 'var(--primary)' : 'var(--border)'}`,
                      background: durationHours === opt.hours ? 'var(--primary)' : 'white',
                      color: durationHours === opt.hours ? 'white' : 'var(--text)',
                      fontWeight: durationHours === opt.hours ? 700 : 500,
                      fontSize: '0.8125rem',
                      cursor: 'pointer',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setReviewingRequest(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleApprove} className="btn btn-primary" style={{ gap: 6 }}>
                <Shield size={16} /> Grant & Approve Access
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── MAIN PROFILE PAGE ─── */
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showShareProfile, setShowShareProfile] = useState(false);
  const [showAddExp, setShowAddExp] = useState(false);
  const [showAddEdu, setShowAddEdu] = useState(false);
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 'exp0', title: 'Social Media Manager', company: 'Freelance', from: '2024-01', to: '', current: true, desc: 'Created social media campaigns and digital content for small businesses.' },
  ]);
  const [education, setEducation] = useState<Education[]>([
    { id: 'edu0', degree: 'Bachelor of Engineering', school: 'Mumbai University', field: 'Computer Engineering', from: '2020', to: '2024' },
  ]);
  const [editingSkills, setEditingSkills] = useState(false);
  const [userSkills, setUserSkills] = useState(currentUser.skills);
  const [availability, setAvailability] = useState(currentUser.availability);
  const [goals, setGoals] = useState(['Start an online business', 'Become a freelancer', 'Learn Generative AI']);

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>Profile</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Your skill identity.</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowShareProfile(true)} className="btn btn-secondary btn-sm" style={{ gap: 4 }}><Share2 size={13} /> Share</button>
          <button onClick={() => setShowEditProfile(true)} className="btn btn-primary btn-sm" style={{ gap: 4 }}><Edit3 size={13} /> Edit Profile</button>
        </div>
      </div>

      <div className="page-container">
        {/* Tabs — Privacy & Access added */}
        <div className="tabs" style={{ marginBottom: 24 }}>
          {[
            { id: 'profile', label: 'Profile' },
            { id: 'settings', label: 'Settings' },
            { id: 'privacy', label: 'Privacy & Access' },   // ← NEW
          ].map(tab => (
            <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
          ))}
        </div>

        {activeTab === 'settings' ? (
          <div style={{ maxWidth: 560 }}>
            <div style={{ marginBottom: 16 }}>
              <h2 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'", marginBottom: 4 }}>Settings</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Manage your account and preferences.</p>
            </div>
            <SettingsPanel />
          </div>
        ) : activeTab === 'privacy' ? (
          /* ─── NEW: Privacy & Access tab ─── */
          <PrivacyPanel />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>
            {/* Left — main profile */}
            <div>
              {/* Profile Header Card */}
              <div className="card" style={{ padding: '24px', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative' }}>
                    <div className="avatar-placeholder" style={{ width: 76, height: 76, background: currentUser.avatarColor, color: 'white', fontSize: '1.5rem', fontWeight: 800, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {currentUser.initials}
                    </div>
                    <button style={{ position: 'absolute', bottom: 0, right: 0, width: 24, height: 24, borderRadius: '50%', background: 'var(--primary)', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Edit3 size={11} color="white" />
                    </button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                      <h1 style={{ fontSize: '1.375rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>{currentUser.name}</h1>
                      <span className="badge badge-primary">Verified</span>
                    </div>
                    <div style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: 6 }}>Digital Creator &amp; Aspiring Entrepreneur</div>
                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} />{currentUser.location}, Maharashtra</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Globe size={12} />{currentUser.languages.join(' · ')}</span>
                    </div>
                  </div>
                  <button onClick={() => setShowEditProfile(true)} className="btn btn-secondary btn-sm" style={{ gap: 4 }}>
                    <Edit3 size={13} /> Edit
                  </button>
                </div>
              </div>

              {/* About */}
              <SectionCard title="About Me" icon={<User size={16} />}>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{currentUser.bio}</p>
              </SectionCard>

              {/* Skill Identity */}
              <SectionCard
                title="My Skill Identity"
                icon={<Target size={16} />}
                onAdd={() => setEditingSkills(!editingSkills)}
                addLabel="Edit"
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                  {[
                    { label: 'I Know', skills: userSkills, bg: 'var(--accent-light)', border: 'var(--accent-mid)', color: 'var(--primary)' },
                    { label: 'I Can Teach', skills: currentUser.canTeach, bg: '#F0FDF4', border: '#BBF7D0', color: '#059669' },
                    { label: 'I Want to Learn', skills: currentUser.wantToLearn, bg: '#EFF6FF', border: '#BFDBFE', color: '#2563EB' },
                  ].map(({ label, skills, bg, border, color }) => (
                    <div key={label}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8 }}>{label}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {skills.map(s => (
                          <div key={s} style={{ padding: '6px 10px', borderRadius: 'var(--radius-sm)', background: bg, border: `1px solid ${border}`, fontSize: '0.8125rem', fontWeight: 600, color }}>{s}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Neo4j Knowledge Graph */}
              <SectionCard title="My Knowledge Graph" icon={<Target size={16} />}>
                <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden' }}>
                  <KnowledgeGraphViewer />
                </div>
              </SectionCard>

              {/* Experience */}
              <SectionCard title="Experience" icon={<Briefcase size={16} />} onAdd={() => setShowAddExp(true)} addLabel="Add">
                {experiences.map((exp, i) => (
                  <div key={exp.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: i < experiences.length - 1 ? 16 : 0, marginBottom: i < experiences.length - 1 ? 16 : 0, borderBottom: i < experiences.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius)', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Briefcase size={18} color="var(--text-muted)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{exp.title}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 4 }}>{exp.company} · {exp.from ? exp.from.replace('-', ' ') : ''} — {exp.current ? 'Present' : exp.to}</div>
                      {exp.desc && <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{exp.desc}</p>}
                    </div>
                  </div>
                ))}
                {experiences.length === 0 && (
                  <div className="empty-state" style={{ padding: '24px 16px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>No experience added yet. Add your first role.</p>
                  </div>
                )}
              </SectionCard>

              {/* Education */}
              <SectionCard title="Education" icon={<BookOpen size={16} />} onAdd={() => setShowAddEdu(true)} addLabel="Add">
                {education.map((edu, i) => (
                  <div key={edu.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingBottom: i < education.length - 1 ? 16 : 0, marginBottom: i < education.length - 1 ? 16 : 0, borderBottom: i < education.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 'var(--radius)', background: 'var(--bg-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <BookOpen size={18} color="var(--text-muted)" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{edu.degree}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{edu.field && `${edu.field} · `}{edu.school}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{edu.from} — {edu.to}</div>
                    </div>
                  </div>
                ))}
              </SectionCard>

              {/* Languages */}
              <SectionCard title="Languages" icon={<Globe size={16} />}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { lang: 'Hindi', level: 'Fluent' },
                    { lang: 'English', level: 'Fluent' },
                    { lang: 'Marathi', level: 'Native' },
                  ].map(({ lang, level }) => (
                    <div key={lang} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{lang}</span>
                      <span className="badge badge-neutral">{level}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>

              {/* Teaching */}
              <SectionCard title="Teaching" icon={<Award size={16} />}>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 8 }}>Topics I teach:</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {currentUser.canTeach.map(s => (
                      <span key={s} className="chip skill"><CheckCircle2 size={12} /> {s}</span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Mode</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Online · In-person</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Available</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Weekends · Evenings</div>
                  </div>
                </div>
                <Link href="/opportunities?tab=mentor" className="btn btn-secondary btn-sm" style={{ gap: 5 }}>
                  <TrendingUp size={13} /> Manage Teaching Profile
                </Link>
              </SectionCard>
            </div>

            {/* Right sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Profile strength */}
              <div className="card" style={{ padding: '18px 20px' }}>
                <div style={{ fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <TrendingUp size={16} color="var(--primary)" /> Profile Strength
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', fontFamily: "'Plus Jakarta Sans'" }}>85%</div>
                  <div>
                    <div className="progress-bar" style={{ width: 120 }}>
                      <div className="progress-fill" style={{ width: '85%' }} />
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>Strong</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 8 }}>To reach 100%:</div>
                  {['Add one more certificate'].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: 4 }}>
                      <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--warning)', flexShrink: 0 }} /> {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Goals */}
              <div className="card" style={{ padding: '18px 20px' }}>
                <div style={{ fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Target size={16} color="var(--primary)" /> My Goals
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {goals.map((g, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem' }}>
                      <span style={{ fontSize: '1rem' }}>🎯</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{g}</span>
                    </div>
                  ))}
                </div>
                <button style={{ marginTop: 12, background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}>
                  + Edit Goals
                </button>
              </div>

              {/* Availability */}
              <div className="card" style={{ padding: '18px 20px' }}>
                <div style={{ fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Clock size={16} color="var(--primary)" /> Availability
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                  {availability.map(a => <span key={a} className="chip selected" style={{ fontSize: '0.8125rem' }}>{a}</span>)}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Mode: Online · In-person</div>
              </div>

              {/* Quick links */}
              <div className="card" style={{ padding: '4px 0' }}>
                {[
                  { label: 'My Portfolio', href: '/portfolio', icon: <TrendingUp size={14} /> },
                  { label: 'Opportunities', href: '/opportunities', icon: <Briefcase size={14} /> },
                  { label: 'Find Mentors', href: '/discover', icon: <User size={14} /> },
                ].map(({ label, href, icon }) => (
                  <Link key={label} href={href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', color: 'var(--text)', fontSize: '0.875rem', fontWeight: 500, transition: 'background var(--transition)' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg-alt)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}
                  >
                    <span style={{ color: 'var(--primary)' }}>{icon}</span>
                    {label}
                    <ChevronRight size={13} color="var(--text-muted)" style={{ marginLeft: 'auto' }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showEditProfile && <EditProfileModal onClose={() => setShowEditProfile(false)} />}
      {showShareProfile && <ShareProfileModal onClose={() => setShowShareProfile(false)} />}
      {showAddExp && <AddExperienceModal onClose={() => setShowAddExp(false)} onAdd={exp => setExperiences(prev => [...prev, exp])} />}
      {showAddEdu && <AddEducationModal onClose={() => setShowAddEdu(false)} onAdd={edu => setEducation(prev => [...prev, edu])} />}
    </AppLayout>
  );
}