'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

type Theme = 'dark' | 'light';

interface SharedNavbarProps {
  theme: Theme;
  activeTab: 'poster' | 'portfolio';
  onThemeToggle: () => void;
}

export function SharedNavbar({ theme, activeTab, onThemeToggle }: SharedNavbarProps) {
  const router = useRouter();
  const isDark = theme === 'dark';

  const tabs = [
    { id: 'poster' as const, label: 'Poster', href: '/dashboard/portfolio/poster' },
    { id: 'portfolio' as const, label: 'Portfolio', href: '/portfolio' },
  ];

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: isDark ? 'rgba(6, 21, 40, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}`,
      }}
    >
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => router.push(tab.href)}
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: activeTab === tab.id ? (isDark ? '#D6B36A' : '#5C1F2E') : (isDark ? '#94A7C4' : '#6B7280'),
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 16px',
                borderRadius: 8,
                transition: 'all 0.2s ease',
                borderBottom: activeTab === tab.id ? `2px solid ${isDark ? '#D6B36A' : '#5C1F2E'}` : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={onThemeToggle}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}`,
            background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
            color: isDark ? '#D6B36A' : '#D4AF37',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
}
