# 🚀 Passo 11: Deploy e Produção

## Objetivo
Preparar a aplicação para produção e fazer deploy em plataformas modernas.

## 1. Otimizações de Build

### Vite Configuration

**`vite.config.ts`**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', '@headlessui/react'],
          utils: ['date-fns', 'clsx'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
})
```

### Compression

```bash
npm install -D vite-plugin-compression
```

```typescript
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
})
```

## 2. Environment Variables

**`.env.production`**
```env
VITE_APP_TITLE=Holidays Calendar
VITE_APP_VERSION=1.0.0
VITE_APP_ENV=production
```

## 3. PWA (Progressive Web App)

```bash
npm install -D vite-plugin-pwa
```

**Configuração:**
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Holidays Calendar',
        short_name: 'Holidays',
        description: 'Public holidays calendar for Brazil and Colombia',
        theme_color: '#47A1C3',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
```

## 4. Deploy Options

### Option 1: Vercel (Recomendado)

**`vercel.json`**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Deploy:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deploy
vercel --prod
```

### Option 2: Netlify

**`netlify.toml`**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Deploy:**
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

### Option 3: GitHub Pages

```bash
npm install -D gh-pages
```

**`package.json`:**
```json
{
  "homepage": "https://username.github.io/holidays-app",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**`vite.config.ts`:**
```typescript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/holidays-app/' : '/',
  // ... rest
})
```

## 5. Docker (Opcional)

**`Dockerfile`**
```dockerfile
# Build stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

**`nginx.conf`**
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**`.dockerignore`**
```
node_modules
dist
.git
.env
.env.local
*.log
```

**Build and run:**
```bash
# Build
docker build -t holidays-app .

# Run
docker run -p 8080:80 holidays-app
```

**`docker-compose.yml`**
```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

## 6. Performance Monitoring

### Web Vitals

```bash
npm install web-vitals
```

**`src/utils/reportWebVitals.ts`**
```typescript
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals'

function sendToAnalytics(metric: any) {
  // Send to analytics service
  console.log(metric)
}

export function reportWebVitals() {
  onCLS(sendToAnalytics)
  onFID(sendToAnalytics)
  onFCP(sendToAnalytics)
  onLCP(sendToAnalytics)
  onTTFB(sendToAnalytics)
}
```

**`src/main.tsx`**
```typescript
import { reportWebVitals } from './utils/reportWebVitals'

// ... existing code

reportWebVitals()
```

### Sentry (Error Tracking)

```bash
npm install @sentry/react
```

```typescript
import * as Sentry from '@sentry/react'

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: 'YOUR_SENTRY_DSN',
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
}
```

## 7. Analytics

### Google Analytics

```bash
npm install react-ga4
```

```typescript
import ReactGA from 'react-ga4'

if (import.meta.env.PROD) {
  ReactGA.initialize('G-XXXXXXXXXX')
}

// Track page views
const location = useLocation()

useEffect(() => {
  ReactGA.send({ hitType: 'pageview', page: location.pathname })
}, [location])
```

## 8. Security Headers

**`vercel.json` or `netlify.toml`:**
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        },
        {
          "key": "Permissions-Policy",
          "value": "camera=(), microphone=(), geolocation=()"
        }
      ]
    }
  ]
}
```

## 9. SEO

**`index.html`**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO -->
  <meta name="description" content="Public holidays calendar for Brazil and Colombia. View and filter holidays in list or calendar format." />
  <meta name="keywords" content="holidays, calendar, Brazil, Colombia, public holidays" />
  <meta name="author" content="Team CALA" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Holidays Calendar - Brazil & Colombia" />
  <meta property="og:description" content="Public holidays calendar for Brazil and Colombia" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://your-domain.com" />
  <meta property="og:image" content="https://your-domain.com/og-image.png" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Holidays Calendar - Brazil & Colombia" />
  <meta name="twitter:description" content="Public holidays calendar for Brazil and Colombia" />
  <meta name="twitter:image" content="https://your-domain.com/twitter-image.png" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  
  <title>Holidays Calendar - Brazil & Colombia</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

**Sitemap (`public/sitemap.xml`):**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-domain.com/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://your-domain.com/calendar</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://your-domain.com/about</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>0.5</priority>
  </url>
</urlset>
```

**Robots.txt (`public/robots.txt`):**
```
User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

## 10. Checklist de Deploy

- [ ] Build sem erros
- [ ] Todos os testes passando
- [ ] Lint sem warnings
- [ ] Type check sem erros
- [ ] Environment variables configuradas
- [ ] Assets otimizados (imagens comprimidas)
- [ ] Bundle size aceitável (< 500KB)
- [ ] Lighthouse score > 90
- [ ] Testado em múltiplos navegadores
- [ ] Testado em mobile
- [ ] Analytics configurado
- [ ] Error tracking configurado
- [ ] SEO tags configuradas
- [ ] Security headers configurados
- [ ] PWA funcional (se aplicável)
- [ ] Cache strategy definida
- [ ] Backup do código

---

**Próximo Passo**: [12-melhorias-futuras.md](./12-melhorias-futuras.md)

