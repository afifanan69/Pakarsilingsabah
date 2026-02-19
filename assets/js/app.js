// Main Application JavaScript

// API Base URL (change if deployed)
const API_BASE = 'http://localhost:3000/api';

/**
 * Fetch API helper
 */
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_BASE}${endpoint}`, options);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`API Error on ${endpoint}:`, error);
        throw error;
    }
}

/**
 * Format currency
 */
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

/**
 * Format date
 */
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Show notification
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Get URL parameters
 */
function getUrlParameter(name) {
    const url = new URL(window.location);
    return url.searchParams.get(name);
}

/**
 * Filter products
 */
async function getFilteredProducts(category = null, sort = null) {
    try {
        const products = await apiCall('/products');
        
        let filtered = [...products];

        // Filter by category
        if (category) {
            filtered = filtered.filter(p => p.category === category);
        }

        // Sort
        if (sort === 'price-low') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (sort === 'newest') {
            filtered.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        }

        return filtered;
    } catch (error) {
        console.error('Error filtering products:', error);
        return [];
    }
}

/**
 * Validate email
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate credit card
 */
function isValidCreditCard(cardNumber) {
    // Simple validation: check if 16 digits
    const digitsOnly = cardNumber.replace(/\D/g, '');
    return digitsOnly.length === 16;
}

/**
 * Initialize app
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count
    updateCartCount();

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

/**
 * Log user activity
 */
function logActivity(action, data = {}) {
    const activity = {
        action,
        timestamp: new Date().toISOString(),
        ...data
    };
    console.log('[Activity]', activity);
}

/**
 * Track conversion
 */
function trackConversion(conversionType, value) {
    logActivity('conversion', {
        type: conversionType,
        value: value
    });
}

/**
 * Generate order summary
 */
function generateOrderSummary(cart, subtotal, tax, total) {
    let summary = 'ORDER SUMMARY\n';
    summary += '='.repeat(40) + '\n\n';
    
    cart.forEach((item, i) => {
        summary += `${i + 1}. ${item.name}\n`;
        summary += `   Qty: ${item.quantity} x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}\n`;
    });

    summary += '\n' + '='.repeat(40) + '\n';
    summary += `Subtotal: $${subtotal.toFixed(2)}\n`;
    summary += `Tax (10%): $${tax.toFixed(2)}\n`;
    summary += `TOTAL: $${total.toFixed(2)}\n`;
    summary += '='.repeat(40);

    return summary;
}

/**
 * Export order data
 */
function exportOrderData(orderId, orderData) {
    const dataStr = JSON.stringify(orderData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `order_${orderId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
