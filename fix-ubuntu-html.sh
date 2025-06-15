#!/bin/bash

# Fix duplicate script imports in Ubuntu HTML files
for file in utils/ubuntu/*.html; do
    echo "Fixing $file..."
    # Use sed to remove duplicate script imports
    sed -i 's/<script src="\.\.\/\.\.\/js\/theme-toggle\.js" defer><\/script>.*<script src="\.\.\/\.\.\/js\/theme-toggle\.js" defer><\/script>/<script src="..\/..\/js\/theme-toggle.js" defer><\/script>/g' "$file"
    sed -i 's/<script src="\.\.\/\.\.\/js\/nav\.js" defer><\/script>.*<script src="\.\.\/\.\.\/js\/nav\.js" defer><\/script>/<script src="..\/..\/js\/nav.js" defer><\/script>/g' "$file"
    sed -i 's/<script src="\.\.\/\.\.\/js\/mathjax-config\.js" defer><\/script>.*<script src="\.\.\/\.\.\/js\/mathjax-config\.js" defer><\/script>/<script src="..\/..\/js\/mathjax-config.js" defer><\/script>/g' "$file"
done

echo "All Ubuntu HTML files fixed!"
