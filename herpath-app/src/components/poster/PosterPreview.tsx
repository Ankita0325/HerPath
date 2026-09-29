'use client';

import React, { useRef } from 'react';
import { PosterTemplate, PosterTemplateProps } from '@/components/poster/PosterTemplate';

export function PosterPreview({ isOpen, onClose, service, portfolioUrl }: {
  isOpen: boolean;
  onClose: () => void;
  service: Omit<PosterTemplateProps, 'portfolioUrl'>;
  portfolioUrl: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.6)',
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
          background: '#FFFFFF',
          borderRadius: 24,
          padding: '28px 24px',
          maxWidth: 480,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 60px -20px rgba(0,0,0,0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#5C1F2E', marginBottom: 4 }}>Poster Generator</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#241410', fontFamily: 'Inter, sans-serif' }}>Live Preview</div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid #E5E7EB',
              background: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6B7280',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div
          style={{
            background: '#F4EFE6',
            borderRadius: 20,
            padding: 24,
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <div style={{ transform: 'scale(0.9)', transformOrigin: 'center', width: '100%', maxWidth: service.posterWidth || 360 }}>
            <PosterTemplate {...service} portfolioUrl={portfolioUrl} />
          </div>
        </div>

        <PosterDownload service={service} portfolioUrl={portfolioUrl} />
      </div>
    </div>
  );
}

function PosterDownload({ service, portfolioUrl }: { service: Omit<PosterTemplateProps, 'portfolioUrl'>; portfolioUrl: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseWidth = service.posterWidth || 360;
    const baseHeight = service.posterHeight || 504;
    const scale = 800 / baseWidth;
    const width = Math.round(baseWidth * scale);
    const height = Math.round(baseHeight * scale);
    canvas.width = width;
    canvas.height = height;

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#F4EFE6');
    gradient.addColorStop(0.5, '#FCF8F1');
    gradient.addColorStop(1, '#EDE6D8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#241410';
    ctx.font = `bold ${Math.round(18 * scale)}px Inter, sans-serif`;
    ctx.textAlign = 'left';
    ctx.fillText('HERPATH', Math.round(60 * scale), Math.round(80 * scale));

    ctx.fillStyle = '#5C1F2E';
    ctx.font = `bold ${Math.round(10 * scale)}px Inter, sans-serif`;
    ctx.textAlign = 'right';
    ctx.fillText('PREMIUM SERVICE', width - Math.round(60 * scale), Math.round(80 * scale));

    ctx.strokeStyle = '#D9CDB8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.round(60 * scale), Math.round(100 * scale));
    ctx.lineTo(width - Math.round(60 * scale), Math.round(100 * scale));
    ctx.stroke();

    const typography = service.typography || 'modern';
    const fontFamily = service.titleFontFamily || (typography === 'professional' ? 'Georgia, serif' : typography === 'minimal' ? 'Courier New, monospace' : 'Inter, sans-serif');
    const titleWeight = service.titleFontWeight || (typography === 'bold' ? '900' : 'bold');
    const titleSize = Math.round((service.titleFontSize || (typography === 'bold' ? 38 : 32)) * scale);

    ctx.fillStyle = '#241410';
    ctx.font = `${titleWeight} ${titleSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    const title = service.title || 'Premium Service';
    const maxTitleWidth = width - Math.round(120 * scale);
    const words = title.split(' ');
    const lines: string[] = [];
    let currentLine = '';
    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTitleWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) lines.push(currentLine);
    const titleY = Math.round(160 * scale);
    lines.forEach((line, i) => {
      ctx.fillText(line, width / 2, titleY + i * Math.round(40 * scale));
    });

    if (service.startingPrice !== null && service.priceUnit) {
      const priceText = `₹${service.startingPrice} / ${service.priceUnit}`;
      const priceWidth = ctx.measureText(priceText).width + Math.round(40 * scale);
      ctx.fillStyle = 'rgba(92, 31, 46, 0.08)';
      ctx.beginPath();
      ctx.roundRect((width - priceWidth) / 2, titleY + lines.length * Math.round(40 * scale) + Math.round(20 * scale), priceWidth, Math.round(40 * scale), Math.round(12 * scale));
      ctx.fill();
      ctx.fillStyle = '#5C1F2E';
      ctx.font = `bold ${Math.round(16 * scale)}px Inter, sans-serif`;
      ctx.fillText(priceText, width / 2, titleY + lines.length * Math.round(40 * scale) + Math.round(45 * scale));
    }

    const bodyFont = service.bodyFontFamily || 'Inter, sans-serif';
    ctx.fillStyle = '#5A4A3F';
    ctx.font = `${Math.round(16 * scale)}px ${bodyFont}`;
    const desc = service.description || 'Professional service tailored to your needs.';
    const descLines: string[] = [];
    let descLine = '';
    const descWords = desc.split(' ');
    for (const word of descWords) {
      const test = descLine ? `${descLine} ${word}` : word;
      if (ctx.measureText(test).width > width - Math.round(160 * scale) && descLine) {
        descLines.push(descLine);
        descLine = word;
      } else {
        descLine = test;
      }
    }
    if (descLine) descLines.push(descLine);
    const descY = titleY + lines.length * Math.round(40 * scale) + Math.round(100 * scale);
    descLines.slice(0, 4).forEach((line, i) => {
      ctx.fillText(line, width / 2, descY + i * Math.round(26 * scale));
    });

    ctx.fillStyle = '#8B1A1A';
    ctx.font = `${Math.round(14 * scale)}px ${bodyFont}`;
    ctx.fillText(`📍 ${service.location || 'India'}`, width / 2, descY + descLines.slice(0, 4).length * Math.round(26 * scale) + Math.round(20 * scale));

    ctx.strokeStyle = '#D9CDB8';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(Math.round(60 * scale), descY + descLines.slice(0, 4).length * Math.round(26 * scale) + Math.round(50 * scale));
    ctx.lineTo(width - Math.round(60 * scale), descY + descLines.slice(0, 4).length * Math.round(26 * scale) + Math.round(50 * scale));
    ctx.stroke();

    const qrSize = Math.round(130 * scale);
    const qrX = width - Math.round(60 * scale) - qrSize;
    const qrY = descY + descLines.slice(0, 4).length * Math.round(26 * scale) + Math.round(80 * scale);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(portfolioUrl)}`;

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.roundRect(qrX - Math.round(10 * scale), qrY - Math.round(10 * scale), qrSize + Math.round(20 * scale), qrSize + Math.round(20 * scale), Math.round(12 * scale));
    ctx.fill();
    ctx.strokeStyle = '#D9CDB8';
    ctx.lineWidth = 1;
    ctx.stroke();

    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.onload = () => {
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

      ctx.fillStyle = '#241410';
      ctx.font = `bold ${Math.round(12 * scale)}px Inter, sans-serif`;
      ctx.textAlign = 'left';
      ctx.fillText('📞 CONTACT PROVIDER', Math.round(60 * scale), qrY + Math.round(20 * scale));

      ctx.fillStyle = '#5C1F2E';
      ctx.font = `bold ${Math.round(16 * scale)}px Inter, sans-serif`;
      ctx.fillText(service.contactNumbers[0] || '', Math.round(60 * scale), qrY + Math.round(44 * scale));

      if (service.contactNumbers[1]) {
        ctx.fillStyle = '#5A4A3F';
        ctx.font = `${Math.round(14 * scale)}px Inter, sans-serif`;
        ctx.fillText(service.contactNumbers[1], Math.round(60 * scale), qrY + Math.round(66 * scale));
      }

      ctx.fillStyle = '#5C1F2E';
      ctx.font = `bold ${Math.round(14 * scale)}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('Scan QR to view public portfolio page', width / 2, qrY + qrSize + Math.round(40 * scale));

      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${Math.round(16 * scale)}px Inter, sans-serif`;
      const ctaText = service.ctaText || 'BOOK NOW';
      const ctaWidth = ctx.measureText(ctaText).width + Math.round(40 * scale);
      ctx.beginPath();
      ctx.roundRect((width - ctaWidth) / 2, qrY + qrSize + Math.round(60 * scale), ctaWidth, Math.round(44 * scale), Math.round(12 * scale));
      ctx.fillStyle = '#5C1F2E';
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(ctaText, width / 2, qrY + qrSize + Math.round(88 * scale));

      const link = document.createElement('a');
      const cleanTitle = (service.title || 'portfolio').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
      link.download = `${cleanTitle}-poster.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    qrImg.src = qrUrl;
  };

  return (
    <div style={{ border: '1px solid #E5E7EB', borderRadius: 16, padding: 16 }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5C1F2E', marginBottom: 12, textAlign: 'center' }}>
        Export Poster
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {[
          { label: 'PNG', format: 'png' as const },
          { label: 'JPG', format: 'jpg' as const },
          { label: 'PDF', format: 'pdf' as const },
          { label: 'SHARE', format: 'share' as const },
        ].map(btn => (
          <button
            key={btn.format}
            onClick={handleDownload}
            style={{
              padding: '12px 14px',
              borderRadius: 12,
              border: '1px solid #D9CDB8',
              background: '#FCF8F1',
              color: '#241410',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#5C1F2E';
              (e.currentTarget as HTMLButtonElement).style.color = '#FBF7EF';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#5C1F2E';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = '#FCF8F1';
              (e.currentTarget as HTMLButtonElement).style.color = '#241410';
              (e.currentTarget as HTMLButtonElement).style.borderColor = '#D9CDB8';
            }}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
