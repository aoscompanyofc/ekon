import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CheckCircle2, Zap } from 'lucide-react';

// Simplified Zod Validation Schema with all-strings to align with inputs
const schema = z.object({
  name: z.string().min(3, { message: 'Por favor, insira seu nome completo.' }),
  whatsapp: z.string().min(14, { message: 'WhatsApp inválido. Ex: (99) 99999-9999' }),
  email: z.string().email({ message: 'E-mail inválido.' }),
  billValue: z.string().min(1, { message: 'Por favor, informe o valor da conta.' }),
});

type FormData = z.infer<typeof schema>;

export const Benefits: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const advantagesRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      whatsapp: '',
      email: '',
      billValue: '',
    },
  });

  const rawBillValue = watch('billValue');
  const rawWhatsapp = watch('whatsapp');

  // GSAP Animations
  useGSAP(() => {
    if (isReduced) return;

    if (advantagesRef.current) {
      gsap.fromTo(
        advantagesRef.current.children,
        { autoAlpha: 0, x: -30 },
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: advantagesRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }

    if (formCardRef.current) {
      gsap.fromTo(
        formCardRef.current,
        { autoAlpha: 0, x: 30 },
        {
          autoAlpha: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formCardRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }
  }, { scope: containerRef });

  // Custom Formatter for WhatsApp/Telefone Mask
  const formatWhatsapp = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    const limited = cleaned.substring(0, 11);
    if (limited.length <= 2) return limited;
    if (limited.length <= 7) return `(${limited.substring(0, 2)}) ${limited.substring(2)}`;
    return `(${limited.substring(0, 2)}) ${limited.substring(2, 7)}-${limited.substring(7)}`;
  };

  const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsapp(e.target.value);
    setValue('whatsapp', formatted, { shouldValidate: true });
  };

  // Custom Formatter for Currency
  const formatCurrency = (val: string) => {
    const cleaned = val.replace(/\D/g, '');
    if (!cleaned) return '';
    const numberValue = parseFloat(cleaned) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numberValue);
  };

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setValue('billValue', formatted, { shouldValidate: true });
  };

  const onSubmit = async (data: FormData) => {
    // Simulating API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data successfully submitted:', data);
  };

  const advantages = [
    'Desconto direto na sua conta de luz',
    'Sem mensalidades ou taxas escondidas',
    'Sem instalação, sem obras, sem burocracia',
    'Atendimento humanizado e consultores especialistas',
    'Solução sustentável que gera impacto positivo',
  ];

  return (
    <section
      ref={containerRef}
      id="vantagens"
      className="py-20 md:py-28 bg-ekon-bg-gray overflow-hidden scroll-mt-20"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* Left Column (Advantages) */}
          <div ref={advantagesRef} className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-xs font-extrabold tracking-widest text-ekon-green uppercase block mb-3">
              VANTAGENS EKON
            </span>
            <h2 className="text-3xl md:text-[40px] font-extrabold tracking-tight text-ekon-text-dark leading-tight mb-8">
              Por que escolher a Ekon Energia?
            </h2>

            {/* List with Checkmarks */}
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

          {/* Right Column (Form Card) */}
          <div
            id="simular"
            ref={formCardRef}
            className="lg:col-span-6 flex justify-center w-full scroll-mt-28"
          >
            <div className="w-full max-w-[480px] bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/[0.03]">
              {isSubmitSuccessful ? (
                /* Success Feedback Screen */
                <div className="py-8 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-ekon-green/10 text-ekon-green flex items-center justify-center mb-6 animate-bounce">
                    <Zap className="w-8 h-8 fill-current" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-ekon-text-dark mb-3">
                    Simulação Enviada!
                  </h3>
                  <p className="text-sm text-ekon-text-gray font-medium leading-relaxed max-w-sm mb-6">
                    Obrigado por escolher a Ekon Energia. Nossos especialistas entrarão em contato via WhatsApp nas próximas horas com a sua proposta personalizada!
                  </p>
                  <div className="text-xs bg-ekon-bg-gray text-ekon-text-gray/80 px-4 py-2.5 rounded-lg border border-black/5">
                    Verifique seu Whatsapp em instantes.
                  </div>
                </div>
              ) : (
                /* Active Lead Form */
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-xl md:text-2xl font-extrabold text-ekon-text-dark mb-2 tracking-tight">
                      Descubra quanto você pode economizar!
                    </h3>
                    <p className="text-xs md:text-sm text-ekon-text-gray font-normal leading-relaxed">
                      Preencha os dados abaixo e faça sua simulação gratuita agora mesmo.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name Input */}
                    <div className="flex flex-col items-start">
                      <label htmlFor="name" className="text-xs font-bold text-ekon-text-dark mb-1.5 uppercase tracking-wide">
                        Nome completo
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Insira seu nome"
                        className={`w-full px-4 py-3 rounded-xl border bg-ekon-bg-gray/50 focus:bg-white text-sm font-medium transition-all duration-200 outline-none focus:ring-2 ${
                          errors.name
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-black/10 focus:border-ekon-green focus:ring-ekon-green/20'
                        }`}
                        {...register('name')}
                      />
                      {errors.name && (
                        <span className="text-[11px] font-bold text-red-500 mt-1 pl-1">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    {/* WhatsApp Input */}
                    <div className="flex flex-col items-start">
                      <label htmlFor="whatsapp" className="text-xs font-bold text-ekon-text-dark mb-1.5 uppercase tracking-wide">
                        WhatsApp
                      </label>
                      <input
                        id="whatsapp"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={rawWhatsapp}
                        onChange={handleWhatsappChange}
                        className={`w-full px-4 py-3 rounded-xl border bg-ekon-bg-gray/50 focus:bg-white text-sm font-medium transition-all duration-200 outline-none focus:ring-2 ${
                          errors.whatsapp
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-black/10 focus:border-ekon-green focus:ring-ekon-green/20'
                        }`}
                      />
                      {errors.whatsapp && (
                        <span className="text-[11px] font-bold text-red-500 mt-1 pl-1">
                          {errors.whatsapp.message}
                        </span>
                      )}
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col items-start">
                      <label htmlFor="email" className="text-xs font-bold text-ekon-text-dark mb-1.5 uppercase tracking-wide">
                        E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        className={`w-full px-4 py-3 rounded-xl border bg-ekon-bg-gray/50 focus:bg-white text-sm font-medium transition-all duration-200 outline-none focus:ring-2 ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-500/20'
                            : 'border-black/10 focus:border-ekon-green focus:ring-ekon-green/20'
                        }`}
                        {...register('email')}
                      />
                      {errors.email && (
                        <span className="text-[11px] font-bold text-red-500 mt-1 pl-1">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    {/* Bill Value Input */}
                    <div className="flex flex-col items-start">
                      <label htmlFor="billValue" className="text-xs font-bold text-ekon-text-dark mb-1.5 uppercase tracking-wide">
                        Valor médio da sua conta de luz
                      </label>
                      <div className="relative w-full">
                        <input
                          id="billValue"
                          type="text"
                          placeholder="R$ 0,00"
                          value={rawBillValue}
                          onChange={handleBillChange}
                          className={`w-full px-4 py-3 rounded-xl border bg-ekon-bg-gray/50 focus:bg-white text-sm font-medium transition-all duration-200 outline-none focus:ring-2 ${
                            errors.billValue
                              ? 'border-red-500 focus:ring-red-500/20'
                              : 'border-black/10 focus:border-ekon-green focus:ring-ekon-green/20'
                          }`}
                        />
                      </div>
                      {errors.billValue && (
                        <span className="text-[11px] font-bold text-red-500 mt-1 pl-1">
                          {errors.billValue.message}
                        </span>
                      )}
                    </div>

                    {/* Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-ekon-green hover:bg-ekon-green-light disabled:bg-ekon-green/50 text-ekon-purple-dark font-extrabold text-sm tracking-widest shadow-[0_4px_16px_rgba(0,230,118,0.3)] transition-all duration-300 active:scale-[0.98] cursor-pointer"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      {isSubmitting ? 'ENVIANDO SIMULAÇÃO...' : 'FAZER SIMULAÇÃO GRATUITA'}
                    </button>

                    {/* Form Footer */}
                    <span className="block text-center text-[11px] text-ekon-text-gray font-semibold uppercase tracking-wider">
                      É rápido, seguro e sem compromisso.
                    </span>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
