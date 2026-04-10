// backend/routes/chatbot.js
// Niharika Sakhi - Enhanced Intelligence Engine v3.0
// Natural, conversational, multi-domain knowledge base

// ============================================================
//   KNOWLEDGE BASE
// ============================================================

const POETS = {
  kabir: {
    name: 'Kabir Das',
    hindi: 'कबीर दास',
    period: '1440 - 1518',
    tradition: 'Bhakti Movement, Nirguna Bhakti',
    bio: `Kabir Das was a 15th-century mystic poet and saint who is one of the greatest figures in Hindi literature. Born in Varanasi into a family of weavers, he was raised Muslim but his poetry transcended all religious boundaries. He was a disciple of Ramananda and deeply influenced both Hinduism and Islam. His verses, called Dohe (couplets), are timeless meditations on truth, love, the nature of God, and the hypocrisy of organised religion.`,
    teachings: [
      'God is one - He cannot be found in temples or mosques but in every human heart.',
      'Love and truth are the only religion.',
      'Ego and greed are the root of all suffering.',
      'The guru (teacher) is the bridge between the individual soul and the divine.'
    ],
    famous_works: ['Bijak', 'Kabir Granthavali', 'Adi Granth (contributions)', 'Dohe collection'],
    famous_quotes: [
      'Bura jo dekhan main chala, bura nahi milaya. Jo dil khoja aapna, mujhsa bura na kaya.',
      'Dukh mein sumiran sab kare, Sukh mein kare na koy. Jo sukh mein sumiran kare, To dukh kahe ko hoy.',
      'Mati kahe kumhar se, tu kya ronde mohe. Ek din aisa aayega, main rodongi tohe.',
      'Pothi padh padh jag mua, pandit bhaya na koy. Dhai aakhar prem ke, padhe so pandit hoy.'
    ]
  },
  ghalib: {
    name: 'Mirza Ghalib',
    hindi: 'मिर्ज़ा ग़ालिब',
    period: '1797 - 1869',
    tradition: 'Urdu and Persian poetry, Mughal court tradition',
    bio: `Mirza Asadullah Baig Khan, known by his pen name Ghalib, is the most celebrated poet of the Urdu language. Born in Agra, he lived most of his life in Delhi during the turbulent twilight of the Mughal Empire. Ghalib's ghazals are unmatched in their philosophical depth, wordplay, and emotional complexity. He wrote in both Urdu and Persian and is considered the greatest Urdu poet who ever lived.`,
    teachings: [
      'The pain of love and longing is itself a form of beauty.',
      'Reason has limits - the heart knows things the mind cannot grasp.',
      'Life is a riddle and the poet lives in its uncertainty.',
      'Even in suffering, there is grace and irony worth celebrating.'
    ],
    famous_works: ['Diwan-e-Ghalib', 'Dastambu', 'Makatib-e-Ghalib', 'Urdu Diwan'],
    famous_quotes: [
      'Hazaaron khwahishain aisi ke har khwahish pe dum nikle.',
      'Rekhte ke tum hi nahin ustaad Ghalib, kaha karte the saaye mein baithe.',
      'Isq par zor nahin, hai ye woh aatish Ghalib, jo lagaaye na lage aur bujhaaye na bane.',
      'Hum ko maloom hai jannat ki haqeeqat lekin, dil ke khush rakhne ko Ghalib yeh khayal acha hai.'
    ]
  },
  rumi: {
    name: 'Rumi (Jalal ad-Din Muhammad Rumi)',
    hindi: 'रूमी',
    period: '1207 - 1273',
    tradition: 'Sufi poetry, Persian literature, Islamic mysticism',
    bio: `Jalal ad-Din Muhammad Rumi was a 13th-century Persian poet, Sufi mystic, Islamic jurist, theologian, and teacher. Born in what is now Afghanistan, he later settled in Konya (modern Turkey). After meeting the wandering mystic Shams of Tabriz, Rumi was transformed into a poet of extraordinary depth. His magnum opus, the Masnavi, is often called "the Persian Quran" and remains one of the bestselling poetry books in the world today.`,
    teachings: [
      'The purpose of life is to return to the source of love.',
      'Silence is the language of God - everything else is poor translation.',
      'The wound is the place where the light enters you.',
      'You were born with wings - why prefer to crawl through life?',
      'Stop acting so small. You are the universe in ecstatic motion.'
    ],
    famous_works: ['Masnavi-Ma\'navi', 'Diwan-e-Shams-e-Tabrizi', 'Fihi Ma Fihi', 'Maktubat'],
    famous_quotes: [
      'Out beyond ideas of wrongdoing and rightdoing, there is a field. I will meet you there.',
      'The wound is the place where the light enters you.',
      'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.',
      'Wherever you are and whatever you do, be in love.',
      'Don\'t grieve. Anything you lose comes round in another form.'
    ]
  },
  mirabai: {
    name: 'Mirabai',
    hindi: 'मीराबाई',
    period: '1498 - 1547',
    tradition: 'Bhakti Movement, Vaishnava devotion',
    bio: `Mirabai was a 16th-century Hindu mystic poet and devotee of Lord Krishna. A Rajput princess who married into royalty, she abandoned all worldly attachments to pursue her devotion to Krishna. Her bhajans, written in Rajasthani and Brajbhasha, express an intense, passionate, and often defiant love for the divine. She is one of the most beloved figures in Indian spiritual history.`,
    teachings: [
      'Divine love transcends all social boundaries and conventions.',
      'Surrender completely to God and all fear disappears.',
      'The devotee and the divine are ultimately one.'
    ],
    famous_works: ['Mera to Giridhar Gopal', 'Pag ghungroo bandh Mira naachi', 'Various Bhajans'],
    famous_quotes: [
      'Mere toh Giridhar Gopal, doosro na koi.',
      'Hari tum haro jan ki peer.',
      'Main toh sham rang rangee re.'
    ]
  },
  dinkar: {
    name: 'Ramdhari Singh Dinkar',
    hindi: 'रामधारी सिंह दिनकर',
    period: '1908 - 1974',
    tradition: 'Veer Ras, Rashtriya (Patriotic) poetry, Modern Hindi',
    bio: `Ramdhari Singh Dinkar was one of the most important modern Hindi poets, known for his patriotic and revolutionary poetry. He received the Sahitya Akademi Award for his epic Urvashi, and also won the Padma Bhushan and Padma Vibhushan. His fiery verse, especially Rashmirathi and Kurukshetra, captured the spirit of post-independence India.`,
    teachings: [
      'A nation that forgets its past cannot build its future.',
      'Courage is the greatest human virtue.',
      'Poetry must speak for the oppressed and the forgotten.'
    ],
    famous_works: ['Rashmirathi', 'Kurukshetra', 'Urvashi', 'Hunkar', 'Renu and Rakt'],
    famous_quotes: [
      'Singhasan khali karo ke janta aati hai.',
      'Shakti ki pooja karo shakti ke geet becho.',
      'Ksama shobhti us bhujang ko, jiske paas garal ho.'
    ]
  },
  bachchan: {
    name: 'Harivansh Rai Bachchan',
    hindi: 'हरिवंश राय बच्चन',
    period: '1907 - 2003',
    tradition: 'Modern Hindi poetry, Halawad movement',
    bio: `Harivansh Rai Bachchan was one of the most celebrated Hindi poets of the 20th century. His magnum opus Madhushala, written in 1935 when he was just 28, uses the extended metaphor of a tavern and wine to explore life, philosophy, and the divine. He received the Sahitya Akademi Award in 1976 and is the father of Bollywood superstar Amitabh Bachchan. His poetry speaks directly to the human heart.`,
    teachings: [
      'Life must be lived fully and joyfully despite its uncertainties.',
      'True wisdom comes from experience, not from books alone.',
      'Love and beauty are never wasted.'
    ],
    famous_works: ['Madhushala', 'Madhukalash', 'Madhubala', 'Nisha Nimantran'],
    famous_quotes: [
      'Jo beet gayi so baat gayi.',
      'Mitti ka tan, mast man, do pal ka jeevan.',
      'Aaney wala pal jaane wala hai.'
    ]
  },
  gulzar: {
    name: 'Gulzar',
    hindi: 'गुलज़ार',
    period: '1934 - Present',
    tradition: 'Contemporary Urdu/Hindi, Film lyrics, Nazm',
    bio: `Gulzar is an Indian poet, lyricist, and film director who writes primarily in Urdu and Hindi. Born Sampooran Singh Kalra in what is now Pakistan, he is known for his profound yet accessible poetry. He has won the Academy Award for the song "Jai Ho", numerous Filmfare Awards, and the Sahitya Akademi Award. His nazms are celebrated for their unique imagery, symbolism, and emotional depth.`,
    teachings: [
      'Poetry lives in the spaces between words.',
      'Simplicity is the highest form of art.',
      'Every person carries a universe of stories inside them.'
    ],
    famous_works: ['Raavi Paar', 'Chand Pukhraaj Ka', 'Dhuan', 'Ek Boond Chaand'],
    famous_quotes: [
      'Kuch log roz mil ke bhi begaane rehte hain.',
      'Zindagi ek safar hai suhana.',
      'Tum toh thehre pardesi, saath kya nibhaoge.'
    ]
  },
  rajanrai: {
    name: 'Rajan Rai',
    hindi: 'राजन राय',
    period: '16 August 2005 - Present',
    tradition: 'Contemporary philosophical poetry, Aphorism',
    bio: `Rajan Rai is the founder of Niharika and a contemporary philosopher-poet. Born on 16 August 2005, he believes that the purpose of poetry is to awaken the human being to their own infinite potential. His work explores self-realisation, human strength, the nature of silence, and the relationship between thought and truth. He built Niharika so that great poetry remains free and accessible to all.`,
    teachings: [
      'A man can do anything, when he realises he is a man.',
      'The mind that questions itself is already wiser than most.',
      'Silence is not emptiness - it is the fullest form of presence.',
      'Your greatest power is the decision to begin.'
    ],
    famous_works: ['Niharika Philosophy Collection', 'Shayari of Self', 'Truth In One Line'],
    famous_quotes: [
      'A man can do anything, when he realises he is a man.',
      'Silence is the loudest answer the soul ever gives.',
      'Every storm within you is just a sunrise waiting to break.',
      'The mind that questions itself is already wiser than most.',
      'Love is not what you feel - it is what you become.',
      'Truth does not need many words - it only needs one honest moment.',
      'The strongest man is not the one who never falls - it is the one who always rises.',
      'Pain is the ink with which the greatest poems are written.',
      'A thought unspoken is a poem the world never read.',
      'To question is the first step. To understand is the destination.'
    ]
  }
};

