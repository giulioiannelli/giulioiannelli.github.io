/**
 * ubuntu-nav.js - Ubuntu section navigation
 */

// Array of pages in the ubuntu section, in order
const ubuntuPages = [
  { id: 'ubuntu-setup-guide', title: 'Ubuntu Setup Guide', number: '' },
  { id: 'apt', title: 'APT Installs', number: '1' },
  { id: 'dpkg', title: 'DPKG and BASH Installs', number: '2' },
  { id: 'snap', title: 'Removing Snap', number: '3' },
  { id: 'scripts', title: 'Useful Scripts', number: '4' }
];

document.addEventListener('DOMContentLoaded', function() {
  // Add page navigation if we're in the ubuntu folder
  const pathInfo = window.getPathInfo ? window.getPathInfo() : { 
    isInUtilsUbuntu: window.location.pathname.includes('/utils/ubuntu/'),
    pageName: window.location.pathname.split('/').pop().replace('.html', '')
  };
  
  if (pathInfo.isInUtilsUbuntu) {
    // Get the current page name from the path
    const currentPage = pathInfo.pageName;
    
    // Find the current page in our pages array
    const currentIndex = ubuntuPages.findIndex(page => page.id === currentPage);
    
    if (currentIndex !== -1) {
      // Add page number to heading if it exists
      if (ubuntuPages[currentIndex].number) {
        const mainHeading = document.querySelector('h1');
        if (mainHeading) {
          const pageNumber = ubuntuPages[currentIndex].number;
          mainHeading.innerHTML = `<span class="page-number">${pageNumber}.</span> ${mainHeading.innerHTML}`;
        }
      }
      
      // Get previous and next pages
      const prevPage = currentIndex > 0 ? ubuntuPages[currentIndex - 1] : null;
      const nextPage = currentIndex < ubuntuPages.length - 1 ? ubuntuPages[currentIndex + 1] : null;
      
      // Create navigation HTML
      let navHTML = '<div class="page-nav">';
      
      // Add previous button if available
      if (prevPage) {
        navHTML += `<a href="${prevPage.id}.html" class="prev">&larr; ${prevPage.title}</a>`;
      } else {
        navHTML += '<span></span>';
      }
      
      // Add next button if available
      if (nextPage) {
        navHTML += `<a href="${nextPage.id}.html" class="next">${nextPage.title} &rarr;</a>`;
      } else {
        navHTML += '<span></span>';
      }
      
      navHTML += '</div>';
      
      // Remove any existing navigation first
      const existingNavs = document.querySelectorAll('.page-nav');
      existingNavs.forEach(nav => nav.remove());
      
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
