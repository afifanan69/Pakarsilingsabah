# ShopHub - Full-Featured Ecommerce Platform

A complete ecommerce website with local payment gateway, affiliate system, and social media integration.

## Features

### 🛒 Ecommerce Features
- **Product Catalog** - Browse and search products by category
- **Shopping Cart** - Add/remove items, manage quantities
- **Checkout System** - Multi-step checkout process
- **Product Details** - Detailed product information with images
- **Responsive Design** - Works on desktop, tablet, and mobile

### 💳 Payment Gateway (Local)
- **Credit/Debit Card** - Card payment processing
- **Bank Transfer** - Direct bank transfer option
- **E-Wallet** - E-wallet payment support
- **Cryptocurrency** - Bitcoin and crypto payment option
- **Payment Logging** - All transactions are logged

### ✅ Order Management
- **Success Page** - Confirmation after successful payment
- **Cancellation Page** - Cancellation and error handling
- **Pending Page** - For payments awaiting confirmation
- **Order Tracking** - View order status and details

### 💰 Affiliate System
- **Affiliate Registration** - Easy sign-up for affiliates
- **Commission Tracking** - Track earnings and commissions
- **Referral Links** - Unique links and codes for affiliates
- **Analytics Dashboard** - Real-time stats and metrics
- **Multi-Platform Support** - TikTok, Facebook, Instagram, YouTube

### 📱 Social Media Integration
- **TikTok Sharing** - Share products on TikTok
- **Facebook Sharing** - Integrated Facebook sharing
- **Instagram Sharing** - Instagram promotion tools
- **WhatsApp Integration** - Share via WhatsApp
- **Social Analytics** - Track social shares and engagement

## Project Structure

```
ecommerce-site/
├── src/
│   ├── server.js           # Main Express server
│   └── database.js         # SQLite database setup
├── public/
│   ├── index.html          # Home page
│   ├── products.html       # Product listing
│   ├── product-detail.html # Single product page
│   ├── cart.html           # Shopping cart
│   ├── checkout.html       # Checkout page
│   ├── success.html        # Order success page
│   ├── cancellation.html   # Order cancellation page
│   ├── pending.html        # Payment pending page
│   ├── affiliate.html      # Affiliate program page
│   ├── affiliate-stats.html# Affiliate dashboard
│   └── assets/
│       ├── css/
│       │   └── style.css   # Main stylesheet
│       └── js/
│           ├── app.js      # Main app logic
│           ├── cart.js     # Cart management
│           └── social.js   # Social media integration
├── db/
│   └── ecommerce.db        # SQLite database (auto-created)
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Step 1: Install Dependencies

```bash
cd ecommerce-site
npm install
```

This will install:
- **express** - Web framework
- **sqlite3** - Database
- **body-parser** - Request parsing
- **cors** - Cross-origin support
- **uuid** - Unique ID generation

### Step 2: Start the Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The server will run on `http://localhost:3000`

### Step 3: Seed Sample Data

Visit: `http://localhost:3000/api/seed`

This will populate the database with sample products.

### Step 4: Open in Browser

Visit: `http://localhost:3000`

## API Endpoints

### Products
```
GET /api/products              - Get all products
GET /api/products/:id          - Get single product
```

### Orders
```
POST /api/orders/create        - Create new order
GET /api/orders/:order_id      - Get order details
```

### Payment
```
POST /api/payment/process      - Process payment
GET /api/payment/methods       - Get available payment methods
```

### Affiliate
```
POST /api/affiliate/register   - Register as affiliate
GET /api/affiliate/stats/:code - Get affiliate statistics
POST /api/affiliate/click      - Track affiliate click
```

### Social Media
```
POST /api/social/share         - Track social share
GET /api/social/shares/:id     - Get share counts by platform
```

## Usage Guide

### For Customers

1. **Browse Products**
   - Visit home page to see featured products
   - Go to "Shop" to see all products
   - Filter by category or sort by price

2. **Shopping**
   - Click "Add to Cart" to add items
   - View cart to manage items
   - Proceed to checkout

3. **Checkout**
   - Fill in customer information
   - Select payment method
   - Accept terms and complete order
   - See order confirmation on success page

