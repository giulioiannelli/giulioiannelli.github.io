document.addEventListener('DOMContentLoaded', async function () {
    const tocDiv = document.getElementById("toc");

    const pages = [
        "index.html",
        "apt.html",
        "dpkg.html",
        "snap.html",
        "scripts.html",
    ];

    let toc = "<ol>";

    for (const url of pages) {
        try {
            const res = await fetch(url);
            const html = await res.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // Use the <title> tag or fallback
            const pageTitle = doc.querySelector("title")?.textContent || url;
            const headings = doc.querySelectorAll("h1, h2, h3");

            toc += `<li><strong>${pageTitle}</strong><ol>`;

            headings.forEach(h => {
                const level = h.tagName;
                const text = h.textContent.trim();

                // Generate a stable anchor name
                const anchor = text.replace(/\s+/g, "_").replace(/[^\w\-]/g, "");

                toc += `<li><a href="${url}#${anchor}">${text}</a></li>`;
            });

            toc += "</ol></li>";
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