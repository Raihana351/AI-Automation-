import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Cloud, Layers } from 'lucide-react';

interface NavigationProps {
  onOpenAwsModal: () => void;
}

export function Navigation({ onOpenAwsModal }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Product', href: '#product' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Technology', href: '#technology' },
    { label: 'Projects', href: '#use-cases' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#05060A]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single text element / minimal emblem) */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 via-sky-500 to-indigo-600 flex items-center justify-center p-1.5 shadow-md shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <Layers className="w-full h-full text-white" />
            </div>
            <span className="font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
              NEXORA<span className="text-cyan-400 ml-1">AI</span>
            </span>
          </a>

          {/* Zone 2: 4-5 Clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="hover:text-white transition-colors whitespace-nowrap shrink-0 relative py-1 text-slate-300 hover:after:w-full after:w-0 after:h-0.5 after:bg-cyan-400 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary action + secondary architecture modal */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAwsModal}
              className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
              title="View AWS Deployment Plan & Cloud Architecture"
            >
              <Cloud className="w-3.5 h-3.5 text-cyan-400" />
              <span>AWS Deploy Plan</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-lg shadow-sm shadow-cyan-500/20 transition-all hover:shadow-cyan-400/30 whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAwsModal}
              className="p-2 text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-lg"
              aria-label="View AWS Plan"
            >
              <Cloud className="w-4 h-4 text-cyan-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0D14]/95 border-b border-slate-800/90 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="px-3 py-2 text-base font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAwsModal();
              }}
              className="w-full py-2.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-700/80 rounded-lg flex items-center justify-center gap-2"
            >
              <Cloud className="w-4 h-4 text-cyan-400" />
              <span>AWS Deployment Plan</span>
            </button>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              className="w-full py-2.5 text-xs font-semibold text-center text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 rounded-lg"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navigation;
