import https from 'https';
import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'frontend', 'assets');

const filesToDownload = [
  { file: 'bachchan.png', url: 'https://upload.wikimedia.org/wikipedia/en/2/27/Harivansh_Rai_Bachchan.jpg' },
  { file: 'mirabai.png', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Meerabai.jpg' },
  { file: 'mahadevi.png', url: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Mahadevi_Verma.jpg' },
  { file: 'pant.png', url: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Sumitranandan_Pant_2015_stamp_of_India.jpg' },
  { file: 'prasad.png', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Prasad_Ji.png' }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      }
    };
    https.get(url, options, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return resolve(download(response.headers.location, dest));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  for (const item of filesToDownload) {
    console.log(`Downloading ${item.file}...`);
    try {
      await download(item.url, path.join(assetsDir, item.file));
      console.log(`✅ Success: ${item.file} downloaded.`);
    } catch (e) {
      console.error(`❌ Error downloading ${item.file}:`, e.message);
    }
  }
}

run();
