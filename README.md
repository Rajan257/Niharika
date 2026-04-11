# Niharika - Hindi and English Poetry Platform

> **"A man can do anything, when he realises he is a man."**
> - Rajan Rai, Founder of Niharika

---

## About Niharika

**Niharika** (निहारिका) means *a cluster of stars* - and that is exactly what Hindi poetry is: countless brilliant voices illuminating the human experience.

Niharika is a premium, high-performance platform for Hindi and English poetry, founded by **Rajan Rai** - a philosopher-poet born on 16 August 2005. The platform recently underwent a major upgrade, expanding from a static directory to a dynamic, MongoDB-powered database featuring **104+ world-renowned poets**.

---

## 🚀 Recent Upgrades (April 2026)

- **Mass Database Scaling**: Expanded from a dozen poets to **104+ legends** including Rumi, Ghalib, Mahadevi Verma, Shakespeare, and many others.
- **Wikipedia Ingestion Engine**: Automated sync system that pulls verified biographies and high-resolution portraits from Wikipedia.
- **Robust Routing**: Fixed the "Founder Redirection" bug with stricter ID parsing and graceful error handling.
- **PWA & Cache Stability**: Fully offline-capable directory with versioned cache-busting (v8).

---

## Project Structure

```
Niharika/
├── frontend/           # PWA Frontend (HTML/CSS/JS)
│   ├── index.html      # Homepage
│   ├── poets.html      # 104+ Poets Directory
│   ├── poet-profile.html  # Dynamic Profile Rendering
│   ├── kavita.html     # Kavita / poems listing
│   ├── library.html    # Knowledge Library
│   ├── sw.js           # Service Worker (v6)
│   └── js/
│       ├── api.js      # API client with fallback v7
│       └── main.js     # Logic
│
├── backend/            # Express API Server
│   ├── server.js       # Main server with MongoDB integration
│   ├── models/         # Mongoose Schemas (Poet, Poem, User)
│   ├── scripts/        # Ingestion & maintenance scripts
│   │   ├── wiki-ingest.js  # Wikipedia Data Sync
│   │   └── fix-specific-images.js # Asset correction
│   └── data/
│       └── master-poets.js # Master ingestion list (104 poets)
│
└── start-niharika.bat  # One-click Local Launcher
```

---

## ⚡ Features

- **104+ Verified Poets** - Complete with portraits and curated biographies.
- **Massive Poem Library** - 45,000+ entries including Kavita, Doha, Nazm, and Aphorisms.
- **Niharika Dictionary** - 2,500+ Hindi literary terms for scholars.
- **Sakhi AI Chatbot** - Intelligent poetry companion powered by Gemini API.
- **Poetry Quiz** - 500+ questions across 10 categories.
- **Rajan Rai Philosophy** - Direct access to the founder's thoughts and original works.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, Vanilla CSS, Vanilla JS, Service Workers |
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas / Mongoose |
| **Integrations** | Wikipedia REST API, Gemini Pro API (Sakhi) |
| **Typography** | Cormorant Garamond, Plus Jakarta Sans, Noto Sans Devanagari |

---

## 🏃 Running Locally

### 1. Requirements
- Node.js v18+
- Active MongoDB connection string in `backend/.env`

### 2. Environment Setup
Create a `.env` file in the `backend/` folder:
```env
MONGODB_URI=your_connection_string
PORT=5000
GEMINI_API_KEY=your_key
```

### 3. Start Niharika
Simply double-click the `start-niharika.bat` file in the root directory. It will automatically:
1. Start the Backend API (Port 5000).
2. Start the Frontend App (Port 3000).
3. Open your browser to the homepage.

---

## 🖋️ Founder

**Rajan Rai** (राजन राय)
Philosopher-Poet - Born 16 August 2005
Founder and Creative Director of Niharika

*"Every storm within you is just a sunrise waiting to break."*

---

## License

MIT License - Built with love for global Indian literature.
**© 2026 Niharika Platform**
