import React, { useState } from 'react';
import { X, Cloud, Terminal, Check, Copy, Layers, Server, Globe, Shield, ArrowRight } from 'lucide-react';

interface AWSDeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AWSDeploymentModal({ isOpen, onClose }: AWSDeploymentModalProps) {
  const [activeTab, setActiveTab] = useState<'s3-cloudfront' | 'ecs-fargate' | 'amplify'>('s3-cloudfront');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const s3Script = `# 1. Build the production React + Three.js applet
npm run build

# 2. Create the S3 Bucket (if not already created)
aws s3 mb s3://nexora-ai-3d-website --region us-east-1

# 3. Configure the bucket for static website hosting
aws s3 website s3://nexora-ai-3d-website --index-document index.html --error-document index.html

# 4. Sync the production dist/ bundle with optimized cache headers
aws s3 sync dist/ s3://nexora-ai-3d-website \\
  --delete \\
  --cache-control "public, max-age=31536000, immutable" \\
  --exclude "index.html"

# 5. Sync index.html with no-cache for instant zero-downtime updates
aws s3 cp dist/index.html s3://nexora-ai-3d-website/index.html \\
  --cache-control "no-cache, no-store, must-revalidate"

# 6. Invalidate CloudFront CDN edge distribution cache
aws cloudfront create-invalidation \\
  --distribution-id YOUR_CLOUDFRONT_DIST_ID \\
  --paths "/*"`;

  const dockerfileCode = `# Multi-Stage Dockerfile for AWS ECS Fargate / App Runner
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
              <Cloud className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AWS Production Deployment Blueprint</h3>
              <p className="text-xs text-slate-400">Action plan for high-availability Three.js & Supabase hosting</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-800/80 bg-slate-950 text-xs">
          <button
            onClick={() => setActiveTab('s3-cloudfront')}
            className={`pb-3 px-2 font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 's3-cloudfront'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Option 1: S3 + CloudFront CDN (Recommended)</span>
          </button>
          <button
            onClick={() => setActiveTab('ecs-fargate')}
            className={`pb-3 px-2 font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'ecs-fargate'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Option 2: AWS ECS Fargate / Docker</span>
          </button>
          <button
            onClick={() => setActiveTab('amplify')}
            className={`pb-3 px-2 font-medium border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'amplify'
                ? 'border-cyan-400 text-cyan-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Option 3: AWS Amplify / App Runner</span>
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm">
          {activeTab === 's3-cloudfront' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/50 flex items-start gap-3">
                <Globe className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Global Edge Architecture (Ultra-Fast 3D Assets)</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Host static Vite/Three.js assets in an Amazon S3 bucket behind CloudFront with 450+ Points of Presence worldwide. Client requests fetch 3D meshes, shaders, and bundles in &lt;15ms, connecting securely over TLS to an AWS API Gateway HTTP API that triggers an AWS Lambda function storing data directly into Amazon DynamoDB.
                  </p>
                </div>
              </div>

              {/* Step by Step list */}
              <div className="space-y-3">
                <div className="font-semibold text-slate-200 text-xs uppercase tracking-wider font-mono">
                  Deployment Steps & CLI Commands
                </div>
                <div className="relative rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-slate-300">
                  <button
                    onClick={() => copyToClipboard(s3Script, 's3')}
                    className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === 's3' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 's3' ? 'Copied' : 'Copy Bash Script'}</span>
                  </button>
                  <pre className="pr-24">{s3Script}</pre>
                </div>
              </div>

              {/* Environment Variable Injection */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="font-semibold text-white text-xs">Required AWS Production Environment Variables</div>
                <div className="font-mono text-xs text-cyan-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                  VITE_AWS_API_GATEWAY_URL="https://your-api-id.execute-api.us-east-1.amazonaws.com/contact"<br />
                  VITE_AWS_REGION="us-east-1"<br />
                  VITE_AWS_DYNAMODB_TABLE="nexora_contact_messages"
                </div>
                <p className="text-[11px] text-slate-400">
                  In AWS S3/CloudFront, provide these at build time (e.g. inside GitHub Actions or AWS CodePipeline) so Vite embeds them safely into the client bundle.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'ecs-fargate' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <Server className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Full-Stack Container Architecture (ECS Fargate)</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Deploy as an isolated Linux container with an Application Load Balancer (ALB) and autoscaling tasks. Ideal if you expand to backend proxy routes or private VPC database endpoints.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-semibold text-slate-200 text-xs uppercase tracking-wider font-mono">
                  Production Dockerfile
                </div>
                <div className="relative rounded-xl bg-slate-900 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-slate-300">
                  <button
                    onClick={() => copyToClipboard(dockerfileCode, 'docker')}
                    className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] flex items-center gap-1.5 transition-colors"
                  >
                    {copiedKey === 'docker' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedKey === 'docker' ? 'Copied' : 'Copy Dockerfile'}</span>
                  </button>
                  <pre className="pr-24">{dockerfileCode}</pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'amplify' && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
                <Layers className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Managed Zero-Config CI/CD (AWS Amplify Hosting)</div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Connect your GitHub repository directly to AWS Amplify. On every git push to <code className="text-cyan-400">main</code>, AWS Amplify automatically runs <code className="text-cyan-400">npm run build</code>, provisions SSL certificate, and invalidates global CDN caches.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                <div className="font-semibold text-white text-xs">amplify.yml Build Configuration</div>
                <pre className="font-mono text-xs text-slate-300 bg-slate-950 p-3 rounded-lg border border-slate-800/80 overflow-x-auto">
{`version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'`}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">SOC2 / AWS Well-Architected Standards</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
export default AWSDeploymentModal;
