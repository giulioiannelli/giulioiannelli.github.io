/**
 * sub-toc.js
 * Creates a table of contents for the current page only based on heading elements
 */
document.addEventListener('DOMContentLoaded', function() {
    // Find the sub-TOC container
    const subTocDiv = document.getElementById('sub-toc');
    
    // If there's no sub-TOC div, exit early
    if (!subTocDiv) {
        return;
    }
    
    // Find all headings within the content div or main element or body if neither exists
    const contentDiv = document.getElementById('contents');
    const mainElem = document.querySelector('main');
    
    let headingsContainer;
    if (contentDiv) {
        headingsContainer = contentDiv;
    } else if (mainElem) {
        headingsContainer = mainElem;
    } else {
        // Fallback to body, but exclude the TOC and navigation elements
        headingsContainer = document.body;
    }
    
    // Get all headings and filter out those inside TOC divs
    const allHeadings = headingsContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const headings = Array.from(allHeadings).filter(heading => {
        // Check if this heading is inside a TOC div
        let parent = heading.parentElement;
        while (parent && parent !== headingsContainer) {
            if (parent.id === 'toc' || parent.id === 'sub-toc') {
                return false;
            }
            parent = parent.parentElement;
        }
        return true;
    });
    
    if (headings.length === 0) {
        subTocDiv.style.display = 'none';
        return;
    }
    
    // Initialize TOC structure
    let toc = '<h3>Page Contents</h3><ol>';
    let currentLevel = 0;
    let levels = [];
    
    // Process each heading
    headings.forEach(heading => {
        // Get heading level as a number (h1 = 1, h2 = 2, etc.)
        const level = parseInt(heading.tagName.substring(1));
        
        // Create an anchor ID if none exists
        if (!heading.id) {
            const anchor = heading.textContent.trim().replace(/\s+/g, '_').replace(/[^\w\-]/g, '');
            heading.id = anchor;
        }
        
        // Manage TOC nesting structure
        if (level > currentLevel) {
            // If we're going deeper, create new nested lists
            for (let i = 0; i < (level - currentLevel); i++) {
                toc += '<ol>';
                levels.push(level);
            }
        } else if (level < currentLevel) {
            // If we're going up levels, close the appropriate number of lists
            while (levels.length > 0 && levels[levels.length - 1] > level) {
                toc += '</ol>';
                levels.pop();
            }
        }
        
        // Add the TOC item for this heading
        toc += `<li><a href="#${heading.id}">${heading.textContent}</a></li>`;
        currentLevel = level;
    });
    
    // Close any remaining open lists
    while (levels.length > 0) {
        toc += '</ol>';
        levels.pop();
    }
    
    toc += '</ol>';
    
    // Add the TOC to the page
    subTocDiv.innerHTML = toc;
});
