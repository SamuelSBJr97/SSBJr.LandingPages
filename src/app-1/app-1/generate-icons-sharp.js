const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const svgPath = path.join(__dirname, 'public', 'icons', 'icon.svg');
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  
  if (!fs.existsSync(svgPath)) {
    console.error('SVG file not found:', svgPath);
    return;
  }

  try {
    for (const size of sizes) {
      const outputPath = path.join(__dirname, 'public', 'icons', `icon-${size}x${size}.png`);
      
      await sharp(svgPath)
        .resize(size, size)
        .png()
        .toFile(outputPath);
      
      console.log(`Generated icon-${size}x${size}.png`);
    }
    
    // Gerar favicon também
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon-32x32.png'));
    
    await sharp(svgPath)
      .resize(16, 16)
      .png()
      .toFile(path.join(__dirname, 'public', 'favicon-16x16.png'));
    
    console.log('All icons generated successfully!');
    
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons();