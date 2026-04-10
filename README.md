# Niharika - Hindi and English Poetry Platform

> **"A man can do anything, when he realises he is a man."**
> - Rajan Rai, Founder of Niharika

---

## About Niharika

**Niharika** (निहारिका) means *a cluster of stars* - and that is exactly what Hindi poetry is: countless brilliant voices illuminating the human experience.

Niharika is a premium platform for Hindi and English poetry, founded by **Rajan Rai** - a philosopher-poet born on 16 August 2005. The platform is dedicated to preserving and celebrating the rich tradition of Hindi literature so it remains free and accessible to every soul that loves words.

---

## Project Structure

```
Niharika/
├── frontend/           # All client-side files
│   ├── index.html      # Homepage
│   ├── poets.html      # Poets directory
│   ├── poet-profile.html  # Individual poet profiles
│   ├── kavita.html     # Kavita / poems listing
│   ├── dictionary.html # Niharika Dictionary
│   ├── library.html    # Knowledge Library (Shayari, Books, Phil.)
│   ├── chatbot.html    # Sakhi AI Chatbot
│   ├── quiz.html       # Poetry Quiz
│   ├── blog.html       # Literary Blog
│   ├── videos.html     # Poetry Videos
│   ├── ebooks.html     # Free E-Books
│   ├── sher.html       # Sher / Couplets
│   ├── css/
│   │   └── style.css   # Design system
│   ├── js/
│   │   ├── api.js      # API client with fallback data
│   │   ├── utils.js    # Shared utilities
│   │   └── main.js     # Homepage logic
│   └── assets/         # Images, fonts, icons
│
├── backend/            # All server-side code
│   ├── server.js       # Express server
│   ├── db.json         # Flat-file database
│   ├── package.json    # Node.js dependencies
│   └── routes/
│       └── chatbot.js  # Sakhi chatbot engine
│
└── README.md
```

---

## Features

- **45,000+ Poems** - Kavita, Doha, Nazm, Bhajan, Aphorism
- **2,500+ Poets** - Classical, Modern, and Contemporary
- **Niharika Dictionary** - 200+ Hindi literary terms with pronunciation
- **Sakhi Chatbot** - Intelligent poetry companion powered by rule-based AI
- **Poetry Quiz** - 500+ questions across 10 categories
- **Poet Profiles** - Full biography, poetry library, and quotes
- **Rajan Rai Section** - Founder's philosophical works and daily thoughts
- **Video Library** - Kavi Sammelan, Bhajan, and recitation videos
- **Literary Blog** - In-depth articles on poetry and poets

---

## Running Locally

### Requirements
- Node.js v16+
- npm

### Start

```bash
cd backend
npm install
node server.js
```

Open your browser at: **http://localhost:5000**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, Vanilla CSS, Vanilla JavaScript |
| Backend | Node.js + Express |
| Database | JSON flat-file (db.json) |
| Fonts | Cormorant Garamond, Plus Jakarta Sans, Noto Sans Devanagari |

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/poets` | All poets (filterable) |
| GET | `/api/poets/:id` | Single poet with poems |
| GET | `/api/poems` | All poems (filterable) |
| POST | `/api/poems/:id/like` | Like a poem |
| GET | `/api/dictionary` | Full dictionary |
| GET | `/api/dictionary/:word` | Word lookup |
| POST | `/api/chatbot/message` | Sakhi chatbot response |
| GET | `/api/quotes/daily` | Daily quote by Rajan Rai |
| GET | `/api/search?q=` | Full-text search |
| POST | `/api/subscribe` | Newsletter subscription |
| GET | `/api/health` | Server health check |

---

## Founder

**Rajan Rai** (राजन राय)
Philosopher-Poet - Born 16 August 2005
Founder and Creative Director of Niharika

*"Every storm within you is just a sunrise waiting to break."*

---

## License

MIT License - Free to use, modify, and distribute.
Built with love for Hindi poetry and Indian literature.
