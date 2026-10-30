import React from 'react';
import { ArrowRight, Terminal, Sparkles, ChevronRight } from 'lucide-react';
import HeroCore3D from './3d/HeroCore3D';

interface HeroProps {
  onStartBuilding: () => void;
  onExplore: () => void;
}

export function Hero({ onStartBuilding, onExplore }: HeroProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background Radial Glow & Precision Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs (6 or 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            {/* Tagline kicker (Unboxed clean metadata, no pill badge sandwich) */}
            <div className="flex items-center gap-2.5 text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              <span className="font-mono">NEXORA AI PLATFORM</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-slate-400 normal-case font-normal">Intelligence that moves at the speed of ideas</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white text-balance leading-[1.08]">
              Build What’s Next <br className="hidden sm:inline" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300">
                With AI.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed text-balance">
              Turn complex ideas into intelligent products, automated workflows and scalable digital experiences.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartBuilding}
                className="px-6 py-3.5 text-sm font-semibold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
              >
                <span>Start Building</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExplore}
                className="px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 rounded-xl transition-all flex items-center gap-2"
              >
                <span>Explore Platform</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Quick Proof Metrics Strip */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white tracking-tight tabular-nums">
                  99.9%
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Availability</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400 tracking-tight tabular-nums">
                  &lt; 15ms
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Execution Latency</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-300 tracking-tight tabular-nums">
                  10M+
                </div>
                <div className="text-xs text-slate-400 mt-0.5">Workflows Run</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Visual (5 cols) */}
          <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[480px] lg:h-[540px] flex items-center justify-center">
            {/* Subtle glow rim around 3D canvas */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-500/10 via-transparent to-indigo-500/10 border border-slate-800/60 overflow-hidden shadow-2xl backdrop-blur-[2px]">
              <HeroCore3D />
              
              {/* Subtle overlay hint */}
              <div className="absolute bottom-3 left-4 text-[11px] text-slate-500 flex items-center gap-1.5 pointer-events-none">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                <span>Interactive 3D Core · Move cursor to orbit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Hero;
