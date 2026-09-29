'use client';

import React from 'react';

type Theme = 'dark' | 'light';

interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
}

interface PortfolioReviewsProps {
  theme: Theme;
  reviews: Review[];
  ratingAverage: number;
  reviewsCount: number;
}

function RatingDistribution({ theme, distribution }: { theme: Theme; distribution: { stars: number; percentage: number }[] }) {
  const isDark = theme === 'dark';
  const barBg = isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {distribution.map(item => (
        <div key={item.stars} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.78rem', color: isDark ? '#C9D5E7' : '#374151', fontWeight: 600, minWidth: 20 }}>
            {item.stars}★
          </span>
          <div style={{ flex: 1, height: 6, background: barBg, borderRadius: 999, overflow: 'hidden' }}>
            <div
              style={{
                width: `${item.percentage}%`,
                height: '100%',
                background: isDark ? 'linear-gradient(90deg, #0F766E, #10B981)' : 'linear-gradient(90deg, #0F766E, #10B981)',
                borderRadius: 999,
              }}
            />
          </div>
          <span style={{ fontSize: '0.68rem', color: isDark ? '#94A7C4' : '#6B7280', minWidth: 32, textAlign: 'right' }}>
            {item.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}

export function PortfolioReviews({ theme, reviews, ratingAverage, reviewsCount }: PortfolioReviewsProps) {
  const isDark = theme === 'dark';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : '#E5E7EB';
  const textColor = isDark ? '#FFFFFF' : '#111827';
  const secondaryColor = isDark ? '#C9D5E7' : '#374151';
  const mutedColor = isDark ? '#94A7C4' : '#6B7280';
  const goldColor = isDark ? '#D6B36A' : '#D4AF37';

  const distribution = [
    { stars: 5, percentage: 65 },
    { stars: 4, percentage: 20 },
    { stars: 3, percentage: 10 },
    { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  return (
    <div
      style={{
        background: cardBg,
        border: `1px solid ${borderColor}`,
        borderRadius: 26,
        padding: 28,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={goldColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: goldColor,
          }}
        >
          Client Reviews
        </span>
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: isDark ? '#D6B36A' : '#D4AF37',
            background: isDark ? 'rgba(214,179,106,0.12)' : '#FFFBEB',
            border: `1px solid ${isDark ? 'rgba(214,179,106,0.25)' : '#FEF3C7'}`,
            padding: '4px 12px',
            borderRadius: 999,
          }}
        >
          {reviewsCount}
        </span>
      </div>

      {reviews.length === 0 ? (
        /* Empty state */
        <div
          style={{
            border: `2px dashed ${borderColor}`,
            borderRadius: 20,
            padding: '40px 24px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '0.9rem', color: mutedColor, fontWeight: 600 }}>No Reviews Yet</div>
          <div style={{ fontSize: '0.78rem', color: mutedColor, marginTop: 6 }}>
            Be the first to review this service
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 24 }}>
          {/* Rating Summary */}
          <div
            style={{
              padding: 24,
              background: isDark ? 'rgba(255,255,255,0.03)' : '#F9FAFB',
              border: `1px solid ${borderColor}`,
              borderRadius: 20,
            }}
          >
            <div
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 700,
                color: textColor,
                fontFamily: 'Space_Grotesk, Inter, system-ui, sans-serif',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              {ratingAverage.toFixed(1)}
            </div>
            <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={i < Math.round(ratingAverage) ? goldColor : 'none'}
                  stroke={goldColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <div style={{ fontSize: '0.78rem', color: mutedColor, marginBottom: 20 }}>
              Based on {reviewsCount} reviews
            </div>
            <RatingDistribution theme={theme} distribution={distribution} />
          </div>

          {/* Review List */}
          <div
            style={{
              maxHeight: 400,
              overflowY: 'auto',
              paddingRight: 8,
            }}
          >
            <style jsx>{`
              div::-webkit-scrollbar {
                width: 6px;
              }
              div::-webkit-scrollbar-track {
                background: transparent;
              }
              div::-webkit-scrollbar-thumb {
                background: ${isDark ? 'rgba(255,255,255,0.1)' : '#D1D5DB'};
                border-radius: 999;
              }
            `}</style>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {reviews.map(review => (
                <div
                  key={review.id}
                  style={{
                    padding: 18,
                    background: isDark ? 'rgba(255,255,255,0.03)' : '#F9FAFB',
                    border: `1px solid ${borderColor}`,
                    borderRadius: 16,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        background: isDark ? 'rgba(214,179,106,0.15)' : '#FEF3C7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: goldColor,
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        fontFamily: 'Space_Grotesk, Inter, system-ui, sans-serif',
                      }}
                    >
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: textColor, fontFamily: 'Poppins, Inter, system-ui, sans-serif' }}>
                        {review.name}
                      </div>
                      <div style={{ display: 'flex', gap: 2 }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg
                            key={i}
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill={i < review.rating ? goldColor : 'none'}
                            stroke={goldColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: mutedColor,
                      marginBottom: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {review.date}
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: secondaryColor,
                      lineHeight: 1.7,
                      background: isDark ? 'rgba(255,255,255,0.03)' : '#F8FAFC',
                      padding: 14,
                      borderRadius: 12,
                      border: `1px solid ${borderColor}`,
                    }}
                  >
                    {review.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
