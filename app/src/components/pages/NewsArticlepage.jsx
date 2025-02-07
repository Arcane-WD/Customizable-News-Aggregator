import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function NewsArticlePage() {
  const location = useLocation();
  const { article } = location.state || {}; // Access the article data passed via state
  const [fullContent, setFullContent] = useState(null); // State to store the scraped content
  const [summary, setSummary] = useState(null); // State to store the summary

  useEffect(() => {
    if (article?.url) {
      fetchFullArticle(article.url);
    } else {
      setFullContent("No URL available to fetch the full article.");
    }
  }, [article]);

  const fetchFullArticle = async (url) => {
    try {
      // Fetch the parsed content from the backend
      const response = await fetch(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}`);
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        const errorText = await response.text(); // Log the error response
        console.error("Error response from server:", errorText);
        setFullContent("Failed to load the full article content.");
        return;
      }
  
      // Parse the JSON response
      const data = await response.json();
  
      if (data.content) {
        setFullContent(data.content);
  
        // Fetch the summary for the full content
        const summaryResponse = await fetch("http://localhost:5000/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: data.content }),
        });
  
        if (!summaryResponse.ok) {
          const errorText = await summaryResponse.text();
          console.error("Error generating summary:", errorText);
          setSummary("Failed to generate summary.");
          return;
        }
  
        const summaryData = await summaryResponse.json();
        if (summaryData.summary) {
          setSummary(summaryData.summary);
        } else {
          setSummary("Failed to generate summary.");
        }
      } else {
        setFullContent(data.error || "Failed to load the full article content.");
      }
    } catch (error) {
      console.error("Error fetching the article:", error);
      setFullContent("Failed to load the full article content.");
    }
  };

  if (!article) {
    return <div>Article not found!</div>;
  }

  return (
    <>
      <div className="article-container">
        <h1 className="article-heading">{article.title}</h1>
        <div className="image-and-stats">
          <img
            src={article.urlToImage || "default-image.jpg"} // Fallback to a default image if no image is provided
            alt="News"
            className="news-image"
          />
          <div className="stats">
            <p>Author: {article.author || "Unknown"}</p>
            <p>Published At: {new Date(article.publishedAt).toLocaleDateString()}</p>
            <p>Source: {article.source?.name || "Unknown"}</p>
          </div>
        </div>
        {/* Display the scraped full content */}
        <p className="article-content">
          {fullContent ? fullContent : "Loading full article content..."}
        </p>
        {/* Display the summary */}
        <p className="article-summary">
          Summary: {summary ? summary : "Generating summary..."}
        </p>
      </div>
    </>
  );
}