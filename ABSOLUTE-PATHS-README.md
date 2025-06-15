# Absolute Path Usage

This document explains the approach used for managing paths in the website.

## Overview

Instead of using relative paths with `../../`, this website now uses absolute paths starting with a slash `/`. 
This makes path management more consistent and easier to understand.

## How it Works

1. **Absolute Paths**: All URLs now start with `/`, e.g., `/css/style.css` instead of `../../css/style.css`

2. **Base URL Support**: For deployment in subdirectories (like GitHub Pages), a `base-url.js` script 
   automatically adjusts the paths.

3. **Meta Tag Configuration**: Each HTML file has a `<meta name="base-url">` tag that can be configured 
   for deployment contexts.

## Updating Your Files

To convert all HTML files in the project to use absolute paths:

```bash
# Run from project root
./convert-to-absolute-paths.sh
```

## For GitHub Pages Deployment

If deploying to a subdirectory on GitHub Pages (e.g., `username.github.io/repo-name/`), update the base-url meta tag:

```html
<meta name="base-url" content="/repo-name">
```

## Benefits

- More consistent path references
- Easier to understand directory relationships
- More maintainable in the long run
- Paths don't break when moving files between directories
