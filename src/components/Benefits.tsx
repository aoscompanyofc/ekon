import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CheckCircle2, Zap } from 'lucide-react';

const WHATSAPP_NUMBER = '5500000000000'; // Substitua pelo número da Ekon

const advantages = [
  'Desconto direto na sua conta de luz',
  'Sem mensalidades ou taxas escondidas',
  'Sem instalação, sem obras, sem burocracia',
  'Atendimento humanizado e consultores especialistas',
  'Solução sustentável que gera impacto positivo',
];

const formatCurrency = (val: string) => {
  const cleaned = val.replace(/\D/g, '');
  if (!cleaned) return '';
  const number = parseFloat(cleaned) / 100;
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number);
};

export const Benefits: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const [name, setName] = useState('');
  const [billValue, setBillValue] = useState('');
  const [errors, setErrors] = useState<{ name?: string; billValue?: string }>({});

  useGSAP(() => {
    if (isReduced) return;

    if (advantagesRef.current) {
      gsap.fromTo(
        advantagesRef.current.children,
        { autoAlpha: 0, x: -30 },
        {
          autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: advantagesRef.current, start: 'top 85%', once: true },
        }
      );
    }

    if (formCardRef.current) {
      gsap.fromTo(
        formCardRef.current,
        { autoAlpha: 0, x: 30 },
        {
          autoAlpha: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: formCardRef.current, start: 'top 85%', once: true },
        }
      );
    }
  }, { scope: containerRef });

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillValue(formatCurrency(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; billValue?: string } = {};

    if (name.trim().length < 3) newErrors.name = 'Por favor, insira seu nome completo.';
    if (!billValue) newErrors.billValue = 'Por favor, informe o valor da conta.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const message =
      `Olá! Meu nome é ${name.trim()} e pago em torno de ${billValue} na minha conta de luz. ` +
      `Gostaria de fazer uma simulação gratuita e descobrir quanto posso economizar com a Ekon Energia! ⚡`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl border bg-ekon-bg-gray/50 focus:bg-white text-sm font-medium transition-all duration-200 outline-none focus:ring-2 ${
      hasError
        ? 'border-red-500 focus:ring-red-500/20'
        : 'border-black/10 focus:border-ekon-green focus:ring-ekon-green/20'
    }`;

  return (
    <section
      ref={containerRef}
      id="vantagens"
      className="py-20 md:py-28 bg-ekon-bg-gray overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">

          {/* Left Column */}
          <div ref={advantagesRef} className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-xs font-extrabold tracking-widest text-ekon-green uppercase block mb-3">
              VANTAGENS EKON
            </span>
            <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-ekon-text-dark leading-tight mb-8 text-balance">
              Por que escolher a Ekon Energia?
            </h2>

            <ul className="space-y-4 md:space-y-5 w-full">
              {advantages.map((adv, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-ekon-green mt-0.5">
                    <CheckCircle2 className="w-6 h-6 fill-ekon-green/10 text-ekon-green" />
                  </div>
                  <span className="text-base md:text-lg font-medium text-ekon-text-dark leading-snug">
                    {adv}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column — Form */}
          <div
            id="simular"
            ref={formCardRef}
            className="lg:col-span-6 flex justify-center w-full scroll-mt-28"
          >
            <div className="w-full max-w-[480px] bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/[0.03]">
              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-extrabold text-ekon-text-dark mb-2 tracking-tight">
                  Descubra quanto você pode economizar!
                </h3>
                <p className="text-xs md:text-sm text-ekon-text-gray font-normal leading-relaxed">
                  Preencha os dados abaixo e faça sua simulação gratuita agora mesmo.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Nome */}
                <div className="flex flex-col items-start">
                  <label htmlFor="name" className="text-xs font-bold text-ekon-text-dark mb-1.5 uppercase tracking-wide">
                    Nome completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Insira seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass(!!errors.name)}
                  />
                  {errors.name && (
                    <span className="text-[11px] font-bold text-red-500 mt-1 pl-1">{errors.name}</span>
                  )}
                </div>

                {/* Valor da conta */}
                <div className="flex flex-col items-start">
                  <label htmlFor="billValue" className="text-xs font-bold text-ekon-text-dark mb-1.5 uppercase tracking-wide">
                    Valor médio da sua conta de luz
                  </label>
                  <input
                    id="billValue"
                    type="text"
                    placeholder="R$ 0,00"
                    value={billValue}
                    onChange={handleBillChange}
                    className={inputClass(!!errors.billValue)}
                  />
                  {errors.billValue && (
                    <span className="text-[11px] font-bold text-red-500 mt-1 pl-1">{errors.billValue}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 whitespace-nowrap px-6 py-4 rounded-xl bg-ekon-green hover:bg-ekon-green-light text-ekon-purple-dark font-extrabold text-sm tracking-widest shadow-[0_4px_16px_rgba(0,230,118,0.3)] transition-all duration-300 active:scale-[0.98] cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  FAZER SIMULAÇÃO GRATUITA
                </button>

                <span className="block text-center text-[11px] text-ekon-text-gray font-semibold uppercase tracking-wider">
                  É rápido, seguro e sem compromisso.
                </span>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
