'use client';

import React from 'react';

type Theme = 'dark' | 'light';

interface PortfolioInfoProps {
  theme: Theme;
  bio: string;
  languages: string[];
  availability: string[];
  serviceModes: string[];
  description: string;
}

export function PortfolioInfo({ theme, bio, languages, availability, serviceModes, description }: PortfolioInfoProps) {
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB';
  const textColor = isDark ? '#FFFFFF' : '#111827';
  const secondaryColor = isDark ? '#C9D5E7' : '#374151';
  const mutedColor = isDark ? 'rgba(255,255,255,0.5)' : '#6B7280';

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      {/* About Service */}
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
        {/* Decorative background circles */}
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: '50%',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)'}`,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -60,
            left: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}`,
            pointerEvents: 'none',
          }}
        />

        {/* Gold dot pattern */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            width: 60,
            height: 60,
            backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.15) 1px, transparent 1px)',
            backgroundSize: '8px 8px',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: isDark ? 'rgba(91,231,255,0.12)' : '#EFF6FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#5BE7FF' : '#2563EB'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            </div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: isDark ? '#5BE7FF' : '#2563EB',
              }}
            >
              About Service
            </span>
          </div>

          <p
            style={{
              fontSize: '0.92rem',
              lineHeight: 1.8,
              color: secondaryColor,
              margin: '0 0 20px 0',
            }}
          >
            {description || bio}
          </p>

          {/* Languages */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: isDark ? 'rgba(20,184,166,0.12)' : '#F0FDFA',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#5BE7FF' : '#14B8A6'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <span style={{ fontSize: '0.82rem', color: textColor, fontWeight: 600 }}>
              Languages: {languages.join(', ')}
            </span>
          </div>

          {/* Availability */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: isDark ? 'rgba(214,179,106,0.12)' : '#FFFBEB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#D6B36A' : '#D4AF37'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <span style={{ fontSize: '0.82rem', color: textColor, fontWeight: 600 }}>
              Available: {availability.join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Service Modes */}
      <div
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 26,
          padding: 28,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background: isDark ? 'rgba(91,231,255,0.12)' : '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDark ? '#5BE7FF' : '#2563EB'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </div>
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: isDark ? '#5BE7FF' : '#2563EB',
            }}
          >
            Service Modes
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {serviceModes.map(mode => (
            <div
              key={mode}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                background: isDark ? 'rgba(37,99,235,0.12)' : '#EFF6FF',
                border: `1px solid ${isDark ? 'rgba(37,99,235,0.25)' : '#DBEAFE'}`,
                color: isDark ? '#5BE7FF' : '#2563EB',
                fontSize: '0.85rem',
                fontWeight: 600,
                textAlign: 'center',
              }}
            >
              {mode}
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            marginTop: 20,
            padding: '14px 16px',
            background: isDark ? 'rgba(255,255,255,0.04)' : '#F9FAFB',
            borderRadius: 16,
            border: `1px solid ${borderColor}`,
          }}
        >
          {['Satisfaction 100%', 'Support 24/7', 'Verified ✓'].map(indicator => (
            <div
              key={indicator}
              style={{
                flex: 1,
                textAlign: 'center',
                fontSize: '0.72rem',
                color: mutedColor,
                fontWeight: 600,
                letterSpacing: '0.04em',
              }}
            >
              {indicator}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
