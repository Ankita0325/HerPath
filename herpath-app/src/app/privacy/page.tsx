'use client';
import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { useApp } from '@/lib/AppContext';
import { AccessRequest, AccessCategory } from '@/data/mockData';
import { Shield, Copy, Check, Clock, Eye, Lock, Sparkles, X, CheckCircle2, AlertTriangle, Trash2, Key } from 'lucide-react';

export default function LearnerPrivacyPage() {
  const { user, accessRequests, approveAccessRequest, rejectAccessRequest, revokeAccess } = useApp();
  const [copied, setCopied] = useState(false);
  const [reviewingRequest, setReviewingRequest] = useState<AccessRequest | null>(null);

  // Modal permission states
  const [permissions, setPermissions] = useState<Record<AccessCategory, boolean>>({
    skills: true,
    projects: true,
    learningProgress: true,
    certificates: true,
    achievements: true,
    assessments: false,
    goals: true,
  });
  const [durationHours, setDurationHours] = useState<number>(168); // 7 days

  const herpathId = user?.herpathId || 'HP-7K29-X4M8';

  const handleCopyId = () => {
    navigator.clipboard.writeText(herpathId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openReviewModal = (req: AccessRequest) => {
    setReviewingRequest(req);
    const initialPerms: Record<AccessCategory, boolean> = {
      skills: req.requestedCategories.includes('skills'),
      projects: req.requestedCategories.includes('projects'),
      learningProgress: req.requestedCategories.includes('learningProgress'),
      certificates: req.requestedCategories.includes('certificates'),
      achievements: req.requestedCategories.includes('achievements'),
      assessments: req.requestedCategories.includes('assessments'),
      goals: req.requestedCategories.includes('goals'),
    };
    setPermissions(initialPerms);
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

  const categoryLabels: Record<AccessCategory, string> = {
    skills: 'Skills & Proficiency',
    projects: 'Projects & Work Samples',
    learningProgress: 'Learning Paths & Progress',
    certificates: 'Certificates & Credentials',
    achievements: 'Badges & Achievements',
    assessments: 'Assessment Scores',
    goals: 'Career Goals & Interests',
  };

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <h1 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Privacy & Access Control</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Manage your portable HerPath ID and expert consent permissions.</p>
        </div>
      </div>

      <div className="page-container" style={{ maxWidth: 880 }}>
        {/* HERPATH ID HERO CARD */}
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

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleCopyId} className="btn" style={{ background: 'var(--accent)', color: 'var(--secondary)', fontWeight: 700, gap: 6 }}>
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? 'Copied ID!' : 'Copy HerPath ID'}
              </button>
            </div>
          </div>
        </div>

        {/* PENDING REQUESTS NOTIFICATION BANNER */}
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

        {/* ACTIVE EXPERT ACCESSES */}
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

                  {/* Permitted categories chips */}
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

        {/* HISTORICAL LOG */}
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
                  <span className={`badge ${past.status === 'REVOKED' ? 'badge-error' : 'badge-neutral'}`} style={{ fontSize: '0.75rem' }}>
                    {past.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* REVIEW & APPROVE REQUEST MODAL */}
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

            {/* Expert Info */}
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '16px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)', marginBottom: 20 }}>
              <div className="avatar-placeholder avatar-lg" style={{ background: reviewingRequest.expertAvatarColor, color: 'white' }}>{reviewingRequest.expertInitials}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem' }}>{reviewingRequest.expertName}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{reviewingRequest.expertRole}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--primary)', fontWeight: 600, marginTop: 2 }}>
                  Purpose: {reviewingRequest.purpose}
                </div>
              </div>
            </div>

            {/* Category Permissions Toggles */}
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
                      <div style={{
                        width: 18, height: 18, borderRadius: '4px',
                        background: isChecked ? 'var(--primary)' : 'var(--bg-alt)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '0.75rem', fontWeight: 800,
                      }}>
                        {isChecked ? '✓' : ''}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Access Duration Selection */}
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

            {/* Actions */}
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setReviewingRequest(null)} className="btn btn-secondary">Cancel</button>
              <button onClick={handleApprove} className="btn btn-primary" style={{ gap: 6 }}>
                <Shield size={16} /> Grant & Approve Access
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
