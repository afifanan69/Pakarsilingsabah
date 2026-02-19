# Quick Start Guide - ShopHub Ecommerce Platform

## ⚡ Quick Start (2 minutes)

### 1. Install Dependencies
```bash
cd ecommerce-site
npm install
```

### 2. Start Server
```bash
npm start
```

### 3. Open Browser
Navigate to: **http://localhost:3000**

### 4. Load Sample Data
Click this link to seed database with products:
**http://localhost:3000/api/seed**

## 🧪 Test the Platform

### Customer Flow
1. ✅ Go to **Home** - See featured products
2. ✅ Click **Shop** - Browse all products
3. ✅ Click **View Details** - See product info
4. ✅ Add to cart - Add 2-3 items
5. ✅ Go to **Cart** - Review items
6. ✅ Click **Proceed to Checkout**
7. ✅ Fill customer info
8. ✅ Select payment method (use test card: 1234567890123456)
9. ✅ Complete order

### Expected Result: Success Page
- Order number displayed
- Transaction ID shown
- Confirmation details visible

### Affiliate Flow
1. ✅ Click **Join Affiliate**
2. ✅ Fill registration form
3. ✅ Select platform (TikTok/Facebook/etc)
4. ✅ Submit form
5. ✅ Get affiliate code
6. ✅ Copy referral link

## 🎯 Features to Try

| Feature | How to Test |
|---------|------------|
| **Add to Cart** | Click product → Add to Cart → See badge update |
| **Product Filter** | Shop → Select Category → Items filter |
| **Payment Methods** | Checkout → See all 5 payment options |
| **Success Page** | Complete payment → See order confirmation |
| **Affiliate Registration** | Join Affiliate → Register → Get code |
| **Social Sharing** | Product page → Click TikTok/Facebook buttons |

## 📝 Test Payment Methods

### Credit Card (Works)
- Card Number: `1234567890123456`
- Expiry: `12/25`
- CVV: `123`

### Bank Transfer (Pending)
- No card needed
- Will show pending page
- Requires manual verification

### E-Wallet (Works)
- Just select option
- Will complete instantly

### Crypto (Pending)
- Will generate wallet address
- Shows pending confirmation

## 🔧 API Testing

### Get All Products
```bash
curl http://localhost:3000/api/products
```

### Create Order
```bash
curl -X POST http://localhost:3000/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "items": [{"product_id": 1, "product_name": "Headphones", "price": 199.99, "quantity": 1}],
    "affiliate_code": null
  }'
```

### Register Affiliate
```bash
curl -X POST http://localhost:3000/api/affiliate/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Affiliate",
    "email": "john@affiliate.com",
    "platform": "tiktok"
  }'
```

## 🎨 Customize Before Deployment

### Update Colors
Edit `public/assets/css/style.css`:
```css
--primary-color: #007bff;      /* Change brand color */
--secondary-color: #6c757d;
```

### Update Company Name
1. Edit `public/index.html` - `<title>` and navbar
2. Edit all HTML files - update copyright
3. Edit social media links

### Update Product Images
- Replace placeholder URLs in products
- Or edit sample data URL in API calls

## 📊 Database

Database is auto-created at: `db/ecommerce.db`

### Reset Database
```bash
rm db/ecommerce.db
npm start
# Then visit /api/seed again
```

## 🚀 Deploy to Production

### Required Steps
1. Buy domain name
2. Get SSL certificate
3. Change API_BASE in `app.js` to production URL
4. Use real payment gateway (Stripe, PayPal, etc)
5. Add authentication system
6. Set up proper database (PostgreSQL/MySQL)
7. Add security headers
8. Enable HTTPS only

### Deploy on Heroku
```bash
heroku create your-app-name
git push heroku main
heroku open
```

### Deploy on AWS
- Use EC2 for server
- Use RDS for database
- Use CloudFront for CDN
- Use S3 for images

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Port 3000 in use** | `npm start -- --port 3001` |
| **No products showing** | Visit `http://localhost:3000/api/seed` |
| **Cart not saving** | Check browser localStorage is enabled |
| **Database error** | Check `db/` folder permissions |
| **CORS error** | Ensure server is running on localhost:3000 |

## 📞 Support

- Check README.md for detailed documentation
- Review code comments in JavaScript files
- Check browser console for error messages

## ✨ What's Included

✅ Complete frontend (HTML, CSS, JS)
✅ Express.js backend
✅ SQLite database
✅ Payment processing
✅ Affiliate system
✅ Social media integration
✅ Responsive design
✅ 8 HTML pages
✅ 3 JavaScript modules
✅ Sample products
✅ API documentation
✅ This quick start guide

---

**Ready to go? Type `npm start` and visit http://localhost:3000! 🚀**
