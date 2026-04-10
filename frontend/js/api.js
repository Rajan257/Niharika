// frontend/js/api.js - Niharika API Client

const API = 'https://niharika-298h.onrender.com/api';

async function apiGet(path) {
  try {
    const r = await fetch(API + path);
    if (!r.ok) throw new Error(r.status);
    return await r.json();
  } catch { return null; }
}

async function apiPost(path, body) {
  try {
    const r = await fetch(API + path, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) });
    return await r.json();
  } catch { return null; }
}

// Named API calls
const NiharikaAPI = {
  getPoets:     (cat) => apiGet(`/poets${cat&&cat!=='all'?`?category=${cat}`:''}`),
  getPoet:      (id)  => apiGet(`/poets/${id}`),
  getPoems:     (q)   => apiGet(`/poems${q?'?'+q:''}`),
  likePoem:     (id)  => apiPost(`/poems/${id}/like`, {}),
  getQuotes:    (f)   => apiGet(`/quotes${f?'?founder=true':''}`),
  getDailyQuote:()    => apiGet('/quotes/daily'),
  getRandomQuote:(f)  => apiGet(`/quotes/random${f?'?founder=true':''}`),
  getDictAll:   ()    => apiGet('/dictionary'),
  lookupWord:   (w)   => apiGet(`/dictionary/${encodeURIComponent(w.toLowerCase())}`),
  getVideos:    ()    => apiGet('/videos'),
  getCategories:()    => apiGet('/categories'),
  getBlog:      (l)   => apiGet(`/blog${l?'?limit='+l:''}`),
  getQuiz:      ()    => apiGet('/quiz'),
  search:       (q)   => apiGet(`/search?q=${encodeURIComponent(q)}`),
  getFounder:   ()    => apiGet('/founder'),
  subscribe:    (e)   => apiPost('/subscribe', { email:e }),
  chat:         (msg) => apiPost('/chatbot/message', { message:msg }),
};

// ── Fallback data ─────────────────────────────────────
const FB_POETS = [
  { id:1,  name:"Rajan Rai",                hindi:"राजन राय",            period:"16/08/2005 - Present", color:"#8B1A1A", initials:"रा", category:"contemporary", tags:["founder","contemporary"], isFeatured:true,  speciality:"Philosophical Poetry, Aphorism", bio:"Rajan Rai is the founder of Niharika and a philosopher-poet whose work explores human potential and self-realisation." },
  { id:2,  name:"Kabir Das",                hindi:"कबीर दास",            period:"1440 - 1518",    color:"#C9982A", initials:"क",  category:"classical",     tags:["classical","bhakti"],     isFeatured:true,  speciality:"Doha, Bhajan",                  bio:"Kabir Das was a 15th-century mystic poet. His Dohe carry timeless wisdom about truth, love, and the divine." },
  { id:3,  name:"Harivansh Rai Bachchan",   hindi:"हरिवंश राय बच्चन",   period:"1907 - 2003",    color:"#2e7d32", initials:"ह",  category:"modern",        tags:["modern"],                 isFeatured:true,  speciality:"Kavita, Madhushala",            bio:"Harivansh Rai Bachchan authored Madhushala (1935), one of the greatest works of modern Hindi literature." },
  { id:4,  name:"Mirabai",                  hindi:"मीराबाई",             period:"1498 - 1547",    color:"#6A0572", initials:"मी", category:"classical",     tags:["classical","bhakti"],     isFeatured:true,  speciality:"Bhajan, Devotional Poetry",     bio:"Mirabai was a mystic poet-saint and devotee of Lord Krishna. Her bhajans express passionate divine love." },
  { id:5,  name:"Ramdhari Singh Dinkar",    hindi:"रामधारी सिंह दिनकर", period:"1908 - 1974",    color:"#1a237e", initials:"दि", category:"modern",        tags:["modern","patriotic"],     isFeatured:true,  speciality:"Rashtriya Kavita, Veer Ras",    bio:"Dinkar's patriotic and revolutionary poetry earned him the Sahitya Akademi Award and Padma Bhushan." },
  { id:6,  name:"Gulzar",                   hindi:"गुलज़ार",             period:"1934 - Present", color:"#37474F", initials:"गु", category:"contemporary",  tags:["contemporary","nazm"],    isFeatured:true,  speciality:"Nazm, Film Lyrics",             bio:"Gulzar is an Oscar-winning poet and lyricist known for profound and symbolic nazms." },
  { id:7,  name:"Mahadevi Verma",           hindi:"महादेवी वर्मा",       period:"1907 - 1987",    color:"#880E4F", initials:"म",  category:"modern",        tags:["modern","chhayawad"],     isFeatured:false, speciality:"Chhayawad Kavita",              bio:"Known as the Modern Meera, Mahadevi Verma received the Bharat Ratna for her contribution to Hindi literature." },
  { id:8,  name:"Sumitranandan Pant",       hindi:"सुमित्रानंदन पंत",    period:"1900 - 1977",    color:"#1B5E20", initials:"पं", category:"modern",        tags:["modern","chhayawad"],     isFeatured:false, speciality:"Prakriti Kavita, Chhayawad",     bio:"The most lyrical Chhayawad poet, Pant won the Jnanpith Award for his nature-inspired verse." },
  { id:9,  name:"Rahim Das",                hindi:"रहीम दास",            period:"1556 - 1627",    color:"#4E342E", initials:"र",  category:"classical",     tags:["classical","doha"],       isFeatured:false, speciality:"Doha, Satsai",                  bio:"One of Akbar's nine gems, Rahim's dohe blend wisdom, poetry, and deep humanity." },
  { id:10, name:"Nirala",                   hindi:"निराला",              period:"1896 - 1961",    color:"#BF360C", initials:"नि", category:"modern",        tags:["modern","chhayawad"],     isFeatured:false, speciality:"Mukt Chhand, Kavita",           bio:"Nirala pioneered free verse (mukt chhand) in Hindi poetry with a rebel spirit and lyrical beauty." },
  { id:11, name:"Jaishankar Prasad",        hindi:"जयशंकर प्रसाद",       period:"1889 - 1937",    color:"#0D47A1", initials:"प्र",category:"classical",     tags:["classical","chhayawad"],  isFeatured:false, speciality:"Mahakavya, Kamayani",           bio:"Jaishankar Prasad wrote Kamayani, considered the greatest poem of modern Hindi literature." },
  { id:12, name:"Dr. Hariom Panwar",        hindi:"डॉ. हरिओम पंवार",     period:"1956 - Present", color:"#1A237E", initials:"प",  category:"contemporary",  tags:["contemporary"],           isFeatured:false, speciality:"Kavi Sammelan, Patriotic",       bio:"One of the most celebrated Kavi Sammelan performers, known for patriotic and motivational poetry." },
];

