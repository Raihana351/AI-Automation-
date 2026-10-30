import React, { useState, useEffect, useRef } from 'react';
import { MetricItem } from '../types';

export function Metrics() {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const metrics: MetricItem[] = [
    {
      value: '99.9%',
      numericTarget: 99.9,
      suffix: '%',
      label: 'Platform Availability',
      subtext: 'Backed by multi-region AWS high-availability SLA',
    },
    {
      value: '10M+',
      numericTarget: 10,
      suffix: 'M+',
      label: 'AI Operations',
      subtext: 'Autonomous agent tasks dispatched every 30 days',
    },
    {
      value: '40+',
      numericTarget: 40,
      suffix: '+',
      label: 'Integrations',
      subtext: 'Pre-built enterprise connectors, databases & microservices',
    },
    {
      value: '24/7',
      numericTarget: 24,
      suffix: '/7',
      label: 'Automation',
      subtext: 'Unattended pipeline execution and continuous monitoring',
    },
  ];

  return (
    <section className="py-20 bg-[#070910] border-y border-slate-800/80 relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {metrics.map((item, index) => (
            <div key={item.label} className="flex flex-col">
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono text-white tracking-tight tabular-nums flex items-baseline">
                {isVisible ? (
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-300">
                    {item.value}
                  </span>
                ) : (
                  <span className="text-slate-600">00.0</span>
                )}
              </div>
              <div className="text-base font-semibold text-slate-200 mt-2">
                {item.label}
              </div>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Metrics;
