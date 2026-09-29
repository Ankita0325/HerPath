'use client';

import React from 'react';

type Theme = 'dark' | 'light';

interface PortfolioProviderProps {
  theme: Theme;
  user: {
    name: string;
    initials: string;
    avatarColor: string;
    location: string;
    rating: number;
    memberSince: string;
    bio: string;
    languages: string[];
    availability: string[];
    servicesCount: number;
    reviewsCount: number;
    isVerified: boolean;
  };
}

export function PortfolioProvider({ theme, user }: PortfolioProviderProps) {
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(212,175,55,0.25)' : '#E5E7EB';
  const goldColor = isDark ? '#D6B36A' : '#D4AF37';
  const textColor = isDark ? '#FFFFFF' : '#111827';
  const secondaryColor = isDark ? '#C9D5E7' : '#374151';
  const mutedColor = isDark ? '#94A7C4' : '#6B7280';

  return (
    <div
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 26,
        padding: 28,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            background: isDark ? 'rgba(214,179,106,0.12)' : '#FFFBEB',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={goldColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: goldColor }}>
            Service Provider
          </div>
          <div style={{ fontSize: '0.68rem', color: mutedColor, fontWeight: 600, letterSpacing: '0.08em' }}>
            Verified professional on HerPath
          </div>
        </div>
      </div>

      {/* Profile card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '18px 20px',
          background: isDark ? 'rgba(255,255,255,0.03)' : '#F9FAFB',
          border: `1px solid ${borderColor}`,
          borderRadius: 20,
          marginBottom: 20,
        }}
      >
        {/* Avatar with gradient ring */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              padding: 3,
              background: isDark
                ? 'linear-gradient(135deg, #0F766E, #10B981, #14B8A6)'
                : 'linear-gradient(135deg, #0F766E, #10B981, #14B8A6)',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: user.avatarColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontFamily: 'Space_Grotesk, Inter, system-ui, sans-serif',
                fontSize: '1.25rem',
                fontWeight: 700,
              }}
            >
              {user.initials}
            </div>
          </div>
          {user.isVerified && (
            <div
              style={{
                position: 'absolute',
                bottom: 2,
                right: 2,
                width: 22,
                height: 22,
                borderRadius: '50%',
                background: isDark ? '#0F766E' : '#0F766E',
                border: `2px solid ${isDark ? '#0A1F3D' : '#FFFFFF'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 700, color: textColor, marginBottom: 4, fontFamily: 'Poppins, Inter, system-ui, sans-serif' }}>
            {user.name}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: secondaryColor, display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {user.location}
            </span>
            <span style={{ fontSize: '0.78rem', color: secondaryColor, display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={goldColor} stroke={goldColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {user.rating.toFixed(1)}
            </span>
            <span style={{ fontSize: '0.78rem', color: secondaryColor, display: 'flex', alignItems: 'center', gap: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Since {user.memberSince}
            </span>
          </div>
        </div>
      </div>

      {/* About */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={goldColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: textColor }}>About</span>
        </div>
        <p style={{ fontSize: '0.85rem', color: secondaryColor, lineHeight: 1.7, margin: 0 }}>{user.bio}</p>
      </div>

      {/* Languages */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#5BE7FF' : '#14B8A6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {user.languages.map(lang => (
            <span
              key={lang}
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                color: isDark ? '#5BE7FF' : '#14B8A6',
                background: isDark ? 'rgba(20,184,166,0.12)' : '#F0FDFA',
                border: `1px solid ${isDark ? 'rgba(20,184,166,0.25)' : '#CCFBF1'}`,
                padding: '3px 10px',
                borderRadius: 999,
              }}
            >
              {lang}
            </span>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={goldColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {user.availability.map(slot => (
            <span
              key={slot}
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                color: isDark ? '#D6B36A' : '#D4AF37',
                background: isDark ? 'rgba(214,179,106,0.12)' : '#FFFBEB',
                border: `1px solid ${isDark ? 'rgba(214,179,106,0.25)' : '#FEF3C7'}`,
                padding: '3px 10px',
                borderRadius: 999,
              }}
            >
              {slot}
            </span>
          ))}
        </div>
      </div>

      {/* Statistics row */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          padding: '14px 16px',
          background: isDark ? 'rgba(255,255,255,0.03)' : '#F9FAFB',
          border: `1px solid ${borderColor}`,
          borderRadius: 16,
        }}
      >
        {[
          { label: 'Services', value: String(user.servicesCount) },
          { label: 'Reviews', value: String(user.reviewsCount) },
          { label: 'Verified', value: '✓' },
        ].map(stat => (
          <div key={stat.label} style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: textColor, fontFamily: 'Space_Grotesk, Inter, system-ui, sans-serif' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.62rem', color: mutedColor, textTransform: 'uppercase', letterSpacing: '0.14em', fontWeight: 600, marginTop: 2 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