const FB_POEMS = [
  { id:1,  text:"A man can do anything,\nwhen he realises he is a man.",              hindi:"एक इंसान सब कुछ कर सकता है,\nजब वो जान ले कि वो इंसान है।",          poet:"Rajan Rai", poetId:1, form:"Aphorism",  likes:12400, isRajanQuote:true  },
  { id:2,  text:"Silence is the loudest answer\nthe soul ever gives.",                hindi:"खामोशी वो सबसे ऊँची आवाज़ है\nजो आत्मा कभी देती है।",                 poet:"Rajan Rai", poetId:1, form:"Aphorism",  likes:9800,  isRajanQuote:true  },
  { id:3,  text:"Every storm within you\nis just a sunrise waiting to break.",        hindi:"तुम्हारे भीतर का हर तूफ़ान\nबस एक सूर्योदय है जो उगने की राह देख रहा है।", poet:"Rajan Rai", poetId:1, form:"Nazm",      likes:10200, isRajanQuote:true  },
  { id:4,  text:"The mind that questions itself\nis already wiser than most.",        hindi:"वो मन जो खुद से सवाल करता है,\nवो पहले से ही अधिकांश से अधिक बुद्धिमान है।", poet:"Rajan Rai", poetId:1, form:"Aphorism",  likes:8700,  isRajanQuote:true  },
  { id:5,  text:"Love is not what you feel -\nit is what you become.",               hindi:"प्रेम वो नहीं जो तुम महसूस करते हो -\nप्रेम वो है जो तुम बन जाते हो।", poet:"Rajan Rai", poetId:1, form:"Aphorism",  likes:11500, isRajanQuote:true  },
  { id:6,  text:"मन रे तन कागद का पुतला,\nलागे बूंद बिनसि जाए छिन में।",          hindi:"मन रे तन कागद का पुतला,\nलागे बूंद बिनसि जाए छिन में।",                poet:"Kabir Das", poetId:2, form:"Doha",      likes:34200, isRajanQuote:false },
  { id:7,  text:"रहिमन धागा प्रेम का, मत तोड़ो चटकाय,\nटूटे से फिर ना जुड़े, जुड़े गाँठ पड़ जाय।", hindi:"रहिमन धागा प्रेम का, मत तोड़ो चटकाय,\nटूटे से फिर ना जुड़े, जुड़े गाँठ पड़ जाय।", poet:"Rahim Das", poetId:9, form:"Doha", likes:38500, isRajanQuote:false },
  { id:8,  text:"मेरे तो गिरिधर गोपाल दूसरो न कोई,\nजाके सिर मोर मुकुट मेरो पति सोई।",  hindi:"मेरे तो गिरिधर गोपाल दूसरो न कोई,\nजाके सिर मोर मुकुट मेरो पति सोई।", poet:"Mirabai", poetId:4, form:"Bhajan", likes:42100, isRajanQuote:false },
  { id:9,  text:"सिंहासन खाली करो कि जनता आती है।",                                hindi:"सिंहासन खाली करो कि जनता आती है।",                                        poet:"Ramdhari Singh Dinkar", poetId:5, form:"Nazm", likes:56000, isRajanQuote:false },
  { id:10, text:"जो है भार वही है उठाना,\nजब तक जियो तब तक यही काम।",              hindi:"जो है भार वही है उठाना,\nजब तक जियो तब तक यही काम।",                    poet:"Harivansh Rai Bachchan", poetId:3, form:"Kavita", likes:28900, isRajanQuote:false },
  { id:11, text:"Truth does not need many words -\nit only needs one honest moment.", hindi:"सत्य को कई शब्दों की ज़रूरत नहीं -\nउसे बस एक ईमानदार पल चाहिए।",     poet:"Rajan Rai", poetId:1, form:"Aphorism", likes:7900, isRajanQuote:true },
  { id:12, text:"The strongest man is not the one who never falls -\nit is the one who always rises.", hindi:"सबसे मजबूत इंसान वो नहीं जो कभी गिरता नहीं -\nबल्कि वो है जो हमेशा उठता है।", poet:"Rajan Rai", poetId:1, form:"Aphorism", likes:9100, isRajanQuote:true },
];

