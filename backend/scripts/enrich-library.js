const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Poet = require('../models/Poet');
const Poem = require('../models/Poem');

async function fetchDeepWiki(wikiName) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${encodeURIComponent(wikiName)}`;
    try {
        const r = await fetch(url);
        if (!r.ok) return null;
        const data = await r.json();
        
        // Find specific sections
        let philosophy = "";
        let works = [];
        
        data.lead.sections.forEach(s => {
          if (s.line && (s.line.toLowerCase().includes('philosophy') || s.line.toLowerCase().includes('style'))) {
            philosophy += s.text;
          }
        });

        if (data.remaining && data.remaining.sections) {
          data.remaining.sections.forEach(s => {
            const line = s.line || "";
            if (line.toLowerCase().includes('philosophy') || line.toLowerCase().includes('thought') || line.toLowerCase().includes('legacy')) {
              philosophy += s.text;
            }
            if (line.toLowerCase().includes('works') || line.toLowerCase().includes('bibliography') || line.toLowerCase().includes('publications')) {
               // Extract list items from HTML
               const items = s.text.match(/<li>(.*?)<\/li>/g);
               if (items) {
                 works = items.map(it => it.replace(/<[^>]*>?/gm, '').trim()).slice(0, 10);
               }
            }
          });
        }

        return {
          philosophy: philosophy.replace(/<[^>]*>?/gm, '').substring(0, 2000),
          works: works
        };
    } catch (e) {
        return null;
    }
}

async function enrich() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const poets = await Poet.find();
        console.log(`Enriching ${poets.length} poets...`);

        for (const p of poets) {
            console.log(`  -> Fetching deep data for: ${p.name}`);
            const deepData = await fetchDeepWiki(p.name);
            if (deepData) {
                p.philosophy = deepData.philosophy || "Legacy and philosophy of this literary giant continue to inspire generations.";
                if (deepData.works && deepData.works.length > 0) {
                   // Create placeholder entries for these works if not already present
                   for (const w of deepData.works) {
                     const exists = await Poem.findOne({ poet: p._id, title: w });
                     if (!exists) {
                       await Poem.create({
                         title: w,
                         text: `This is a placeholder for the legendary work: ${w}. We are currently transcribing the full text.`,
                         poet: p._id,
                         poetName: p.name,
                         category: 'philosophy',
                         form: 'Writing'
                       });
                     }
                   }
                }
                await p.save();
            }
            await new Promise(r => setTimeout(r, 500));
        }
        console.log("Enrichment complete!");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

enrich();