const SHAYARI = {
  love: [
    { text: 'Tujhe dekh ke dil ko chain aata hai,\nJaise baarish ke baad mitti ko sukoon aata hai.', author: 'Niharika Collection' },
    { text: 'Mohabbat ek ibaadat hai,\nIse dil ki gehraion mein ada karo.', author: 'Niharika Collection' },
    { text: 'Teri yaadein aisi hain\nJaise phoolon ki khushbu - dikhti nahi, mehsoosi zaroor hoti hai.', author: 'Rajan Rai' },
    { text: 'Tune mere lafzon mein apna naam likh diya,\nAb main kuch aur likhne ke kaabil nahi raha.', author: 'Niharika Collection' },
    { text: 'Ishq woh nahi jo sochkar kiya jaye,\nIshq woh hai jo ho jaata hai.', author: 'Niharika Collection' }
  ],
  life: [
    { text: 'Zindagi nahi milti baar baar,\nIs pal ko jiyo, poori tarah - baar baar.', author: 'Rajan Rai' },
    { text: 'Raste paidal chalke hi milte hain,\nManzilein apni nahi hoti - wo kamayi jaati hain.', author: 'Niharika Collection' },
    { text: 'Jo beet gayi so baat gayi,\nVartmaan mein ji, yahi hai teri shakti.', author: 'After H.R. Bachchan' },
    { text: 'Zindagi ek daur hai, use khelo.\nHaarna bhi zaruri hai - jeetne ka hua pata.', author: 'Niharika Collection' },
    { text: 'Mann mein hai vishwas,\nHath mein hai kaam,\nIse hi kehte hain safaltaa ka naam.', author: 'Niharika Collection' }
  ],
  philosophy: [
    { text: 'Khud ko jaano, pehle khud se milo,\nPhir dunia ki baat karo.', author: 'Rajan Rai' },
    { text: 'Sach bolne mein waqt lagta hai,\nJhooth ko toh ek pal bhi nahi.', author: 'Rajan Rai' },
    { text: 'Woh insaan kya jeeta hai,\nJisne khud ko pehchan liya.', author: 'After Kabir Das' },
    { text: 'Bura jo dekhan main chala, bura nahi milaya.\nJo dil khoja aapna, mujhsa bura na kaya.', author: 'Kabir Das' },
    { text: 'Pothi padh padh jag mua, pandit bhaya na koy.\nDhai aakhar prem ke, padhe so pandit hoy.', author: 'Kabir Das' }
  ],
  motivation: [
    { text: 'Ek insaan sab kuch kar sakta hai,\nJab woh jaan le ki woh insaan hai.', author: 'Rajan Rai' },
    { text: 'Tufaan bhi aayenge, andhere bhi chhaayenge,\nPar jo jhukte nahi, woh hi itihaas banaate hain.', author: 'Niharika Collection' },
    { text: 'Haar maan lena sabse badi haar hai,\nLadna jaari rakhna hi asli jeet hai.', author: 'Rajan Rai' },
    { text: 'Sapne dekh - par aankh khol ke bhi dekh,\nSapne poore wahi karta hai jo jaagta hai.', author: 'Niharika Collection' },
    { text: 'Mushkilein aati hain anmol saabit karne,\nSone ko aag se guzarna padta hai.', author: 'Niharika Collection' }
  ],
  sad: [
    { text: 'Dard ko bhi ek zubaan de do,\nShayad woh bhi kuch kehna chahta hai.', author: 'Rajan Rai' },
    { text: 'Aansu woh baatein kehte hain\nJo honth kehne se darte hain.', author: 'Niharika Collection' },
    { text: 'Kuch darwaze band ho jaate hain,\nTaaki dusre khul sakein.', author: 'Niharika Collection' },
    { text: 'Tanhai bhi ek ustaad hai,\nKhud se milati hai.', author: 'Rajan Rai' }
  ],
  nature: [
    { text: 'Baarish ki boond ne poochha pathar se:\nKya tum bhi kabhi pighal sakte ho?\nPathar ne kaha: Waqt do.', author: 'Rajan Rai' },
    { text: 'Dariya apni raah khud banata hai,\nPahaad rok sake toh roke.', author: 'Niharika Collection' },
    { text: 'Phool khilta hai bina kisi shor ke,\nGreatness always comes quietly.', author: 'Niharika Collection' }
  ]
};

