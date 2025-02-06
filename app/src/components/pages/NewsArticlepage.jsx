import React from "react";
import newsImage from "../../assests/images/newsImage.webp"
import Header from "../common/Header";

export default function NewsArticlePage() {
  return (
    <>
      <div className="article-container">
        <Header />
        <h1 className="article-heading">This is the Article Heading</h1>
        <div className="image-and-stats">
          <img src={newsImage} alt="News" className="news-image" />
          <div className="stats">
            <p>Stat 1</p>
            <p>Stat 2</p>
            <p>Stat 3</p>
          </div>
        </div>
        <p className="article-content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nam
          assumenda iure necessitatibus molestiae eveniet a repudiandae
          consequuntur...
        </p>
      </div>
    </>
  );
}
