/**
 * ubuntu-nav.js - Ubuntu section navigation
 */

// Array of pages in the ubuntu section, in order
const ubuntuPages = [
  { id: 'ubuntu-setup-guide', title: 'Ubuntu Setup Guide', number: '' },
  { id: 'apt', title: 'APT Installs', number: '1' },
  { id: 'dpkg', title: 'DPKG Installs', number: '2' },
  { id: 'snap', title: 'Removing Snap', number: '3' },
  { id: 'scripts', title: 'Useful Scripts', number: '4' }
];

document.addEventListener('DOMContentLoaded', function() {
  // Add page navigation if we're in the ubuntu folder
  const pathInfo = window.getPathInfo ? window.getPathInfo() : { isInUtilsUbuntu: false };
  
  // Only show navigation within the utils/ubuntu pages
  if (pathInfo.isInUtilsUbuntu) {
    // Get the current page name
    const currentPage = pathInfo.pageName;
    
    // Find the index of the current page in the array
    const currentIndex = ubuntuPages.findIndex(page => page.id === currentPage);
    
    if (currentIndex !== -1) {
      // Display page number in heading if it exists
      if (ubuntuPages[currentIndex].number && currentPage !== 'index') {
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
