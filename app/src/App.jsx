import './App.css';
import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NewsArticlePage from "./components/pages/NewsArticlepage";
import MainNewsPage from "./components/pages/MainNewsPage";
import ProfilePage from "./components/pages/ProfilePage";
import PreferencesPage from "./components/pages/PreferencesPage";
import TrendingPage from "./components/pages/TrendingPage";
import Header from "./components/common/Header";
import LoginSignupPage from './components/pages/LoginPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // Used for redirection

  // Redirect to /mainNews after login/signup
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/mainNews");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      {/* Show header only if user is authenticated */}
      {isAuthenticated && <Header />}

      <Routes>
        {/* Default route directs users to login/signup */}
        <Route
          path="/"
          element={!isAuthenticated ? <LoginSignupPage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/mainNews" />}
        />

        {/* Main News page (after login) */}
        <Route path="/mainNews" element={isAuthenticated ? <MainNewsPage /> : <Navigate to="/" />} />

        {/* Trending Page (should be accessible after login) */}
        <Route path="/trending" element={isAuthenticated ? <TrendingPage /> : <Navigate to="/" />} />

        {/* Preferences Page (should be accessible after login) */}
        <Route path="/preferences" element={isAuthenticated ? <PreferencesPage /> : <Navigate to="/" />} />

        {/* Profile Page (should be accessible after login) */}
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />

        {/* News Article Page (Dynamic Route) */}
        <Route path="/news/:id" element={isAuthenticated ? <NewsArticlePage /> : <Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;


// import { Routes, Route } from 'react-router-dom';
// import MainNewsPage from './components/pages/MainNewsPage';
// import PreferencesPage from './components/pages/PreferencesPage';
// import ProfilePage from './components/pages/ProfilePage';
// import NewsArticlePage from './components/pages/NewsArticlepage'; // Import the NewsArticlePage
// import TrendingPage from './components/pages/TrendingPage';
// import Header from './components/common/Header';

// function App() {
//   return (
//     <>
//       <Header />
//       <Routes>
//         {/* Home Page */}
//         <Route path="/" element={<MainNewsPage />} />
        
//         {/* Trending Page */}
//         <Route path="/trending" element={<TrendingPage />} />
        
//         {/* Preferences Page */}
//         <Route path="/preferences" element={<PreferencesPage />} />
        
//         {/* Profile Page */}
//         <Route path="/profile" element={<ProfilePage />} />
        
//         {/* News Article Page (Dynamic Route) */}
//         <Route path="/news/:id" element={<NewsArticlePage />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import LoginSignup from "./components/pages/LoginPage";
// import NewsArticlePage from "./components/pages/NewsArticlepage";
// import MainNewsPage from "./components/pages/MainNewsPage";
// import ProfilePage from "./components/pages/ProfilePage";
// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   return (
//     <Routes>
//       {/* Default route directs users to login/signup */}
//       <Route path="/" element={!isAuthenticated ? <LoginSignup setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/mainNews" />} />

//       {/* Main News page (after login) */}
//       <Route path="/mainNews" element={isAuthenticated ? <MainNewsPage /> : <Navigate to="/" />} />

//       {/* News Article page (should be accessible after login) */}
//       <Route path="/newsArticle" element={isAuthenticated ? <NewsArticlePage /> : <Navigate to="/" />} />

//       {/* Profile Page (should be accessible after login) */}
//       <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />
//     </Routes>
//   );
// }

// export default App;
