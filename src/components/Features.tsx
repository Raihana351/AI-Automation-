import React, { useState } from 'react';
import {
  Cpu,
  BarChart3,
  GitFork,
  Zap,
  Cloud,
  Code2,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';
import { FeatureItem } from '../types';

export function Features() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features: FeatureItem[] = [
    {
      id: 'automation',
      title: 'AI Automation',
      description:
        'Self-healing autonomous pipelines that continuously optimize logic paths, handle edge exceptions, and execute multi-step workflows without human intervention.',
      iconName: 'Cpu',
      highlight: '99.98% autonomous task completion',
      capabilities: ['Dynamic heuristic routing', 'Zero-shot error recovery', 'Continuous parameter tuning'],
    },
    {
      id: 'analytics',
      title: 'Intelligent Analytics',
      description:
        'Topological neural analytics that ingest terabytes of operational telemetry and distill high-dimensional patterns into crisp, actionable business decisions.',
      iconName: 'BarChart3',
      highlight: 'Sub-second vector querying',
      capabilities: ['High-dimensional clustering', 'Real-time drift detection', 'Predictive pipeline alerts'],
    },
    {
      id: 'orchestration',
      title: 'Workflow Orchestration',
      description:
        'Coordinate distributed multi-agent swarms across cloud clusters, microservices, databases, and third-party SaaS tools with transactional idempotency.',
      iconName: 'GitFork',
      highlight: 'Deterministic state machine',
      capabilities: ['Distributed sagas & rollbacks', 'Event-driven triggers', 'Visual DAG inspector'],
    },
    {
      id: 'realtime',
      title: 'Real-Time Intelligence',
      description:
        'Ultra-low-latency streaming inference directly on the edge with adaptive quantization, delivering model evaluations in less than 15 milliseconds.',
      iconName: 'Zap',
      highlight: '< 15ms median edge latency',
      capabilities: ['WebSocket bidirectional streams', 'Memory-mapped KV caches', 'Global edge replica sync'],
    },
    {
      id: 'cloud-scale',
      title: 'Cloud Scale',
      description:
        'Serverless elasticity engineered for massive concurrent workloads. Scales from zero to millions of operations smoothly without performance degradation.',
      iconName: 'Cloud',
      highlight: 'Zero-to-10M request elasticity',
      capabilities: ['Auto-scaling worker pods', 'Zero cold-start caching', 'Multi-region fault tolerance'],
    },
    {
      id: 'developer-apis',
      title: 'Developer APIs',
      description:
        'Modern TypeScript, Python, and REST SDKs with comprehensive types, instant sandbox generation, and full observability out of the box.',
      iconName: 'Code2',
      highlight: 'Native TypeScript & Python SDKs',
      capabilities: ['Strict schema validation', 'OpenTelemetry tracing', 'Webhook retry guarantees'],
    },
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-sky-400" />;
      case 'GitFork':
        return <GitFork className="w-5 h-5 text-indigo-400" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-400" />;
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-teal-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-emerald-400" />;
      default:
        return <Cpu className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <section className="py-24 bg-[#05060A] relative" id="product">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono mb-2">
            PLATFORM CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineered for Autonomous Intelligence
          </h2>
          <p className="text-base text-slate-400 mt-3 text-balance">
            Six foundational pillars powering mission-critical enterprise autonomy, high-speed telemetry, and developer ergonomics.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const isHovered = activeFeature === feature.id;

            return (
              <div
                key={feature.id}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
                className={`group relative p-7 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                  isHovered ? 'shadow-xl shadow-cyan-500/5 -translate-y-1' : ''
                }`}
              >
                {/* Subtle top-right ambient hover highlight */}
                <div
                  className={`absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl transition-opacity duration-300 pointer-events-none ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div>
                  {/* Top Bar inside card: Icon + Human Editorial Index (No // mechanical slashes) */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(feature.iconName)}
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mt-2.5">
                    {feature.description}
                  </p>

                  {/* Capabilities List */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-1.5">
                    {feature.capabilities.map((cap) => (
                      <div key={cap} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400/80 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Unboxed metadata highlight */}
                <div className="mt-6 pt-3 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-cyan-400/90 font-medium">{feature.highlight}</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Features;
