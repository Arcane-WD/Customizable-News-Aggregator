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


---

## 🛠️ Setup Instructions (Windows)

### 🔁 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/Customizable-News-Aggregator.git
cd Customizable-News-Aggregator
```

---

### 📦 2. Install Root Dependencies

```bash
npm install
```

---

### 📦 3. Setup React Frontend

```bash
cd app
npm install
cd ..
```

---

### 📦 4. Setup Node.js Backend

```bash
cd backend
npm install
cd ..
```

---

### 🐍 5. Setup Python Backend

#### a. Navigate to Python directory:

```bash
cd backend-python
```

#### b. Create virtual environment:

```bash
python -m venv venv
```

#### c. Activate the environment:

```bash
venv\Scripts\activate
```

#### d. Install required Python packages:

```bash
pip install -r requirements.txt
```

If `requirements.txt` doesn't exist, you can do:

```bash
pip install flask pandas
```

Then export:

```bash
pip freeze > requirements.txt
```

#### e. Go back to root:

```bash
deactivate
cd ..
```

---

### 📄 6. Make Sure These Two Files Exist in Root

#### `run-summarize.bat`
```bat
cd backend-python
call venv\Scripts\activate
python summarize.py
```

#### `run-recommend.bat`
```bat
cd backend-python
call venv\Scripts\activate
python recommend.py
```

---

### 🚀 7. Start the Entire Project

From the **project root**:

```bash
npm start
```

This will run:
- 🟦 React frontend (http://localhost:5173)
- 🟩 Node.js backend (http://localhost:5000)
- 🟪 Python summarize service
- 🔵 Python recommend service

---

## ✅ Requirements

- Node.js (v16 or above recommended)
- Python 3.8+
- Git
- Windows CMD or PowerShell

---


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
- [Harshavardhan](https://github.com/Arcane-WD)


