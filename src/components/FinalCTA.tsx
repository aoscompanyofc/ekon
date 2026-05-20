import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Zap } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const isReduced = useReducedMotion();

  // Pulse animation on the CTA button
  useGSAP(() => {
    if (isReduced) return;

    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 1 },
        {
          scale: 1.03,
          duration: 1.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        }
      );
    }
  }, { scope: containerRef });

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="py-16 md:py-20 bg-gradient-to-br from-ekon-purple to-ekon-purple-dark text-white border-t border-white/5 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6 bg-white/[0.03] p-8 md:p-12 rounded-3xl border border-white/10 relative">
          {/* Background Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,230,118,0.05),transparent_60%)] pointer-events-none rounded-3xl" />

          {/* Left Side (Text) */}
          <div className="text-center md:text-left max-w-xl relative z-10">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white leading-tight mb-3">
              Pare de pagar caro na sua conta de luz.
            </h2>
            <p className="text-base md:text-lg text-white/80 font-normal leading-relaxed">
              Economize agora com a <span className="text-ekon-green font-extrabold">Ekon Energia</span>!
            </p>
          </div>

          {/* Right Side (CTA Button) */}
          <div className="w-full md:w-auto relative z-10 flex flex-col items-center gap-3">
            <a
              ref={btnRef}
              href="#simular"
              onClick={(e) => handleScrollTo(e, '#simular')}
              className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 rounded-full bg-ekon-green hover:bg-ekon-green-light text-ekon-purple-dark font-extrabold text-base tracking-wider shadow-[0_6px_24px_rgba(0,230,118,0.4)] hover:shadow-[0_8px_30px_rgba(0,230,118,0.6)] transition-all duration-300"
            >
              <Zap className="w-5 h-5 fill-current" />
              QUERO ECONOMIZAR AGORA
            </a>
            <span className="text-xs text-white/50 font-medium">
              Simulação 100% gratuita
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