const PHILOSOPHY = {
  karma: `**Karma** is one of the most profound concepts in Indian philosophy. It comes from the Sanskrit root "kri" meaning "to do." The law of karma states that every action you take - every word, every thought - creates a consequence. What you send out into the universe returns to you.\n\nIn simple terms: **Be good, do good, and good will return.**\n\nGita says: "Karmanye vadhikaraste, ma phaleshu kadachana" - You have the right to perform your duties but you are not entitled to the fruits of your actions. Do your work completely without attachment to the outcome.`,
  dharma: `**Dharma** is your sacred duty - the path that aligns with your true nature, your purpose, and the cosmic order. It is different for each person.\n\nFor a teacher: dharma is to teach honestly.\nFor a leader: dharma is to serve with justice.\nFor a poet: dharma is to speak truth with beauty.\n\nWhen you live in alignment with your dharma, life flows. When you abandon it, you feel the inner friction of a life unlived.`,
  moksha: `**Moksha** is the highest goal in Indian philosophy - liberation from the cycle of birth, death, and rebirth (samsara). It is the freedom from ego, desire, and the illusion of separateness from the divine.\n\nMoksha is not something achieved after death. Many teachers say it can be experienced in this very life - the moment you realise that you are not just the body or the mind, but the infinite awareness behind them.`,
  atman: `**Atman** is the Sanskrit word for the individual soul - your innermost self, pure consciousness, the "witness" behind all your thoughts and experiences.\n\nThe Upanishads teach: **Atman is Brahman** - the individual soul and ultimate reality are identical. You are not separate from the universe. The boundary between "you" and "everything else" is an illusion created by the mind.`,
  stoicism: `**Stoicism** is a Greek philosophy founded by Zeno of Citium. Its core teaching is: divide everything in life into two categories:\n\n1. **What you control** - your thoughts, attitudes, choices\n2. **What you do not control** - weather, other people's actions, outcomes\n\nFocus only on what you control. Accept everything else with equanimity.\n\nMarcus Aurelius wrote: "You have power over your mind, not outside events. Realize this and you will find strength."`,
  zen: `**Zen** is a branch of Buddhism that emphasizes direct experience over intellectual study. It uses koans (paradoxical riddles), meditation, and direct teacher-student transmission to point to the nature of reality.\n\nA famous Zen teaching: "Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water."\n\nThe point is: enlightenment does not change the activities of daily life - it changes the quality of awareness brought to them.`,
  sufism: `**Sufism** is the mystical dimension of Islam - the path of the heart. Sufis seek direct personal experience of God through love, devotion, music (sama), poetry, and the guidance of a spiritual master (murshid).\n\nRumi is the greatest poet of Sufism. He wrote that the pain of longing for God is itself the greatest gift - because it means you are awake enough to feel the separation.\n\n"The soul has been given its own ears to hear things the mind does not understand." - Rumi`,
  maya: `**Maya** is the Sanskrit term for illusion - the cosmic veil that makes us perceive the world as consisting of separate, independent objects. Under maya, we identify with our body, name, and possessions and forget our true infinite nature.\n\nAdvaita Vedanta says: When the veil of maya is lifted through spiritual practice (sadhana), we realise that there is only one reality - Brahman (the universal consciousness) - and all apparent separation was always an illusion.`,
  silence: `**The philosophy of silence** appears in almost every wisdom tradition:\n\n- The Tao Te Ching opens with "The Tao that can be spoken is not the eternal Tao."\n- Wittgenstein ended his Tractatus: "Whereof one cannot speak, thereof one must be silent."\n- Rumi: "Silence is the language of God - all else is poor translation."\n- Rajan Rai: "Silence is the loudest answer the soul ever gives."\n\nTrue wisdom often lives beyond the reach of words.`
};

