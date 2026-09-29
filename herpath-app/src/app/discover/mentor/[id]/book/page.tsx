'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { mentors } from '@/data/mockData';
import { ArrowLeft, CheckCircle2, Calendar, Clock, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '5:00 PM', '6:00 PM'];

function getDaysInMonth(year: number, month: number) {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const mentor = mentors.find(m => m.id === params.id) || mentors[0];

  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState(60);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [mode, setMode] = useState('Online');
  const [confirmed, setConfirmed] = useState(false);

  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const days = getDaysInMonth(viewYear, viewMonth);
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const dayNames = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const handleConfirm = async () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <AppLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '32px' }}>
          <div style={{ textAlign: 'center', maxWidth: 400, animation: 'slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--success-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 size={40} color="var(--success)" />
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 8 }}>Booking Confirmed! 🎉</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24, lineHeight: 1.7 }}>
              Your {duration}-minute session with <strong>{mentor.name}</strong> is confirmed for{' '}
              <strong>{selectedDate?.toDateString()}</strong> at <strong>{selectedTime}</strong>.
            </p>
            <div style={{ padding: '16px 20px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', marginBottom: 24, border: '1px solid var(--accent-mid)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.875rem', textAlign: 'left' }}>
                {[
                  { label: 'Mentor', value: mentor.name },
                  { label: 'Date', value: selectedDate?.toDateString() || '' },
                  { label: 'Time', value: selectedTime },
                  { label: 'Duration', value: `${duration} minutes` },
                  { label: 'Mode', value: mode },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{label}</span>
                    <span style={{ fontWeight: 600 }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <Link href="/dashboard" className="btn btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Go Home</Link>
              <Link href="/discover" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Find More Mentors</Link>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="topbar">
        <Link href={`/discover/mentor/${params.id}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontWeight: 500, fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Back to Profile
        </Link>
      </div>

      <div className="page-container" style={{ maxWidth: 720 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Plus Jakarta Sans'", marginBottom: 6 }}>Book a Session</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="avatar-placeholder avatar-sm" style={{ background: mentor.avatarColor, color: 'white', fontSize: '0.625rem', fontWeight: 700, width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>{mentor.initials}</div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>with <strong style={{ color: 'var(--text)' }}>{mentor.name}</strong></span>
          </div>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {['Session', 'Date', 'Time', 'Confirm'].map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: i + 1 < step ? 'var(--primary)' : i + 1 === step ? 'var(--accent)' : 'var(--bg-alt)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8125rem', fontWeight: 700,
                color: i + 1 <= step ? 'white' : 'var(--text-muted)',
              }}>
                {i + 1 < step ? <CheckCircle2 size={14} color="white" /> : i + 1}
              </div>
              <span style={{ fontSize: '0.8125rem', fontWeight: step === i + 1 ? 700 : 400, color: step === i + 1 ? 'var(--text)' : 'var(--text-muted)' }}>{label}</span>
              {i < 3 && <div style={{ height: 1, width: 24, background: i + 1 < step ? 'var(--primary)' : 'var(--border)' }} />}
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: '28px', marginBottom: 16 }}>
          {/* Step 1: Session Type */}
          {step === 1 && (
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 20, fontFamily: "'Plus Jakarta Sans'" }}>Select Session Duration</h3>
              <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
                {[30, 60].map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    style={{
                      flex: 1,
                      minWidth: 180,
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      border: `2px solid ${duration === d ? 'var(--primary)' : 'var(--border)'}`,
                      background: duration === d ? 'var(--accent-light)' : 'white',
                      cursor: 'pointer',
                      transition: 'all var(--transition)',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '1.375rem', fontFamily: "'Plus Jakarta Sans'", color: duration === d ? 'var(--primary)' : 'var(--text)', marginBottom: 4 }}>{d} min</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{d === 30 ? 'Quick Intro — Perfect for Q&A' : 'Deep Dive — Full mentoring session'}</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary)', marginTop: 10 }}>₹{((mentor.sessionRate || 500) * d / 60).toFixed(0)}</div>
                  </button>
                ))}
              </div>
              <div>
                <label className="form-label" style={{ marginBottom: 10, display: 'block' }}>Session Mode</label>
                <div style={{ display: 'flex', gap: 10 }}>
                  {['Online', 'In-person'].map(m => (
                    <button key={m} className={`chip ${mode === m ? 'selected' : ''}`} onClick={() => setMode(m)} style={{ padding: '8px 18px' }}>{m}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Date */}
          {step === 2 && (
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 20, fontFamily: "'Plus Jakarta Sans'" }}>Select a Date</h3>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <button onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  <ChevronLeft size={20} />
                </button>
                <span style={{ fontWeight: 700 }}>{monthNames[viewMonth]} {viewYear}</span>
                <button onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
                  <ChevronRight size={20} />
                </button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                {dayNames.map(d => <div key={d} style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', padding: '4px 0' }}>{d}</div>)}
                {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} />)}
                {days.map(day => {
                  const isPast = day < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  const isSelected = selectedDate?.toDateString() === day.toDateString();
                  const isToday = day.toDateString() === today.toDateString();
                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => !isPast && setSelectedDate(day)}
                      disabled={isPast}
                      style={{
                        padding: '8px 0',
                        borderRadius: 'var(--radius)',
                        border: 'none',
                        background: isSelected ? 'var(--primary)' : isToday ? 'var(--accent-light)' : 'transparent',
                        color: isPast ? 'var(--border)' : isSelected ? 'white' : isToday ? 'var(--primary)' : 'var(--text)',
                        fontWeight: isSelected || isToday ? 700 : 400,
                        cursor: isPast ? 'not-allowed' : 'pointer',
                        fontSize: '0.875rem',
                        transition: 'all var(--transition)',
                      }}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
              {selectedDate && <div style={{ marginTop: 14, padding: '10px 14px', background: 'var(--accent-light)', borderRadius: 'var(--radius)', fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600 }}>Selected: {selectedDate.toDateString()}</div>}
            </div>
          )}

          {/* Step 3: Time */}
          {step === 3 && (
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 20, fontFamily: "'Plus Jakarta Sans'" }}>Select a Time</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                {timeSlots.map(time => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: 'var(--radius)',
                      border: `2px solid ${selectedTime === time ? 'var(--primary)' : 'var(--border)'}`,
                      background: selectedTime === time ? 'var(--accent-light)' : 'white',
                      color: selectedTime === time ? 'var(--primary)' : 'var(--text)',
                      fontWeight: selectedTime === time ? 700 : 500,
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      transition: 'all var(--transition)',
                    }}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && (
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 20, fontFamily: "'Plus Jakarta Sans'" }}>Confirm Booking</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'Mentor', value: mentor.name, icon: <Globe size={16} /> },
                  { label: 'Date', value: selectedDate?.toDateString() || '', icon: <Calendar size={16} /> },
                  { label: 'Time', value: selectedTime, icon: <Clock size={16} /> },
                  { label: 'Duration', value: `${duration} minutes`, icon: <Clock size={16} /> },
                  { label: 'Mode', value: mode, icon: <Globe size={16} /> },
                  { label: 'Total', value: `₹${((mentor.sessionRate || 500) * duration / 60).toFixed(0)}`, icon: <CheckCircle2 size={16} /> },
                ].map(({ label, value, icon }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'var(--bg-alt)', borderRadius: 'var(--radius)' }}>
                    <span style={{ color: 'var(--primary)' }}>{icon}</span>
                    <span style={{ color: 'var(--text-muted)', minWidth: 80, fontSize: '0.875rem' }}>{label}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Nav buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          {step > 1 && <button onClick={() => setStep(s => s - 1)} className="btn btn-secondary" style={{ gap: 5 }}><ChevronLeft size={16} /> Back</button>}
          <button
            onClick={() => step < 4 ? setStep(s => s + 1) : handleConfirm()}
            disabled={
              (step === 2 && !selectedDate) ||
              (step === 3 && !selectedTime)
            }
            className="btn btn-primary"
            style={{ flex: 1, justifyContent: 'center', gap: 5 }}
          >
            {step === 4 ? <><CheckCircle2 size={16} /> Confirm Booking</> : <>Continue <ChevronRight size={16} /></>}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
