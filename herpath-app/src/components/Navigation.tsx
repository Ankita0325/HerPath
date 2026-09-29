'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/lib/AppContext';
import {
  Home, BookOpen, Compass, Briefcase, User,
  LogOut, Sparkles, ChevronRight, X, Menu,
  TrendingUp,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/discover', label: 'Discover', icon: Compass },
  { href: '/portfolio', label: 'Portfolio', icon: TrendingUp },
  { href: '/opportunities', label: 'Opportunities', icon: Briefcase },
  { href: '/profile', label: 'Profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout, toggleAIPanel } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <aside className="sidebar" style={{
      width: 'var(--sidebar-width)',
      position: 'fixed',
      top: 0,
      left: 0,
      height: '100vh',
      background: 'var(--card)',
      borderRight: '1px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      boxShadow: 'var(--shadow-sm)',
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)' }}>
        <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <span style={{ color: 'white', fontWeight: 800, fontSize: '0.875rem', fontFamily: "'Plus Jakarta Sans'" }}>H</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: '1rem', color: 'var(--text)', letterSpacing: '-0.02em' }}>HerPath</div>
            <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', letterSpacing: '0.02em', lineHeight: 1 }}>Her Skills. Her Journey.</div>
          </div>
        </Link>
      </div>

      {/* Nav Items */}
      <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 12px',
              borderRadius: 'var(--radius)',
              marginBottom: '2px',
              color: active ? 'var(--primary)' : 'var(--text-muted)',
              background: active ? 'var(--accent-light)' : 'transparent',
              fontWeight: active ? 600 : 500,
              fontSize: '0.875rem',
              transition: 'all var(--transition)',
              textDecoration: 'none',
            }}
            onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'var(--bg-alt)'; (e.currentTarget as HTMLElement).style.color = 'var(--text)'; } }}
            onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; } }}
            >
              <Icon size={18} />
              <span>{label}</span>
              {active && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
            </Link>
          );
        })}
      </nav>

      {/* AI Button */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--border)' }}>
        <button
          onClick={toggleAIPanel}
          className="btn btn-primary w-full"
          style={{ justifyContent: 'center', gap: '8px' }}
        >
          <Sparkles size={16} />
          AI Assistant
        </button>
      </div>

      {/* User */}
      {user && (
        <div style={{ padding: '12px 16px 16px', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="avatar-placeholder avatar-md" style={{ background: user.avatarColor, color: 'white', fontSize: '0.75rem' }}>
            {user.initials}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.role}</div>
          </div>
          <button
            onClick={handleLogout}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px', borderRadius: 'var(--radius-sm)', display: 'flex', transition: 'color var(--transition)' }}
            title="Logout"
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--error)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
          >
            <LogOut size={16} />
          </button>
        </div>
      )}
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();
  const mobileItems = navItems.slice(0, 5);

  return (
    <nav className="mobile-nav">
      <div style={{ display: 'flex', width: '100%' }}>
        {mobileItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              padding: '8px 4px',
              color: active ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.625rem',
              fontWeight: active ? 600 : 500,
              transition: 'color var(--transition)',
              textDecoration: 'none',
            }}>
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function Topbar({ title, subtitle }: { title?: string; subtitle?: string }) {
  const { user, toggleAIPanel } = useApp();

  return (
    <div className="topbar">
      <div>
        {title && <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text)' }}>{title}</h1>}
        {subtitle && <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{subtitle}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={toggleAIPanel}
          style={{
            background: 'var(--accent-light)',
            border: '1px solid var(--accent-mid)',
            color: 'var(--primary)',
            borderRadius: 'var(--radius)',
            padding: '7px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all var(--transition)',
          }}
        >
          <Sparkles size={14} />
          <span className="hide-mobile">AI Assistant</span>
        </button>
        {user && (
          <div className="avatar-placeholder avatar-md" style={{ background: user.avatarColor, color: 'white', fontSize: '0.75rem', cursor: 'pointer' }}>
            {user.initials}
          </div>
        )}
      </div>
    </div>
  );
}
