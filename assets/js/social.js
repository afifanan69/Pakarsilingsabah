// Social Media Integration

/**
 * Track social share
 */
async function trackSocialShare(productId, platform) {
    try {
        await apiCall('/social/share', 'POST', {
            product_id: productId,
            platform: platform,
            shared_by: getAffiliateCode()
        });
        logActivity('social_share', { product_id: productId, platform: platform });
    } catch (error) {
        console.error('Error tracking share:', error);
    }
}

/**
 * Get affiliate code from URL or localStorage
 */
function getAffiliateCode() {
    // Check URL parameters first
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode) {
        localStorage.setItem('affiliate_code', refCode);
        return refCode;
    }
    
    // Check localStorage
    return localStorage.getItem('affiliate_code');
}

/**
 * Share on TikTok
 */
function shareOnTikTok(productId) {
    const affiliateCode = getAffiliateCode();
    const referralLink = `https://shophub.com?ref=${affiliateCode || 'default'}`;
    
    const text = `🎬 Check out this amazing product! ${referralLink}`;
    
    // Open TikTok sharing
    const tiktokUrl = `https://www.tiktok.com/@shophub`;
    window.open(tiktokUrl, '_blank');
    
    // Track the share
    if (productId) {
        trackSocialShare(productId, 'tiktok');
    }
    
    showNotification('Share your product on TikTok! Use hashtag #ShopHub', 'info');
}

/**
 * Share on Facebook
 */
function shareOnFacebook(productId) {
    const affiliateCode = getAffiliateCode();
    const referralLink = `https://shophub.com?ref=${affiliateCode || 'default'}`;
    
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    
    window.open(fbShareUrl, '_blank', 'width=600,height=600');
    
    // Track the share
    if (productId) {
        trackSocialShare(productId, 'facebook');
    }
}

/**
 * Share on Instagram
 */
function shareOnInstagram(productId) {
    const affiliateCode = getAffiliateCode();
    const referralLink = `https://shophub.com?ref=${affiliateCode || 'default'}`;
    
    // Instagram doesn't have a direct share URL, so we'll open the app/website
    const instagramUrl = `https://www.instagram.com/`;
    window.open(instagramUrl, '_blank');
    
    // Copy link to clipboard for user to share
    navigator.clipboard.writeText(referralLink);
    showNotification('Referral link copied! Share on Instagram Stories or DMs', 'success');
    
    // Track the share
    if (productId) {
        trackSocialShare(productId, 'instagram');
    }
}

/**
 * Share on WhatsApp
 */
function shareOnWhatsApp(productId) {
    const affiliateCode = getAffiliateCode();
    const referralLink = `https://shophub.com?ref=${affiliateCode || 'default'}`;
    
    const text = `🛍️ Check out this amazing product! ${referralLink}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    
    window.open(whatsappUrl, '_blank');
    
    // Track the share
    if (productId) {
        trackSocialShare(productId, 'whatsapp');
    }
}

/**
 * Share on Twitter/X
 */
function shareOnTwitter(productId) {
    const affiliateCode = getAffiliateCode();
    const referralLink = `https://shophub.com?ref=${affiliateCode || 'default'}`;
    
    const text = `Check out this amazing product from @ShopHub! ${referralLink} #shopping`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    
    window.open(twitterUrl, '_blank');
    
    // Track the share
    if (productId) {
        trackSocialShare(productId, 'twitter');
    }
}

/**
 * Copy share link to clipboard
 */
function copyShareLink(productId) {
    const affiliateCode = getAffiliateCode();
    const referralLink = `https://shophub.com/product-detail.html?id=${productId}&ref=${affiliateCode || 'default'}`;
    
    navigator.clipboard.writeText(referralLink).then(() => {
        showNotification('Link copied to clipboard!', 'success');
        
        // Track the share
        if (productId) {
            trackSocialShare(productId, 'link_copied');
        }
    }).catch(err => {
        showNotification('Failed to copy link', 'error');
    });
}

/**
 * Get social share counts for a product
 */
async function getSocialShareCounts(productId) {
    try {
        const shares = await apiCall(`/social/shares/${productId}`);
        return shares;
    } catch (error) {
        console.error('Error getting share counts:', error);
        return [];
    }
}

/**
 * Display social proof
 */
async function displaySocialProof(productId, elementId) {
    const element = document.getElementById(elementId);
    if (!element) return;

    try {
        const shares = await getSocialShareCounts(productId);
        
        let html = '<p><strong>People are sharing this:</strong> ';
        const platforms = {};
        
        shares.forEach(share => {
            platforms[share.platform] = share.count;
        });

        const platformEmojis = {
            'tiktok': '🎵',
            'facebook': '👍',
            'instagram': '📷',
            'whatsapp': '💬',
            'twitter': '𝕏'
        };

        Object.entries(platforms).forEach(([platform, count]) => {
            html += `${platformEmojis[platform] || '📱'} ${count} on ${platform.charAt(0).toUpperCase() + platform.slice(1)} `;
        });

        html += '</p>';
        element.innerHTML = html;
    } catch (error) {
        console.error('Error displaying social proof:', error);
    }
}

/**
 * Track affiliate click
 */
async function trackAffiliateClick(productId, affiliateCode) {
    if (!affiliateCode) return;

    try {
        await apiCall('/affiliate/click', 'POST', {
            affiliate_code: affiliateCode,
            product_id: productId
        });
        logActivity('affiliate_click', { product_id: productId, affiliate_code: affiliateCode });
    } catch (error) {
        console.error('Error tracking affiliate click:', error);
    }
}

/**
 * Initialize social features on page load
 */
document.addEventListener('DOMContentLoaded', () => {
    // Track affiliate code from URL
    const affiliateCode = getAffiliateCode();
    if (affiliateCode) {
        logActivity('affiliate_visit', { affiliate_code: affiliateCode });
    }

    // Set up share buttons
    const shareButtons = document.querySelectorAll('[data-share-platform]');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = btn.dataset.sharePlatform;
            const productId = btn.dataset.productId;
            
            switch(platform) {
                case 'tiktok':
                    shareOnTikTok(productId);
                    break;
                case 'facebook':
                    shareOnFacebook(productId);
                    break;
                case 'instagram':
                    shareOnInstagram(productId);
                    break;
                case 'whatsapp':
                    shareOnWhatsApp(productId);
                    break;
                case 'twitter':
                    shareOnTwitter(productId);
                    break;
            }
        });
    });
});

/**
 * Create shareable product card
 */
function createShareableProductCard(product) {
    const affiliateCode = getAffiliateCode();
    
    return `
        <div class="shareable-product-card">
            <img src="${product.image_url}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
            
            <div class="share-buttons">
                <button onclick="shareOnTikTok(${product.id})">🎵 TikTok</button>
                <button onclick="shareOnFacebook(${product.id})">👍 Facebook</button>
                <button onclick="shareOnInstagram(${product.id})">📷 Instagram</button>
                <button onclick="shareOnWhatsApp(${product.id})">💬 WhatsApp</button>
                <button onclick="copyShareLink(${product.id})">🔗 Copy Link</button>
            </div>

            ${affiliateCode ? `<p class="affiliate-code">Your Code: <strong>${affiliateCode}</strong></p>` : ''}
        </div>
    `;
}
