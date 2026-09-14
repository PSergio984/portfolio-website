import sharp from 'sharp';
import { existsSync } from 'fs';

const inputProfile = 'public/profile.png';
const outputOg = 'public/og-image.png';

if (!existsSync(inputProfile)) {
  console.error(`Missing ${inputProfile}`);
  process.exit(1);
}

// 1200x630 canvas - violet-600 #7c3aed background
const W = 1200;
const H = 630;

// Resize profile to 560x560 cover, keep square, add rounded corners via SVG mask? Use simple square with 24px radius via sharp composite with SVG mask
// Create profile buffer: resize to 560x560, quality
const profileSize = 560;
const profileBuffer = await sharp(inputProfile)
  .resize(profileSize, profileSize, { fit: 'cover', position: 'centre' })
  .png()
  .toBuffer();

// Create text SVG for right side (600x630)
const textSvg = `
<svg width="600" height="630" viewBox="0 0 600 630" xmlns="http://www.w3.org/2000/svg">
  <style>
    .name { font: 700 44px sans-serif; fill: white; }
    .role { font: 600 26px sans-serif; fill: white; }
    .tagline { font: 500 18px sans-serif; fill: rgba(255,255,255,0.92); }
    .url { font: 500 14px monospace; fill: rgba(255,255,255,0.72); letter-spacing: 0.5px; }
    .badge { font: 700 11px sans-serif; fill: #7c3aed; }
  </style>
  <!-- Name -->
  <text x="30" y="190" class="name">Eric Gabriel</text>
  <text x="30" y="240" class="name">Manabat</text>
  <!-- Role -->
  <text x="30" y="285" class="role">Full-Stack AI Engineer</text>
  <!-- Divider -->
  <rect x="30" y="305" width="60" height="3" rx="1.5" fill="white" opacity="0.92"/>
  <!-- Tagline -->
  <text x="30" y="340" class="tagline">Production-ready AI systems</text>
  <text x="30" y="365" class="tagline">4 case studies • Metrics • Architecture</text>
  <!-- URL badge -->
  <rect x="30" y="395" width="320" height="28" rx="14" fill="white" />
  <text x="46" y="414" class="badge">ericmanabat-dev.vercel.app</text>
  <!-- Bottom accent -->
  <text x="30" y="580" class="url">Schedule a technical interview →</text>
</svg>
`;

const textBuffer = Buffer.from(textSvg);

// Create background
const background = await sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: { r: 124, g: 58, b: 237, alpha: 1 }, // violet-600
  },
})
  .png()
  .toBuffer();

// Composite profile (left) + text (right)
// Profile position: x=20, y=35 centered vertically (630-560=70/2=35)
const og = await sharp(background)
  .composite([
    {
      input: profileBuffer,
      top: 35,
      left: 20,
      // Add white border behind profile via SVG rect? Instead just composite profile with 16px white border using extend?
    },
    {
      input: textBuffer,
      top: 0,
      left: 600,
    },
  ])
  .png({ compressionLevel: 9, palette: true, colours: 256, effort: 10 })
  .toFile(outputOg);

console.log(`Generated ${outputOg} (${W}x${H})`);

// Verify size
import { statSync } from 'fs';
const stat = statSync(outputOg);
console.log(`Size: ${stat.size} bytes (${(stat.size / 1024).toFixed(1)} KB)`);
if (stat.size > 300 * 1024) {
  console.warn(
    `WARN: og-image >300KB (${(stat.size / 1024).toFixed(1)}KB), consider webp fallback`,
  );
}

// Also output metadata
const meta = await sharp(outputOg).metadata();
console.log(`Metadata: ${meta.width}x${meta.height} ${meta.format}`);
