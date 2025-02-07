
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainNewsPage from './components/pages/MainNewsPage';
import PreferencesPage from './components/pages/PreferencesPage';
import ProfilePage from './components/pages/ProfilePage';
import NewsArticlePage from './components/pages/NewsArticlepage'; // Uncommented this line
import TrendingPage from './components/pages/TrendingPage';
import Header from './components/common/Header';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainNewsPage />} />
        <Route path="/trending" element={<TrendingPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Added dynamic route */}
      </Routes>
    </>
  );
}

export default App;