# CI / Deployment Guide

This repository includes a GitHub Actions workflow that builds and deploys the Next.js static export located in `src/app`.

Workflow overview (.github/workflows/static.yml)
- jobs:
  - lint: runs ESLint and basic type checks
  - test: runs tests (placeholder by default)
  - build: builds static output (`npm run build:static`) and uploads artifact
  - deploy-pages: deploys artifact to GitHub Pages

Caching
- Node modules and `.next/cache` are cached to speed up builds.

Secrets and environment variables
- For GitHub Pages: no extra secret needed (uses GITHUB_TOKEN automatically).
- For Vercel deployment (optional): create `VERCEL_TOKEN` and set `if: true` in the workflow and add a deploy step.
- For Cloudflare (optional): create `CF_API_TOKEN` and configure `wrangler` or `opennext` steps accordingly.

Analytics env
- Set `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_FB_PIXEL_ID` as repository secrets or in the hosting provider to enable analytics injection (note: scripts are only loaded after user's consent).

How to customize
- To enable Vercel/Cloudflare deploy jobs, set `if: false` to `if: true` and provide the required secrets.
- To change Node version, update actions/setup-node step.

Local testing
- From project root, run:
```powershell
cd src/app
npm ci
npm run build:static
```

Notes
- Tests are placeholders; add your test runner and tests and update the `test` script in `src/app/package.json`.
- The CI is designed for static export (`next.config.ts` contains `output: 'export'`). If you migrate to SSR, adjust deployment steps accordingly.
