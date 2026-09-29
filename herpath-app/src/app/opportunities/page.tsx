'use client';
import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { opportunities as seedOpps, currentUser, Opportunity } from '@/data/mockData';
import {
  Briefcase, MapPin, Sparkles, Bookmark, BookmarkCheck, X, CheckCircle2,
  ArrowRight, TrendingUp, Search, Plus, ExternalLink, Download,
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, setDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';

interface Applicant {
  name: string;
  phone: string;
  fit: string;
  start: string;
  interviewDate: string;
  interviewTime: string;
  appliedAt: string;
}

interface PostedOpp extends Opportunity {
  postedByMe?: boolean;
  applicants?: Applicant[];
}

function downloadApplicantsPDF(opp: PostedOpp) {
  const applicants = opp.applicants || [];
  const rows = applicants.map((a, i) =>
    '<tr><td>' + (i+1) + '</td><td>' + a.name + '</td><td>' + a.phone + '</td><td>' + a.fit + '</td><td>' + a.start + '</td><td>' + a.interviewDate + ' ' + a.interviewTime + '</td><td>' + a.appliedAt + '</td></tr>'
  ).join('');
  const html = '<html><head><title>Applicants</title><style>body{font-family:sans-serif;padding:24px}table{width:100%;border-collapse:collapse}th{background:#6c47ff;color:#fff;padding:8px;text-align:left}td{padding:8px;border-bottom:1px solid #eee}</style></head><body><h2>Applicants for: ' + opp.title + '</h2><p>Total: ' + applicants.length + '</p><table><thead><tr><th>#</th><th>Name</th><th>Phone</th><th>Why Good Fit</th><th>Can Start</th><th>Interview</th><th>Applied At</th></tr></thead><tbody>' + (rows || '<tr><td colspan="7">No applicants yet</td></tr>') + '</tbody></table></body></html>';
  const win = window.open('', '_blank');
  if (!win) return;
  win.document.write(html);
  win.document.close();
  win.focus();
  win.print();
}

function WhyMatchModal({ opp, onClose }: { opp: Opportunity; onClose: () => void }) {
  const reasons = [
    { label: 'You have ' + opp.skills[0], match: currentUser.skills.includes(opp.skills[0]) },
    { label: opp.skills[1] ? 'You know ' + opp.skills[1] : 'Skill overlap', match: true },
    { label: 'Matches your freelancing goal', match: currentUser.goals.includes('Become a freelancer') },
    { label: opp.isRemote ? 'Remote - matches your preference' : 'Location: ' + opp.location, match: true },
    { label: 'Beginner-friendly opportunity', match: true },
  ];
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 420 }}>
        <div className="modal-header">
          <h3 style={{ fontWeight: 700 }}>Why this match?</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontWeight: 600, marginBottom: 12 }}>{opp.title} - <span className="match-score">{opp.matchScore}% Match</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reasons.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 'var(--radius)', background: r.match ? 'var(--success-light)' : 'var(--error-light)' }}>
                {r.match ? <CheckCircle2 size={16} color="var(--success)" /> : <X size={16} color="var(--error)" />}
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

