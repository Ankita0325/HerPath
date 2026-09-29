'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { useApp } from '@/lib/AppContext';
import { currentUser, AccessCategory } from '@/data/mockData';
import { Search, Shield, Lock, CheckCircle2, AlertCircle, Sparkles, Send, X, ArrowRight, UserCheck } from 'lucide-react';
import Link from 'next/link';

function LookupContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const { sendAccessRequest, accessRequests } = useApp();
  const [herpathId, setHerpathId] = useState(initialId || 'HP-7K29-X4M8');
  const [searched, setSearched] = useState(false);
  const [foundLearner, setFoundLearner] = useState<typeof currentUser | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Access Request Form State
  const [requestedCategories, setRequestedCategories] = useState<AccessCategory[]>([
    'skills', 'projects', 'learningProgress', 'certificates', 'achievements', 'goals'
  ]);
  const [purpose, setPurpose] = useState('Mentorship & Skill Pathway Guidance');
  const [requestSentStatus, setRequestSentStatus] = useState<string | null>(null);

  const categoryLabels: Record<AccessCategory, string> = {
    skills: 'Skills & Proficiency',
    projects: 'Projects & Work Samples',
    learningProgress: 'Learning Paths & Progress',
    certificates: 'Certificates & Credentials',
    achievements: 'Badges & Achievements',
    assessments: 'Assessment Scores',
    goals: 'Career Goals & Interests',
  };

  const performLookup = (idToSearch: string) => {
    setErrorMsg('');
    setRequestSentStatus(null);
    setSearched(true);

    const clean = idToSearch.trim().toUpperCase();
    if (clean === 'HP-7K29-X4M8' || clean === currentUser.herpathId?.toUpperCase()) {
      setFoundLearner(currentUser);
    } else {
      setFoundLearner(null);
      setErrorMsg('Learner not found. Please check the HerPath ID (e.g. HP-7K29-X4M8) and try again.');
    }
  };

  useEffect(() => {
    if (initialId) {
      performLookup(initialId);
    }
  }, [initialId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (herpathId) {
      performLookup(herpathId);
    }
  };

  const toggleCategory = (cat: AccessCategory) => {
    if (requestedCategories.includes(cat)) {
      setRequestedCategories(requestedCategories.filter(c => c !== cat));
    } else {
      setRequestedCategories([...requestedCategories, cat]);
    }
  };

  const handleSendRequest = () => {
    const res = sendAccessRequest(herpathId, requestedCategories, purpose);
    if (res.success) {
      setRequestSentStatus(res.message);
      setShowRequestModal(false);
    } else {
      alert(res.message);
    }
  };

  const existingRequest = accessRequests.find(
    r => r.learnerHerPathId.toUpperCase() === herpathId.trim().toUpperCase()
  );

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <h1 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Look Up Learner Identity</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Find a learner using their unique HerPath ID and request consent-based access.</p>
        </div>
      </div>

      <div className="page-container" style={{ maxWidth: 760 }}>
        {/* LOOKUP CARD */}
        <div className="card" style={{ padding: '28px', marginBottom: 28 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 6 }}>
            Enter Learner HerPath ID
          </h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 20 }}>
            A learner&apos;s HerPath ID (format: <strong>HP-XXXX-XXXX</strong>) helps you find their skill identity. The learner must approve your request before you can view protected history.
          </p>

          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 10 }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
              <input
                type="text"
                value={herpathId}
                onChange={e => setHerpathId(e.target.value)}
                placeholder="e.g. HP-7K29-X4M8"
                className="form-input"
                style={{ paddingLeft: 40, fontWeight: 700, fontFamily: 'monospace', fontSize: '1rem' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '11px 24px' }}>
              Validate & Search
            </button>
          </form>
        </div>

        {/* ERROR / NOT FOUND */}
        {searched && errorMsg && (
          <div className="card" style={{ padding: '24px', borderLeft: '4px solid var(--error)', background: '#FEF2F2', marginBottom: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--error)', fontWeight: 700, marginBottom: 4 }}>
              <AlertCircle size={20} /> Learner Not Found
            </div>
            <p style={{ fontSize: '0.875rem', color: '#991B1B' }}>{errorMsg}</p>
            <div style={{ marginTop: 12, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
              Tip: Use demo ID <strong>HP-7K29-X4M8</strong> (Riya Sharma).
            </div>
          </div>
        )}

        {/* SUCCESSFUL LOOKUP PREVIEW */}
        {searched && foundLearner && (
          <div style={{ marginBottom: 28 }}>
            <div className="card" style={{ padding: '24px', border: '1.5px solid var(--primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span className="badge badge-success"><CheckCircle2 size={12} style={{ marginRight: 4 }} /> Valid Learner Found</span>
                <span className="badge badge-neutral" style={{ fontFamily: 'monospace', fontWeight: 700 }}>{foundLearner.herpathId}</span>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
                <div className="avatar-placeholder avatar-xl" style={{ background: foundLearner.avatarColor, color: 'white' }}>
                  {foundLearner.initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 2 }}>{foundLearner.name}</h3>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 6 }}>{foundLearner.role} · {foundLearner.location}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {foundLearner.skills.slice(0, 3).map(s => (
                      <span key={s} className="chip skill" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status / Actions */}
              {existingRequest?.status === 'APPROVED' ? (
                <div style={{ padding: '16px', background: 'var(--success-light)', borderRadius: 'var(--radius)', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--success)' }}>Access Approved!</div>
                    <div style={{ fontSize: '0.8125rem', color: '#065F46' }}>You already have active consent to view Riya&apos;s Knowledge Graph.</div>
                  </div>
                  <Link href={`/expert/learners/${foundLearner.herpathId}`} className="btn btn-primary btn-sm" style={{ gap: 6 }}>
                    <Sparkles size={14} /> Open Identity Graph
                  </Link>
                </div>
              ) : existingRequest?.status === 'PENDING' ? (
                <div style={{ padding: '16px', background: 'var(--warning-light)', borderRadius: 'var(--radius)', border: '1px solid #FDE68A' }}>
                  <div style={{ fontWeight: 700, color: 'var(--warning)' }}>Access Request Pending</div>
                  <div style={{ fontSize: '0.8125rem', color: '#92400E' }}>Waiting for {foundLearner.name} to approve your request in her privacy settings.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                    Protected learning history requires explicit learner consent.
                  </div>
                  <button onClick={() => setShowRequestModal(true)} className="btn btn-primary" style={{ gap: 6 }}>
                    <Lock size={15} /> Request Access
                  </button>
                </div>
              )}

              {requestSentStatus && (
                <div style={{ marginTop: 14, padding: '12px 14px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', color: 'var(--primary)', fontWeight: 600, fontSize: '0.875rem' }}>
                  ✓ {requestSentStatus}
                </div>
              )}
            </div>
          </div>
        )}

        {/* REQUEST ACCESS MODAL */}
        {showRequestModal && foundLearner && (
          <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowRequestModal(false)}>
            <div className="modal modal-lg">
              <div className="modal-header">
                <div>
                  <h3 style={{ fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>Request Learner Access</h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Requesting authorization for {foundLearner.name} ({foundLearner.herpathId}).</p>
                </div>
                <button onClick={() => setShowRequestModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Mentorship Purpose</label>
                <input
                  type="text"
                  value={purpose}
                  onChange={e => setPurpose(e.target.value)}
                  className="form-input"
                  placeholder="e.g. Guidance on Digital Marketing and Portfolio..."
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9375rem', marginBottom: 10, fontFamily: "'Plus Jakarta Sans'" }}>Requested Data Categories</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {(Object.keys(categoryLabels) as AccessCategory[]).map(cat => {
                    const isSelected = requestedCategories.includes(cat);
                    return (
                      <div
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: 'var(--radius)',
                          border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border)'}`,
                          background: isSelected ? 'var(--accent-light)' : 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ fontSize: '0.875rem', fontWeight: isSelected ? 600 : 400, color: isSelected ? 'var(--primary)' : 'var(--text)' }}>
                          {categoryLabels[cat]}
                        </span>
                        <div style={{
                          width: 18, height: 18, borderRadius: '4px',
                          background: isSelected ? 'var(--primary)' : 'var(--bg-alt)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontSize: '0.75rem', fontWeight: 800,
                        }}>
                          {isSelected ? '✓' : ''}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button onClick={() => setShowRequestModal(false)} className="btn btn-secondary">Cancel</button>
                <button onClick={handleSendRequest} className="btn btn-primary" style={{ gap: 6 }}>
                  <Send size={15} /> Send Access Request
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default function ExpertLookupPage() {
  return (
    <Suspense fallback={<div>Loading learner lookup...</div>}>
      <LookupContent />
    </Suspense>
  );
}
