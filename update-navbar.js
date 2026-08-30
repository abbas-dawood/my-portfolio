import fs from 'fs';

let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Ensure MUN is in navLinks
if (!content.includes("{ name: 'MUN & DIPLOMACY', href: '#mun' }")) {
  content = content.replace(
    /{ name: 'EXPERIENCE', href: '#experience' },/,
    `{ name: 'EXPERIENCE', href: '#experience' },\n  { name: 'MUN & DIPLOMACY', href: '#mun' },`
  );
}

// Ensure the PDF reference is Abbas_Dawood_Resume.pdf.pdf
content = content.replace(
  /href="\/Abbas_Dawood_Resume\.pdf"/g,
  'href="/Abbas_Dawood_Resume.pdf.pdf"'
);
content = content.replace(
  /download="Abbas_Dawood_Resume\.pdf"/g,
  'download="Abbas_Dawood_Resume.pdf.pdf"'
);

fs.writeFileSync('src/components/Navbar.tsx', content);
