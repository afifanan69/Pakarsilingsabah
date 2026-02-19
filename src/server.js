const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// ==================== PRODUCT ROUTES ====================
// Get all products
app.get('/api/products', (req, res) => {
  const sql = 'SELECT * FROM products';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM products WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(row || {});
  });
});

// ==================== AFFILIATE ROUTES ====================
// Add affiliate click
app.post('/api/affiliate/click', (req, res) => {
  const { affiliate_code, product_id } = req.body;
  
  if (!affiliate_code) {
    return res.status(400).json({ error: 'Affiliate code required' });
  }

  const sql = 'INSERT INTO affiliate_clicks (affiliate_code, product_id) VALUES (?, ?)';
  db.run(sql, [affiliate_code, product_id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Click tracked' });
  });
});

// Get affiliate stats
app.get('/api/affiliate/stats/:code', (req, res) => {
  const { code } = req.params;
  
  const affiliateSql = 'SELECT * FROM affiliates WHERE affiliate_code = ?';
  db.get(affiliateSql, [code], (err, affiliate) => {
    if (err || !affiliate) {
      return res.status(404).json({ error: 'Affiliate not found' });
    }

    const clicksSql = 'SELECT COUNT(*) as total_clicks FROM affiliate_clicks WHERE affiliate_code = ?';
    db.get(clicksSql, [code], (err, clicks) => {
      const salesSql = `
        SELECT COUNT(*) as total_sales, SUM(affiliate_commission) as total_commission 
        FROM orders WHERE affiliate_code = ? AND payment_status = 'completed'
      `;
      db.get(salesSql, [code], (err, sales) => {
        res.json({
          affiliate,
          clicks: clicks?.total_clicks || 0,
          sales: sales?.total_sales || 0,
          total_commission: sales?.total_commission || 0
        });
      });
    });
  });
});

// Register affiliate
app.post('/api/affiliate/register', (req, res) => {
  const { name, email, platform, commission_rate = 5 } = req.body;
  const affiliate_code = 'AFF_' + uuidv4().substring(0, 8).toUpperCase();

  const sql = `
    INSERT INTO affiliates (affiliate_code, affiliate_name, affiliate_email, platform, commission_rate)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.run(sql, [affiliate_code, name, email, platform, commission_rate], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, affiliate_code, message: 'Affiliate registered successfully' });
  });
});

// ==================== CART & CHECKOUT ROUTES ====================
// Create order (checkout)
app.post('/api/orders/create', (req, res) => {
  const { customer_name, customer_email, customer_phone, items, affiliate_code } = req.body;

  if (!customer_name || !customer_email || !items || items.length === 0) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const order_number = 'ORD_' + Date.now();
  let total_amount = 0;
  let affiliate_commission = 0;

  // Calculate total and commission
  items.forEach(item => {
    total_amount += item.price * item.quantity;
  });

  // Check if affiliate code is valid
  if (affiliate_code) {
    const affiliateSql = 'SELECT commission_rate FROM affiliates WHERE affiliate_code = ?';
    db.get(affiliateSql, [affiliate_code], (err, affiliate) => {
      if (affiliate) {
        affiliate_commission = (total_amount * affiliate.commission_rate) / 100;
      }
      createOrder();
    });
  } else {
    createOrder();
  }

  const createOrder = () => {
    const sql = `
      INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, total_amount, affiliate_code, affiliate_commission)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [order_number, customer_name, customer_email, customer_phone, total_amount, affiliate_code || null, affiliate_commission], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const orderId = this.lastID;

      // Insert order items
      let completed = 0;
      items.forEach(item => {
        const itemSql = `
          INSERT INTO order_items (order_id, product_id, product_name, quantity, price)
          VALUES (?, ?, ?, ?, ?)
        `;
        db.run(itemSql, [orderId, item.product_id, item.product_name, item.quantity, item.price], (err) => {
          completed++;
          if (completed === items.length) {
            res.json({
              success: true,
              order_id: orderId,
              order_number: order_number,
              total_amount: total_amount,
              affiliate_commission: affiliate_commission
            });
          }
        });
      });
    });
  };
});

