import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  // Entrance animations for FAQ items
  useGSAP(() => {
    if (isReduced) return;

    if (listRef.current) {
      gsap.fromTo(
        listRef.current.children,
        { autoAlpha: 0, y: 15 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, { scope: containerRef });

  const faqs: FAQItem[] = [
    {
      question: 'Preciso instalar placas solares?',
      answer: 'Não. A Ekon Energia não exige nenhuma instalação física. Você continua recebendo energia normalmente pela concessionária.',
    },
    {
      question: 'Existe fidelidade ou multa?',
      answer: 'Não há fidelidade. Você pode cancelar a qualquer momento, sem multas ou taxas adicionais.',
    },
    {
      question: 'Em quanto tempo o desconto começa?',
      answer: 'Após a contratação e validação dos seus dados, o desconto começa a valer nas próximas faturas.',
    },
    {
      question: 'A Ekon é confiável?',
      answer: 'Sim. Somos uma empresa 100% regularizada, com mais de 1.000 clientes ativos e atuação em diversas regiões.',
    },
    {
      question: 'Para quem é a Ekon Energia?',
      answer: 'Para residências e empresas que desejam reduzir custos com energia elétrica de forma simples, sem investimento e sem mudar nada na rotina.',
    },
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      id="faq"
      className="py-20 md:py-28 bg-white overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col items-start text-left lg:sticky lg:top-28">
            <span className="text-xs font-extrabold tracking-widest text-ekon-green uppercase block mb-3">
              DÚVIDAS FREQUENTES
            </span>
            <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-ekon-text-dark leading-tight text-balance">
              Perguntas que sempre recebemos
            </h2>
          </div>

          {/* Right Column (Accordion List) */}
          <div
            ref={listRef}
            className="lg:col-span-7 space-y-4 w-full"
          >
            {faqs.map((faq, idx) => {
              const isOpen = activeIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border-b border-black/[0.08] transition-colors duration-300 ${
                    isOpen ? 'bg-ekon-bg-gray/40' : 'bg-transparent'
                  }`}
                >
                  <button
                    onClick={() => handleToggle(idx)}
                    className="w-full py-5 px-4 flex justify-between items-center text-left hover:bg-ekon-bg-gray/60 transition-colors duration-200 outline-none focus:ring-2 focus:ring-ekon-green/20 rounded-lg group"
                  >
                    <span className="text-base font-extrabold text-ekon-text-dark group-hover:text-ekon-purple transition-colors duration-200">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-ekon-text-gray/80 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        isOpen ? 'rotate-180 text-ekon-green' : ''
                      }`}
                    />
                  </button>
                  
                  {/* Expandable answer panel */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-4 pb-6 pt-1 text-sm md:text-base text-ekon-text-gray font-normal leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