4. **Social Sharing**
   - Share products on TikTok, Facebook, Instagram
   - Use your affiliate code if you have one
   - Earn commissions on referred sales

### For Affiliates

1. **Register**
   - Go to "Join Affiliate"
   - Fill in your information
   - Select primary promotion platform
   - Get your unique affiliate code

2. **Promote**
   - Share your affiliate link on social media
   - Use your code in captions and descriptions
   - Share product videos and reviews

3. **Track Earnings**
   - Visit affiliate dashboard
   - View clicks, sales, and commissions
   - Download earnings report

4. **Get Paid**
   - Commissions paid monthly
   - Payment via bank transfer or e-wallet
   - Minimum payout: $25

## Payment Methods

### Credit/Debit Card
- 16-digit card number
- Expiry date (MM/YY)
- CVV (3 digits)
- Immediate payment processing

### Bank Transfer
- Requires manual verification
- Typically confirms within 1-2 business days
- Account details provided at checkout

### E-Wallet
- Redirects to provider
- Instant payment
- Automatic confirmation

### Cryptocurrency
- Bitcoin and other crypto accepted
- Address provided at checkout
- Confirms after blockchain confirmation (10-60 minutes)

## Affiliate Commission Structure

| Sales Per Month | Commission Rate |
|----------------|-----------------|
| $0 - $500      | 5%             |
| $500 - $2000   | 8%             |
| $2000 - $5000  | 12%            |
| $5000+         | 15%            |

## Database Schema

### Products
- id, name, description, price, image_url, stock, category, created_at

### Orders
- id, order_number, customer_name, customer_email, customer_phone, total_amount
- payment_method, payment_status, order_status, affiliate_code, affiliate_commission

### Order Items
- id, order_id, product_id, product_name, quantity, price

### Affiliates
- id, affiliate_code, affiliate_name, affiliate_email, commission_rate, total_earnings

### Payment Logs
- id, order_id, payment_method, transaction_id, amount, status, response_data

### Social Shares
- id, product_id, platform, shared_by, created_at

## Customization

### Change Company Name
1. Edit navbar brand in HTML files
2. Update footer copyright text
3. Modify social media links

### Add Products
Visit `/api/seed` again or use admin panel to add manual products

### Modify Tax Rate
In cart.js, change the tax calculation:
```javascript
const tax = subtotal * 0.10; // Change 0.10 to your tax rate
```

### Change Affiliate Commission
Edit the default commission in affiliate registration:
```javascript
commission_rate: 5  // Change to your default rate
```

## Security Notes

⚠️ **Important**: This is a demonstration/learning project. For production:

1. **Do NOT store real payment information**
2. **Use HTTPS** for all connections
3. **Implement proper authentication** (JWT, OAuth)
4. **Validate all inputs** on backend
5. **Use environment variables** for secrets
6. **Implement rate limiting** to prevent abuse
7. **Add proper error handling** and logging
8. **Use prepared statements** to prevent SQL injection
9. **Add CSRF protection**
10. **Implement 3D Secure** for card payments

## Troubleshooting

### Database Connection Error
```
Solution: Ensure db/ folder exists and has write permissions
```

### Port Already in Use
```
Solution: Change PORT in server.js or kill process using port 3000
```

### CORS Error
```
Solution: CORS is enabled by default. Check browser console for details.
```

### Products Not Loading
```
Solution: Run http://localhost:3000/api/seed to populate database
```

### Cart Not Persisting
```
Solution: Check if localStorage is enabled in browser
```

## Future Enhancements

- [ ] User authentication and accounts
- [ ] Real payment gateway integration (Stripe, PayPal)
- [ ] Order history and tracking
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Inventory management
- [ ] Multi-currency support
- [ ] Multiple languages
- [ ] Advanced analytics

## Support

For issues or questions:
- 📧 support@shophub.com
- 📞 1-800-SHOPHUB
- 💬 Live chat available 24/7

## License

MIT License - Feel free to use for personal and commercial projects

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Made with ❤️ by ShopHub Team**

Last Updated: February 2025
