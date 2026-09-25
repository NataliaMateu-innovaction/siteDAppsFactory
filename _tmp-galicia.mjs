import sharp from 'sharp';
const { data, info } = await sharp('src/assets/servicios/galicia.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let y = 0; y < 234; y++) for (let x = 540; x < info.width; x++) data[(y * info.width + x) * 4 + 3] = 0;
const buf = await sharp(data, { raw: info }).png().toBuffer();
await sharp(buf).trim().png({ compressionLevel: 9 }).toFile('C:/Users/Admin/AppData/Local/Temp/claude/E--NATALIA-DAppsFactory-WEB-DAPPS-2026-DAppsFactory-claude/888aba3e-0cd3-40da-b5a7-fa9a904fc798/scratchpad/qa/galicia-sin-texto.png');
const m = await sharp('C:/Users/Admin/AppData/Local/Temp/claude/E--NATALIA-DAppsFactory-WEB-DAPPS-2026-DAppsFactory-claude/888aba3e-0cd3-40da-b5a7-fa9a904fc798/scratchpad/qa/galicia-sin-texto.png').metadata();
console.log('quedo en', m.width + 'x' + m.height);