const BOOKS = {
  masnavi: { title: 'Masnavi Ma\'navi', author: 'Rumi', year: '1258-1273', summary: 'Six books of mystical Persian poetry exploring the journey of the soul toward God. Often called the Persian Quran. Contains 25,000 verses of unmatched depth.' },
  madhushala: { title: 'Madhushala', author: 'Harivansh Rai Bachchan', year: '1935', summary: 'A Hindi poem of 135 quatrains (Rubai) using the extended metaphor of a tavern, wine, and the cup-bearer to explore life, death, love, and the divine. One of the most popular works of modern Hindi poetry.' },
  ramcharitmanas: { title: 'Ram Charit Manas', author: 'Tulsidas', year: '1574', summary: 'An epic Hindi poem retelling the story of Ram in Awadhi dialect using the Doha-Chaupai format. The most read Hindi religious text in India, it contains deep philosophical wisdom about duty, love, and righteousness.' },
  bhagavadgita: { title: 'Bhagavad Gita', author: 'Attributed to Vyasa', year: 'Ancient (c. 400 BCE)', summary: 'A 700-verse Sanskrit scripture that is part of the Hindu epic Mahabharata. A dialogue between prince Arjuna and Lord Krishna about duty, life, action, and the nature of the self. One of the most influential philosophical texts ever written.' },
  diwan: { title: 'Diwan-e-Ghalib', author: 'Mirza Ghalib', year: '1841 (revised)', summary: 'The collected Urdu ghazals of Ghalib. Considered the pinnacle of Urdu poetry. Contains approximately 235 ghazals of extraordinary philosophical depth, wit, and linguistic artistry.' },
  taoching: { title: 'Tao Te Ching', author: 'Laozi', year: 'c. 400 BCE', summary: 'Eighty-one short chapters of Chinese wisdom about the Tao (the Way) - the fundamental principle underlying the universe. Teaches effortless action (wu-wei), simplicity, and harmony with nature. One of the most translated books in history.' },
  meditations: { title: 'Meditations', author: 'Marcus Aurelius', year: '161-180 CE', summary: 'Personal journal of the Roman Emperor Marcus Aurelius. A masterpiece of Stoic philosophy. Written as a series of self-reminders, it covers duty, impermanence, the nature of the mind, and how to live well. Deeply relevant today.' }
};

