# EcoTrace Logistics - Deployment Guide

## 🚀 Quick Deployment Options

Your React application is ready to deploy! Here are the best options:

---

## Option 1: Vercel (Recommended - Easiest)

### Why Vercel?
- ✅ **Free tier** with generous limits
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Zero configuration** for Vite apps
- ✅ **Instant deployments** (30 seconds)
- ✅ **Custom domains** supported

### Deployment Steps

#### Method A: Using Vercel CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Navigate to your project
cd route-optimization-app

# 3. Deploy (first time)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? ecotrace-logistics (or your choice)
# - Directory? ./ (press Enter)
# - Override settings? No

# 4. Your app is now live! 🎉
# You'll get a URL like: https://ecotrace-logistics.vercel.app
```

#### Method B: Using Vercel Dashboard (No CLI needed)

1. **Create account**: Go to [vercel.com](https://vercel.com) and sign up (free)
2. **Import project**: Click "Add New" → "Project"
3. **Connect Git** (recommended):
   - Push your code to GitHub first:
     ```bash
     cd route-optimization-app
     git init
     git add .
     git commit -m "Initial commit - EcoTrace Logistics"
     # Create a repo on GitHub, then:
     git remote add origin YOUR_GITHUB_REPO_URL
     git push -u origin main
     ```
   - In Vercel, import from GitHub
   - Select your repository
   - Click "Deploy"

4. **Or upload directly**:
   - Build your app: `npm run build`
   - Drag and drop the `dist` folder to Vercel

**Result**: Your app will be live at `https://your-project-name.vercel.app`

---

## Option 2: Netlify

### Why Netlify?
- ✅ **Free tier** with 100GB bandwidth
- ✅ **Drag-and-drop** deployment
- ✅ **Automatic HTTPS**
- ✅ **Form handling** and serverless functions
- ✅ **Split testing** capabilities

### Deployment Steps

#### Using Netlify CLI

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Build your app
cd route-optimization-app
npm run build

# 3. Deploy
netlify deploy

# Follow prompts:
# - Authorize Netlify
# - Create new site? Yes
# - Site name? ecotrace-logistics
# - Publish directory? dist

# 4. Deploy to production
netlify deploy --prod
```

#### Using Netlify Dashboard

1. Go to [netlify.com](https://netlify.com) and sign up
2. Click "Add new site" → "Deploy manually"
3. Build your app: `npm run build`
4. Drag the `dist` folder to Netlify
5. Done! Your site is live

---

## Option 3: GitHub Pages

### Why GitHub Pages?
- ✅ **Completely free**
- ✅ **Integrated with GitHub**
- ✅ **Custom domains** supported
- ✅ **Simple workflow**

### Deployment Steps

```bash
# 1. Install gh-pages package
cd route-optimization-app
npm install --save-dev gh-pages

# 2. Add to package.json (already done below)
# See the updated package.json section

# 3. Create GitHub repository
# Go to github.com and create a new repo: ecotrace-logistics

# 4. Initialize git and push
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ecotrace-logistics.git
git push -u origin main

# 5. Deploy to GitHub Pages
npm run deploy

# Your app will be live at:
# https://YOUR_USERNAME.github.io/ecotrace-logistics/
```

### Update package.json

Add these scripts and homepage to your `package.json`:

```json
{
  "name": "route-optimization-app",
  "homepage": "https://YOUR_USERNAME.github.io/ecotrace-logistics",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Update vite.config.js for GitHub Pages

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ecotrace-logistics/', // Add this line
})
```

---

## Option 4: Railway

### Why Railway?
- ✅ **$5 free credit** per month
- ✅ **Easy database** integration
- ✅ **Environment variables**
- ✅ **Automatic deployments**

### Deployment Steps

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
cd route-optimization-app
railway init

# 4. Deploy
railway up

# Your app will be live with a Railway URL
```

---

## Option 5: Render

### Why Render?
- ✅ **Free tier** for static sites
- ✅ **Automatic SSL**
- ✅ **Global CDN**
- ✅ **Pull request previews**

### Deployment Steps

1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Static Site"
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click "Create Static Site"

---

## 📦 Pre-Deployment Checklist

Before deploying, ensure:

- [x] ✅ Build works locally: `npm run build`
- [x] ✅ Preview build: `npm run preview`
- [ ] Update app title in `index.html`
- [ ] Add favicon (optional)
- [ ] Set up environment variables (if needed)
- [ ] Test on different browsers
- [ ] Check mobile responsiveness

---

## 🔧 Build Configuration

Your app is already configured for production builds with Vite. The build process:

1. **Optimizes** all JavaScript and CSS
2. **Minifies** code for smaller file sizes
3. **Tree-shakes** unused code
4. **Generates** optimized assets in `dist/` folder

### Build Output

After running `npm run build`, you'll see:

```
dist/
├── assets/
│   ├── index-[hash].js      (optimized JavaScript)
│   ├── index-[hash].css     (optimized CSS)
│   └── [images/fonts]       (optimized assets)
└── index.html               (entry point)
```

---

## 🌐 Custom Domain Setup

### For Vercel/Netlify

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain (e.g., `ecotrace.com`)
4. Update DNS records:
   ```
   Type: CNAME
   Name: www
   Value: [your-project].vercel.app (or netlify.app)
   ```

### For GitHub Pages

1. Add `CNAME` file to `public/` folder:
   ```
   ecotrace.com
   ```
2. Update DNS:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
          185.199.109.153
          185.199.110.153
          185.199.111.153
   ```

---

## 🔒 Environment Variables

If you need to add API keys or environment variables:

### Vercel
```bash
vercel env add VITE_API_KEY
```

### Netlify
```bash
netlify env:set VITE_API_KEY your-key-value
```

### In Code
```javascript
const apiKey = import.meta.env.VITE_API_KEY;
```

---

## 📊 Performance Optimization

Your app is already optimized, but for even better performance:

1. **Enable compression** (automatic on Vercel/Netlify)
2. **Use CDN** (automatic on most platforms)
3. **Lazy load routes** (already implemented with React Router)
4. **Optimize images** (use WebP format)
5. **Enable caching** (automatic on most platforms)

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### Routes Don't Work (404 on refresh)

Add `_redirects` file to `public/` folder:
```
/*    /index.html   200
```

Or for Vercel, create `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Map Not Loading

Ensure Leaflet CSS is imported in your components.

---

## 🎯 Recommended: Vercel Deployment

**I recommend Vercel** for the easiest and fastest deployment:

```bash
# Quick deploy (3 commands)
npm install -g vercel
cd route-optimization-app
vercel --prod

# That's it! Your app is live in ~30 seconds 🚀
```

---

## 📱 Post-Deployment

After deployment:

1. ✅ Test all features on live site
2. ✅ Check mobile responsiveness
3. ✅ Test on different browsers
4. ✅ Share the URL!
5. ✅ Set up analytics (optional):
   - Google Analytics
   - Vercel Analytics
   - Plausible

---

## 🔗 Useful Links

- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Pages**: https://pages.github.com
- **Vite Deployment**: https://vitejs.dev/guide/static-deploy.html

---

## 💡 Next Steps

After deployment, consider:

1. **Add a README** to your GitHub repo
2. **Set up CI/CD** for automatic deployments
3. **Add monitoring** (Sentry, LogRocket)
4. **Enable analytics**
5. **Add a custom domain**
6. **Set up staging environment**

---

## 🎉 Your App is Ready!

Your EcoTrace Logistics application is production-ready and can be deployed in minutes!

**Fastest option**: Run `vercel` and your app will be live in 30 seconds!

Good luck with your deployment! 🚀
