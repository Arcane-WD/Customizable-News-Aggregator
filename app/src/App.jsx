import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainNewsPage from './components/pages/MainNewsPage';
import PreferencesPage from './components/pages/PreferencesPage';
import ProfilePage from './components/pages/ProfilePage';
import NewsArticlePage from './components/pages/NewsArticlepage'; // Import the NewsArticlePage
import TrendingPage from './components/pages/TrendingPage';
import Header from './components/common/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<MainNewsPage />} />
        
        {/* Trending Page */}
        <Route path="/trending" element={<TrendingPage />} />
        
        {/* Preferences Page */}
        <Route path="/preferences" element={<PreferencesPage />} />
        
        {/* Profile Page */}
        <Route path="/profile" element={<ProfilePage />} />
        
        {/* News Article Page (Dynamic Route) */}
        <Route path="/news/:id" element={<NewsArticlePage />} />
      </Routes>
    </>
  );
}

export default App;