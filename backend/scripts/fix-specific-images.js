const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Poet = require('../models/Poet');

const updates = [
  { name: 'Mirza Ghalib', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Ghalib_portrait.jpg' },
  { name: 'Mahadevi Verma', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Mahadevi_Verma.jpg' },
  { name: 'Jaun Elia', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Jaun_Eliya_Stamp.jpg' },
  { name: 'Khalil Gibran', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Kahlil_Gibran_1913.jpg' }
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
    console.log("Connected to MongoDB for image corrections.");
    for (const u of updates) {
        const res = await Poet.updateOne(
            { name: { $regex: new RegExp(u.name, 'i') } }, 
            { $set: { image: u.image } }
        );
        console.log(`Updated ${u.name}: matched ${res.matchedCount}, modified ${res.modifiedCount}`);
    }
    console.log("Image corrections complete.");
    process.exit(0);
}).catch(err => {
    console.error("Failed to connect or update:", err);
    process.exit(1);
});
