/**
 * path-helpers.js - Utility functions for path handling
 */

/**
 * Get the current path information
 * @returns {Object} Path information with properties for different path types
 */
function getPathInfo() {
  const path = window.location.pathname;
  
  return {
    isInUtilsUbuntu: path.includes('/utils/ubuntu/'),
    isInUtilsHandouts: path.includes('/utils/handouts/'),
    isInUtils: path.includes('/utils/') && !path.includes('/utils/ubuntu/') && !path.includes('/utils/handouts/'),
    isInResearch: path.includes('/research/'),
    isInRoot: !path.includes('/utils/') && !path.includes('/research/'),
    path: path,
    pageName: path.split('/').pop().replace('.html', '')
  };
}

/**
 * Get the appropriate root prefix for building relative paths
 * @returns {string} The path prefix to use for relative URLs
 */
function getRootPrefix() {
  const pathInfo = getPathInfo();
  
  if (pathInfo.isInUtilsUbuntu || pathInfo.isInUtilsHandouts) {
    return '../../';
  } else if (pathInfo.isInUtils || pathInfo.isInResearch) {
    return '../';
  }
  return '';
}

// Export as window variables
window.getPathInfo = getPathInfo;
window.getRootPrefix = getRootPrefix;
