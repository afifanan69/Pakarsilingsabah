# Configure API for Production Deployment

After deploying to Heroku, you need to update your frontend to point to the production API.

## 🔄 Update API Base URL

### Step 1: Find Files to Update

Open the following file in your text editor:

**File:** `public/assets/js/app.js`

### Step 2: Find the API_BASE Line

Look for this line (around line 3):

```javascript
const API_BASE = 'http://localhost:3000/api';
```

### Step 3: Replace with Production URL

Change it to your Heroku app URL:

```javascript
const API_BASE = 'https://shophub-store-2025.herokuapp.com/api';
```

Replace `shophub-store-2025` with your actual Heroku app name.

### Step 4: Save & Commit

```bash
git add public/assets/js/app.js
git commit -m "Update API base URL for production"
git push heroku main
```

---

## ✅ Verification

After updating, test these endpoints in your browser:

1. **Home Page**
   - Visit: https://shophub-store-2025.herokuapp.com/

2. **API Test**
   - Visit: https://shophub-store-2025.herokuapp.com/api/products
   - Should display JSON product list

3. **Seed Data (if needed)**
   - Visit: https://shophub-store-2025.herokuapp.com/api/seed
   - Should show success message

4. **Health Check**
   - Visit: https://shophub-store-2025.herokuapp.com/health
   - Should show status: OK

---

## 🔐 Production Security Settings

### 1. Environment Variables (Already Set)

Your Heroku environment is configured with:

```bash
NODE_ENV=production
API_BASE_URL=https://shophub-store-2025.herokuapp.com/api
AFFILIATE_DEFAULT_COMMISSION=5
AFFILIATE_MIN_PAYOUT=25
```

### 2. HTTPS (Automatic)

✅ All connections are automatically HTTPS on Heroku

### 3. Generate Secure Secrets (Optional)

For advanced security, generate secure keys:

```bash
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set SESSION_SECRET=$(openssl rand -base64 32)
```

---

## 📝 Configuration Files

### .env.example (Reference Only)

This file shows what environment variables exist. Never modify it for production.

### .env (Not Used in Heroku)

Heroku uses `heroku config`, not .env files. So no .env file needed for deployment.

### environment.json (Optional)

You can create an optional config file:

```json
{
  "development": {
    "api_base": "http://localhost:3000/api",
    "payment_test_mode": true
  },
  "production": {
    "api_base": "https://shophub-store-2025.herokuapp.com/api",
    "payment_test_mode": false
  }
}
```

---

## 🧪 Test Payment Processing

### Test Card Numbers

Use these to test all payment methods:

| Method | Test Value |
|--------|-----------|
| Credit Card | 1234567890123456 (16 digits) |
| Expiry | 12/25 (any future date) |
| CVV | 123 (any 3 digits) |

### Test Payment Flow

1. Add item to cart
2. Go to checkout
3. Select "Credit Card"
4. Use test card number: `1234567890123456`
5. Use expiry: `12/25`
6. Use CVV: `123`
7. Click "Complete Order"
8. Should see success page ✅

---

## 🔗 API Endpoints (Production)

All endpoints now use your production URL:

```bash
# Get all products
GET https://shophub-store-2025.herokuapp.com/api/products

# Create order
POST https://shophub-store-2025.herokuapp.com/api/orders/create

# Process payment
POST https://shophub-store-2025.herokuapp.com/api/payment/process

# Register affiliate
POST https://shophub-store-2025.herokuapp.com/api/affiliate/register
```

---

## 🚀 Deployment Checklist

Use this checklist after updating the API URL:

- [ ] API_BASE updated in app.js
- [ ] Changes committed to git
- [ ] Changes pushed to heroku
- [ ] App redeployed (should take 1-2 min)
- [ ] Homepage loads without errors
- [ ] `/api/products` returns products
- [ ] Shopping cart works
- [ ] Checkout works
- [ ] Payment methods visible
- [ ] Success page displays after payment
- [ ] Affiliate signup works
- [ ] Social sharing buttons functional

---

## 🔧 Debugging

### Check What URL App is Using

Open your browser console (F12) and run:

```javascript
console.log(API_BASE)
```

Should output: `https://shophub-store-2025.herokuapp.com/api`

### Test API Connection

In browser console:

```javascript
fetch(API_BASE + '/products')
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error(err))
```

Should show your products in the console.

### View Server Response

Check logs:

```bash
heroku logs --tail
```

This shows what the server is doing and any errors.

---

## 📱 Frontend vs Backend

### Frontend (Browser)
- Location: `public/` folder (HTML, CSS, JS)
- Runs: In your browser
- Makes API calls to backend

### Backend (Server)
- Location: `src/` folder (Node.js)
- Runs: On Heroku server
- Provides API endpoints

Both must be on the same Heroku app for everything to work correctly.

---

## 🎯 Final Check

After deploying, your app should look like this:

1. **Browser Address Bar:** https://shophub-store-2025.herokuapp.com/
2. **Homepage:** Loads with featured products
3. **Shop Page:** Shows product catalog
4. **Network Requests:** Go to https://shophub-store-2025.herokuapp.com/api/products
5. **All Working:** Both frontend and API are integrated

---

## ✨ You're Ready!

Your production ecommerce store is now live and configured! 🚀

**Next Steps:**
1. Promote your store
2. Register affiliates
3. Monitor sales
4. Handle customer support

---

## 📞 Help & Support

If API calls aren't working:

1. Check app logs: `heroku logs --tail`
2. Verify API_BASE is correct
3. Check that app name is spelled correctly
4. Ensure frontend and backend are on same Heroku app

See **DEPLOY_WINDOWS.md** for common troubleshooting.
