import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, 'frontend', 'assets');

const urls = [
  { file: 'bachchan.png', url: 'https://upload.wikimedia.org/wikipedia/en/2/27/Harivansh_Rai_Bachchan.jpg' },
  { file: 'mirabai.png', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Meerabai.jpg' },
  { file: 'mahadevi.png', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Mahadevi_Verma.jpg' },
  { file: 'panwar.png', url: 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg' }
];

async function run() {
  for (const item of urls) {
    try {
      const res = await fetch(item.url, {
        headers: { 'User-Agent': 'NiharikaBot/1.0 (rajan@example.com)' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(path.join(assetsDir, item.file), Buffer.from(buffer));
      console.log(`✅ Downloaded: ${item.file}`);
    } catch (err) {
      console.error(`❌ Failed: ${item.file}`, err);
    }
  }
}

run();
