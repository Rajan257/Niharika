const poets = [
  { wikiSearch: "Faiz Ahmad Faiz", fallbackName: "Faiz Ahmed Faiz", hindi: "फ़ैज़ अहमद फ़ैज़", category: "modern", tags: ["urdu", "progressive", "revolutionary"], color: "#8B0000", initials: "फ़ै", speciality: "Nazm, Ghazal", poems: [
      { title: "Hum Dekhenge", text: "हम देखेंगे\nलाज़िम है कि हम भी देखेंगे\nवो दिन कि जिसका वादा है\nजो लौह-ए-अज़ल में लिखा है", form: "Nazm", category: "revolutionary", isHindi: true },
      { title: "Mujh Se Pehli Si", text: "मुझ से पहली सी मोहब्बत मेरे महबूब न माँग\nमैंने समझा था कि तू है तो दरख़्शाँ है हयात", form: "Ghazal", category: "love", isHindi: true }
  ]},
  { wikiSearch: "Sahir Ludhianvi", fallbackName: "Sahir Ludhianvi", hindi: "साहिर लुधियानवी", category: "modern", tags: ["urdu", "progressive", "film"], color: "#1A237E", initials: "सा", speciality: "Romantic & Revolutionary Poetry", poems: [
      { title: "Kabhie Kabhie", text: "कभी कभी मेरे दिल में ख़याल आता है\nकि जैसे तुझको बनाया गया है मेरे लिए", form: "Film Lyric", category: "love", isHindi: true },
      { title: "Taj Mahal", text: "इक शहंशाह ने दौलत का सहारा ले कर\nहम ग़रीबों की मोहब्बत का उड़ाया है मज़ाक़", form: "Nazm", category: "social", isHindi: true }
  ]},
  { wikiSearch: "Tulsidas", fallbackName: "Tulsidas", hindi: "तुलसीदास", category: "classical", tags: ["hindi", "bhakti", "awadhi"], color: "#7B3F00", initials: "तु", speciality: "Chaupai, Ramcharitmanas", poems: [
      { title: "Mangal Bhavan", text: "मंगल भवन अमंगल हारी।\nद्रवहु सो दशरथ अजिर बिहारी।।", form: "Chaupai", category: "devotional", isHindi: true },
      { title: "Hanuman Chalisa Excerpt", text: "बुद्धिहीन तनु जानिके, सुमिरौ पवन कुमार।\nबल बुधि बिद्या देहु मोहिं, हरहु कलेस बिकार।।", form: "Doha", category: "devotional", isHindi: true }
  ]},
  { wikiSearch: "John Keats", fallbackName: "John Keats", hindi: "जॉन कीट्स", category: "classical", tags: ["english", "romantic", "ode"], color: "#004D40", initials: "J", speciality: "Ode, Sonnet", poems: [
      { title: "Ode to a Nightingale", text: "My heart aches, and a drowsy numbness pains\nMy sense, as though of hemlock I had drunk.", form: "Ode", category: "nature", isHindi: false },
      { title: "Endymion", text: "A thing of beauty is a joy for ever:\nIts loveliness increases; it will never\nPass into nothingness.", form: "Epic", category: "philosophical", isHindi: false }
  ]},
  { wikiSearch: "Amrita Pritam", fallbackName: "Amrita Pritam", hindi: "अमृता प्रीतम", category: "modern", tags: ["punjabi", "hindi", "feminist"], color: "#880E4F", initials: "अ", speciality: "Feminist Poetry, Partition", poems: [
      { title: "Ajj Aakhaan Waris Shah Nu", text: "आज आखाँ वारिस शाह नूँ, कित्तहों क़बरां विचों बोल\nते अज्ज किताब-ए-इश्क़ दा, कोई अगला वरक़ा फोल", form: "Elegy", category: "sadness", isHindi: true },
      { title: "Mera Pata", text: "आज मैंने अपने घर का नंबर मिटाया है\nऔर गली के माथे पर लगा नाम हटाया है\nहर सड़क की दिशा पोंछ दी है।", form: "Free Verse", category: "philosophical", isHindi: true }
  ]},
  { wikiSearch: "Rabindranath Tagore", fallbackName: "Rabindranath Tagore", hindi: "रवीन्द्रनाथ टैगोर", category: "modern", tags: ["bengali", "nobel", "nature"], color: "#E65100", initials: "र", speciality: "Gitanjali, Prose Poetry", poems: [
      { title: "Where the mind is without fear", text: "Where the mind is without fear and the head is held high;\nWhere knowledge is free;\nWhere the world has not been broken up into fragments by narrow domestic walls;", form: "Free Verse", category: "patriotic", isHindi: false },
      { title: "Leave This Chanting", text: "Leave this chanting and singing and telling of beads!\nWhom dost thou worship in this lonely dark corner of a temple with doors all shut?\nOpen thine eyes and see thy God is not before thee!", form: "Gitanjali", category: "spiritual", isHindi: false }
  ]},
  { wikiSearch: "Pablo Neruda", fallbackName: "Pablo Neruda", hindi: "पाब्लो नेरुदा", category: "contemporary", tags: ["spanish", "nobel", "surrealist"], color: "#1B5E20", initials: "P", speciality: "Love Poems, Odes", poems: [
      { title: "Tonight I Can Write", text: "Tonight I can write the saddest lines.\nWrite, for example, 'The night is starry and the stars, blue and shiver in the distance.'", form: "Free Verse", category: "sadness", isHindi: false },
      { title: "If You Forget Me", text: "If you think it long and mad,\nthe wind of banners\nthat passes through my life,\nand you decide\nto leave me at the shore\nof the heart where I have roots,\nremember\nthat on that day,\nat that hour,\nI shall lift my arms\nand my roots will set off\nto seek another land.", form: "Love", category: "love", isHindi: false }
  ]},
  { wikiSearch: "Allama Iqbal", fallbackName: "Muhammad Iqbal", hindi: "अल्लामा इक़बाल", category: "modern", tags: ["urdu", "persian", "philosophical"], color: "#4E342E", initials: "इ", speciality: "Nazm, Tarana", poems: [
      { title: "Sare Jahan se Accha", text: "सारे जहाँ से अच्छा हिन्दोस्ताँ हमारा\nहम बुलबुलें हैं इसकी ये गुलसिताँ हमारा", form: "Tarana", category: "patriotic", isHindi: true },
      { title: "Khudi", text: "ख़ुदी को कर बुलंद इतना कि हर तक़दीर से पहले\nख़ुदा बंदे से ख़ुद पूछे, बता तेरी रज़ा क्या है", form: "Sher", category: "motivational", isHindi: true }
  ]},
  { wikiSearch: "Robert Frost", fallbackName: "Robert Frost", hindi: "रॉबर्ट फ़्रॉस्ट", category: "modern", tags: ["english", "american", "nature"], color: "#37474F", initials: "R", speciality: "Rural Themes, Blank Verse", poems: [
      { title: "The Road Not Taken", text: "Two roads diverged in a wood, and I—\nI took the one less traveled by,\nAnd that has made all the difference.", form: "Lyric", category: "philosophical", isHindi: false },
      { title: "Stopping by Woods on a Snowy Evening", text: "The woods are lovely, dark and deep,\nBut I have promises to keep,\nAnd miles to go before I sleep,\nAnd miles to go before I sleep.", form: "Lyric", category: "nature", isHindi: false }
  ]},
  { wikiSearch: "Parveen Shakir", fallbackName: "Parveen Shakir", hindi: "परवीन शाकिर", category: "contemporary", tags: ["urdu", "feminist"], color: "#AD1457", initials: "प", speciality: "Ghazal, Free Verse", poems: [
      { title: "Woh Humsafar Tha", text: "वो हमसफ़र था मगर उस से हमनवाई न थी \nकि धूप छाँव का आलम रहा जुदाई न थी", form: "Ghazal", category: "sadness", isHindi: true },
      { title: "Ku-ba-Ku Phail Gayi", text: "कू-ब-कू फैल गई बात शनासाई की\nउसने ख़ुशबू की तरह मेरी पज़ीराई की", form: "Ghazal", category: "love", isHindi: true }
  ]},
  { wikiSearch: "Suryakant Tripathi Nirala", fallbackName: "Nirala", hindi: "सूर्यकान्त त्रिपाठी 'निराला'", category: "modern", tags: ["hindi", "chhayawad"], color: "#bf360c", initials: "नि", speciality: "Mukt Chhand, Nature", poems: [
      { title: "Var de, Veena Vadini Var De", text: "वर दे, वीणावादिनी वर दे !\nप्रिय स्वतंत्र-रव अमृत-मंत्र नव\nभारत में भर दे !", form: "Vandana", category: "devotional", isHindi: true },
      { title: "Bhikshuk", text: "वह आता-\nदो टूक कलेजे के करता, पछताता\nपथ पर आता।\nपेट पीठ दोनों मिलकर हैं एक,\nचल रहा लकुटिया टेक", form: "Nayi Kavita", category: "social", isHindi: true }
  ]},
  { wikiSearch: "Basho", fallbackName: "Matsuo Basho", hindi: "मात्सुओ बाशो", category: "classical", tags: ["japanese", "haiku", "nature"], color: "#2E3B32", initials: "B", speciality: "Haiku", poems: [
      { title: "The Old Pond", text: "An old silent pond...\nA frog jumps into the pond,\nsplash! Silence again.", form: "Haiku", category: "nature", isHindi: false },
      { title: "Autumn Moonlight", text: "Autumn moonlight—\na worm digs silently\ninto the chestnut.", form: "Haiku", category: "nature", isHindi: false }
  ]},
  { wikiSearch: "Dushyant Kumar", fallbackName: "Dushyant Kumar", hindi: "दुष्यंत कुमार", category: "modern", tags: ["hindi", "ghazal", "political"], color: "#4E342E", initials: "दु", speciality: "Political Ghazal", poems: [
      { title: "Ho Gayi Hai Peer", text: "हो गई है पीर पर्वत-सी पिघलनी चाहिए,\nइस हिमालय से कोई गंगा निकलनी चाहिए।\nमेरे सीने में नहीं तो तेरे सीने में सही,\nहो कहीं भी आग, लेकिन आग जलनी चाहिए।", form: "Ghazal", category: "revolutionary", isHindi: true },
      { title: "Kahan To Tay Tha", text: "कहाँ तो तय था चिरागाँ हर एक घर के लिए,\nकहाँ चिराग मयस्सर नहीं शहर के लिए।", form: "Ghazal", category: "social", isHindi: true }
  ]},
  { wikiSearch: "Sarojini Naidu", fallbackName: "Sarojini Naidu", hindi: "सरोजिनी नायडू", category: "modern", tags: ["english", "indian", "nature"], color: "#FF8F00", initials: "S", speciality: "Lyric Poetry", poems: [
      { title: "In the Bazaars of Hyderabad", text: "What do you sell O ye merchants?\nRichly your wares are displayed.\nTurbans of crimson and silver,\nTunics of purple brocade.", form: "Lyric", category: "social", isHindi: false },
      { title: "Palanquin Bearers", text: "Lightly, O lightly we bear her along,\nShe sways like a flower in the wind of our song.", form: "Lyric", category: "nature", isHindi: false }
  ]},
  { wikiSearch: "Nida Fazli", fallbackName: "Nida Fazli", hindi: "निदा फ़ाज़ली", category: "contemporary", tags: ["urdu", "hindi", "secular"], color: "#616161", initials: "नि", speciality: "Doha, Ghazal", poems: [
      { title: "Kabhi Kisi Ko Mukammal", text: "कभी किसी को मुकम्मल जहाँ नहीं मिलता\nकहीं ज़मीन तो कहीं आसमां नहीं मिलता", form: "Ghazal", category: "philosophical", isHindi: true },
      { title: "Duniya Jise Kehte Hain", text: "दुनिया जिसे कहते हैं जादू का खिलौना है\nमिल जाए तो मिट्टी है, खो जाए तो सोना है", form: "Doha", category: "philosophical", isHindi: true }
  ]},
  { wikiSearch: "Mirza Ghalib", fallbackName: "Mirza Ghalib", hindi: "मिर्ज़ा ग़ालिब", category: "classical", tags: ["urdu", "persian", "philosophical"], color: "#3E2723", initials: "ग़ा", speciality: "Ghazal, Rubai", poems: [
      { title: "Dil-e-Nadan", text: "दिल-ए-नादान तुझे हुआ क्या है\nआख़िर इस दर्द की दवा क्या है", form: "Ghazal", category: "love", isHindi: true },
      { title: "Hazaron Khwaishen Aisi", text: "हज़ारों ख़्वाइशें ऐसी कि हर ख़्वाइश पे दम निकले\nबहुत निकले मेरे अरमान लेकिन फिर भी कम निकले", form: "Ghazal", category: "philosophical", isHindi: true }
  ]},
  { wikiSearch: "Kahlil Gibran", fallbackName: "Khalil Gibran", hindi: "खलील जिब्रान", category: "contemporary", tags: ["english", "arabic", "philosophical"], color: "#006064", initials: "ख", speciality: "The Prophet, Prose Poetry", poems: [
      { title: "On Love", text: "When love beckons to you, follow him,\nThough his ways are hard and steep.\nAnd when his wings enfold you yield to him,\nThough the sword hidden among his pinions may wound you.", form: "Prose Poem", category: "love", isHindi: false },
      { title: "On Children", text: "Your children are not your children.\nThey are the sons and daughters of Life's longing for itself.", form: "Prose Poem", category: "philosophical", isHindi: false }
  ]},
  { wikiSearch: "Jaun Elia", fallbackName: "Jaun Elia", hindi: "जौन एलिया", category: "contemporary", tags: ["urdu", "nihilism", "anarchist"], color: "#212121", initials: "जौ", speciality: "Ghazal, Nazm", poems: [
      { title: "Tumne Chaha Hi Nahi", text: "तुम ने चाहा ही नहीं हालात बदल सकते थे\nमेरे आँसू तुम्हारी आँखों से निकल सकते थे", form: "Ghazal", category: "sadness", isHindi: true },
      { title: "Zindagi Ki Haqeeqat", text: "ज़िन्दगी इक फ़न है लम्हों को अपने अंदाज़ से गँवाने को", form: "Sher", category: "philosophical", isHindi: true }
  ]},
  { wikiSearch: "Mahadevi Varma", fallbackName: "Mahadevi Verma", hindi: "महादेवी वर्मा", category: "modern", tags: ["hindi", "chhayawad", "mysticism"], color: "#4A148C", initials: "म", speciality: "Mysticism, Lyrical Poetry", poems: [
      { title: "Main Neer Bhari Dukh Ki Badli", text: "मैं नीर भरी दुख की बदली !\nस्पंदन में चिर निस्पंद बसा,\nक्रंदन में आहत विश्व हँसा,", form: "Geet", category: "sadness", isHindi: true },
      { title: "Yama Excerpt", text: "पंथ रहने दो अपरिचित\nप्राण रहने दो अकेला!", form: "Kavita", category: "philosophical", isHindi: true }
  ]},
  { wikiSearch: "Kabir", fallbackName: "Kabir Das", hindi: "कबीर दास", category: "classical", tags: ["hindi", "bhakti", "secular"], color: "#E65100", initials: "क", speciality: "Doha, Sabad", poems: [
      { title: "Moko Kahan Dhoondhe Re Bande", text: "मोको कहाँ ढूँढ़े रे बंदे, मैं तो तेरे पास में।\nना तीरथ में, ना मूरत में, ना एकांत निवास में।", form: "Sabad", category: "spiritual", isHindi: true },
      { title: "Kahat Kabir Suno Bhai Sadho", text: "कहत कबीर सुनो भाई साधो, सब स्वासों की स्वास में।", form: "Sakhi", category: "spiritual", isHindi: true }
  ]},
  { wikiSearch: "William Shakespeare", fallbackName: "William Shakespeare", hindi: "विलियम शेक्सपियर", category: "classical", tags: ["english", "sonnet", "drama"], color: "#1B5E20", initials: "S", speciality: "Sonnet, Blank Verse", poems: [
      { title: "Sonnet 18", text: "Shall I compare thee to a summer’s day?\nThou art more lovely and more temperate:\nRough winds do shake the darling buds of May,\nAnd summer’s lease hath all too short a date.", form: "Sonnet", category: "love", isHindi: false },
      { title: "To be, or not to be", text: "To be, or not to be, that is the question:\nWhether 'tis nobler in the mind to suffer\nThe slings and arrows of outrageous fortune,\nOr to take arms against a sea of troubles\nAnd by opposing end them.", form: "Soliloquy", category: "philosophical", isHindi: false }
  ]},
  { wikiSearch: "Emily Dickinson", fallbackName: "Emily Dickinson", hindi: "एमिली डिकिंसन", category: "classical", tags: ["english", "american", "lyrical"], color: "#F06292", initials: "E", speciality: "Lyrical Poetry", poems: [
      { title: "Hope is the thing with feathers", text: "“Hope” is the thing with feathers -\nThat perches in the soul -\nAnd sings the tune without the words -\nAnd never stops - at all -", form: "Lyric", category: "motivational", isHindi: false },
      { title: "Because I could not stop for Death", text: "Because I could not stop for Death –\nHe kindly stopped for me –\nThe Carriage held but just Ourselves –\nAnd Immortality.", form: "Lyric", category: "philosophical", isHindi: false }
  ]},
  { wikiSearch: "Rumi", fallbackName: "Rumi", hindi: "रूमी", category: "classical", tags: ["persian", "sufi", "love"], color: "#FF6D00", initials: "र", speciality: "Masnavi, Ghazal", poems: [
      { title: "The Guest House", text: "This being human is a guest house.\nEvery morning a new arrival.", form: "Masnavi", category: "philosophical", isHindi: false },
      { title: "Only Breath", text: "I am not Christian or Jew or Muslim, not Hindu,\nBuddhist, Sufi, or Zen. Not any religion\nor cultural system. I am not from the East\nor the West, not out of the ocean or up\nfrom the ground, not natural or ethereal, not\ncomposed of elements at all.", form: "Ghazal", category: "spiritual", isHindi: false }
  ]},
  { wikiSearch: "Walt Whitman", fallbackName: "Walt Whitman", hindi: "वॉल्ट व्हिटमैन", category: "modern", tags: ["english", "american", "free verse"], color: "#2E7D32", initials: "W", speciality: "Leaves of Grass, Free Verse", poems: [
      { title: "O Captain! My Captain!", text: "O Captain! my Captain! our fearful trip is done,\nThe ship has weather’d every rack, the prize we sought is won,\nThe port is near, the bells I hear, the people all exulting,", form: "Elegy", category: "patriotism", isHindi: false },
      { title: "Song of Myself Excerpt", text: "I celebrate myself, and sing myself,\nAnd what I assume you shall assume,\nFor every atom belonging to me as good belongs to you.", form: "Free Verse", category: "philosophical", isHindi: false }
  ]},
  { wikiSearch: "William Wordsworth", fallbackName: "William Wordsworth", hindi: "विलियम वर्ड्सवर्थ", category: "classical", tags: ["english", "romantic", "nature"], color: "#388E3C", initials: "W", speciality: "Romantic Poetry", poems: [
      { title: "Daffodils", text: "I wandered lonely as a cloud\nThat floats on high o'er vales and hills,\nWhen all at once I saw a crowd,\nA host, of golden daffodils;", form: "Lyric", category: "nature", isHindi: false },
      { title: "Tintern Abbey", text: "For I have learned\nTo look on nature, not as in the hour\nOf thoughtless youth; but hearing oftentimes\nThe still, sad music of humanity,", form: "Blank Verse", category: "philosophical", isHindi: false }
  ]},
  { wikiSearch: "Sylvia Plath", fallbackName: "Sylvia Plath", hindi: "सिल्विया प्लाथ", category: "contemporary", tags: ["english", "confessional", "dark"], color: "#424242", initials: "P", speciality: "Confessional Poetry", poems: [
      { title: "Lady Lazarus", text: "I have done it again.\nOne year in every ten\nI manage it——", form: "Free Verse", category: "sadness", isHindi: false },
      { title: "Mirror", text: "I am silver and exact. I have no preconceptions.\nWhatever I see I swallow immediately\nJust as it is, unmisted by love or dislike.", form: "Free Verse", category: "philosophical", isHindi: false }
  ]},
  { wikiSearch: "Maya Angelou", fallbackName: "Maya Angelou", hindi: "माया एंजेलो", category: "contemporary", tags: ["english", "african-american", "activist"], color: "#D84315", initials: "A", speciality: "Autobiographical Poetry", poems: [
      { title: "Still I Rise", text: "You may write me down in history\nWith your bitter, twisted lies,\nYou may trod me in the very dirt\nBut still, like dust, I'll rise.", form: "Lyric", category: "motivational", isHindi: false },
      { title: "Caged Bird", text: "A free bird leaps\non the back of the wind\nand floats downstream\ntill the current ends\nand dips his wing\nin the orange sun rays\nand dares to claim the sky.", form: "Lyric", category: "social", isHindi: false }
  ]},
  { wikiSearch: "Langston Hughes", fallbackName: "Langston Hughes", hindi: "लैंगस्टन ह्यूजेस", category: "modern", tags: ["english", "jazz poetry", "activist"], color: "#3F51B5", initials: "H", speciality: "Jazz Poetry", poems: [
      { title: "Dream Deferred", text: "What happens to a dream deferred?\n\nDoes it dry up\nlike a raisin in the sun?\nOr fester like a sore—\nAnd then run?", form: "Lyric", category: "philosophical", isHindi: false },
      { title: "The Negro Speaks of Rivers", text: "I've known rivers:\nI've known rivers ancient as the world and older than the\nflow of human blood in human veins.\n\nMy soul has grown deep like the rivers.", form: "Lyric", category: "social", isHindi: false }
  ]},
  { wikiSearch: "Matsuo Bashō", fallbackName: "Matsuo Basho", hindi: "मात्सुओ बाशो", category: "classical", tags: ["japanese", "haiku", "zen"], color: "#1B5E20", initials: "ब", speciality: "Haiku", poems: [
      { title: "The Old Pond", text: "An old silent pond...\nA frog jumps into the pond,\nsplash! Silence again.", form: "Haiku", category: "nature", isHindi: false },
      { title: "Autumn Moonlight", text: "Autumn moonlight—\na worm digs silently\ninto the chestnut.", form: "Haiku", category: "nature", isHindi: false }
  ]},
  { wikiSearch: "Li Bai", fallbackName: "Li Bai", hindi: "ली बाई", category: "classical", tags: ["chinese", "tang dynasty", "nature"], color: "#D50000", initials: "L", speciality: "Tang Poetry", poems: [
      { title: "Quiet Night Thought", text: "Before my bed, the moonlight is shining,\nI thought it was frost on the ground.\nI lift my head to watch the bright moon,\nI lower my head to think of my home.", form: "Lyric", category: "sadness", isHindi: false },
      { title: "Drinking Alone by Moonlight", text: "Among the flowers from a pot of wine\nI drink alone beneath the bright moonshine.", form: "Lyric", category: "philosophical", isHindi: false }
  ]},
  { wikiSearch: "Agha Shahid Ali", fallbackName: "Agha Shahid Ali", hindi: "आगा शाहिद अली", category: "contemporary", tags: ["english", "ghazal", "exile"], color: "#4527A0", initials: "A", speciality: "English Ghazal", poems: [
      { title: "Tonight", text: "Where are you now? Who lies beneath your spell tonight?\nBefore you left, Heaven was a Word, a Well tonight.", form: "Ghazal", category: "sadness", isHindi: false },
      { title: "Postcard from Kashmir", text: "Kashmir shrinks into my mailbox,\nmy home a four-by-six-inch pull of Himalayas.", form: "Lyric", category: "sadness", isHindi: false }
  ]},
  { wikiSearch: "Rahat Indori", fallbackName: "Rahat Indori", hindi: "राहत इंदौरी", category: "contemporary", tags: ["urdu", "mushaira", "bold"], color: "#E91E63", initials: "रा", speciality: "Mushaira, Ghazal", poems: [
      { title: "Bulati Hai Magar", text: "बुलाती है मगर जाने का नईं\nवो दुनिया है उधर जाने का नईं", form: "Ghazal", category: "social", isHindi: true },
      { title: "Sabhi Ka Khoon", text: "सभी का ख़ून शामिल है यहाँ की मिट्टी में\nकिसी के बाप का हिन्दोस्तान थोड़ी है", form: "Sher", category: "patriotism", isHindi: true }
  ]},
  { wikiSearch: "Bashir Badr", fallbackName: "Bashir Badr", hindi: "बशीर बद्र", category: "contemporary", tags: ["urdu", "romantic", "soft"], color: "#FF9800", initials: "ब", speciality: "Romance, Ghazal", poems: [
      { title: "Ujala Apni Yaadon Ka", text: "उजाला अपनी यादों का हमारे साथ रहने दो\nन जाने किस गली में ज़िन्दगी की शाम हो जाए", form: "Ghazal", category: "love", isHindi: true },
      { title: "Dushmani Jamkar Karo", text: "दुश्मनी जमकर करो लेकिन ये गुंजाइश रहे\nजब कभी हम दोस्त बन जाएँ तो शर्मिंदा न हों", form: "Ghazal", category: "social", isHindi: true }
  ]},
  { wikiSearch: "Oscar Wilde", fallbackName: "Oscar Wilde", hindi: "ऑस्कर वाइल्ड", category: "classical", tags: ["english", "wit", "aestheticism"], color: "#6A1B9A", initials: "W", speciality: "Wit, Lyrical Ballads", poems: [
      { title: "The Ballad of Reading Gaol", text: "And all men kill the thing they love,\nBy all let this be heard,\nSome do it with a bitter look,\nSome with a flattering word,", form: "Ballad", category: "sadness", isHindi: false },
      { title: "Symphony in Yellow", text: "An omnibus across the bridge\nCrawls like a yellow butterfly,\nAnd, here and there, a passer-by\nShows like a little restless midge.", form: "Lyric", category: "nature", isHindi: false }
  ]},
  { wikiSearch: "Edgar Allan Poe", fallbackName: "Edgar Allan Poe", hindi: "एडगर एलन पो", category: "classical", tags: ["english", "gothic", "macabre"], color: "#212121", initials: "P", speciality: "Gothic Poetry", poems: [
      { title: "The Raven", text: "Once upon a midnight dreary, while I pondered, weak and weary,\nOver many a quaint and curious volume of forgotten lore—\nWhile I nodded, nearly napping, suddenly there came a tapping,", form: "Narrative", category: "sadness", isHindi: false },
      { title: "Annabel Lee", text: "It was many and many a year ago,\nIn a kingdom by the sea,\nThat a maiden there lived whom you may know\nBy the name of Annabel Lee;", form: "Lyric", category: "love", isHindi: false }
  ]},
  { wikiSearch: "Kumar Vishwas", fallbackName: "Kumar Vishwas", hindi: "कुमार विश्वास", category: "contemporary", tags: ["hindi", "romantic", "mushaira"], color: "#FB8C00", initials: "कु", speciality: "Lyrical Romance", poems: [
      { title: "Koi Deewana Kehta Hai", text: "कोई दीवाना कहता है, कोई पागल समझता है !\nमगर धरती की बेचैनी को बस बादल समझता है !!", form: "Geet", category: "love", isHindi: true },
      { title: "Ek Pagli Ladki", text: "दोस्तो! एक पगली लड़की थी जो प्यार के सपने बुनती थी !", form: "Geet", category: "love", isHindi: true }
  ]}
];

const fs = require('fs');
fs.writeFileSync('backend/data/master-poets.js', 'module.exports = ' + JSON.stringify(poets, null, 2) + ';');
console.log('Master poets list updated to 40+ legends.');
