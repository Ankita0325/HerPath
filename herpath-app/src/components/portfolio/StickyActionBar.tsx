'use client';

import React from 'react';

type Theme = 'dark' | 'light';

interface StickyActionBarProps {
  theme: Theme;
  startingPrice: string;
  liked: boolean;
  onLike: () => void;
  onShare: () => void;
  onCall: () => void;
}

export function StickyActionBar({ theme, startingPrice, liked, onLike, onShare, onCall }: StickyActionBarProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? 'rgba(6, 21, 40, 0.85)' : 'rgba(255, 255, 255, 0.85)';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';
  const secondaryColor = isDark ? '#C9D5E7' : '#374151';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '95%',
        maxWidth: 672,
        background: bg,
        backdropFilter: 'blur(24px) saturate(150%)',
        WebkitBackdropFilter: 'blur(24px) saturate(150%)',
        border: `1px solid ${borderColor}`,
        borderRadius: 999,
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        zIndex: 50,
        boxShadow: isDark ? '0 20px 50px -20px rgba(0,0,0,0.5)' : '0 20px 50px -20px rgba(0,0,0,0.15)',
      }}
    >
      {/* Starting price */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span
          style={{
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: isDark ? '#D6B36A' : '#D4AF37',
          }}
        >
          Starting at
        </span>
        <span
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: isDark ? '#FFFFFF' : '#111827',
            fontFamily: 'Space_Grotesk, Inter, system-ui, sans-serif',
          }}
        >
          {startingPrice}
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Like */}
        <button
          onClick={onLike}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: `1px solid ${borderColor}`,
            background: liked ? 'rgba(239, 68, 68, 0.12)' : 'transparent',
            color: liked ? '#EF4444' : secondaryColor,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          title="Like"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill={liked ? '#EF4444' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Share */}
        <button
          onClick={onShare}
          style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            border: `1px solid ${borderColor}`,
            background: 'transparent',
            color: secondaryColor,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          title="Share"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>

        {/* Call Now */}
        <button
          onClick={onCall}
          style={{
            height: 44,
            padding: '0 22px',
            borderRadius: 999,
            border: 'none',
            background: isDark
              ? 'linear-gradient(135deg, #D6B36A, #B8860B)'
              : 'linear-gradient(135deg, #2563EB, #1D4ED8)',
            color: '#FFFFFF',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all 0.2s ease',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          Call Now
        </button>
      </div>
    </div>
  );
}
