'use client';

import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { currentUser } from '@/data/mockData';
import { PosterTemplate } from '@/components/poster/PosterTemplate';
import { PosterPreview } from '@/components/poster/PosterPreview';
import { SharedNavbar } from '@/components/SharedNavbar';

type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'portfolio_theme';

const TEMPLATES = [
  { id: 'business', name: 'Modern Business', description: 'Corporate blue-gradient design', orientation: 'portrait' },
  { id: 'local', name: 'Local Service', description: 'Clean layout highlighting location', orientation: 'portrait' },
  { id: 'tutor', name: 'Tutor & Education', description: 'Friendly scholastic aesthetic', orientation: 'portrait' },
  { id: 'freelancer', name: 'Freelancer Portfolio', description: 'High-tech clean dark theme', orientation: 'portrait' },
  { id: 'dark', name: 'Premium Dark', description: 'Luxe gold-bordered dark style', orientation: 'portrait' },
  { id: 'whatsapp', name: 'WhatsApp Status', description: 'Optimized 9:16 vertical layout', orientation: 'portrait-tall' },
  { id: 'instaStory', name: 'Instagram Story', description: 'Vibrant story layout (9:16)', orientation: 'portrait-tall' },
  { id: 'instaPost', name: 'Instagram Post', description: 'Square layout (1:1)', orientation: 'square' },
  { id: 'flyer', name: 'Print Flyer', description: 'Classic structured flyer (A4)', orientation: 'portrait' },
  { id: 'minimal', name: 'Minimal Professional', description: 'Ultra-clean serif design', orientation: 'portrait' },
];

const TYPOGRAPHY_OPTIONS = [
  { id: 'modern', label: 'Modern (Sans-serif)' },
  { id: 'professional', label: 'Professional (Serif)' },
  { id: 'bold', label: 'High-Impact (Bold Capitalized)' },
  { id: 'minimal', label: 'Technical (Monospace)' },
];

const CTA_OPTIONS = [
  { id: 'Call Now', label: 'Call Now' },
  { id: 'Book Today', label: 'Book Today' },
  { id: 'Contact Us', label: 'Contact Us' },
  { id: 'Hire Now', label: 'Hire Now' },
];

const ORIENTATION_OPTIONS = [
  { id: 'portrait', label: 'Portrait (1:1.4)' },
  { id: 'portrait-tall', label: 'Portrait Tall (9:16)' },
  { id: 'square', label: 'Square (1:1)' },
  { id: 'landscape', label: 'Landscape' },
];

