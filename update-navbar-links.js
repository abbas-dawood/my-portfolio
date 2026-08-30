import fs from 'fs';

let content = fs.readFileSync('src/components/Navbar.tsx', 'utf8');

// Update desktop link
content = content.replace(
  /<a\s+href="\/Abbas_Dawood_Resume\.pdf"\s+download="Abbas_Dawood_Resume\.pdf"\s+onClick=\{playClickSound\}\s+onMouseEnter=\{playHoverSound\}\s+className="font-mono text-\[10px\] uppercase tracking-\[0\.2em\] text-black bg-cyan-500 hover:bg-white px-4 py-2 rounded-sm transition-colors ml-2"\s*>\s*CV\s*<\/a>/,
  `<a
            href="/Abbas_Dawood_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-black bg-cyan-500 hover:bg-white px-4 py-2 rounded-sm transition-colors ml-2"
          >
            VIEW CV
          </a>
          <a
            href="/Abbas_Dawood_Resume.pdf"
            download
            onClick={playClickSound}
            onMouseEnter={playHoverSound}
            className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-500 border border-cyan-500 hover:bg-cyan-500/10 px-4 py-2 rounded-sm transition-colors ml-2"
          >
            DOWNLOAD
          </a>`
);

// Update mobile link
content = content.replace(
  /<a\s+href="\/Abbas_Dawood_Resume\.pdf"\s+download="Abbas_Dawood_Resume\.pdf"\s+onClick=\{\(\) => \{ playClickSound\(\); setMobileMenuOpen\(false\); \}\}\s+className="font-mono text-xs uppercase tracking-\[0\.2em\] text-black bg-cyan-500 hover:bg-white text-center py-3 rounded-sm transition-colors mt-2"\s*>\s*DOWNLOAD CV\s*<\/a>/,
  `<a
                href="/Abbas_Dawood_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { playClickSound(); setMobileMenuOpen(false); }}
                className="font-mono text-xs uppercase tracking-[0.2em] text-black bg-cyan-500 hover:bg-white text-center py-3 rounded-sm transition-colors mt-2"
              >
                VIEW CV
              </a>
              <a
                href="/Abbas_Dawood_Resume.pdf"
                download
                onClick={() => { playClickSound(); setMobileMenuOpen(false); }}
                className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-500 border border-cyan-500 hover:bg-cyan-500/10 text-center py-3 rounded-sm transition-colors mt-2"
              >
                DOWNLOAD CV
              </a>`
);

fs.writeFileSync('src/components/Navbar.tsx', content);
