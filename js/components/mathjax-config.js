/**
 * mathjax-config.js - MathJax configuration and loading
 */

// MathJax Configuration
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
    packages: ['base', 'ams', 'noerrors', 'noundefined']
  },
  options: {
    ignoreHtmlClass: 'no-mathjax',
    processHtmlClass: 'mathjax'
  },
  startup: {
    ready: function() {
      console.log('MathJax is loaded and ready!');
      MathJax.startup.defaultReady();
    }
  }
};

// Load the MathJax script
document.addEventListener('DOMContentLoaded', function() {
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  script.async = true;
  document.head.appendChild(script);
  
  console.log('MathJax script loaded');
});
