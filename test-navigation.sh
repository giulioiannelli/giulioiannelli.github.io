#!/bin/bash

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create a simple HTML test page that we can use to check if the navigation is working
cat > test-navigation.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Testing Navigation</title>
    <script>
        function checkNavigation() {
            // Wait for DOM content to be loaded and scripts to execute
            setTimeout(() => {
                const navContainer = document.getElementById('results');
                
                // Check if navigation container exists
                const navContainerExists = !!document.getElementById('nav-container');
                
                // Check if navigation bar was injected
                const navbarExists = !!document.querySelector('.navbar');
                
                // Check if any navigation menu items exist
                const navMenuExists = !!document.querySelector('.nav-menu');
                
                // Check if any dropdown menu exists
                const dropdownExists = !!document.querySelector('.dropdown-content');
                
                // Check if theme toggle button exists
                const themeToggleExists = !!document.getElementById('theme-toggle');
                
                // Display results
                navContainer.innerHTML = `
                    <h3>Navigation Test Results:</h3>
                    <ul>
                        <li>Navigation Container: ${navContainerExists ? '✅ Found' : '❌ Missing'}</li>
                        <li>Navigation Bar: ${navbarExists ? '✅ Found' : '❌ Missing'}</li>
                        <li>Navigation Menu: ${navMenuExists ? '✅ Found' : '❌ Missing'}</li>
                        <li>Dropdown Menu: ${dropdownExists ? '✅ Found' : '❌ Missing'}</li>
                        <li>Theme Toggle: ${themeToggleExists ? '✅ Found' : '❌ Missing'}</li>
                    </ul>
                    
                    <h3>Console Output:</h3>
                    <pre id="console-output"></pre>
                `;
                
                // Capture console output
                const consoleOutput = document.getElementById('console-output');
                const originalConsoleLog = console.log;
                const originalConsoleError = console.error;
                
                console.log = function(message) {
                    consoleOutput.textContent += 'LOG: ' + message + '\n';
                    originalConsoleLog.apply(console, arguments);
                };
                
                console.error = function(message) {
                    consoleOutput.textContent += 'ERROR: ' + message + '\n';
                    originalConsoleError.apply(console, arguments);
                };
            }, 1000);
        }
        
        window.onload = checkNavigation;
    </script>
</head>
<body>
    <div id="nav-container"></div>
    <h1>Navigation Test</h1>
    <p>This page tests whether the navigation bar is loading correctly.</p>
    <div id="results">Testing...</div>
</body>
</html>
EOF

echo -e "${BLUE}Created test-navigation.html${NC}"
echo -e "${YELLOW}To test navigation:${NC}"
echo "1. Open test-navigation.html in a browser"
echo "2. Look for the navigation bar at the top of the page"
echo "3. Check the test results displayed on the page"
echo -e "\n${BLUE}Make sure you have all necessary scripts properly linked:${NC}"
echo "- theme-toggle.js"
echo "- nav.js"
