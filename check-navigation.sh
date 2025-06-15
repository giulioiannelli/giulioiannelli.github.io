#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Checking all HTML files for navigation elements...${NC}\n"

# Find all HTML files recursively
html_files=$(find . -name "*.html")
count=0
issues=0

for file in $html_files; do
    count=$((count+1))
    echo -e "${BLUE}Checking${NC} $file..."
    
    # Check for nav-container div
    if ! grep -q '<div id="nav-container"></div>' "$file"; then
        echo -e "  ${RED}MISSING${NC}: <div id=\"nav-container\"></div>"
        echo -e "  ${YELLOW}FIXING${NC}: Adding nav-container div"
        sed -i 's/<body>/<body>\n    <div id="nav-container"><\/div>/' "$file"
        issues=$((issues+1))
    else
        echo -e "  ${GREEN}OK${NC}: nav-container div found"
    fi
    
    # Check for theme-toggle.js
    if ! grep -q 'theme-toggle.js' "$file"; then
        echo -e "  ${RED}MISSING${NC}: theme-toggle.js script"
        echo -e "  ${YELLOW}FIXING${NC}: Adding theme-toggle.js script"
        
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
        
        sed -i "s/<head>/<head>\n    <script src=\"${prefix}js\/theme-toggle.js\" defer><\/script>/" "$file"
        issues=$((issues+1))
    else
        echo -e "  ${GREEN}OK${NC}: theme-toggle.js script found"
    fi
    
    # Check for nav.js
    if ! grep -q 'nav.js' "$file"; then
        echo -e "  ${RED}MISSING${NC}: nav.js script"
        echo -e "  ${YELLOW}FIXING${NC}: Adding nav.js script"
        
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
        
        sed -i "s/<script src=\"${prefix}js\/theme-toggle.js\" defer><\/script>/<script src=\"${prefix}js\/theme-toggle.js\" defer><\/script>\n    <script src=\"${prefix}js\/nav.js\" defer><\/script>/" "$file"
        issues=$((issues+1))
    else
        echo -e "  ${GREEN}OK${NC}: nav.js script found"
    fi
    
    # Check for mathjax-config.js if equations are likely to be present
    if ! grep -q 'mathjax-config.js' "$file"; then
        echo -e "  ${YELLOW}NOTE${NC}: mathjax-config.js script not found (only needed for pages with math equations)"
    else
        echo -e "  ${GREEN}OK${NC}: mathjax-config.js script found"
    fi
    
    echo ""
done

echo -e "${BLUE}Summary:${NC}"
echo -e "Checked $count HTML files"
if [ $issues -eq 0 ]; then
    echo -e "${GREEN}No issues found!${NC}"
else
    echo -e "${YELLOW}Fixed $issues issues${NC}"
fi
