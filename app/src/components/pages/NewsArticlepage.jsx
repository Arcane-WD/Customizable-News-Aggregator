import nlp from "compromise"; // NLP library used for sentence parsing and processing
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function NewsArticlePage() {
  const location = useLocation();
  const { id } = useParams(); // Extracts the article ID from the URL (if needed later)

  // Ensure article data was passed via location.state
  if (!location.state) {
    console.error("DEBUG: No location state found. Article data is missing.");
    return <h2>Article not found</h2>;
  }

  // Destructure the article and allArticles passed through navigation
  const { article, allArticles } = location.state || {};

  // Handle missing article object
  if (!article) {
    console.error("DEBUG: Article object is undefined in location state.");
    return <div>Article not found!</div>;
  }

  // Local state to store full article content, summary, recommendations, and summarization status
  const [fullContent, setFullContent] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  // Fetch the full article content from the backend as soon as the article URL is available
  useEffect(() => {
    console.log("DEBUG: useEffect triggered for fetching full article.");
    if (article?.url) {
      console.log("DEBUG: Article URL:", article.url);
      fetchFullArticle(article.url);
    } else {
      console.error("DEBUG: No URL found in article object.");
      setFullContent("No URL available to fetch the full article.");
    }
  }, [article?.url]);

  // Calls backend API to scrape the full article content using its URL
  const fetchFullArticle = async (url) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.error("No token found in localStorage");
        return;
      }

      const response = await fetch(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData);
        setFullContent("Failed to fetch full content.");
        return;
      }

      const data = await response.json();
      console.log("DEBUG: Fetched Data:", data);

      if (data.content) {
        setFullContent(data.content);
      } else {
        setFullContent("Failed to fetch full content.");
      }
    } catch (error) {
      console.error("Error fetching full article:", error);
      setFullContent("Error fetching content.");
    }
  };

  // Trigger summarization of the full article content using backend API
  const handleSummarize = async () => {
    console.log("DEBUG: Summarize button clicked.");
    if (!fullContent) {
      console.warn("DEBUG: No full content available to summarize.");
      return;
    }

    setIsSummarizing(true);

    try {
      const summaryResponse = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: fullContent }),
      });

      if (!summaryResponse.ok) {
        const errorText = await summaryResponse.text();
        console.error("DEBUG: Error generating summary:", errorText);
        setSummary("Failed to generate summary.");
      } else {
        const summaryData = await summaryResponse.json();
        console.log("DEBUG: Summary data received:", summaryData);
        setSummary(summaryData.summary || "Failed to generate summary.");
      }
    } catch (error) {
      console.error("DEBUG: Error fetching summary:", error);
      setSummary("Failed to generate summary.");
    }

    setIsSummarizing(false);
  };

  // Sends current article and list of all articles to backend to receive recommendations
  const fetchRecommendations = async () => {
    if (!article || !allArticles.length) return;

    console.log("🔍 Sending to Backend:", JSON.stringify({ 
      articles: allArticles, 
      title: article.title 
    }, null, 2));

    try {
      const response = await axios.post("http://localhost:5000/get-recommendations", {
        articles: allArticles,
        title: article.title,
      });

      console.log("✅ Respoooonse from Backend:", response.data);
      setRecommendations(response.data || []);
    } catch (error) {
      console.error("Error fetching recommendations:", error.response?.data || error.message);
    }
  };

  // Fetch recommendations once the article and all articles are loaded
  useEffect(() => {
    fetchRecommendations();
  }, [article, allArticles]);

  // Helper function to decode HTML entities in content
  const decodeHtml = (text) =>
    new DOMParser().parseFromString(text, "text/html").documentElement.textContent;

  // Capitalizes the first letter of a sentence
  const capitalizeFirst = (sentence) =>
    sentence.charAt(0).toUpperCase() + sentence.slice(1);

  // Cleans, processes, and splits the article content into readable paragraphs
  const formatContentAsParagraphs = (rawContent) => {
    if (!rawContent) return [];

    // Decode HTML, remove unwanted boilerplate and artifacts
    let content = decodeHtml(rawContent)
      .replace(/\[\+\d+ chars\]/g, "")               // Remove [+123 chars]
      .replace(/(read more|click here).*/i, "")      // Remove promotional text
      .replace(/Published:.*$/i, "")                 // Remove timestamp text
      .replace(/\s+/g, " ")                          // Normalize whitespace
      .trim();

    // Use NLP to split content into sentences
    const sentences = nlp(content).sentences().out("array");

    // Group sentences into paragraphs of 8–10 sentences for readability
    const paragraphs = [];
    let temp = [];

    sentences.forEach((s, index) => {
      const sentence = capitalizeFirst(s.trim());
      temp.push(sentence);

      const shouldPush = (index + 1) % (8 + Math.floor(Math.random() * 3)) === 0;
      if (shouldPush || index === sentences.length - 1) {
        paragraphs.push(temp.join(" "));
        temp = [];
      }
    });

    return paragraphs;
  };
  // Formatting logic is now complete

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>
      <div className="image-and-stats flex flex-col md:flex-row items-center gap-4">
        <img
          src={article.urlToImage || "default-image.jpg"}
          alt="News"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />
        <div className="stats text-gray-700">
        <p>
          <strong>Author:</strong> {article.author && article.author.trim() !== "" ? article.author : "Unknown"}
        </p>
        <p>
          <strong>Published At:</strong>{" "}
          {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Invalid Date"}
        </p>
        <p>
          <strong>Source:</strong> {typeof article.source === "string" ? article.source : article.source?.name || "Unknown"}
      </p>
        </div>
      </div>

      {/* Display the formatted content in multiple paragraphs */}
      <div className="mt-4 text-gray-800 article-content">
        {fullContent
          ? formatContentAsParagraphs(fullContent).map((para, index) => (
              <p key={index} className="mb-4">
                {para}
              </p>
            ))
          : "Loading full article content..."}
      </div>

      {/* Summarize Button */}
      <button
        onClick={handleSummarize}
        disabled={isSummarizing}
        className={`mt-4 px-4 py-2 rounded-lg font-semibold transition-all 
          ${isSummarizing ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
      >
        {isSummarizing ? "Summarizing..." : "Summarize"}
      </button>

      {/* Display the summary only after clicking the button */}
      {summary && (
        <p className="mt-4 p-4 bg-gray-100 border-l-4 border-blue-500 rounded-md">
          <strong>Summary:</strong> {summary}
        </p>
      )}

      {/* Display Recommended Articles */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 border-b-2 pb-2">
          Recommended Articles
        </h2>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((recArticle, index) => (
              <Link
                key={index}
                to={`/news/recommended-${index}`} // Unique route for recommended articles
                state={{ article: recArticle, allArticles: allArticles }}
                className="block bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={recArticle.urlToImage || "default-image.jpg"}
                  alt="Recommended Article"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-md font-semibold text-gray-800">{recArticle.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{recArticle.source || "Unknown Source"}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recommendations found.</p>
        )}
      </div>

    </div>
  );
}



