'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/AppLayout';
import { allUsers, contentItems, skills, mentors, currentUser, User } from '@/data/mockData';
import { calculateMatchReasons } from '@/services/aiService';
import {
  Search, MapPin, Globe, Star, Sparkles, X, CheckCircle2, ArrowRight,
  Users, BookOpen, Play, FileText, Clock, Eye, TrendingUp,
} from 'lucide-react';

/* ─── KNOWLEDGE GRAPH MODAL ─── */
function KnowledgeGraphModal({ user, onClose }: { user: User; onClose: () => void }) {
  const reasons = calculateMatchReasons(
    currentUser.wantToLearn,
    user.skills,
    currentUser.location,
    user.location,
    currentUser.languages,
    user.languages,
  );

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Why we recommend {user.name.split(' ')[0]}?</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>

        {/* Visual graph */}
        <div style={{ padding: '20px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)', marginBottom: 20, fontFamily: 'monospace', fontSize: '0.8125rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', background: 'var(--accent-light)', borderRadius: 'var(--radius-full)', fontWeight: 700, color: 'var(--primary)', fontFamily: "'Inter'" }}>YOU</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginBottom: 4, flexWrap: 'wrap' }}>
            {reasons.slice(0, 3).map((r, i) => (
              <div key={i} style={{ textAlign: 'center', fontSize: '0.75rem', color: r.match ? 'var(--primary)' : 'var(--text-muted)' }}>
                <div>{r.factor}</div>
                <div>↓</div>
                <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{r.detail}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-block', padding: '6px 14px', background: user.avatarColor + '22', borderRadius: 'var(--radius-full)', fontWeight: 700, color: user.avatarColor, fontFamily: "'Inter'" }}>{user.name.toUpperCase()}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {reasons.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius)', background: r.match ? 'var(--success-light)' : 'var(--error-light)' }}>
              {r.match ? <CheckCircle2 size={16} color="var(--success)" /> : <X size={16} color="var(--error)" />}
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem', color: r.match ? 'var(--success)' : 'var(--error)' }}>{r.factor}</div>
                <div style={{ fontSize: '0.8125rem', color: r.match ? '#065F46' : '#991B1B' }}>{r.detail}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ padding: '10px 14px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', fontSize: '0.8125rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={13} /> Powered by HerPath Knowledge Graph
        </div>
      </div>
    </div>
  );
}

/* ─── PERSON CARD ─── */
function PersonCard({ user, onWhyClick }: { user: User; onWhyClick: (u: User) => void }) {
  return (
    <div className="card card-hover" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <div className="avatar-placeholder avatar-lg" style={{ background: user.avatarColor, color: 'white' }}>{user.initials}</div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
            <span style={{ fontWeight: 700, fontSize: '0.9375rem', fontFamily: "'Plus Jakarta Sans'" }}>{user.name}</span>
            {user.isVerified && <CheckCircle2 size={13} color="var(--primary)" />}
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 4 }} className="truncate">{user.role}</div>
          {user.rating && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem' }}>
              <Star size={11} color="#F59E0B" fill="#F59E0B" />
              <span style={{ fontWeight: 600 }}>{user.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({user.reviewCount})</span>
            </div>
          )}
        </div>
        {user.matchScore && <div className="match-score" style={{ flexShrink: 0 }}>{user.matchScore}%</div>}
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
        {user.skills.slice(0, 3).map(s => <span key={s} className="chip skill" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{s}</span>)}
      </div>

      <div style={{ display: 'flex', gap: 12, fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 12 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={11} />{user.location}</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Globe size={11} />{user.languages.slice(0, 2).join(', ')}</span>
      </div>

      <button onClick={() => onWhyClick(user)} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', padding: 0, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Sparkles size={12} /> Why this match?
      </button>

      <div style={{ display: 'flex', gap: 6 }}>
        <Link href={`/discover/mentor/${user.id}`} className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>View</Link>
        {user.isMentor
          ? <Link href={`/discover/mentor/${user.id}/book`} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Book</Link>
          : <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>Connect</button>
        }
      </div>
    </div>
  );
}

