/**
 * sub-toc.js - Creates a table of contents for the current page
 * based on heading elements
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
        // Check if the heading is not inside a TOC element or navigation
        return !heading.closest('#toc') && 
               !heading.closest('#sub-toc') && 
               !heading.closest('nav') &&
               !heading.closest('.navbar');
    });
    
    // If no headings found, hide the sub-TOC
    if (headings.length === 0) {
        subTocDiv.style.display = 'none';
        return;
    }
    
    // Create the TOC title
    let subTocHTML = '<h3>Page Contents</h3>';
    
    // Start with an ordered list
    subTocHTML += '<ol>';
    
    // Track nesting level
    let currentLevel = 0;
    
    headings.forEach(heading => {
        // Get the heading level (h1=1, h2=2, etc.)
        const level = parseInt(heading.tagName.charAt(1));
        
        // Create an ID for the heading if it doesn't have one
        if (!heading.id) {
            // Create ID from heading text
            heading.id = heading.textContent
                .toLowerCase()
                .replace(/[^\w]+/g, '-');
        }
        
        // Handle nesting
        if (level > currentLevel) {
            // Open new nested lists for each level increase
            for (let i = 0; i < level - currentLevel; i++) {
                subTocHTML += '<ol>';
            }
        } else if (level < currentLevel) {
            // Close lists for each level decrease
            for (let i = 0; i < currentLevel - level; i++) {
                subTocHTML += '</ol>';
            }
        }
        
        // Add the TOC entry
        subTocHTML += `<li><a href="#${heading.id}">${heading.textContent}</a></li>`;
        
        // Update the current level
        currentLevel = level;
    });
    
    // Close all remaining open lists
    for (let i = 0; i < currentLevel; i++) {
        subTocHTML += '</ol>';
    }
    
    // Add the generated TOC to the sub-TOC div
    subTocDiv.innerHTML = subTocHTML;
});