const FB_QUOTES = [
  { id:1, text:"A man can do anything, when he realises he is a man.", hindi:"एक इंसान सब कुछ कर सकता है, जब वो जान ले कि वो इंसान है।", author:"Rajan Rai", isFounder:true },
  { id:2, text:"Silence is the loudest answer the soul ever gives.", hindi:"खामोशी वो सबसे ऊँची आवाज़ है जो आत्मा कभी देती है।", author:"Rajan Rai", isFounder:true },
  { id:3, text:"Every storm within you is just a sunrise waiting to break.", hindi:"तुम्हारे भीतर का हर तूफ़ान बस एक सूर्योदय है।", author:"Rajan Rai", isFounder:true },
  { id:4, text:"The mind that questions itself is already wiser than most.", hindi:"वो मन जो खुद से सवाल करता है वो पहले से ही अधिकांश से बुद्धिमान है।", author:"Rajan Rai", isFounder:true },
  { id:5, text:"Love is not what you feel - it is what you become.", hindi:"प्रेम वो नहीं जो तुम महसूस करते हो - प्रेम वो है जो तुम बन जाते हो।", author:"Rajan Rai", isFounder:true },
  { id:6, text:"Truth does not need many words - it only needs one honest moment.", hindi:"सत्य को कई शब्दों की ज़रूरत नहीं - उसे बस एक ईमानदार पल चाहिए।", author:"Rajan Rai", isFounder:true },
  { id:7, text:"The strongest man is not the one who never falls - it is the one who always rises.", hindi:"सबसे मजबूत इंसान वो है जो हमेशा उठता है।", author:"Rajan Rai", isFounder:true },
];

