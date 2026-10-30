import React from 'react';
import { Layers, Cloud, Github, Twitter, Disc as Discord, Linkedin, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenAwsModal: () => void;
}

export function Footer({ onOpenAwsModal }: FooterProps) {
  return (
    <footer className="bg-[#030408] border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center p-1.5 shadow-md shadow-cyan-500/20">
                <Layers className="w-full h-full text-white" />
              </div>
              <span className="font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-400">
                NEXORA<span className="text-cyan-400 ml-1">AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Intelligence that moves at the speed of ideas. Empowering teams to automate complex workflows, analyze multi-dimensional information, and build production-grade AI systems.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenAwsModal}
                className="px-3.5 py-1.5 text-xs font-mono text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-800/60 rounded-lg transition-colors flex items-center gap-2"
              >
                <Cloud className="w-3.5 h-3.5" />
                <span>AWS Deployment Specs</span>
              </button>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#product" className="hover:text-cyan-300 transition-colors">AI Automation</a></li>
              <li><a href="#product" className="hover:text-cyan-300 transition-colors">Intelligent Analytics</a></li>
              <li><a href="#core-3d" className="hover:text-cyan-300 transition-colors">3D Neural Core</a></li>
              <li><a href="#technology" className="hover:text-cyan-300 transition-colors">Workflow Orchestration</a></li>
              <li><a href="#product" className="hover:text-cyan-300 transition-colors">Developer APIs</a></li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li><a href="#use-cases" className="hover:text-cyan-300 transition-colors">Autonomous Support</a></li>
              <li><a href="#use-cases" className="hover:text-cyan-300 transition-colors">Automated DevOps</a></li>
              <li><a href="#use-cases" className="hover:text-cyan-300 transition-colors">Data Lake Topology</a></li>
              <li><a href="#use-cases" className="hover:text-cyan-300 transition-colors">Creative Studio Ops</a></li>
              <li><a href="#contact" className="hover:text-cyan-300 transition-colors">Enterprise SLA</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono mb-4">
              Infrastructure
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={onOpenAwsModal} className="hover:text-cyan-300 transition-colors text-left flex items-center gap-1">
                  <span>AWS Cloud Plan</span>
                  <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                </button>
              </li>
              <li><a href="#contact" className="hover:text-cyan-300 transition-colors">DynamoDB Schema</a></li>
              <li><a href="#platform-demo" className="hover:text-cyan-300 transition-colors">System Telemetry</a></li>
              <li><a href="#technology" className="hover:text-cyan-300 transition-colors">Security Whitepaper</a></li>
              <li><a href="#contact" className="hover:text-cyan-300 transition-colors">Documentation</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © 2026 NEXORA AI Inc. All rights reserved.
          </div>

          {/* Unboxed clean legal links with typographic separators */}
          <div className="flex items-center gap-3 text-slate-500">
            <a href="#contact" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <span aria-hidden="true">·</span>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <span aria-hidden="true">·</span>
            <a href="#contact" className="hover:text-slate-300 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
