#!/usr/bin/env node

/**
 * Icon Generation Script for Ribble UI
 *
 * This script generates placeholder SVG icons for the PWA.
 * For production, replace these with professionally designed icons.
 *
 * Usage: node scripts/generate-icons.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
const iconsDir = path.join(publicDir, 'icons');
const screenshotsDir = path.join(publicDir, 'screenshots');

// Create directories if they don't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Icon sizes for Android and iOS
const sizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];

// Generate SVG icon template
function generateSVGIcon(size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad${size})"/>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="${size * 0.45}" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">R</text>
</svg>`;
}

// Generate icons
console.log('Generating PWA icons...');
sizes.forEach((size) => {
  const svg = generateSVGIcon(size);
  const filename = `icon-${size}x${size}.png`;

  // For now, we'll create SVG files. In production, convert to PNG using a tool like sharp
  const svgFilename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(iconsDir, svgFilename), svg);
  console.log(`✓ Created ${svgFilename}`);
});

// Generate apple-touch-icon
const appleTouchIcon = generateSVGIcon(180);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), appleTouchIcon);
console.log('✓ Created apple-touch-icon.svg');

// Generate favicon
const favicon = generateSVGIcon(32);
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), favicon);
console.log('✓ Created favicon.svg');

// Generate placeholder screenshots info
const screenshotsReadme = `# Screenshots

Add your application screenshots here for the PWA manifest:

- desktop-1.png (1280x720) - Desktop view
- mobile-1.png (750x1334) - Mobile view

These screenshots will appear in app stores and when users install your PWA.
`;

fs.writeFileSync(path.join(screenshotsDir, 'README.md'), screenshotsReadme);
console.log('✓ Created screenshots README');

console.log('\n✅ Icon generation complete!');
console.log('\nNote: SVG files have been created. For production:');
console.log('1. Convert SVG to PNG using a tool like sharp or imagemagick');
console.log('2. Add actual screenshots to public/screenshots/');
console.log('3. Consider using a professional designer for production icons');
