import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export default function NewsArticlePage() {
  const location = useLocation();
  const { id } = useParams(); // Retrieve the dynamic parameter from the URL

  console.log("DEBUG: Params ID:", id);
  console.log("DEBUG: Location state on load:", location.state);

  if (!location.state) {
    console.error("DEBUG: No location state found. Article data is missing.");
    return <h2>Article not found</h2>;
  }

  const { article } = location.state || {};
  if (!article) {
    console.error("DEBUG: Article object is undefined in location state.");
    return <div>Article not found!</div>;
  }

  const [fullContent, setFullContent] = useState(null);
  const [summary, setSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
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

    console.log("DEBUG: Formatted content into paragraphs:", paragraphs);
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
            <strong>Author:</strong> {article.author || "Unknown"}
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
    </div>
  );
}
// import { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import axios from "axios";

// export default function NewsArticlePage() {
//   const location = useLocation();
//   const { id } = useParams();

//   if (!location.state) {
//     return <h2>Article not found</h2>;
//   }

//   const { article, allArticles } = location.state || {};
//   if (!article) {
//     return <div>Article not found!</div>;
//   }

//   const [fullContent, setFullContent] = useState(null);
//   const [summary, setSummary] = useState(null);
//   const [isSummarizing, setIsSummarizing] = useState(false);
//   const [recommendations, setRecommendations] = useState([]);

//   useEffect(() => {
//     if (article?.url) {
//       fetchFullArticle(article.url);
//     } else {
//       setFullContent("No URL available to fetch the full article.");
//     }
//   }, [article?.url]);

//   const fetchFullArticle = async (url) => {
//     try {
//       const token = localStorage.getItem("authToken");

//       if (!token) {
//         return;
//       }

//       const response = await fetch(`http://localhost:5000/scrape?url=${encodeURIComponent(url)}`, {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         setFullContent("Failed to fetch full content.");
//         return;
//       }

//       const data = await response.json();
//       setFullContent(data.content || "Failed to fetch full content.");
//     } catch (error) {
//       setFullContent("Error fetching content.");
//     }
//   };

//   const handleSummarize = async () => {
//     if (!fullContent) {
//       return;
//     }

//     setIsSummarizing(true);

//     try {
//       const summaryResponse = await fetch("http://localhost:5000/summarize", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: fullContent }),
//       });

//       if (!summaryResponse.ok) {
//         setSummary("Failed to generate summary.");
//       } else {
//         const summaryData = await summaryResponse.json();
//         setSummary(summaryData.summary || "Failed to generate summary.");
//       }
//     } catch (error) {
//       setSummary("Failed to generate summary.");
//     }

//     setIsSummarizing(false);
//   };

//   const fetchRecommendations = async () => {
//     if (!article || !allArticles.length) return;

//     try {
//       const response = await axios.post("http://localhost:5000/get-recommendations", {
//         articles: allArticles,
//         title: article.title,
//       });

//       setRecommendations(response.data || []);
//     } catch (error) {
//       console.error("Error fetching recommendations:", error);
//     }
//   };

//   useEffect(() => {
//     fetchRecommendations();
//   }, [article, allArticles]);

//   const formatContentAsParagraphs = (content) => {
//     if (!content) return [];

//     const sentences = content.match(/[^.?!]+[.?!]/g) || [content];
//     const paragraphs = [];
//     let tempParagraph = [];

//     sentences.forEach((sentence, index) => {
//       tempParagraph.push(sentence.trim());

//       if ((index + 1) % 10 === 0 || index === sentences.length - 1) {
//         paragraphs.push(tempParagraph.join(" "));
//         tempParagraph = [];
//       }
//     });

//     return paragraphs;
//   };

//   return (
//     <div>
//       <h1>{article.title}</h1>
//       <div>
//         <img src={article.urlToImage || "default-image.jpg"} alt="News" />
//         <div>
//           <p><strong>Author:</strong> {article.author || "Unknown"}</p>
//           <p><strong>Published At:</strong> {new Date(article.publishedAt).toLocaleDateString()}</p>
//           <p><strong>Source:</strong> {article.source?.name || "Unknown"}</p>
//         </div>
//       </div>

//       <div>
//         {fullContent
//           ? formatContentAsParagraphs(fullContent).map((para, index) => (
//               <p key={index}>{para}</p>
//             ))
//           : "Loading full article content..."}
//       </div>

//       <button onClick={handleSummarize} disabled={isSummarizing}>
//         {isSummarizing ? "Summarizing..." : "Summarize"}
//       </button>

//       {summary && (
//         <p>
//           <strong>Summary:</strong> {summary}
//         </p>
//       )}

//       {/* Display Recommended Articles */}
//       <div>
//         <h2>Recommended Articles</h2>
//         {recommendations.length > 0 ? (
//           <ul>
//             {recommendations.map((recArticle, index) => (
//               <li key={index}>
//                 <a href={recArticle.url} target="_blank" rel="noopener noreferrer">
//                   {recArticle.title}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No recommendations found.</p>
//         )}
//       </div>
//     </div>
//   );
// }
