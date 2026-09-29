'use client';
import React, { useState, useMemo } from 'react';
import { AppLayout } from '@/components/AppLayout';
import {
  TrendingUp, Search, Shield, Bookmark, BookmarkCheck, Sparkles,
  AlertTriangle, ExternalLink, Phone, PlayCircle, ChevronRight,
  Check, X, MapPin, Scale, FileText,
} from 'lucide-react';
import {
  FRAUD_CATEGORIES,
  LEGAL_DISCLAIMER,
  type FraudCategory,
} from '@/data/fraud-legal.seed';

/* ─── WHY MATTERS MODAL ─── */
function WhyMattersModal({ fraud, onClose }: { fraud: FraudCategory; onClose: () => void }) {
  const reasons = [
    { label: 'Online fraud is rising across India', match: true },
    { label: 'Women are disproportionately targeted', match: true },
    { label: 'You have official channels to report', match: true },
    { label: 'Early action improves outcomes', match: true },
  ];
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Why this matters?</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>{fraud.name} — <span className="match-score">India</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reasons.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius)', background: r.match ? 'var(--success-light)' : 'var(--error-light)' }}>
                {r.match ? <Check size={16} color="var(--success)" /> : <X size={16} color="var(--error)" />}
                <span style={{ fontSize: '0.875rem', color: r.match ? 'var(--success)' : 'var(--error)', fontWeight: 500 }}>{r.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '12px 14px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', fontSize: '0.8125rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <Sparkles size={13} /> Powered by SheConnect AI Knowledge Graph
        </div>
      </div>
    </div>
  );
}

