'use client';
import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { currentUser, skillExchanges } from '@/data/mockData';
import { ArrowLeft, ArrowRight, CheckCircle2, X, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function SkillExchangePage() {
  const [initiated, setInitiated] = useState<string | null>(null);

  return (
    <AppLayout>
      <div className="topbar">
        <Link href="/discover" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Discover
        </Link>
      </div>

      <div className="page-container" style={{ maxWidth: 760 }}>
        {/* Hero */}
        <div className="card" style={{ padding: '28px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', border: 'none', color: 'white', marginBottom: 28, textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 12 }}>
            <Sparkles size={20} color="var(--accent-mid)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>Skill Exchange</span>
          </div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 10 }}>
            Learn from someone.<br />Teach someone.<br />Grow together.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.9375rem', maxWidth: 480, margin: '0 auto' }}>
            Match with someone who teaches what you want to learn, and wants to learn what you can teach.
          </p>
        </div>

        {/* Your Exchange Profile */}
        <div className="card" style={{ padding: '22px', marginBottom: 24 }}>
          <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 16 }}>Your Exchange Profile</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>
            <div style={{ padding: '16px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', border: '1px solid var(--accent-mid)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 8 }}>Can Teach</div>
              {currentUser.canTeach.map(s => (
                <div key={s} style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9375rem', marginBottom: 4 }}>{s}</div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <ArrowRight size={18} color="var(--text-muted)" />
              <Users size={16} color="var(--primary)" />
              <ArrowLeft size={18} color="var(--text-muted)" />
            </div>
            <div style={{ padding: '16px', background: '#EFF6FF', borderRadius: 'var(--radius)', border: '1px solid #BFDBFE', textAlign: 'center' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 8 }}>Want to Learn</div>
              {currentUser.wantToLearn.map(s => (
                <div key={s} style={{ fontWeight: 700, color: '#2563EB', fontSize: '0.9375rem', marginBottom: 4 }}>{s}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Matches */}
        <div style={{ fontWeight: 700, fontSize: '1.0625rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Sparkles size={16} color="var(--primary)" /> Compatible Matches Found
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {skillExchanges.map(exchange => (
            <div key={exchange.id} className="card card-hover" style={{ padding: '22px' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="avatar-placeholder avatar-lg" style={{ background: exchange.user.avatarColor, color: 'white' }}>{exchange.user.initials}</div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'" }}>{exchange.user.name}</span>
                    <div className="match-score">{exchange.matchScore}%</div>
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 10 }}>{exchange.user.role} · {exchange.user.location}</div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 12, alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ padding: '10px 12px', background: '#F0FDF4', borderRadius: 'var(--radius)', border: '1px solid #BBF7D0' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 3 }}>Can teach you:</div>
                      <div style={{ fontWeight: 700, color: '#059669', fontSize: '0.875rem' }}>{exchange.offersSkill}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
                      <ArrowRight size={14} color="var(--text-muted)" />
                      <div style={{ width: 1, height: 12, background: 'var(--border)' }} />
                      <ArrowLeft size={14} color="var(--text-muted)" />
                    </div>
                    <div style={{ padding: '10px 12px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', border: '1px solid var(--accent-mid)' }}>
                      <div style={{ fontSize: '0.75px', color: 'var(--text-muted)', marginBottom: 3, fontSize: '0.75rem' }}>Wants to learn:</div>
                      <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.875rem' }}>{exchange.wantsSkill}</div>
                    </div>
                  </div>

                  {exchange.note && (
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 12 }}>&ldquo;{exchange.note}&rdquo;</p>
                  )}

                  <div style={{ display: 'flex', gap: 8 }}>
                    {initiated === exchange.id ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--success)', fontWeight: 600, fontSize: '0.875rem', padding: '8px 16px', background: 'var(--success-light)', borderRadius: 'var(--radius)' }}>
                        <CheckCircle2 size={15} /> Exchange Request Sent!
                      </div>
                    ) : (
                      <button
                        onClick={() => setInitiated(exchange.id)}
                        className="btn btn-primary"
                        style={{ gap: 5 }}
                      >
                        <Users size={15} /> Start Skill Exchange
                      </button>
                    )}
                    <button className="btn btn-secondary btn-sm">View Profile</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
