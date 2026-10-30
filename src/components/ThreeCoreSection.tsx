import React from 'react';
import { DedicatedCoreViewer } from './3d/DedicatedCoreViewer';
import { Layers, Zap, ShieldCheck } from 'lucide-react';

export function ThreeCoreSection() {
  return (
    <section className="py-24 bg-[#05060A] relative overflow-hidden" id="core-3d">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono mb-2">
              INTERACTIVE 3D EXPERIENCE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              The NEXORA Neural Core
            </h2>
            <p className="text-base text-slate-400 mt-2 text-balance">
              Explore the multi-tier cryptographic and tensor architecture in 3D space. Rotate, zoom, and inspect harmonic resonance across quantum, neural, and plasma states.
            </p>
          </div>

          {/* Quick specs pill-free metadata */}
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 border-l border-slate-800 pl-4 py-1">
            <div>
              <span className="text-slate-500 block">PRECISION</span>
              <span className="text-white font-semibold">FP16 / INT8</span>
            </div>
            <div className="h-4 w-px bg-slate-800" />
            <div>
              <span className="text-slate-500 block">TOPOLOGY</span>
              <span className="text-cyan-400 font-semibold">Hyper-Torus</span>
            </div>
          </div>
        </div>

        {/* Dedicated 3D Viewer Container */}
        <DedicatedCoreViewer />

        {/* 3 Value propositions below the 3D viewer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/70">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-white mb-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Real-Time State Transitions</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dynamically switch between quantum probability gates, neural tensor graphs, and high-frequency plasma pipelines with zero downtime.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/70">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-white mb-1.5">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>Multi-Layer Geometric Isolation</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Orbital cryptographic rings isolate execution domains, enforcing zero-trust sandboxing across multi-tenant inference nodes.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800/70">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-white mb-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Autonomous Resilience</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Self-correcting orbital equilibrium automatically redistributes compute tasks if any upstream API endpoint encounters latency spikes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ThreeCoreSection;