// Get order details
app.get('/api/orders/:order_id', (req, res) => {
  const { order_id } = req.params;
  
  const orderSql = 'SELECT * FROM orders WHERE id = ?';
  db.get(orderSql, [order_id], (err, order) => {
    if (err || !order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const itemsSql = 'SELECT * FROM order_items WHERE order_id = ?';
    db.all(itemsSql, [order_id], (err, items) => {
      res.json({ ...order, items });
    });
  });
});

// ==================== PAYMENT GATEWAY ROUTES ====================
// Process payment (Local Payment Gateway)
app.post('/api/payment/process', (req, res) => {
  const { order_id, payment_method, card_number, card_holder, card_expiry, card_cvv } = req.body;

  if (!order_id || !payment_method) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Verify order exists
  const orderSql = 'SELECT * FROM orders WHERE id = ?';
  db.get(orderSql, [order_id], (err, order) => {
    if (err || !order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    let paymentStatus = 'failed';
    let transactionId = 'TXN_' + uuidv4();

    // Simulate payment processing
    // In real scenario, integrate with actual payment gateway
    if (payment_method === 'bank_transfer') {
      paymentStatus = 'pending'; // Bank transfers need manual verification
    } else if (payment_method === 'credit_card' || payment_method === 'debit_card') {
      // Simple validation
      if (card_number && card_number.length === 16 && card_cvv && card_cvv.length === 3) {
        paymentStatus = 'completed';
      } else {
        return res.status(400).json({ error: 'Invalid card details' });
      }
    } else if (payment_method === 'e_wallet') {
      paymentStatus = 'completed';
    } else if (payment_method === 'crypto') {
      paymentStatus = 'pending'; // Crypto payments need block confirmation
    }

    // Log payment
    const paymentLogSql = `
      INSERT INTO payment_logs (order_id, payment_method, transaction_id, amount, status, response_data)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(paymentLogSql, [
      order_id,
      payment_method,
      transactionId,
      order.total_amount,
      paymentStatus,
      JSON.stringify({ timestamp: new Date(), method: payment_method })
    ], (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Update order status
      const updateOrderSql = `
        UPDATE orders SET payment_status = ?, payment_method = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      db.run(updateOrderSql, [paymentStatus, payment_method, order_id], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.json({
          success: true,
          transaction_id: transactionId,
          payment_status: paymentStatus,
          amount: order.total_amount,
          message: paymentStatus === 'completed' 
            ? 'Payment successful!' 
            : 'Payment pending. Please verify or wait for confirmation.'
        });
      });
    });
  });
});

// Get payment methods
app.get('/api/payment/methods', (req, res) => {
  const methods = [
    { id: 'credit_card', name: 'Credit Card', icon: '💳' },
    { id: 'debit_card', name: 'Debit Card', icon: '💳' },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' },
    { id: 'e_wallet', name: 'E-Wallet', icon: '📱' },
    { id: 'crypto', name: 'Cryptocurrency', icon: '₿' }
  ];
  res.json(methods);
});

// ==================== SOCIAL MEDIA ROUTES ====================
// Track social share
app.post('/api/social/share', (req, res) => {
  const { product_id, platform, shared_by } = req.body;

  if (!product_id || !platform) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO social_shares (product_id, platform, shared_by) VALUES (?, ?, ?)';
  db.run(sql, [product_id, platform, shared_by || 'anonymous'], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: true, message: 'Share tracked' });
  });
});

// Get social share count
app.get('/api/social/shares/:product_id', (req, res) => {
  const { product_id } = req.params;
  
  const sql = `
    SELECT platform, COUNT(*) as count
    FROM social_shares
    WHERE product_id = ?
    GROUP BY platform
  `;
  db.all(sql, [product_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows || []);
  });
});

// ==================== SEED DATA ====================
app.get('/api/seed', (req, res) => {
  const products = [
    {
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 199.99,
      image_url: 'https://via.placeholder.com/300x300?text=Headphones',
      stock: 50,
      category: 'Electronics'
    },
    {
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health tracking',
      price: 299.99,
      image_url: 'https://via.placeholder.com/300x300?text=Smartwatch',
      stock: 30,
      category: 'Electronics'
    },
    {
      name: 'Premium Coffee Maker',
      description: 'Professional-grade coffee maker',
      price: 149.99,
      image_url: 'https://via.placeholder.com/300x300?text=CoffeeMaker',
      stock: 25,
      category: 'Home Appliances'
    },
    {
      name: '4K Webcam',
      description: 'Ultra HD webcam for streaming and video calls',
      price: 89.99,
      image_url: 'https://via.placeholder.com/300x300?text=Webcam',
      stock: 40,
      category: 'Electronics'
    },
    {
      name: 'Portable Power Bank 30000mAh',
      description: 'Fast charging power bank with LED display',
      price: 49.99,
      image_url: 'https://via.placeholder.com/300x300?text=PowerBank',
      stock: 100,
      category: 'Accessories'
    },
    {
      name: 'USB-C Hub Pro',
      description: '7-in-1 USB-C hub with multiple ports',
      price: 79.99,
      image_url: 'https://via.placeholder.com/300x300?text=USBHub',
      stock: 60,
      category: 'Accessories'
    }
  ];

  let completed = 0;
  products.forEach(product => {
    const sql = `
      INSERT INTO products (name, description, price, image_url, stock, category)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [product.name, product.description, product.price, product.image_url, product.stock, product.category], (err) => {
      completed++;
      if (completed === products.length) {
        res.json({ success: true, message: 'Database seeded with sample products' });
      }
    });
  });
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('API Routes:');
  console.log('  GET    /api/products              - Get all products');
  console.log('  GET    /api/products/:id          - Get single product');
  console.log('  GET    /api/seed                  - Seed database with sample data');
  console.log('  POST   /api/orders/create         - Create new order');
  console.log('  GET    /api/orders/:order_id      - Get order details');
  console.log('  POST   /api/payment/process       - Process payment');
  console.log('  GET    /api/payment/methods       - Get available payment methods');
  console.log('  POST   /api/affiliate/register    - Register as affiliate');
  console.log('  GET    /api/affiliate/stats/:code - Get affiliate statistics');
  console.log('  POST   /api/affiliate/click       - Track affiliate click');
  console.log('  POST   /api/social/share          - Track social media share');
  console.log('  GET    /api/social/shares/:id     - Get share count');
});
