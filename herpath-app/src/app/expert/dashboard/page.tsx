'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { useApp } from '@/lib/AppContext';
import { Search, Shield, Users, ArrowRight, CheckCircle2, Clock, Sparkles, Award } from 'lucide-react';

export default function ExpertDashboardPage() {
  const { user, accessRequests } = useApp();
  const [herpathIdInput, setHerpathIdInput] = useState('');
  const router = useRouter();

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (herpathIdInput.trim()) {
      router.push(`/expert/lookup?id=${encodeURIComponent(herpathIdInput.trim())}`);
    }
  };

  const activeLearners = accessRequests.filter(r => r.status === 'APPROVED');
  const pendingRequests = accessRequests.filter(r => r.status === 'PENDING');

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <h1 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Expert Dashboard</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Welcome back, {user?.name || 'Expert'}. Guide learners with consent-based identity graphs.</p>
        </div>
      </div>

      <div className="page-container">
        {/* LOOKUP HERO BANNER */}
        <div className="card" style={{ padding: '32px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', border: 'none', color: 'white', marginBottom: 28 }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <Sparkles size={18} color="var(--accent-mid)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
                Learner Identity Lookup
              </span>
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 12, color: 'white' }}>
              Explore a Learner&apos;s Skill Identity
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.85)', marginBottom: 20, lineHeight: 1.6 }}>
              Enter a learner&apos;s unique HerPath ID (e.g. <strong>HP-7K29-X4M8</strong>) to request access to their permitted learning history and Knowledge Graph.
            </p>

            <form onSubmit={handleLookup} style={{ display: 'flex', gap: 10, maxWidth: 500 }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search size={18} style={{ position: 'absolute', left: 14, top: 13, color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  value={herpathIdInput}
                  onChange={e => setHerpathIdInput(e.target.value)}
                  placeholder="Enter HerPath ID (e.g. HP-7K29-X4M8)..."
                  style={{
                    width: '100%',
                    padding: '11px 14px 11px 40px',
                    borderRadius: 'var(--radius)',
                    border: 'none',
                    fontSize: '0.9375rem',
                    fontWeight: 600,
                    color: 'var(--text)',
                    outline: 'none',
                  }}
                />
              </div>
              <button type="submit" className="btn" style={{ background: 'var(--accent)', color: 'var(--secondary)', fontWeight: 700, padding: '11px 20px' }}>
                Look Up
              </button>
            </form>
          </div>
        </div>

        {/* METRICS ROW */}
        <div className="grid-3" style={{ marginBottom: 28 }}>
          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Active Approved Learners</span>
              <Users size={18} color="var(--primary)" />
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--primary)', fontFamily: "'Plus Jakarta Sans'" }}>{activeLearners.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>Full access to permitted knowledge graphs</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Pending Access Requests</span>
              <Clock size={18} color="var(--warning)" />
            </div>
            <div style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--warning)', fontFamily: "'Plus Jakarta Sans'" }}>{pendingRequests.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>Awaiting learner approval</div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)' }}>Expert Identity</span>
              <Shield size={18} color="var(--success)" />
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)', fontFamily: "'Plus Jakarta Sans'" }}>Verified Expert</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: 4, fontWeight: 600 }}>✓ Consent-based authorization enabled</div>
          </div>
        </div>

        {/* ACTIVE LEARNERS LIST */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <h3 style={{ fontWeight: 800, fontSize: '1.125rem', fontFamily: "'Plus Jakarta Sans'" }}>Your Approved Learners</h3>
            <Link href="/expert/learners" className="btn btn-secondary btn-sm" style={{ gap: 4 }}>
              View All Learners <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {activeLearners.map(learner => (
              <div key={learner.id} className="card card-hover" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div className="avatar-placeholder avatar-lg" style={{ background: '#0F766E', color: 'white' }}>RS</div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 800, fontSize: '1.0625rem', fontFamily: "'Plus Jakarta Sans'" }}>{learner.learnerName}</span>
                        <span className="badge badge-primary">{learner.learnerHerPathId}</span>
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 2 }}>
                        Digital Creator & Entrepreneur · Purpose: {learner.purpose}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle2 size={12} /> Active Access Granted
                      </div>
                    </div>
                  </div>

                  <Link href={`/expert/learners/${learner.learnerHerPathId}`} className="btn btn-primary btn-sm" style={{ gap: 6 }}>
                    <Sparkles size={14} /> View Knowledge Graph & Journey
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
