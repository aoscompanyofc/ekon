import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import {
  Zap,
  Radio,
  Building2,
  Home,
  Sun,
  ChevronRight,
  Hammer,
  Wallet,
  ShieldCheck,
  Star,
  TrendingDown,
} from 'lucide-react';

const steps = [
  {
    number: '1',
    Icon: Zap,
    label: 'Geração',
    title: 'A energia é produzida em diversas usinas',
    description:
      'Hidrelétricas, parques solares, eólicos, térmicos e outras fontes espalhadas pelo Brasil.',
    keyMessage: 'Toda energia começa sendo produzida por geradores autorizados.',
  },
  {
    number: '2',
    Icon: Radio,
    label: 'Transmissão',
    title: 'A energia percorre grandes distâncias',
    description:
      'Torres de transmissão conectam as usinas aos centros urbanos e regiões consumidoras.',
    keyMessage: 'A energia viaja centenas de quilômetros até chegar à sua região.',
  },
  {
    number: '3',
    Icon: Building2,
    label: 'Distribuição',
    title: 'A distribuidora entrega até sua casa',
    description:
      'Empresas como Cemig e outras concessionárias levam a energia a residências e comércios.',
    keyMessage: 'A distribuidora continua responsável pelo fornecimento e qualidade.',
  },
  {
    number: '4',
    Icon: Home,
    label: 'Consumo',
    title: 'Você utiliza a energia normalmente',
    description:
      'A energia chega ao imóvel e é usada em geladeira, chuveiro, TV, ar-condicionado e tudo mais.',
    keyMessage: 'Nada muda na forma como você consome energia.',
  },
];

const benefits = [
  { Icon: Hammer, text: 'Sem obras', sub: 'Não é necessário instalar placas solares.' },
  { Icon: Wallet, text: 'Sem investimento', sub: 'Você não precisa comprar equipamentos.' },
  { Icon: ShieldCheck, text: 'Sem alteração na instalação', sub: 'Toda a estrutura elétrica da sua casa permanece igual.' },
  { Icon: Star, text: 'Energia da mesma qualidade', sub: 'Fornecimento continua sendo feito pela distribuidora da sua região.' },
  { Icon: TrendingDown, text: 'Economia mensal', sub: 'Descontos recorrentes garantidos na sua conta de energia.' },
];

