'use client';

import React, { useMemo } from 'react';

type Theme = 'dark' | 'light';

interface PortfolioHeroProps {
  theme: Theme;
  category: string;
  rating: number;
  reviewsCount: number;
}

function TwinkleStar({ delay, left, top, size }: { delay: number; left: string; top: string; size: number }) {
  return (
    <div
      className="pf-star"
      style={{
        position: 'absolute',
        left,
        top,
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.9)',
        animation: `pf-twinkle ${2 + delay}s ease-in-out ${delay}s infinite`,
        boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.6)`,
      }}
    />
  );
}

function GoldSparkle({ delay, left, top }: { delay: number; left: string; top: string }) {
  return (
    <div
      className="pf-sparkle"
      style={{
        position: 'absolute',
        left,
        top,
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: '#D6B36A',
        animation: `pf-float ${4 + delay}s ease-in-out ${delay}s infinite`,
        boxShadow: '0 0 10px #D6B36A',
      }}
    />
  );
}

export function PortfolioHero({ theme, category, rating, reviewsCount }: PortfolioHeroProps) {
  const isDark = theme === 'dark';
  const bgGradient = isDark
    ? 'linear-gradient(135deg, #071A35 0%, #0F2D5C 50%, #174A88 100%)'
    : 'linear-gradient(135deg, #FFFFFF 0%, #EEF6FF 50%, #DCEEFF 100%)';
  const textColor = isDark ? '#FFFFFF' : '#111827';
  const subtitleColor = isDark ? 'rgba(255,255,255,0.75)' : '#374151';
  const starColor = isDark ? '#D6B36A' : '#D4AF37';

  const stars = useMemo(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: `${(i * 37 + 11) % 100}%`,
      top: `${(i * 53 + 17) % 100}%`,
      size: 1 + (i % 3),
      delay: (i % 5),
    })), []);

  const sparkles = useMemo(() =>
    Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: `${10 + (i * 23) % 80}%`,
      top: `${10 + (i * 31) % 80}%`,
      delay: (i % 8),
    })), []);

  return (
    <div
      className="pf-hero"
      style={{
        position: 'relative',
        height: 420,
        borderRadius: 32,
        background: bgGradient,
        overflow: 'hidden',
        marginBottom: 32,
      }}
    >
      <style jsx>{`
        .pf-hero * { -webkit-font-smoothing: antialiased; }
        .pf-hero {
          font-family: 'Inter', 'Plus Jakarta Sans', system-ui, sans-serif;
        }
        @keyframes pf-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes pf-float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(5px); }
        }
        @keyframes pf-wave {
          0% { transform: translateX(-100%) rotate(0deg); }
          100% { transform: translateX(100%) rotate(360deg); }
        }
      `}</style>

      {/* Dotted grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }}
      />

      {/* Glass blur circles */}
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: '50%',
          background: isDark ? 'rgba(91, 231, 255, 0.08)' : 'rgba(37, 99, 235, 0.08)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -100,
          left: -60,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: isDark ? 'rgba(214, 179, 106, 0.08)' : 'rgba(214, 179, 106, 0.08)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Large SVG wave circle */}
      <svg
        style={{
          position: 'absolute',
          bottom: -120,
          right: -120,
          width: 600,
          height: 600,
          opacity: 0.08,
          animation: 'pf-wave 20s linear infinite',
          pointerEvents: 'none',
        }}
        viewBox="0 0 600 600"
      >
        <circle cx="300" cy="300" r="280" fill="none" stroke="white" strokeWidth="1" strokeDasharray="8 12" />
      </svg>

      {/* Twinkling stars */}
      {stars.map(star => (
        <TwinkleStar key={star.id} {...star} />
      ))}

      {/* Gold sparkle particles */}
      {sparkles.map(sparkle => (
        <GoldSparkle key={sparkle.id} {...sparkle} />
      ))}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}
      >
        {/* Premium pills */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: isDark ? '#D6B36A' : '#D4AF37',
              border: `1px solid ${isDark ? 'rgba(214,179,106,0.4)' : 'rgba(212,175,55,0.4)'}`,
              padding: '6px 14px',
              borderRadius: 999,
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: isDark ? '#5BE7FF' : '#2563EB',
              border: `1px solid ${isDark ? 'rgba(91,231,255,0.4)' : 'rgba(37,99,235,0.4)'}`,
              padding: '6px 14px',
              borderRadius: 999,
            }}
          >
            Verified Partner
          </span>
        </div>

        {/* Main heading */}
        <h1
          style={{
            fontFamily: "'DM_Serif_Display', 'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            color: textColor,
            margin: '0 0 20px 0',
            maxWidth: 900,
          }}
        >
          Creative <span style={{ color: isDark ? '#D6B36A' : '#2563EB' }}>Portfolio</span>
        </h1>

        {/* Location + Rating pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'}`,
            padding: '8px 16px',
            borderRadius: 999,
            marginBottom: 16,
          }}
        >
          <span style={{ fontSize: '0.78rem', color: subtitleColor, fontWeight: 500 }}>
            Mumbai, India
          </span>
          <span style={{ width: 1, height: 14, background: isDark ? 'rgba(255,255,255,0.2)' : '#E5E7EB' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: starColor, fontSize: '0.85rem' }}>★</span>
            <span style={{ fontSize: '0.78rem', color: textColor, fontWeight: 600 }}>{rating.toFixed(1)}</span>
            <span style={{ fontSize: '0.72rem', color: subtitleColor }}>({reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
            color: subtitleColor,
            maxWidth: 600,
            lineHeight: 1.7,
            margin: '0 auto 24px',
          }}
        >
          Expert {category} with {reviewsCount}+ satisfied clients. Transforming ideas into stunning digital experiences.
        </p>

        {/* Gradient divider */}
        <div
          style={{
            width: 120,
            height: 2,
            background: isDark
              ? 'linear-gradient(90deg, transparent, #D6B36A, transparent)'
              : 'linear-gradient(90deg, transparent, #2563EB, transparent)',
            borderRadius: 999,
            margin: '0 auto 24px',
          }}
        />

        {/* Stats pills */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: 'Views', value: '1.2K' },
            { label: 'Likes', value: '89' },
            { label: 'Reviews', value: String(reviewsCount) },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)'}`,
                padding: '8px 14px',
                borderRadius: 12,
              }}
            >
              <span style={{ fontSize: '0.68rem', color: subtitleColor, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                {stat.label}
              </span>
              <span style={{ fontSize: '0.85rem', color: textColor, fontWeight: 700 }}>{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