const FB_DICT = {
  kavita:   { word:"Kavita",   hindi:"कविता",  meaning:"Poetry; a literary form expressing emotions through rhythm.", example:"उसकी कविता मन को छू लेती है।", pos:"Noun (Feminine)", tags:["poetry","hindi"] },
  doha:     { word:"Doha",     hindi:"दोहा",   meaning:"A traditional two-line verse with 24 syllables (11+13). Kabir's dohas are the most celebrated.", example:"कबीर के दोहे आज भी प्रासंगिक हैं।", pos:"Noun (Masculine)", tags:["form","classical"] },
  prem:     { word:"Prem",     hindi:"प्रेम",  meaning:"Love; a deep unconditional affection for a person, nature, or the divine.", example:"प्रेम सबसे बड़ी शक्ति है।", pos:"Noun (Masculine)", tags:["emotion"] },
  virah:    { word:"Virah",    hindi:"विरह",   meaning:"Separation; the pain of being apart from a loved one - a central theme in Indian poetry.", example:"विरह की पीड़ा असहनीय होती है।", pos:"Noun (Masculine)", tags:["emotion","classical"] },
  ras:      { word:"Ras",      hindi:"रस",     meaning:"The aesthetic flavour of a poem. Nine rasas: Shringar, Hasya, Karuna, Raudra, Veer, Bhayanaka, Bibhatsa, Adbhuta, Shanta.", example:"श्रृंगार रस प्रेम का प्रतीक है।", pos:"Noun (Masculine)", tags:["poetics"] },
  bhajan:   { word:"Bhajan",   hindi:"भजन",   meaning:"A devotional song or hymn in praise of God, especially in the Hindu tradition.", example:"मीराबाई के भजन बहुत प्रसिद्ध हैं।", pos:"Noun (Masculine)", tags:["form","devotional"] },
  karma:    { word:"Karma",    hindi:"कर्म",   meaning:"Action; the law of cause and effect. One's actions determine one's future.", example:"कर्म ही पूजा है।", pos:"Noun (Masculine)", tags:["philosophy"] },
  moksha:   { word:"Moksha",   hindi:"मोक्ष",  meaning:"Liberation; freedom from the cycle of rebirth - the highest spiritual goal.", example:"मोक्ष की प्राप्ति आत्मज्ञान से होती है।", pos:"Noun (Masculine)", tags:["philosophy"] },
  anand:    { word:"Anand",    hindi:"आनंद",   meaning:"Joy, bliss; the pure happiness arising from spiritual realisation.", example:"भक्ति में आनंद मिलता है।", pos:"Noun (Masculine)", tags:["emotion","philosophy"] },
  shraddha: { word:"Shraddha", hindi:"श्रद्धा",meaning:"Faith, deep reverence - especially towards a teacher or spiritual path.", example:"गुरु के प्रति श्रद्धा होनी चाहिए।", pos:"Noun (Feminine)", tags:["philosophy"] },
  nazm:     { word:"Nazm",     hindi:"नज़्म",  meaning:"A poem with a single theme; free verse or structured narrative poetry.", example:"यह नज़्म बहुत भावुक है।", pos:"Noun (Feminine)", tags:["form"] },
  alankar:  { word:"Alankar",  hindi:"अलंकार",meaning:"Figure of speech in Hindi poetry - Upama (simile), Rupak (metaphor), Anupras (alliteration).", example:"उपमा एक प्रमुख अलंकार है।", pos:"Noun (Masculine)", tags:["poetics"] },
  chhand:   { word:"Chhand",   hindi:"छंद",    meaning:"Meter; the rhythmic pattern in classical Hindi poetry. Common: Doha, Chaupai, Savaiya.", example:"रामायण में दोहा और चौपाई छंद है।", pos:"Noun (Masculine)", tags:["poetics"] },
  sahitya:  { word:"Sahitya",  hindi:"साहित्य",meaning:"Literature; the body of written works - poetry, prose, drama - of a language.", example:"हिंदी साहित्य बहुत समृद्ध है।", pos:"Noun (Masculine)", tags:["general"] },
  jigyasa:  { word:"Jigyasa",  hindi:"जिज्ञासा",meaning:"Curiosity, inquisitiveness; the burning desire to know and understand.", example:"ज्ञान की जिज्ञासा मनुष्य को महान बनाती है।", pos:"Noun (Feminine)", tags:["philosophy"] },
};

const FB_CATEGORIES = [
  {icon:"📜",name:"DOHA",count:"8,000+"},{icon:"🌹",name:"KAVITA",count:"32,000+"},
  {icon:"✍️",name:"NAZM",count:"10,500+"},{icon:"🙏",name:"BHAJAN",count:"5,200+"},
  {icon:"⚔️",name:"VIR RAS",count:"2,800+"},{icon:"❤️",name:"PREM KAVITA",count:"18,000+"},
  {icon:"📖",name:"MAHAKAVYA",count:"600+"},{icon:"🌙",name:"BHAKTI",count:"9,500+"},
  {icon:"🎵",name:"SONG LYRICS",count:"22,000+"},{icon:"🏆",name:"AWARD WINNING",count:"1,200+"},
];

