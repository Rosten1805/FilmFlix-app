'use client';

import { useState, useEffect } from 'react';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<'splash' | 'fadeout' | 'done'>(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('splash-shown')) {
      return 'done';
    }
    return 'splash';
  });

  useEffect(() => {
    if (phase === 'done') return;
    sessionStorage.setItem('splash-shown', '1');
    const fadeTimer = setTimeout(() => setPhase('fadeout'), 3800);
    const doneTimer = setTimeout(() => setPhase('done'), 4600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [phase]);

  if (phase === 'done') return <>{children}</>;

  return (
    <>
      <div style={{ visibility: phase === 'splash' ? 'hidden' : 'visible' }}>
        {children}
      </div>

      <div
        className={`splash-overlay ${phase === 'fadeout' ? 'splash-fadeout' : ''}`}
      >
        <div className="splash-text-container">
          {'FILMFLIX'.split('').map((letter, i) => (
            <span key={i} className="splash-letter" style={{ animationDelay: `${i * 0.08}s` }}>
              {letter}
            </span>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .splash-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          background: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s ease-out;
        }

        .splash-fadeout {
          opacity: 0;
          pointer-events: none;
        }

        .splash-text-container {
          display: flex;
          align-items: center;
          gap: 0;
          will-change: transform, opacity;
          animation: splash-zoom 3.8s cubic-bezier(0.2, 0, 0.2, 1) forwards;
        }

        .splash-letter {
          font-family: var(--font-bebas-neue), 'Bebas Neue', sans-serif;
          font-size: clamp(4rem, 12vw, 10rem);
          font-weight: 400;
          color: #e50914;
          text-transform: uppercase;
          position: relative;
          display: inline-block;
          opacity: 0;
          will-change: transform, opacity, filter;
          animation: splash-letter-appear 0.6s ease-out forwards;
          text-shadow:
            0 0 20px rgba(229, 9, 20, 0.4),
            0 0 60px rgba(229, 9, 20, 0.2);
        }

        @keyframes splash-letter-appear {
          0% {
            opacity: 0;
            transform: scale(0.6) translateY(20px);
            filter: brightness(0.3);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) translateY(-2px);
            filter: brightness(1.4);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: brightness(1);
          }
        }

        @keyframes splash-zoom {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
          65% {
            transform: scale(1.08);
            opacity: 1;
          }
          100% {
            transform: scale(50);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
