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
  const path = window.location.pathname;
  
  if (path.includes('/research/')) {
    // Get the current page name by splitting the path
    const pagePath = path.split('/').pop();
    const currentPage = pagePath.replace('.html', '');
    
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
        navHTML += '<span></span>'; // Empty placeholder for flex spacing
      }
      
      // Add next button if available
      if (nextPage) {
        navHTML += `<a href="${nextPage.id}.html" class="next">${nextPage.title}</a>`;
      } else {
        navHTML += '<span></span>'; // Empty placeholder for flex spacing
      }
      
      navHTML += '</div>';
      
      // Add the navigation to the main content
      const main = document.querySelector('main');
      if (main) {
        // Check if page-nav already exists
        const existingNav = main.querySelector('.page-nav');
        if (existingNav) {
          existingNav.outerHTML = navHTML;
        } else {
          main.appendChild(document.createRange().createContextualFragment(navHTML));
        }
      }
    }
  }
});
