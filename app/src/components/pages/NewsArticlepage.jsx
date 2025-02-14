import { useEffect, useState } from "react";
import { useLocation,useParams } from "react-router-dom";

export default function NewsArticlePage() {
  const location = useLocation();
  const { id } = useParams(); // Retrieve the dynamic parameter from the URL

  console.log("Params ID:", id);
  console.log("Location state:", location.state);

  if (!location.state) {
    return <h2>Article not found</h2>;
  }

  const { article } = location.state || {};
  const [fullContent, setFullContent] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    if (article?.url) {
      fetchFullArticle(article.url);
    } else {
      setFullContent("No URL available to fetch the full article.");
    }
  }, [article?.url]);

  const fetchFullArticle = async (url) => {
    try {
      const response = await fetch(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        setFullContent("Failed to load the full article content.");
        return;
      }

      const data = await response.json();
      setFullContent(data.content || "Failed to load the full article content.");
    } catch (error) {
      console.error("Error fetching the article:", error);
      setFullContent("Failed to load the full article content.");
    }
  };

  const handleSummarize = async () => {
    if (!fullContent) return;

    setIsSummarizing(true);

    try {
      const summaryResponse = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: fullContent }),
      });

      if (!summaryResponse.ok) {
        const errorText = await summaryResponse.text();
        console.error("Error generating summary:", errorText);
        setSummary("Failed to generate summary.");
      } else {
        const summaryData = await summaryResponse.json();
        setSummary(summaryData.summary || "Failed to generate summary.");      }    } catch (error) {
      console.error("Error fetching summary:", error);
      setSummary("Failed to generate summary.");
    }

    setIsSummarizing(false);
  };

  if (!article) {
    return <div>Article not found!</div>;
  }

  // Function to split content into paragraphs every 9-10 lines
  const formatContentAsParagraphs = (content) => {
    if (!content) return [];
  
    // Split content into sentences using regex that captures full stops
    const sentences = content.match(/[^.?!]+[.?!]/g) || [content];
  
    const paragraphs = [];
    let tempParagraph = [];
  
    sentences.forEach((sentence, index) => {
      tempParagraph.push(sentence.trim());
  
      // Create a paragraph every 9-10 sentences or at the end
      if ((index + 1) % 10 === 0 || index === sentences.length - 1) {
        paragraphs.push(tempParagraph.join(" "));
        tempParagraph = [];
      }
    });
  
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
          <p><strong>Author:</strong> {article.author || "Unknown"}</p>
          <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
          <p><strong>Source:</strong> {article.source?.name || "Unknown"}</p>
        </div>
      </div>

      {/* Display the formatted content in multiple paragraphs */}
      <div className="mt-4 text-gray-800 article-content">
        {fullContent
          ? formatContentAsParagraphs(fullContent).map((para, index) => (
              <p key={index} className="mb-4">{para}</p> // Add margin-bottom for spacing
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
    </div>
  );
}