function OpportunityDetailModal({ opp, onClose, onApply }: { opp: PostedOpp; onClose: () => void; onApply: () => void }) {
  const matchDetails = opp.skills.map(skill => ({
    skill, matched: currentUser.skills.includes(skill) || currentUser.canTeach.includes(skill),
  }));
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal-lg">
        <div className="modal-header">
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: 4 }}>{opp.title}</h3>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="badge badge-neutral">{opp.type}</span>
              <span className={`badge ${opp.isRemote ? 'badge-success' : 'badge-neutral'}`}>{opp.location}</span>
              <span className="badge badge-primary">Beginner Friendly</span>
              <div className="match-score" style={{ fontSize: '0.8125rem' }}>{opp.matchScore}% Match</div>
              {opp.postedByMe && <span className="badge" style={{ background: 'var(--accent-light)', color: 'var(--primary)' }}>Posted by You</span>}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignSelf: 'flex-start' }}><X size={20} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>About</div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{opp.description}</p>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>Skills Required</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{opp.skills.map(s => <span key={s} className="chip skill">{s}</span>)}</div>
          </div>
        </div>
        <div style={{ marginBottom: 20, padding: '16px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', border: '1px solid var(--accent-mid)' }}>
          <div style={{ fontWeight: 700, color: 'var(--primary)', marginBottom: 10, fontSize: '0.875rem' }}>Your Skill Match</div>
          {matchDetails.map(({ skill, matched }) => (
            <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              {matched ? <CheckCircle2 size={15} color="var(--success)" /> : <div style={{ width: 15, height: 15, borderRadius: '50%', border: '2px solid var(--text-muted)' }} />}
              <span style={{ fontSize: '0.875rem', fontWeight: matched ? 600 : 400, color: matched ? 'var(--text)' : 'var(--text-muted)' }}>{skill}</span>
              {matched && <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>You have this</span>}
            </div>
          ))}
        </div>
        {opp.budget && (
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, padding: '12px 16px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
            <div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Budget</div><div style={{ fontWeight: 700 }}>{opp.budget}</div></div>
            {opp.duration && <div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Duration</div><div style={{ fontWeight: 700 }}>{opp.duration}</div></div>}
            <div><div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Posted</div><div style={{ fontWeight: 700 }}>{opp.postedAt}</div></div>
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
          <div>
            {opp.postedByMe && (
              <button onClick={() => downloadApplicantsPDF(opp)} className="btn btn-secondary" style={{ gap: 5 }}>
                <Download size={14} /> Download PDF ({opp.applicants?.length || 0} applicants)
              </button>
            )}
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" style={{ gap: 5 }}><Bookmark size={14} /> Save</button>
            {opp.type === 'Scheme' ? (
              <button onClick={() => window.open(opp.link || 'https://www.india.gov.in', '_blank')} className="btn btn-primary" style={{ gap: 5 }}>
                Visit Site <ExternalLink size={14} />
              </button>
            ) : !opp.postedByMe && (
              <button onClick={onApply} className="btn btn-primary" style={{ gap: 5 }}>
                Apply Now <ArrowRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ApplicationModal({ opp, onClose, onComplete }: { opp: PostedOpp; onClose: () => void; onComplete: (data: Applicant) => void }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [fit, setFit] = useState('');
  const [start, setStart] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  if (step === 1) {
    return (
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal">
          <div className="modal-header">
            <h3 style={{ fontWeight: 700 }}>Apply: {opp.title}</h3>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Please fill in your details.</p>
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input className="form-input" type="text" placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number *</label>
              <input className="form-input" type="tel" placeholder="e.g. +91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Why are you a good fit? *</label>
              <textarea className="form-input" rows={3} placeholder="I have 2 years of experience..." value={fit} onChange={e => setFit(e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">When can you start?</label>
              <input className="form-input" type="text" placeholder="e.g. Next Monday" value={start} onChange={e => setStart(e.target.value)} />
            </div>
            <button onClick={() => setStep(2)} disabled={!name || !phone || !fit} className="btn btn-primary btn-lg w-full" style={{ justifyContent: 'center' }}>Next: Schedule Interview</button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontWeight: 700 }}>Schedule Interview</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Select a preferred date and time.</p>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input className="form-input" type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Time</label>
            <input className="form-input" type="time" value={time} onChange={e => setTime(e.target.value)} />
          </div>
          <button
            onClick={() => onComplete({ name, phone, fit, start, interviewDate: date, interviewTime: time, appliedAt: new Date().toLocaleDateString('en-IN') })}
            disabled={!date || !time}
            className="btn btn-primary btn-lg w-full"
            style={{ justifyContent: 'center' }}
          >Submit Application</button>
        </div>
      </div>
    </div>
  );
}

function PostOpportunityModal({ onClose, onPost }: { onClose: () => void; onPost: (o: PostedOpp) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('Local');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const handlePost = () => {
    if (!title.trim()) return;
    onPost({ id: 'user-' + Date.now(), title, company: 'Posted by You', location: location || 'Your Area', type: type as Opportunity['type'], skills: [], matchScore: 90, description: description || 'No description.', isRemote: location.toLowerCase().includes('remote'), postedAt: 'Just now', postedByMe: true, applicants: [] });
    setSubmitted(true);
  };
  if (submitted) {
    return (
      <div className="modal-overlay">
        <div className="modal" style={{ maxWidth: 400, textAlign: 'center' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}><CheckCircle2 size={32} color="var(--success)" /></div>
          <h3 style={{ fontWeight: 800, marginBottom: 8 }}>Opportunity Posted!</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>Others can now apply. Check My Posts tab.</p>
          <button onClick={onClose} className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>Close</button>
        </div>
      </div>
    );
  }
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h3 style={{ fontWeight: 700 }}>Post an Opportunity</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select className="form-input" value={type} onChange={e => setType(e.target.value)}>
              <option value="Local">Local Job / Gig</option>
              <option value="Freelance">Freelance</option>
              <option value="Collaborate">Collaboration</option>
              <option value="Business">Business Co-founder</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Title *</label>
            <input className="form-input" placeholder="e.g. Social Media Manager" value={title} onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Location (or Remote)</label>
            <input className="form-input" placeholder="e.g. Mumbai or Remote" value={location} onChange={e => setLocation(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" placeholder="Describe the opportunity..." style={{ minHeight: 80, resize: 'vertical' }} value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <button onClick={handlePost} disabled={!title.trim()} className="btn btn-primary btn-lg w-full" style={{ justifyContent: 'center' }}>Post Opportunity</button>
        </div>
      </div>
    </div>
  );
}

function OppCard({ opp, saved, onToggleSave, onViewDetail, onWhyMatch }: { opp: PostedOpp; saved: boolean; onToggleSave: () => void; onViewDetail: () => void; onWhyMatch: () => void }) {
  return (
    <div className="card card-hover" style={{ padding: 20, position: 'relative' }}>
      {opp.postedByMe && <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--accent-light)', color: 'var(--primary)', borderRadius: 'var(--radius-full)', padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700 }}>Your Post</div>}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ paddingRight: opp.postedByMe ? 70 : 0 }}>
          <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{opp.title}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>{opp.company}</span><span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={11} />{opp.location}</span><span>{opp.postedAt}</span>
          </div>
        </div>
        {!opp.postedByMe && (
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <div className="match-score">{opp.matchScore}% Match</div>
            <button onClick={onToggleSave} style={{ background: 'none', border: 'none', cursor: 'pointer', color: saved ? 'var(--primary)' : 'var(--text-muted)', display: 'flex' }}>
              {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        <span className="badge badge-neutral">{opp.type}</span>
        {opp.isRemote && <span className="badge badge-success">Remote</span>}
        {opp.budget && <span className="badge badge-primary">{opp.budget}</span>}
        {opp.postedByMe && <span className="badge" style={{ background: 'var(--success-light)', color: 'var(--success)' }}>{opp.applicants?.length || 0} applicants</span>}
      </div>
      {opp.skills.length > 0 && (
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 14 }}>
          {opp.skills.map(s => <span key={s} className="chip skill" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{s}</span>)}
        </div>
      )}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={onViewDetail} className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}>{opp.postedByMe ? 'View & Manage' : 'View Opportunity'}</button>
        {!opp.postedByMe && <button onClick={onWhyMatch} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3 }}><Sparkles size={12} /> Why match?</button>}
      </div>
    </div>
  );
}

export default function OpportunitiesPage() {
  const [allOpps, setAllOpps] = useState<PostedOpp[]>(seedOpps as PostedOpp[]);
  const [activeTab, setActiveTab] = useState('freelance');
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [selectedOpp, setSelectedOpp] = useState<PostedOpp | null>(null);
  const [whyOpp, setWhyOpp] = useState<PostedOpp | null>(null);
  const [showPostOpp, setShowPostOpp] = useState(false);
  const [applyingFor, setApplyingFor] = useState<PostedOpp | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Firestore real-time listener for opportunities
  React.useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'opportunities'), (snapshot) => {
        if (!snapshot.empty) {
          const fsOpps: PostedOpp[] = snapshot.docs.map(docSnap => ({
            ...(docSnap.data() as PostedOpp),
            id: docSnap.id,
          }));
          // Merge seed opportunities with Firestore opportunities
          const mergedIds = new Set(fsOpps.map(o => o.id));
          const filteredSeeds = seedOpps.filter(s => !mergedIds.has(s.id)) as PostedOpp[];
          setAllOpps([...fsOpps, ...filteredSeeds]);
        }
      }, (err) => console.warn('Firestore opps listener error:', err));
      return () => unsub();
    } catch (e) {
      console.warn('Firestore snapshot setup error:', e);
    }
  }, []);

  const tabOpps = {
    freelance: allOpps.filter(o => o.type === 'Freelance'),
    mentor: allOpps.filter(o => o.type === 'Mentor'),
    collaborate: allOpps.filter(o => o.type === 'Collaborate'),
    business: allOpps.filter(o => o.type === 'Business'),
    schemes: allOpps.filter(o => o.type === 'Scheme'),
    local: allOpps.filter(o => o.type === 'Local'),
    mine: allOpps.filter(o => o.postedByMe),
    saved: allOpps.filter(o => saved.has(o.id)),
  };
  const currentOpps = tabOpps[activeTab as keyof typeof tabOpps] || [];
  const filtered = search ? currentOpps.filter(o => o.title.toLowerCase().includes(search.toLowerCase()) || o.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))) : currentOpps;
  const toggleSave = (id: string) => setSaved(prev => { const next = new Set(prev); next.has(id) ? next.delete(id) : next.add(id); return next; });
  
  const handlePost = async (newOpp: PostedOpp) => {
    setAllOpps(prev => [newOpp, ...prev]);
    try {
      await setDoc(doc(db, 'opportunities', newOpp.id), newOpp);
    } catch (e) {
      console.warn('Firestore post opp error:', e);
    }
  };

  const handleAppComplete = async (data: Applicant) => {
    if (!applyingFor) return;
    const id = applyingFor.id;
    setAllOpps(prev => prev.map(o => o.id === id ? { ...o, applicants: [...(o.applicants || []), data] } : o));
    setApplyingFor(null);
    setSuccessMsg('Application submitted! Interview on ' + data.interviewDate + ' at ' + data.interviewTime);
    setTimeout(() => setSuccessMsg(''), 6000);

    try {
      await updateDoc(doc(db, 'opportunities', id), {
        applicants: arrayUnion(data)
      });
    } catch (e) {
      console.warn('Firestore app submit error:', e);
    }
  };
  return (
    <AppLayout>
      <div className="topbar">
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700 }}>Opportunities</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>Turn your skills into possibilities.</div>
        </div>
        <button onClick={() => setShowPostOpp(true)} className="btn btn-primary" style={{ gap: 5 }}><Plus size={16} /> Post Opportunity</button>
      </div>
      <div className="page-container">
        {successMsg && (
          <div style={{ background: 'var(--success-light)', border: '1px solid var(--success)', color: 'var(--success)', padding: '12px 16px', borderRadius: 'var(--radius)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8, fontWeight: 500, fontSize: '0.875rem' }}>
            <CheckCircle2 size={16} /> {successMsg}
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, marginBottom: 28, alignItems: 'start' }}>
          <div className="card" style={{ padding: 24, background: 'linear-gradient(135deg, var(--secondary), var(--primary))', border: 'none', color: 'white' }}>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>Top Match</div>
            <div style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: 6 }}>Canva Mentor</div>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: 14, lineHeight: 1.6 }}>You are ready to mentor beginners in Canva.</p>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-full)', padding: '4px 12px', fontWeight: 700, fontSize: '0.875rem' }}>95% Match</div>
            </div>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div style={{ fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}><TrendingUp size={16} color="var(--primary)" /> Your Stats</div>
            {[{ label: 'Total', value: allOpps.length }, { label: 'My Posts', value: tabOpps.mine.length }, { label: 'Saved', value: saved.size }].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="search-container" style={{ marginBottom: 20 }}>
          <Search size={16} className="search-icon" />
          <input value={search} onChange={e => setSearch(e.target.value)} className="search-input" placeholder="Search opportunities..." />
        </div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 20, overflowX: 'auto', paddingBottom: 2 }}>
          {[
            { id: 'freelance', label: 'Freelance (' + tabOpps.freelance.length + ')' },
            { id: 'mentor', label: 'Mentor (' + tabOpps.mentor.length + ')' },
            { id: 'collaborate', label: 'Collaborate (' + tabOpps.collaborate.length + ')' },
            { id: 'business', label: 'Business (' + tabOpps.business.length + ')' },
            { id: 'schemes', label: 'Schemes (' + tabOpps.schemes.length + ')' },
            { id: 'local', label: 'Local (' + tabOpps.local.length + ')' },
            { id: 'mine', label: 'My Posts (' + tabOpps.mine.length + ')' },
            { id: 'saved', label: 'Saved (' + saved.size + ')' },
          ].map(tab => (
            <button key={tab.id} className={'tab ' + (activeTab === tab.id ? 'active' : '')} onClick={() => setActiveTab(tab.id)} style={{ whiteSpace: 'nowrap' }}>{tab.label}</button>
          ))}
        </div>
        {filtered.length > 0 ? (
          <div className="grid-2">
            {filtered.map(opp => (
              <OppCard key={opp.id} opp={opp} saved={saved.has(opp.id)} onToggleSave={() => toggleSave(opp.id)} onViewDetail={() => setSelectedOpp(opp)} onWhyMatch={() => setWhyOpp(opp)} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon"><Briefcase size={28} /></div>
            <h3 style={{ fontWeight: 700 }}>{activeTab === 'mine' ? 'No posts yet' : 'No opportunities found'}</h3>
            <p style={{ color: 'var(--text-muted)' }}>{activeTab === 'mine' ? 'Click Post Opportunity to create one.' : 'Try a different search or tab.'}</p>
            {activeTab === 'mine' && <button onClick={() => setShowPostOpp(true)} className="btn btn-primary" style={{ gap: 5, marginTop: 12 }}><Plus size={14} /> Post Opportunity</button>}
          </div>
        )}
        {activeTab === 'local' && (
          <div style={{ marginTop: 24 }}>
            <div className="card" style={{ padding: 24, textAlign: 'center' }}>
              <MapPin size={32} color="var(--primary)" style={{ marginBottom: 12, opacity: 0.6 }} />
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Share a Local Opportunity</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 16 }}>Help women in your area by posting local jobs.</p>
              <button onClick={() => setShowPostOpp(true)} className="btn btn-primary" style={{ gap: 5 }}><Plus size={14} /> Post Local Opportunity</button>
            </div>
          </div>
        )}
      </div>
      {selectedOpp && <OpportunityDetailModal opp={selectedOpp} onClose={() => setSelectedOpp(null)} onApply={() => { setApplyingFor(selectedOpp); setSelectedOpp(null); }} />}
      {whyOpp && <WhyMatchModal opp={whyOpp} onClose={() => setWhyOpp(null)} />}
      {showPostOpp && <PostOpportunityModal onClose={() => setShowPostOpp(false)} onPost={handlePost} />}
      {applyingFor && <ApplicationModal opp={applyingFor} onClose={() => setApplyingFor(null)} onComplete={handleAppComplete} />}
    </AppLayout>
  );
}
