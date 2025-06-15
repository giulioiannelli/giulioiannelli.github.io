#!/bin/bash

# Convert relative paths (../../) to absolute paths (/) for all HTML files
# Usage: ./convert-to-absolute-paths.sh

# Set the base directory to the current directory (should be run from root of the project)
BASE_DIR="$(pwd)"
echo "Converting relative paths to absolute paths in HTML files under: $BASE_DIR"

# Find all HTML files
HTML_FILES=$(find "$BASE_DIR" -name "*.html")

# Function to convert relative paths to absolute paths in a file
convert_file() {
  local file="$1"
  echo "Processing: $file"
  
  # Get relative depth from file to root
  local depth=$(echo "$file" | sed -e "s|$BASE_DIR||" | grep -o "/" | wc -l)
  local relative_prefix=""
  
  # Build the appropriate relative prefix (../../ etc)
  for ((i=0; i<depth; i++)); do
    relative_prefix="../$relative_prefix"
  done
  
  # Only convert if there's a relative path to convert
  if [ -n "$relative_prefix" ]; then
    # Replace relative paths with absolute paths
    sed -i "s|href=\"$relative_prefix|href=\"/|g" "$file"
    sed -i "s|src=\"$relative_prefix|src=\"/|g" "$file"
    
    # Check if base-url.js is already included
    if ! grep -q "/js/utils/base-url.js" "$file"; then
      # Add base-url.js script and meta tag after the viewport meta tag
      sed -i '/<meta name="viewport"/a \    <meta name="base-url" content="">\n    <script src="/js/utils/base-url.js"></script>' "$file"
    fi
    
    echo "  ✓ Converted"
  else
    echo "  ✓ Already using absolute paths"
  fi
}

# Process each HTML file
for file in $HTML_FILES; do
  convert_file "$file"
done

echo "Conversion complete!"
