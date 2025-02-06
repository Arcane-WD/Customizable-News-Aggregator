import { Link } from "react-router-dom";
import newsImage from "../../assests/images/download.jpg";
import NewsArticlePage from "./NewsArticlepage";
export default function MainNewsPage() {
  return (
    <>
      <div className="news-container">
        {/* First News */}
        <Link to="/news/1" className="newsDiv first-news">
          <div className="news-content">
            <h3>This is the heading of the main news page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Pariatur nostrum error aliquid dignissimos quos ipsum odit
              possimus quae mollitia et necessitatibus vitae quibusdam aperiam
              fuga repellendus, totam enim dolor. Cumque.
            </p>
          </div>
          <img src={newsImage} alt="newsImage" className="news-img" />
        </Link>

        {/* Second News */}
        <Link to={NewsArticlePage} className="newsDiv second-news">
          <div className="news-content">
            <h3>This is the heading of the main news page</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </div>
          <img src={newsImage} alt="newsImage" className="news-img" />
        </Link>
      </div>

      <div className="news-container">
        {/* Third News */}
        <Link to="/news/3" className="newsDiv third-news">
          <div className="news-content">
            <h3>This is the heading of the main news page</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </div>
          <img src={newsImage} alt="newsImage" className="news-img" />
        </Link>

        {/* Fourth News */}
        <Link to="/news/4" className="newsDiv fourth-news">
          <div className="news-content">
            <h3>This is the heading of the main news page</h3>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Pariatur nostrum error aliquid dignissimos quos ipsum odit
              possimus quae mollitia et necessitatibus vitae quibusdam aperiam
              fuga repellendus, totam enim dolor. Cumque.
            </p>
          </div>
          <img src={newsImage} alt="newsImage" className="news-img" />
        </Link>
      </div>
    </>
  );
}
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";

// export default function MainNewsPage() {
//   const [news, setNews] = useState([]); // To store news data
//   const [loading, setLoading] = useState(true); // To track loading state

//   useEffect(() => {
//     // Simulate API Call (Replace with actual News API)
//     setTimeout(() => {
//       setNews([
//         {
//           id: 1,
//           title: "Breaking News: React is Awesome!",
//           description: "React makes UI development simple and fun.",
//           image: "https://via.placeholder.com/300",
//         },
//         {
//           id: 2,
//           title: "Tech Update: AI is Changing the World",
//           description: "AI and ML are the future of technology.",
//           image: "https://via.placeholder.com/300",
//         },
//       ]);
//       setLoading(false);
//     }, 2000); // Simulating a 2-second API response delay
//   }, []);

//   return (
//     <div className="news-container">
//       {loading
//         ? // Show skeleton loaders when loading
//           Array(4)
//             .fill(0)
//             .map((_, index) => (
//               <div key={index} className="newsDiv skeleton">
//                 <Skeleton height={200} />
//                 <h3>
//                   <Skeleton width={200} />
//                 </h3>
//                 <p>
//                   <Skeleton count={3} />
//                 </p>
//               </div>
//             ))
//         : // Show actual news when data is available
//           news.map((article) => (
//             <Link to={`/news/${article.id}`} key={article.id} className="newsDiv">
//               <img src={article.image} alt="news" className="news-img" />
//               <div className="news-content">
//                 <h3>{article.title}</h3>
//                 <p>{article.description}</p>
//               </div>
//             </Link>
//           ))}
//     </div>
//   );
// }
