import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { FileText, BarChart3, Zap, DollarSign } from 'lucide-react';

const steps = [
  {
    number: '1',
    Icon: FileText,
    title: 'Você envia sua conta de luz',
    description: 'É rápido e fácil.',
  },
  {
    number: '2',
    Icon: BarChart3,
    title: 'A Ekon analisa o seu consumo',
    description: 'Encontramos a melhor oportunidade para você.',
  },
  {
    number: '3',
    Icon: Zap,
    title: 'Nós ativamos o desconto',
    description: 'Sem instalação, sem obras.',
  },
  {
    number: '4',
    Icon: DollarSign,
    title: 'Você economiza todo mês',
    description: 'Desconto garantido na sua conta.',
  },
];

export const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useGSAP(() => {
    if (isReduced) return;
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
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
      id="como-funciona"
      className="py-20 md:py-28 bg-white overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <span className="text-xs font-extrabold tracking-widest text-ekon-green uppercase block mb-3">
            COMO FUNCIONA
          </span>
          <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-ekon-text-dark leading-tight mb-4 text-balance">
            Simples, rápido e sem complicação.
          </h2>
          <p className="text-base md:text-lg text-ekon-text-gray font-normal">
            Você continua usando a mesma energia, só que pagando menos.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto"
        >
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-ekon-bg-gray hover:bg-white hover:shadow-xl border border-black/[0.03] transition-all duration-300 group"
            >
              <span className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-ekon-purple text-white text-xs font-bold shadow-md">
                {step.number}
              </span>

              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-ekon-green/10 text-ekon-green group-hover:bg-ekon-green group-hover:text-white transition-all duration-300 mb-5">
                <step.Icon className="w-6 h-6" />
              </div>

              <h3 className="text-sm md:text-base font-bold text-ekon-text-dark mb-2 leading-snug">
                {step.title}
              </h3>
              <p className="text-xs md:text-sm text-ekon-text-gray leading-relaxed font-normal">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
