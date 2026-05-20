import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoTransparent from '../assets/logo.png';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'Vantagens', href: '#vantagens' },
    { label: 'Economize', href: '#economia' },
    { label: 'Dúvidas', href: '#faq' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-ekon-purple-dark/95 backdrop-blur-md py-4 shadow-lg border-b border-white/5' 
          : 'bg-ekon-purple py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="select-none flex-shrink-0">
          <img
            src={logoTransparent}
            alt="Ekon Energia"
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
          />
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-white/80 hover:text-white font-medium text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#simular"
            onClick={(e) => handleScrollTo(e, '#simular')}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-ekon-green hover:bg-ekon-green-light text-ekon-purple-dark font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(0,230,118,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Simule agora
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          className="md:hidden p-2 text-white/85 hover:text-white transition-colors focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-ekon-purple-dark border-b border-white/10 transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen py-6 opacity-100' : 'max-h-0 py-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-6 px-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="text-white/80 hover:text-white font-medium text-base transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#simular"
            onClick={(e) => handleScrollTo(e, '#simular')}
            className="w-full max-w-[280px] text-center px-6 py-3 rounded-full bg-ekon-green hover:bg-ekon-green-light text-ekon-purple-dark font-bold text-base tracking-wide shadow-[0_4px_20px_rgba(0,230,118,0.3)] transition-all duration-300"
          >
            Simule agora
          </a>
        </div>
      </div>
    </header>
  );
};
