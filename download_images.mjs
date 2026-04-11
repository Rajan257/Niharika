import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, 'frontend', 'assets');

const poets = [
  { file: 'kabir.png', title: 'Kabir' },
  { file: 'bachchan.png', title: 'Harivansh Rai Bachchan' },
  { file: 'mirabai.png', title: 'Mirabai' },
  { file: 'dinkar.png', title: 'Ramdhari Singh Dinkar' },
  { file: 'gulzar.png', title: 'Gulzar' },
  { file: 'mahadevi.png', title: 'Mahadevi Varma' },
  { file: 'pant.png', title: 'Sumitranandan Pant' },
  { file: 'rahim.png', title: 'Abdul Rahim Khan-i-Khanan' },
  { file: 'nirala.png', title: 'Suryakant Tripathi' },
  { file: 'prasad.png', title: 'Jaishankar Prasad' },
  { file: 'panwar.png', title: 'Hariom Panwar' }
];

async function getWikiImage(title) {
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles=${encodeURIComponent(title)}`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') return null;
    return pages[pageId]?.original?.source || null;
  } catch (err) {
    console.error(`Error querying Wikipedia for ${title}:`, err);
    return null;
  }
}

async function downloadImage(url, filename) {
  try {
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(path.join(assetsDir, filename), Buffer.from(buffer));
    console.log(`✅ Downloaded: ${filename} from ${url}`);
  } catch (err) {
    console.error(`❌ Failed to download ${filename} from ${url}`, err);
  }
}

async function run() {
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

  for (const poet of poets) {
    console.log(`🔍 Searching for ${poet.title}...`);
    const imgUrl = await getWikiImage(poet.title);
    if (imgUrl) {
      await downloadImage(imgUrl, poet.file);
    } else {
      console.log(`⚠️ No image found on Wikipedia for ${poet.title}, falling back to placeholder logic or keeping old image.`);
    }
  }
}

run();
