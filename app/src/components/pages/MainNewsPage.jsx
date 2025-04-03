import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import newsImage from "../../assests/images/download.jpg";

export default function MainNewsPage() {
  const [newsData, setNewsData] = useState([]);
  const location = useLocation();
  const hasFetched = useRef(false); // Prevent multiple API calls

  const storedGenres = JSON.parse(localStorage.getItem("selectedGenres")) || [];
  const selectedGenres = location.state?.selectedGenres || storedGenres;

  useEffect(() => {
    if (hasFetched.current) return; // Prevent re-fetching

    const fetchNews = async () => {
      const apiKey = "01b9aacf474d4fd789819e84da3a815b"; // Replace with your News API key
      let url = "";

      if (selectedGenres.length === 0) {
        console.log("No genres selected. Fetching top headlines.");
        url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
      } else {
        const query = selectedGenres.map(keyword => encodeURIComponent(keyword)).join("+");
        url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
      }

      console.log("Fetching news from:", url);

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.articles) {
          setNewsData(data.articles);
          hasFetched.current = true; // Mark as fetched
        } else {
          console.error("No articles found:", data);
          setNewsData([]);
        }
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNews();
  }, [selectedGenres]);


  return (
    <>
      <div className="news-container">
        {newsData.slice(0, 2).map((article, index) => {
          const globalIndex = index; // Global index for this slice
          return (
            <Link
              to={`/news/${globalIndex}`} // Using global index
              state={{ article }}
              key={globalIndex}
              className={`newsDiv news-${globalIndex + 1}`}
            >
              <div className="news-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <img
                src={article.urlToImage || newsImage}
                alt="newsImage"
                className="news-img"
              />
            </Link>
          );
        })}
      </div>

      <div className="news-container">
        {newsData.slice(2, 4).map((article, index) => {
          const globalIndex = index + 2; // Adjusted for this slice
          return (
            <Link
              to={`/news/${globalIndex}`} // Using global index
              state={{ article }}
              key={globalIndex}
              className={`newsDiv news-${globalIndex + 1}`}
            >
              <div className="news-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <img
                src={article.urlToImage || newsImage}
                alt="newsImage"
                className="news-img"
              />
            </Link>
          );
        })}
      </div>

      <div className="news-container">
        {newsData.slice(4, 6).map((article, index) => {
          const globalIndex = index + 4; // Adjusted for this slice
          return (
            <Link
              to={`/news/${globalIndex}`} // Using global index
              state={{ article }}
              key={globalIndex}
              className={`newsDiv news-${globalIndex + 1}`}
            >
              <div className="news-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <img
                src={article.urlToImage || newsImage}
                alt="newsImage"
                className="news-img"
              />
            </Link>
          );
        })}
      </div>

      <div className="news-container">
        {newsData.slice(6, 8).map((article, index) => {
          const globalIndex = index + 6; // Adjusted for this slice
          return (
            <Link
              to={`/news/${globalIndex}`} // Using global index
              state={{ article }}
              key={globalIndex}
              className={`newsDiv news-${globalIndex + 1}`}
            >
              <div className="news-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <img
                src={article.urlToImage || newsImage}
                alt="newsImage"
                className="news-img"
              />
            </Link>
          );
        })}
      </div>

      <div className="news-container">
        {newsData.slice(8, 10).map((article, index) => {
          const globalIndex = index + 8; // Adjusted for this slice
          return (
            <Link
              to={`/news/${globalIndex}`} // Using global index
              state={{ article }}
              key={globalIndex}
              className={`newsDiv news-${globalIndex + 1}`}
            >
              <div className="news-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <img
                src={article.urlToImage || newsImage}
                alt="newsImage"
                className="news-img"
              />
            </Link>
          );
        })}
      </div>

      <div className="news-container">
        {newsData.slice(10, 12).map((article, index) => {
          const globalIndex = index + 10; // Adjusted for this slice
          return (
            <Link
              to={`/news/${globalIndex}`} // Using global index
              state={{ article }}
              key={globalIndex}
              className={`newsDiv news-${globalIndex + 1}`}
            >
              <div className="news-content">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <img
                src={article.urlToImage || newsImage}
                alt="newsImage"
                className="news-img"
              />
            </Link>
          );
        })}
      </div>
    </>
  );
};