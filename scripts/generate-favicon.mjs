import { writeFile } from "node:fs/promises";
import sharp from "sharp";

const svg = Buffer.from(`
  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
    <rect width="64" height="64" rx="10" fill="#0B0B0F" />
    <text x="9" y="43" fill="#F5F3FF" font-family="Arial, sans-serif" font-size="31" font-weight="800" letter-spacing="-3">LP</text>
    <circle cx="52" cy="42" r="3.5" fill="#D4AF37" />
  </svg>
`);

const png = await sharp(svg).png().toBuffer();
const ico = Buffer.alloc(22 + png.length);

ico.writeUInt16LE(0, 0);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico[6] = 64;
ico[7] = 64;
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png.length, 14);
ico.writeUInt32LE(22, 18);
png.copy(ico, 22);

await writeFile(new URL("../app/favicon.ico", import.meta.url), ico);
console.log(`Generated app/favicon.ico (${ico.length} bytes).`);