/* ─── FRAUD DETAIL PANEL ─── */
function FraudDetailPanel({ fraud, onClose }: { fraud: FraudCategory; onClose: () => void }) {
  const [tab, setTab] = useState<'where' | 'law' | 'video' | 'docs'>('where');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setChecked(p => ({ ...p, [id]: !p[id] }));
  const total = fraud.documents.length;
  const done = useMemo(() => Object.values(checked).filter(Boolean).length, [checked]);
  const pct = total ? Math.round((done / total) * 100) : 0;
  const mainVerified = fraud.authorities.some(a => a.verifiedBy === 'admin');

  return (
    <div className="card" style={{ padding: '24px', marginTop: 4, borderTop: '2px solid var(--primary)', borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', borderRadius: 'var(--radius)', background: 'var(--card)', position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: '28px', lineHeight: 1 }}>{fraud.emoji}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.25rem', fontFamily: "'Plus Jakarta Sans'" }}>{fraud.name}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 4, flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="badge badge-neutral">Fraud</span>
              <span className="badge badge-primary">India</span>
              <span className="match-score" style={{ fontSize: '0.8125rem' }}>{mainVerified ? 'Verified' : 'Pending review'}</span>
            </div>
          </div>
        </div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }} aria-label="Close guide">
          <X size={18} />
        </button>
      </div>

      <div style={{ padding: '12px 14px', background: 'var(--error-light)', borderRadius: 'var(--radius)', marginBottom: 20, border: '1px solid var(--error)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--error)', fontWeight: 700, marginBottom: 8 }}>
          <AlertTriangle size={14} /> Common warning signs
        </div>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 20 }}>
          {fraud.warningSigns.map((w, i) => (
            <li key={i} style={{ fontSize: '0.875rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--error)', flexShrink: 0 }} />
              {w}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', gap: 4, marginBottom: 20, borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
        {[
          { id: 'where', label: 'Where to Apply', icon: MapPin },
          { id: 'law', label: 'Law', icon: Scale },
          { id: 'video', label: 'Video', icon: PlayCircle },
          { id: 'docs', label: 'Documents', icon: FileText },
        ].map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} className={`tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id as any)}>
              <Icon size={14} /> {t.label}
            </button>
          );
        })}
      </div>

      <div style={{ marginBottom: 24 }}>
        {tab === 'where' && (
          <div className="grid-2">
            {fraud.authorities.map((a, i) => (
              <div key={i} style={{ padding: '16px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 'var(--radius)', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, gap: 8 }}>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{a.name}</div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginTop: 2 }}>{a.purpose}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-full)', background: a.verifiedBy === 'admin' ? 'var(--success-light)' : 'var(--error-light)', color: a.verifiedBy === 'admin' ? 'var(--success)' : 'var(--error)', whiteSpace: 'nowrap' }}>
                    {a.verifiedBy === 'admin' ? '✓ Verified' : 'Pending review'}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {a.website && (
                    <a href={a.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <ExternalLink size={13} /> Visit site
                    </a>
                  )}
                  {a.helpline && (
                    <a href={`tel:${a.helpline}`} className="btn btn-secondary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <Phone size={13} /> Call {a.helpline}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'law' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {fraud.laws.map((l, i) => (
              <div key={i} className="card" style={{ padding: '16px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 6 }}>
                  {l.lawName}
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8, flexWrap: 'wrap' }}>
                  <span className="chip" style={{ background: 'var(--primary)', color: 'white', fontSize: '0.75rem' }}>§ {l.section}</span>
                  <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{l.title}</span>
                </div>
                <div className="grid-2" style={{ gap: 12, marginBottom: 12 }}>
                  <div style={{ padding: '12px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 4 }}>What it means</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{l.plainExplanation}</div>
                  </div>
                  <div style={{ padding: '12px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 4 }}>When it may apply</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{l.whenRelevant}</div>
                  </div>
                </div>
                <a href={l.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <ExternalLink size={12} /> View official source
                </a>
              </div>
            ))}
          </div>
        )}

        {tab === 'video' && (
          <div className="grid-2">
            {fraud.videos.map((v, i) => (
              <a key={i} href={v.youtubeUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', gap: 12, padding: '16px', background: 'var(--accent-light)', border: '1px solid var(--accent-mid)', borderRadius: 'var(--radius)', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: 48, height: 48, borderRadius: 'var(--radius)', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <PlayCircle size={22} color="white" />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{v.channel}</div>
                </div>
                <ChevronRight size={16} color="var(--text-muted)" style={{ flexShrink: 0 }} />
              </a>
            ))}
          </div>
        )}

        {tab === 'docs' && (
          <div>
            <div style={{ height: 8, background: 'var(--accent-light)', borderRadius: 'var(--radius-full)', marginBottom: 8, overflow: 'hidden' }}>
              <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: 'var(--radius-full)', transition: 'width var(--transition)' }} />
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: 16 }}>{done} / {total} ready</div>
            <div className="grid-2">
              {fraud.documents.map(d => {
                const isOn = !!checked[d.id];
                return (
                  <label key={d.id} style={{ display: 'flex', gap: 10, padding: '12px 14px', background: isOn ? 'var(--accent-light)' : 'var(--bg-alt)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', cursor: 'pointer' }}>
                    <span style={{ width: 18, height: 18, borderRadius: 'var(--radius)', border: `2px solid ${isOn ? 'var(--primary)' : 'var(--text-muted)'}`, background: isOn ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {isOn && <Check size={12} color="white" />}
                    </span>
                    <input type="checkbox" checked={isOn} onChange={() => toggle(d.id)} style={{ position: 'absolute', opacity: 0 }} />
                    <span style={{ fontSize: '0.875rem', color: 'var(--text)', fontWeight: isOn ? 600 : 400 }}>{d.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.6, padding: '12px 14px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)', marginTop: 16 }}>
        {LEGAL_DISCLAIMER}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid var(--border)', marginTop: 16 }}>
        <button className="btn btn-secondary">💾 Save checklist</button>
        <button className="btn btn-primary">🚨 Start a Case</button>
      </div>
    </div>
  );
}

/* ─── MESSAGE CHECKER MODAL ─── */
function MessageCheckerModal({ onClose }: { onClose: () => void }) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ indicators: string[]; verdict: string; nextSteps: string[] } | null>(null);

  async function handleCheck() {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/fraud-legal/check-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      setResult(await res.json());
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 480 }}>
        <div className="modal-header">
          <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>Check a Suspicious Message</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
            <X size={20} />
          </button>
        </div>
        <div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className="form-input"
            rows={5}
            placeholder="Paste the suspicious message here..."
          />
          <button onClick={handleCheck} className="btn btn-primary w-full" style={{ justifyContent: 'center', gap: 6, marginTop: 12 }} disabled={loading || !text.trim()}>
            {loading ? 'Analyzing…' : <><Sparkles size={14} /> Analyze message</>}
          </button>
          {result && (
            <div style={{ marginTop: 20, padding: '14px', background: 'var(--error-light)', borderRadius: 'var(--radius)', border: '1px solid var(--error)' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--error)', fontWeight: 700, marginBottom: 10 }}>
                <AlertTriangle size={16} /> {result.verdict}
              </div>
              {result.indicators.length > 0 && (
                <>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--error)', marginBottom: 6 }}>Indicators</div>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 12, paddingLeft: 20 }}>
                    {result.indicators.map((ind, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.875rem', color: 'var(--text)' }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--error)', flexShrink: 0, marginTop: 6 }} />
                        {ind.replace(/^⚠\s*/, '')}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--error)', marginBottom: 6 }}>Safe next steps</div>
              <ol style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 20, marginBottom: 12 }}>
                {result.nextSteps.map((s, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.875rem', color: 'var(--text)' }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--error-light)', border: '1px solid var(--error)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--error)', flexShrink: 0 }}>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
              <div style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'var(--text-muted)' }}>
                This is not a certainty. Always verify through official channels before taking action.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── FRAUD CARD ─── */
function FraudCard({ fraud, saved, onToggleSave, onViewGuide, onWhyMatters }: {
  fraud: FraudCategory;
  saved: boolean;
  onToggleSave: () => void;
  onViewGuide: () => void;
  onWhyMatters: () => void;
}) {
  return (
    <div className="card card-hover" style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12, gap: 8 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <span style={{ fontSize: '28px', lineHeight: 1 }}>{fraud.emoji}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 4 }}>{fraud.name}</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{fraud.shortDescription}</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignItems: 'center' }}>
          <span className="match-score">India</span>
          <button onClick={onToggleSave} style={{ background: 'none', border: 'none', cursor: 'pointer', color: saved ? 'var(--primary)' : 'var(--text-muted)', transition: 'color var(--transition)', display: 'flex' }}>
            {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <span className="badge badge-neutral">Fraud type</span>
        <span className="badge badge-success">Online</span>
        <span className="badge badge-primary">Priority</span>
      </div>

      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
        {fraud.warningSigns.slice(0, 3).map(w => <span key={w} className="chip skill">{w}</span>)}
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={onViewGuide} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>View Guide</button>
        <button onClick={onWhyMatters} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, flexShrink: 0 }}>
          <Sparkles size={12} /> Why this matters?
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN FRAUD & LEGAL HELP PAGE ─── */
export default function FraudLegalHelpPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [whyFraud, setWhyFraud] = useState<FraudCategory | null>(null);
  const [checkerOpen, setCheckerOpen] = useState(false);

  const tabFrauds = {
    all: FRAUD_CATEGORIES,
    upi: FRAUD_CATEGORIES.filter(f => f.id === 'upi-payment'),
    bank: FRAUD_CATEGORIES.filter(f => f.id === 'bank'),
    phishing: FRAUD_CATEGORIES.filter(f => f.id === 'phishing'),
    fakejob: FRAUD_CATEGORIES.filter(f => f.id === 'fake-job'),
    saved: FRAUD_CATEGORIES.filter(f => saved.has(f.id)),
  };

  const current = tabFrauds[activeTab as keyof typeof tabFrauds] || [];
  const filtered = search
    ? current.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) ||
        f.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
        f.warningSigns.some(w => w.toLowerCase().includes(search.toLowerCase()))
      )
    : current;

  const toggleSave = (id: string) => setSaved(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>Fraud & Legal Help</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Understand the problem. Know your rights. Take the right next step.</div>
        </div>
      </div>

      <div className="page-container">
        {/* Top row: hero + stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, marginBottom: 28, alignItems: 'start' }}>
          <div className="card" style={{ padding: '24px', background: 'linear-gradient(135deg, var(--secondary), var(--primary))', border: 'none', color: 'white' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Safety First</div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: "'Plus Jakarta Sans'", marginBottom: 6 }}>Have you experienced a fraud or online scam?</div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: 14, lineHeight: 1.6 }}>You are not alone. Let's understand what happened and take the right next step.</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setCheckerOpen(true)} className="btn" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700, gap: 6 }}>
                🚨 Report a Fraud
              </button>
              <button onClick={() => setCheckerOpen(true)} className="btn" style={{ background: 'none', border: '1px solid rgba(255,255,255,0.4)', color: 'white', fontWeight: 600, gap: 6 }}>
                🔍 Check a Suspicious Message
              </button>
            </div>
          </div>

          <div className="card" style={{ padding: '20px' }}>
            <div style={{ fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <TrendingUp size={16} color="var(--primary)" /> Your Safety Stats
            </div>
            {[
              { label: 'Active Cases', value: '0' },
              { label: 'Evidence Saved', value: '0' },
              { label: 'Laws Explored', value: '0' },
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
            placeholder="Search fraud types or laws..."
          />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, overflowX: 'auto', paddingBottom: 2 }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'upi', label: 'UPI' },
            { id: 'bank', label: 'Bank' },
            { id: 'phishing', label: 'Phishing' },
            { id: 'fakejob', label: 'Fake Job' },
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

        {/* Fraud grid with inline detail panel */}
        {filtered.length > 0 ? (
          <div className="grid-2">
            {filtered.map(f => (
              <React.Fragment key={f.id}>
                <FraudCard
                  fraud={f}
                  saved={saved.has(f.id)}
                  onToggleSave={() => toggleSave(f.id)}
                  onViewGuide={() => setSelectedId(prev => prev === f.id ? null : f.id)}
                  onWhyMatters={() => setWhyFraud(f)}
                />
                {selectedId === f.id && (
                  <div style={{ gridColumn: '1 / -1', animation: 'fadeSlideDown 220ms ease-out' }}>
                    <FraudDetailPanel fraud={f} onClose={() => setSelectedId(null)} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><Shield size={28} /></div>
            <h3 style={{ fontWeight: 700, fontFamily: "'Plus Jakarta Sans'" }}>No fraud types found</h3>
            <p style={{ color: 'var(--text-muted)' }}>Try a different search.</p>
          </div>
        )}

        {/* Modals */}
        {whyFraud && <WhyMattersModal fraud={whyFraud} onClose={() => setWhyFraud(null)} />}
        {checkerOpen && <MessageCheckerModal onClose={() => setCheckerOpen(false)} />}
      </div>
    </AppLayout>
  );
}
