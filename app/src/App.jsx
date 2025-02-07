// import './App.css'
// import MainNewsPage from './components/pages/MainNewsPage'
// import SignupPage from './components/pages/SignupPage'
// import PreferencesPage from './components/pages/PreferencesPage'
// import NewsArticlepage from './components/pages/NewsArticlepage'
// import Header from './components/common/Header'

import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainNewsPage from './components/pages/MainNewsPage';
import SignupPage from './components/pages/SignupPage';
import PreferencesPage from './components/pages/PreferencesPage';
import NewsArticlePage from './components/pages/NewsArticlepage'; // Uncommented this line
import Header from './components/common/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainNewsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/news/:id" element={<NewsArticlePage />} /> {/* Added dynamic route */}
      </Routes>
    </>
  );
}

export default App;