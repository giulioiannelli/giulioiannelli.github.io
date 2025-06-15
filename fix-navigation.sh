#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Ensuring consistent navigation across all HTML files...${NC}\n"

# Find all HTML files recursively
html_files=$(find . -name "*.html")
count=0
fixes=0

for file in $html_files; do
    count=$((count+1))
    echo -e "${BLUE}Processing${NC} $file..."
    
    # Determine the correct path prefix based on directory depth
    if [[ "$file" == *"/"*"/"* ]]; then
        # This is a nested file (like utils/ubuntu/something.html)
        prefix="../../"
    elif [[ "$file" == *"/"* ]]; then
        # This is a first-level subfolder file (like utils/something.html)
        prefix="../"
    else
        # This is a root file
        prefix=""
    fi
    
    # 1. Make sure there's a body tag
    if ! grep -q '<body>' "$file"; then
        echo -e "  ${YELLOW}FIXING${NC}: Adding <body> tag"
        sed -i 's/<html>/<html>\n<body>/' "$file"
        fixes=$((fixes+1))
    fi
    
    # 2. Make sure there's a nav-container div right after the body tag
    if ! grep -q '<div id="nav-container"></div>' "$file"; then
        echo -e "  ${YELLOW}FIXING${NC}: Adding nav-container div"
        sed -i 's/<body>/<body>\n    <div id="nav-container"><\/div>/' "$file"
        fixes=$((fixes+1))
    fi
    
    # 3. Make sure theme-toggle.js is included
    if ! grep -q 'theme-toggle.js' "$file"; then
        echo -e "  ${YELLOW}FIXING${NC}: Adding theme-toggle.js script"
        sed -i "s/<head>/<head>\n    <script src=\"${prefix}js\/theme-toggle.js\" defer><\/script>/" "$file"
        fixes=$((fixes+1))
    fi
    
    # 4. Make sure nav.js is included after theme-toggle.js
    if ! grep -q 'nav.js' "$file"; then
        echo -e "  ${YELLOW}FIXING${NC}: Adding nav.js script"
        if grep -q 'theme-toggle.js' "$file"; then
            sed -i "s/<script src=\"${prefix}js\/theme-toggle.js\" defer><\/script>/<script src=\"${prefix}js\/theme-toggle.js\" defer><\/script>\n    <script src=\"${prefix}js\/nav.js\" defer><\/script>/" "$file"
        else
            sed -i "s/<head>/<head>\n    <script src=\"${prefix}js\/nav.js\" defer><\/script>/" "$file"
        fi
        fixes=$((fixes+1))
    fi
    
    # 5. Remove any duplicated scripts
    if grep -c 'theme-toggle.js' "$file" | grep -q "2"; then
        echo -e "  ${YELLOW}FIXING${NC}: Removing duplicate theme-toggle.js script"
        sed -i '0,/<script src=".*theme-toggle.js" defer><\/script>/!d' "$file"
        fixes=$((fixes+1))
    fi
    
    if grep -c 'nav.js' "$file" | grep -q "2"; then
        echo -e "  ${YELLOW}FIXING${NC}: Removing duplicate nav.js script"
        sed -i '0,/<script src=".*nav.js" defer><\/script>/!d' "$file"
        fixes=$((fixes+1))
    fi
    
    if grep -c 'mathjax-config.js' "$file" | grep -q "2"; then
        echo -e "  ${YELLOW}FIXING${NC}: Removing duplicate mathjax-config.js script"
        sed -i '0,/<script src=".*mathjax-config.js" defer><\/script>/!d' "$file"
        fixes=$((fixes+1))
    fi
    
    echo -e "  ${GREEN}Processed successfully${NC}"
done

echo -e "\n${BLUE}Summary:${NC}"
echo -e "Processed $count HTML files"
echo -e "${GREEN}Applied $fixes fixes${NC}"
echo -e "\n${YELLOW}Note${NC}: To test navigation, open any HTML page in your browser and verify that:"
echo "1. The navigation bar appears at the top of the page"
echo "2. The theme toggle button works"
echo "3. All navigation links work correctly"
