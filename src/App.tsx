import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import AIVideo from './components/AIVideo';
import Features from './components/Features';
import ThreeCoreSection from './components/ThreeCoreSection';
import TechnologyFlow from './components/TechnologyFlow';
import UseCases from './components/UseCases';
import Metrics from './components/Metrics';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AWSDeploymentModal from './components/AWSDeploymentModal';

export default function App() {
  const [awsModalOpen, setAwsModalOpen] = useState(false);

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExplore = () => {
    const productElem = document.getElementById('product');
    if (productElem) {
      productElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectUseCase = (useCaseTitle: string) => {
    scrollToContact();
    // Pre-populate or focus contact form message with context if desired
    const messageInput = document.getElementById('message') as HTMLTextAreaElement | null;
    if (messageInput) {
      messageInput.value = `Hello NEXORA AI team, I am interested in deploying the ${useCaseTitle} solution.`;
      messageInput.focus();
    }
  };

  return (
    <div className="min-h-screen bg-[#05060A] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Sticky Navigation */}
      <Navigation onOpenAwsModal={() => setAwsModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1 & 2. Hero Section */}
        <Hero
          onStartBuilding={scrollToContact}
          onExplore={scrollToExplore}
        />

        {/* 3. Cinematic AI Video Section */}
        <AIVideo videoSrc="/assets/ai-hero-video.mp4" />

        {/* 4. Core Features (6 Cards) */}
        <Features />

        {/* 5. Dedicated Interactive 3D Neural Core Experience */}
        <ThreeCoreSection />

        {/* 6. System Technology Architecture & Flow */}
        <TechnologyFlow />

        {/* 7. Enterprise Use Cases */}
        <UseCases onSelectUseCase={handleSelectUseCase} />

        {/* 8. Quantified Operational Metrics */}
        <Metrics />

        {/* 9 & 10. Contact Section & Supabase PostgreSQL Integration */}
        <ContactSection />
      </main>

      {/* 11. Footer */}
      <Footer onOpenAwsModal={() => setAwsModalOpen(true)} />

      {/* AWS Cloud Deployment Architecture & Action Plan Modal */}
      <AWSDeploymentModal
        isOpen={awsModalOpen}
        onClose={() => setAwsModalOpen(false)}
      />
    </div>
  );
}
