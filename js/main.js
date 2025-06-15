/**
 * main.js - Main JavaScript entry point
 * This file imports all the necessary JavaScript files for the website
 */

// Load all scripts directly
document.addEventListener('DOMContentLoaded', function() {
  console.log("Main.js loaded");
  
  // Core scripts needed on all pages
  loadScript('themes/theme-config.js');
  loadScript('navigation/main-nav.js');
  
  // Page-specific scripts
  const path = window.location.pathname;
  
  if (path.includes('/research/')) {
    loadScript('navigation/research-nav.js');
  }
  
  if (path.includes('/utils/ubuntu/')) {
    loadScript('navigation/ubuntu-nav.js');
  }
  
  // Load TOC scripts if needed
  if (document.getElementById('toc')) {
    loadScript('toc/toc.js');
  }
  
  if (document.getElementById('sub-toc')) {
    loadScript('toc/sub-toc.js');
  }
  
  // MathJax for pages that need it
  if (document.querySelector('.mathjax') || 
      path.includes('equations') || 
      path.includes('mathjax-guide')) {
    loadScript('components/mathjax-config.js');
  }
});

/**
 * Helper function to load JavaScript files
 * @param {string} src - Path to the script relative to js directory
 */
function loadScript(src) {
  const script = document.createElement('script');
  
  // Get base path from the main.js script
  let basePath = '';
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.includes('main.js')) {
      basePath = scripts[i].src.substring(0, scripts[i].src.lastIndexOf('/') + 1);
      break;
    }
  }
  
  // If we couldn't find main.js path, use a relative path
  if (!basePath) {
    const path = window.location.pathname;
    if (path.split('/').length - 1 >= 3) {
      basePath = '../../js/'; // Deep subdirectories
    } else if (path.split('/').length - 1 >= 2) {
      basePath = '../js/';    // One level subdirectories
    } else {
      basePath = 'js/';       // Root level
    }
  }
  
  script.src = basePath + src;
  script.async = false; // Load scripts in sequence
  document.head.appendChild(script);
  console.log("Loaded script:", script.src);
}
