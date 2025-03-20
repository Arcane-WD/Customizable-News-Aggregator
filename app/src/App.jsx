import './App.css';
import React, { useEffect,useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import NewsArticlePage from "./components/pages/NewsArticlePage";
import MainNewsPage from "./components/pages/MainNewsPage";
import ProfilePage from "./components/pages/ProfilePage";
import PreferencesPage from "./components/pages/PreferencesPage";
import TrendingPage from "./components/pages/TrendingPage";
import Header from "./components/common/Header";
import LoginSignupPage from './components/pages/LoginPage';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      navigate("/mainNews");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <>
      {isAuthenticated && <Header onLogout={handleLogout} />}

      <Routes>
        <Route path="/" element={!isAuthenticated ? <LoginSignupPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/mainNews" />} />
        <Route path="/mainNews" element={isAuthenticated ? <MainNewsPage /> : <Navigate to="/" />} />
        <Route path="/trending" element={isAuthenticated ? <TrendingPage /> : <Navigate to="/" />} />
        <Route path="/preferences" element={isAuthenticated ? <PreferencesPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/news/:id" element={isAuthenticated ? <NewsArticlePage /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
