---

# 📰 Customizable News Aggregator

A full-stack **news aggregator application** that delivers **personalized**, **summarized**, and **recommended** news content to users in a clean and responsive interface. Built with **React (Vite)** for the frontend, **Node.js/Express** for the backend API (handling scraping and authentication), and **Python** for intelligent news **summarization and recommendation** logic.

---

## ✨ Key Features

✅ **User Authentication:** Sign up and log in securely to personalize your news experience.  
✅ **Trending News:** Browse the latest trending stories from various sources.  
✅ **Personalized Feed:** News based on your selected topics and preferences.  
✅ **Recommended Articles:** Get smart recommendations based on your reading history.  
✅ **Summarized Content:** Clean, AI-powered summaries for faster reading.  

---

## 📁 Project Structure

```
Customizable-News-Aggregator
├─ app/                          # Frontend (React + Vite)
│  ├─ index.html
│  ├─ package.json
│  ├─ src/
│  │  ├─ App.jsx
│  │  ├─ App.css
│  │  ├─ assets/
│  │  │  └─ images/
│  │  ├─ components/
│  │  │  ├─ common/
│  │  │  │  ├─ Button.jsx
│  │  │  │  ├─ Footer.jsx
│  │  │  │  ├─ Header.jsx
│  │  │  │  └─ LoadSpinner.jsx
│  │  │  └─ pages/
│  │  │     ├─ SignUpLoginPage.jsx
│  │  │     ├─ MainNewsPage.jsx
│  │  │     ├─ NewsArticlePage.jsx
│  │  │     ├─ NotFoundPage.jsx
│  │  │     ├─ PreferencesPage.jsx
│  │  │     ├─ ProfilePage.jsx
│  │  │     ├─ TrendingPage.jsx
│  └─ vite.config.js
│
├─ backend/                     # Node.js Backend (News scraping & Auth)
│  └─ server.js
│
├─ backend-python/             # Python Backend (Summarization & Recommendation)
│  └─ recommend.py
│  └─ summarize.py
│
├─ .gitignore
├─ notes.md
└─ README.md
```

---

## 🧠 How It Works

1. **Frontend (React + Vite):**
   - Built with modular components and Tailwind CSS.
   - Handles routing, state management, and API interactions.
   - Users can sign up, log in, explore trending or recommended articles, and update preferences.

2. **Backend (Node.js):**
   - Handles API endpoints for user auth and news article scraping.
   - Uses external news sources to fetch latest content.
   - Stores user preferences

3. **Python Services:**
   - Summarizes article content using NLP techniques.
   - Recommends similar or personalized articles based on content

---

## 🏗️ Setup & Installation

### 🔧 Prerequisites

- Node.js and npm
- Python 3.x with required packages (like `transformers`, `sklearn`, etc.)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Customizable-News-Aggregator.git
cd Customizable-News-Aggregator
```

---

### 2️⃣ Setup Frontend

```bash
cd app
npm install
npm run dev
```

---

### 3️⃣ Setup Backend (Node.js)

```bash
cd backend
npm install
node server.js
```

---

### 4️⃣ Setup Python Backend

Install required Python packages:

```bash
cd backend-python
pip install -r requirements.txt  # if available
python python.py
```

---

## 🚀 Usage

1. Start all three services (frontend, backend, python).
2. Open the app in your browser (`http://localhost:5173` or Vite's default port).
3. Sign up and set your news preferences.
4. Browse trending news, read summaries, and check out your personalized feed.
5. Get intelligent recommendations based on your interactions.

---

## 🛠 Tech Stack

| Layer       | Technologies                                     |
|-------------|--------------------------------------------------|
| Frontend    | React, Vite, Tailwind CSS                        |
| Backend     | Node.js, Express, Cheerio (for scraping), JWT    |
| AI/NLP      | Python, Transformers, Sklearn, NLTK              |
| Deployment  | Local setup (can be extended to Docker/Cloud)    |

---

## 📸 Screenshots


---

## 📌 Future Improvements

- 🔍 Add search functionality  
- 🗂 Bookmarking or Save-for-later feature  
- 🌐 Support for multiple languages  
- 📱 Native mobile app version  
- 🧠 Advanced NLP techniques for even better summaries  

---

## 🤝 Contributing

Pull requests are welcome! Feel free to open issues or suggestions for improving the app.

---

## 📄 License

MIT License – Feel free to use and build upon this project!

---
## Authors
- [Meer Aakif](https://github.com/meer-aakif-33)
- [Shujath Nawaz](https://github.com/Arcane-WD)
