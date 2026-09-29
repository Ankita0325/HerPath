'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { opportunities, currentUser, mentors, Opportunity } from '@/data/mockData';
import {
  Briefcase, MapPin, Sparkles, Bookmark, BookmarkCheck, X, CheckCircle2,
  ArrowRight, Users, TrendingUp, Search, Filter, Star, Clock,
  ChevronDown, ExternalLink, Globe, Plus,
} from 'lucide-react';

/* ─── WHY THIS MATCH MODAL ─── */
function WhyMatchModal({ opp, onClose }: { opp: Opportunity; onClose: () => void }) {
  const reasons = [
    { label: `You have ${opp.skills[0]}`, match: currentUser.skills.includes(opp.skills[0]) },
    { label: opp.skills[1] ? `You know ${opp.skills[1]}` : 'Skill overlap', match: true },
    { label: 'Matches your freelancing goal', match: currentUser.goals.includes('Become a freelancer') || currentUser.goals.includes('Start a business') },
    { label: opp.isRemote ? 'Remote — matches your preference' : `Location: ${opp.location}`, match: true },
    { label: 'Beginner-friendly opportunity', match: true },
  ];
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Why this match?</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>{opp.title} — <span className="match-score">{opp.matchScore}% Match</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reasons.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius)', background: r.match ? 'var(--success-light)' : 'var(--error-light)' }}>
                {r.match
                  ? <CheckCircle2 size={16} color="var(--success)" />
                  : <X size={16} color="var(--error)" />}
                <span style={{ fontSize: '0.875rem', color: r.match ? 'var(--success)' : 'var(--error)', fontWeight: 500 }}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '12px 14px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', fontSize: '0.8125rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={13} /> Powered by HerPath Knowledge Graph
        </div>
      </div>
    </div>
  );
}