export const EnergyPath: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ekonBlockRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced) return;

    if (stepsRef.current) {
      gsap.fromTo(
        stepsRef.current.children,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }

    if (ekonBlockRef.current) {
      gsap.fromTo(
        ekonBlockRef.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ekonBlockRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }

    if (benefitsRef.current) {
      gsap.fromTo(
        benefitsRef.current.children,
        { autoAlpha: 0, y: 25 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="como-a-energia-chega"
      className="py-20 md:py-28 bg-ekon-bg-gray overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="text-xs font-extrabold tracking-widest text-ekon-green uppercase block mb-3">
            ENTENDA O PROCESSO
          </span>
          <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-ekon-text-dark leading-tight mb-4 text-balance">
            Como a energia chega até sua casa?
          </h2>
          <p className="text-base md:text-lg text-ekon-text-gray font-normal">
            A energia continua chegando da mesma forma.<br />
            O que muda é o valor da sua conta.
          </p>
        </div>

        {/* Steps Flow */}
        <div
          ref={stepsRef}
          className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row lg:items-stretch gap-4 mb-14"
        >
          {steps.map((step, idx) => (
            <React.Fragment key={step.number}>
              {/* Card */}
              <div className="flex flex-col flex-1 p-6 rounded-2xl bg-white border border-black/[0.04] shadow-sm hover:shadow-lg transition-all duration-300 group relative">
                {/* Step number badge */}
                <span className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full bg-ekon-purple text-white text-[10px] font-extrabold shadow">
                  {step.number}
                </span>

                {/* Icon */}
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-ekon-purple/10 text-ekon-purple group-hover:bg-ekon-purple group-hover:text-white transition-all duration-300 mb-4 flex-shrink-0">
                  <step.Icon className="w-5 h-5" />
                </div>

                <span className="text-[10px] font-extrabold tracking-widest text-ekon-green uppercase mb-1">
                  {step.label}
                </span>
                <h3 className="text-sm md:text-base font-bold text-ekon-text-dark mb-2 leading-snug pr-6">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm text-ekon-text-gray leading-relaxed font-normal flex-1">
                  {step.description}
                </p>

                <div className="mt-4 pt-4 border-t border-black/[0.05]">
                  <p className="text-[11px] font-semibold text-ekon-purple/70 leading-snug italic">
                    {step.keyMessage}
                  </p>
                </div>
              </div>

              {/* Connector — horizontal on desktop, vertical on mobile */}
              {idx < steps.length - 1 && (
                <>
                  {/* Desktop arrow (horizontal) */}
                  <div className="hidden lg:flex flex-col items-center justify-center flex-shrink-0 w-8 gap-1">
                    <div className="flex-1 w-px bg-ekon-purple/15" />
                    <ChevronRight className="w-5 h-5 text-ekon-purple/40 flex-shrink-0" />
                    <div className="flex-1 w-px bg-ekon-purple/15" />
                  </div>

                  {/* Mobile arrow (vertical, hidden on sm grid) */}
                  <div className="flex sm:hidden items-center justify-center h-6">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="w-px h-2 bg-ekon-purple/20" />
                      <svg className="w-4 h-4 text-ekon-purple/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Ekon Transition Block */}
        <div
          ref={ekonBlockRef}
          className="rounded-3xl bg-ekon-purple-dark overflow-hidden mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: concept */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-xs font-extrabold tracking-widest text-ekon-green uppercase block mb-4">
                ONDE ENTRA A EKON?
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-4 text-balance">
                Com a Ekon, você aproveita os benefícios da energia solar por assinatura
              </h3>
              <p className="text-sm md:text-base text-white/70 leading-relaxed font-normal mb-6">
                A Ekon conecta você à energia produzida em fazendas solares parceiras. Você recebe
                créditos de energia que reduzem o valor da sua conta de luz — sem obras, sem
                equipamentos e sem mudar nada na sua residência.
              </p>

              {/* Mini flow: fazenda → créditos → desconto */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                  <Sun className="w-4 h-4 text-ekon-green" />
                  <span className="text-xs font-bold text-white">Fazenda solar</span>
                </div>
                <ChevronRight className="w-4 h-4 text-ekon-green flex-shrink-0" />
                <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                  <Zap className="w-4 h-4 text-ekon-green" />
                  <span className="text-xs font-bold text-white">Créditos gerados</span>
                </div>
                <ChevronRight className="w-4 h-4 text-ekon-green flex-shrink-0" />
                <div className="flex items-center gap-2 bg-ekon-green/20 border border-ekon-green/40 rounded-xl px-3 py-2">
                  <TrendingDown className="w-4 h-4 text-ekon-green" />
                  <span className="text-xs font-bold text-ekon-green">Desconto na conta</span>
                </div>
              </div>
            </div>

            {/* Right: benefits list */}
            <div className="bg-white/5 border-l border-white/10 p-8 md:p-12 flex flex-col justify-center">
              <p className="text-xs font-extrabold tracking-widest text-ekon-green uppercase mb-6">
                BENEFÍCIOS
              </p>
              <div ref={benefitsRef} className="space-y-4">
                {benefits.map((b, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-ekon-green/15 text-ekon-green">
                      <b.Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white leading-tight">{b.text}</p>
                      <p className="text-xs text-white/60 font-normal leading-snug">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-sm md:text-base text-ekon-text-gray font-medium max-w-xl mx-auto">
          A energia continua chegando da mesma forma.<br />
          <span className="font-bold text-ekon-text-dark">O que muda é o valor da sua conta.</span>
        </p>

      </div>
    </section>
  );
};
