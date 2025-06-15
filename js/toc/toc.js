/**
 * toc.js - Creates a table of contents across multiple pages
 */
document.addEventListener('DOMContentLoaded', async function () {
    const tocDiv = document.getElementById("toc");
    
    // Exit if there's no TOC div
    if (!tocDiv) {
        return;
    }

    // Define pages to include in the TOC
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
            let title = doc.querySelector("title")?.textContent || "";
            
            // Clean up the title if it has site name prefixes
            if (title.includes(" - ")) {
                title = title.split(" - ")[1];
            }

            // Get the main heading if title is empty or fallback
            if (!title) {
                title = doc.querySelector("h1")?.textContent || url.replace('.html', '');
            }

            // Increment the main page index if we're not looking at the overview
            if (url !== "ubuntu-setup-guide.html") {
                mainPageIndex++;
            }

            // Add the page entry to the TOC
            if (url === "ubuntu-setup-guide.html") {
                // Special case for the main page - no number
                toc += `<li><a href="${url}">${title}</a>`;
            } else {
                // Numbered pages
                toc += `<li><a href="${url}"><span class="section-number">${mainPageIndex}.</span> ${title}</a>`;
            }

            // Get all h2 and h3 headings for this page
            const headings = Array.from(doc.querySelectorAll("h2, h3"));
            
            // Filter out headings from TOC sections
            const contentHeadings = headings.filter(h => {
                return !h.closest("#toc") && !h.closest("#sub-toc") && h.id;
            });

            // If we have content headings, create a nested list
            if (contentHeadings.length > 0) {
                toc += "<ol>";
                
                // Track h2 vs h3 nesting
                let inH2Section = false;
                let h2Index = 0;
                
                contentHeadings.forEach(heading => {
                    const headingId = heading.id;
                    const headingText = heading.textContent;
                    
                    if (heading.tagName === "H2") {
                        // Close previous h2 section if there was one
                        if (inH2Section) {
                            toc += "</ol></li>";
                        }
                        
                        // Start a new h2 section
                        h2Index++;
                        const sectionNumber = url === "ubuntu-setup-guide.html" 
                            ? h2Index.toString() 
                            : `${mainPageIndex}.${h2Index}`;
                            
                        toc += `<li><a href="${url}#${headingId}">
                               <span class="section-number">${sectionNumber}</span> ${headingText}</a>`;
                        
                        // Start nested list for h3s
                        toc += "<ol>";
                        inH2Section = true;
                    } else if (heading.tagName === "H3" && inH2Section) {
                        // Add h3 to the current h2 section
                        toc += `<li><a href="${url}#${headingId}">${headingText}</a></li>`;
                    }
                });
                
                // Close the last h2 section if there was one
                if (inH2Section) {
                    toc += "</ol></li>";
                }
                
                // Close the page's headings list
                toc += "</ol>";
            }
            
            // Close the page entry
            toc += "</li>";
            
        } catch (error) {
            console.error(`Error loading ${url}:`, error);
            // Add error entry to TOC
            toc += `<li><a href="${url}">Error loading ${url}</a></li>`;
        }
    }
    
    // Close the main list
    toc += "</ol>";
    
    // Add heading to TOC
    const tocHeading = document.createElement("h3");
    tocHeading.textContent = "Table of Contents";
    tocDiv.appendChild(tocHeading);
    
    // Add the TOC content
    tocDiv.innerHTML += toc;
});
