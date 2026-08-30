import fs from 'fs';

let content = fs.readFileSync('src/components/Portfolio.tsx', 'utf8');

if (!content.includes("import Leadership from './Leadership';")) {
  content = content.replace(
    /import MunDiplomacy from '\.\/MunDiplomacy';/,
    `import MunDiplomacy from './MunDiplomacy';\nimport Leadership from './Leadership';`
  );
}

if (!content.includes("<Leadership />")) {
  content = content.replace(
    /<MunDiplomacy \/>/,
    `<MunDiplomacy />\n          <Leadership />`
  );
}

fs.writeFileSync('src/components/Portfolio.tsx', content);
