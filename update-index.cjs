const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Update title
html = html.replace(
  /<title>.*?<\/title>/,
  '<title>Abbas Dawood | Future Commercial Pilot, MUN Leader &amp; Technologist</title>'
);
html = html.replace(
  /<meta name="title" content=".*?" \/>/,
  '<meta name="title" content="Abbas Dawood | Future Commercial Pilot, MUN Leader & Technologist" />'
);

// Update description
html = html.replace(
  /<meta name="description" content=".*?" \/>/g,
  '<meta name="description" content="Explore the digital portfolio of Abbas Dawood, an aspiring commercial pilot, technology enthusiast, and Model UN leader based in Udaipur, India." />'
);
html = html.replace(
  /<meta property="og:description" content=".*?" \/>/g,
  '<meta property="og:description" content="Explore the digital portfolio of Abbas Dawood, an aspiring commercial pilot, technology enthusiast, and Model UN leader based in Udaipur, India." />'
);
html = html.replace(
  /<meta property="twitter:description" content=".*?" \/>/g,
  '<meta property="twitter:description" content="Explore the digital portfolio of Abbas Dawood, an aspiring commercial pilot, technology enthusiast, and Model UN leader based in Udaipur, India." />'
);

// Add og:site_name
html = html.replace(
  /<meta property="og:type"/,
  '<meta property="og:site_name" content="Abbas Dawood Portfolio" />\n    <meta property="og:type"'
);

// Add google site verification placeholder
html = html.replace(
  /<!-- Open Graph \/ Facebook -->/,
  '<!-- Google Search Console -->\n    <meta name="google-site-verification" content="INSERT_YOUR_GOOGLE_SEARCH_CONSOLE_TAG_HERE" />\n\n    <!-- Open Graph / Facebook -->'
);

// Update JSON-LD
html = html.replace(
  /"sameAs": \[/,
  `"address": {
            "@type": "PostalAddress",
            "addressLocality": "Udaipur",
            "addressRegion": "Rajasthan",
            "addressCountry": "India"
          },
          "sameAs": [`
);

fs.writeFileSync('index.html', html);
