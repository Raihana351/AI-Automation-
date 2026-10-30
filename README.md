# NEXORA AI — 3D Intelligence Platform

> *"Intelligence that moves at the speed of ideas."*

NEXORA AI is an intelligent platform that enables engineering teams to automate workflows, analyze multi-dimensional topological data, and build production-grade AI-powered products.

---

## ⚡ Tech Stack

- **Frontend & UI**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons
- **3D & Creative Computing**: Three.js, React Three Fiber (`@react-three/fiber`), `@react-three/drei`
- **Cloud & Serverless**: AWS API Gateway, AWS Lambda, Amazon DynamoDB, Amazon S3, Amazon CloudFront
- **Build & Dev Tooling**: Vite, ES2022, PostCSS

---

## 🚀 Key Features

1. **Sticky Glassmorphic Navigation**: Responsive blur effects, smooth scroll anchors, and quick-access cloud architecture drawer.
2. **Interactive 3D Hero Core**: Real-time Three.js glowing AI core with multi-axis orbital rings and mouse-tracking particle dynamics.
3. **Cinematic Video & Neural Canvas**: Full-width media player with procedural neural network fallback and dynamic source replacer.
4. **Autonomous Capability Cards**: 6 high-density cards covering AI Automation, Intelligent Analytics, Workflow Orchestration, Real-Time Intelligence, Cloud Scale, and Developer APIs.
5. **Dedicated 3D Neural Core Viewer**:
   - Quantum Core / Neural Lattice / Plasma Reactor mode switcher
   - Speed multiplier (`0.5x`, `1.0x`, `2.0x`)
   - Pulse toggle & Wireframe inspector
   - Full OrbitControls with zero-viewport-occlusion collapsible bottom dock
   - Graceful WebGL error & reduced-motion fallbacks
6. **Live Interactive Technology Flow**: Ingress pipeline tracking from `USER → AI PLATFORM → AUTOMATION → DATA → INSIGHTS` with interactive node inspector.
7. **Production Use Cases**: Real-world case studies for AI Customer Support, Automated DevOps, Topological Data Analysis, and Content Operations.
8. **Quantified Platform Metrics**: Tabular figures animated on viewport entry.
9. **AWS Serverless Lead Ingestion**:
   - Full client-side field validation and duplicate submission guard
   - Target: Amazon DynamoDB via AWS API Gateway
   - Embedded AWS SAM & Terraform Infrastructure-as-Code templates

---

## 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions AWS CI/CD pipeline
├── public/                       # Static public assets
├── src/
│   ├── assets/
│   │   └── images/               # High-fidelity 16:9 generated visuals
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── DedicatedCoreViewer.tsx  # Dedicated 3D Core with collapsible bottom dock
│   │   │   └── HeroCore3D.tsx           # Interactive Hero 3D AI Core
│   │   ├── AIVideo.tsx           # Cinematic media player with procedural canvas
│   │   ├── AWSDeploymentModal.tsx# AWS architecture guide & bash scripts modal
│   │   ├── ContactSection.tsx    # AWS DynamoDB contact form & IaC templates
│   │   ├── Features.tsx          # 6 foundational capability cards
│   │   ├── Footer.tsx            # Footnotes, links, legal & AWS triggers
│   │   ├── Hero.tsx              # Headline, proof metrics & 3D canvas
│   │   ├── Metrics.tsx           # Viewport animated metric counters
│   │   ├── Navigation.tsx        # Top bar contract sticky navigation
│   │   ├── TechnologyFlow.tsx    # Interactive pipeline flow & node inspector
│   │   └── UseCases.tsx          # 4 production case study cards
│   ├── lib/
│   │   └── aws.ts                # AWS API Gateway & DynamoDB client + IaC templates
│   ├── types/
│   │   └── index.ts              # TypeScript schemas and data interfaces
│   ├── App.tsx                   # Root layout and section orchestration
│   ├── index.css                 # Tailwind v4 custom dark theme configuration
│   └── main.tsx                  # React entry point
├── .env.example                  # Environment variable reference
├── index.html                    # SEO meta tags, OpenGraph & Google Fonts
├── metadata.json                 # AI Studio applet specifications
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite & Tailwind configuration
```

---

## 🛠️ Local Development

### 1. Clone & Install Dependencies
```bash
git clone <your-github-repo-url>
cd <repo-name>
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update values in `.env` as needed:
```env
VITE_AWS_API_GATEWAY_URL="https://your-api-id.execute-api.us-east-1.amazonaws.com/contact"
VITE_AWS_REGION="us-east-1"
VITE_AWS_DYNAMODB_TABLE="nexora_contact_messages"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Quality & Build Checks
```bash
# Type check without emitting
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 How to Push Code to GitHub

Follow these steps to initialize git and push this repository to GitHub:

```bash
# 1. Initialize local git repository
git init

# 2. Add all files
git add .

# 3. Create initial commit
git commit -m "feat: initial release of NEXORA AI 3D website with AWS integration"

# 4. Set default branch to main
git branch -M main

# 5. Link your GitHub remote repository
# Replace <YOUR_USERNAME> and <YOUR_REPO> with your GitHub details:
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPO>.git

# 6. Push to GitHub
git push -u origin main
```

---

## ☁️ Deploying to AWS

### Option 1: Amazon S3 + CloudFront CDN (Global Edge, Lowest Latency)
```bash
# 1. Build the production bundle
npm run build

# 2. Create S3 Bucket (if not already created)
aws s3 mb s3://nexora-ai-3d-website --region us-east-1

# 3. Configure static website hosting
aws s3 website s3://nexora-ai-3d-website --index-document index.html --error-document index.html

# 4. Sync assets with 1-year immutable caching
aws s3 sync dist/ s3://nexora-ai-3d-website \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html"

# 5. Sync index.html with no-cache for instant updates
aws s3 cp dist/index.html s3://nexora-ai-3d-website/index.html \
  --cache-control "no-cache, no-store, must-revalidate"

# 6. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id <YOUR_CLOUDFRONT_DIST_ID> \
  --paths "/*"
```

### Option 2: Serverless Ingestion Pipeline (AWS SAM)
Deploy the DynamoDB table and HTTP API Gateway using AWS SAM:
```bash
sam build
sam deploy --guided
```

---

## 📄 License
Apache-2.0
