# Windows Heroku Deployment Guide (Step-by-Step)

## 📋 What You'll Do

This guide walks you through deploying your ShopHub ecommerce app to Heroku in 10 minutes.

---

## ✅ Prerequisites (Setup Once)

### 1. Install Heroku CLI

1. Visit: https://devcenter.heroku.com/articles/heroku-cli
2. Download **Heroku CLI** for Windows
3. Run the installer
4. Restart your computer
5. Open PowerShell or Command Prompt and verify:
   ```bash
   heroku --version
   ```

### 2. Install Git

1. Visit: https://git-scm.com/download/win
2. Download and install Git for Windows
3. Use default options during installation

### 3. Create Heroku Account

1. Visit: https://www.heroku.com/
2. Click "Sign up"
3. Fill in your details
4. Verify your email

**Done with prerequisites!** ✅

---

## 🚀 Deployment Steps

### Step 1: Open Terminal

1. Open PowerShell (right-click, "Run as Administrator")
2. Navigate to your project:
```bash
cd "c:\fail kerja papa\dokumen lesen 2025\ecommerce-site"
```

### Step 2: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: ShopHub ecommerce platform"
```

**Expected:** You'll see a list of files being added.

### Step 3: Login to Heroku

```bash
heroku login
```

Your browser will open automatically. Click "Log in" and authenticate. **Do not close the browser.**

Once authenticated, return to PowerShell.

**Expected:** Should say "Logged in"

### Step 4: Create Your Heroku App

Choose an app name (like `shophub-store-2025`) and run:

```bash
heroku create shophub-store-2025
```

Replace `shophub-store-2025` with your preferred name. **Name must be unique.**

**Expected:** You'll see:
```
Creating app... done, ⬢ shophub-store-2025
https://shophub-store-2025.herokuapp.com/ | https://git.heroku.com/shophub-store-2025.git
```

**⚠️ IMPORTANT:** Save your app name! You'll need it.

### Step 5: Configure Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set API_BASE_URL=https://shophub-store-2025.herokuapp.com/api
```

Replace `shophub-store-2025` with your actual app name.

**Expected:** Should see output for each variable set.

### Step 6: Deploy Your App

```bash
git push heroku main
```

If you get an error about "main" branch, try:
```bash
git push heroku master
```

**This will take 2-3 minutes.** You'll see lots of text as it deploys.

**Expected:** Should end with:
```
remote: -----> Compressing... done, 50MB
remote: -----> Launching... done
```

### Step 7: Open Your Live App

```bash
heroku open
```

Your app will open in your browser at: `https://shophub-store-2025.herokuapp.com`

**Congratulations! Your app is LIVE!** 🎉

### Step 8: Load Test Data

Visit this URL to load sample products:
```
https://shophub-store-2025.herokuapp.com/api/seed
```

You should see:
```json
{"success": true, "message": "Database seeded with sample products"}
```

### Step 9: Test Your Store

1. Go back to: `https://shophub-store-2025.herokuapp.com`
2. Click "Shop" and see products
3. Add items to cart
4. Go to checkout
5. Select a payment method
6. Complete an order
7. See success page ✅

---

## 🔍 Viewing Logs (If Something Goes Wrong)

```bash
heroku logs --tail
```

This shows you what's happening on the server. Very helpful for troubleshooting!

**To stop viewing logs:** Press `Ctrl+C`

---

## 🛠️ Useful Commands

| Command | Purpose |
|---------|---------|
| `heroku ps` | Check if app is running |
| `heroku config` | View all environment variables |
| `heroku open` | Open app in browser |
| `heroku logs --tail` | View live logs |
| `heroku logs --lines 50` | View last 50 log lines |
| `heroku restart` | Restart the app |
| `heroku destroy --app shophub-store-2025` | Delete app |

---

## 🚀 Making Updates

After making changes to your code:

```bash
git add .
git commit -m "Your change description"
git push heroku main
```

This will redeploy automatically!

---

## 🌐 Get a Custom Domain (Optional)

If you have a domain name (like `mystore.com`):

1. Update DNS settings at your registrar
2. Run:
```bash
heroku domains:add www.mystore.com
```

---

## ❌ Troubleshooting

### "Heroku command not found"
- Restart PowerShell
- Or reinstall Heroku CLI

### App shows "Application Error"
```bash
heroku logs --tail
```
Look for the error message.

### "git push" failed
```bash
git status
git add .
git commit -m "message"
git push heroku main
```

### Database not showing products
Visit: `https://your-app-name.herokuapp.com/api/seed`

### Cannot access app
- Wait 2-3 minutes for it to boot
- Check: `heroku ps`
- Check logs: `heroku logs --tail`

---

## 📊 Monitor Your App

### Check App Status
```bash
heroku ps
```

### View Statistics
```bash
heroku apps:info shophub-store-2025
```

Replace with your app name.

### Check Recent Deployments
```bash
heroku releases
```

---

## 🆓 Free Tier Limitations

Heroku free tier includes:
- ✅ 550 free dyno hours/month
- ✅ 1 free postgres database
- ✅ SSL certificate included
- ⚠️ App sleeps after 30 min of inactivity
- ⚠️ Wakes up on first request (5-10 sec delay)

**To use 24/7 without sleep:**
```bash
heroku dyno:type standard-1x
```

This costs ~$7/month.

---

## 💰 Cost Estimation

| Tier | Price | Use Case |
|------|-------|----------|
| **Free** | $0 | Testing/Learning |
| **Standard** | $7/month | Small production |
| **Performance** | $25/month | Medium production |
| **Private** | $50/month | Large production |

Your app runs on free tier by default!

---

## ✨ Success Checklist

- ✅ Heroku CLI installed
- ✅ Git initialized
- ✅ App created on Heroku
- ✅ Code deployed
- ✅ App is live and accessible
- ✅ Test products loaded
- ✅ Store is functional
- ✅ Ready to accept customers!

---

## 🎓 Next Steps

1. **Customize:** Update company name, colors, products
2. **Security:** Change default payment info
3. **Analytics:** Set up Google Analytics
4. **Promotion:** Share your store link
5. **Scaling:** When you need more power, upgrade your dyno

---

## 📚 Additional Resources

- Heroku Docs: https://devcenter.heroku.com
- Project README: See README.md in project folder
- API Docs: See README.md for complete API reference

---

## 🎉 Your App is Live!

**Visit:** https://shophub-store-2025.herokuapp.com

(Replace with your actual app name)

**Start selling today! 🚀**
