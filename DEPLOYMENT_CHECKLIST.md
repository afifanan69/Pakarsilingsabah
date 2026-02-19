# Deployment Checklist

## Pre-Deployment ✅

- [ ] All code committed to git
- [ ] Environment variables in .env.example
- [ ] Heroku CLI installed
- [ ] Heroku account created
- [ ] Node.js version compatible (18.x recommended)
- [ ] All dependencies in package.json
- [ ] Procfile in root directory
- [ ] No sensitive data in code

## Local Testing ✅

- [ ] `npm install` successful
- [ ] `npm start` server runs without errors
- [ ] Home page loads at http://localhost:3000
- [ ] `/api/products` returns products
- [ ] `/api/seed` populates database
- [ ] Shopping cart works
- [ ] Checkout form validates
- [ ] All 5 payment methods visible
- [ ] Affiliate registration works
- [ ] Social sharing buttons functional

## Heroku Deployment ✅

**Step 1: Initialize Git**
- [ ] `cd` into project directory
- [ ] `git init`
- [ ] `git add .`
- [ ] `git commit -m "Initial commit"`

**Step 2: Create Heroku App**
- [ ] `heroku login`
- [ ] `heroku create your-app-name`
- [ ] App name noted: ___________________

**Step 3: Configure Environment**
- [ ] `heroku config:set NODE_ENV=production`
- [ ] `heroku config:set API_BASE_URL=https://[app-name].herokuapp.com/api`
- [ ] Any additional config variables set

**Step 4: Deploy**
- [ ] `git push heroku main` (or master)
- [ ] Deployment completed successfully
- [ ] Check logs: `heroku logs --tail`

**Step 5: Verify Deployment**
- [ ] App opening without errors: `heroku open`
- [ ] Health check: `/health` endpoint works
- [ ] API responding: `/api/products` works
- [ ] Database initialized

## Post-Deployment ✅

- [ ] Visit your live URL
- [ ] Test homepage loads
- [ ] Navigate through pages
- [ ] Test `/api/seed` to load products
- [ ] Browse products
- [ ] Add items to cart
- [ ] Complete test purchase
- [ ] Verify success page displays
- [ ] Test affiliate registration
- [ ] Share button functionality

## Production Configuration ✅

- [ ] Update frontend `API_BASE` to production URL
- [ ] Set up custom domain (if applicable)
- [ ] Enable HTTPS (automatic on Heroku)
- [ ] Generate and set secure JWT_SECRET
- [ ] Generate SESSION_SECRET
- [ ] Configure payment gateway credentials
- [ ] Set up email notifications (optional)
- [ ] Enable monitoring/alerts

## Monitoring & Maintenance ✅

- [ ] Set up Heroku metrics monitoring
- [ ] Enable log drain to external service
- [ ] Schedule daily backups
- [ ] Monitor app performance
- [ ] Check error logs weekly
- [ ] Review affiliate commissions
- [ ] Test payment processing regularly

## Scaling & Optimization ✅

- [ ] Upgrade from free dyno if needed
- [ ] Enable auto-scaling
- [ ] Set up CDN for assets
- [ ] Optimize database queries
- [ ] Implement caching strategy
- [ ] Test under load

## Security Hardening ✅

- [ ] Enable two-factor authentication on Heroku
- [ ] Rotate secrets periodically
- [ ] Audit dependencies for vulnerabilities
- [ ] Implement rate limiting
- [ ] Add request validation
- [ ] Set security headers
- [ ] Enable CORS restrictions
- [ ] Update privacy policy

## Marketing & Launch ✅

- [ ] Set up social media accounts
- [ ] Create social media links
- [ ] Configure email confirmation template
- [ ] Set up analytics tracking
- [ ] Create FAQ/Help section
- [ ] Add contact information
- [ ] Launch marketing campaign
- [ ] Announce to affiliates

## Troubleshooting Commands

**Check App Status**
```bash
heroku ps
heroku logs --tail
heroku status
```

**View Configuration**
```bash
heroku config
heroku config:get API_BASE_URL
```

**Scale Application**
```bash
heroku ps:scale web=2
```

**Run Migrations/Commands**
```bash
heroku run "npm run migrate"
heroku run bash
```

**View Releases**
```bash
heroku releases
heroku releases:rollback
```

**Update Application**
```bash
git push heroku main
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| **Application error** | `heroku logs --tail` to see what went wrong |
| **Port error** | PORT set automatically by Heroku |
| **Database not initialized** | Visit `/api/seed` after deployment |
| **API not responding** | Check if dyno is running: `heroku ps` |
| **503 Service Unavailable** | App might be restarting, wait 1-2 minutes |
| **Push rejected** | Commit all changes: `git status`, `git add .`, `git commit -m "message"` |

---

## Live App URLs

**Homepage:** https://[app-name].herokuapp.com
**API Base:** https://[app-name].herokuapp.com/api
**Health Check:** https://[app-name].herokuapp.com/health

---

## Support Resources

- Heroku Docs: https://devcenter.heroku.com
- Node.js Docs: https://nodejs.org/docs
- SQLite Docs: https://www.sqlite.org/docs.html
- This Project README: See README.md

---

**Status:** Ready for Deployment 🚀

✅ All files prepared
✅ Environment configured
✅ Documentation complete
👉 Next: Run Heroku deployment commands
