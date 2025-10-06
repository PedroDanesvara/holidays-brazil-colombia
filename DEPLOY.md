# 🚀 Deployment Guide

Complete guide for deploying the Holidays App to production.

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [x] All tests pass (`npm run test`)
- [x] Type checking passes (`npm run type-check`)
- [x] Linting passes (`npm run lint`)
- [x] Build succeeds (`npm run build`)
- [x] Environment variables are configured
- [x] Dependencies are up to date

## 🌐 Deployment Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero configuration for Vite projects
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs
- Free tier available

#### Quick Deploy

1. **Via Vercel Dashboard**

   ```bash
   # Push your code to GitHub
   git push origin main
   ```

   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

2. **Via Vercel CLI**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login
   vercel login

   # Deploy to production
   vercel --prod
   ```

#### Configuration

The `vercel.json` file is already configured:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

#### Environment Variables

Add in Vercel Dashboard → Settings → Environment Variables:

```
VITE_APP_NAME=Holidays App
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_TRACKING=true
```

---

### Option 2: Netlify

**Why Netlify?**
- Simple deployment process
- Automatic deployments from Git
- Excellent documentation
- Free tier with generous limits

#### Quick Deploy

1. **Via Netlify Dashboard**

   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your repository
   - Build settings are auto-detected from `netlify.toml`
   - Click "Deploy"

2. **Via Netlify CLI**

   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli

   # Login
   netlify login

   # Deploy
   netlify deploy --prod
   ```

#### Configuration

The `netlify.toml` file is already configured:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Option 3: GitHub Pages

**Note**: GitHub Pages doesn't support dynamic routing out of the box. Use Vercel or Netlify for better results.

#### Steps

1. **Update `vite.config.ts`**

   ```typescript
   export default defineConfig({
     base: '/holidays-app/', // Your repo name
     // ... rest of config
   })
   ```

2. **Build and Deploy**

   ```bash
   # Build
   npm run build

   # Deploy to gh-pages branch
   npm run deploy
   ```

3. **Add deploy script to `package.json`**

   ```json
   {
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
   }
   ```

---

### Option 4: Docker

**For containerized deployments**

#### Dockerfile

```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Deploy

```bash
# Build image
docker build -t holidays-app .

# Run container
docker run -p 8080:80 holidays-app
```

---

## 🔧 Build Optimization

### 1. Analyze Bundle Size

```bash
npm run build -- --mode production

# Output shows bundle sizes
✓ 2449 modules transformed
dist/index.js   454.00 kB │ gzip: 143.64 kB
dist/index.css   24.32 kB │ gzip:   5.29 kB
```

### 2. Enable Compression

Both Vercel and Netlify automatically enable:
- Gzip compression
- Brotli compression (better than gzip)

### 3. Caching Strategy

Static assets are cached with these headers:

```
Cache-Control: public, max-age=31536000, immutable
```

This is configured in `vercel.json` and `netlify.toml`.

---

## 🔐 Security Best Practices

### 1. Environment Variables

Never commit `.env` files to Git:

```bash
# .gitignore already includes:
.env
.env.local
.env.*.local
```

### 2. Dependencies

Keep dependencies updated:

```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Audit for vulnerabilities
npm audit
npm audit fix
```

### 3. HTTPS

Both Vercel and Netlify provide:
- Automatic HTTPS
- SSL certificates (Let's Encrypt)
- HTTPS redirect from HTTP

---

## 📊 Monitoring & Analytics

### Option 1: Vercel Analytics

Free built-in analytics:

1. Enable in Vercel Dashboard
2. No code changes needed
3. Tracks Web Vitals automatically

### Option 2: Google Analytics

1. **Install**

   ```bash
   npm install react-ga4
   ```

2. **Configure**

   ```typescript
   // src/utils/analytics.ts
   import ReactGA from 'react-ga4'

   export const initGA = () => {
     ReactGA.initialize('G-XXXXXXXXXX')
   }
   ```

3. **Use**

   ```typescript
   // src/main.tsx
   import { initGA } from './utils/analytics'

   if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
     initGA()
   }
   ```

---

## 🔄 CI/CD Setup

GitHub Actions workflow is already configured (`.github/workflows/ci.yml`):

### What it does:

1. **On every push/PR**:
   - Runs type checking
   - Runs linter
   - Runs all tests
   - Builds the project

2. **On success**:
   - Uploads coverage reports
   - Creates build artifacts

### Automatic Deployments

**Vercel**: Automatically deploys on every push to `main`

**Netlify**: Automatically deploys on every push to `main`

---

## 🐛 Troubleshooting

### Build Fails

**Issue**: `npm run build` fails

**Solutions**:
```bash
# Clear cache
rm -rf node_modules dist
npm install

# Check Node version
node --version  # Should be 20.x

# Try clean build
npm run build
```

### Routes Not Working (404)

**Issue**: Refresh on `/about` shows 404

**Solution**: Ensure rewrites are configured:
- ✅ `vercel.json` has rewrites
- ✅ `netlify.toml` has redirects

### Environment Variables Not Working

**Issue**: `import.meta.env.VITE_*` is undefined

**Solution**:
1. Ensure variable starts with `VITE_`
2. Restart dev server after adding variables
3. On Vercel/Netlify, add in dashboard

---

## ✅ Post-Deployment Checklist

After deploying, verify:

- [ ] Site is accessible at production URL
- [ ] All routes work (home, about)
- [ ] Filters work correctly
- [ ] Calendar view renders properly
- [ ] Mobile responsive design works
- [ ] No console errors
- [ ] Performance is acceptable (< 2s load time)
- [ ] Analytics are tracking (if enabled)

---

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Need Help?**

Open an issue on GitHub or check the main [README](README.md) for more information.

