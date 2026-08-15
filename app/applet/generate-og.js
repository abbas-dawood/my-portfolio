const { createCanvas } = require('canvas');
const fs = require('fs');

const width = 1200;
const height = 630;

const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Draw background (dark elegant)
ctx.fillStyle = '#020617';
ctx.fillRect(0, 0, width, height);

// Draw some subtle grid/accent
ctx.strokeStyle = '#0f172a';
ctx.lineWidth = 2;
for(let i=0; i<width; i+=40) {
  ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
}
for(let i=0; i<height; i+=40) {
  ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
}

ctx.fillStyle = '#06b6d4';
ctx.font = 'bold 80px "Inter", sans-serif';
ctx.fillText('Abbas Dawood', 100, 300);

ctx.fillStyle = '#cbd5e1';
ctx.font = '40px "JetBrains Mono", sans-serif';
ctx.fillText('Pilot & Software Developer', 100, 380);

ctx.fillStyle = '#06b6d4';
ctx.fillRect(100, 420, 150, 4);

const buffer = canvas.toBuffer('image/jpeg', { quality: 0.95 });
fs.writeFileSync('public/og-image.jpg', buffer);
console.log('Successfully generated public/og-image.jpg');
