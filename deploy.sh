#!/bin/bash

# ShopHub Heroku Deployment Script (for Linux/Mac)
# Usage: chmod +x deploy.sh && ./deploy.sh

echo "🚀 ShopHub Heroku Deployment Script"
echo "===================================="
echo ""

# Check if heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "❌ Heroku CLI not found. Please install it from https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

echo "✅ Heroku CLI found"
echo ""

# Get app name
read -p "Enter your desired Heroku app name (e.g., shophub-2025): " APP_NAME

# Check if app name is provided
if [ -z "$APP_NAME" ]; then
    echo "❌ App name cannot be empty"
    exit 1
fi

echo ""
echo "🔧 Starting deployment for: $APP_NAME"
echo ""

# Step 1: Initialize Git
echo "📦 Step 1: Initializing Git repository..."
git init
git add .
git commit -m "Initial commit: ShopHub ecommerce platform"
echo "✅ Git repository initialized"
echo ""

# Step 2: Login to Heroku
echo "🔐 Step 2: Logging into Heroku..."
heroku login
echo "✅ Heroku login successful"
echo ""

# Step 3: Create Heroku app
echo "🏗️  Step 3: Creating Heroku app..."
heroku create $APP_NAME
echo "✅ Heroku app created"
echo ""

# Step 4: Set environment variables
echo "⚙️  Step 4: Setting environment variables..."
heroku config:set NODE_ENV=production
heroku config:set API_BASE_URL=https://$APP_NAME.herokuapp.com/api
heroku config:set AFFILIATE_DEFAULT_COMMISSION=5
heroku config:set AFFILIATE_MIN_PAYOUT=25
echo "✅ Environment variables set"
echo ""

# Step 5: Deploy to Heroku
echo "🚀 Step 5: Deploying to Heroku..."
git push heroku main
if [ $? -ne 0 ]; then
    git push heroku master
fi
echo "✅ Deployment complete"
echo ""

# Step 6: Show status
echo "📊 Step 6: Checking app status..."
heroku ps
echo ""

# Step 7: Open app
echo "🌐 Your app is live!"
echo "URL: https://$APP_NAME.herokuapp.com"
echo ""
read -p "Open app in browser? (y/n): " OPEN_APP
if [ "$OPEN_APP" = "y" ]; then
    heroku open
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Visit https://$APP_NAME.herokuapp.com/api/seed to load test data"
echo "2. Visit https://$APP_NAME.herokuapp.com to view your store"
echo "3. Monitor logs: heroku logs --tail"
echo ""
