import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";

export default function NewsArticlePage() {
  const location = useLocation();
  const { article } = location.state || {}; // Access the article data passed via state

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
        <p className="article-content">{article.content}</p>
      </div>
    </>
  );
}


// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios"; // For fetching the HTML content
// import { Readability } from "@mozilla/readability"; // For extracting article content
// // import { JSDOM } from "jsdom"; // For parsing HTML

// export default function NewsArticlePage() {
//   const location = useLocation();
//   const { article } = location.state || {}; // Access the article data passed via state
//   const [fullContent, setFullContent] = useState(null); // State to store the scraped content

//   useEffect(() => {
//     if (article?.url) {
//       fetchFullArticle(article.url);
//     } else {
//       setFullContent("No URL available to fetch the full article.");
//     }
//   }, [article]);

//   const fetchFullArticle = async (url) => {
//     try {
//       // Step 1: Fetch the HTML content of the page
//       const response = await axios.get(url);
//       const html = response.data;

//       // Step 2: Parse the HTML using JSDOM
//       const dom = new JSDOM(html, { url });
//       const document = dom.window.document;

//       // Step 3: Use Readability to extract the main article content
//       const reader = new Readability(document);
//       const articleContent = reader.parse();

//       // Update the state with the extracted content
//       if (articleContent?.textContent) {
//         setFullContent(articleContent.textContent);
//       } else {
//         setFullContent("Unable to extract the full article content.");
//       }
//     } catch (error) {
//       console.error("Error fetching or parsing the article:", error);
//       setFullContent("Failed to load the full article content.");
//     }
//   };

//   if (!article) {
//     return <div>Article not found!</div>;
//   }

//   return (
//     <>
//       <div className="article-container">
//         <h1 className="article-heading">{article.title}</h1>
//         <div className="image-and-stats">
//           <img
//             src={article.urlToImage || "default-image.jpg"} // Fallback to a default image if no image is provided
//             alt="News"
//             className="news-image"
//           />
//           <div className="stats">
//             <p>Author: {article.author || "Unknown"}</p>
//             <p>Published At: {new Date(article.publishedAt).toLocaleDateString()}</p>
//             <p>Source: {article.source?.name || "Unknown"}</p>
//           </div>
//         </div>
//         {/* Display the scraped full content */}
//         <p className="article-content">
//           {fullContent ? fullContent : "Loading full article content..."}
            
//         </p>
//       </div>
//     </>
//   );
// }