/**
 * main-nav.js - Main navigation functionality
 */

document.addEventListener('DOMContentLoaded', function() {
  createNavigation();
});

function createNavigation() {
  console.log("Creating navigation");

  // Get path information
  const path = window.location.pathname;
  const isInUtilsUbuntu = path.includes('/utils/ubuntu/');
  const isInUtils = path.includes('/utils/') && !isInUtilsUbuntu;
  const isInResearch = path.includes('/research/');
  
  // Determine root prefix for URLs
  const rootPrefix = isInUtilsUbuntu ? '../../' : 
                     (isInUtils || isInResearch) ? '../' : '';
  
  // Get the current theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const themeIcon = currentTheme === 'light' ? '🌙' : '☀️';
  const themeTitle = currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  
  // Create the navigation menu
  const navbar = document.createElement('div');
  navbar.classList.add('navbar');
  
  // Create logo/site name link
  const siteTitle = document.createElement('a');
  siteTitle.href = rootPrefix + 'home.html';
  siteTitle.textContent = 'Giulio\'s Digital Den';
  siteTitle.classList.add('site-title');
  
  // Create the menu
  const navMenu = document.createElement('ul');
  navMenu.classList.add('nav-menu');
  
  // Define navigation links
  const navLinks = [
    { href: 'home.html', text: 'Home' },
    { href: 'about.html', text: 'About' },
    { href: 'research/', text: 'Research' },
    { href: 'projects.html', text: 'Projects' },
    { href: 'utils/', text: 'Utils' }, 
    { href: 'contact.html', text: 'Contact' }
  ];
  
  // Add links to menu
  navLinks.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = rootPrefix + link.href;
    a.textContent = link.text;
    
    // Highlight current page
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === link.href || 
        (link.href.endsWith('/') && window.location.pathname.includes('/' + link.href))) {
      a.classList.add('active');
    }
    
    li.appendChild(a);
    navMenu.appendChild(li);
  });
  
  // Create theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  themeToggle.classList.add('theme-toggle-btn');
  themeToggle.innerHTML = `<span>${themeIcon}</span>`;
  themeToggle.title = themeTitle;
  themeToggle.onclick = function() {
    if (window.toggleTheme) {
      window.toggleTheme();
    }
  };
  
  // Assemble the navbar
  navbar.appendChild(siteTitle);
  navbar.appendChild(navMenu);
  navbar.appendChild(themeToggle);
  
  // Check for old inline navigation styles and remove them
  const inlineStyles = document.querySelectorAll('style');
  inlineStyles.forEach(style => {
    if (style.textContent.includes('.navbar') || style.getAttribute('data-inline-nav')) {
      console.log("Removing old inline navigation styles");
      style.remove();
    }
  });
  
  // Add navbar to the page
  let navContainer = document.getElementById('nav-container');
  if (navContainer) {
    navContainer.innerHTML = ''; // Clear anything that might be there
    navContainer.appendChild(navbar);
  } else {
    // If no container exists, insert at the beginning of the body
    navContainer = document.createElement('div');
    navContainer.id = 'nav-container';
    navContainer.appendChild(navbar);
    document.body.insertBefore(navContainer, document.body.firstChild);
  }
}
