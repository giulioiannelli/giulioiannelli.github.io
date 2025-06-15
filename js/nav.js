document.addEventListener('DOMContentLoaded', function() {
  // Get current path to handle relative links correctly
  const path = window.location.pathname;
  const isInUtilsUbuntu = path.includes('/utils/ubuntu/');
  const isInUtils = path.includes('/utils/') && !isInUtilsUbuntu;
  const isInResearch = path.includes('/research/');
  const isInSubfolder = isInUtilsUbuntu || isInResearch || isInUtils;
  const rootPrefix = isInUtilsUbuntu ? '../../' : (isInResearch || isInUtils ? '../' : '');
  
  // Dropdown CSS for navigation
  const navCSS = `
    <style>
      .nav-dropdown {
        position: relative;
        display: inline-block;
      }
      
      .dropdown-content {
        display: none;
        position: absolute;
        background-color: #f9f9f9;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
        border-radius: 4px;
      }
      
      .dropdown-content a {
        color: #0366d6;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
        font-weight: normal;
      }
      
      .dropdown-content a:hover {
        background-color: #f1f1f1;
      }
      
      .nav-dropdown:hover .dropdown-content {
        display: block;
      }
      
      .nav-dropdown > a::after {
        content: " ▼";
        font-size: 0.7em;
        vertical-align: middle;
      }
      
      .dropdown-number {
        display: inline-block;
        font-weight: bold;
        color: #0366d6;
        margin-right: 6px;
        min-width: 18px;
      }
      
      .ubuntu-dropdown a {
        display: flex;
        align-items: center;
      }
    </style>
  `;
  
  // Create navigation HTML structure with dropdowns
  const navHtml = `
    ${navCSS}
    <nav style="background-color: #f8f8f8; padding: 1rem; display: flex; justify-content: center;">
      <ul style="list-style: none; margin: 0; padding: 0; display: flex; gap: 2rem;">
        <li><a href="${rootPrefix}index.html" style="text-decoration: none; color: #0366d6; font-weight: bold;">Home</a></li>
        <li><a href="${rootPrefix}about.html" style="text-decoration: none; color: #0366d6; font-weight: bold;">About</a></li>
        <li class="nav-dropdown">
          <a href="${rootPrefix}research/index.html" style="text-decoration: none; color: #0366d6; font-weight: bold;">Research</a>
          <div class="dropdown-content research-dropdown">
            <a href="${rootPrefix}research/publications.html">Publications</a>
            <a href="${rootPrefix}research/projects.html">Current Projects</a>
            <a href="${rootPrefix}research/interests.html">Research Interests</a>
            <a href="${rootPrefix}research/equations.html">Example Equations</a>
          </div>
        </li>
        <li><a href="${rootPrefix}projects.html" style="text-decoration: none; color: #0366d6; font-weight: bold;">Projects</a></li>
        <li class="nav-dropdown">
          <a href="${rootPrefix}utils/index.html" style="text-decoration: none; color: #0366d6; font-weight: bold;">Utils</a>
          <div class="dropdown-content">
            <a href="${rootPrefix}utils/ubuntu/index.html">Ubuntu Setting</a>
            <!-- More utility sections can be added here in the future -->
          </div>
        </li>
        <li class="nav-dropdown">
          <a href="${rootPrefix}utils/ubuntu/index.html" style="text-decoration: none; color: #0366d6; font-weight: bold;">Ubuntu Setting</a>
          <div class="dropdown-content ubuntu-dropdown">
            <a href="${rootPrefix}utils/ubuntu/apt.html"><span class="dropdown-number">1.</span> APT Installs</a>
            <a href="${rootPrefix}utils/ubuntu/dpkg.html"><span class="dropdown-number">2.</span> DPKG Installs</a>
            <a href="${rootPrefix}utils/ubuntu/snap.html"><span class="dropdown-number">3.</span> Removing Snap</a>
            <a href="${rootPrefix}utils/ubuntu/scripts.html"><span class="dropdown-number">4.</span> Useful Scripts</a>
          </div>
        </li>
        <li><a href="${rootPrefix}contact.html" style="text-decoration: none; color: #0366d6; font-weight: bold;">Contact</a></li>
      </ul>
    </nav>
  `;
  
  // Find the nav container and inject the navigation bar
  const container = document.getElementById('nav-container');
  if (container) {
    container.innerHTML = navHtml;
    console.log('Navigation bar with dropdowns injected');
  } else {
    console.error('Navigation container not found');
  }
});
