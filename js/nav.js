document.addEventListener('DOMContentLoaded', function() {
  // Get current path to handle relative links correctly
  const path = window.location.pathname;
  const isInUtilsUbuntu = path.includes('/utils/ubuntu/');
  const isInUtils = path.includes('/utils/') && !isInUtilsUbuntu;
  const isInResearch = path.includes('/research/');
  const isInSubfolder = isInUtilsUbuntu || isInResearch || isInUtils;
  const rootPrefix = isInUtilsUbuntu ? '../../' : (isInResearch || isInUtils ? '../' : '');
  
  // Get the current theme
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  const themeIcon = currentTheme === 'light' ? '🌙' : '☀️';
  const themeTitle = currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  
  // Navigation styles now using CSS variables for theme-aware styling
  const navCSS = `
    <style>
      .navbar {
        background-color: var(--navbar-bg);
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--border-color);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }
      
      .nav-menu {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        gap: 2rem;
      }
      
      .nav-menu li a {
        position: relative;
        padding: 6px 0;
        transition: all 0.3s ease;
      }
      
      .nav-menu li a::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background-color: var(--link-color);
        transition: width 0.3s ease;
      }
      
      .nav-menu li a:hover::after {
        width: 100%;
      }
      
      .nav-dropdown {
        position: relative;
        display: inline-block;
      }
      
      .dropdown-content {
        display: none;
        position: absolute;
        background-color: var(--dropdown-bg);
        min-width: 180px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1;
        border-radius: 8px;
        border: 1px solid var(--dropdown-border);
        overflow: hidden;
        margin-top: 8px;
        transition: all 0.3s ease;
      }
      
      .dropdown-content a {
        color: var(--dropdown-text);
        padding: 10px 16px;
        text-decoration: none;
        display: block;
        font-weight: normal;
        transition: background-color 0.2s ease, padding-left 0.2s ease;
        border-bottom: 1px solid var(--dropdown-border);
      }
      
      .dropdown-content a:last-child {
        border-bottom: none;
      }
      
      .dropdown-content a:hover {
        background-color: var(--dropdown-hover);
        padding-left: 20px;
      }
      
      .nav-dropdown:hover .dropdown-content {
        display: block;
      }
      
      .nav-dropdown > a::after {
        content: " ▼";
        font-size: 0.7em;
        vertical-align: middle;
        opacity: 0.7;
      }
      
      .dropdown-number {
        display: inline-block;
        font-weight: bold;
        color: var(--link-color);
        margin-right: 8px;
        min-width: 18px;
        opacity: 0.9;
      }
      
      .ubuntu-dropdown a {
        display: flex;
        align-items: center;
      }
      
      .nav-actions {
        display: flex;
        align-items: center;
      }
    </style>
  `;
  
  // Create navigation HTML structure with dropdowns and theme toggle
  const navHtml = `
    ${navCSS}
    <nav class="navbar">
      <ul class="nav-menu">
        <li><a href="${rootPrefix}home.html" style="text-decoration: none; color: var(--link-color); font-weight: bold;">Home</a></li>
        <li><a href="${rootPrefix}about.html" style="text-decoration: none; color: var(--link-color); font-weight: bold;">About</a></li>
        <li class="nav-dropdown">
          <a href="${rootPrefix}research/index.html" style="text-decoration: none; color: var(--link-color); font-weight: bold;">Research</a>
          <div class="dropdown-content research-dropdown">
            <a href="${rootPrefix}research/publications.html">Publications</a>
            <a href="${rootPrefix}research/projects.html">Current Projects</a>
            <a href="${rootPrefix}research/interests.html">Research Interests</a>
            <a href="${rootPrefix}research/equations.html">Example Equations</a>
          </div>
        </li>
        <li><a href="${rootPrefix}projects.html" style="text-decoration: none; color: var(--link-color); font-weight: bold;">Projects</a></li>
        
        <li class="nav-dropdown">
          <a href="${rootPrefix}utils/index.html" style="text-decoration: none; color: var(--link-color); font-weight: bold;">Utils</a>
          <div class="dropdown-content">
            <!-- Add utils pages here, but NOT Ubuntu directly -->
          </div>
        </li>
        
        <li><a href="${rootPrefix}contact.html" style="text-decoration: none; color: var(--link-color); font-weight: bold;">Contact</a></li>
      </ul>
      <div class="nav-actions">
        <button id="theme-toggle" onclick="toggleTheme()" class="theme-toggle-btn" title="${themeTitle}">
          <span>${themeIcon}</span>
        </button>
      </div>
    </nav>
  `;

        // All Ubuntu and Utils references removed
  
  // Find the nav container and inject the navigation bar
  const container = document.getElementById('nav-container');
  if (container) {
    container.innerHTML = navHtml;
    console.log('Navigation bar with dropdowns injected');
  } else {
    console.error('Navigation container not found');
  }
});
