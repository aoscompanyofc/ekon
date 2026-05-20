import React from 'react';
import { Users, MapPin, CheckCircle, Zap } from 'lucide-react';

export const TrustBar: React.FC = () => {
  const items = [
    {
      icon: <Users className="w-6 h-6 text-ekon-green" />,
      text: '+ de 1.000 clientes satisfeitos',
    },
    {
      icon: <MapPin className="w-6 h-6 text-ekon-green" />,
      text: 'Atuação em diversas regiões',
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-ekon-green" />,
      text: 'Empresa 100% regularizada',
    },
    {
      icon: <Zap className="w-6 h-6 text-ekon-green" />,
      text: 'Energia de qualidade com preço justo',
    },
  ];

  return (
    <section className="bg-ekon-purple-dark text-white border-y border-white/5 py-8 md:py-10">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-center justify-center">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row items-center md:items-start lg:items-center text-center md:text-left gap-3 md:gap-4 px-2 hover:translate-y-[-2px] transition-transform duration-300"
            >
              <div className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 text-ekon-green border border-white/10 shadow-inner">
                {item.icon}
              </div>
              <span className="text-xs md:text-sm font-bold text-white/90 leading-tight uppercase tracking-wide max-w-[200px]">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