/* ─── CONTENT CARD ─── */
function ContentCard({ item }: { item: typeof contentItems[0] }) {
  const typeColors: Record<string, string> = { Video: '#EFF6FF', Article: '#F0FDF4', Post: '#FFF7ED', Short: '#F5F3FF' };
  const typeTextColors: Record<string, string> = { Video: '#2563EB', Article: '#059669', Post: '#D97706', Short: '#7C3AED' };

  return (
    <div className="card card-hover" style={{ padding: 0, overflow: 'hidden' }}>
      <div style={{ height: 110, background: item.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--border)', position: 'relative' }}>
        {item.type === 'Video' || item.type === 'Short' ? (
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(15,118,110,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Play size={16} color="white" />
          </div>
        ) : (
          <FileText size={28} color="var(--primary)" style={{ opacity: 0.4 }} />
        )}
        <span style={{ position: 'absolute', top: 8, left: 8, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: typeColors[item.type] || 'var(--bg-alt)', color: typeTextColors[item.type] || 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700 }}>{item.type}</span>
      </div>
      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontWeight: 700, fontSize: '0.875rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 4, lineHeight: 1.4 }} className="line-clamp-2">{item.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <div className="avatar-placeholder" style={{ width: 20, height: 20, background: item.avatarColor, color: 'white', fontSize: '0.5625rem', fontWeight: 700, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.authorAvatar}</div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.author}</span>
          {item.duration && <><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>·</span><span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 2 }}><Clock size={10} />{item.duration}</span></>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="chip skill" style={{ fontSize: '0.7rem', padding: '2px 7px' }}>{item.skill}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 2 }}><Eye size={10} />{item.views}</span>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN DISCOVER PAGE ─── */
export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState('for-you');
  const [search, setSearch] = useState('');
  const [whyUser, setWhyUser] = useState<User | null>(null);

  const filteredPeople = search
    ? allUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
    : allUsers;

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>Discover</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Find people, skills and content that match you.</div>
        </div>
      </div>

      <div className="page-container">
        {/* Tabs */}
        <div className="tabs" style={{ marginBottom: 24 }}>
          {[
            { id: 'for-you', label: 'For You' },
            { id: 'people', label: 'People' },
            { id: 'skills', label: 'Skills' },
            { id: 'content', label: 'Content' },
          ].map(tab => (
            <button key={tab.id} className={`tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
          ))}
        </div>

        {/* FOR YOU */}
        {activeTab === 'for-you' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <Sparkles size={16} color="var(--primary)" />
              <span style={{ fontWeight: 700, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'" }}>AI-Recommended for You</span>
            </div>
            <div className="grid-2" style={{ marginBottom: 28 }}>
              {mentors.map(m => <PersonCard key={m.id} user={m} onWhyClick={setWhyUser} />)}
            </div>

            {/* Skill Exchange promo */}
            <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', border: 'none', color: 'white', marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.125rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 6 }}>Skill Exchange</div>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', maxWidth: 400 }}>Teach Canva, learn Excel. Find someone who wants exactly what you offer.</p>
                </div>
                <Link href="/discover/skill-exchange" className="btn" style={{ background: 'var(--accent)', color: 'var(--secondary)', fontWeight: 700, gap: 6, flexShrink: 0 }}>
                  Explore Exchanges <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* PEOPLE */}
        {activeTab === 'people' && (
          <div>
            <div className="search-container" style={{ marginBottom: 20 }}>
              <Search size={16} className="search-icon" />
              <input value={search} onChange={e => setSearch(e.target.value)} className="search-input" placeholder="Search by name or skill (e.g., Canva, Digital Marketing)..." />
            </div>
            <div className="grid-2">
              {filteredPeople.map(u => <PersonCard key={u.id} user={u} onWhyClick={setWhyUser} />)}
            </div>
            {filteredPeople.length === 0 && (
              <div className="empty-state">
                <div className="empty-state-icon"><Users size={28} /></div>
                <h3 style={{ fontWeight: 700 }}>No people found</h3>
                <p style={{ color: 'var(--text-muted)' }}>Try a different skill or name.</p>
              </div>
            )}
          </div>
        )}

        {/* SKILLS */}
        {activeTab === 'skills' && (
          <div>
            <div className="grid-3">
              {skills.map(skill => (
                <div key={skill.id} className="card card-hover" style={{ padding: '18px', cursor: 'pointer' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9375rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 4 }}>{skill.name}</div>
                  <span className="badge badge-neutral" style={{ marginBottom: 10 }}>{skill.category}</span>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 10 }}>
                    Related: {skill.relatedSkills?.slice(0, 2).join(', ')}
                  </div>
                  <Link href="/learn" className="btn btn-secondary btn-sm" style={{ justifyContent: 'center', width: '100%' }}>Learn this skill</Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTENT */}
        {activeTab === 'content' && (
          <div>
            <div className="grid-3">
              {contentItems.map(item => <ContentCard key={item.id} item={item} />)}
            </div>
          </div>
        )}
      </div>

      {/* Knowledge Graph Modal */}
      {whyUser && <KnowledgeGraphModal user={whyUser} onClose={() => setWhyUser(null)} />}
    </AppLayout>
  );
}