const FB_VIDEOS = [
  {id:1,title:"Kabir Ke Dohe - Complete Reading",poet:"Kabir Das",views:"3.2M",duration:"42:18",letter:"क",bg:"#4a2800"},
  {id:2,title:"Madhushala - Bachchan Live",poet:"H.R. Bachchan",views:"4.5M",duration:"58:44",letter:"ह",bg:"#1b4000"},
  {id:3,title:"Rashmirathi - Dinkar's Epic",poet:"Ramdhari Singh Dinkar",views:"2.1M",duration:"1:12:30",letter:"दि",bg:"#1a237e"},
  {id:4,title:"Mirabai Bhajans - Devotional",poet:"Mirabai",views:"5.8M",duration:"1:05:10",letter:"मी",bg:"#3d0060"},
  {id:5,title:"Rajan Rai - Philosophy Session",poet:"Rajan Rai",views:"890K",duration:"34:22",letter:"रा",bg:"#4A0E0E"},
  {id:6,title:"Gulzar - Nazm Evening",poet:"Gulzar",views:"2.7M",duration:"1:20:00",letter:"गु",bg:"#1C2227"},
  {id:7,title:"Chhayawad Night - Pant & Nirala",poet:"Pant, Nirala",views:"1.1M",duration:"55:18",letter:"पं",bg:"#1a3200"},
  {id:8,title:"Kavi Sammelan - Best of 2024",poet:"Multiple Poets",views:"6.2M",duration:"2:10:45",letter:"क",bg:"#3e0000"},
];

const FB_BLOG = [
  {id:1,title:"Understanding the Doha: Kabir's Gift to Hindi Literature",excerpt:"The Doha carries centuries of wisdom in just two lines. Kabir's dohas continue to resonate across all religions and nations.",category:"POETRY 101",date:"Apr 8, 2024",emoji:"📜",bg:"linear-gradient(135deg,#4a2800,#8a5000)",author:"Rajan Rai"},
  {id:2,title:"Rajan Rai: Why I Built Niharika for India's Poetry Lovers",excerpt:"Niharika was born from a simple belief - that great poetry should be free and accessible to all. The founder shares his journey.",category:"FOUNDER'S NOTE",date:"Apr 5, 2024",emoji:"✍️",bg:"linear-gradient(135deg,#1C1410,#3d2b1f)",author:"Rajan Rai"},
  {id:3,title:"Madhushala: Harivansh Rai Bachchan's Timeless Masterpiece",excerpt:"135 quatrains about life, death, and the divine - written in 1935 and never having lost their power.",category:"BIOGRAPHY",date:"Apr 2, 2024",emoji:"🍶",bg:"linear-gradient(135deg,#1b4000,#2e7d32)",author:"Rajan Rai"},
];

const FB_QUIZ = [
  {question:"Who wrote Madhushala (1935)?",options:["Ramdhari Singh Dinkar","Sumitranandan Pant","Harivansh Rai Bachchan","Jaishankar Prasad"],answer:2},
  {question:"What is a 'Doha' in Hindi poetry?",options:["A devotional song","A two-line verse of 24 syllables","An epic poem","A free verse poem"],answer:1},
  {question:"Which poet is called 'Modern Meera' and received the Bharat Ratna?",options:["Mirabai","Subhadra Kumari Chauhan","Mahadevi Verma","Amrita Pritam"],answer:2},
  {question:"'सिंहासन खाली करो कि जनता आती है' is by:",options:["Kabir Das","Gulzar","Ramdhari Singh Dinkar","Harivansh Rai Bachchan"],answer:2},
  {question:"What is 'Chhayawad' in Hindi literature?",options:["A warrior poetry tradition","A romantic-mystical movement of early 20th century","A Bhakti poetry movement","A satirical tradition"],answer:1},
  {question:"Who founded Niharika poetry platform?",options:["Kabir Das","Gulzar","Rajan Rai","Harivansh Rai Bachchan"],answer:2},
  {question:"What does 'Ras' mean in Hindi poetics?",options:["Sweet drink","The emotional flavour of poetry (9 types)","A type of meter","A form of Bhajan"],answer:1},
  {question:"Mirabai was a devotee of which deity?",options:["Lord Shiva","Lord Rama","Goddess Durga","Lord Krishna"],answer:3},
];
