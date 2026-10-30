import React, { useState } from 'react';
import { User, Cpu, Workflow, Database, LineChart, ChevronRight, Server, Cloud, Shield, Activity } from 'lucide-react';
import { TechFlowNode } from '../types';

export function TechnologyFlow() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('ai-platform');

  const nodes: TechFlowNode[] = [
    {
      id: 'user',
      label: 'USER',
      sublabel: 'Client Requests',
      protocol: 'gRPC / HTTPS',
      latency: '1.2ms',
      description: 'End-user client interaction via Web SDK, RESTful endpoints, streaming WebSockets, or native terminal CLI.',
    },
    {
      id: 'ai-platform',
      label: 'AI PLATFORM',
      sublabel: 'Neural Routing Core',
      protocol: 'Dynamic Tensor Stream',
      latency: '8.4ms',
      description: 'Central NEXORA intelligence engine distributing contextual prompts, intent classification, and multi-model consensus.',
    },
    {
      id: 'automation',
      label: 'AUTOMATION',
      sublabel: 'Workflow Orchestration',
      protocol: 'Async Event Bus',
      latency: '2.1ms',
      description: 'Idempotent state machines dispatching tasks, managing saga rollbacks, and invoking external enterprise microservices.',
    },
    {
      id: 'data',
      label: 'DATA',
      sublabel: 'AWS Cloud Data Tier',
      protocol: 'DynamoDB / Aurora Serverless',
      latency: '2.4ms',
      description: 'Persistent Amazon DynamoDB single-digit millisecond storage paired with Amazon Aurora Serverless (pgvector) and AWS S3 for contextual lakehouse ingestion.',
    },
    {
      id: 'insights',
      label: 'INSIGHTS',
      sublabel: 'Real-Time Synthesis',
      protocol: 'Server-Sent Events',
      latency: '1.8ms',
      description: 'Deterministic outcome generation, topological visual analytics, and real-time business telemetry delivered to dashboards.',
    },
  ];

  const techCategories = [
    { name: 'AI Models', spec: 'Multi-modal LLMs, Embeddings, Diffusion' },
    { name: 'Cloud Infrastructure', spec: 'AWS ECS / Fargate, Multi-AZ Kubernetes' },
    { name: 'Developer APIs', spec: 'gRPC, GraphQL, REST, TypeScript SDK' },
    { name: 'Automation Engine', spec: 'Temporal-inspired DAGs, Event Sourcing' },
    { name: 'Data Layer', spec: 'Amazon DynamoDB, Aurora Serverless, ElastiCache' },
    { name: 'Security & Mesh', spec: 'mTLS, Zero-Trust RBAC, SOC2 Compliant' },
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

  return (
    <section className="py-24 bg-[#05060A] relative" id="technology">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono mb-2">
            SYSTEM ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            High-Throughput Intelligence Pipeline
          </h2>
          <p className="text-base text-slate-400 mt-2 text-balance">
            Follow the journey of a prompt from ingress to automated execution and contextual telemetry.
          </p>
        </div>

        {/* Animated Flow Track */}
        <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-900/40 border border-slate-800/80 mb-10 overflow-hidden">
          {/* Subtle horizontal connection rail */}
          <div className="hidden lg:block absolute top-[44%] left-12 right-12 h-0.5 bg-gradient-to-r from-cyan-500/20 via-sky-400/50 to-indigo-500/20 z-0" />

          {/* Interactive Flow Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative z-10">
            {nodes.map((node, index) => {
              const isSelected = selectedNodeId === node.id;

              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNodeId(node.id)}
                  className={`text-left p-4 sm:p-5 rounded-xl transition-all duration-200 border flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-slate-900/95 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/40'
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[11px] text-slate-500 font-semibold">
                        STEP 0{index + 1}
                      </span>
                      <span className="font-mono text-[11px] text-cyan-400 tabular-nums">
                        {node.latency}
                      </span>
                    </div>

                    <div className="text-base font-bold text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                      {node.label}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {node.sublabel}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="truncate max-w-[110px]">{node.protocol}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90 text-cyan-400' : 'text-slate-600'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Node Inspector Drawer */}
          <div className="mt-8 pt-6 border-t border-slate-800/90 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>ACTIVE NODE INSPECTION</span>
                <span aria-hidden="true" className="text-slate-700">·</span>
                <span className="text-slate-400">{selectedNode.label}</span>
              </div>
              <h4 className="text-lg font-bold text-white">{selectedNode.sublabel}</h4>
              <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                {selectedNode.description}
              </p>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 gap-3 bg-slate-950/90 p-3.5 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Wire Protocol</span>
                <span className="text-xs font-mono text-slate-200 font-medium truncate block">{selectedNode.protocol}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block">Processing Delay</span>
                <span className="text-xs font-mono text-cyan-400 font-semibold">{selectedNode.latency}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Technology Foundations Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {techCategories.map((tech) => (
            <div
              key={tech.name}
              className="p-4 rounded-xl bg-slate-900/30 border border-slate-800/70"
            >
              <div className="text-xs font-semibold text-slate-200">{tech.name}</div>
              <div className="text-[11px] text-slate-400 mt-1 leading-snug">{tech.spec}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TechnologyFlow;
