'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/AppLayout';
import { currentUser, projects } from '@/data/mockData';
import { PortfolioHero } from '@/components/portfolio/PortfolioHero';
import { PortfolioInfo } from '@/components/portfolio/PortfolioInfo';
import { PortfolioProvider } from '@/components/portfolio/PortfolioProvider';
import { PortfolioReviews } from '@/components/portfolio/PortfolioReviews';
import { SharePortfolio } from '@/components/portfolio/SharePortfolio';
import { PremiumQRCard } from '@/components/portfolio/PremiumQRCard';
import { StickyActionBar } from '@/components/portfolio/StickyActionBar';
import { AuthModal } from '@/components/portfolio/AuthModal';
import { SharedNavbar } from '@/components/SharedNavbar';
import { Share2, Eye, Heart, Star, MessageCircle } from 'lucide-react';

type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'portfolio_theme';

export default function PortfolioPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      return stored === 'dark' || stored === 'light' ? stored : 'light';
    }
    return 'light';
  });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [viewCount] = useState(1247);
  const [showShare, setShowShare] = useState(false);

  const portfolioId = 'portfolio-riya-sharma';
  const portfolioUrl = `https://herpath.app/portfolio/${portfolioId}`;
  const shareText = `Check out ${currentUser.name}'s portfolio on HerPath!\n\nServices: Digital Marketing, Canva Design, Video Editing\nLocation: ${currentUser.location}\nRating: 4.9 (120+ reviews)\n\nView portfolio: ${portfolioUrl}`;
  const startingPrice = '₹999/session';

  const reviews = [
    {
      id: 'r1',
      name: 'Priya Sharma',
      rating: 5,
      date: '2026-09-15',
      text: 'Excellent work! Riya designed a complete brand identity for my bakery business. Very professional and creative.',
    },
    {
      id: 'r2',
      name: 'Anjali Verma',
      rating: 5,
      date: '2026-09-02',
      text: 'Great digital marketing strategy. Riya helped me understand social media in a way that was easy to implement.',
    },
    {
      id: 'r3',
      name: 'Sneha Kapoor',
      rating: 4,
      date: '2026-08-20',
      text: 'Good video editing skills. Delivered the project on time and was open to revisions.',
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  const handleLike = () => {
    if (typeof window !== 'undefined' && !localStorage.getItem('auth_token')) {
      setShowAuthModal(true);
      return;
    }
    setLiked(prev => !prev);
  };

  if (typeof window === 'undefined') {
    return (
      <AppLayout>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: '0.88rem', color: '#9A8A7B' }}>Loading portfolio...</div>
        </div>
      </AppLayout>
    );
  }

  const isDark = theme === 'dark';
  const pageBg = isDark ? '#061528' : '#F4EFE6';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB';

  return (
    <AppLayout>
      <div style={{ background: pageBg, minHeight: '100vh', fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif" }}>
        <style jsx>{`
          .pf-main-grid {
            display: grid;
            gap: 24px;
            grid-template-columns: 1fr;
          }
          @media (min-width: 1024px) {
            .pf-main-grid {
              grid-template-columns: repeat(3, 1fr);
            }
            .pf-left-col {
              grid-column: span 2;
            }
          }
        `}</style>

        <SharedNavbar theme={theme} activeTab="portfolio" onThemeToggle={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')} />

        {/* Main Content */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 24px 120px' }}>
          <PortfolioHero
            theme={theme}
            category="Digital Creator"
            rating={4.9}
            reviewsCount={120}
          />

          <div className="pf-main-grid" style={{ display: 'grid', gap: 24 }}>
            {/* Left Column */}
            <div className="pf-left-col" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <PortfolioInfo
                theme={theme}
                bio={currentUser.bio}
                languages={currentUser.languages}
                availability={currentUser.availability}
                serviceModes={['Online', 'In-person', 'Hybrid']}
                description={currentUser.bio}
              />

              {/* Trust Statistics */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 16,
                }}
              >
                {[
                  { label: 'Views', value: String(viewCount), icon: <Eye size={18} /> },
                  { label: 'Likes', value: liked ? '90' : '89', icon: <Heart size={18} /> },
                  { label: 'Reviews', value: '120', icon: <MessageCircle size={18} /> },
                  { label: 'Avg Rating', value: '4.9', icon: <Star size={18} /> },
                ].map(stat => (
                  <div
                    key={stat.label}
                    style={{
                      background: cardBg,
                      border: `1px solid ${borderColor}`,
                      borderRadius: 20,
                      padding: '18px 16px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ color: isDark ? '#D6B36A' : '#D4AF37', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
                      {stat.icon}
                    </div>
                    <div
                      style={{
                        fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                        fontWeight: 700,
                        color: isDark ? '#FFFFFF' : '#111827',
                        fontFamily: 'Space_Grotesk, Inter, system-ui, sans-serif',
                        lineHeight: 1,
                        marginBottom: 6,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        color: isDark ? '#94A7C4' : '#6B7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.16em',
                        fontWeight: 600,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <PortfolioReviews
                theme={theme}
                reviews={reviews}
                ratingAverage={4.9}
                reviewsCount={120}
              />
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <PortfolioProvider
                theme={theme}
                user={{
                  name: currentUser.name,
                  initials: currentUser.initials,
                  avatarColor: currentUser.avatarColor,
                  location: currentUser.location,
                  rating: 4.9,
                  memberSince: '2024',
                  bio: currentUser.bio,
                  languages: currentUser.languages,
                  availability: currentUser.availability,
                  servicesCount: projects.length,
                  reviewsCount: 120,
                  isVerified: currentUser.isVerified ?? true,
                }}
              />

              <PremiumQRCard theme={theme} portfolioUrl={portfolioUrl} />
              <SharePortfolio theme={theme} portfolioUrl={portfolioUrl} shareText={shareText} />
            </div>
          </div>
        </div>

        {/* Sticky Action Bar */}
        <StickyActionBar
          theme={theme}
          startingPrice={startingPrice}
          liked={liked}
          onLike={handleLike}
          onShare={() => setShowShare(true)}
          onCall={() => window.open('tel:+919876543210', '_self')}
        />

        {/* Share Modal */}
        {showShare && (
          <div
            onClick={() => setShowShare(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: isDark ? 'rgba(6, 21, 40, 0.75)' : 'rgba(0, 0, 0, 0.45)',
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
                background: isDark ? '#0F2344' : '#FFFFFF',
                border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB'}`,
                borderRadius: 24,
                padding: '32px 28px',
                maxWidth: 480,
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    background: isDark ? 'rgba(214,179,106,0.12)' : '#FFFBEB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Share2 size={18} color={isDark ? '#D6B36A' : '#D4AF37'} />
                </div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: isDark ? '#D6B36A' : '#D4AF37',
                  }}
                >
                  Share Portfolio
                </span>
              </div>
              <SharePortfolio theme={theme} portfolioUrl={portfolioUrl} shareText={shareText} />
            </div>
          </div>
        )}

        {/* Auth Modal */}
        <AuthModal
          theme={theme}
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={() => {
            setShowAuthModal(false);
            router.push('/Auth?redirect=/portfolio');
          }}
          onRegister={() => {
            setShowAuthModal(false);
            router.push('/Auth?mode=register&redirect=/portfolio');
          }}
        />
      </div>
    </AppLayout>
  );
}
