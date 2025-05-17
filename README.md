# yak-shaver.com

This repository contains a simple Next.js site that is exported as a static site and deployed to GitHub Pages via GitHub Actions.

## Local development

```bash
npm install
npm run dev
```

## Build & Export

```bash
npm run build
```

The static output will be in the `out/` directory.

## Deployment

GitHub Actions will build and publish the `out/` directory to the `gh-pages` branch, which is used by GitHub Pages.
