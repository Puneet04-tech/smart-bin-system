# Smart Bin System - Deployment Guide

## 🚀 Deployment to Vercel

### Prerequisites
- Vercel account
- GitHub repository
- External database (PostgreSQL recommended)

### Steps
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     ```
     NEXTAUTH_URL=https://your-domain.vercel.app
     NEXTAUTH_SECRET=your-secret-key
     DATABASE_URL=postgresql://user:pass@host:port/db
     ```

3. **Build Settings**
   - Framework: Next.js
   - Build Command: `npm run vercel-build`
   - Output Directory: `.next`

## 🚀 Deployment to Netlify

### Prerequisites
- Netlify account
- GitHub repository
- External database (PostgreSQL recommended)

### Steps
1. **Configure for Static Export**
   - Update `next.config.ts` (already done)
   - Build with: `npm run netlify-build`

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run netlify-build`
     - Publish directory: `.next`

3. **Environment Variables**
   Set these in Netlify dashboard:
   ```
   NEXTAUTH_URL=https://your-domain.netlify.app
   NEXTAUTH_SECRET=your-secret-key
   DATABASE_URL=postgresql://user:pass@host:port/db
   ```

## ⚠️ Important Notes

### Database Issues
- **Local SQLite won't work** on Vercel/Netlify
- Use external PostgreSQL (Supabase, PlanetScale, Railway)
- Update `prisma/schema.prisma` provider to `postgresql`

### Environment Variables
- Never commit `.env` files
- Use platform's environment variable settings
- Copy from `env-production-example.txt`

### API Routes
- Some API routes may need adjustments for serverless
- Test all endpoints after deployment

## 🔧 Database Migration

### Switch to PostgreSQL
1. Update `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url = env("DATABASE_URL")
   }
   ```

2. Generate client:
   ```bash
   npx prisma generate
   ```

3. Push schema:
   ```bash
   npx prisma db push
   ```

## 🐛 Common Issues & Solutions

### Build Failures
- Check Node.js version (use 18+)
- Verify all dependencies installed
- Check TypeScript errors

### Runtime Errors
- Environment variables missing
- Database connection issues
- API route timeouts

### Performance
- Enable caching headers
- Optimize images
- Use CDN for static assets

## 📱 Testing After Deployment

1. **Basic Functionality**
   - Page loading
   - Navigation
   - Responsive design

2. **Features**
   - AI detection
   - Bin finder
   - User authentication

3. **API Endpoints**
   - Test all `/api/*` routes
   - Check error handling

## 🔄 Continuous Deployment

Both platforms support automatic deployments when you push to GitHub. Ensure your main branch is always deployable!
