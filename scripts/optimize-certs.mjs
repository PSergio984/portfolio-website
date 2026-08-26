import sharp from 'sharp';
import { mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const srcDir = String.raw`D:\3-5 2ND SEM\OJT\certs`;
const outDir = 'public/assets/certificates';
mkdirSync(outDir, { recursive: true });
mkdirSync('public/assets/cohorts', { recursive: true });

const tasks = [
  // Real certificates -> public/assets/certificates (optimized webp, max 1200px)
  { src: join(srcDir, 'Devkada-Eric Gabriel F. Manabat.jpg'), out: join(outDir, 'devkada-your-cloud-your-agent.webp') },
  { src: join(srcDir, 'gcp.png'), out: join('public/assets/cohorts', 'google-cloud-arcade-enrollment.webp') },
  { src: join(srcDir, 'dep.png'), out: join('public/assets/cohorts', 'datacamp-dep-scholar.webp') },
  // Event photos -> cohorts (optional, as community evidence, smaller)
  // 1.png and gcp.png are already handled; 2-6.png are event photos - compress to 800px for optional gallery use
  { src: join(srcDir, '1.png'), out: join('public/assets/cohorts', 'aws-event-1.webp') },
  { src: join(srcDir, '2.png'), out: join('public/assets/cohorts', 'build-nights-group.webp') },
  { src: join(srcDir, '6.png'), out: join('public/assets/cohorts', 'aws-day-one.webp') },
];

for (const { src, out } of tasks) {
  if (!existsSync(src)) { console.log(`SKIP missing ${src}`); continue; }
  const isCert = out.includes('certificates');
  const resizeWidth = isCert ? 1200 : 800;
  await sharp(src)
    .resize({ width: resizeWidth, withoutEnlargement: true })
    .webp({ quality: isCert ? 82 : 78 })
    .toFile(out);
  console.log(`OK ${out}`);
}

// Handle PDFs: copy Snowflake cert PDF to public for direct viewing (don't rasterize - keep vector)
import { copyFileSync } from 'fs';
const snowSrc = join(srcDir, '00QVI00000k0ekX2AQ-SNOWFLAKE_DISCOVER_AI-06-10072026.pdf');
if (existsSync(snowSrc)) {
  copyFileSync(snowSrc, join(outDir, 'snowflake-discover-ai.pdf'));
  console.log('OK snowflake pdf copied');
}
