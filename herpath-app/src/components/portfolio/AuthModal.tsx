'use client';

import React from 'react';

type Theme = 'dark' | 'light';

interface AuthModalProps {
  theme: Theme;
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}

export function AuthModal({ theme, isOpen, onClose, onLogin, onRegister }: AuthModalProps) {
  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const overlayBg = isDark ? 'rgba(6, 21, 40, 0.75)' : 'rgba(0, 0, 0, 0.45)';
  const cardBg = isDark ? '#0F2344' : '#FFFFFF';
  const textColor = isDark ? '#FFFFFF' : '#111827';
  const secondaryColor = isDark ? '#C9D5E7' : '#374151';
  const goldColor = isDark ? '#D6B36A' : '#D4AF37';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: overlayBg,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: 24,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: cardBg,
          border: `1px solid ${borderColor}`,
          borderRadius: 24,
          padding: '36px 32px',
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          boxShadow: isDark ? '0 25px 60px -20px rgba(0,0,0,0.6)' : '0 25px 60px -20px rgba(0,0,0,0.2)',
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: isDark ? 'rgba(214,179,106,0.12)' : '#FFFBEB',
            border: `2px solid ${isDark ? 'rgba(214,179,106,0.3)' : '#FEF3C7'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={goldColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: textColor,
            margin: '0 0 8px 0',
            fontFamily: 'Poppins, Inter, system-ui, sans-serif',
          }}
        >
          Authentication Required
        </h3>

        {/* Reason */}
        <p
          style={{
            fontSize: '0.88rem',
            color: secondaryColor,
            lineHeight: 1.7,
            margin: '0 0 28px 0',
          }}
        >
          You need to be logged in to perform this action. Please log in or create a free account to continue.
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button
            onClick={onLogin}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 14,
              border: 'none',
              background: isDark
                ? 'linear-gradient(135deg, #D6B36A, #B8860B)'
                : 'linear-gradient(135deg, #D4AF37, #B8860B)',
              color: isDark ? '#0A1F3D' : '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Log In
          </button>
          <button
            onClick={onRegister}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: 14,
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : '#E5E7EB'}`,
              background: 'transparent',
              color: textColor,
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Create Free Account
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: secondaryColor,
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              padding: '8px 16px',
              transition: 'color 0.2s ease',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
