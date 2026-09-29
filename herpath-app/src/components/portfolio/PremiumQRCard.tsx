'use client';

import React, { useRef } from 'react';

type Theme = 'dark' | 'light';

interface PremiumQRCardProps {
  theme: Theme;
  portfolioUrl: string;
}

export function PremiumQRCard({ theme, portfolioUrl }: PremiumQRCardProps) {
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'linear-gradient(135deg, #0A1F3D, #102B54, #061528)' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(212,175,55,0.35)' : '#E5E7EB';
  const textColor = isDark ? '#FFFFFF' : '#111827';
  const secondaryColor = isDark ? '#C9D5E7' : '#374151';
  const goldColor = isDark ? '#D6B36A' : '#D4AF37';
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(portfolioUrl)}`;

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 340;
    const height = 400;
    canvas.width = width;
    canvas.height = height;

    ctx.fillStyle = isDark ? '#061528' : '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, isDark ? '#0A1F3D' : '#F8FAFC');
    gradient.addColorStop(1, isDark ? '#061528' : '#EEF5FB');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = isDark ? '#D6B36A' : '#D4AF37';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.fillStyle = textColor;
    ctx.font = 'bold 18px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Scan to View Portfolio', width / 2, 50);

    ctx.fillStyle = secondaryColor;
    ctx.font = '12px Inter, sans-serif';
    ctx.fillText('HerPath Premium Service', width / 2, height - 30);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 70, 70, 200, 200);
      const link = document.createElement('a');
      link.download = 'portfolio-qr.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    img.src = qrImageUrl;
  };

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
      {/* Decorative blur circles */}
      <div
        style={{
          position: 'absolute',
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: isDark ? 'rgba(91,231,255,0.06)' : 'rgba(37,99,235,0.06)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -40,
          left: -40,
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: isDark ? 'rgba(214,179,106,0.06)' : 'rgba(212,175,55,0.06)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Thin gradient lines */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(214,179,106,0.4), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          background: isDark
            ? 'linear-gradient(90deg, transparent, rgba(214,179,106,0.4), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(37,99,235,0.3), transparent)',
          pointerEvents: 'none',
        }}
      />

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: 20 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: goldColor,
            border: `1px solid ${isDark ? 'rgba(214,179,106,0.35)' : 'rgba(212,175,55,0.4)'}`,
            padding: '6px 14px',
            borderRadius: 999,
            marginBottom: 12,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={goldColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          Premium QR
        </div>
        <h3
          style={{
            fontSize: '1.1rem',
            fontWeight: 700,
            color: textColor,
            margin: 0,
            fontFamily: 'Poppins, Inter, system-ui, sans-serif',
          }}
        >
          Scan to View Portfolio
        </h3>
      </div>

      {/* QR Image */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <div
          style={{
            padding: 12,
            borderRadius: 20,
            background: isDark ? 'rgba(255,255,255,0.04)' : '#F9FAFB',
            border: `2px solid ${goldColor}`,
            boxShadow: isDark ? '0 0 30px rgba(214,179,106,0.15)' : '0 0 30px rgba(212,175,55,0.1)',
            position: 'relative',
          }}
        >
          {/* Corner accents */}
          <div
            style={{
              position: 'absolute',
              top: -4,
              left: -4,
              width: 16,
              height: 16,
              borderTop: `3px solid ${goldColor}`,
              borderLeft: `3px solid ${goldColor}`,
              borderRadius: '8px 0 0 0',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              width: 16,
              height: 16,
              borderTop: `3px solid ${goldColor}`,
              borderRight: `3px solid ${goldColor}`,
              borderRadius: '0 8px 0 0',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -4,
              left: -4,
              width: 16,
              height: 16,
              borderBottom: `3px solid ${goldColor}`,
              borderLeft: `3px solid ${goldColor}`,
              borderRadius: '0 0 0 8px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: -4,
              right: -4,
              width: 16,
              height: 16,
              borderBottom: `3px solid ${goldColor}`,
              borderRight: `3px solid ${goldColor}`,
              borderRadius: '0 0 8px 0',
            }}
          />

          <img
            src={qrImageUrl}
            alt="Portfolio QR Code"
            width={160}
            height={160}
            style={{ display: 'block' }}
          />
        </div>
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: 14,
          border: `1px solid ${borderColor}`,
          background: isDark ? 'rgba(255,255,255,0.05)' : '#F9FAFB',
          color: textColor,
          fontSize: '0.8rem',
          fontWeight: 700,
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'all 0.2s ease',
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download QR
      </button>

      {/* Hidden canvas for download */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
