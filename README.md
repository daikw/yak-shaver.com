# yak-shaver.com

This repository contains a simple static site built with Vite, React and TypeScript. The site features an interactive terminal powered by the open source **react-console-emulator** library. The static output is deployed to GitHub Pages using GitHub Actions.

## Local development

```bash
npm install
npm run dev
```

## Build & Export

```bash
npm run build
```

The static output will be in the `dist/` directory.

## Deployment

GitHub Actions will build and publish the `dist/` directory to the `gh-pages` branch, which is used by GitHub Pages.
