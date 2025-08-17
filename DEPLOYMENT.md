# Frontend Deployment Guide

## 🚀 Quick Deployment

### 1. Environment Setup

**No `.env` file needed!** The frontend is configured to directly use the deployed backend URL.

If you need to override the API URL, create `.env` file in frontend folder:

```bash
VITE_API_BASE_URL=https://codeintervu-backend.onrender.com/api
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
```

### 2. Build for Production

```bash
cd frontend
npm install
npm run build
```

### 3. Deploy to Netlify (Recommended)

#### Option A: Drag & Drop

1. Run `npm run build`
2. Drag the `dist` folder to Netlify dashboard
3. Set site name: `codeintervu`
4. Deploy!

#### Option B: Git Integration

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. **Set Environment Variables in Netlify (Optional):**
   - Go to **Site settings** → **Environment variables**
   - Add variables (only if you need to override defaults):
     - **Key**: `VITE_API_BASE_URL`
     - **Value**: `https://codeintervu-backend.onrender.com/api`
     - **Key**: `VITE_RAPIDAPI_KEY`
     - **Value**: `your_rapidapi_key_here`
   - **Note**: Environment variables are optional since the frontend is pre-configured
6. Deploy!

### 4. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 5. Deploy to GitHub Pages

```bash
# Add to package.json
"homepage": "https://yourusername.github.io/frontend-repo",
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Install gh-pages
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

## 🔧 Configuration

### API Configuration

- **Production**: `https://codeintervu-backend.onrender.com/api`
- **Development**: `http://localhost:5000/api`

### Build Optimization

- ✅ Code splitting enabled
- ✅ Vendor chunks separated
- ✅ Monaco Editor chunked separately
- ✅ Minification enabled
- ✅ Source maps disabled for production

## 🌐 Domain Setup

After deployment, your frontend will be available at:

- Netlify: `https://codeintervu.netlify.app`
- Vercel: `https://your-project.vercel.app`
- GitHub Pages: `https://yourusername.github.io/frontend-repo`

## 🔒 Security

- ✅ CORS configured for production domains
- ✅ Environment variables for API URLs
- ✅ Build optimization for performance

## 📝 Post-Deployment Checklist

- [ ] Test homepage loading
- [ ] Test online compiler
- [ ] Test category navigation
- [ ] Test tutorial pages
- [ ] Verify API connectivity
- [ ] Check mobile responsiveness

## 🚨 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Connection Issues

1. Check environment variables
2. Verify backend is running
3. Test API endpoints manually
4. Check CORS configuration

### Deployment Issues

1. Ensure all dependencies are in package.json
2. Check build output directory
3. Verify environment variables are set
4. Check deployment platform logs

## 🎯 Features Ready for Deployment

- ✅ Online Compiler with Judge0 integration
- ✅ Categories Grid with real logos
- ✅ Tutorial system
- ✅ Responsive design
- ✅ API integration with backend
- ✅ Real-time code execution
