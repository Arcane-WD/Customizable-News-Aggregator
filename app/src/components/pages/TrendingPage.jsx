import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import newsImage from "../../assests/images/blob.jpg";

export default function TrendingNewsPage() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl =
      "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=01b9aacf474d4fd789819e84da3a815b";

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data.articles.slice(0, 20)); // Limit to 20 articles
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="news-grid">
      {newsData.map((article, index) => (
        <Link to={`/news/${index + 1}`} className="news-card" key={index}>
          <img
            src={article.urlToImage || newsImage}
            alt="newsImage"
            className="news-img"
          />
          <div className="news-content">
            <h3 className="news-title">{article.title}</h3>
            <p className="news-description">{article.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}