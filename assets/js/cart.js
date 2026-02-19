// Shopping Cart Management

const CART_STORAGE_KEY = 'cart';

/**
 * Get cart from localStorage
 */
function getCart() {
    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error reading cart:', error);
        return [];
    }
}

/**
 * Save cart to localStorage
 */
function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartCount();
    } catch (error) {
        console.error('Error saving cart:', error);
    }
}

/**
 * Add item to cart
 */
function addToCart(productId, productName, price) {
    const cart = getCart();
    
    // Check if product already exists
    const existingItem = cart.find(item => item.product_id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            product_id: productId,
            name: productName,
            price: parseFloat(price),
            quantity: 1
        });
    }
    
    saveCart(cart);
    showNotification(`${productName} added to cart!`, 'success');
    trackConversion('add_to_cart', { product_id: productId, product_name: productName });
}

/**
 * Remove item from cart
 */
function removeFromCart(index) {
    const cart = getCart();
    const removed = cart.splice(index, 1);
    
    if (removed.length > 0) {
        saveCart(cart);
        showNotification(`${removed[0].name} removed from cart`, 'info');
    }
}

/**
 * Update cart item quantity
 */
function updateCartItemQuantity(index, quantity) {
    const cart = getCart();
    
    if (quantity <= 0) {
        removeFromCart(index);
    } else {
        cart[index].quantity = parseInt(quantity);
        saveCart(cart);
    }
}

/**
 * Clear cart
 */
function clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
        localStorage.removeItem(CART_STORAGE_KEY);
        updateCartCount();
        showNotification('Cart cleared', 'info');
    }
}

/**
 * Get cart total
 */
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Get cart item count
 */
function getCartItemCount() {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
}

/**
 * Update cart count in navbar
 */
function updateCartCount() {
    const count = getCartItemCount();
    const cartBadge = document.getElementById('cart-count');
    if (cartBadge) {
        cartBadge.textContent = count;
        cartBadge.style.display = count > 0 ? 'inline-block' : 'none';
    }
}

/**
 * Calculate cart summary
 */
function getCartSummary() {
    const subtotal = getCartTotal();
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    
    return {
        subtotal,
        tax,
        total,
        itemCount: getCartItemCount()
    };
}

/**
 * Validate cart before checkout
 */
function validateCart() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return false;
    }

    // Validate quantities
    for (let item of cart) {
        if (item.quantity <= 0) {
            showNotification(`Invalid quantity for ${item.name}`, 'error');
            return false;
        }
    }

    return true;
}

/**
 * Export cart as CSV
 */
function exportCartAsCSV() {
    const cart = getCart();
    if (cart.length === 0) {
        showNotification('Cart is empty', 'warning');
        return;
    }

    let csv = 'Product Name,Quantity,Price,Subtotal\n';
    
    cart.forEach(item => {
        const subtotal = item.quantity * item.price;
        csv += `"${item.name}",${item.quantity},$${item.price.toFixed(2)},$${subtotal.toFixed(2)}\n`;
    });

    const summary = getCartSummary();
    csv += `\nSubtotal,,,${summary.subtotal.toFixed(2)}\n`;
    csv += `Tax,,,${summary.tax.toFixed(2)}\n`;
    csv += `Total,,,${summary.total.toFixed(2)}\n`;

    const dataUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    const exportFileDefaultName = `cart_${new Date().getTime()}.csv`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

/**
 * Merge carts (useful when user was browsing without account)
 */
function mergeCart(newItems) {
    const cart = getCart();
    
    newItems.forEach(newItem => {
        const existing = cart.find(item => item.product_id === newItem.product_id);
        if (existing) {
            existing.quantity += newItem.quantity;
        } else {
            cart.push(newItem);
        }
    });
    
    saveCart(cart);
}

/**
 * Apply coupon to cart
 */
function applyCoupon(couponCode) {
    // Mock coupon validation
    const coupons = {
        'SAVE10': 0.10,  // 10% off
        'SAVE20': 0.20,  // 20% off
        'COMEBACK10': 0.10  // 10% off (for cancelled orders)
    };

    if (coupons[couponCode]) {
        const discount = coupons[couponCode];
        const subtotal = getCartTotal();
        const discountAmount = subtotal * discount;
        
        localStorage.setItem('applied_coupon', JSON.stringify({
            code: couponCode,
            discount: discount,
            amount: discountAmount
        }));
        
        showNotification(`Coupon applied! You save $${discountAmount.toFixed(2)}`, 'success');
        return true;
    } else {
        showNotification('Invalid coupon code', 'error');
        return false;
    }
}

/**
 * Get applied coupon
 */
function getAppliedCoupon() {
    try {
        const coupon = localStorage.getItem('applied_coupon');
        return coupon ? JSON.parse(coupon) : null;
    } catch (error) {
        return null;
    }
}

/**
 * Remove applied coupon
 */
function removeAppliedCoupon() {
    localStorage.removeItem('applied_coupon');
    showNotification('Coupon removed', 'info');
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);
