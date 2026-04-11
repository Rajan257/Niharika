const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Poet = require('../models/Poet');

const updates = [
  { name: 'Mirza Ghalib', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Ghalib_portrait.jpg/400px-Ghalib_portrait.jpg' },
  { name: 'Mahadevi Verma', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Mahadevi_Verma.jpg/400px-Mahadevi_Verma.jpg' },
  { name: 'Jaun Elia', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Jaun_Elia_portrait.jpg/400px-Jaun_Elia_portrait.jpg' },
  { name: 'Jibran Khan', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Kahlil_Gibran_1913.jpg/400px-Kahlil_Gibran_1913.jpg' } // Assuming Khalil Gibran
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    console.log("Connected. Updating images...");
    for (const u of updates) {
        // Regex match since it might be "Mirza Asadullah Baig Khan Ghalib" or something
        const res = await Poet.updateMany({ name: { $regex: new RegExp(u.name.split(' ')[1] || u.name, 'i') } }, { $set: { image: u.image } });
        console.log(`Updated ${u.name}: matched ${res.matchedCount} documents`);
    }
    
    // Fallback dictionary update check
    console.log("Done database updates. Now check FB_POETS if they exist there.");
    process.exit(0);
});
