'use client';

import React from 'react';

export interface PosterTemplateProps {
  title: string;
  category: string;
  description: string;
  startingPrice: number | null;
  priceUnit: string | null;
  location: string;
  contactNumbers: string[];
  portfolioUrl: string;
  providerName?: string;
  ratingAverage?: number;
  templateId?: string;
  typography?: string;
  ctaText?: string;
  orientation?: string;
  posterWidth?: number;
  posterHeight?: number;
  titleFontFamily?: string;
  titleFontWeight?: string | number;
  titleFontSize?: number;
  bodyFontFamily?: string;
  uppercase?: boolean;
  letterSpacing?: number;
}

const clean = (value: string, fallback = '') => {
  const cleaned = value.replace(/damusia/gi, 'HerPath');
  return cleaned.trim() || fallback;
};

export function PosterTemplate({
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  category: _category,
  description,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startingPrice: _startingPrice,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  priceUnit: _priceUnit,
  location,
  contactNumbers,
  portfolioUrl,
  providerName = 'Verified Provider',
  ratingAverage = 4.9,
  templateId = 'business',
  typography = 'modern',
  ctaText = 'Call Now',
  posterWidth = 360,
  posterHeight = 504,
  titleFontFamily = 'Inter, system-ui, sans-serif',
  titleFontWeight = '800',
  titleFontSize = 22,
  bodyFontFamily = 'Inter, system-ui, sans-serif',
  uppercase = false,
  letterSpacing = 0,
}: PosterTemplateProps) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(portfolioUrl)}`;
  const mainContact = contactNumbers[0] || '';
  const cleanTitle = clean(title, 'Premium Service');
  const cleanDescription = clean(description, 'Professional service tailored to your needs.');
  const cleanProvider = clean(providerName, 'Verified Provider');

  const typographyClass =
    typography === 'professional'
      ? 'font-serif tracking-normal'
      : typography === 'bold'
        ? 'font-sans font-black tracking-tighter uppercase'
        : typography === 'minimal'
          ? 'font-mono tracking-widest uppercase'
          : 'font-sans tracking-tight';

  const containerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: posterWidth,
    minHeight: posterHeight,
    background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #eff6ff 100%)',
    color: '#0f172a',
    fontFamily: bodyFontFamily,
    padding: Math.round(posterWidth * 0.09),
    display: 'flex',
    flexDirection: 'column',
    gap: Math.round(posterWidth * 0.07),
    position: 'relative',
    overflow: 'hidden',
    borderRadius: Math.round(posterWidth * 0.06),
    boxSizing: 'border-box',
  };

  const titleStyle: React.CSSProperties = {
    fontSize: titleFontSize,
    fontWeight: titleFontWeight,
    lineHeight: 1.15,
    color: '#0f172a',
    marginBottom: Math.round(posterWidth * 0.03),
    fontFamily: titleFontFamily,
    textTransform: uppercase ? 'uppercase' : 'none',
    letterSpacing,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: Math.round(titleFontSize * 0.55),
    color: '#475569',
    letterSpacing: 0.15,
    textTransform: 'uppercase',
    fontWeight: 600,
    fontFamily: bodyFontFamily,
  };

  const templates: Record<string, React.ReactNode> = {
    business: (
      <div
        className={typographyClass}
        style={containerStyle}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 40, right: 40, width: 180, height: 180, borderRadius: '50%', background: '#3b82f6' }} />
          <div style={{ position: 'absolute', bottom: 60, left: 20, width: 140, height: 140, borderRadius: '50%', background: '#2563eb' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.2, color: '#1e293b' }}>HERPATH</div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.25, color: '#ffffff', background: '#2563eb', padding: '6px 12px', borderRadius: 999, textTransform: 'uppercase' }}>
            Premium Service
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={titleStyle}>{cleanTitle}</div>
          <div style={subtitleStyle}>Professional • Trusted • Personalized Service</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.7)', border: '1px solid #e2e8f0', padding: '10px 14px', borderRadius: 16 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706', fontSize: 14 }}>★</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{ratingAverage.toFixed(1)}</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>(245 Reviews)</div>
          </div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>📞</div>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.15, fontWeight: 700 }}>Contact Provider</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{cleanProvider}</div>
            <div style={{ fontSize: 12, color: '#2563eb', fontWeight: 600, marginTop: 2 }}>{mainContact}</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <img src={qrCodeUrl} alt="QR" width={56} height={56} style={{ borderRadius: 12, border: '1px solid #e2e8f0', background: '#ffffff' }} />
          <button style={{ flex: 1, padding: '12px 18px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: 0.15, textTransform: 'uppercase', cursor: 'pointer' }}>
            {ctaText}
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center', letterSpacing: 0.2, textTransform: 'uppercase', fontWeight: 600 }}>
          www.herpath.in • support@herpath.in • Insta: @herpath
        </div>
      </div>
    ),
    local: (
      <div
        className={typographyClass}
        style={{
          width: '100%',
          minHeight: '100%',
          background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #ecfdf5 100%)',
          color: '#042f2e',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 30, right: 30, width: 120, height: 120, borderRadius: '50%', border: '2px solid #0d9488' }} />
          <div style={{ position: 'absolute', bottom: 40, left: 30, width: 100, height: 100, borderRadius: '50%', border: '2px solid #14b8a6' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.2, color: '#134e4a' }}>HERPATH</div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.25, color: '#ffffff', background: '#0d9488', padding: '6px 12px', borderRadius: 999, textTransform: 'uppercase' }}>
            Premium Service
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={titleStyle}>{cleanTitle}</div>
          <div style={subtitleStyle}>Trusted • Professional • Personalized</div>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#0f766e', background: '#ccfbf1', padding: '6px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: 0.15 }}>📍 {location}</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#0f766e', background: '#ccfbf1', padding: '6px 10px', borderRadius: 999, textTransform: 'uppercase', letterSpacing: 0.15 }}>Online & On-site</span>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f0fdfa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d9488' }}>📞</div>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.15, fontWeight: 700 }}>Contact Provider</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#042f2e', marginTop: 2 }}>{cleanProvider}</div>
            <div style={{ fontSize: 12, color: '#0d9488', fontWeight: 600, marginTop: 2 }}>{mainContact}</div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {['Trusted', 'Experienced', 'Personalized', 'Local'].map(badge => (
            <div key={badge} style={{ textAlign: 'center', padding: '10px 8px', background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#0f766e', textTransform: 'uppercase', letterSpacing: 0.15 }}>{badge}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <img src={qrCodeUrl} alt="QR" width={56} height={56} style={{ borderRadius: 12, border: '1px solid #d1fae5', background: '#ffffff' }} />
          <button style={{ flex: 1, padding: '12px 18px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #0d9488, #0f766e)', color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: 0.15, textTransform: 'uppercase', cursor: 'pointer' }}>
            {ctaText}
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center', letterSpacing: 0.2, textTransform: 'uppercase', fontWeight: 600 }}>
          www.herpath.in • support@herpath.in • Insta: @herpath
        </div>
      </div>
    ),
    tutor: (
      <div
        className={typographyClass}
        style={{
          width: '100%',
          minHeight: '100%',
          background: 'linear-gradient(135deg, #fffbeb 0%, #ffffff 50%, #f0fdf4 100%)',
          color: '#1f2937',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 30, right: 30, width: 140, height: 140, borderRadius: '50%', background: '#84cc16' }} />
          <div style={{ position: 'absolute', bottom: 40, left: 20, width: 120, height: 120, borderRadius: '50%', background: '#f59e0b' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.2, color: '#1f2937' }}>HERPATH</div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.25, color: '#ffffff', background: 'linear-gradient(135deg, #65a30d, #2563eb)', padding: '6px 12px', borderRadius: 999, textTransform: 'uppercase' }}>
            Premium Service
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={titleStyle}>{cleanTitle}</div>
          <div style={subtitleStyle}>Learn • Grow • Succeed</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {['Qualified', 'Personalized', 'Proven', 'Flexible'].map(badge => (
            <div key={badge} style={{ textAlign: 'center', padding: '10px 8px', background: '#ffffff', border: '1px solid #fde68a', borderRadius: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: 0.15 }}>{badge}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #fde68a', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>📞</div>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.15, fontWeight: 700 }}>Contact Provider</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginTop: 2 }}>{cleanProvider}</div>
            <div style={{ fontSize: 12, color: '#d97706', fontWeight: 600, marginTop: 2 }}>{mainContact}</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <img src={qrCodeUrl} alt="QR" width={56} height={56} style={{ borderRadius: 12, border: '1px solid #fde68a', background: '#ffffff' }} />
          <button style={{ flex: 1, padding: '12px 18px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #65a30d, #2563eb)', color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: 0.15, textTransform: 'uppercase', cursor: 'pointer' }}>
            {ctaText}
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center', letterSpacing: 0.2, textTransform: 'uppercase', fontWeight: 600 }}>
          www.herpath.in • support@herpath.in • Insta: @herpath
        </div>
      </div>
    ),
    freelancer: (
      <div
        className={typographyClass}
        style={{
          width: '100%',
          minHeight: '100%',
          background: 'linear-gradient(135deg, #05080f 0%, #0b1120 50%, #0f172a 100%)',
          color: '#e2e8f0',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 20, right: 20, width: 160, height: 160, borderRadius: '50%', border: '1px solid rgba(59,130,246,0.35)' }} />
          <div style={{ position: 'absolute', bottom: 30, left: 20, width: 120, height: 120, borderRadius: '50%', border: '1px solid rgba(139,92,246,0.35)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.2, color: '#f8fafc' }}>HERPATH</div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.25, color: '#ffffff', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', padding: '6px 12px', borderRadius: 999, textTransform: 'uppercase' }}>
            Premium Service
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 12, color: '#94a3b8', letterSpacing: 0.2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 6 }}>Hello, I&apos;m a</div>
          <div style={{ fontSize: titleFontSize, fontWeight: titleFontWeight, lineHeight: 1.15, background: 'linear-gradient(90deg, #ffffff, #93c5fd)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontFamily: titleFontFamily }}>{cleanTitle}</div>
          <div style={{ fontSize: 12, color: '#cbd5e1', letterSpacing: 0.15, textTransform: 'uppercase', fontWeight: 600, marginTop: 6 }}>Design • Build • Deliver</div>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', padding: '8px 14px', borderRadius: 999, alignSelf: 'flex-start' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#93c5fd', textTransform: 'uppercase', letterSpacing: 0.2 }}>Available Worldwide</span>
        </div>
        <div style={{ background: 'rgba(30,41,59,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', fontSize: 12, fontWeight: 700 }}>
            {cleanProvider.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.15, fontWeight: 700 }}>Contact Provider</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginTop: 2 }}>{cleanProvider}</div>
            <div style={{ fontSize: 12, color: '#93c5fd', fontWeight: 600, marginTop: 2 }}>{mainContact}</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <img src={qrCodeUrl} alt="QR" width={48} height={48} style={{ borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)', background: '#0f172a' }} />
          <button style={{ flex: 1, padding: '12px 18px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: 0.15, textTransform: 'uppercase', cursor: 'pointer' }}>
            {ctaText}
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center', letterSpacing: 0.2, textTransform: 'uppercase', fontWeight: 600 }}>
          www.herpath.in • support@herpath.in • Insta: @herpath
        </div>
      </div>
    ),
    dark: (
      <div
        className={typographyClass}
        style={{
          width: '100%',
          minHeight: '100%',
          background: 'linear-gradient(135deg, #08111f 0%, #0a0a0a 50%, #0f1a2e 100%)',
          color: '#f8fafc',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 20, right: 20, width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(212,175,55,0.35)' }} />
          <div style={{ position: 'absolute', bottom: 30, left: 20, width: 140, height: 140, borderRadius: '50%', border: '1px solid rgba(37,99,235,0.35)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <div>
            <div style={{ fontSize: 12, color: '#d4af37', letterSpacing: 0.25, textTransform: 'uppercase', fontWeight: 700, marginBottom: 4 }}>Work. Connect. Grow.</div>
            <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.2, color: '#f8fafc' }}>HERPATH</div>
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.25, color: '#0a0a0a', background: 'linear-gradient(135deg, #d4af37, #2563eb)', padding: '6px 12px', borderRadius: 999, textTransform: 'uppercase' }}>
            Premium Service
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 12, color: '#d4af37', letterSpacing: 0.25, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Hello, I&apos;m a</div>
          <div style={titleStyle}>{cleanTitle}</div>
          <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg, #d4af37, #2563eb)', borderRadius: 999, marginBottom: 8 }} />
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)', padding: '8px 14px', borderRadius: 999 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d4af37' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#d4af37', textTransform: 'uppercase', letterSpacing: 0.2 }}>Available Worldwide</span>
          </div>
        </div>
        <div style={{ background: 'rgba(15,26,46,0.4)', backdropFilter: 'blur(12px)', border: '1px solid rgba(212,175,55,0.25)', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #d4af37, #2563eb)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0a0a0a', fontSize: 12, fontWeight: 700 }}>
            {cleanProvider.charAt(0)}
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.15, fontWeight: 700 }}>Contact Provider</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f8fafc', marginTop: 2 }}>{cleanProvider}</div>
            <div style={{ fontSize: 12, color: '#d4af37', fontWeight: 600, marginTop: 2 }}>{mainContact}</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <img src={qrCodeUrl} alt="QR" width={56} height={56} style={{ borderRadius: 10, border: '1px solid rgba(212,175,55,0.35)', background: '#0a0a0a' }} />
          <button style={{ flex: 1, padding: '12px 18px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #d4af37, #2563eb)', color: '#0a0a0a', fontSize: 12, fontWeight: 700, letterSpacing: 0.15, textTransform: 'uppercase', cursor: 'pointer' }}>
            {ctaText}
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#64748b', textAlign: 'center', letterSpacing: 0.2, textTransform: 'uppercase', fontWeight: 600 }}>
          www.herpath.in • support@herpath.in • Insta: @herpath
        </div>
      </div>
    ),
    whatsapp: (
      <div
        className={typographyClass}
        style={{
          width: '100%',
          minHeight: '100%',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0f1a0f 50%, #142814 100%)',
          color: '#f0fdf4',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 20, right: 20, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.5), transparent 70%)' }} />
        </div>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#f0fdf4', marginBottom: 4 }}>{cleanTitle}</div>
          <div style={{ fontSize: 10, color: '#6ee7b7', letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 700 }}>Concepts • Clarity • Confidence</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {['Expert Tutors', 'Better Understanding', 'Concept Clarity', 'Higher Scores'].map(feature => (
            <div key={feature} style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 16, padding: '14px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#6ee7b7', textTransform: 'uppercase', letterSpacing: 0.15 }}>{feature}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6ee7b7' }}>📞</div>
          <div>
            <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 0.15, fontWeight: 700 }}>Contact Provider</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f0fdf4', marginTop: 2 }}>{cleanProvider}</div>
            <div style={{ fontSize: 12, color: '#d4af37', fontWeight: 600, marginTop: 2 }}>{mainContact}</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <img src={qrCodeUrl} alt="QR" width={56} height={56} style={{ borderRadius: 12, border: '1px solid rgba(16,185,129,0.35)', background: '#0a0a0a' }} />
          <button style={{ flex: 1, padding: '12px 18px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #10b981, #d4af37)', color: '#0a0a0a', fontSize: 12, fontWeight: 700, letterSpacing: 0.15, textTransform: 'uppercase', cursor: 'pointer' }}>
            {ctaText} NOW
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#6ee7b7', textAlign: 'center', letterSpacing: 0.2, textTransform: 'uppercase', fontWeight: 600 }}>
          Your Success, Our Mission.
        </div>
      </div>
    ),
    instaStory: (
      <div
        className={typographyClass}
        style={{
          width: '100%',
          minHeight: '100%',
          background: 'linear-gradient(135deg, #fcfaff 0%, #f7f3ff 50%, #ede2ff 100%)',
          color: '#1f2937',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 22,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 20, right: 20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(124,58,237,0.12)', filter: 'blur(20px)' }} />
          <div style={{ position: 'absolute', bottom: 30, left: 10, width: 120, height: 120, borderRadius: '50%', background: 'rgba(236,72,153,0.12)', filter: 'blur(20px)' }} />
        </div>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#1f2937', marginBottom: 4 }}>{cleanTitle}</div>
          <div style={{ fontSize: 10, color: '#7c3aed', letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 700 }}>Creative • Vibrant • Bold</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e9d5ff', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>✨</div>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.15, fontWeight: 700 }}>Featured Creator</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1f2937', marginTop: 2 }}>{cleanProvider}</div>
            <div style={{ fontSize: 12, color: '#7c3aed', fontWeight: 600, marginTop: 2 }}>{mainContact}</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <img src={qrCodeUrl} alt="QR" width={56} height={56} style={{ borderRadius: 12, border: '1px solid #e9d5ff', background: '#ffffff' }} />
          <button style={{ flex: 1, padding: '12px 18px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: 0.15, textTransform: 'uppercase', cursor: 'pointer' }}>
            {ctaText}
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center', letterSpacing: 0.2, textTransform: 'uppercase', fontWeight: 600 }}>
          www.herpath.in • support@herpath.in • Insta: @herpath
        </div>
      </div>
    ),
    instaPost: (
      <div
        className={typographyClass}
        style={{
          width: '100%',
          aspectRatio: '1/1',
          background: 'linear-gradient(135deg, #fdfaff 0%, #f5f3ff 50%, #ede9fe 100%)',
          color: '#1f2937',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: 28,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
        }}
      >
        <div style={{ position: 'absolute', top: 20, right: 20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(124,58,237,0.12)', filter: 'blur(18px)', pointerEvents: 'none' }} />
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.2, color: '#1f2937' }}>HERPATH</div>
        <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.2, color: '#1f2937' }}>{cleanTitle}</div>
        <div style={{ background: '#ffffff', border: '1px solid #e9d5ff', borderRadius: 16, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>✨</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#1f2937' }}>{cleanProvider}</div>
            <div style={{ fontSize: 11, color: '#7c3aed', fontWeight: 600 }}>{mainContact}</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <img src={qrCodeUrl} alt="QR" width={48} height={48} style={{ borderRadius: 10, border: '1px solid #e9d5ff', background: '#ffffff' }} />
          <button style={{ flex: 1, padding: '10px 14px', borderRadius: 12, border: 'none', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', color: '#ffffff', fontSize: 11, fontWeight: 700, letterSpacing: 0.15, textTransform: 'uppercase', cursor: 'pointer' }}>
            {ctaText}
          </button>
        </div>
      </div>
    ),
    flyer: (
      <div
        className={typographyClass}
        style={{
          width: '100%',
          minHeight: '100%',
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
          color: '#0f172a',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
        }}
      >
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 30, right: 30, width: 160, height: 160, borderRadius: '50%', border: '1px solid #cbd5e1' }} />
          <div style={{ position: 'absolute', bottom: 30, left: 30, width: 120, height: 120, borderRadius: '50%', border: '1px solid #cbd5e1' }} />
        </div>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: 10, color: '#64748b', letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Official Flyer</div>
          <div style={titleStyle}>{cleanTitle}</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18 }}>
          <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.7 }}>{cleanDescription}</div>
        </div>
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 18, padding: 18, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>📞</div>
          <div>
            <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 0.15, fontWeight: 700 }}>Contact Provider</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginTop: 2 }}>{cleanProvider}</div>
            <div style={{ fontSize: 12, color: '#2563eb', fontWeight: 600, marginTop: 2 }}>{mainContact}</div>
          </div>
        </div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <img src={qrCodeUrl} alt="QR" width={56} height={56} style={{ borderRadius: 12, border: '1px solid #e2e8f0', background: '#ffffff' }} />
          <button style={{ flex: 1, padding: '12px 18px', borderRadius: 14, border: 'none', background: '#0f172a', color: '#ffffff', fontSize: 12, fontWeight: 700, letterSpacing: 0.15, textTransform: 'uppercase', cursor: 'pointer' }}>
            {ctaText}
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#94a3b8', textAlign: 'center', letterSpacing: 0.2, textTransform: 'uppercase', fontWeight: 600 }}>
          www.herpath.in • support@herpath.in • Insta: @herpath
        </div>
      </div>
    ),
    minimal: (
      <div
        className={typographyClass}
        style={{
          width: '100%',
          minHeight: '100%',
          background: '#ffffff',
          color: '#1f2937',
          fontFamily: 'Inter, system-ui, sans-serif',
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 24,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: 0.2, color: '#1f2937' }}>HERPATH</div>
        <div style={{ width: 40, height: 2, background: '#1f2937', borderRadius: 999 }} />
        <div style={titleStyle}>{cleanTitle}</div>
        <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.7 }}>{cleanDescription}</div>
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <img src={qrCodeUrl} alt="QR" width={56} height={56} style={{ borderRadius: 12, border: '1px solid #e5e7eb', background: '#ffffff' }} />
          <button style={{ flex: 1, padding: '12px 18px', borderRadius: 14, border: '1px solid #1f2937', background: 'transparent', color: '#1f2937', fontSize: 12, fontWeight: 700, letterSpacing: 0.15, textTransform: 'uppercase', cursor: 'pointer' }}>
            {ctaText}
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center', letterSpacing: 0.2, textTransform: 'uppercase', fontWeight: 600 }}>
          www.herpath.in • support@herpath.in • Insta: @herpath
        </div>
      </div>
    ),
  };

  return (
    <div style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}>
      {templates[templateId] || templates.business}
    </div>
  );
}
