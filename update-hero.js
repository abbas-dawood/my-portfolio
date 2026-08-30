import fs from 'fs';

let content = fs.readFileSync('src/components/Hero.tsx', 'utf8');

content = content.replace(
  /href="\/Abbas_Dawood_Resume\.pdf"/g,
  'href="/Abbas_Dawood_Resume.pdf.pdf"'
);
content = content.replace(
  /download="Abbas_Dawood_Resume\.pdf"/g,
  'download="Abbas_Dawood_Resume.pdf.pdf"'
);

fs.writeFileSync('src/components/Hero.tsx', content);
