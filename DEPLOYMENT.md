# Vercel Deployment Configuration

## Issues Fixed

### 1. COOP/COEP Headers for SQLite WASM
The `vercel.json` file adds required headers for SharedArrayBuffer and Atomics support:
- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Embedder-Policy: require-corp

### 2. CSS 404 Error
The `output.css` file needs to be built before deployment or the path needs to be corrected.

## Deployment Steps

### Option 1: Build Before Deploy
```bash
npm run build
npm run css:build
```
Then deploy the `dist/` directory.

### Option 2: Update CSS Reference
If keeping single HTML file, update the CSS link in `index.html`:
```html
<!-- Change from -->
<link href="/dist/output.css" rel="stylesheet">
<!-- To -->
<link href="./output.css" rel="stylesheet">
```

### Option 3: Use Inline Styles
Move all CSS inline in the HTML file to avoid external file dependencies.

## SQLite Fallback
The app will automatically fall back to localStorage if SQLite WASM cannot load (which happens on many hosting platforms due to security restrictions). This provides full functionality except for some advanced SQLite features.
