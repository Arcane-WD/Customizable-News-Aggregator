import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import newsImage from "../../assests/images/download.jpg";

export default function MainNewsPage() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    // Fetch news data from the API
    const fetchNews = async () => {
      const apiKey = "408d10cee8cc43fbb7f93fd98356dde7"; // Replace with your News API key
      const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setNewsData(data.articles); // Store the fetched articles
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <div className="news-container">
        {newsData.slice(0, 2).map((article, index) => ( // Render first two articles
          <Link
            to={`/news/${index}` } // Use index or article ID as the route parameter
            state={{ article }} // Pass the article data as state
            key={index}
            className={`newsDiv news-${index + 1}`}
          >
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
            <img
              src={article.urlToImage || newsImage} // Fallback to local image if no image is provided
              alt="newsImage"
              className="news-img"
            />
          </Link>
        ))}
      </div>

      <div className="news-container">
        {newsData.slice(2, 4).map((article, index) => ( // Render next two articles
          <Link
            to={`/news/${index + 2}`} // Use index + 2 to maintain unique IDs
            state={{ article }} // Pass the article data as state
            key={index + 2}
            className={`newsDiv news-${index + 3}`}
          >
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
            <img
              src={article.urlToImage || newsImage} // Fallback to local image if no image is provided
              alt="newsImage"
              className="news-img"
            />
          </Link>
        ))}
      </div>

      <div className="news-container">
        {newsData.slice(4, 6).map((article, index) => ( // Render first two articles
          <Link
            to={`/news/${index}`} // Use index or article ID as the route parameter
            state={{ article }} // Pass the article data as state
            key={index}
            className={`newsDiv news-${index + 1}`}
          >
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
            <img
              src={article.urlToImage || newsImage} // Fallback to local image if no image is provided
              alt="newsImage"
              className="news-img"
            />
          </Link>
        ))}
      </div>

      <div className="news-container">
        {newsData.slice(6, 8).map((article, index) => ( // Render first two articles
          <Link
            to={`/news/${index}`} // Use index or article ID as the route parameter
            state={{ article }} // Pass the article data as state
            key={index}
            className={`newsDiv news-${index + 1}`}
          >
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
            <img
              src={article.urlToImage || newsImage} // Fallback to local image if no image is provided
              alt="newsImage"
              className="news-img"
            />
          </Link>
        ))}
      </div>

      <div className="news-container">
        {newsData.slice(8, 10).map((article, index) => ( // Render first two articles
          <Link
            to={`/news/${index}`} // Use index or article ID as the route parameter
            state={{ article }} // Pass the article data as state
            key={index}
            className={`newsDiv news-${index + 1}`}
          >
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
            <img
              src={article.urlToImage || newsImage} // Fallback to local image if no image is provided
              alt="newsImage"
              className="news-img"
            />
          </Link>
        ))}
      </div>

      <div className="news-container">
        {newsData.slice(10, 12).map((article, index) => ( // Render first two articles
          <Link
            to={`/news/${index}`} // Use index or article ID as the route parameter
            state={{ article }} // Pass the article data as state
            key={index}
            className={`newsDiv news-${index + 1}`}
          >
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
            <img
              src={article.urlToImage || newsImage} // Fallback to local image if no image is provided
              alt="newsImage"
              className="news-img"
            />
          </Link>
        ))}
      </div>
    </>
  );
}



// import { Link } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import newsImage from "../../assests/images/download.jpg";

// export default function MainNewsPage() {
//   const [newsData, setNewsData] = useState([]);

//   useEffect(() => {
//     // Fetch news data from the API
//     const fetchNews = async () => {
//       const apiKey = ""; // Replace with your News API key
//       const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         if (data.articles) {
//           setNewsData(data.articles); // Store the fetched articles
//         }
//       } catch (error) {
//         console.error("Error fetching news data:", error);
//       }
//     };
//     fetchNews();
//   }, []);

//   return (
//     <>
//       <div className="news-container">
//         {newsData.slice(0, 20).map((article, index) => ( // Render up to 20 articles
//           <Link
//             to={`/news/${index}`} // Use index as the route parameter
//             state={{ article }} // Pass the article data as state
//             key={index}
//             className={`newsDiv news-${index + 1}`}
//           >
//             <div className="news-content">
//               <h3>{article.title}</h3>
//               <p>{article.description || "No description available."}</p>
//             </div>
//             <img
//               src={article.urlToImage || newsImage} // Fallback to local image if no image is provided
//               alt="newsImage"
//               className="news-img"
//             />
//           </Link>
//         ))}
//       </div>
//     </>
//   );
// }