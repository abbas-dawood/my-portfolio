const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
  /<title>.*?<\/title>/,
  '<title>Abbas Dawood | Aspiring Commercial Pilot &amp; Technology Enthusiast</title>'
);
html = html.replace(
  /<meta name="title" content=".*?" \/>/,
  '<meta name="title" content="Abbas Dawood | Aspiring Commercial Pilot & Technology Enthusiast" />'
);

html = html.replace(
  /<meta name="description" content=".*?" \/>/g,
  '<meta name="description" content="Official portfolio of Abbas Dawood, an aspiring commercial pilot, student leader, and technology enthusiast from Udaipur, Rajasthan, with interests in aviation, innovation, technology, and public speaking." />'
);
html = html.replace(
  /<meta property="og:description" content=".*?" \/>/g,
  '<meta property="og:description" content="Official portfolio of Abbas Dawood, an aspiring commercial pilot, student leader, and technology enthusiast from Udaipur, Rajasthan, with interests in aviation, innovation, technology, and public speaking." />'
);
html = html.replace(
  /<meta property="twitter:description" content=".*?" \/>/g,
  '<meta property="twitter:description" content="Official portfolio of Abbas Dawood, an aspiring commercial pilot, student leader, and technology enthusiast from Udaipur, Rajasthan, with interests in aviation, innovation, technology, and public speaking." />'
);
html = html.replace(
  /<meta property="og:title" content=".*?" \/>/g,
  '<meta property="og:title" content="Abbas Dawood | Aspiring Commercial Pilot & Technology Enthusiast" />'
);
html = html.replace(
  /<meta property="twitter:title" content=".*?" \/>/g,
  '<meta property="twitter:title" content="Abbas Dawood | Aspiring Commercial Pilot & Technology Enthusiast" />'
);

fs.writeFileSync('index.html', html);
