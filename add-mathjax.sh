#!/bin/bash

# This script adds MathJax to all HTML files in the site
# Usage: ./add-mathjax.sh

# Find all HTML files in the site
find . -name "*.html" -type f | while read -r file; do
  # Skip files that already have MathJax
  if grep -q "mathjax-config.js" "$file"; then
    echo "✓ MathJax already added to $file"
    continue
  fi
  
  # Determine the correct path to JS files
  if [[ "$file" == *"/"* && "$file" != "./index.html" ]]; then
    # File is in a subdirectory
    JS_PATH="../js/mathjax-config.js"
  else
    # File is in the root directory
    JS_PATH="js/mathjax-config.js"
  fi
  
  # Add MathJax script before </head>
  sed -i "s|</head>|    <script src=\"$JS_PATH\" defer></script>\n</head>|" "$file"
  
  echo "✓ Added MathJax to $file"
done

echo "Done! MathJax has been added to all HTML files."
