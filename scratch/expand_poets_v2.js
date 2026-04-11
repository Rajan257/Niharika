const corePoets = [
  { wikiSearch: "Faiz Ahmad Faiz", fallbackName: "Faiz Ahmed Faiz", hindi: "फ़ैज़ अहमद फ़ैज़", category: "modern", tags: ["urdu", "progressive", "revolutionary"], color: "#8B0000", initials: "फ़ै", speciality: "Nazm, Ghazal" },
  { wikiSearch: "Sahir Ludhianvi", fallbackName: "Sahir Ludhianvi", hindi: "साहिर लुधियानवी", category: "modern", tags: ["urdu", "progressive", "film"], color: "#1A237E", initials: "सा", speciality: "Romantic & Revolutionary Poetry" },
  { wikiSearch: "Tulsidas", fallbackName: "Tulsidas", hindi: "तुलसीदास", category: "classical", tags: ["hindi", "bhakti", "awadhi"], color: "#7B3F00", initials: "तु", speciality: "Chaupai, Ramcharitmanas" },
  { wikiSearch: "John Keats", fallbackName: "John Keats", hindi: "जॉन कीट्स", category: "classical", tags: ["english", "romantic", "ode"], color: "#004D40", initials: "J", speciality: "Ode, Sonnet" },
  { wikiSearch: "Amrita Pritam", fallbackName: "Amrita Pritam", hindi: "अमृता प्रीतम", category: "modern", tags: ["punjabi", "hindi", "feminist"], color: "#880E4F", initials: "अ", speciality: "Feminist Poetry, Partition" },
  { wikiSearch: "Rabindranath Tagore", fallbackName: "Rabindranath Tagore", hindi: "रवीन्द्रनाथ टैगोर", category: "modern", tags: ["bengali", "nobel", "nature"], color: "#E65100", initials: "र", speciality: "Gitanjali, Prose Poetry" },
  { wikiSearch: "Pablo Neruda", fallbackName: "Pablo Neruda", hindi: "पाब्लो नेरुदा", category: "contemporary", tags: ["spanish", "nobel", "surrealist"], color: "#1B5E20", initials: "P", speciality: "Love Poems, Odes" },
  { wikiSearch: "Muhammad Iqbal", fallbackName: "Muhammad Iqbal", hindi: "अल्लामा इक़बाल", category: "modern", tags: ["urdu", "persian", "philosophical"], color: "#4E342E", initials: "इ", speciality: "Nazm, Tarana" },
  { wikiSearch: "Robert Frost", fallbackName: "Robert Frost", hindi: "रॉबर्ट फ़्रॉस्ट", category: "modern", tags: ["english", "american", "nature"], color: "#37474F", initials: "R", speciality: "Rural Themes, Blank Verse" },
  { wikiSearch: "Parveen Shakir", fallbackName: "Parveen Shakir", hindi: "परवीन शाकिर", category: "contemporary", tags: ["urdu", "feminist"], color: "#AD1457", initials: "प", speciality: "Ghazal, Free Verse" },
  { wikiSearch: "Suryakant Tripathi Nirala", fallbackName: "Nirala", hindi: "सूर्यकान्त त्रिपाठी 'निराला'", category: "modern", tags: ["hindi", "chhayawad"], color: "#bf360c", initials: "नि", speciality: "Mukt Chhand, Nature" },
  { wikiSearch: "Matsuo Basho", fallbackName: "Matsuo Basho", hindi: "मात्सुओ बाशो", category: "classical", tags: ["japanese", "haiku", "nature"], color: "#2E3B32", initials: "B", speciality: "Haiku" },
  { wikiSearch: "Dushyant Kumar", fallbackName: "Dushyant Kumar", hindi: "दुष्यंत कुमार", category: "modern", tags: ["hindi", "ghazal", "political"], color: "#4E342E", initials: "दु", speciality: "Political Ghazal" },
  { wikiSearch: "Sarojini Naidu", fallbackName: "Sarojini Naidu", hindi: "सरोजिनी नायडू", category: "modern", tags: ["english", "indian", "nature"], color: "#FF8F00", initials: "S", speciality: "Lyric Poetry" },
  { wikiSearch: "Nida Fazli", fallbackName: "Nida Fazli", hindi: "निदा फ़ाज़ली", category: "contemporary", tags: ["urdu", "hindi", "secular"], color: "#616161", initials: "नि", speciality: "Doha, Ghazal" },
  { wikiSearch: "Mirza Ghalib", fallbackName: "Mirza Ghalib", hindi: "मिर्ज़ा ग़ालिब", category: "classical", tags: ["urdu", "persian", "philosophical"], color: "#3E2723", initials: "ग़ा", speciality: "Ghazal, Rubai" },
  { wikiSearch: "Kahlil Gibran", fallbackName: "Khalil Gibran", hindi: "खलील जिब्रान", category: "contemporary", tags: ["english", "arabic", "philosophical"], color: "#006064", initials: "ख", speciality: "The Prophet, Prose Poetry" },
  { wikiSearch: "Jaun Elia", fallbackName: "Jaun Elia", hindi: "जौन एलिया", category: "contemporary", tags: ["urdu", "nihilism", "anarchist"], color: "#212121", initials: "जौ", speciality: "Ghazal, Nazm" },
  { wikiSearch: "Mahadevi Varma", fallbackName: "Mahadevi Verma", hindi: "महादेवी वर्मा", category: "modern", tags: ["hindi", "chhayawad", "mysticism"], color: "#4A148C", initials: "म", speciality: "Mysticism, Lyrical Poetry" },
  { wikiSearch: "Kabir", fallbackName: "Kabir Das", hindi: "कबीर दास", category: "classical", tags: ["hindi", "bhakti", "secular"], color: "#E65100", initials: "क", speciality: "Doha, Sabad" },
  { wikiSearch: "William Shakespeare", fallbackName: "William Shakespeare", hindi: "विलियम शेक्सपियर", category: "classical", tags: ["english", "sonnet", "drama"], color: "#1B5E20", initials: "S", speciality: "Sonnet, Blank Verse" },
  { wikiSearch: "Emily Dickinson", fallbackName: "Emily Dickinson", hindi: "एमिली डिकिंसन", category: "classical", tags: ["english", "american", "lyrical"], color: "#F06292", initials: "E", speciality: "Lyrical Poetry" },
  { wikiSearch: "Rumi", fallbackName: "Rumi", hindi: "रूमी", category: "classical", tags: ["persian", "sufi", "love"], color: "#FF6D00", initials: "र", speciality: "Masnavi, Ghazal" },
  { wikiSearch: "Walt Whitman", fallbackName: "Walt Whitman", hindi: "वॉल्ट व्हिटमैन", category: "modern", tags: ["english", "american", "free verse"], color: "#2E7D32", initials: "W", speciality: "Leaves of Grass, Free Verse" },
  { wikiSearch: "William Wordsworth", fallbackName: "William Wordsworth", hindi: "विलियम वर्ड्सवर्थ", category: "classical", tags: ["english", "romantic", "nature"], color: "#388E3C", initials: "W", speciality: "Romantic Poetry" },
  { wikiSearch: "Sylvia Plath", fallbackName: "Sylvia Plath", hindi: "सिल्विया प्लाथ", category: "contemporary", tags: ["english", "confessional", "dark"], color: "#424242", initials: "P", speciality: "Confessional Poetry" },
  { wikiSearch: "Maya Angelou", fallbackName: "Maya Angelou", hindi: "माया एंजेलो", category: "contemporary", tags: ["english", "african-american", "activist"], color: "#D84315", initials: "A", speciality: "Autobiographical Poetry" },
  { wikiSearch: "Langston Hughes", fallbackName: "Langston Hughes", hindi: "लैंगस्टन ह्यूजेस", category: "modern", tags: ["english", "jazz poetry", "activist"], color: "#3F51B5", initials: "H", speciality: "Jazz Poetry" },
  { wikiSearch: "Li Bai", fallbackName: "Li Bai", hindi: "ली बाई", category: "classical", tags: ["chinese", "tang dynasty", "nature"], color: "#D50000", initials: "L", speciality: "Tang Poetry" },
  { wikiSearch: "Agha Shahid Ali", fallbackName: "Agha Shahid Ali", hindi: "आगा शाहिद अली", category: "contemporary", tags: ["english", "ghazal", "exile"], color: "#4527A0", initials: "A", speciality: "English Ghazal" },
  { wikiSearch: "Rahat Indori", fallbackName: "Rahat Indori", hindi: "राहत इंदौरी", category: "contemporary", tags: ["urdu", "mushaira", "bold"], color: "#E91E63", initials: "रा", speciality: "Mushaira, Ghazal" },
  { wikiSearch: "Bashir Badr", fallbackName: "Bashir Badr", hindi: "बशीर बद्र", category: "contemporary", tags: ["urdu", "romantic", "soft"], color: "#FF9800", initials: "ब", speciality: "Romance, Ghazal" },
  { wikiSearch: "Oscar Wilde", fallbackName: "Oscar Wilde", hindi: "ऑस्कर वाइल्ड", category: "classical", tags: ["english", "wit", "aestheticism"], color: "#6A1B9A", initials: "W", speciality: "Wit, Lyrical Ballads" },
  { wikiSearch: "Edgar Allan Poe", fallbackName: "Edgar Allan Poe", hindi: "एडगर एलन पो", category: "classical", tags: ["english", "gothic", "macabre"], color: "#212121", initials: "P", speciality: "Gothic Poetry" },
  { wikiSearch: "Kumar Vishwas", fallbackName: "Kumar Vishwas", hindi: "कुमार विश्वास", category: "contemporary", tags: ["hindi", "romantic", "mushaira"], color: "#FB8C00", initials: "कु", speciality: "Lyrical Romance" },
  { wikiSearch: "Surdas", fallbackName: "Surdas", hindi: "सूरदास", category: "classical", tags: ["hindi", "bhakti", "braj"], color: "#FBC02D", initials: "सू", speciality: "Sur Sagar, Bhakti" },
  { wikiSearch: "Hafez", fallbackName: "Hafez", hindi: "हाफ़िज़", category: "classical", tags: ["persian", "sufi", "ghazal"], color: "#00897B", initials: "ह", speciality: "Divan-e-Hafez" },
  { wikiSearch: "Omar Khayyam", fallbackName: "Omar Khayyam", hindi: "उमर ख़य्याम", category: "classical", tags: ["persian", "philosophical", "rubai"], color: "#795548", initials: "उ", speciality: "Rubaiyat" },
  { wikiSearch: "Saadi Shirazi", fallbackName: "Saadi Shirazi", hindi: "सादी शीराज़ी", category: "classical", tags: ["persian", "wisdom", "didactic"], color: "#5D4037", initials: "सा", speciality: "Gulistan, Bostan" },
  { wikiSearch: "Ferdowsi", fallbackName: "Ferdowsi", hindi: "फ़िरदौसी", category: "classical", tags: ["persian", "epic", "history"], color: "#D32F2F", initials: "फ़ि", speciality: "Shahnameh" },
  { wikiSearch: "T. S. Eliot", fallbackName: "T.S. Eliot", hindi: "टी. एस. इलियट", category: "modern", tags: ["english", "modernist"], color: "#37474F", initials: "E", speciality: "The Waste Land" },
  { wikiSearch: "W. B. Yeats", fallbackName: "W.B. Yeats", hindi: "डब्ल्यू. बी. यीट्स", category: "modern", tags: ["english", "irish", "symbolist"], color: "#2E7D32", initials: "Y", speciality: "The Second Coming" },
  { wikiSearch: "Dante Alighieri", fallbackName: "Dante", hindi: "दांते एलीगियरी", category: "classical", tags: ["italian", "epic", "spiritual"], color: "#B71C1C", initials: "D", speciality: "Divine Comedy" },
  { wikiSearch: "Alexander Pushkin", fallbackName: "Alexander Pushkin", hindi: "अलेक्जेंडर पुश्किन", category: "classical", tags: ["russian", "romantic"], color: "#1A237E", initials: "P", speciality: "Eugene Onegin" },
  { wikiSearch: "Johann Wolfgang von Goethe", fallbackName: "Goethe", hindi: "गेटे", category: "classical", tags: ["german", "philosophical"], color: "#311B92", initials: "G", speciality: "Faust" },
  { wikiSearch: "Rainer Maria Rilke", fallbackName: "Rilke", hindi: "रिल्के", category: "modern", tags: ["german", "existential"], color: "#455A64", initials: "R", speciality: "Duino Elegies" },
  { wikiSearch: "Bashir Badr", fallbackName: "Bashir Badr", hindi: "बशीर बद्र", category: "contemporary", tags: ["urdu", "romantic"], color: "#FF9800", initials: "ब", speciality: "Soft Ghazals" },
  { wikiSearch: "Ahmad Faraz", fallbackName: "Ahmad Faraz", hindi: "अहमद फ़राज़", category: "contemporary", tags: ["urdu", "romantic", "progressive"], color: "#C2185B", initials: "फ़", speciality: "Ghazal" },
  { wikiSearch: "Firaq Gorakhpuri", fallbackName: "Firaq Gorakhpuri", hindi: "फ़िराक़ गोरखपुरी", category: "modern", tags: ["urdu", "hindi", "sonnet"], color: "#5D4037", initials: "फ़ि", speciality: "Rubaiyat, Ghazal" },
  { wikiSearch: "Javed Akhtar", fallbackName: "Javed Akhtar", hindi: "जावेद अख़्तर", category: "contemporary", tags: ["urdu", "hindi", "film"], color: "#1565C0", initials: "जा", speciality: "Nazm, Lyrics" },
  { wikiSearch: "Kaifi Azmi", fallbackName: "Kaifi Azmi", hindi: "कैफ़ी आज़मी", category: "modern", tags: ["urdu", "progressive", "film"], color: "#2E7D32", initials: "कै", speciality: "Revolutionary Nazm" },
  { wikiSearch: "Nissim Ezekiel", fallbackName: "Nissim Ezekiel", hindi: "निसिम एज़ेकील", category: "modern", tags: ["english", "indian", "irony"], color: "#455A64", initials: "E", speciality: "Night of the Scorpion" },
  { wikiSearch: "Kamala Das", fallbackName: "Kamala Das", hindi: "कमला दास", category: "contemporary", tags: ["english", "malayalam", "confessional"], color: "#E91E63", initials: "K", speciality: "My Story, Lyrical" },
  { wikiSearch: "Subramania Bharati", fallbackName: "Subramania Bharati", hindi: "सुब्रमण्य भारती", category: "modern", tags: ["tamil", "patriotic", "social"], color: "#E65100", initials: "भा", speciality: "Panchali Sapatham" },
  { wikiSearch: "Mir Taqi Mir", fallbackName: "Mir Taqi Mir", hindi: "मीर तक़ी मीर", category: "classical", tags: ["urdu", "ghazal", "sadness"], color: "#3E2723", initials: "मी", speciality: "Ghazal-e-Mir" },
  { wikiSearch: "Surdas", fallbackName: "Surdas", hindi: "सूरदास", category: "classical", tags: ["hindi", "bhakti"], color: "#FFB300", initials: "सू", speciality: "Vatsalya Ras" },
  { wikiSearch: "Raskhan", fallbackName: "Raskhan", hindi: "रसखान", category: "classical", tags: ["hindi", "bhakti", "muslim-krishna"], color: "#F4511E", initials: "र", speciality: "Saviya" },
  { wikiSearch: "Lord Byron", fallbackName: "Lord Byron", hindi: "लॉर्ड बायरन", category: "classical", tags: ["english", "romantic", "satire"], color: "#006064", initials: "B", speciality: "Don Juan" },
  { wikiSearch: "Percy Bysshe Shelley", fallbackName: "P.B. Shelley", hindi: "पी. बी. शैली", category: "classical", tags: ["english", "romantic", "revolutionary"], color: "#0277BD", initials: "S", speciality: "Ozymandias" },
  { wikiSearch: "Christina Rossetti", fallbackName: "Christina Rossetti", hindi: "क्रिस्टीना रोसेटी", category: "classical", tags: ["english", "lyrical", "spiritual"], color: "#AD1457", initials: "R", speciality: "Goblin Market" },
  { wikiSearch: "Emily Brontë", fallbackName: "Emily Bronte", hindi: "एमिली ब्रोंटे", category: "classical", tags: ["english", "mystical"], color: "#4E342E", initials: "B", speciality: "Remembrance" },
  { wikiSearch: "Charles Bukowski", fallbackName: "Charles Bukowski", hindi: "चार्ल्स बुकोवस्की", category: "contemporary", tags: ["english", "dirty realism"], color: "#212121", initials: "B", speciality: "Bluebird" },
  { wikiSearch: "Leonard Cohen", fallbackName: "Leonard Cohen", hindi: "लियोनार्ड कोहेन", category: "contemporary", tags: ["english", "songwriter", "spiritual"], color: "#37474F", initials: "C", speciality: "Hallelujah" },
  { wikiSearch: "Bob Dylan", fallbackName: "Bob Dylan", hindi: "बॉब डिलन", category: "contemporary", tags: ["english", "nobel", "folk"], color: "#1976D2", initials: "D", speciality: "Blowin' in the Wind" },
  { wikiSearch: "Jim Morrison", fallbackName: "Jim Morrison", hindi: "जिम मॉरिसन", category: "contemporary", tags: ["english", "rock", "shamanic"], color: "#000000", initials: "M", speciality: "The Lords and The New Creatures" },
  { wikiSearch: "Mary Oliver", fallbackName: "Mary Oliver", hindi: "मेरी ओलिवर", category: "contemporary", tags: ["english", "nature", "spiritual"], color: "#4CAF50", initials: "O", speciality: "Wild Geese" },
  { wikiSearch: "Billy Collins", fallbackName: "Billy Collins", hindi: "बिली कोलिन्स", category: "contemporary", tags: ["english", "humorous", "accessible"], color: "#0097A7", initials: "C", speciality: "Lanyard" },
  { wikiSearch: "Rupi Kaur", fallbackName: "Rupi Kaur", hindi: "रुपी कौर", category: "contemporary", tags: ["english", "instapoetry", "feminist"], color: "#F06292", initials: "K", speciality: "Milk and Honey" },
  { wikiSearch: "Ocean Vuong", fallbackName: "Ocean Vuong", hindi: "ओशन वुओंग", category: "contemporary", tags: ["english", "immigrant", "lyrical"], color: "#0D47A1", initials: "V", speciality: "Night Sky with Exit Wounds" },
  { wikiSearch: "Amanda Gorman", fallbackName: "Amanda Gorman", hindi: "अमांड गोर्मन", category: "contemporary", tags: ["english", "youth", "political"], color: "#FFD600", initials: "G", speciality: "The Hill We Climb" },
  { wikiSearch: "Ted Hughes", fallbackName: "Ted Hughes", hindi: "टेड ह्यूज", category: "contemporary", tags: ["english", "nature", "animal"], color: "#3E2723", initials: "H", speciality: "Hawk Roosting" },
  { wikiSearch: "Philip Larkin", fallbackName: "Philip Larkin", hindi: "फिलिप लार्किन", category: "contemporary", tags: ["english", "melancholy"], color: "#546E7A", initials: "L", speciality: "This Be The Verse" },
  { wikiSearch: "Seamus Heaney", fallbackName: "Seamus Heaney", hindi: "सीमस हीनी", category: "contemporary", tags: ["english", "irish", "earthy"], color: "#33691E", initials: "H", speciality: "Digging" },
  { wikiSearch: "Derek Walcott", fallbackName: "Derek Walcott", hindi: "डेरेक वॉलकोट", category: "contemporary", tags: ["english", "caribbean", "post-colonial"], color: "#01579B", initials: "W", speciality: "Omeros" },
  { wikiSearch: "E. E. Cummings", fallbackName: "E.E. Cummings", hindi: "ई. ई. कमिंग्स", category: "modern", tags: ["english", "experimental"], color: "#880E4F", initials: "C", speciality: "i carry your heart with me" },
  { wikiSearch: "Ezra Pound", fallbackName: "Ezra Pound", hindi: "एज़रा पाउंड", category: "modern", tags: ["english", "imagist", "complex"], color: "#263238", initials: "P", speciality: "The Cantos" },
  { wikiSearch: "Allen Ginsberg", fallbackName: "Allen Ginsberg", hindi: "एलन गिन्सबर्ग", category: "contemporary", tags: ["english", "beat", "counter-culture"], color: "#BF360C", initials: "G", speciality: "Howl" },
  { wikiSearch: "Wallace Stevens", fallbackName: "Wallace Stevens", hindi: "वालेस स्टीवंस", category: "modern", tags: ["english", "philosophical"], color: "#004D40", initials: "S", speciality: "Thirteen Ways of Looking at a Blackbird" },
  { wikiSearch: "Mary Oliver", fallbackName: "Mary Oliver", hindi: "मेरी ओलिवर", category: "contemporary", tags: ["english", "nature"], color: "#2E7D32", initials: "O", speciality: "Wild Geese" }
];

// Deduplicate by name
const uniquePoets = Array.from(new Map(corePoets.map(item => [item.fallbackName, item])).values());

// Add poems to each poet (generic or specific if known)
const finalPoets = uniquePoets.map(p => {
    if (p.poems) return p; // Keep existing poems
    return {
        ...p,
        poems: [
            { title: "Selected Verse", text: "Selected lines from their legendary work...\nExploring the depths of human experience.", form: "Verse", category: "philosophical", isHindi: false }
        ]
    };
});

const fs = require('fs');
fs.writeFileSync('backend/data/master-poets.js', 'module.exports = ' + JSON.stringify(finalPoets, null, 2) + ';');
console.log(`Master poets list expanded to ${finalPoets.length} legends.`);
