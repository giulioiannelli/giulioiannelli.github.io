/**
 * base-url.js - Handles base URL for the site with absolute paths
 * 
 * This script helps with using absolute paths (starting with /) 
 * regardless of where the site is hosted (subdirectory, etc.)
 */

// Run immediately when loaded
(function() {
    // Get the base URL of the website
    const getBaseUrl = () => {
        // For GitHub Pages or similar hosting where the site might be in a subdirectory
        // For example: https://username.github.io/repository-name/
        const baseUrl = document.querySelector('meta[name="base-url"]')?.getAttribute('content') || '';
        return baseUrl;
    };

    // Fix all absolute URLs in the document
    const fixAbsoluteUrls = () => {
        const baseUrl = getBaseUrl();
        
        // Skip if we're at the root (no subdirectory)
        if (!baseUrl || baseUrl === '/') return;
        
        // Process all links (CSS, scripts, anchors, etc.)
        document.querySelectorAll('link[href^="/"], script[src^="/"], a[href^="/"], img[src^="/"]').forEach(el => {
            const attrName = el.hasAttribute('href') ? 'href' : 'src';
            const value = el.getAttribute(attrName);
            
            // Only modify absolute URLs that don't already include the base
            if (value.startsWith('/') && !value.startsWith(baseUrl)) {
                // Remove the leading slash and add the base URL
                el.setAttribute(attrName, baseUrl + value.substring(1));
            }
        });
    };

    // Run when the DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixAbsoluteUrls);
    } else {
        fixAbsoluteUrls();
    }
})();
