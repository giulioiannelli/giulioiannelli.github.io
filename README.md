# giulioiannelli.github.io

## Test the website
To test this webpage move into folder and run a localhost `python` server
```
    cd <path-to>/giulioiannelli.github.io
    python3 -m http.server
```
then reach any page of the site on a web browser with the url e.g. `http://localhost:8000/research/publications.html`

## Sub-TOC Feature

This website now supports a sub-TOC (Table of Contents) feature that automatically generates a table of contents for the current page based on its headings.

### How to Use the Sub-TOC

1. Include the sub-toc.js script in your page:
   ```html
   <script src="js/sub-toc.js" defer></script>
   ```
   (Adjust the path based on your file's location)

2. Add the heading ID script to ensure all headings have proper anchor IDs:
   ```html
   <script>
   document.addEventListener('DOMContentLoaded', () => {
       document.querySelectorAll("h1,h2,h3,h4,h5,h6").forEach(h => {
           if (!h.id) {
               const anchor = h.textContent.trim().replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
               h.id = anchor;
           }
       });
   });
   </script>
   ```

3. Add a div with id="sub-toc" where you want the table of contents to appear:
   ```html
   <div id="sub-toc">
       <!-- This will be filled by sub-toc.js -->
   </div>
   ```

4. If you're using a specific content container (recommended), wrap your content in a div with id="contents":
   ```html
   <div id="contents">
       <h2>First Section</h2>
       <p>Content here...</p>
       <!-- More content and headings -->
   </div>
   ```

### How It Works

- The sub-toc.js script automatically generates a table of contents based on all h1-h6 elements found in the content.
- It creates proper nesting based on heading levels (e.g., h3 will be nested under h2).
- Each TOC entry links to the respective heading using anchor links.
- The script adds IDs to headings if they don't already have them.

### Differences Between TOC and Sub-TOC

- **toc.js**: Generates a table of contents across multiple pages (used in the Ubuntu section)
- **sub-toc.js**: Generates a table of contents for the current page only

### Template

Use the `page-template-with-sub-toc.html` as a starting point for new pages that should include the sub-TOC feature.

## Theme Toggle Feature

This website now supports a theme toggle feature that allows users to switch between light and dark themes.

### How to Use the Theme Toggle

1. Include the theme-toggle.js script in your page (before nav.js):
   ```html
   <script src="js/theme-toggle.js" defer></script>
   <script src="js/nav.js" defer></script>
   ```
   (Adjust the paths based on your file's location)

2. The navigation bar automatically includes a theme toggle button.

3. The theme preference is saved to localStorage, so it will persist across page loads.

4. The theme toggle button shows:
   - ☀️ when in dark mode (click to switch to light mode)
   - 🌙 when in light mode (click to switch to dark mode)

### Theme Variables

The site uses CSS variables for theme-aware styling. The main variables are:

- `--bg-color`: Background color
- `--text-color`: Text color
- `--heading-color`: Heading color
- `--link-color`: Link color
- `--link-hover`: Link hover color
- `--nav-bg`: Navigation background
- `--navbar-bg`: Navbar background
- `--border-color`: Border color
- `--code-bg`: Code block background
- `--blockquote-bg`: Blockquote background
- `--button-bg`: Button background
- `--button-hover`: Button hover background
- `--dropdown-bg`: Dropdown background
- `--dropdown-text`: Dropdown text color
- `--dropdown-hover`: Dropdown hover background
- `--dropdown-border`: Dropdown border color

When creating new UI elements, use these variables to ensure they work with both themes.

## Color Palette

The website uses a pastel color palette that provides a softer, more visually pleasing experience:

### Light Theme Pastel Colors
- Links: Soft pastel blue (#7b9ed9)
- Navbar: Very light pastel blue (#f0f4f8)
- Buttons: Light pastel bluish-gray (#e2e8f0)
- Button hover: Slightly darker pastel bluish-gray (#cbd5e0)

### Dark Theme Pastel Colors
- Links: Pastel blue (#9db5e9)
- Link hover: Lighter pastel blue (#b1c3ef)

### Animation Effects
- Navigation links have an animated underline effect on hover
- Buttons have subtle hover and active states with elevation changes
- Dropdown menus have smooth transitions and subtle animations

These colors create a cohesive and visually appealing interface while maintaining good contrast for readability.
