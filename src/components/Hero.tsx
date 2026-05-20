import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { XOctagon, Wrench, Home, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced) return;

    // Badges stagger
    if (badgesRef.current) {
      gsap.fromTo(
        badgesRef.current.children,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }

    // Floating card fade-in
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
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-br from-ekon-purple-dark via-ekon-purple to-ekon-purple-dark text-white flex items-center overflow-hidden"
    >
      {/* Background visual details */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,230,118,0.12),transparent_45%)]" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column (Content) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Tag superior */}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-widest text-ekon-green bg-ekon-green/10 border border-ekon-green/20 mb-5 uppercase">
            energia por assinatura
          </span>

          {/* Headline H1 */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.1] mb-5">
            Reduza até <span className="text-ekon-green relative inline-block">
              20%
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-ekon-green/30 rounded" />
            </span>{' '}
            da sua conta de luz sem mudar nada na sua rotina.
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl text-white/80 max-w-xl font-normal leading-relaxed mb-7">
            A Ekon Energia torna a energia mais acessível para sua casa ou empresa, com desconto garantido.
          </p>

          {/* Badges Container */}
          <div
            ref={badgesRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 w-full max-w-xl lg:max-w-none"
          >
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/10 text-red-400">
                <XOctagon className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold tracking-wider text-white/40 uppercase">Sem cobranças</span>
                <span className="text-[11px] font-bold text-white uppercase leading-tight">Sem mensalidade</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-ekon-green/10 text-ekon-green">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[9px] font-bold tracking-wider text-white/40 uppercase">Zero complicações</span>
                <span className="text-[11px] font-bold text-white uppercase leading-tight">Sem instalação</span>
              </div>
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
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
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-ekon-green hover:bg-ekon-green-light text-ekon-purple-dark font-extrabold text-base tracking-wider shadow-[0_6px_24px_rgba(0,230,118,0.4)] hover:shadow-[0_8px_30px_rgba(0,230,118,0.6)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <Zap className="w-5 h-5 fill-current" />
              QUERO ECONOMIZAR AGORA
            </a>
            <span className="text-xs text-white/60 font-medium">
              Simule gratuitamente em 1 minuto
            </span>
          </div>
        </div>

        {/* Right Column (Visual) — oculto no mobile */}
        <div className="hidden lg:col-span-5 lg:flex relative items-center justify-center">
          {/* Main Hero Visual Card / House */}
          <div className="relative w-full max-w-[450px] aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-ekon-purple-dark/40 border border-white/10 shadow-2xl">
            {/* Beautiful background architecture rendering image */}
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop"
              alt="Casa moderna iluminada sustentável"
              className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-luminosity brightness-75"
              fetchPriority="high"
            />
            {/* Green neon architectural overlay lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 400 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Green glowing neon roof profile lines */}
              <path
                d="M40 320 L200 150 L360 320"
                stroke="#00E676"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_12px_rgba(0,230,118,0.8)] opacity-90"
              />
              <path
                d="M200 150 L200 80"
                stroke="#00E676"
                strokeWidth="2"
                strokeDasharray="4 4"
                className="opacity-50"
              />
            </svg>

            {/* Inner bottom shadow gradient */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ekon-purple-dark to-transparent" />

            {/* Glassmorphic floating card */}
            <div
              ref={cardRef}
              className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl glass border border-white/20 shadow-xl"
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
      </div>
    </section>
  );
};
