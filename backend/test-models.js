require('dotenv').config();
async function run() {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
  const json = await r.json();
  console.log(json.models.map(m => m.name).join(', '));
}
run();
