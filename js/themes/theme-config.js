/**
 * theme-config.js - Theme configuration and toggle functionality
 */

// Theme variables and initialization
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply the saved theme on load
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Initialize the toggle button state on page load
  updateToggleButton(savedTheme);
  
  // Expose the toggle function to be called by the button
  window.toggleTheme = toggleTheme;
});

/**
 * Function to toggle between light and dark themes
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  // Update the theme attribute
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // Save preference to localStorage
  localStorage.setItem('theme', newTheme);
  
  // Update toggle button icon/text if it exists
  updateToggleButton(newTheme);
}

/**
 * Function to update the toggle button appearance
 * @param {string} theme - Current theme ('light' or 'dark')
 */
function updateToggleButton(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Update button text/icon based on current theme
    if (theme === 'light') {
      themeToggle.innerHTML = '<span>🌙</span>';
      themeToggle.setAttribute('title', 'Switch to dark mode');
    } else {
      themeToggle.innerHTML = '<span>☀️</span>';
      themeToggle.setAttribute('title', 'Switch to light mode');
    }
  }
}
