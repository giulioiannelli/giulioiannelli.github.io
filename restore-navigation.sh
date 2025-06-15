#!/bin/bash

# This script will restore all HTML files to use the original working navigation system

# Find all HTML files in the repository
find . -type f -name "*.html" | while read file; do
  echo "Processing $file"
  
  # Root level paths
  if [[ "$file" =~ ^\.\/[^/]+\.html$ ]]; then
    sed -i 's|<script src="js/main.js" defer></script>|<script src="js/theme-toggle.js" defer></script>\n    <script src="js/nav.js" defer></script>\n    <script src="js/mathjax-config.js" defer></script>|' "$file"
  
  # First level subdirectories (e.g., research/, utils/)
  elif [[ "$file" =~ ^\.\/[^/]+\/[^/]+\.html$ ]]; then
    sed -i 's|<script src="../js/main.js" defer></script>|<script src="../js/theme-toggle.js" defer></script>\n    <script src="../js/nav.js" defer></script>\n    <script src="../js/mathjax-config.js" defer></script>|' "$file"
    
  # Second level subdirectories (e.g., utils/ubuntu/, utils/handouts/)
  elif [[ "$file" =~ ^\.\/[^/]+\/[^/]+\/[^/]+\.html$ ]]; then
    sed -i 's|<script src="../../js/main.js" defer></script>|<script src="../../js/theme-toggle.js" defer></script>\n    <script src="../../js/nav.js" defer></script>\n    <script src="../../js/mathjax-config.js" defer></script>|' "$file"
  fi
  
done

echo "All HTML files restored to use the original navigation system."
