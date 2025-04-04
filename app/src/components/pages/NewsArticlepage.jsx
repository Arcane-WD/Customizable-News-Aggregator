import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

export default function NewsArticlePage() {
  const location = useLocation();
  const { id } = useParams(); // Retrieve the dynamic parameter from the URL

  // console.log("DEBUG: Params ID:", id);
  // console.log("DEBUG: Location state on load:", location.state);

  if (!location.state) {
    console.error("DEBUG: No location state found. Article data is missing.");
    return <h2>Article not found</h2>;
  }

  const { article, allArticles } = location.state || {};
  // console.log("Article:", article);
  // console.log("All Articles:", allArticles); // Should now contain all newsData

if (!article) {
    console.error("DEBUG: Article object is undefined in location state.");
    return <div>Article not found!</div>;
  }

  const [fullContent, setFullContent] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

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


    useEffect(() => {
      fetchRecommendations();
    }, [article, allArticles]);


  // Function to split content into paragraphs every 9-10 sentences
  const formatContentAsParagraphs = (content) => {
    if (!content) return [];

    // Split content into sentences using regex that captures full stops
    const sentences = content.match(/[^.?!]+[.?!]/g) || [content];
    const paragraphs = [];
    let tempParagraph = [];

    sentences.forEach((sentence, index) => {
      tempParagraph.push(sentence.trim());

      // Create a paragraph every 10 sentences or at the end
      if ((index + 1) % 10 === 0 || index === sentences.length - 1) {
        paragraphs.push(tempParagraph.join(" "));
        tempParagraph = [];
      }
    });

    // console.log("DEBUG: Formatted content into paragraphs:", paragraphs);
    return paragraphs;
  };

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
          <strong>Author:</strong> {
            article.author 
              ? article.author.split(',')[0].split(' ').slice(0, 2).join(' ') 
              : "Unknown"
            }
          </p>
          <p>
            <strong>Published At:</strong>{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </p>
          <p>
            <strong>Source:</strong> {article.source?.name || "Unknown"}
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
        <h2 className="text-xl font-semibold mb-4 border-b-2 pb-2">Recommended Articles</h2>
        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((recArticle, index) => (
              <a
                key={index}
                href={recArticle.url}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No recommendations found.</p>
        )}
      </div>

    </div>
  );
}



