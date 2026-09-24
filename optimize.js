import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimizeImages() {
  const images = ['hero-portrait.png', 'irfan-portrait-new.png'];
  const srcDir = path.join(process.cwd(), 'src', 'assets');
  
  for (const img of images) {
    const inputPath = path.join(srcDir, img);
    if (!fs.existsSync(inputPath)) continue;
    
    const metadata = await sharp(inputPath).metadata();
    console.log(`Original: ${img}, width: ${metadata.width}, height: ${metadata.height}, format: ${metadata.format}`);

    const baseName = img.replace('.png', '');
    
    // WebP Original Size (Desktop)
    await sharp(inputPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(srcDir, `${baseName}-large.webp`));

    // WebP Medium Size (Tablet - ~800w max)
    if (metadata.width > 800) {
      await sharp(inputPath)
        .resize({ width: 800 })
        .webp({ quality: 80, effort: 6 })
        .toFile(path.join(srcDir, `${baseName}-medium.webp`));
    } else {
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(path.join(srcDir, `${baseName}-medium.webp`));
    }

    // WebP Small Size (Mobile - ~400w max)
    if (metadata.width > 400) {
      await sharp(inputPath)
        .resize({ width: 400 })
        .webp({ quality: 80, effort: 6 })
        .toFile(path.join(srcDir, `${baseName}-small.webp`));
    } else {
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(path.join(srcDir, `${baseName}-small.webp`));
    }

    console.log(`Optimized ${img}`);
  }
}

optimizeImages().catch(console.error);
