import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { EnergyPath } from './components/EnergyPath';
import { Economy } from './components/Economy';
import { Benefits } from './components/Benefits';
import { TrustBar } from './components/TrustBar';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      {/* Dynamic SEO Meta Injections */}
      <Helmet>
        <title>Ekon Energia | Reduza até 20% da sua conta de luz</title>
        <meta
          name="description"
          content="Economize até 20% na sua conta de luz com a Ekon Energia. Sem instalação, sem obras, sem mensalidade. Faça sua simulação gratuita em 1 minuto."
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Ekon Energia | Reduza até 20% da sua conta de luz" />
        <meta
          property="og:description"
          content="Energia por assinatura com desconto garantido. Simule gratuitamente."
        />
        <meta property="og:image" content="/og-image.webp" />
        <meta property="og:url" content="https://ekonenergia.com.br" />
        <meta property="og:locale" content="pt_BR" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Ekon Energia | Economize na sua conta de luz" />
        <meta name="twitter:description" content="Reduza até 20% sem instalação ou obras." />
        <meta name="twitter:image" content="/og-image.webp" />
      </Helmet>

      {/* Main Layout */}
      <div className="relative min-h-screen bg-ekon-bg-light text-ekon-text-dark antialiased overflow-x-hidden selection:bg-ekon-green/30 selection:text-ekon-purple-dark">
        {/* Navigation Fixed Bar */}
        <Header />

        <main>
          {/* 1. Hero Section */}
          <Hero />

          {/* 2. How It Works Section */}
          <HowItWorks />

          {/* 3. Energy Path Section */}
          <EnergyPath />

          {/* 4. Economy Section (Purple block) */}
          <Economy />

          {/* 4. Benefits + Simulation Form Section */}
          <Benefits />

          {/* 5. Trust Indicators Bar */}
          <TrustBar />

          {/* 6. FAQ Section */}
          <FAQ />

          {/* 7. Final Call to Action */}
          <FinalCTA />
        </main>

        {/* Footer Area */}
        <Footer />
      </div>
    </>
  );
};

export default App;
