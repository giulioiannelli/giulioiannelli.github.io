document.addEventListener('DOMContentLoaded', async function () {
    const tocDiv = document.getElementById("toc");
    
    // Exit if there's no TOC div
    if (!tocDiv) {
        return;
    }

    const pages = [
        "ubuntu-setup-guide.html",
        "apt.html",
        "dpkg.html",
        "snap.html",
        "scripts.html",
        "bash-setting.html"
    ];

    let toc = "<ol>";
    
    // Track the main page numbering
    let mainPageIndex = 0;

    for (const url of pages) {
        try {
            const res = await fetch(url);
            const html = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // Use the <title> tag or fallback
            const pageTitle = doc.querySelector("title")?.textContent || url;
            
            // Only get content headings, excluding those inside the TOC div itself
            // We need to exclude h3 elements inside the TOC to avoid "Table of Contents" appearing in our TOC
            const mainHeadings = Array.from(doc.querySelectorAll("h2, h3")).filter(heading => {
                // Check if this heading is inside a TOC div
                let parent = heading.parentElement;
                while (parent) {
                    if (parent.id === 'toc' || parent.id === 'sub-toc') {
                        return false;
                    }
                    parent = parent.parentElement;
                }
                return true;
            });
            
            // Increment main page index for numbering
            mainPageIndex++;
            
            // Add the page as a link (not just strong text)
            toc += `<li><a href="${url}">${pageTitle}</a>`;
            
            // Only add the sub-list if there are content headings
            if (mainHeadings.length > 0) {
                toc += `<ol>`;
            }

            // Track heading level numbering within each page
            let sectionCounter = {};
            let currentLevel = 2; // Start with H2 since we're skipping H1
            let numbering = '';
            
            mainHeadings.forEach(h => {
                // Get heading level as a number (h2 = 2, h3 = 3, etc.)
                const level = parseInt(h.tagName.substring(1));
                const text = h.textContent.trim();

                // Generate a stable anchor name
                const anchor = text.replace(/\s+/g, "_").replace(/[^\w\-]/g, "");
                
                // Reset counters for lower levels when a higher level heading is encountered
                for (let i = level + 1; i <= 6; i++) {
                    sectionCounter[i] = 0;
                }
                
                // Initialize or increment counter for this level
                sectionCounter[level] = (sectionCounter[level] || 0) + 1;
                
                // Simple numbering: mainPageIndex.sectionNumber
                if (level === 2) {
                    // For h2 headings (main sections): 1.1, 1.2, etc.
                    numbering = `${mainPageIndex}.${sectionCounter[2]}`;
                } else if (level === 3) {
                    // For h3 headings (subsections): 1.1.1, 1.1.2, etc.
                    numbering = `${mainPageIndex}.${sectionCounter[2]}.${sectionCounter[3]}`;
                }
                
                toc += `<li><span class="section-number">${numbering}</span> <a href="${url}#${anchor}">${text}</a></li>`;
            });

            // Only close the ordered list if we opened one
            if (mainHeadings.length > 0) {
                toc += "</ol>";
            }
            
            toc += "</li>";
        } catch (err) {
            console.error(`Could not load ${url}:`, err);
        }
    }

    toc += "</ol>";
    tocDiv.innerHTML += toc;
});


// document.addEventListener('DOMContentLoaded', function () {
//     console.log("TOC script loaded");

//     const contents = document.getElementById("contents");
//     const tocDiv = document.getElementById("toc");

//     if (!contents || !tocDiv) {
//         console.error("Missing #contents or #toc");
//         return;
//     }

//     let toc = "<ol>";
//     let level = 0;

//     contents.innerHTML = contents.innerHTML.replace(
//         /<h([1-6])>(.*?)<\/h\1>/gi,
//         function (_, hLevel, titleText) {
//             console.log(`Found heading: ${titleText}`);

//             hLevel = parseInt(hLevel);
//             const anchor = titleText.trim().replace(/\s+/g, "_");
//             const anchorTag = `<a name="${anchor}"></a>`;

//             if (hLevel > level) {
//                 toc += "<ol>".repeat(hLevel - level);
//             } else if (hLevel < level) {
//                 toc += "</ol>".repeat(level - hLevel);
//             }

//             toc += `<li><a href="#${anchor}">${titleText}</a></li>`;
//             level = hLevel;

//             return `<h${hLevel}>${anchorTag}${titleText}</h${hLevel}>`;
//         }
//     );

//     toc += "</ol>".repeat(level);
//     tocDiv.innerHTML += toc;
// });