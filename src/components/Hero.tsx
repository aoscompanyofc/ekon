import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { XOctagon, Wrench, Home, Zap } from 'lucide-react';

const HOUSE_IMG = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=90&w=1800&auto=format&fit=crop';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced) return;

    if (badgesRef.current) {
      gsap.fromTo(
        badgesRef.current.children,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { autoAlpha: 0, scale: 0.9, y: 20 },
        { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: 'back.out(1.5)', delay: 0.6 }
      );
    }
  }, { scope: containerRef });

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 text-white flex items-center overflow-hidden"
    >
      {/* ── Background: house image ── */}
      <img
        src={HOUSE_IMG}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.45]"
      />

      {/* ── Purple gradient overlay — cobre tudo no mobile, só esquerda no desktop ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-ekon-purple-dark via-ekon-purple-dark/90 to-ekon-purple-dark/50 md:to-ekon-purple-dark/20" />

      {/* ── Radial green glow top-right ── */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,230,118,0.12),transparent_50%)]" />

      {/* ── Green neon roof lines ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M900 700 L1200 350 L1440 550"
          stroke="#00E676"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
          filter="url(#glow)"
        />
        <path
          d="M1200 350 L1200 200"
          stroke="#00E676"
          strokeWidth="2"
          strokeDasharray="6 5"
          opacity="0.45"
        />
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

        {/* Left Column */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest text-ekon-green bg-ekon-green/10 border border-ekon-green/20 mb-5 uppercase">
            energia por assinatura
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.1] mb-5">
            Reduza{' '}
            <span className="text-ekon-green relative inline-block">
              de 8% a 25%
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-ekon-green/30 rounded" />
            </span>{' '}
            da sua conta de luz sem mudar nada na sua rotina.
          </h1>

          <p className="text-base md:text-xl text-white/80 max-w-xl font-normal leading-relaxed mb-7">
            A Ekon Energia torna a energia mais acessível para sua casa ou empresa, com desconto garantido.
          </p>

          {/* Badges */}
          <div
            ref={badgesRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 w-full max-w-xl lg:max-w-none"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/10 text-red-400">
                <XOctagon className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold tracking-wider text-white/40 uppercase">Sem cobranças</span>
                <span className="text-[11px] font-bold text-white uppercase leading-tight">Sem mensalidade</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-ekon-green/10 text-ekon-green">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold tracking-wider text-white/40 uppercase">Zero complicações</span>
                <span className="text-[11px] font-bold text-white uppercase leading-tight">Sem instalação</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400">
                <Home className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold tracking-wider text-white/40 uppercase">100% digital</span>
                <span className="text-[11px] font-bold text-white uppercase leading-tight">Sem obras</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center lg:items-start gap-3 w-full sm:w-auto">
            <a
              href="#simular"
              onClick={(e) => handleScrollTo(e, '#simular')}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto px-8 py-4 rounded-full bg-ekon-green hover:bg-ekon-green-light text-ekon-purple-dark font-extrabold text-base tracking-wider shadow-[0_6px_24px_rgba(0,230,118,0.4)] hover:shadow-[0_8px_30px_rgba(0,230,118,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Zap className="w-5 h-5 fill-current" />
              QUERO ECONOMIZAR AGORA
            </a>
            <span className="text-xs text-white/60 font-medium">
              Simule gratuitamente em 1 minuto
            </span>
          </div>
        </div>

        {/* Right Column — glass card flutuante (desktop) */}
        <div className="hidden lg:col-span-5 lg:flex relative items-end justify-center pb-12">
          <div
            ref={cardRef}
            className="w-full max-w-sm p-6 rounded-2xl glass border border-white/20 shadow-2xl backdrop-blur-md"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col text-left">
                <h3 className="text-base font-bold text-white mb-1">
                  Economia que faz a diferença
                </h3>
                <p className="text-xs text-white/70 leading-relaxed font-normal">
                  Mais economia para o que realmente importa no seu dia a dia.
                </p>
              </div>
              <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-ekon-green text-ekon-purple shadow-[0_0_15px_rgba(0,230,118,0.5)]">
                <Zap className="w-5 h-5 fill-current" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
