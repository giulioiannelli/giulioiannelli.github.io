#!/bin/bash

# Find all HTML files in the repository
find . -type f -name "*.html" | while read file; do
  echo "Processing $file"
  
  # Root level paths
  if [[ "$file" =~ ^\.\/[^/]+\.html$ ]]; then
    sed -i 's|<script src="js/theme-toggle.js" defer></script>|<script src="js/main.js" defer></script>|' "$file"
    sed -i '/<script src="js\/nav.js" defer><\/script>/d' "$file"
    sed -i '/<script src="js\/mathjax-config.js" defer><\/script>/d' "$file"
    sed -i '/<script src="js\/page-title.js" defer><\/script>/d' "$file"
    sed -i '/<script src="js\/sub-toc.js" defer><\/script>/d' "$file"
    sed -i '/<script src="js\/toc.js" defer><\/script>/d' "$file"
  
  # First level subdirectories (e.g., research/, utils/)
  elif [[ "$file" =~ ^\.\/[^/]+\/[^/]+\.html$ ]]; then
    sed -i 's|<script src="../js/theme-toggle.js" defer></script>|<script src="../js/main.js" defer></script>|' "$file"
    sed -i '/<script src="\.\.\/js\/nav.js" defer><\/script>/d' "$file"
    sed -i '/<script src="\.\.\/js\/mathjax-config.js" defer><\/script>/d' "$file" 
    sed -i '/<script src="\.\.\/js\/page-title.js" defer><\/script>/d' "$file"
    sed -i '/<script src="\.\.\/js\/sub-toc.js" defer><\/script>/d' "$file"
    sed -i '/<script src="\.\.\/js\/toc.js" defer><\/script>/d' "$file"
    
  # Second level subdirectories (e.g., utils/ubuntu/, utils/handouts/)
  elif [[ "$file" =~ ^\.\/[^/]+\/[^/]+\/[^/]+\.html$ ]]; then
    sed -i 's|<script src="../../js/theme-toggle.js" defer></script>|<script src="../../js/main.js" defer></script>|' "$file"
    sed -i '/<script src="\.\.\/\.\.\/js\/nav.js" defer><\/script>/d' "$file"
    sed -i '/<script src="\.\.\/\.\.\/js\/mathjax-config.js" defer><\/script>/d' "$file"
    sed -i '/<script src="\.\.\/\.\.\/js\/page-title.js" defer><\/script>/d' "$file"
    sed -i '/<script src="\.\.\/\.\.\/js\/sub-toc.js" defer><\/script>/d' "$file"
    sed -i '/<script src="\.\.\/\.\.\/js\/toc.js" defer><\/script>/d' "$file"
  fi
  
  # Add the nav container if it doesn't exist 
  if ! grep -q '<div id="nav-container"></div>' "$file"; then
    sed -i 's|<body>|<body>\n    <div id="nav-container"></div>|' "$file"
  fi
done

echo "All HTML files updated to use the new JS structure."
