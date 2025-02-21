import './App.css';
import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NewsArticlePage from "./components/pages/NewsArticlepage";
import MainNewsPage from "./components/pages/MainNewsPage";
import ProfilePage from "./components/pages/ProfilePage";
import PreferencesPage from "./components/pages/PreferencesPage";
import TrendingPage from "./components/pages/TrendingPage";
import Header from "./components/common/Header";
import LoginSignupPage from './components/pages/LoginPage';

function App() {
  // Hardcoded authentication flag
  const isAuthenticated = true;
  const navigate = useNavigate();

  // Automatically redirect to /mainNews if the user is authenticated
  React.useEffect(() => {
    // Only redirect if the current pathname is "/"
    if (isAuthenticated && location.pathname === "/") {
      navigate("/mainNews");
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <>
      {/* Show header only if user is authenticated */}
      {isAuthenticated && <Header />}

      <Routes>
        {/* Default route directs users to login/signup if not authenticated */}
        <Route
          path="/"
          element={!isAuthenticated ? <LoginSignupPage /> : <Navigate to="/mainNews" />}
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

// import './App.css';
// import React from "react";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import NewsArticlePage from "./components/pages/NewsArticlepage";
// import MainNewsPage from "./components/pages/MainNewsPage";
// import ProfilePage from "./components/pages/ProfilePage";
// import PreferencesPage from "./components/pages/PreferencesPage";
// import TrendingPage from "./components/pages/TrendingPage";
// import Header from "./components/common/Header";
// import LoginSignupPage from './components/pages/LoginPage';

// function App() {
//   // Hardcoded authentication flag
//   const isAuthenticated = false;
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Automatically redirect to /mainNews if the user is authenticated
//   React.useEffect(() => {
//     if (isAuthenticated && location.pathname === "/") {
//       navigate("/mainNews");
//     }
//   }, [isAuthenticated, navigate, location.pathname]);

//   return (
//     <>
//       {/* Show header only if user is authenticated */}
//       {isAuthenticated && <Header />}

//       <Routes>
//         {/* Default route directs users to login/signup if not authenticated */}
//         <Route
//           path="/"
//           element={!isAuthenticated ? <LoginSignupPage /> : <Navigate to="/mainNews" />}
//         />

//         {/* Main News page (after login) */}
//         <Route path="/mainNews" element={isAuthenticated ? <MainNewsPage /> : <Navigate to="/" />} />

//         {/* Trending Page (should be accessible after login) */}
//         <Route path="/trending" element={isAuthenticated ? <TrendingPage /> : <Navigate to="/" />} />

//         {/* Preferences Page (should be accessible after login) */}
//         <Route path="/preferences" element={isAuthenticated ? <PreferencesPage /> : <Navigate to="/" />} />

//         {/* Profile Page (should be accessible after login) */}
//         <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to="/" />} />

//         {/* News Article Page (Dynamic Route) */}
//         <Route path="/news/:id" element={isAuthenticated ? <NewsArticlePage /> : <Navigate to="/" />} />
//       </Routes>
//     </>
//   );
// }

// export default App;
