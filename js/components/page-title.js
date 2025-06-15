/**
 * page-title.js - Handles page title operations
 */

document.addEventListener('DOMContentLoaded', function() {
  // Get the full page title from the <title> tag
  const fullTitle = document.title;
  
  // Use the full title directly, without removing any prefix
  let pageTitle = fullTitle;
  
  // Find all elements with data-use-title attribute and replace their content
  const titleElements = document.querySelectorAll('[data-use-title]');
  titleElements.forEach(element => {
    // If a modifier is specified, apply it to the title
    const modifier = element.getAttribute('data-use-title');
    if (modifier && modifier !== 'full') {
      // Handle specific modifiers
      if (modifier === 'short') {
        // For a short title, remove prefix like "Ubuntu - "
        const shortTitle = pageTitle.includes(" - ") ? 
          pageTitle.split(" - ")[1] : 
          pageTitle;
        element.textContent = shortTitle;
      } else {
        // Handle custom text patterns with {title} placeholder
        element.textContent = modifier.replace('{title}', pageTitle);
      }
    } else {
      // Use the full page title
      element.textContent = pageTitle;
    }
  });
});