export default function PosterGeneratorPage() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored === 'dark' || stored === 'light' ? stored : 'light';
    }
    return 'light';
  });
  const [selectedTemplate, setSelectedTemplate] = useState('business');
  const [orientation, setOrientation] = useState('portrait');
  const [typography, setTypography] = useState('modern');
  const [ctaText, setCtaText] = useState('Call Now');
  const [showPreview, setShowPreview] = useState(false);
  const [previewGenerating, setPreviewGenerating] = useState(false);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setOrientation(template.orientation);
    }
  };

  const posterSize = (() => {
    if (orientation === 'square') return { posterWidth: 380, posterHeight: 380 };
    if (orientation === 'landscape') return { posterWidth: 520, posterHeight: 320 };
    if (orientation === 'portrait-tall') return { posterWidth: 320, posterHeight: 560 };
    return { posterWidth: 360, posterHeight: 504 };
  })();

  const typographyStyles = (() => {
    if (typography === 'professional') return { titleFontFamily: 'Georgia, serif', bodyFontFamily: 'Georgia, serif', titleFontWeight: '700', titleFontSize: 24, letterSpacing: 0 };
    if (typography === 'bold') return { titleFontFamily: 'Inter, sans-serif', bodyFontFamily: 'Inter, sans-serif', titleFontWeight: '900', titleFontSize: 28, uppercase: true, letterSpacing: 1.5 };
    if (typography === 'minimal') return { titleFontFamily: 'Courier New, monospace', bodyFontFamily: 'Courier New, monospace', titleFontWeight: '700', titleFontSize: 20, letterSpacing: 2.5 };
    return { titleFontFamily: 'Inter, system-ui, sans-serif', bodyFontFamily: 'Inter, system-ui, sans-serif', titleFontWeight: '800', titleFontSize: 22, letterSpacing: 0 };
  })();

  const service = {
    id: currentUser.id,
    title: `${currentUser.role} Services`,
    category: 'Digital Creator',
    description: currentUser.bio,
    starting_price: 999,
    price_unit: 'session',
    city: currentUser.location,
    area: null,
    contact_numbers: ['+91 98765 43210', '+91 87654 32109'],
    typography,
    ctaText,
    orientation,
    ...posterSize,
    ...typographyStyles,
  };

  const portfolioUrl = `https://herpath.app/u/${currentUser.id}`;

  const isDark = theme === 'dark';

  return (
    <AppLayout>
      <div style={{ background: isDark ? '#061528' : '#F4EFE6', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
        <SharedNavbar theme={theme} activeTab="poster" onThemeToggle={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} />

        {/* Main Content */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 24px 120px' }}>
          <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr' }} className="pf-poster-grid">
            {/* Left Column - Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}`,
                  borderRadius: 26,
                  padding: 28,
                }}
              >
                <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: isDark ? '#D6B36A' : '#D4AF37', marginBottom: 20 }}>
                  Template Selection
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                  {TEMPLATES.map(template => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateChange(template.id)}
                      style={{
                        padding: '16px 18px',
                        borderRadius: 16,
                        border: `1px solid ${selectedTemplate === template.id ? (isDark ? '#D6B36A' : '#5C1F2E') : (isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB')}`,
                        background: selectedTemplate === template.id ? (isDark ? 'rgba(214,179,106,0.12)' : '#FCF8F1') : (isDark ? 'rgba(255,255,255,0.03)' : '#F9FAFB'),
                        color: isDark ? '#FFFFFF' : '#241410',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>{template.name}</div>
                      <div style={{ fontSize: '0.68rem', color: isDark ? '#94A7C4' : '#6B7280', marginBottom: 8 }}>{template.description}</div>
                      <div style={{ fontSize: '0.62rem', color: isDark ? '#D6B36A' : '#5C1F2E', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>
                        {template.orientation}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}`,
                  borderRadius: 26,
                  padding: 28,
                }}
              >
                <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: isDark ? '#D6B36A' : '#D4AF37', marginBottom: 20 }}>
                  Orientation
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
                  {ORIENTATION_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setOrientation(opt.id)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: 12,
                        border: `1px solid ${orientation === opt.id ? (isDark ? '#D6B36A' : '#5C1F2E') : (isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB')}`,
                        background: orientation === opt.id ? (isDark ? 'rgba(214,179,106,0.12)' : '#FCF8F1') : (isDark ? 'rgba(255,255,255,0.03)' : '#F9FAFB'),
                        color: isDark ? '#FFFFFF' : '#241410',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}`,
                  borderRadius: 26,
                  padding: 28,
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: isDark ? '#D6B36A' : '#D4AF37', marginBottom: 12 }}>
                      Typography
                    </div>
                    <select
                      value={typography}
                      onChange={e => setTypography(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 12,
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}`,
                        background: isDark ? 'rgba(255,255,255,0.03)' : '#F9FAFB',
                        color: isDark ? '#FFFFFF' : '#241410',
                        fontSize: '0.82rem',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                      }}
                    >
                      {TYPOGRAPHY_OPTIONS.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: isDark ? '#D6B36A' : '#D4AF37', marginBottom: 12 }}>
                      CTA Text
                    </div>
                    <select
                      value={ctaText}
                      onChange={e => setCtaText(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 12,
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}`,
                        background: isDark ? 'rgba(255,255,255,0.03)' : '#F9FAFB',
                        color: isDark ? '#FFFFFF' : '#241410',
                        fontSize: '0.82rem',
                        fontFamily: 'Inter, sans-serif',
                        cursor: 'pointer',
                      }}
                    >
                      {CTA_OPTIONS.map(opt => (
                        <option key={opt.id} value={opt.id}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div
                style={{
                  background: isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}`,
                  borderRadius: 26,
                  padding: 28,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: isDark ? '#D6B36A' : '#D4AF37', marginBottom: 4 }}>
                      Live Mockup Preview
                    </div>
                    <div style={{ fontSize: '0.82rem', color: isDark ? '#94A7C4' : '#6B7280' }}>
                      {TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setPreviewGenerating(true);
                      setTimeout(() => {
                        setPreviewGenerating(false);
                        setShowPreview(true);
                      }, 900);
                    }}
                    style={{
                      padding: '10px 20px',
                      borderRadius: 12,
                      border: 'none',
                      background: isDark ? 'linear-gradient(135deg, #D6B36A, #B8860B)' : 'linear-gradient(135deg, #5C1F2E, #8B3A4A)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >
                    Generate Poster
                  </button>
                </div>

                <div
                  style={{
                    background: isDark ? 'rgba(255,255,255,0.03)' : '#F9FAFB',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#E5E7EB'}`,
                    borderRadius: 20,
                    padding: 32,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 500,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {previewGenerating && (
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        gap: 16,
                      }}
                    >
                      <div
                        style={{
                          width: '80%',
                          height: 2,
                          background: isDark ? 'rgba(214,179,106,0.3)' : 'rgba(92,31,46,0.3)',
                          position: 'relative',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background: isDark ? '#D6B36A' : '#5C1F2E',
                            animation: 'pf-laser 1.5s ease-in-out infinite',
                          }}
                        />
                        <style jsx>{`
                          @keyframes pf-laser {
                            0% { transform: translateX(-100%); }
                            100% { transform: translateX(100%); }
                          }
                        `}</style>
                      </div>
                      <div
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          letterSpacing: '0.18em',
                          textTransform: 'uppercase',
                          color: '#FFFFFF',
                        }}
                      >
                        Generating Poster...
                      </div>
                    </div>
                  )}

                  <div style={{ transform: 'scale(0.85)', transformOrigin: 'center', width: '100%', maxWidth: 360 }}>
                    <PosterTemplate
                      title={service.title}
                      category={service.category}
                      description={service.description}
                      startingPrice={service.starting_price}
                      priceUnit={service.price_unit}
                      location={service.city}
                      contactNumbers={service.contact_numbers || []}
                      portfolioUrl={portfolioUrl}
                      providerName={currentUser.name}
                      ratingAverage={4.9}
                      templateId={selectedTemplate}
                      typography={typography}
                      ctaText={ctaText}
                      orientation={orientation}
                      posterWidth={posterSize.posterWidth}
                      posterHeight={posterSize.posterHeight}
                      titleFontFamily={typographyStyles.titleFontFamily}
                      titleFontWeight={typographyStyles.titleFontWeight}
                      titleFontSize={typographyStyles.titleFontSize}
                      bodyFontFamily={typographyStyles.bodyFontFamily}
                      uppercase={typographyStyles.uppercase}
                      letterSpacing={typographyStyles.letterSpacing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        <PosterPreview
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          service={{
            title: service.title,
            category: service.category,
            description: service.description,
            startingPrice: service.starting_price,
            priceUnit: service.price_unit,
            location: service.city,
            contactNumbers: service.contact_numbers || [],
            typography: service.typography,
            ctaText: service.ctaText,
            orientation: service.orientation,
            posterWidth: service.posterWidth,
            posterHeight: service.posterHeight,
            titleFontFamily: service.titleFontFamily,
            titleFontWeight: service.titleFontWeight,
            titleFontSize: service.titleFontSize,
            bodyFontFamily: service.bodyFontFamily,
            uppercase: service.uppercase,
            letterSpacing: service.letterSpacing,
          }}
          portfolioUrl={portfolioUrl}
        />
      </div>
    </AppLayout>
  );
}
