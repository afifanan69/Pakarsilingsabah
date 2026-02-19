# Heroku Deployment Guide

## Prerequisites

1. **Heroku Account** - Sign up at https://www.heroku.com
2. **Heroku CLI** - Install from https://devcenter.heroku.com/articles/heroku-cli
3. **Git** - Already installed if you have Node.js
4. **Your App Files** - Already ready in this directory

## Step 1: Prepare Local Git Repository

```bash
cd "c:\fail kerja papa\dokumen lesen 2025\ecommerce-site"
git init
git add .
git commit -m "Initial commit: ShopHub ecommerce platform"
```

## Step 2: Login to Heroku

```bash
heroku login
```

This will open your browser for authentication.

## Step 3: Create Heroku App

```bash
heroku create your-app-name
```

Replace `your-app-name` with your desired name (e.g., `shophub-store`, `ecommerce-shop-2025`)

**Note:** App name must be unique across all Heroku apps.

## Step 4: Configure Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set API_BASE_URL=https://your-app-name.herokuapp.com/api
```

Also add any other environment variables:

```bash
heroku config:set AFFILIATE_DEFAULT_COMMISSION=5
heroku config:set AFFILIATE_MIN_PAYOUT=25
```

## Step 5: Deploy to Heroku

```bash
git push heroku main
```

If your main branch is named `master`:
```bash
git push heroku master
```

## Step 6: Open Your App

```bash
heroku open
```

This will open your deployed app in the browser!

## Step 7: Seed Database

Visit your app URL and go to `/api/seed` to load sample products:
```
https://your-app-name.herokuapp.com/api/seed
```

## Step 8: View Logs

```bash
heroku logs --tail
```

## ✅ Deployment Complete!

Your app is now live at: `https://your-app-name.herokuapp.com`

---

## 🔧 Troubleshooting

### App won't start?
```bash
heroku logs --tail
```

### Port Error?
Already handled in code, but if needed:
```bash
heroku config:set PORT=3000
```

### Database Not Working?
The database will be created automatically on first run.

### Push Failed?
Make sure you committed all changes:
```bash
git status
git add .
git commit -m "Update for Heroku"
git push heroku main
```

---

## 📊 Monitor Your App

### Check Dyno Status
```bash
heroku ps
```

### Scale (if needed)
```bash
heroku ps:scale web=1
```

### View App URL
```bash
heroku apps:info your-app-name
```

---

## 🔐 Security Considerations for Production

1. **Change API_BASE_URL** in frontend files:
   ```javascript
   const API_BASE = 'https://your-app-name.herokuapp.com/api';
   ```

2. **Generate secure keys**:
   ```bash
   heroku config:set JWT_SECRET=$(openssl rand -base64 32)
   ```

3. **Enable HTTPS** (automatic on Heroku)

4. **Use environment variables** for all secrets (never commit keys)

5. **Add authentication** before going fully live

---

## 📈 Upgrade from Free Tier

Heroku free tier goes to sleep. For production:

```bash
heroku dyno:type standard-1x --app your-app-name
```

Or upgrade through the Heroku dashboard.

---

## 🌐 Custom Domain (Optional)

```bash
heroku domains:add www.yourdomain.com --app your-app-name
```

Then update DNS settings with your domain registrar.

---

## 📱 Test Your Deployment

1. Open: https://your-app-name.herokuapp.com
2. Test home page loads
3. Go to /api/products to verify API works
4. Go to /api/seed to load test data
5. Test shopping cart and checkout
6. Try affiliate registration

---

## 🚚 Push Updates to Production

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push heroku main
```

Your app will automatically redeploy!

---

## 💡 Pro Tips

- Use `heroku run` to execute one-off commands
- Use `heroku releases` to see deployment history
- Use `heroku addons` to add databases, monitoring, etc.
- Check `Procfile` is in root directory

---

## 📞 Need Help?

- Heroku Docs: https://devcenter.heroku.com
- Check logs: `heroku logs --tail`
- Review README.md in project folder

**Your app is now live! 🚀**