const WORD_MEANINGS = {
  shayari: 'Shayari is the art of poetry in Urdu and Hindi - verses that express emotion, love, life philosophy, and human experience through carefully chosen words and imagery.',
  ghazal: 'A ghazal is a poetic form consisting of couplets (sher) that share a rhyme and refrain. Each couplet is self-contained yet connected by theme. The last couplet traditionally contains the poet\'s name. Ghazals typically deal with love and longing.',
  sher: 'A sher (also written "she\'r") is a single couplet in Urdu/Hindi poetry - two lines that together form a complete thought. It is the basic unit of a ghazal.',
  doha: 'A doha is a traditional Hindi verse form of two rhyming lines, each with 24 syllables (11+13). Kabir Das and Rahim Das are the greatest doha writers. Dohas carry profound wisdom in very few words.',
  ruba: 'A Ruba\'i (or Rubai) is a quatrain - a stanza of four lines. The first, second, and fourth lines rhyme. Omar Khayyam and Rumi wrote famous Ruba\'i collections.',
  nazm: 'A nazm is a poem - often in free verse or with a unified theme running through all stanzas (unlike a ghazal where each couplet is independent). Gulzar and Faiz Ahmed Faiz are famous nazm writers.',
  qafiya: 'Qafiya is the rhyme scheme in Urdu/Hindi poetry - the specific pattern of rhyming words used at the end of each verse in a ghazal.',
  radif: 'Radif is the refrain in a ghazal - a word or phrase that repeats at the end of each couplet after the qafiya (rhyming word). It gives the ghazal its distinctive rhythm.',
  rasa: 'Rasa is the aesthetic flavour or emotional essence of a poem or performance. Indian aesthetics identifies nine rasas (Navarasa): Shringar (love), Hasya (laughter), Karuna (compassion), Raudra (fury), Veer (heroism), Bhayanaka (terror), Bibhatsa (disgust), Adbhuta (wonder), and Shanta (peace).',
  virah: 'Virah is the Hindi/Sanskrit word for the pain of separation from a loved one - one of the most central themes in Indian poetry. Mirabai\'s bhajans are the supreme expression of the poetry of virah.',
  prem: 'Prem is the Hindi word for love - a deep, unconditional affection. In spiritual literature, prem refers specifically to divine love - the love between the devotee and God.',
  anand: 'Anand is the Sanskrit/Hindi word for bliss or supreme joy - especially the spiritual bliss that arises from self-realisation or divine connection.',
  moksha: 'Moksha is liberation - freedom from the cycle of birth, death, and rebirth. It is the highest spiritual goal in Hindu and Buddhist philosophy.',
  karma: 'Karma means "action" in Sanskrit. The law of karma states that every action creates a corresponding reaction. What we do - in thought, word, and deed - shapes our reality.',
  ahimsa: 'Ahimsa means non-violence or non-harm. It is one of the highest ethical principles in Jainism, Hinduism, and Buddhism. Gandhi made it the foundation of his political philosophy.',
  satyam: 'Satyam means truth in Sanskrit. "Satyam Shivam Sundaram" (Truth, God, Beauty) is a famous Sanskrit phrase expressing the unity of truth, divinity, and beauty.',
  dhyan: 'Dhyan means meditation in Sanskrit - the practice of focusing the mind inward toward pure awareness. It is one of the eight limbs of yoga and the foundation of many spiritual paths.',
  guru: 'Guru means teacher or spiritual guide in Sanskrit. Literally it means "one who dispels darkness (gu) and brings light (ru)." In Indian tradition, the guru-disciple relationship is considered sacred.'
};

const DAILY_QUOTES = [
  { text: 'A man can do anything, when he realises he is a man.', hindi: 'एक इंसान सब कुछ कर सकता है, जब वो जान ले कि वो इंसान है।', author: 'Rajan Rai' },
  { text: 'Silence is the loudest answer the soul ever gives.', hindi: 'खामोशी वो सबसे ऊंची आवाज़ है जो आत्मा कभी देती है।', author: 'Rajan Rai' },
  { text: 'Yesterday I was clever so I wanted to change the world. Today I am wise so I am changing myself.', hindi: 'कल मैं चालाक था इसलिए दुनिया बदलना चाहता था। आज मैं समझदार हूं इसलिए खुद को बदल रहा हूं।', author: 'Rumi' },
  { text: 'Out beyond ideas of wrongdoing and rightdoing, there is a field. I will meet you there.', author: 'Rumi' },
  { text: 'The wound is the place where the light enters you.', author: 'Rumi' },
  { text: 'Every storm within you is just a sunrise waiting to break.', hindi: 'तुम्हारे भीतर का हर तूफ़ान बस एक सूर्योदय है।', author: 'Rajan Rai' },
  { text: 'Pothi padh padh jag mua, pandit bhaya na koy. Dhai aakhar prem ke, padhe so pandit hoy.', hindi: 'पोथी पढ़ पढ़ जग मुआ, पंडित भया न कोय। ढाई आखर प्रेम के, पढ़े सो पंडित होय।', author: 'Kabir Das' },
  { text: 'You have power over your mind, not outside events. Realise this and you will find strength.', author: 'Marcus Aurelius' },
  { text: 'The mind that questions itself is already wiser than most.', hindi: 'वो मन जो खुद से सवाल करता है, वो पहले से बुद्धिमान है।', author: 'Rajan Rai' },
  { text: 'Hazaaron khwahishain aisi ke har khwahish pe dum nikle.', hindi: 'हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले।', author: 'Mirza Ghalib' }
];

