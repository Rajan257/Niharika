const existingPoets = require('../backend/data/master-poets.js');
const extraPoets = [
  { wikiSearch: "Surdas", fallbackName: "Surdas", hindi: "सूरदास", category: "classical", tags: ["hindi", "bhakti"], color: "#FBC02D", initials: "सू", speciality: "Sur Sagar" },
  { wikiSearch: "Raidas", fallbackName: "Ravidas", hindi: "संत रविदास", category: "classical", tags: ["hindi", "bhakti"], color: "#8D6E63", initials: "र", speciality: "Bhakti Movement" },
  { wikiSearch: "Sur", fallbackName: "Surendra Sharma", hindi: "सुरेंद्र शर्मा", category: "contemporary", tags: ["hindi", "humour"], color: "#FFEB3B", initials: "सु", speciality: "Hasya Kavita" },
  { wikiSearch: "Adam Lindsay Gordon", fallbackName: "Adam Lindsay Gordon", hindi: "एडम लिंडसे गॉर्डन", category: "classical", tags: ["english", "australian"], color: "#5D4037", initials: "G", speciality: "Bush Ballads" },
  { wikiSearch: "Andrew Barton Paterson", fallbackName: "Banjo Paterson", hindi: "बेंजो पैटरसन", category: "classical", tags: ["english", "australian"], color: "#8D6E63", initials: "P", speciality: "Waltzing Matilda" },
  { wikiSearch: "Henry Lawson", fallbackName: "Henry Lawson", hindi: "हेनरी लॉसन", category: "classical", tags: ["english", "australian"], color: "#A1887F", initials: "L", speciality: "Short Stories and Ballads" },
  { wikiSearch: "A. B. Paterson", fallbackName: "A.B. Paterson", hindi: "ए. बी. पैटरसन", category: "classical", tags: ["english"], color: "#C62828", initials: "P", speciality: "Ballads" },
  { wikiSearch: "Saib Tabrizi", fallbackName: "Saib Tabrizi", hindi: "सइब तबरेज़ी", category: "classical", tags: ["persian", "indian style"], color: "#004D40", initials: "स", speciality: "Sabk-e-Hindi" },
  { wikiSearch: "Bedil", fallbackName: "Abdul-Qader Bedil", hindi: "मिर्ज़ा अब्दुल क़ादिर बेदिल", category: "classical", tags: ["persian", "complex"], color: "#263238", initials: "बे", speciality: "Sabk-e-Hindi" },
  { wikiSearch: "Amir Khusrau", fallbackName: "Amir Khusro", hindi: "अमीर ख़ुसरो", category: "classical", tags: ["persian", "hindavi", "sufi"], color: "#1B5E20", initials: "ख़ु", speciality: "Qawwali, Ghazal" },
  { wikiSearch: "Zauq", fallbackName: "Mohammad Ibrahim Zauq", hindi: "मोहम्मद इब्राहिम ज़ौक़", category: "classical", tags: ["urdu"], color: "#3E2723", initials: "ज़ौ", speciality: "Qasida, Ghazal" },
  { wikiSearch: "Momin Khan Momin", fallbackName: "Momin Khan Momin", hindi: "मोमिन ख़ाँ मोमिन", category: "classical", tags: ["urdu"], color: "#212121", initials: "मो", speciality: "Ghazal" },
  { wikiSearch: "Altaf Hussain Hali", fallbackName: "Altaf Hussain Hali", hindi: "अल्ताफ़ हुसैन हाली", category: "modern", tags: ["urdu", "reformist"], color: "#455A64", initials: "हा", speciality: "Musaddas-e-Hali" },
  { wikiSearch: "Akbar Allahabadi", fallbackName: "Akbar Allahabadi", hindi: "अकबर इलाहाबादी", category: "modern", tags: ["urdu", "satire"], color: "#5D4037", initials: "अ", speciality: "Satirical Poetry" },
  { wikiSearch: "Josh Malihabadi", fallbackName: "Josh Malihabadi", hindi: "जोश मलीहाबादी", category: "modern", tags: ["urdu", "revolutionary"], color: "#B71C1C", initials: "जो", speciality: "Shayar-e-Inqilab" },
  { wikiSearch: "Majaz", fallbackName: "Asrar ul Haq Majaz", hindi: "असरारुल हक़ मजाज़", category: "modern", tags: ["urdu", "romantic", "progressive"], color: "#C2185B", initials: "म", speciality: "Aawara" },
  { wikiSearch: "Ahmad Nadeem Qasmi", fallbackName: "Ahmad Nadeem Qasmi", hindi: "अहमद नदीम क़ासिमी", category: "modern", tags: ["urdu", "progressive"], color: "#2E7D32", initials: "क़ा", speciality: "Ghazal, Nazm" },
  { wikiSearch: "Munir Niazi", fallbackName: "Munir Niazi", hindi: "मुनीर नियाज़ी", category: "contemporary", tags: ["urdu", "punjabi"], color: "#4E342E", initials: "मु", speciality: "Modern Ghazal" },
  { wikiSearch: "Atal Bihari Vajpayee", fallbackName: "Atal Bihari Vajpayee", hindi: "अटल बिहारी वाजपेयी", category: "contemporary", tags: ["hindi", "patriotic"], color: "#FF9800", initials: "अ", speciality: "Meri Ikyavan Kavitayen" },
  { wikiSearch: "Gopal Singh Nepali", fallbackName: "Gopal Singh Nepali", hindi: "गोपाल सिंह नेपाली", category: "modern", tags: ["hindi", "romantic"], color: "#FB8800", initials: "गो", speciality: "Geet" },
  { wikiSearch: "Shivamangal Singh Suman", fallbackName: "Shivamangal Singh Suman", hindi: "शिवमंगल सिंह सुमन", category: "modern", tags: ["hindi", "progressive"], color: "#B71C1C", initials: "शु", speciality: "Mitti Ki Barat" },
  { wikiSearch: "Dushyant Kumar", fallbackName: "Dushyant Kumar", hindi: "दुष्यंत कुमार", category: "modern", tags: ["hindi", "ghazal"], color: "#3E2723", initials: "दु", speciality: "Saye Mein Dhoop" },
  { wikiSearch: "Adam Lindsay Gordon", fallbackName: "Adam Lindsay Gordon", hindi: "एडम लिंडसे गॉर्डन", category: "classical", tags: ["english"], color: "#546E7A", initials: "G", speciality: "Ballads" },
  { wikiSearch: "Robert Stevenson", fallbackName: "Robert Louis Stevenson", hindi: "रॉबर्ट लुईस स्टीवेन्सन", category: "classical", tags: ["english"], color: "#006064", initials: "S", speciality: "A Child's Garden of Verses" },
  { wikiSearch: "Lewis Carroll", fallbackName: "Lewis Carroll", hindi: "लुईस करोल", category: "classical", tags: ["english", "nonsense"], color: "#6A1B9A", initials: "C", speciality: "Jabberwocky" },
  { wikiSearch: "Edward Lear", fallbackName: "Edward Lear", hindi: "एडवर्ड लीयर", category: "classical", tags: ["english", "nonsense"], color: "#AD1457", initials: "L", speciality: "The Owl and the Pussy-cat" },
  { wikiSearch: "Homer", fallbackName: "Homer", hindi: "होमर", category: "classical", tags: ["greek", "epic"], color: "#0D47A1", initials: "H", speciality: "Iliad, Odyssey" },
  { wikiSearch: "Li Bai", fallbackName: "Li Bai", hindi: "ली बाई", category: "classical", tags: ["chinese"], color: "#D50000", initials: "L", speciality: "Drinking Alone" },
  { wikiSearch: "Du Fu", fallbackName: "Du Fu", hindi: "दु फू", category: "classical", tags: ["chinese"], color: "#E64A19", initials: "D", speciality: "Tang Dynasty" },
  { wikiSearch: "Wang Wei", fallbackName: "Wang Wei", hindi: "वांग वेई", category: "classical", tags: ["chinese"], color: "#2E7D32", initials: "W", speciality: "Nature Poetry" }
];

const allPoets = [...existingPoets, ...extraPoets];
const uniquePoets = Array.from(new Map(allPoets.map(item => [item.fallbackName, item])).values());

const finalPoets = uniquePoets.map(p => {
    if (p.poems) return p;
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
