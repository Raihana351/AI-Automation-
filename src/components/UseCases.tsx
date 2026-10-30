import React, { useState } from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { UseCaseItem } from '../types';

interface UseCasesProps {
  onSelectUseCase?: (useCaseTitle: string) => void;
}

export function UseCases({ onSelectUseCase }: UseCasesProps) {
  const [selectedCase, setSelectedCase] = useState<string>('support');

  const useCases: UseCaseItem[] = [
    {
      id: 'support',
      title: 'AI Customer Support',
      tagline: 'Autonomous omnichannel triage and resolution',
      description:
        'Resolves complex tier-1 and tier-2 customer inquiries across Zendesk, Slack, and in-app chat with real-time sentiment adaptation and human escalation loops.',
      techTags: ['Contextual Memory', 'Sentiment Routing', 'Multi-Language'],
      metricLabel: 'Resolution Rate',
      metricValue: '84.2%',
      imageSrc: '/src/assets/images/usecase_ai_support_1793374550355.jpg',
      ctaText: 'Deploy Support Agent',
    },
    {
      id: 'devops',
      title: 'Automated DevOps',
      tagline: 'Self-healing Kubernetes & CI/CD deployment pipelines',
      description:
        'Proactively diagnoses runtime anomalies, provisions AWS compute clusters on demand, generates pull requests for broken tests, and rolls back failed releases safely.',
      techTags: ['AWS ECS / EKS', 'Root-Cause AI', 'Zero-Downtime Rollback'],
      metricLabel: 'MTTR Reduction',
      metricValue: '72%',
      imageSrc: '/src/assets/images/usecase_devops_auto_1793374549515.jpg',
      ctaText: 'Integrate CI/CD Agent',
    },
    {
      id: 'analysis',
      title: 'Intelligent Data Analysis',
      tagline: 'High-dimensional topological pattern discovery',
      description:
        'Transforms messy unstructured enterprise data lakes and transactional SQL stores into predictive business intelligence models and automated board summaries.',
      techTags: ['pgvector', 'Topological Clustering', 'Automated Synthesis'],
      metricLabel: 'Query Speedup',
      metricValue: '14x',
      imageSrc: '/src/assets/images/usecase_data_analysis_1793374550528.jpg',
      ctaText: 'Launch Analytics Suite',
    },
    {
      id: 'content',
      title: 'AI Content Operations',
      tagline: 'Multi-modal brand asset synthesis & localized delivery',
      description:
        'Generates brand-compliant marketing assets, localized copy variations, and interactive product documentation with strict styleguide invariants.',
      techTags: ['Multi-Modal Synthesis', 'Style Invariants', 'Automated QA'],
      metricLabel: 'Production Velocity',
      metricValue: '5.8x',
      imageSrc: '/src/assets/images/usecase_content_ops_1793374551069.jpg',
      ctaText: 'Explore Studio',
    },
  ];

  return (
    <section className="py-24 bg-[#05060A] relative" id="use-cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono mb-2">
            PROVEN APPLICATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Built for Mission-Critical Production
          </h2>
          <p className="text-base text-slate-400 mt-2 text-balance">
            Real deployments powering Fortune 500 automated operations, support teams, and infrastructure engineers.
          </p>
        </div>

        {/* 4 Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/5"
            >
              {/* Card Visual with Scrim Overlay */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to styled high-tech gradient if file load is delayed
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.classList.add('bg-gradient-to-tr', 'from-slate-950', 'via-slate-900', 'to-cyan-950');
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

                {/* Proof Metric Stamp */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                  <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-white font-mono flex items-center gap-2">
                    <span className="text-slate-400">{item.metricLabel}:</span>
                    <span className="text-cyan-400 font-bold tabular-nums">{item.metricValue}</span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400/90 mt-1">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Clean unboxed tags with typographic separators */}
                  <div className="flex flex-wrap items-center gap-2 mt-5 text-xs text-slate-400">
                    {item.techTags.map((tag, i) => (
                      <React.Fragment key={tag}>
                        <span className="font-mono text-slate-300">{tag}</span>
                        {i < item.techTags.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-7 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => onSelectUseCase?.(item.title)}
                    className="text-xs font-semibold text-white hover:text-cyan-300 flex items-center gap-1.5 transition-colors group/btn"
                  >
                    <span>{item.ctaText}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>
                  <span className="text-[11px] font-mono text-slate-500">Production Ready</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default UseCases;
