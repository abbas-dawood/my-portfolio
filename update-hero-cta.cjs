const fs = require('fs');
let html = fs.readFileSync('src/components/Hero.tsx', 'utf8');

html = html.replace(
  /<button \s*onClick=\{\(\) => handleScroll\('about'\)\}\s*className="group relative px-6 py-3 bg-cyan-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-sm flex items-center gap-2"\s*>\s*Explore My Journey\s*<Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" \/>\s*<\/button>/g,
  `<a 
              href="/Abbas_Dawood_Resume.pdf"
              target="_blank"
              onClick={playClickSound}
              className="group relative px-6 py-3 bg-cyan-500 text-black font-bold tracking-widest uppercase text-xs hover:bg-white transition-all rounded-sm flex items-center gap-2"
            >
              View CV
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
            </a>`
);

fs.writeFileSync('src/components/Hero.tsx', html);
