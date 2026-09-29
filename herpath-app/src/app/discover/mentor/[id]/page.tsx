'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { mentors, currentUser } from '@/data/mockData';
import { calculateMatchReasons } from '@/services/aiService';
import { ArrowLeft, MapPin, Globe, Star, CheckCircle2, Sparkles, X, Clock, Users, Award, BookOpen } from 'lucide-react';

export default function MentorProfilePage() {
  const params = useParams();
  const mentor = mentors.find(m => m.id === params.id) || mentors[0];
  const [activeTab, setActiveTab] = useState('about');
  const [showWhy, setShowWhy] = useState(false);
  const reasons = calculateMatchReasons(currentUser.wantToLearn, mentor.skills, currentUser.location, mentor.location, currentUser.languages, mentor.languages);

  const reviews = [
    { name: 'Divya Nair', rating: 5, text: 'Amazing mentor! Explained everything so clearly in Hindi.', date: '2 weeks ago' },
    { name: 'Meera Joshi', rating: 5, text: 'Priya helped me create my first Canva portfolio. Highly recommended!', date: '1 month ago' },
    { name: 'Ananya Singh', rating: 4, text: 'Very patient and knowledgeable. Will book again!', date: '1 month ago' },
  ];

  return (
    <AppLayout>
      <div className="topbar">
        <Link href="/discover" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: 500 }}>
          <ArrowLeft size={16} /> Back to Discover
        </Link>
      </div>

      <div className="page-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
          <div>
            {/* Hero */}
            <div className="card" style={{ padding: '28px', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                <div className="avatar-placeholder" style={{ width: 80, height: 80, background: mentor.avatarColor, color: 'white', fontSize: '1.5rem', fontWeight: 800, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {mentor.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'" }}>{mentor.name}</h1>
                    {mentor.isVerified && <span className="badge badge-primary">Verified ✓</span>}
                  </div>
                  <div style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{mentor.role}</div>
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 10 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={13} />{mentor.location}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Globe size={13} />{mentor.languages.join(' · ')}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={13} />{mentor.experience} experience</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F59E0B' }}>
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill={i <= Math.floor(mentor.rating || 4.8) ? 'currentColor' : 'none'} />)}
                      <span style={{ fontWeight: 700, color: 'var(--text)', marginLeft: 2 }}>{mentor.rating}</span>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{mentor.reviewCount} reviews</span>
                    <div className="match-score">{mentor.matchScore}% Match</div>
                  </div>
                </div>
              </div>

              <button onClick={() => setShowWhy(!showWhy)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', padding: '10px 0 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Sparkles size={13} /> Why is this a {mentor.matchScore}% match?
              </button>

              {showWhy && (
                <div style={{ marginTop: 12, padding: '14px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', border: '1px solid var(--accent-mid)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 10, fontSize: '0.875rem' }}>Match Reasons</div>
                  {reasons.map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: '0.875rem' }}>
                      {r.match ? <CheckCircle2 size={14} color="var(--success)" /> : <X size={14} color="var(--error)" />}
                      <span style={{ color: r.match ? 'var(--text)' : 'var(--text-muted)', fontWeight: r.match ? 500 : 400 }}>{r.factor}: {r.detail}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 8, fontSize: '0.75rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Sparkles size={11} /> Powered by HerPath Knowledge Graph
                  </div>
                </div>
              )}
            </div>

            {/* Tabs */}
            <div className="tabs" style={{ marginBottom: 20 }}>
              {['about', 'skills', 'reviews', 'availability'].map(tab => (
                <button key={tab} className={`tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)} style={{ textTransform: 'capitalize' }}>{tab}</button>
              ))}
            </div>

            {activeTab === 'about' && (
              <div className="card" style={{ padding: '22px' }}>
                <h3 style={{ fontWeight: 700, marginBottom: 12 }}>About</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{mentor.bio}</p>
                <h3 style={{ fontWeight: 700, margin: '20px 0 12px' }}>Can Teach</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {mentor.canTeach.map(s => <span key={s} className="chip skill"><CheckCircle2 size={12} /> {s}</span>)}
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="card" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {mentor.skills.map(s => <span key={s} className="chip skill">{s}</span>)}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {reviews.map((r, i) => (
                  <div key={i} className="card" style={{ padding: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                      <div style={{ fontWeight: 600 }}>{r.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 2, color: '#F59E0B' }}>
                        {[...Array(r.rating)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginLeft: 4 }}>{r.date}</span>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'availability' && (
              <div className="card" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                  {mentor.availability.map(a => <span key={a} className="chip selected">{a}</span>)}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Available for online sessions. Response within 24 hours.</p>
              </div>
            )}
          </div>

          {/* Sticky booking sidebar */}
          <div className="card" style={{ padding: '22px', position: 'sticky', top: '80px' }}>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 2 }}>Session Rate</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', fontFamily: "'Plus Jakarta Sans'" }}>₹{mentor.sessionRate}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>per session</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {[
                { icon: <Clock size={14} />, label: '30 or 60 min sessions' },
                { icon: <Globe size={14} />, label: 'Online · Hindi, English' },
                { icon: <CheckCircle2 size={14} />, label: 'Usually responds in 24h' },
              ].map(({ icon, label }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--primary)' }}>{icon}</span> {label}
                </div>
              ))}
            </div>

            <Link href={`/discover/mentor/${mentor.id}/book`} className="btn btn-primary btn-lg w-full" style={{ justifyContent: 'center', marginBottom: 10 }}>
              Book a Session
            </Link>
            <button className="btn btn-secondary w-full" style={{ justifyContent: 'center' }}>Message</button>

            <div style={{ marginTop: 14, padding: '12px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8125rem', color: 'var(--primary)' }}>
              <Award size={14} /> Verified mentor · 100% satisfaction
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