// ============================================================
//   INTENT DETECTION
// ============================================================

function detectIntent(msg) {
  const m = msg.toLowerCase().trim();

  // Greetings
  if (/^(hi|hello|hey|namaste|hii|helo|namaskar|salam|assalam|howdy)/.test(m)) return 'greeting';
  if (/(who are you|what are you|introduce yourself|your name|about you|tumhara naam)/.test(m)) return 'self_intro';
  if (/(help|what can you do|commands|capabilities|kya kar sakte)/.test(m)) return 'help';

  // Shayari requests
  if (/(shayari|shayri|sher|couplet|poem|nazm|kavita|poetry)/.test(m)) {
    if (/(love|mohabbat|ishq|pyar|dil)/.test(m)) return 'shayari:love';
    if (/(life|zindagi|jeevan|duniya)/.test(m)) return 'shayari:life';
    if (/(sad|dard|gham|tanha|udaas|lonely)/.test(m)) return 'shayari:sad';
    if (/(motivat|inspir|himmat|hausla|courage|strength|taakat)/.test(m)) return 'shayari:motivation';
    if (/(nature|prakriti|phool|baarish|dariya)/.test(m)) return 'shayari:nature';
    if (/(philosoph|soch|vichar|gyaan|wisdom)/.test(m)) return 'shayari:philosophy';
    return 'shayari:random';
  }

  // Specific poets
  if (/(rajan|niharika founder|founder)/.test(m)) return 'poet:rajanrai';
  if (/(kabir|kabeer)/.test(m)) return 'poet:kabir';
  if (/(ghalib|mirza ghalib|mirza)/.test(m)) return 'poet:ghalib';
  if (/(rumi|jalal|maulana)/.test(m)) return 'poet:rumi';
  if (/(miraba|mirabai|mira)/.test(m)) return 'poet:mirabai';
  if (/(dinkar|ramdhari)/.test(m)) return 'poet:dinkar';
  if (/(bachchan|harivansh|madhushala)/.test(m)) return 'poet:bachchan';
  if (/(gulzar)/.test(m)) return 'poet:gulzar';

  // Quote requests
  if (/(quote|thought|vichar|suvichar|today|daily|subah|morning|kal ki baat)/.test(m)) return 'quote';
  if (/(motivat|inspir|encourage|uplift|boost)/.test(m)) return 'motivate';

  // Philosophy
  if (/(karma|karmic)/.test(m)) return 'philosophy:karma';
  if (/(dharma)/.test(m)) return 'philosophy:dharma';
  if (/(moksha|liberation|mukti)/.test(m)) return 'philosophy:moksha';
  if (/(atman|aatma|soul|self)/.test(m)) return 'philosophy:atman';
  if (/(stoic|stoicism|marcus aurelius|epictetus)/.test(m)) return 'philosophy:stoicism';
  if (/(zen|buddhism|buddha|nirvana)/.test(m)) return 'philosophy:zen';
  if (/(sufi|sufism|mystic)/.test(m)) return 'philosophy:sufism';
  if (/(maya|illusion)/.test(m)) return 'philosophy:maya';
  if (/(silence|khamoshi|chup)/.test(m)) return 'philosophy:silence';
  if (/(philosoph|gyaan|wisdom|exist|reality|truth|meaning of life)/.test(m)) return 'philosophy:general';

  // Word meanings
  if (/(mean|meaning|kya hai|explain|define|what is|batao)/.test(m)) return 'meaning';
  // Check known words
  for (const word of Object.keys(WORD_MEANINGS)) {
    if (m.includes(word)) return `word:${word}`;
  }

  // Books
  if (/(mad(h|oo)ushala|madhushala)/.test(m)) return 'book:madhushala';
  if (/(masnavi)/.test(m)) return 'book:masnavi';
  if (/(gita|bhagavad|geeta)/.test(m)) return 'book:bhagavadgita';
  if (/(ramchantri|ramcharitmanas|ramayana|tulsidas)/.test(m)) return 'book:ramcharitmanas';
  if (/(tao|laozi|lao tzu)/.test(m)) return 'book:taoching';
  if (/(meditations|marcus|aurelius)/.test(m)) return 'book:meditations';
  if (/(diwan|diwan-e-ghalib)/.test(m)) return 'book:diwan';
  if (/(book|kitab|read|padhna|literature)/.test(m)) return 'books:general';

  // Niharika
  if (/(niharika|website|platform|about niharika)/.test(m)) return 'niharika';

  // Farewells / thanks
  if (/(thank|shukriya|dhanyavad|shukran|meherbani)/.test(m)) return 'thanks';
  if (/(bye|goodbye|alvida|khuda hafiz|phir milenge)/.test(m)) return 'bye';

  return 'unknown';
}

// ============================================================
//   RESPONSE GENERATOR
// ============================================================

