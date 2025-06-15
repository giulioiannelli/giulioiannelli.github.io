/**
 * research-nav.js - Research section navigation
 */

// Array of pages in the research section, in order
const researchPages = [
  { id: 'index', title: 'Overview' },
  { id: 'publications', title: 'Publications' },
  { id: 'projects', title: 'Current Projects' },
  { id: 'interests', title: 'Research Interests' },
  { id: 'equations', title: 'Example Equations' }
];

document.addEventListener('DOMContentLoaded', function() {
  // Add page navigation if we're in the research folder
  const pathInfo = window.getPathInfo ? window.getPathInfo() : { isInResearch: false };
  
  if (pathInfo.isInResearch) {
    // Get the current page name
    const currentPage = pathInfo.pageName;
    
    // Find the index of the current page in the array
    const currentIndex = researchPages.findIndex(page => page.id === currentPage);
    
    if (currentIndex !== -1) {
      // Get previous and next pages
      const prevPage = currentIndex > 0 ? researchPages[currentIndex - 1] : null;
      const nextPage = currentIndex < researchPages.length - 1 ? researchPages[currentIndex + 1] : null;
      
      // Create navigation HTML
      let navHTML = '<div class="page-nav">';
      
      // Add previous button if available
      if (prevPage) {
        navHTML += `<a href="${prevPage.id}.html" class="prev">${prevPage.title}</a>`;
      } else {
        navHTML += '<span></span>';
      }
      
      // Add next button if available
      if (nextPage) {
        navHTML += `<a href="${nextPage.id}.html" class="next">${nextPage.title}</a>`;
      } else {
        navHTML += '<span></span>';
      }
      
      navHTML += '</div>';
      
      // Add the navigation to the end of the main content
      const mainElem = document.querySelector('main');
      if (mainElem) {
        mainElem.insertAdjacentHTML('beforeend', navHTML);
      } else {
        document.body.insertAdjacentHTML('beforeend', navHTML);
      }
    }
  }
});
