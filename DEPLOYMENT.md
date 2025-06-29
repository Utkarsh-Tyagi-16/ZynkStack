# ZynkStack Deployment Guide

This guide will help you deploy your ZynkStack application to production.

## Deployment Architecture

- **Frontend (React/Vite)** → Vercel
- **Backend (Node.js/Express)** → Railway/Render/Heroku
- **Database** → MongoDB Atlas

## Step 1: Deploy Backend

### Option A: Railway (Recommended)

1. **Sign up** at [Railway.app](https://railway.app)
2. **Connect your GitHub repository**
3. **Create a new project** and select your ZynkStack repository
4. **Set the root directory** to `backend`
5. **Add environment variables:**
   ```
   PORT=5001
   NODE_ENV=production
   MONGO_URI=your_mongodb_atlas_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   STEAM_API_KEY=your_stream_api_key
   STEAM_API_SECRET=your_stream_api_secret
   ```
6. **Deploy** - Railway will automatically detect it's a Node.js app

### Option B: Render

1. **Sign up** at [Render.com](https://render.com)
2. **Create a new Web Service**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Name:** zynkstack-backend
   - **Root Directory:** backend
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Add environment variables** (same as Railway)
6. **Deploy**

### Option C: Heroku

1. **Install Heroku CLI** and login
2. **Create a new app:**
   ```bash
   heroku create your-app-name
   ```
3. **Set buildpack:**
   ```bash
   heroku buildpacks:set heroku/nodejs
   ```
4. **Add environment variables:**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=your_mongodb_atlas_connection_string
   heroku config:set JWT_SECRET_KEY=your_jwt_secret_key
   heroku config:set STEAM_API_KEY=your_stream_api_key
   heroku config:set STEAM_API_SECRET=your_stream_api_secret
   ```
5. **Deploy:**
   ```bash
   git push heroku main
   ```

## Step 2: Deploy Frontend to Vercel

### 1. Update Vercel Configuration

Update `frontend/vercel.json` with your actual backend URL:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-url.railway.app/api/$1"
    }
  ]
}
```

### 2. Deploy to Vercel

1. **Sign up** at [Vercel.com](https://vercel.com)
2. **Import your GitHub repository**
3. **Configure the project:**
   - **Framework Preset:** Vite
   - **Root Directory:** frontend
   - **Build Command:** `npm run build`
   - **Output Directory:** dist
4. **Add environment variables:**
   ```
   VITE_STREAM_API_KEY=your_stream_api_key
   ```
5. **Deploy**

## Step 3: Configure CORS (Backend)

Make sure your backend allows requests from your Vercel domain:

```javascript
// In backend/src/server.js
app.use(cors({
  origin: [
    'http://localhost:5173', // Development
    'https://your-app.vercel.app' // Production
  ],
  credentials: true
}));
```

## Step 4: Test Your Deployment

1. **Test backend endpoints** directly
2. **Test frontend** - should connect to backend via API routes
3. **Test authentication** flow
4. **Test real-time features** (chat, video calls)

## Environment Variables Summary

### Backend (Railway/Render/Heroku)
```
PORT=5001
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/zynkstack
JWT_SECRET_KEY=your_super_secret_jwt_key
STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret
```

### Frontend (Vercel)
```
VITE_STREAM_API_KEY=your_stream_api_key
```

## Troubleshooting

### Common Issues:

1. **CORS Errors:**
   - Ensure backend CORS includes your Vercel domain
   - Check that credentials are properly configured

2. **API Connection Issues:**
   - Verify the backend URL in `vercel.json`
   - Check that backend is running and accessible

3. **Environment Variables:**
   - Ensure all required variables are set in both platforms
   - Check that variable names match exactly

4. **Build Errors:**
   - Check that all dependencies are in `package.json`
   - Verify Node.js version compatibility

## Monitoring

- **Vercel:** Built-in analytics and performance monitoring
- **Railway:** Logs and metrics in dashboard
- **MongoDB Atlas:** Database monitoring and alerts

## Next Steps

- Set up custom domain
- Configure SSL certificates
- Set up monitoring and alerts
- Implement CI/CD pipeline 