function generateResponse(message) {
  const intent = detectIntent(message);
  const rand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ── GREETING ──
  if (intent === 'greeting') {
    return {
      text: `🙏 **Namaste!** I am **Sakhi** - Niharika's AI poetry companion.\n\nI can help you with:\n- **Shayari** - love, life, philosophy, motivation, sad, nature\n- **Poets** - Kabir, Ghalib, Rumi, Mirabai, Dinkar, Rajan Rai and more\n- **Word meanings** - shayari, ghazal, karma, dharma...\n- **Philosophy** - Karma, Sufism, Zen, Stoicism, Vedanta\n- **Books** - Madhushala, Masnavi, Bhagavad Gita, Diwan-e-Ghalib\n- **Daily quotes** and motivation\n\nWhat would you like to explore today?`,
      suggestions: ['Give me a shayari', 'Who was Rumi?', 'What is karma?', 'Tell me about Rajan Rai', 'Today\'s motivational quote']
    };
  }

  // ── SELF INTRO ──
  if (intent === 'self_intro') {
    return {
      text: `I am **Sakhi** - the intelligent poetry assistant of **Niharika**.\n\nCreated by Rajan Rai, Sakhi is your companion for:\n- Every form of Urdu/Hindi poetry\n- Philosophical wisdom from East and West\n- Word meanings and literary terms\n- Poet biographies and their teachings\n- Book summaries from classics\n- Daily inspiration\n\n*"The mind that questions itself is already wiser than most."* - Rajan Rai`,
      suggestions: ['Tell me a shayari', 'What is a ghazal?', 'Who is Rajan Rai?', 'Give me a motivational quote']
    };
  }

  // ── HELP ──
  if (intent === 'help') {
    return {
      text: `Here is what I can do for you:\n\n**Poetry**\n- "Give me a love shayari"\n- "Tell me a sad nazm"\n- "Share a motivational sher"\n\n**Poets**\n- "Who was Kabir Das?"\n- "Tell me about Mirza Ghalib"\n- "Who is Rumi?"\n- "Tell me about Rajan Rai"\n\n**Meanings**\n- "What is a ghazal?"\n- "Explain karma"\n- "What does dharma mean?"\n\n**Philosophy**\n- "Tell me about Stoicism"\n- "What is Sufism?"\n- "Explain moksha"\n\n**Books**\n- "Tell me about Madhushala"\n- "What is the Bhagavad Gita about?"\n- "Summarise the Masnavi"\n\n**Quotes**\n- "Give me today's quote"\n- "Motivate me"\n- "Share a Rumi quote"`,
      suggestions: ['Love shayari', 'Who was Ghalib?', 'What is karma?', 'Motivate me']
    };
  }

  // ── SHAYARI ──
  if (intent.startsWith('shayari:')) {
    const cat = intent.split(':')[1];
    let pool, catName;
    if (cat === 'random') {
      const cats = Object.keys(SHAYARI);
      const selected = cats[Math.floor(Math.random() * cats.length)];
      pool = SHAYARI[selected];
      catName = selected;
    } else {
      pool = SHAYARI[cat] || SHAYARI.life;
      catName = cat;
    }
    const s = rand(pool);
    return {
      text: `Here is a **${catName}** shayari for you:\n\n---\n\n*${s.text}*\n\n- **${s.author}**\n\n---\n\nWould you like another one, or something in a different mood?`,
      suggestions: ['Another shayari', 'Love shayari', 'Motivational shayari', 'Philosophy shayari', 'What is a ghazal?']
    };
  }

  // ── POETS ──
  if (intent.startsWith('poet:')) {
    const key = intent.split(':')[1];
    const poet = POETS[key];
    if (!poet) return { text: 'I could not find that poet. Try asking about Kabir, Ghalib, Rumi, Mirabai, Dinkar, or Rajan Rai.', suggestions: ['Tell me about Kabir', 'Who was Ghalib?', 'Who is Rumi?'] };

    const q = rand(poet.famous_quotes);
    const teaching = rand(poet.teachings);
    return {
      text: `**${poet.name}** (${poet.hindi || ''})\n**Period:** ${poet.period}\n**Tradition:** ${poet.tradition}\n\n${poet.bio}\n\n---\n\n**Core Teaching:**\n*"${teaching}"*\n\n**Famous Works:** ${poet.famous_works.slice(0, 3).join(', ')}\n\n**A famous quote:**\n*"${q}"*`,
      suggestions: [`Give me a ${poet.name.split(' ')[0]} shayari`, 'Tell me about another poet', 'What is a ghazal?', 'Give me a philosophical quote']
    };
  }

  // ── QUOTES ──
  if (intent === 'quote') {
    const today = Math.floor(Date.now() / 86400000);
    const q = DAILY_QUOTES[today % DAILY_QUOTES.length];
    return {
      text: `**Today's Thought from Niharika:**\n\n---\n\n*"${q.text}"*${q.hindi ? '\n\n*"' + q.hindi + '"*' : ''}\n\n**- ${q.author}**\n\n---\n\nMay this thought stay with you today. 🌸`,
      suggestions: ['Give me another quote', 'Motivate me', 'Tell me a shayari', 'Who was Rumi?']
    };
  }

  // ── MOTIVATE ──
  if (intent === 'motivate') {
    const s = rand(SHAYARI.motivation);
    const q = rand(DAILY_QUOTES);
    return {
      text: `**For you, right now:**\n\n*"${s.text}"*\n**- ${s.author}**\n\n---\n\n*"${q.text}"*\n**- ${q.author}**\n\n---\n\nRemember: every great human being in history faced doubt, failure, and fear. The difference is they kept moving. So do you. 🌟`,
      suggestions: ['Give me another motivation', 'Tell me about Rajan Rai', 'Share a philosophy concept', 'Love shayari']
    };
  }

  // ── PHILOSOPHY ──
  if (intent.startsWith('philosophy:')) {
    const key = intent.split(':')[1];
    const content = PHILOSOPHY[key];
    if (content) {
      return {
        text: content,
        suggestions: ['Tell me about karma', 'What is Sufism?', 'Explain moksha', 'Share a Rumi quote', 'Give me a philosophical shayari']
      };
    }
    // General philosophy
    const keys = Object.keys(PHILOSOPHY);
    const randomPhil = PHILOSOPHY[keys[Math.floor(Math.random() * keys.length)]];
    return {
      text: `Philosophy is the love of wisdom - the ancient practice of asking the deepest questions about reality, existence, and how to live.\n\n${randomPhil}\n\nAsk me about: **karma, dharma, moksha, atman, Stoicism, Zen, Sufism, maya**, or the philosophy of silence.`,
      suggestions: ['What is karma?', 'What is Sufism?', 'Tell me about Zen', 'Explain moksha']
    };
  }

  // ── WORD MEANINGS ──
  if (intent.startsWith('word:')) {
    const word = intent.split(':')[1];
    return {
      text: `**${word.charAt(0).toUpperCase() + word.slice(1)}**\n\n${WORD_MEANINGS[word]}\n\nWould you like to know more literary terms?`,
      suggestions: ['What is a ghazal?', 'What is a doha?', 'What is rasa?', 'What does virah mean?']
    };
  }

  if (intent === 'meaning') {
    const m = message.toLowerCase();
    for (const [word, meaning] of Object.entries(WORD_MEANINGS)) {
      if (m.includes(word)) {
        return {
          text: `**${word.charAt(0).toUpperCase() + word.slice(1)}**\n\n${meaning}`,
          suggestions: ['What is a ghazal?', 'Explain karma', 'What is rasa?']
        };
      }
    }
    return {
      text: `I can explain many literary terms and philosophical concepts!\n\nTry asking about:\n**Poetry terms:** shayari, ghazal, sher, doha, nazm, ruba, qafiya, rasa, virah\n**Philosophy:** karma, dharma, moksha, atman, maya, dhyan, guru\n**Other:** prem, anand, satyam, ahimsa\n\nWhat would you like to know?`,
      suggestions: ['What is a ghazal?', 'What is karma?', 'Explain rasa', 'What does virah mean?']
    };
  }

  // ── BOOKS ──
  if (intent.startsWith('book:')) {
    const key = intent.split(':')[1];
    const book = BOOKS[key];
    if (book) {
      return {
        text: `**${book.title}**\n*by ${book.author} (${book.year})*\n\n${book.summary}`,
        suggestions: ['Tell me about another book', 'Share a quote from this poet', 'What is a ghazal?', 'Tell me a shayari']
      };
    }
  }

  if (intent === 'books:general') {
    const bookList = Object.values(BOOKS).map(b => `- **${b.title}** by ${b.author}`).join('\n');
    return {
      text: `Niharika's literary library includes summaries and insights from these classics:\n\n${bookList}\n\nAsk me about any of them!`,
      suggestions: ['Tell me about Madhushala', 'What is the Bhagavad Gita?', 'Summarise the Masnavi', 'Tell me about Diwan-e-Ghalib']
    };
  }

  // ── NIHARIKA ──
  if (intent === 'niharika') {
    return {
      text: `**Niharika** (निहारिका) means *a cluster of stars.*\n\nFounded by **Rajan Rai** (born 16 August 2005), Niharika is a digital literature platform dedicated to preserving Hindi and English poetry for everyone.\n\n**What Niharika offers:**\n- 45,000+ poems - kavita, doha, nazm, bhajan\n- 2,500+ poet profiles with full biographies\n- Niharika Dictionary - 200+ literary terms\n- Sakhi (me!) - your AI poetry companion\n- Knowledge Library - shayari, books, philosophers\n- Poetry Quiz - 500+ questions\n- Voice search and reading\n\n*"Great poetry should be free and accessible to every soul that loves words."* - Rajan Rai`,
      suggestions: ['Who is Rajan Rai?', 'Give me a shayari', 'What is a ghazal?', 'Tell me about Kabir Das']
    };
  }

  // ── THANKS ──
  if (intent === 'thanks') {
    return {
      text: `It is my pleasure! Niharika and Sakhi are here for you anytime.\n\n*"A thought unspoken is a poem the world never read."* - Rajan Rai\n\nKeep reading, keep questioning, keep feeling. 🌸`,
      suggestions: ['Give me a shayari', 'Today\'s quote', 'Tell me about Rumi']
    };
  }

  // ── BYE ──
  if (intent === 'bye') {
    return {
      text: `**Alvida!** Until we meet again.\n\n*"Wherever you are and whatever you do, be in love."* - Rumi\n\nNiharika is always here. Come back whenever you need poetry, wisdom, or just a good thought to start your day. 🌸`,
      suggestions: []
    };
  }

  // ── UNKNOWN ──
  const q = rand(DAILY_QUOTES);
  return {
    text: `I am not sure I fully understood that - but here is something beautiful for you:\n\n*"${q.text}"*\n**- ${q.author}**\n\n---\n\nYou can ask me about **shayari, poets, philosophy, word meanings, books**, or just say **"help"** to see everything I can do for you.`,
    suggestions: ['Give me a love shayari', 'Who was Ghalib?', 'What is karma?', 'Motivate me', 'Tell me about Rumi']
  };
}

module.exports = { generateResponse };