/* ─── OPPORTUNITY DETAIL MODAL ─── */
function OpportunityDetailModal({ opp, onClose }: { opp: Opportunity; onClose: () => void }) {
  const [applied, setApplied] = useState(false);
  const matchDetails = opp.skills.map(skill => ({
    skill,
    matched: currentUser.skills.includes(skill) || currentUser.canTeach.includes(skill),
  }));

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg">
        <div className="modal-header">
          <div>
            <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'", marginBottom: 4 }}>{opp.title}</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="badge badge-neutral">{opp.type}</span>
              <span className={`badge ${opp.isRemote ? 'badge-success' : 'badge-neutral'}`}>{opp.location}</span>
              <span className="badge badge-primary">Beginner Friendly</span>
              <div className="match-score" style={{ fontSize: '0.8125rem' }}>{opp.matchScore}% Match</div>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignSelf: 'flex-start' }}><X size={20} /></button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8 }}>About this opportunity</div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{opp.description}</p>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 8 }}>Skills Required</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {opp.skills.map(s => <span key={s} className="chip skill">{s}</span>)}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10 }}>What you'll do</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {['Create high-quality content for their platforms', 'Collaborate with the marketing team', 'Track performance and report insights', 'Deliver weekly project updates'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)', marginTop: 7, flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20, padding: '16px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', border: '1px solid var(--accent-mid)' }}>
          <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 10, fontSize: '0.875rem' }}>Your Skill Match</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {matchDetails.map(({ skill, matched }) => (
              <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {matched
                  ? <CheckCircle2 size={15} color="var(--success)" />
                  : <div style={{ width: 15, height: 15, borderRadius: '50%', border: '2px solid var(--text-muted)' }} />}
                <span style={{ fontSize: '0.875rem', fontWeight: matched ? 600 : 400, color: matched ? 'var(--text)' : 'var(--text-muted)' }}>{skill}</span>
                {matched && <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>✓ You have this</span>}
              </div>
            ))}
          </div>
        </div>

        {opp.budget && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, padding: '12px 16px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
            <div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Budget</div><div style={{ fontWeight: 700 }}>{opp.budget}</div></div>
            {opp.duration && <div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Duration</div><div style={{ fontWeight: 700 }}>{opp.duration}</div></div>}
            <div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Posted</div><div style={{ fontWeight: 700 }}>{opp.postedAt}</div></div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" style={{ gap: 5 }}><Bookmark size={14} /> Save</button>
          <button
            onClick={() => setApplied(true)}
            className="btn btn-primary"
            style={{ gap: 5, background: applied ? 'var(--success)' : undefined }}
          >
            {applied ? <><CheckCircle2 size={14} /> Applied!</> : <>Apply Now <ArrowRight size={14} /></>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── BECOME MENTOR MODAL ─── */
function BecomeMentorModal({ onClose }: { onClose: () => void }) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Canva']);
  const [mode, setMode] = useState<string[]>(['Online']);
  const [avail, setAvail] = useState<string[]>(['Weekends']);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (arr: string[], val: string, set: (v: string[]) => void) => {
    set(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  if (submitted) {
    return (
      <div className="modal-overlay">
        <div className="modal" style={{ maxWidth: 400, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={32} color="var(--success)" />
          </div>
          <h3 style={{ fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 8 }}>Mentor Profile Created!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>You're now visible as a mentor for {selectedSkills.join(', ')}.</p>
          <button onClick={onClose} className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Go to Dashboard</button>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Become a Mentor</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Skills you can teach:</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Canva', 'Digital Marketing', 'Instagram Marketing', 'Video Editing', 'Social Media'].map(s => (
                <button key={s} className={`chip ${selectedSkills.includes(s) ? 'selected' : ''}`} onClick={() => toggle(selectedSkills, s, setSelectedSkills)}>{s}</button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Years of Experience</label>
            <input className="form-input" defaultValue="2" type="number" min="0" max="30" />
          </div>
          <div>
            <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Mode:</label>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Online', 'In-person'].map(m => (
                <button key={m} className={`chip ${mode.includes(m) ? 'selected' : ''}`} onClick={() => toggle(mode, m, setMode)}>{m}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="form-label" style={{ marginBottom: 8, display: 'block' }}>Availability:</label>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Weekdays', 'Weekends', 'Mornings', 'Evenings', 'Flexible'].map(a => (
                <button key={a} className={`chip ${avail.includes(a) ? 'selected' : ''}`} onClick={() => toggle(avail, a, setAvail)}>{a}</button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Session Rate (₹ per hour)</label>
            <input className="form-input" defaultValue="500" type="number" placeholder="e.g., 500" />
          </div>
          <button onClick={() => setSubmitted(true)} className="btn btn-primary btn-lg w-full" style={{ justifyContent: 'center' }}>Create Mentor Profile</button>
        </div>
      </div>
    </div>
  );
}

/* ─── OPPORTUNITY CARD ─── */
function OppCard({ opp, saved, onToggleSave, onViewDetail, onWhyMatch }: {
  opp: Opportunity;
  saved: boolean;
  onToggleSave: () => void;
  onViewDetail: () => void;
  onWhyMatch: () => void;
}) {
  return (
    <div className="card card-hover" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 4 }}>{opp.title}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{opp.company}</span>
            <span>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={11} />{opp.location}</span>
            <span>·</span>
            <span>{opp.postedAt}</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <div className="match-score">{opp.matchScore}% Match</div>
          <button onClick={onToggleSave} style={{ background: 'none', border: 'none', cursor: 'pointer', color: saved ? 'var(--primary)' : 'var(--text-muted)', transition: 'color var(--transition)', display: 'flex' }}>
            {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <span className="badge badge-neutral">{opp.type}</span>
        {opp.isRemote && <span className="badge badge-success">Remote</span>}
        {opp.budget && <span className="badge badge-primary">{opp.budget}</span>}
      </div>

      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
        {opp.skills.map(s => <span key={s} className="chip skill" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{s}</span>)}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={onViewDetail} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>View Opportunity</button>
        <button onClick={onWhyMatch} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
          <Sparkles size={12} /> Why match?
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN OPPORTUNITIES PAGE ─── */
export default function OpportunitiesPage() {
  const [activeTab, setActiveTab] = useState('freelance');
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [whyOpp, setWhyOpp] = useState<Opportunity | null>(null);
  const [showMentor, setShowMentor] = useState(false);

  const tabOpps = {
    freelance: opportunities.filter(o => o.type === 'Freelance'),
    mentor: opportunities.filter(o => o.type === 'Mentor'),
    collaborate: opportunities.filter(o => o.type === 'Collaborate'),
    business: opportunities.filter(o => o.type === 'Business'),
    saved: opportunities.filter(o => saved.has(o.id)),
  };

  const currentOpps = tabOpps[activeTab as keyof typeof tabOpps] || [];
  const filtered = search ? currentOpps.filter(o => o.title.toLowerCase().includes(search.toLowerCase()) || o.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))) : currentOpps;

  const toggleSave = (id: string) => setSaved(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>Opportunities</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Turn your skills into possibilities.</div>
        </div>
      </div>

      <div className="page-container">
        {/* Top recommended card */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, marginBottom: 28, alignItems: 'start' }}>
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', border: 'none', color: 'white' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Top Match for You</div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 6 }}>Canva Mentor</div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: 14, lineHeight: 1.6 }}>You are ready to mentor beginners in Canva. Earn ₹500–₹800 per session.</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-full)', padding: '4px 12px', fontWeight: 700, fontSize: '0.875rem' }}>95% Match</div>
              <button onClick={() => setShowMentor(true)} className="btn" style={{ background: 'var(--accent)', color: 'var(--secondary)', fontWeight: 700, gap: 6 }}>
                Start Mentoring <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <TrendingUp size={16} color="var(--primary)" /> Your Opportunity Stats
            </div>
            {[
              { label: 'Total Matches', value: `${opportunities.length}` },
              { label: 'Best Match', value: `${Math.max(...opportunities.map(o => o.matchScore))}%` },
              { label: 'Saved', value: saved.size.toString() },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="search-container" style={{ marginBottom: 20 }}>
          <Search size={16} className="search-icon" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
            placeholder="Search opportunities by title or skill..."
          />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, overflowX: 'auto', paddingBottom: 2 }}>
          {[
            { id: 'freelance', label: `Freelance (${tabOpps.freelance.length})` },
            { id: 'mentor', label: `Mentor (${tabOpps.mentor.length})` },
            { id: 'collaborate', label: `Collaborate (${tabOpps.collaborate.length})` },
            { id: 'business', label: `Business (${tabOpps.business.length})` },
            { id: 'saved', label: `Saved (${saved.size})` },
          ].map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{ whiteSpace: 'nowrap' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Opportunity grid */}
        {filtered.length > 0 ? (
          <div className="grid-2">
            {filtered.map(opp => (
              <OppCard
                key={opp.id}
                opp={opp}
                saved={saved.has(opp.id)}
                onToggleSave={() => toggleSave(opp.id)}
                onViewDetail={() => setSelectedOpp(opp)}
                onWhyMatch={() => setWhyOpp(opp)}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <Briefcase size={28} />
            </div>
            <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>
              {activeTab === 'saved' ? 'No saved opportunities' : 'No opportunities found'}
            </h3>
            <p style={{ color: 'var(--text-muted)' }}>
              {activeTab === 'saved' ? 'Bookmark opportunities to save them here.' : 'Try a different search or tab.'}
            </p>
          </div>
        )}

        {/* Collaborate section */}
        {activeTab === 'collaborate' && filtered.length === 0 && (
          <div className="card" style={{ padding: '24px', textAlign: 'center' }}>
            <Users size={32} color="var(--primary)" style={{ marginBottom: 12, opacity: 0.6 }} />
            <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Find Collaborators</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Post your project and find women to collaborate with.</p>
            <button className="btn btn-primary" style={{ gap: 5 }}><Plus size={14} /> Post a Collaboration</button>
          </div>
        )}

        {/* Business section extras */}
        {activeTab === 'business' && (
          <div style={{ marginTop: 24 }}>
            <div className="card" style={{ padding: '20px', background: 'var(--bg-alt)', border: 'none' }}>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>Local businesses looking for skills like yours:</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Canva Designer', 'Social Media Manager', 'Video Editor', 'Digital Marketer', 'Content Writer'].map(s => (
                  <button key={s} className="chip" style={{ cursor: 'pointer' }}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedOpp && <OpportunityDetailModal opp={selectedOpp} onClose={() => setSelectedOpp(null)} />}
      {whyOpp && <WhyMatchModal opp={whyOpp} onClose={() => setWhyOpp(null)} />}
      {showMentor && <BecomeMentorModal onClose={() => setShowMentor(false)} />}
    </AppLayout>
  );
}
