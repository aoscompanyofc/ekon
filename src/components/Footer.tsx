import React from 'react';
import { MessageCircle, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const navLinks = [
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Vantagens', href: '#vantagens' },
    { label: 'Economize', href: '#economia' },
    { label: 'Dúvidas', href: '#faq' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-ekon-purple-dark text-white border-t border-white/5 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center border-b border-white/5 pb-10 mb-8">
          
          {/* Left Column (Logo) */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <a href="#" className="flex items-center gap-2 select-none group">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-ekon-green/10 border border-ekon-green/20 group-hover:bg-ekon-green/20 transition-all duration-300">
                <Zap className="w-5 h-5 text-ekon-green fill-ekon-green" />
              </div>
              <div className="flex flex-col leading-none text-left">
                <span className="font-extrabold text-2xl tracking-tight text-white lowercase">
                  ekon
                </span>
                <span className="font-bold text-[9px] tracking-[0.25em] text-ekon-green uppercase">
                  energia
                </span>
              </div>
            </a>
          </div>

          {/* Middle Column (Links) */}
          <div className="md:col-span-5">
            <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className="text-sm font-semibold text-white/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column (Socials) */}
          <div className="md:col-span-3 flex justify-center md:justify-end gap-4">
            {/* WhatsApp */}
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entre em contato pelo WhatsApp"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white hover:text-ekon-green hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
            </a>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Siga-nos no Instagram"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white hover:text-ekon-green hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Curta nossa página no Facebook"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 text-white hover:text-ekon-green hover:bg-white/10 transition-all duration-300 border border-white/10"
            >
              <svg
                className="w-5 h-5 fill-current"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs font-semibold text-white/40 uppercase tracking-widest">
          <span>
            © 2024 Ekon Energia. Todos os direitos reservados.
          </span>
          <span className="text-[10px]">
            Energia Inteligente por Assinatura
          </span>
        </div>

      </div>
    </footer>
  );
};
