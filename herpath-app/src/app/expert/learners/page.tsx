'use client';
import React from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/AppLayout';
import { useApp } from '@/lib/AppContext';
import { Users, Sparkles, CheckCircle2, Clock, Search, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ExpertLearnersListPage() {
  const { accessRequests } = useApp();

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <h1 style={{ fontSize: '1.125rem', fontWeight: 700 }}>My Learners</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Authorized learners who have granted permission to view their identity graph.</p>
        </div>
      </div>

      <div className="page-container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>
            Authorized Learner Connections
          </h2>
          <Link href="/expert/lookup" className="btn btn-primary btn-sm" style={{ gap: 6 }}>
            <Search size={14} /> Look Up New Learner ID
          </Link>
        </div>

        {accessRequests.length === 0 ? (
          <div className="card" style={{ padding: '48px', textAlign: 'center' }}>
            <Users size={36} color="var(--text-light)" style={{ marginBottom: 12 }} />
            <h3 style={{ fontWeight: 700 }}>No Learner Connections Yet</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: 400, margin: '8px auto 20px' }}>
              Enter a learner&apos;s HerPath ID to request permission and access their knowledge graph.
            </p>
            <Link href="/expert/lookup" className="btn btn-primary">Look Up HerPath ID</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {accessRequests.map(req => {
              const isApproved = req.status === 'APPROVED';
              const isPending = req.status === 'PENDING';

              return (
                <div key={req.id} className="card card-hover" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div className="avatar-placeholder avatar-xl" style={{ background: '#0F766E', color: 'white' }}>RS</div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                          <span style={{ fontWeight: 800, fontSize: '1.125rem', fontFamily: "'Plus Jakarta Sans'" }}>{req.learnerName}</span>
                          <span className="badge badge-primary" style={{ fontFamily: 'monospace', fontWeight: 700 }}>{req.learnerHerPathId}</span>
                        </div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                          Digital Creator & Entrepreneur · Purpose: &ldquo;{req.purpose}&rdquo;
                        </div>
                        <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                          {isApproved ? (
                            <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <CheckCircle2 size={12} /> Active Access Granted
                            </span>
                          ) : isPending ? (
                            <span className="badge badge-warning" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <Clock size={12} /> Pending Approval
                            </span>
                          ) : (
                            <span className="badge badge-error">{req.status}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      {isApproved ? (
                        <Link href={`/expert/learners/${req.learnerHerPathId}`} className="btn btn-primary" style={{ gap: 6 }}>
                          <Sparkles size={15} /> View Knowledge Graph
                        </Link>
                      ) : (
                        <Link href="/expert/lookup" className="btn btn-secondary btn-sm">
                          Check Request Status
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
