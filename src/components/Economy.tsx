import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { PiggyBank, ShieldCheck, Leaf, Smile } from 'lucide-react';

export const Economy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced) return;

    if (mockupRef.current) {
      gsap.fromTo(
        mockupRef.current,
        { scale: 0.9, rotate: 0, autoAlpha: 0 },
        {
          scale: 1,
          rotate: -8,
          autoAlpha: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mockupRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }

    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, { scope: containerRef });

  const benefitsGrid = [
    {
      icon: <PiggyBank className="w-6 h-6 text-ekon-green" />,
      title: 'Até 20% de desconto',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-ekon-green" />,
      title: '100% legal e seguro',
    },
    {
      icon: <Leaf className="w-6 h-6 text-ekon-green" />,
      title: 'Energia limpa e sustentável',
    },
    {
      icon: <Smile className="w-6 h-6 text-ekon-green" />,
      title: 'Mais economia no seu bolso',
    },
  ];

  return (
    <section
      ref={containerRef}
      id="economia"
      className="py-20 md:py-28 bg-gradient-to-br from-ekon-purple to-ekon-purple-dark text-white overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column (Mockup) */}
          <div className="lg:col-span-6 flex justify-center items-center relative py-8 lg:py-0">
            {/* Background Glow */}
            <div className="absolute w-[350px] h-[350px] bg-ekon-green/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Premium CSS-based Bill Mockup */}
            <div
              ref={mockupRef}
              className="relative w-full max-w-[340px] bg-white text-ekon-text-dark p-6 rounded-2xl shadow-2xl border border-black/5 origin-center"
              style={{ transform: isReduced ? 'rotate(-8deg)' : 'none' }}
            >
              {/* Header */}
              <div className="border-b border-ekon-text-gray/25 pb-4 mb-4 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-extrabold tracking-tight text-ekon-purple uppercase">
                    Conta de Energia
                  </h4>
                  <span className="text-[9px] text-ekon-text-gray/80 font-mono">Consumo Mensal</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-ekon-purple/5 flex items-center justify-center">
                  <div className="w-5 h-2.5 bg-ekon-purple/20 rounded-sm" />
                </div>
              </div>

              {/* Bill Details */}
              <div className="space-y-3 mb-6">
                <div>
                  <span className="text-[10px] font-bold text-ekon-text-gray uppercase tracking-wider block">
                    Valor total
                  </span>
                  <span className="text-2xl font-extrabold text-ekon-text-dark font-mono">
                    R$ 1.250,00
                  </span>
                </div>

                <div className="space-y-1.5 border-t border-dashed border-ekon-text-gray/20 pt-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-ekon-text-gray">Consumo de energia</span>
                    <span className="font-bold text-ekon-text-dark">R$ 850,00</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-ekon-text-gray">Iluminação pública</span>
                    <span className="font-bold text-ekon-text-dark">R$ 80,00</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-ekon-text-gray">Impostos e taxas</span>
                    <span className="font-bold text-ekon-text-dark">R$ 320,00</span>
                  </div>
                </div>
              </div>

              {/* Stylized Barcode */}
              <div className="border-t border-ekon-text-gray/20 pt-4 flex flex-col items-center gap-2">
                <div className="w-full h-8 bg-[repeating-linear-gradient(90deg,#000,#000_2px,transparent_2px,transparent_6px)] opacity-80" />
                <span className="text-[8px] font-mono text-ekon-text-gray tracking-wider">
                  83620000012 50000162024 05202611041 6
                </span>
              </div>

              {/* Overlapping neon green saving card */}
              <div className="absolute -right-6 top-1/3 p-4 md:p-5 rounded-2xl bg-ekon-green text-ekon-purple shadow-xl border border-ekon-green-light max-w-[210px] transform hover:scale-105 transition-all duration-300">
                <span className="text-[9px] font-extrabold tracking-widest text-ekon-purple-dark/60 block uppercase mb-1">
                  Com Ekon você paga:
                </span>
                <span className="text-2xl font-extrabold font-mono leading-none block">
                  R$ 1.000,00
                </span>
                <span className="inline-block mt-2 text-[10px] font-extrabold bg-ekon-purple-dark/10 px-2 py-0.5 rounded">
                  ⚡ 20% de economia
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (Text & Benefits) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left lg:pl-6">
            <span className="text-xs font-extrabold tracking-widest text-ekon-green uppercase block mb-3">
              ECONOMIA REAL
            </span>
            <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-white leading-tight mb-5">
              Mais economia para você viver melhor.
            </h2>
            <p className="text-base md:text-lg text-white/80 font-normal leading-relaxed mb-10 max-w-xl">
              Nossos clientes economizam até 20% todos os meses, sem precisar investir, instalar ou mudar seus hábitos.
            </p>

            {/* Grid 2x2 of mini-cards */}
            <div
              ref={cardsRef}
              className="grid grid-cols-2 gap-4 w-full"
            >
              {benefitsGrid.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-start p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-ekon-green/30 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-ekon-green/10 text-ekon-green group-hover:scale-110 transition-all duration-300 mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-white tracking-tight leading-snug">
                    {item.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
