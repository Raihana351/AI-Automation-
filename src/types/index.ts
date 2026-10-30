export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  created_at?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight: string;
  capabilities: string[];
}

export interface UseCaseItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techTags: string[];
  metricLabel: string;
  metricValue: string;
  imageSrc: string;
  ctaText: string;
}

export interface MetricItem {
  value: string;
  numericTarget: number;
  prefix?: string;
  suffix: string;
  label: string;
  subtext: string;
}

export interface TechFlowNode {
  id: string;
  label: string;
  sublabel: string;
  protocol: string;
  latency: string;
  description: string;
}
